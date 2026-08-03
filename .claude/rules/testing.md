---
path: tests/**
---

# Playwright + WP Playground Testing Guidelines

## How It Works

- Each `*.spec.ts` file is its own Playwright project, CI matrix job, and WP Playground instance.
- The `playwright.config.ts` auto-discovers specs by finding `*.spec.ts` files and walking up from the spec's directory to find the closest `blueprint.json`. A shared blueprint in `tests/` serves all specs unless a subdirectory provides its own override.
- Multiple specs sharing the same `blueprint.json` share a Playground instance. To isolate a test, give it its own directory with its own `blueprint.json`.
- Each spec = one separate GitHub Actions runner = one fresh WP Playground instance. They do NOT share state across specs. Tests within the same spec DO share state.
- Each `blueprint.json` activates the plugin, defines `WP_DEBUG`, and runs `setup.php` to dismiss welcome guides.

## Editor Canvas vs Page

WordPress renders the block editor inside an iframe.

- `editor.canvas` — use for anything inside the editor: blocks, text content, inline styles.
- `page` — use for sidebar panels, toolbar buttons, settings controls.

Example:
```typescript
// Block content (inside iframe)
const block = editor.canvas.locator('[data-type="my/block"]');

// Sidebar control (outside iframe)
await page.getByRole('button', { name: 'Settings' }).click();
```

## Common Pitfalls

- **Never use `page.goBack()`.** WP Playground crashes. Split into separate tests instead.
- **Retries are CI-only.** `retries: process.env.CI ? 1 : 0` in config. One CI retry absorbs WP Playground flakes (random 500s); local runs stay at 0 so real failures surface.
- **Always `await` expect assertions.** A floating `expect(...).toContainText(...)` races test teardown — it passes while renders are fast and fails when they slow down.
- **State leaks between tests.** Tests in the same spec share a Playground instance. Theme, settings, and block defaults persist. Explicitly reset anything a previous test might have changed.
- **Duplicate IDs.** Some WP components render both a visible element and a loading placeholder with the same ID. Use `button#my-id` instead of `#my-id` to avoid strict mode violations.
- **Hidden elements.** Some blocks have hidden elements (e.g., copy-button textarea) that match generic selectors like `pre` or `getByText`. Use specific selectors to exclude them.

## Assertions

- Use `toBeInViewport()` not `toBeVisible()` for content hidden by `max-height` / `overflow: hidden`. Playwright considers overflow-hidden elements as "visible."
- Use `expect.poll()` or `expect(...).toPass({ timeout })` for async operations (WASM compilation, REST API saves, React re-renders) instead of `waitForTimeout`.
- Use `{ timeout: 10000 }` on `toHaveCSS` when checking dynamically applied styles.

## Preview / Front-End Testing

- `admin.createNewPost()` creates a post, not a page. Preview URL: `/?p=${postId}&preview=true`.
- Save the draft and wait for the saved state before navigating to preview.
- On the front end, use `page.locator('.wp-block-...')` — no `editor.canvas` needed.

## Config

- Use `fast-glob` not `node:fs` `globSync` — `@types/node` is pinned to v20 by `@wordpress/e2e-test-utils-playwright`.
- Use `.filter((s): s is { ... } => s !== null)` instead of `.filter(Boolean)` for type narrowing.
