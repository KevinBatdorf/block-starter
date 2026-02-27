![Playwright Tests](https://github.com/kevinbatdorf/block-starter/actions/workflows/playwright.yml/badge.svg?branch=main)


## block-starter

An opinionated starter template for crafting WordPress block plugins.

[![Twitter](https://img.shields.io/twitter/url/https/twitter.com/kevinbatdorf.svg?style=social&label=Follow%20%40kevinbatdorf)](https://twitter.com/kevinbatdorf)


### Features

- Tailwind v4 scoped separately to editor and frontend styles
- TypeScript
- Biomejs for linting and formatting
- Playwright for end-to-end testing using WP Playground
- Runs the Plugin Check from WordPress on main and release
- Auto deployment to WordPress.org SVN on release (via 10up Action)

### Usage

- Click "Use this template" at the top+right of the repo
- Search/replace `kevinbatdorf` with your namespace/username
- Search/replace `block-starter` with your plugin slug.
- Update `block-starter.php` to match your new plugin slug
- Run `composer install` to install PHP dev dependencies (sometimes needed for autocomplete in IDEs)
- Run `npm install` to install dependencies
- Run `npm run start` to start the dev server

### Note

- If your plugin slug doesn't match your GitHub repo name, you'll need to update the `runPHP` step in the `tests/playwright.yml` workflow to require the correct file.


<div align="center">
    <img src="https://raw.githubusercontent.com/kevinbatdorf/block-starter/main/.wordpress-org/screenshot-1.jpg" alt="block-starter" />
</div>


<!-- This is to prevent the GH Actions scheduler from pausing -->


















































































































































<!-- Playwright last run: 2026-02-27 08:20:58 UTC -->
