import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar, SideNavbar, RestrictRoute } from "components";
import {
  Home,
  Playlists,
  Liked,
  WatchLater,
  History,
  SignIn,
  SignUp,
} from "pages";
import {
  ROUTE_ROOT,
  ROUTE_PLAYLISTS,
  ROUTE_LIKED,
  ROUTE_WATCH_LATER,
  ROUTE_HISTORY,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
} from "utils";
import { VideosProvider, useUser } from "context";

// mockman-js
import Mockman from "mockman-js";

function App() {
  const location = useLocation();
  const { userState } = useUser();
  const RestrictRouteList = [ROUTE_SIGN_IN, ROUTE_SIGN_UP];

  return (
    <>
      {userState.isUserAuthTokenExist &&
      RestrictRouteList.includes(location.pathname) ? (
        <></>
      ) : (
        <>
          <Navbar />
          <SideNavbar />
        </>
      )}

      <Routes>
        <Route
          path={ROUTE_ROOT}
          element={
            <VideosProvider>
              <Home />
            </VideosProvider>
          }
        />

        <Route element={<RestrictRoute />}>
          <Route path={ROUTE_SIGN_IN} element={<SignIn />} />
          <Route path={ROUTE_SIGN_UP} element={<SignUp />} />
        </Route>

        <Route path={ROUTE_PLAYLISTS} element={<Playlists />} />
        <Route path={ROUTE_LIKED} element={<Liked />} />
        <Route path={ROUTE_WATCH_LATER} element={<WatchLater />} />
        <Route path={ROUTE_HISTORY} element={<History />} />

        <Route path="/mockman-test" element={<Mockman />} />
      </Routes>
    </>
  );
}

export default App;
