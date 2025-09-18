# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## About This Project

This is a marketing site for antdev, a software shop based in Roanoke, VA. The site is built with Eleventy.js and is based on the [web-starter template](https://github.com/AnthonyUtt/web-starter). It uses pnpm as the package manager and has Nix flake support for reproducible development environments.

## Essential Commands

### Development
```bash
# Start development server with hot reload
pnpm start
# or
pnpm run serve

# Build the site for production
pnpm run build
# or
eleventy
```

### Nix Development Environment
```bash
# Enter Nix development shell (auto-installs deps)
nix develop

# Build using Nix
nix build
```

### Package Management
```bash
# Install dependencies
pnpm install

# Add new dependency
pnpm add <package-name>

# Add dev dependency
pnpm add --dev <package-name>
```

## Architecture & Structure

### Core Architecture
- **Static Site Generator**: Eleventy.js v3
- **Template Engine**: Liquid (for Markdown, HTML, and data)
- **Styling**: Sass/SCSS with custom pipeline
- **Package Manager**: pnpm with lock file
- **Build System**: Eleventy with custom extensions and plugins

### Key Configuration Files
- `eleventy.config.js` - Main Eleventy configuration with plugins, collections, and Sass pipeline
- `package.json` - Dependencies and npm scripts
- `flake.nix` - Nix development environment with Node.js 22 and pnpm
- `src/_data/site.json` - Site metadata and navigation configuration

### Directory Structure
```
src/
├── _data/           # Global data files (site.json, helpers, etc.)
├── filters/         # Eleventy filters (date formatting, etc.)
├── shortcodes/      # Eleventy shortcodes (asset hashing, navigation)
├── styles/          # Sass/SCSS files (_config, _reset, main)
├── utils/           # Utility functions (collections sorting)
└── *.md, *.html     # Pages and templates
```

### Collections System
The site uses Eleventy collections for content organization:
- `work` - Work portfolio items (sorted by displayOrder)
- `featuredWork` - Featured work items only
- `blog` - Blog posts (reverse chronological)
- `people` - Team/people pages (sorted by file slug number)

### Custom Extensions
- **Sass Pipeline**: Compiles `.scss` files to `.css` with dependency tracking
- **Asset Passthrough**: Copies `src/assets` to build output
- **RSS Plugin**: Generates RSS feeds for blog content

### Template System
- Uses Liquid templating for all content types
- Custom shortcodes for asset hashing and navigation state
- Date filters for formatting timestamps
- Content is organized with frontmatter metadata including `displayOrder` and `featured` flags

### Build Process
1. Eleventy processes templates and content from `src/` directory
2. Sass files are compiled with custom pipeline (ignoring `_` prefixed files)
3. Assets are copied through passthrough
4. Output is generated in `public/` directory

## Development Notes

### Content Management
- Work portfolio items should include `displayOrder` for sorting
- Use `featured: true` in frontmatter to include in featured work collection
- Blog posts are automatically sorted by date (newest first)
- People pages are sorted numerically by filename

### Styling
- Main Sass entry point is `src/styles/main.scss`
- Partial files should be prefixed with `_` and won't be compiled directly
- Sass compilation includes dependency tracking for proper rebuilds

### Adding New Features
- Filters: Add to `src/filters/index.js` and create individual filter files
- Shortcodes: Add to `src/shortcodes/index.js` and create individual shortcode files
- Collections: Define in `eleventy.config.js` using glob patterns
- Utilities: Add to `src/utils/` and import as needed

## Environment Setup

The project supports both traditional Node.js development and Nix-based development:

**Traditional**: Requires Node.js 22+ and pnpm
**Nix**: Run `nix develop` for automatic environment setup with all dependencies