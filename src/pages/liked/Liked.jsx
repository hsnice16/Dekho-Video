import { Link } from "react-router-dom";
import { useUser } from "context";
import { useScrollToTop } from "custom-hooks";
import { NullContent } from "components";
import { ROUTE_SIGN_IN } from "utils";
import { PrivateLiked } from "./PrivateLiked";

export const Liked = () => {
  useScrollToTop();
  const { userState } = useUser();

  return userState.isUserAuthTokenExist ? (
    <PrivateLiked />
  ) : (
    <NullContent
      isUserLoggedIn={userState.isUserAuthTokenExist}
      titleToShow="Log In to see"
    >
      <h1>
        <Link to={ROUTE_SIGN_IN}>Log In</Link> to see your liked videos.
      </h1>
    </NullContent>
  );
};
