import path from 'path';
import * as sass from 'sass';

const BASE_CONFIG = {
  dir: {
    input: "src",
    output: "public",
  },
  markdownTemplateEngine: "njk",
  dataTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  templateFormats: ["md", "html", "njk", "11ty.js"],
};

export default async function(config) {
  setupLayouts(config);
  setupAssetPassthrough(config);
  setupSassPipeline(config);

  return BASE_CONFIG;
};

function setupLayouts(config) {
  config.addLayoutAlias("default", "layouts/default.html.njk");
  config.addLayoutAlias("article", "layouts/article.html.njk");
}

function setupAssetPassthrough(config) {
  config.addPassthroughCopy("src/assets");
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
