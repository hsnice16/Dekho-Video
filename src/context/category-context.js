import { createContext, useContext, useState } from "react";
import { useAsync } from "custom-hooks";
import { API_TO_GET_ALL_CATEGORIES, getShuffledArray } from "utils";
import { sharedInitialReducerState } from "reducer";

const CategoryContext = createContext({
  selectedCategory: "",
  state: { ...sharedInitialReducerState },
  dispatch: () => {},
  setSelectedCategory: () => {},
  getCategoryFilteredData: () => {},
});

const CategoryProvider = ({ children }) => {
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

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => useContext(CategoryContext);

export { CategoryProvider, useCategory };
