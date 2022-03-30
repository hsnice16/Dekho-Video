import { Link } from "react-router-dom";
import { useLiked, useUser, useWatchLater } from "context";
import { useDocumentTitle } from "custom-hooks";
import { ClearAllButton, NullContent, VideoList } from "components";
import { ROUTE_ROOT } from "utils";

export const PrivateLiked = () => {
  const { userState } = useUser();
  const { getWatchLaterMappedData } = useWatchLater();
  const { liked, deleteAllLiked } = useLiked();
  const { status, data } = liked;

  const mappedVideos =
    status === "success" ? getWatchLaterMappedData(data) : [];

  const titleToShow =
    status === "success" && data.length <= 0 ? "Like Video today" : "Liked";
  useDocumentTitle(titleToShow);

  return (
    <>
      {status === "loading" && <ClearAllButton loading={true} />}

      {status === "success" && data.length > 0 && (
        <ClearAllButton onClick={deleteAllLiked} />
      )}

      <VideoList videos={mappedVideos} status={status} className="p-4" />

      {status === "success" && data.length <= 0 && (
        <NullContent isUserLoggedIn={userState.isUserAuthTokenExist}>
          <h1>
            Nothing in liked. <Link to={ROUTE_ROOT}>Like Video</Link> today.
          </h1>
        </NullContent>
      )}
    </>
  );
};
