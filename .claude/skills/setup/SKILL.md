---
name: setup
description: Rename block-starter to your new plugin
disable-model-invocation: true
---

# Project Setup

Ask the user these questions using AskUserQuestion before making any changes:

1. **Plugin name** — The display name (e.g. "My Cool Block")
2. **Plugin slug** — kebab-case identifier (e.g. "my-cool-block")
3. **WordPress.org slug** — estimated slug for the block namespace (e.g. "myplugins"). This can be changed later if the final WP.org slug differs.
4. **WordPress.org contributor slug** — for readme.txt Contributors field (e.g. "myusername"). Can also be updated later.

Then perform ALL of the following replacements across the entire codebase:

## File Rename

- Rename `block-starter.php` to `{slug}.php`

## Search and Replace

Do these replacements in order (most specific first):

| Find | Replace |
|------|---------|
| `kevinbatdorf/block-starter` | `{wp-slug}/{slug}` |
| `.wp-block-kevinbatdorf-block-starter` | `.wp-block-{wp-slug}-{slug}` |
| `block-starter-editor` | `{slug}-editor` |
| `Block Starter` | `{plugin-name}` |
| `block-starter` | `{slug}` |
| `block_starter` | `{slug_with_underscores}` |
| `kevinbatdorf` | `{wp-slug}` |
| `kbat82` | `{contributor}` |

## Files to Update

- `{slug}.php` (renamed from block-starter.php) — plugin header, text domain, package, translations
- `src/block.json` — block name
- `src/editor/Editor.tsx`, `src/editor/Sidebar.tsx`, `src/editor/icon.tsx`
- `src/front/BlockOutput.tsx`, `src/front/front.ts`
- `webpack.config.js` — prefix variables
- `package.json` — name field
- `composer.json` — namespace
- `readme.txt` — plugin name, contributors, description, URLs
- `README.md` — badges, links, description
- `tests/example.spec.ts` — block name in insertBlock
- `tests/blueprint.json` — plugin path in activatePlugin and runPHP steps
- `.github/workflows/*.yml` — artifact names, SLUG env vars, rsync targets
- `.github/FUNDING.yml` — GitHub username

## After Replacements

1. Run `npm install && npm run build` to regenerate build output
2. Run `composer install` if vendor/ is used
3. Delete this file (`.claude/commands/setup.md`) — it's no longer needed
4. Commit everything as the initial commit for the new project
