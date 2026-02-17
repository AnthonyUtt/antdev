import path from 'path';
import * as sass from 'sass';
import rssPlugin from '@11ty/eleventy-plugin-rss';

import initFilters from './src/filters/index.js';
import initShortcodes from './src/shortcodes/index.js';
import { sortByDisplayOrder } from './src/utils/collections.js';
import { setupImagePipeline } from './src/utils/image-pipeline.js';
import { setupTypstPipeline } from './src/utils/typst-pipeline.js';

const BASE_CONFIG = {
  dir: {
    input: "src",
    output: "public",
  },
  markdownTemplateEngine: "liquid",
  dataTemplateEngine: "liquid",
  htmlTemplateEngine: "liquid",
  templateFormats: ["md", "html", "liquid", "11ty.js"],
};

export default async function(config) {
  initFilters(config);
  initShortcodes(config);

  setupPlugins(config);
  setupAssetPassthrough(config);
  setupSassPipeline(config);
  setupImagePipeline(config);
  setupTypstPipeline(config);

  addCollections(config);

  config.addTransform("external-links", function(content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      return content.replace(
        /<a\s+href="(https?:\/\/[^"]*)"([^>]*)>/g,
        (match, url, rest) => {
          if (url.startsWith("https://antdev.sh")) return match;
          if (rest.includes("target=")) return match;
          return `<a href="${url}"${rest} target="_blank" rel="noopener">`;
        }
      );
    }
    return content;
  });

  return BASE_CONFIG;
};

function addCollections(config) {
  config.addCollection("work", (collection) => {
    return sortByDisplayOrder(collection.getFilteredByGlob("src/work/*.md"));
  });

  config.addCollection("featuredWork", (collection) => {
    return sortByDisplayOrder(
      collection.getFilteredByGlob("src/work/*.md")
        .filter(item => item.data.featured)
    );
  });

  config.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("src/posts/*.md")].reverse();
  });

  config.addCollection('people', (collection) => {
    return collection.getFilteredByGlob('src/people/*.md').sort((a, b) => {
      return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
    });
  });
}

function setupPlugins(config) {
  config.addPlugin(rssPlugin);
}

function setupAssetPassthrough(config) {
  config.addPassthroughCopy({ 'src/static': '.' })
}

function setupSassPipeline(config) {
  config.addExtension("scss", {
    outputFileExtension: "css",
    useLayouts: false,
    compile: async function(inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      // Don't compile finenames that start with an underscore
      if (parsed.name.startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [
          parsed.dir || ".",
          this.config.dir.includes,
        ],
        sourceMap: false,
      });

      this.addDependencies(inputPath, result.loadedUrls);

      return async () => {
        return result.css;
      };
    },
  });
  config.addTemplateFormats("scss");
}
