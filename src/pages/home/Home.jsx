import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./Home.module.css";
import { Chip, VideoList } from "components";
import { useAsync, useDocumentTitle, useScrollToTop } from "custom-hooks";
import { API_TO_GET_ALL_CATEGORIES, API_TO_GET_ALL_VIDEOS } from "utils";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleChipClick = (clickedChip) => {
    setSelectedCategory(clickedChip);
  };

  useScrollToTop();
  useDocumentTitle("Home");

  const { state: categories } = useAsync(API_TO_GET_ALL_CATEGORIES);
  const { status, data } = categories;
  const { state: videos } = useAsync(API_TO_GET_ALL_VIDEOS);
  const filteredVideos =
    videos.status === "success"
      ? videos.data.filter((video) =>
          selectedCategory === "All"
            ? video
            : video.categoryName === selectedCategory
        )
      : [];

  return (
    <main>
      <ul
        className={`align-i-ctr flex py-1p5 px-5 ${styles.CategoryChipContainer}`}
      >
        {status === "success" &&
          [{ _id: uuid(), categoryName: "All" }, ...data].map(
            ({ _id, categoryName }) => (
              <li key={_id}>
                <Chip
                  textToShow={categoryName}
                  activeChip={selectedCategory}
                  handleChipClick={() => {
                    handleChipClick(categoryName);
                  }}
                />
              </li>
            )
          )}
      </ul>

      <VideoList filteredVideos={filteredVideos} />
    </main>
  );
};
