import { useEffect } from "react";

/**
 * useScrollToTop - hook
 */
const useScrollToTop = () => {
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    scrollTo({
      top: 0,
    });
  }, []);
};

export { useScrollToTop };
