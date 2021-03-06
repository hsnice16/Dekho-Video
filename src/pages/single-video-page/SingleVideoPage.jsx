import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCategoryFilteredData,
  API_TO_GET_SPECIFIC_VIDEO_DETAILS,
} from "utils";
import { useAsync } from "custom-hooks";
import {
  useHistory,
  useLiked,
  useUser,
  useVideos,
  useWatchLater,
} from "context";
import { SingleVideo } from "components";

export const SingleVideoPage = () => {
  const { videoId } = useParams();
  const { userState } = useUser();
  const { getLikedMappedData, isVideoLiked } = useLiked();
  const { getWatchLaterMappedData } = useWatchLater();
  const { postHistory } = useHistory();
  const { videos } = useVideos();
  const { status: videosStatus, data: videosData } = videos;

  const { api, propertyToGet } = API_TO_GET_SPECIFIC_VIDEO_DETAILS;
  const {
    state: { data, status },
  } = useAsync({ api: `${api}/${videoId}`, propertyToGet });

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (status === "success" && userState.isUserAuthTokenExist) {
      setIsLiked(isVideoLiked(data._id));
      postHistory({ video: data });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, userState.isUserAuthTokenExist]);

  const filteredVideos =
    status === "success" && videosStatus === "success"
      ? getLikedMappedData(
          getWatchLaterMappedData(
            getCategoryFilteredData(data.categoryName, videosData).filter(
              ({ _id }) => _id !== videoId
            )
          )
        )
      : [];

  return (
    <SingleVideo
      singleVideo={data}
      sidepanVideos={filteredVideos}
      isLiked={isLiked}
      setIsLiked={setIsLiked}
      status={status}
      chipText={data?.categoryName}
    />
  );
};
