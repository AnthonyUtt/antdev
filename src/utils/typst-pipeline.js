import { execSync } from 'child_process';
import path from 'path';

export function setupTypstPipeline(config) {
  config.addExtension("typ", {
    outputFileExtension: "pdf",
    useLayouts: false,

    // Override the output path to go to /resources/
    getOutputPath: function(inputPath, outputDir) {
      const parsed = path.parse(inputPath);
      // Skip files starting with underscore (partials/templates)
      if (parsed.name.startsWith("_")) {
        return false;
      }
      return path.join(outputDir, "resources", `${parsed.name}.pdf`);
    },

    compile: async function(inputContent, inputPath) {
      const parsed = path.parse(inputPath);

      // Skip files starting with underscore
      if (parsed.name.startsWith("_")) {
        return;
      }

      return async () => {
        try {
          // Compile using typst CLI, output to stdout as bytes
          const fontPath = path.join(process.cwd(), 'src/static/fonts');
          const result = execSync(`typst compile --font-path "${fontPath}" "${inputPath}" -`, {
            encoding: 'buffer',
            cwd: process.cwd(),
          });
          return result;
        } catch (error) {
          console.error(`[Typst] Error compiling ${inputPath}:`, error.message);
          throw error;
        }
      };
    },
  });

  config.addTemplateFormats("typ");
}
