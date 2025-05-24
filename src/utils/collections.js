export const sortByDisplayOrder = (collection) => {
  return collection.sort((a, b) =>
    Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1);
};
