import { useState } from "react";
import { useAsync } from "custom-hooks";
import { API_TO_GET_ALL_CATEGORIES, getShuffledArray } from "utils";

/**
 * useCategory - hook to get states and 
 *        functions to work with category
 * 
 * @returns an object having structure  
    { 
      selectedCategory,
      state,
      dispatch,
      setSelectedCategory,
      getCategoryFilteredData,
    }
 */
export const useCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { state, dispatch } = useAsync(API_TO_GET_ALL_CATEGORIES);

  /**
   * getCategoryFilteredData - function to get filtered
   *                           array category wise
   *
   * @param {Array} dataToFilter - data list to filter
   * @return a shuffled filtered array
   */
  const getCategoryFilteredData = (dataToFilter) => {
    return getShuffledArray(
      dataToFilter.filter((video) =>
        selectedCategory === "All"
          ? video
          : video.categoryName === selectedCategory
      )
    );
  };

  const value = {
    selectedCategory,
    state,
    dispatch,
    setSelectedCategory,
    getCategoryFilteredData,
  };

  return { ...value };
};
