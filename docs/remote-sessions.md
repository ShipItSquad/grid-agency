# Remote Daytona sessions

Remote sessions are generic workspaces. A session can be associated with an
issue, pull request, branch, review, spike, or no external object at all.

`NAME` is the short local handle. `CONTEXT` is optional metadata describing
what the workspace is for.

```sh
# One-off work from the current branch
task remote:start NAME=01 PURPOSE="investigate the flaky browser test"

# GitHub issue: creates remote/issue-123
task remote:start NAME=02 CONTEXT=issue:123

# GitHub pull request: fetches refs/pull/456/head into remote/pr-456
task remote:start NAME=review-auth CONTEXT=pr:456

# Existing branch
task remote:start NAME=redesign CONTEXT=branch:feat/redesign
```

By default a session receives 2 vCPUs, 4096 MB RAM, 10 GB disk, and stops after
60 inactive minutes. Override those values when needed:

```sh
task remote:start \
	NAME=large-build \
	CONTEXT=issue:789 \
	CPU=4 \
	MEMORY=8192 \
	DISK=40 \
	AUTO_STOP=30 \
	TARGET=eu
```

Use a prepared Daytona snapshot to reproduce a local development environment
without reinstalling tools for every session:

```sh
task remote:snapshot SNAPSHOT=off-grid-dev
task remote:start NAME=01 SNAPSHOT=off-grid-dev
```

`remote:snapshot` builds from `.devcontainer/Dockerfile` with
`.devcontainer` as its build context. The snapshot build resource flags use
GiB, so `CPU=2 MEMORY=4 DISK=10` are the defaults. The session creation command
uses Daytona's required MB unit for memory, so its equivalent override is
`MEMORY=4096`.

Snapshots already contain their CPU, memory, and disk allocation. When
`SNAPSHOT` is provided, `remote:start` uses those snapshot allocations and
ignores session-level `CPU`, `MEMORY`, and `DISK` values.

The repository is cloned into `/workspace`. Set `CLONE=0` to
create an empty sandbox, `REPO` to override the origin URL, or `GIT_REF` to
choose the base commit/branch:

```sh
task remote:start NAME=blank CLONE=0
task remote:start NAME=release GIT_REF=release
```

Private repositories must be accessible from inside Daytona. Configure
short-lived repository credentials in Daytona; do not put tokens in `REPO`,
`Taskfile.yml`, or `.sessions`.

## Daily commands

```sh
task remote:list
task remote:info NAME=01
task remote:ssh NAME=01
task remote:exec NAME=01 CMD="pnpm install && pnpm check"
task remote:serve NAME=01 PORT=5173
task remote:url NAME=01 PORT=4723
task remote:stop NAME=01
task remote:resume NAME=01
```

`remote:serve` starts Vite by default with
`pnpm exec vite dev --host 0.0.0.0 --port <PORT>`. Supply `CMD` for another
framework or server:

```sh
task remote:serve \
	NAME=api \
	PORT=3000 \
	CMD="pnpm start --host 0.0.0.0 --port 3000"
```

Daytona creates a signed HTTPS URL for each requested port. The mapping is
saved under `.sessions/<NAME>/ports/<PORT>.json`; URLs default to a requested
expiry of 24 hours and can be changed with `EXPIRES=<seconds>`.

Portless maps friendly hostnames to processes listening on the same machine as
the Portless proxy. `remote:portless` creates the required local SSH tunnel and
then registers its local port:

```sh
npm install --global portless
task remote:portless NAME=01 PORT=5173
# http://01.localhost:1355
```

Portless runs without sudo in HTTP mode on port 1355. Override the friendly
name with `ALIAS`, or the local and proxy ports with `LOCAL_PORT` and
`PROXY_PORT`. The Daytona SSH token is held only long enough to start the tunnel
and is never written into `.sessions`.

Stop the session's local tunnels and remove its aliases with:

```sh
task remote:portless:stop NAME=01
```

Stopping preserves the remote filesystem. Destruction is deliberately
separate and prompts for confirmation:

```sh
task remote:destroy NAME=01
```

## Session files

Each workspace gets a local directory:

```text
.sessions/01/
├── session.json       # context, source revision, resources, lifecycle
├── sandbox.json       # latest response from `daytona info`
├── ssh                # executable shortcut; creates a fresh SSH token
├── exec               # executable command shortcut
├── bootstrap.log      # repository setup output, when applicable
├── daytona-info.log   # errors from the last info refresh
└── ports/
    ├── 5173.json      # signed URL metadata
    └── 5173.url       # URL-only convenience file
```

SSH tokens are intentionally not stored. `task remote:ssh` or
`.sessions/01/ssh` asks Daytona for a fresh token on each connection.

## Setup

```sh
task remote:init
task remote:login
task remote:check
```

`remote:init` is idempotent: it prints the installed version when Daytona is
already available. On macOS it installs through Homebrew; on Linux it installs
the official binary for `amd64` or `arm64`.

`remote:login` opens Daytona's browser authentication by default. For
non-interactive use, provide the API key through the process environment so it
is not stored in the Taskfile or `.sessions`:

```sh
DAYTONA_API_KEY="..." task remote:login
```
