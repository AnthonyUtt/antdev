# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a marketing website for AntDev, a software shop based in Roanoke, VA. The site is built with Eleventy.js (11ty) v3.0 and uses Liquid templates, Sass for styling, and is based on the web-starter template.

## Development Commands

### Build and Serve
- `pnpm run build` - Build the site for production (output to `public/`)
- `pnpm run serve` or `pnpm start` - Start development server with live reload

### Package Manager
- This project uses **pnpm** as the package manager (specified via `packageManager` field)
- Always use `pnpm` commands, not npm or yarn

## Architecture

### Directory Structure

```
src/
├── _data/           # Global data files (site config, helpers)
├── _includes/       # Templates, layouts, partials, and SVGs
│   ├── layouts/     # Page layouts
│   └── partials/    # Reusable components and site sections
├── filters/         # Eleventy filters (date formatting, etc.)
├── shortcodes/      # Eleventy shortcodes (asset hash, current year, link state)
├── static/          # Static assets (copied to root of output)
│   ├── fonts/       # Web fonts (Nunito Sans, Share Tech Mono)
│   ├── scripts/     # Client-side JavaScript
│   └── assets/      # Images and other assets
├── styles/          # Sass stylesheets
│   ├── blocks/      # Component and section styles
│   ├── functions/   # Sass functions
│   ├── mixins/      # Sass mixins
│   └── utilities/   # Utility classes
└── utils/           # Build-time utilities (collections, etc.)
```

### Configuration

**Eleventy Config (`eleventy.config.js`):**
- Input: `src/` directory
- Output: `public/` directory
- Template engines: Liquid for all files (markdown, HTML, Liquid templates)
- Template formats: `md`, `html`, `liquid`, `11ty.js`

**Key Eleventy Features:**
1. **Sass Pipeline** - Custom extension processes `.scss` files (skips files starting with `_`)
2. **Collections** - Defined for work, featured work, blog posts, and people
3. **Plugins** - RSS plugin enabled
4. **Passthrough Copy** - `src/static/` contents copied to output root

### Styling System

The site uses a **utility-first design system** powered by Gorko with custom Sass configuration in `src/styles/_config.scss`:

**Design Tokens:**
- **Size Scale**: Perfect Fourth scale (`300` to `major`) based on 1rem
- **Colors**: Comprehensive palette with primary/secondary/tertiary/quaternary/quinary colors, each with shade/glare variants, plus dark/light theme colors
- **Breakpoints**: `md` (37em), `lg` (62em)
- **Typography**: Nunito Sans (base), Share Tech Mono (accent/mono)

**Utility Classes Generated:**
- Background colors, text colors, font sizes, spacing (margin-top via `gap-top`), flow space, typography settings (leading, weight, measure)
- Responsive utilities for: flow-space, gap-top, measure, text size
- Custom utilities in `src/styles/utilities/`: dot-shadow, flow, frame, panel, radius, site-wrap, visually-hidden, wrapper

**Component Styles:**
- Located in `src/styles/blocks/components/` and `src/styles/blocks/site/`
- Organized by component type (buttons, CTAs, FAQs, theme toggle, sticky button, header, footer, navigation, logo)

### Data and Helpers

**Site Data (`src/_data/site.json`):**
- Site name, URL, description, author info, copyright
- Navigation structure

**Global Helpers (`src/_data/helpers.js`):**
- `getLinkActiveState()` - Determines active navigation state
- `getSiblingContent()` - Gets related content from collections with randomization
- `filterCollectionByKeys()` - Filters collections by key attribute

**Random ID Generator (`src/_data/global.js`):**
- `random()` - Generates unique IDs for use in templates

### Filters and Shortcodes

**Filters:**
- `dateFilter` - Format dates for display
- `w3DateFilter` - Format dates for W3C/ISO standards

**Shortcodes:**
- `assetHash` - Cache-busting hash for assets
- `currentYear` - Dynamic copyright year
- `getLinkActiveState` - Active link state for navigation

## Working with Content

### Collections

Four main collections are available in templates:
- `work` - Portfolio items (from `src/work/*.md`), sorted by display order
- `featuredWork` - Featured portfolio items only (filtered by `featured: true`)
- `blog` - Blog posts (from `src/posts/*.md`), reverse chronological
- `people` - Team members (from `src/people/*.md`), sorted by filename

### Adding New Filters or Shortcodes

1. Create the function file in `src/filters/` or `src/shortcodes/`
2. Import and register it in the respective `index.js` file
3. Both follow the pattern: export default function that receives the Eleventy config object

### Static Assets

Place files in `src/static/` - they will be copied to the root of the output directory:
- Fonts → `/fonts/`
- Scripts → `/scripts/`
- Images → `/assets/images/`
- Favicons and manifests → root

## Design System Usage

When styling components:
1. Use utility classes from the generated system (e.g., `bg-primary`, `text-600`, `gap-top-500`)
2. Use responsive utilities with breakpoint prefixes (e.g., `md:text-700`, `lg:measure-long`)
3. Use Sass functions in component styles:
   - `get-color($key)` - Get color from palette
   - `get-size($key)` - Get size from scale
   - `get-config-value($group, $key)` - Get any config value
   - `get-utility-value($group, $key)` - Get utility value
4. Use mixins:
   - `apply-utility($group, $key)` - Apply utility styles
   - `media-query($key)` - Responsive breakpoints
   - `apply-theme-color($property, $color-key)` - Theme-aware colors

## Theme Support

The site includes dark mode support:
- Toggle component in `src/_includes/partials/components/theme-toggle.liquid`
- Client-side script in `src/static/scripts/dark-mode.js`
- Theme colors defined in config (dark/light with shade/glare variants)
