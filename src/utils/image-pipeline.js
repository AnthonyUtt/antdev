import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

// Standard widths to generate
const IMAGE_WIDTHS = [400, 800, 1200, 1600];

// Regex to detect if filename already has a size suffix
const SIZE_SUFFIX_REGEX = /-\d+$/;

/**
 * Set up the image processing pipeline for Eleventy
 * Processes images in src/assets/images/ and outputs to public/assets/images/
 * @param {object} config - Eleventy config object
 */
export function setupImagePipeline(config) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];

  for (const ext of imageExtensions) {
    config.addTemplateFormats(ext);

    config.addExtension(ext, {
      outputFileExtension: ext,
      useLayouts: false,

      compile: async function(inputContent, inputPath) {
        // Only process images in src/assets/images/ (not src/static/)
        if (!inputPath.includes('src/assets/images/')) {
          return;
        }

        const parsed = path.parse(inputPath);

        // Skip if filename already has a size suffix
        if (SIZE_SUFFIX_REGEX.test(parsed.name)) {
          return;
        }

        // Read the image file as a buffer
        const imageBuffer = await fs.readFile(inputPath);
        const image = sharp(imageBuffer);
        const metadata = await image.metadata();
        const originalWidth = metadata.width;

        // Return a function that will be called to get the output
        return async (data) => {
          // Generate resized versions
          const outputDir = path.dirname(data.page.outputPath);
          await fs.mkdir(outputDir, { recursive: true });

          // Generate each size variant smaller than original
          for (const width of IMAGE_WIDTHS) {
            if (width >= originalWidth) {
              continue;
            }

            const outputFilename = `${parsed.name}-${width}${parsed.ext}`;
            const outputPath = path.join(outputDir, outputFilename);

            await sharp(imageBuffer)
              .resize(width, null, {
                withoutEnlargement: true,
                fit: 'inside',
              })
              .toFile(outputPath);
          }

          // Return the original image buffer for the main output
          return imageBuffer;
        };
      },
    });
  }
}
