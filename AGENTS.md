# Repository Guidelines

## Git Workflow

- Use the Graphite CLI (`gt`) for branch creation, switching, synchronization, and submission.
- Use `git` only for operations Graphite does not cover, such as inspecting state and diffs.

## Code Quality

- Run `pnpm fix` to format and auto-fix with Ultracite, Oxlint, and Oxfmt.
- Run `pnpm check` before committing.
- Keep code accessible, type-safe, focused, and explicit.
- Prefer `const`, meaningful names, early returns, and `unknown` over `any`.
- Do not commit `console.log`, `debugger`, `.only`, or `.skip` calls.

## TypeScript

- Use explicit parameter and return types when they improve clarity.
- Prefer type narrowing over assertions and use `as const` for immutable literal data.
- Use optional chaining and nullish coalescing when values may be absent.
- Avoid magic values; extract meaningful constants when the value is not self-explanatory.

## Code Structure

- Keep functions focused and reduce nesting with early returns.
- Extract complex conditions into clearly named boolean values.
- Prefer `for...of` over `.forEach()` when control flow or asynchronous work is involved.
- Avoid nested ternaries, barrel files, and spread-based accumulators in loops.
- Use top-level regular expressions instead of recreating them inside functions or loops.

## Effect

- Use Effect for application workflows that can fail, perform asynchronous work, manage resources, or require dependency injection.
- Model expected failures as typed errors in the Effect error channel instead of using `try`/`catch` for control flow.
- Use `Effect.try` or `Effect.tryPromise` only at boundaries that call APIs which can throw or reject.
- Keep simple synchronous validation and pure transformations as ordinary TypeScript.

## Accessibility And Security

- Use semantic HTML, meaningful alternative text, proper heading order, and labels for form controls.
- Ensure interactive behavior works with a keyboard and preserves visible focus.
- Add `rel="noopener"` to links that use `target="_blank"`.
- Do not use `eval`, assign untrusted values to HTML, or write directly to `document.cookie`.
- Validate untrusted input at system boundaries.

## Testing

- Put assertions inside `test` blocks and use async/await for asynchronous tests.
- Do not commit `.only`, `.skip`, or callback-style async tests.
- Keep test suites focused and avoid excessive `describe` nesting.
