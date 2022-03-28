import { createContext, useContext, useState } from "react";
import { useAsync } from "custom-hooks";
import { API_TO_GET_ALL_CATEGORIES } from "utils";
import { sharedInitialReducerState } from "reducer";

const CategoryContext = createContext({
  selectedCategory: "",
  state: { ...sharedInitialReducerState },
  dispatch: () => {},
  setSelectedCategory: () => {},
});

const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { state, dispatch } = useAsync(API_TO_GET_ALL_CATEGORIES);

  const value = {
    selectedCategory,
    state,
    dispatch,
    setSelectedCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => useContext(CategoryContext);

export { CategoryProvider, useCategory };
