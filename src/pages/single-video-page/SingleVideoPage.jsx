import styles from "./SingleVideoPage.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Chip, NotFound, VideoList } from "components";
import {
  getCategoryFilteredData,
  API_TO_GET_SPECIFIC_VIDEO_DETAILS,
} from "utils";
import { useAsync } from "custom-hooks";
import { useHistory, useUser, useVideos } from "context";
import { SingleVideo } from "./SingleVideo";

export const SingleVideoPage = () => {
  const { videoId } = useParams();
  const { userState } = useUser();
  const { postHistoryCall } = useHistory();
  const { videos } = useVideos();
  const { status: videosStatus, data: videosData } = videos;

  const { api, propertyToGet } = API_TO_GET_SPECIFIC_VIDEO_DETAILS;
  const {
    state: { data, status },
  } = useAsync({ api: `${api}/${videoId}`, propertyToGet });

  useEffect(() => {
    if (status === "success" && userState.isUserAuthTokenExist) {
      postHistoryCall({ video: data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, userState.isUserAuthTokenExist]);

  const filteredVideos =
    status === "success" && videosStatus === "success"
      ? getCategoryFilteredData(data.categoryName, videosData).filter(
          ({ _id }) => _id !== videoId
        )
      : [];

  return (
    <>
      {status === "error" ? (
        <NotFound
          documentTitle="Video Not Found"
          textToShow="This video isn't available anymore"
        />
      ) : (
        <div className={`flex m-auto p-3 ${styles.singleVideoPage}`}>
          <div className={`${styles.iFrame_container}`}>
            {status === "loading" ? (
              <SingleVideo loading={true} />
            ) : (
              <SingleVideo video={data} />
            )}
          </div>

          <div className="ml-2">
            {status === "loading" ? (
              <Chip loading={true} className="mb-2 mx-1" />
            ) : (
              <Chip
                textToShow={data.categoryName}
                activeChip={data.categoryName}
                className="mb-2 mx-1"
              />
            )}

            <VideoList videos={filteredVideos} status={status} />
          </div>
        </div>
      )}
    </>
  );
};
