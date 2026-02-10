/**
 * Filters out the passed item from the passed collection
 * and randomizes and limits them based on flags
 *
 * @param {Array} collection The 11ty collection we want to take from
 * @param {Object} item The item we want to exclude (often current page)
 * @param {Number} limit=3 How many items we want back
 * @returns {Array} The resulting collection
 */
export default (collection, item, limit = 3) => {
  let filteredItems = collection.filter(x => x.url !== item.url);

  // Randomize using Fisher-Yates shuffle
  let counter = filteredItems.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = filteredItems[counter];
    filteredItems[counter] = filteredItems[index];
    filteredItems[index] = temp;
  }

  // Trim to length
  if (limit > 0) {
    filteredItems = filteredItems.slice(0, limit);
  }

  return filteredItems;
};
