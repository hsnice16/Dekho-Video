import styles from "./Home.module.css";
import { v4 as uuid } from "uuid";
import { Chip, VideoList } from "components";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";
import { useCategory, useVideos } from "context";
import { getCategoryFilteredData, getEmptyArrayOfObjects } from "utils";

export const Home = () => {
  const { selectedCategory, state, setSelectedCategory } = useCategory();
  const { status: categoryStatus, data: categoryData } = state;

  const { videos } = useVideos();
  const { status: videosStatus, data: videosData } = videos;

  const filteredVideos =
    videosStatus === "success"
      ? getCategoryFilteredData(selectedCategory, videosData)
      : [];

  useDocumentTitle("Home");
  useScrollToTop(selectedCategory);

  return (
    <>
      <ul
        className={`align-i-ctr flex py-1p5 px-5 ${styles.categoryChip_container}`}
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

      <VideoList
        videos={filteredVideos}
        status={videosStatus}
        className="p-4"
      />
    </>
  );
};
