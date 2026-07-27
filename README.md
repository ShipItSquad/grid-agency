# OFF/GRID

A static SvelteKit site for a fictional independent design practice. The project includes a home page, project playground, journal, studio page, and a mocked services modal.

## Stack

- Svelte 5 and SvelteKit
- TypeScript
- Static adapter for GitHub Pages
- pnpm

## Local development

```sh
pnpm install
pnpm dev
```

Run the production checks with:

```sh
pnpm check
pnpm lint
pnpm build
```

## Content structure

Mock projects, journal posts, and services live in `src/lib/data.ts`. Shared site components are in `src/lib/components`, while each public URL has its own route under `src/routes`.

The services interface is intentionally a display-only modal. Its content model and entry point are ready to connect to a real enquiry flow later.

## GitHub Pages

The workflow at `.github/workflows/deploy.yml` builds and deploys every push to `main`. It derives the repository base path automatically, so links and assets work on project Pages URLs such as `https://username.github.io/repository/`.

In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. Push the project to the `main` branch; no separate `gh-pages` branch is required.

For a user or organization Pages repository named `username.github.io`, change the workflow's `BASE_PATH` value to an empty string.

## OpenCode GitHub automation

The workflow at `.github/workflows/opencode.yml` enables every event type supported by the OpenCode GitHub integration:

- `/oc` and `/opencode` commands in issue, pull request, and line-review comments
- Automatic reviews when pull requests are opened or updated
- Automatic triage when issues are opened or edited
- A maintenance task every Monday at 09:00 UTC
- Manually prompted tasks from the Actions tab

Before enabling the workflow, add `OPENAI_API_KEY` under **Settings > Secrets and variables > Actions > Secrets**. The workflow uses `openai/gpt-5.2` by default; set the optional `OPENCODE_MODEL` Actions variable to another `provider/model` value when needed, and add that provider's API-key secret to the workflow environment.

The workflow uses GitHub's built-in `GITHUB_TOKEN` with job-specific permissions, so a personal access token is not required. Installing the [OpenCode GitHub App](https://github.com/apps/opencode-agent) is optional with this setup; install it instead if comments, commits, and pull requests should be attributed to the app.
