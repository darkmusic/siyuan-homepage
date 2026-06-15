# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-06-14

### Added

- Initial `CHANGELOG.md`.

### Changed

- Updated `LICENSE` and `README.md` for the new maintainer (`darkmusic`).
- Refreshed developer attribution and timestamp labels in `en_US` and `zh_CN` locale files.
- Simplified homepage settings UI copy in `homepageSetting.svelte`.

### Fixed

- Date labels in document list widgets (for example Favorites) now interpolate `{year}`, `{month}`, and `{day}` tokens correctly, not only `${...}` placeholders.

## [1.0.1] - 2026-06-14

### Added

- `scripts/link_plugin_root.js` to expose built plugin artifacts at the repo root for SiYuan bind-mount development.
- `scripts/verify_plugin_layout.js` and `pnpm verify-plugin` to validate the plugin directory layout SiYuan expects.
- Bundled locale JSON fallback in `src/libs/i18n.ts` when SiYuan does not provide `plugin.i18n` at runtime.

### Changed

- Renamed the package and plugin to `siyuan-homepage-en` (`package.json`, `plugin.json`).
- Build now runs `link_plugin_root.js` after Vite; `i18n/` is copied (not symlinked) into the plugin root.
- `make_dev_link.js` falls back to `dist/` when `dev/index.js` is missing.
- Top bar and dock registration moved to `onLayoutReady()` to match current SiYuan plugin lifecycle requirements.
- Icon registration runs before async work in `onload()`; config loading is null-safe.

## [1.0.0] - 2026-06-14

### Added

- Full English UI support when SiYuan is set to English, with nested locale files under `public/i18n/`.
- `scripts/generate-i18n.mjs` and `scripts/validate-i18n.js`, plus `pnpm validate-i18n`.
- Centralized UAPI client in `src/libs/uapiClient.ts` for weather and hotboard widgets.

### Changed

- Migrated hardcoded Chinese UI strings across homepage, settings, sidebar, mobile homepage, and widget components to the i18n system.
- Refactored weather and HOT widgets to use dedicated fetch helpers instead of inline `UapiClient` usage.
- GitHub Actions release workflow now requests `contents: write` permission.
