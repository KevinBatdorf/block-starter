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
- The nightly workflow runs on `pull_request` and `workflow_dispatch` as well as on a schedule. A nightly-only failure is otherwise unverifiable on a branch: `workflow_dispatch` alone does not help, since GitHub only offers it for workflows already on the default branch.
- `BASE_PORT`, `WP_VERSION` and `RUN_PROJECT` are env overrides. `BASE_PORT` matters when a dev site already holds 9400; `WP_VERSION=nightly` reproduces a nightly failure locally.

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

**When a spec must pass on both stable and nightly**, neither root works alone.
`editor.canvas` is always `frameLocator('[name="editor-canvas"]')`, so it finds
nothing on a build that renders blocks outside the iframe. Probe for the block
itself — the iframe element is present either way, so counting it picks the
frame on builds that do not use it.

```typescript
const BLOCK = '[data-type="my/block"]';

const canvasRoot = async (page: Page, editor: Editor) =>
	(await editor.canvas.locator(BLOCK).count().catch(() => 0)) > 0
		? editor.canvas
		: page;
```

**`InspectorControls` render only while the settings sidebar is open.** Call
`await editor.openDocumentSettingsSidebar()` before asserting on anything inside
one, rather than relying on WordPress leaving the sidebar open by default.

## Common Pitfalls

- **Never use `page.goBack()`.** WP Playground crashes. Split into separate tests instead.
- **No retries.** `retries: 0` in config. Retries mask real failures.
- **State leaks between tests.** Tests in the same spec share a Playground instance. Theme, settings, and block defaults persist. Explicitly reset anything a previous test might have changed.
- **Duplicate IDs.** Some WP components render both a visible element and a loading placeholder with the same ID. Use `button#my-id` instead of `#my-id` to avoid strict mode violations.
- **Hidden elements.** Some blocks have hidden elements (e.g., copy-button textarea) that match generic selectors like `pre` or `getByText`. Use specific selectors to exclude them.
- **`admin.createNewPost()` re-dispatches preferences.** It sets `core/preferences` through `page.evaluate` after the editor loads, which intermittently throws `RangeError: Maximum call stack size exceeded` and takes down whichever spec hits it in `beforeEach`. `setup.php` already seeds those preferences, so visit the page directly instead. Seed `fullscreenMode` there too, since `createNewPost` was setting it.

```typescript
export async function newPost(admin: Admin, title: string) {
	await admin.visitAdminPage(
		'post-new.php',
		new URLSearchParams({ post_title: title }).toString(),
	);
}
```

## Assertions

- **Always `await` an `expect`.** A missing `await` never gates the test, so the spec passes while asserting nothing.
- **`count()` does not retry.** It returns `0` on anything not yet rendered, which reads as an intermittent failure. Settle first — `await expect(links.first()).toBeVisible()` — then count. Upper-bound assertions have the same hole in reverse: `0` passes them for the wrong reason.
- Use `toBeInViewport()` not `toBeVisible()` for content hidden by `max-height` / `overflow: hidden`. Playwright considers overflow-hidden elements as "visible."
- Use `expect.poll()` or `expect(...).toPass({ timeout })` for async operations (WASM compilation, REST API saves, React re-renders) instead of `waitForTimeout`.
- Use `{ timeout: 10000 }` on `toHaveCSS` when checking dynamically applied styles.

## Preview / Front-End Testing

- `admin.createNewPost()` creates a post, not a page. Preview URL: `/?p=${postId}&preview=true`.
- Save the draft and wait for the saved state before navigating to preview.
- On the front end, use `page.locator('.wp-block-...')` — no `editor.canvas` needed.

## Config

- `playwright.config.ts` and `scripts/run-e2e.mjs` use `node:fs` `globSync`, which needs Node 22+ at runtime. `@types/node` is pinned to v20 by `@wordpress/e2e-test-utils-playwright` and predates it, but `tsconfig.json` only includes `src`, so neither file is type-checked. Adding either to `tsconfig` means bumping those types or switching to `fast-glob` first.
- Use `.filter((s): s is { ... } => s !== null)` instead of `.filter(Boolean)` for type narrowing.
