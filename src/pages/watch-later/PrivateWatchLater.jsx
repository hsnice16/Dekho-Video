import { Link } from "react-router-dom";
import { useLiked, useUser, useWatchLater } from "context";
import { useDocumentTitle } from "custom-hooks";
import { ClearAllButton, NullContent, VideoList } from "components";
import { ROUTE_ROOT } from "utils";

export const PrivateWatchLater = () => {
  const { userState } = useUser();
  const { getLikedMappedData } = useLiked();
  const { watchLater, deleteAllWatchLater } = useWatchLater();
  const { status, data } = watchLater;

  const mappedVideos = status === "success" ? getLikedMappedData(data) : [];

  const titleToShow =
    status === "success" && data.length <= 0
      ? "Add Video today"
      : "Watch Later";
  useDocumentTitle(titleToShow);

  return (
    <>
      {status === "loading" && <ClearAllButton loading={true} />}

      {status === "success" && data.length > 0 && (
        <ClearAllButton onClick={deleteAllWatchLater} />
      )}

      <VideoList videos={mappedVideos} status={status} className="p-4" />

      {status === "success" && data.length <= 0 && (
        <NullContent isUserLoggedIn={userState.isUserAuthTokenExist}>
          <h1>
            Nothing in watch later. <Link to={ROUTE_ROOT}>Add Video</Link>{" "}
            today.
          </h1>
        </NullContent>
      )}
    </>
  );
};
