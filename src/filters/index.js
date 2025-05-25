import dateFilter from './date-filter.js';
import w3DateFilter from './w3-date-filter.js';

export default (config) => {
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

  // Add more filters here as needed
};
