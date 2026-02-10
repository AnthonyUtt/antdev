import path from 'path';
import sharp from 'sharp';

// Must match the widths in image-pipeline.js
const IMAGE_WIDTHS = [400, 800, 1200, 1600];

/**
 * Generate a responsive image tag with srcset
 * @param {string} src - Path to the original image (e.g., "/assets/images/blog/photo.jpg")
 * @param {string} alt - Alt text for the image
 * @param {string} [sizes] - Sizes attribute (defaults to full width)
 * @param {string} [className] - Optional CSS class(es)
 * @param {boolean} [lazy=true] - Whether to lazy load the image
 * @returns {string} - HTML img tag with srcset
 */
export default async function responsiveImage(src, alt = '', sizes = '100vw', className = '', lazy = true) {
  const parsed = path.parse(src);
  const dir = parsed.dir;
  const name = parsed.name;
  const ext = parsed.ext;

  // Read the source image to get its actual dimensions
  // Convert the URL path to the source file path
  const sourcePath = path.join('src', src.replace(/^\//, ''));
  let originalWidth = 1920; // fallback

  try {
    const metadata = await sharp(sourcePath).metadata();
    originalWidth = metadata.width;
  } catch (e) {
    // If we can't read the image, fall back to including all sizes
    console.warn(`Could not read image metadata for ${sourcePath}: ${e.message}`);
  }

  // Build srcset entries only for widths smaller than original
  const srcsetEntries = [];

  for (const width of IMAGE_WIDTHS) {
    if (width < originalWidth) {
      const resizedPath = `${dir}/${name}-${width}${ext}`;
      srcsetEntries.push(`${resizedPath} ${width}w`);
    }
  }

  // Add the original as the largest option
  srcsetEntries.push(`${src} ${originalWidth}w`);

  const srcset = srcsetEntries.join(', ');
  const classAttr = className ? ` class="${className}"` : '';
  const loadingAttr = lazy ? ' loading="lazy"' : '';

  return `<img src="${src}" srcset="${srcset}" sizes="${sizes}" alt="${alt}"${classAttr}${loadingAttr}>`;
}
