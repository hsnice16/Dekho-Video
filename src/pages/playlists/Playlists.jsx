import { Link } from "react-router-dom";
import { useUser } from "context";
import { useScrollToTop } from "custom-hooks";
import { NullContent } from "components";
import { ROUTE_SIGN_IN } from "utils";
import { PrivatePlaylists } from "./PrivatePlaylists";

export const Playlists = () => {
  useScrollToTop();
  const { userState } = useUser();

  return userState.isUserAuthTokenExist ? (
    <PrivatePlaylists />
  ) : (
    <NullContent
      isUserLoggedIn={userState.isUserAuthTokenExist}
      titleToShow="Log In to create"
    >
      <h1>
        <Link to={ROUTE_SIGN_IN}>Log In</Link> to see your playlists.
      </h1>
    </NullContent>
  );
};
