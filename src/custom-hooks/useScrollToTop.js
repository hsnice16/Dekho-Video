import { useEffect } from "react";

/**
 * useScrollToTop - hook
 *
 * @param {string} selectedCategory - having default
 *                              value empty string("")
 */
const useScrollToTop = (selectedCategory = "") => {
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    scrollTo({
      top: 0,
    });
  }, [selectedCategory]);
};

export { useScrollToTop };
