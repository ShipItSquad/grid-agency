# Secrets in Daytona sandboxes

This project uses separate systems for separate trust boundaries:

- Infisical stores application secrets that would otherwise live in `.env.local`.
- Daytona creates and runs remote development sandboxes that auto-stop but retain their filesystem until deletion.
- Tailscale gives each sandbox a private workload identity and private network access.
- Aperture routes and audits AI traffic over the tailnet. The current Codex provider forwards each user's ChatGPT OAuth token instead of storing a shared provider key.

Aperture is an AI gateway, not a general secret store. Keep database, Cloudflare, application, and other environment secrets in Infisical. Codex keeps its own ChatGPT OAuth session and sends the token only on inference requests; login and token refresh bypass Aperture.

## Security model

The sandbox never receives the long-lived Infisical Universal Auth client secret. The local `scripts/remote` command exchanges the client ID and client secret for a short-lived access token, then installs only that token in the sandbox with file mode `0600`.

The token is not written to `.sessions`, repository files, command arguments, or bootstrap logs. It is sent to the sandbox over a temporary Daytona SSH connection and stored at `${XDG_CONFIG_HOME:-$HOME/.config}/infisical/access-token` inside the sandbox. Treat Daytona administrators and the Daytona control plane as trusted.

Code running as the sandbox user can read and reuse the token file until the token expires. Enable Infisical only for trusted branches and commands. Never enable secret access while reviewing an untrusted pull request.

Normal commands use `infisical run`, so secrets exist only in the environment of the child process. A plaintext `.env.local` file is created only through the explicit export task.

## One-time Infisical setup

1. Import the existing `.env.local` values into the Infisical project and its `dev` environment. Use the Infisical dashboard's dotenv import rather than putting values on a command line or in shell history.
2. In **Organization Settings > Access Control > Identities**, create a machine identity named `daytona-off-grid`.
3. Keep the organization role minimal. The identity does not need administrative access.
4. Enable Universal Auth and use a short access-token TTL. Two hours is a reasonable starting point for development sessions.
5. Create a client secret. Give it an expiry and rotate it periodically.
6. Add the identity to this Infisical project with read-only access to the `dev` environment and only the required secret path.
7. Record the project ID, client ID, and client secret in a local password manager. Never commit them.

Install the local Infisical CLI:

```sh
task secrets:init
```

Set the non-secret project configuration and load the Universal Auth credentials from your password manager:

```sh
export INFISICAL_PROJECT_ID="your-project-id"
export INFISICAL_ENVIRONMENT="dev"
export INFISICAL_SECRET_PATH="/"
export INFISICAL_CLIENT_ID="your-machine-identity-client-id"
export INFISICAL_CLIENT_SECRET="your-machine-identity-client-secret"

# Required only for EU Cloud or a self-hosted Infisical instance.
export INFISICAL_DOMAIN="https://eu.infisical.com"
```

Verify that the identity can authenticate:

```sh
task secrets:check
```

The check obtains a short-lived token but never prints it.

## Create a secret-enabled sandbox

Build a fresh snapshot after changing the dev-container image:

```sh
task remote:snapshot SNAPSHOT=off-grid-dev
```

Create a sandbox while the Infisical variables above are present:

```sh
task remote:start NAME=01 SNAPSHOT=off-grid-dev INFISICAL=1
```

Infisical is always opt-in. `INFISICAL_PROJECT_ID` alone does not grant a sandbox secret access. Omit `INFISICAL=1` to create a sandbox without an Infisical token.

The following non-secret values become sandbox environment variables:

- `INFISICAL_PROJECT_ID`
- `INFISICAL_ENVIRONMENT`
- `INFISICAL_SECRET_PATH`
- `INFISICAL_DOMAIN`, when configured

The short-lived access token is stored in the protected token file instead of the sandbox environment.

## Run commands with secrets

Secret injection is also opt-in per command. Pass `SECRETS=1` to wrap the complete command with `with-infisical`:

```sh
task remote:exec NAME=01 SECRETS=1 CMD="pnpm check"
task remote:exec NAME=01 SECRETS=1 CMD="pnpm dev --host 0.0.0.0"
```

