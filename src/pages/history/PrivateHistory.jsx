import { Link } from "react-router-dom";
import { useHistory, useUser } from "context";
import { useDocumentTitle } from "custom-hooks";
import { ClearAllButton, NullContent, VideoList } from "components";
import { ROUTE_ROOT } from "utils";

export const PrivateHistory = () => {
  const { userState } = useUser();
  const { history, deleteAllHistory } = useHistory();
  const { status, data } = history;

  const titleToShow =
    status === "success" && data.length <= 0 ? "Watch Video today" : "History";
  useDocumentTitle(titleToShow);

  return (
    <>
      {status === "loading" && <ClearAllButton loading={true} />}

      {status === "success" && data.length > 0 && (
        <ClearAllButton onClick={deleteAllHistory} />
      )}

      <VideoList videos={data} status={status} className="p-4" />

      {status === "success" && data.length <= 0 && (
        <NullContent isUserLoggedIn={userState.isUserAuthTokenExist}>
          <h1>
            Nothing in history. <Link to={ROUTE_ROOT}>Watch Video</Link> today.
          </h1>
        </NullContent>
      )}
    </>
  );
};
