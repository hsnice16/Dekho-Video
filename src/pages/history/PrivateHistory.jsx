import styles from "./History.module.css";
import { Link } from "react-router-dom";
import { useHistory, useUser } from "context";
import { useDocumentTitle } from "custom-hooks";
import { Chip, NullContent, VideoList } from "components";
import { ROUTE_ROOT } from "utils";

export const PrivateHistory = () => {
  const { userState } = useUser();
  const { history, deleteAllHistoryCall } = useHistory();
  const { status, data } = history;

  const titleToShow =
    status === "success" && data.length <= 0 ? "Watch Video today" : "History";
  useDocumentTitle(titleToShow);

  return (
    <>
      {status === "loading" && (
        <div className="chip-container">
          <Chip loading={true} className="ml-auto mr-1" />
        </div>
      )}

      {status === "success" && data.length > 0 && (
        <div className="chip-container">
          <Chip
            textToShow="Clear All"
            activeChip="Clear All"
            onClick={deleteAllHistoryCall}
            className={`ml-auto mr-1 ${styles.clearAll_btn}`}
          />
        </div>
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
