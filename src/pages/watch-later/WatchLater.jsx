import { Link } from "react-router-dom";
import { useUser } from "context";
import { useScrollToTop } from "custom-hooks";
import { NullContent } from "components";
import { ROUTE_SIGN_IN } from "utils";
import { PrivateWatchLater } from "./PrivateWatchLater";

export const WatchLater = () => {
  useScrollToTop();
  const { userState } = useUser();

  return userState.isUserAuthTokenExist ? (
    <PrivateWatchLater />
  ) : (
    <NullContent
      isUserLoggedIn={userState.isUserAuthTokenExist}
      titleToShow="Log In to see"
    >
      <h1>
        <Link to={ROUTE_SIGN_IN}>Log In</Link> to see your watch later.
      </h1>
    </NullContent>
  );
};
