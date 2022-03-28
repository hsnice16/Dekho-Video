import { getShuffledArray } from "utils";

/**
 * getCategoryFilteredData - function to get filtered
 *                           array category wise
 *
 * @param {string} categoryToFilter - category to filter
 * @param {Array} dataToFilter - data list to filter
 * @return a shuffled filtered array
 */
export const getCategoryFilteredData = (categoryToFilter, dataToFilter) => {
  return getShuffledArray(
    dataToFilter.filter((video) =>
      categoryToFilter === "All"
        ? video
        : video.categoryName === categoryToFilter
    )
  );
};
