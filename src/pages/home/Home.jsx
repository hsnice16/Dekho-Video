import { v4 as uuid } from "uuid";
import styles from "./Home.module.css";
import { Chip, VideoList } from "components";
import { useCategory, useDocumentTitle, useScrollToTop } from "custom-hooks";
import { useVideos } from "context";
import { getEmptyArrayOfObjects } from "utils";

export const Home = () => {
  const {
    selectedCategory,
    state,
    setSelectedCategory,
    getCategoryFilteredData,
  } = useCategory();
  const { status: categoryStatus, data: categoryData } = state;

  const { videos } = useVideos();
  const { status: videosStatus, data: videosData } = videos;

  const filteredVideos =
    videosStatus === "success" ? getCategoryFilteredData(videosData) : [];

  useDocumentTitle("Home");
  useScrollToTop(selectedCategory);

  return (
    <main>
      <ul
        className={`align-i-ctr flex py-1p5 px-5 ${styles.CategoryChipContainer}`}
      >
        {categoryStatus === "loading" &&
          getEmptyArrayOfObjects(3).map(({ _id }) => (
            <li key={_id}>
              <Chip loading={true} />
            </li>
          ))}

        {categoryStatus === "success" &&
          [{ _id: uuid(), categoryName: "All" }, ...categoryData].map(
            ({ _id, categoryName }) => (
              <li key={_id}>
                <Chip
                  textToShow={categoryName}
                  activeChip={selectedCategory}
                  handleChipClick={() => {
                    setSelectedCategory(categoryName);
                  }}
                />
              </li>
            )
          )}
      </ul>

      <VideoList videos={filteredVideos} status={videosStatus} />
    </main>
  );
};
