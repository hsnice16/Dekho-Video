import { useNavigate, useParams } from "react-router-dom";
import { useLiked, usePlaylists, useWatchLater } from "context";
import { ClearAllButton, NotFound, VideoList } from "components";
import { API_TO_GET_PLAYLISTS } from "utils";
import {
  useDocumentTitle,
  usePrivateAsync,
  useScrollToTop,
} from "custom-hooks";

export const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { getLikedMappedData } = useLiked();
  const { getWatchLaterMappedData } = useWatchLater();
  const { deleteSpecificPlaylists } = usePlaylists();

  const { api } = API_TO_GET_PLAYLISTS;
  const {
    state: { data, status },
  } = usePrivateAsync({
    api: `${api}/${playlistId}`,
    propertyToGet: "playlist",
  });

  useScrollToTop();
  const titleToShow =
    status === "success" ? `${data.title} Playlist` : "Playlist";
  useDocumentTitle(titleToShow);

  const handleDeletePlaylistClick = () => {
    deleteSpecificPlaylists(playlistId);
    navigate(-1);
  };

  const filteredVideos =
    status === "success"
      ? getLikedMappedData(getWatchLaterMappedData(data.videos))
      : [];

  return (
    <>
      {status === "error" ? (
        <NotFound
          documentTitle="Playlist Not Found"
          textToShow="This playlist isn't available anymore"
        />
      ) : (
        <>
          {status === "loading" && <ClearAllButton loading={true} />}

          {status === "success" && (
            <ClearAllButton
              textToShow={`Delete ${data.title} Playlist`}
              onClick={handleDeletePlaylistClick}
            />
          )}

          <div>
            {status === "success" && (
              <h1 className="fs-2 pl-5 pt-2">{data.title} Playlist</h1>
            )}
            <VideoList
              videos={filteredVideos}
              status={status}
              className="p-4"
            />
          </div>
        </>
      )}
    </>
  );
};
