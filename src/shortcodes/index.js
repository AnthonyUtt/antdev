import assetHash from './asset-hash.js';
import currentYear from './current-year.js';
import getLinkActiveState from './get-link-active-state.js';
import responsiveImage from './responsive-image.js';

export default (config) => {
  config.addShortcode('assetHash', assetHash);
  config.addShortcode('currentYear', currentYear);
  config.addShortcode('getLinkActiveState', getLinkActiveState);
  config.addAsyncShortcode('responsiveImage', responsiveImage);

  // Add more shortcodes here as needed
};
