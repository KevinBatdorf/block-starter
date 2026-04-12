---
description: Setting up a new project from block-starter
globs: "**/*"
---

# Block Starter — New Project Setup

When renaming this project from `block-starter` to a new plugin, the following replacements are needed across the codebase:

## Replacements

| Find | Replace with | Example |
|------|-------------|---------|
| `kevinbatdorf` | your WordPress.org username or namespace | `myplugins` |
| `kbat82` | your WordPress.org contributor slug | `myusername` |
| `block-starter` | your plugin slug (kebab-case) | `my-cool-block` |
| `block_starter` | your plugin slug (snake_case) | `my_cool_block` |
| `Block Starter` | your plugin display name | `My Cool Block` |

## Files That Need Changes

**Plugin entry point** — rename `block-starter.php` to `{your-slug}.php`:
- Plugin Name, Text Domain, @package in header
- `wp_set_script_translations` call

**Block registration** — `src/block.json`:
- `name` field: `kevinbatdorf/block-starter` → `{namespace}/{slug}`

**All source files referencing the block name:**
- `src/editor/Editor.tsx`, `src/editor/Sidebar.tsx`, `src/editor/icon.tsx`
- `src/front/BlockOutput.tsx`, `src/front/front.ts`
- `tests/example.spec.ts`

**Styles** — `webpack.config.js`:
- `prefix` variable: `.wp-block-kevinbatdorf-block-starter`
- `editorPrefix` variable: `.block-starter-editor`

**Package files:**
- `package.json` — `name` field
- `composer.json` — namespace references

**WordPress readme:**
- `readme.txt` — plugin name, contributors, description, GitHub URLs
- `README.md` — badges, links, description

**CI workflows** (`.github/workflows/`):
- `build-production-zip.yml` — rsync target dir, artifact name
- `release-to-wp-org.yml` — SLUG env var
- `update-wordpress-readme.yml` — SLUG env var
- `plugin-check.yml` — rsync target dir, build-dir
- `FUNDING.yml` — GitHub username

**Test blueprint:**
- `tests/blueprint.json` — plugin path in `activatePlugin` and `runPHP` steps

**Build outputs** — `build/` directory will regenerate after `npm run build`.
**Vendor** — `vendor/` will regenerate after `composer install`.
