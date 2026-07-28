---
name: agent-browser
description: Use agent-browser to validate web UI changes in a real browser on desktop and mobile viewports, inspect page errors, and capture screenshots.
---

# Browser validation

Use the typed `agent_browser_*` MCP tools for browser work. Load the bundled `core` skill with `agent_browser_skills_get` before a browser workflow.

For UI changes:

- Start the application on a local address reachable from Chromium.
- Open the affected routes and use snapshots before interacting with elements.
- Check both desktop and mobile viewports.
- Inspect browser console and page errors.
- Verify the requested behavior, not only that the page renders.
- Take a screenshot when visual evidence is useful.

If Chromium is unavailable, use `agent_browser_install` and retry.
