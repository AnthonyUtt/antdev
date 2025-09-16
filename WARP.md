# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an Eleventy (11ty) v3.0 static site generator starter project using:
- **Build System**: Eleventy with ES modules (`"type": "module"`)
- **Package Manager**: pnpm (v10.16.1)
- **Templating**: Liquid templates
- **Styling**: Sass/SCSS with a custom utility-first CSS framework (Gorko)
- **Content**: Markdown with front matter

## Common Development Commands

```bash
# Install dependencies
pnpm install

# Start development server with hot reload
pnpm start

# Alternative development server
pnpm run serve

# Build for production
pnpm run build

# Direct Eleventy commands
eleventy --serve      # Development server
eleventy             # Production build
```

## Project Architecture

### Directory Structure
- `src/` - Source files (input directory)
- `public/` - Built output (output directory) 
- `eleventy.config.js` - Main Eleventy configuration file

### Key Architecture Patterns

#### Template System (Liquid)
- **Base Layout**: `src/_includes/layouts/_base.liquid` - Main HTML wrapper
- **Page Layout**: `src/_includes/layouts/page.liquid` - Content pages wrapper
- **Partials**: `src/_includes/partials/` - Reusable components (header, footer, navigation, metadata, pagination, RSS)

#### Data & Configuration
- `src/_data/site.json` - Site-wide configuration (name, URL, navigation, author info)
- `src/_data/global.js` - JavaScript-based global data (random ID generation)
- `src/_data/helpers.js` - Helper functions for templates

#### Custom Eleventy Extensions

**Filters** (`src/filters/`):
- Date formatting filters for display and W3C compliance
- Centrally registered in `src/filters/index.js`

**Shortcodes** (`src/shortcodes/`):
- Asset hash generation for cache busting
- Active link state detection for navigation
- Centrally registered in `src/shortcodes/index.js`

**Collections** (defined in `eleventy.config.js`):
- `work` - Portfolio/work items sorted by display order
- `featuredWork` - Featured work items only
- `blog` - Blog posts in reverse chronological order
- `people` - People sorted by filename number

#### Styling Architecture (Gorko Framework)
- **Main Entry**: `src/styles/main.scss`
- **Configuration**: `src/styles/_config.scss` - Design tokens (colors, sizes, fonts, breakpoints)
- **Utility Generation**: Automatic utility class generation from configuration
- **Design System**:
  - Perfect Fourth scale for sizing (`300` to `major`)
  - Color palette with shades/glares for each color
  - Responsive breakpoints (`md`: 37em, `lg`: 62em)
  - Typography scale with custom font stacks

**SCSS Organization**:
- `functions/` - Sass functions for accessing design tokens
- `mixins/` - Sass mixins including utility application and media queries  
- `utilities/` - Utility classes (flow, panel, wrapper, etc.)
- `blocks/` - Component styles (navigation, header, footer)

#### Build Pipeline Features
- **Sass Compilation**: Custom Sass processor with dependency tracking
- **Asset Passthrough**: Direct copy of `src/assets/` to output
- **Template Formats**: Markdown, HTML, Liquid, and 11ty.js files
- **RSS Plugin**: Built-in RSS feed generation capability

### Development Patterns

#### Content Creation
- Pages use Markdown with YAML front matter
- Layout specified via `layout: layouts/page` in front matter
- Custom title handling with `customTitle: true` option

#### Styling Approach
- Utility-first CSS generated from design tokens in `_config.scss`
- Component styles in `blocks/` directory
- Consistent spacing via CSS custom properties and utility classes
- Responsive design through breakpoint-based utilities

#### JavaScript Integration
- ES modules throughout (`import`/`export`)
- Node.js utilities in `src/utils/` for collections and data processing
- Client-side assets handled through passthrough copying

## Development Tips

- The design system uses a Perfect Fourth scale - reference `_config.scss` for exact values
- Utility classes are auto-generated - check the compiled CSS or configuration to see available classes
- Collections are pre-configured for common content types (work, blog, people)
- The asset hash shortcode ensures proper cache busting in production