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
