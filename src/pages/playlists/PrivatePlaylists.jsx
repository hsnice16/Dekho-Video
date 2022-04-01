import { Link } from "react-router-dom";
import { usePlaylists, useUser } from "context";
import { useDocumentTitle } from "custom-hooks";
import { ClearAllButton, NullContent, PlayList } from "components";
import { ROUTE_ROOT } from "utils";

export const PrivatePlaylists = () => {
  const { userState } = useUser();
  const { playlists, deleteAllPlaylists } = usePlaylists();
  const { status, data } = playlists;

  const titleToShow =
    status === "success" && data.length <= 0
      ? "Create Playlist today"
      : "Playlists";
  useDocumentTitle(titleToShow);

  return (
    <>
      {status === "loading" && <ClearAllButton loading={true} />}

      {status === "success" && data.length > 0 && (
        <ClearAllButton textToShow="Delete All" onClick={deleteAllPlaylists} />
      )}

      <div>
        {status === "success" && data.length > 0 && (
          <h1 className="fs-2 pl-4p5 pt-2">Created Playlists</h1>
        )}
        <PlayList playlists={data} status={status} className="p-4" />
      </div>

      {status === "success" && data.length <= 0 && (
        <NullContent isUserLoggedIn={userState.isUserAuthTokenExist}>
          <h1>
            Nothing in playlists. <Link to={ROUTE_ROOT}>Create a Playlist</Link>{" "}
            today.
          </h1>
        </NullContent>
      )}
    </>
  );
};
