import dateFilter from './date-filter.js';
import w3DateFilter from './w3-date-filter.js';
import isoDateFilter from './iso-date-filter.js';
import siblingContentFilter from './sibling-content-filter.js';

export default (config) => {
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addFilter('isoDateFilter', isoDateFilter);
  config.addFilter('getSiblingContent', siblingContentFilter);

  // Add more filters here as needed
};