Use the same explicit flag with `remote:serve`:

```sh
task remote:serve NAME=01 PORT=5173 SECRETS=1
```

Inside an SSH session, use the wrapper directly:

```sh
with-infisical pnpm dev
with-infisical pnpm check
```

Secrets are inherited only by the command launched through the wrapper. The wrapper removes `INFISICAL_TOKEN` from the child process environment, but trusted sandbox code can still read the protected token file.

## Refresh an expired token

Reload the Universal Auth credentials into the local shell, then run:

```sh
task remote:secrets:refresh NAME=01
```

This exchanges the client credentials locally and replaces the sandbox token file atomically with restrictive permissions.

## Export `.env.local` only when required

Prefer `with-infisical <command>` because it leaves no plaintext secret file behind. If a tool requires a dotenv file, explicitly export it:

```sh
task remote:secrets:export NAME=01
```

The file is written to `/workspace/.env.local` with mode `0600`. It is ignored by Git, but it remains on the sandbox filesystem until removed or the sandbox is destroyed.

Use a different relative path when necessary:

```sh
task remote:secrets:export NAME=01 ENV_FILE=.env.development.local
```

Delete materialized files as soon as the requiring tool has finished. `SECRETS=0` bypasses Infisical for administrative commands that do not need secrets:

```sh
task remote:exec NAME=01 SECRETS=0 CMD="rm -f .env.local"
```

## Codex through Aperture

The managed Aperture instance uses one provider:

- Provider ID: `codex`
- Upstream: `https://chatgpt.com/backend-api/codex`
- Authentication: bearer passthrough
- Model: `gpt-5.5`
- Aperture URL: `http://ai.taila8dcf7.ts.net`

There is no `apikey` in the provider configuration. Aperture grants access only to the owning Tailscale login and `tag:daytona`; admin access is restricted to the owning login.

Codex is configured in `~/.codex/config.toml`:

```toml
model = "gpt-5.5"
model_provider = "aperture"

[model_providers.aperture]
name = "Aperture"
base_url = "http://ai.taila8dcf7.ts.net/codex"
wire_api = "responses"
requires_openai_auth = true
```

Run `codex login status` to confirm Codex is signed in with ChatGPT, then send a request normally. The `/codex` path is required: Aperture strips it before forwarding the request to the ChatGPT backend.

Only inference traffic passes through Aperture. ChatGPT login and token refresh connect directly to OpenAI, and Aperture does not persist the OAuth token as a provider credential.

### OpenCode limitation

Do not add the Anthropic configuration generated by Aperture's OpenCode card. Its `apiKey: "not-required"` value is only a client-side placeholder, but that card configures Claude rather than the Codex subscription provider.

OpenCode's ChatGPT Plus/Pro OAuth transport currently ignores a configured provider `baseURL`, so it cannot satisfy all three requirements at once: ChatGPT subscription OAuth, Aperture routing, and no API key or placeholder credential. Use Codex for the OAuth-passthrough path. OpenCode can be routed through Aperture only with a provider mode that its documented client integration supports, such as a shared platform API key.

### Daytona setup

Create a Tailscale OAuth client with `auth_keys` access limited to `tag:daytona`, then load its credentials locally:

```sh
export TAILSCALE_OAUTH_CLIENT_ID="your-oauth-client-id"
export TAILSCALE_OAUTH_CLIENT_SECRET="your-oauth-client-secret"
export APERTURE_HOST="ai.example.ts.net"
```

Enable the private bridge when creating the sandbox:

```sh
task remote:create NAME=01 APERTURE=1
task remote:aperture:check NAME=01
task remote:codex:login NAME=01
```

The creation flow obtains a one-use, ephemeral Tailscale key, encrypts it for the sandbox, starts `ts-unplug`, and points Codex at the localhost bridge. Resuming the sandbox restarts the bridge from its protected Tailscale state without issuing another auth key.

Do not store Tailscale auth keys, OAuth client secrets, ChatGPT OAuth tokens, Infisical client secrets, or provider credentials in this repository.
