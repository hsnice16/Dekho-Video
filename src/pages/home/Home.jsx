import { v4 as uuid } from "uuid";
import { Chip, VideoList } from "components";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";
import { useCategory, useVideos, useWatchLater } from "context";
import { getCategoryFilteredData, getEmptyArrayOfObjects } from "utils";

export const Home = () => {
  const { getWatchLaterFilteredData } = useWatchLater();
  const { selectedCategory, state, setSelectedCategory } = useCategory();
  const { status: categoryStatus, data: categoryData } = state;

  const { videos } = useVideos();
  const { status: videosStatus, data: videosData } = videos;

  const filteredVideos =
    videosStatus === "success"
      ? getWatchLaterFilteredData(
          getCategoryFilteredData(selectedCategory, videosData)
        )
      : [];

  useDocumentTitle("Home");
  useScrollToTop(selectedCategory);

  return (
    <>
      <ul className="chip-container">
        {categoryStatus === "loading" &&
          getEmptyArrayOfObjects(3).map(({ _id }) => (
            <li key={_id}>
              <Chip loading={true} className="mx-1" />
            </li>
          ))}

        {categoryStatus === "success" &&
          [{ _id: uuid(), categoryName: "All" }, ...categoryData].map(
            ({ _id, categoryName }) => (
              <li key={_id}>
                <Chip
                  textToShow={categoryName}
                  activeChip={selectedCategory}
                  onClick={() => {
                    setSelectedCategory(categoryName);
                  }}
                  className="mx-1"
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
