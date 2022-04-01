import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_TO_GET_PLAYLISTS } from "utils";
import { usePrivateAsync } from "custom-hooks";
import { useHistory, useLiked, useUser, useWatchLater } from "context";
import { SingleVideo } from "components";

export const PlaylistPlayAll = () => {
  const { playlistId, videoId } = useParams();
  const { userState } = useUser();
  const { getLikedMappedData, isVideoLiked } = useLiked();
  const { getWatchLaterMappedData } = useWatchLater();
  const { postHistory } = useHistory();

  const { api } = API_TO_GET_PLAYLISTS;
  const {
    state: { data, status },
  } = usePrivateAsync({
    api: `${api}/${playlistId}`,
    propertyToGet: "playlist",
  });

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (status === "success" && userState.isUserAuthTokenExist) {
      setIsLiked(isVideoLiked(videoId));
      postHistory({ video: data.videos.find(({ _id }) => _id === videoId) });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, userState.isUserAuthTokenExist]);

  const filteredVideos =
    status === "success"
      ? getLikedMappedData(
          getWatchLaterMappedData(
            data.videos.filter(({ _id }) => _id !== videoId)
          )
        )
      : [];

  return (
    <SingleVideo
      singleVideo={
        status === "success"
          ? data.videos.find(({ _id }) => _id === videoId)
          : {}
      }
      sidepanVideos={filteredVideos}
      isLiked={isLiked}
      setIsLiked={setIsLiked}
      status={status}
      chipText={data?.title}
    />
  );
};
