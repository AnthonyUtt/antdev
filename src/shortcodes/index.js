import assetHash from './asset-hash.js';
import getLinkActiveState from './get-link-active-state.js';

export default (config) => {
  config.addShortcode('assetHash', assetHash);
  config.addShortcode('getLinkActiveState', getLinkActiveState);

  // Add more shortcodes here as needed
};
