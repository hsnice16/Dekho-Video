import "./App.css";
import React, { useState } from "react";
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
  SingleVideoPage,
} from "pages";
import {
  ROUTE_ROOT,
  ROUTE_PLAYLISTS,
  ROUTE_LIKED,
  ROUTE_WATCH_LATER,
  ROUTE_HISTORY,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_WATCH_VIDEO,
} from "utils";
import { useUser } from "context";

// mockman-js
import Mockman from "mockman-js";

function App() {
  const location = useLocation();
  const { userState } = useUser();
  const RestrictRouteList = [ROUTE_SIGN_IN, ROUTE_SIGN_UP];
  const [showShrinkedSideNav, setShowShrinkedSideNav] = useState(
    location.pathname.includes(ROUTE_WATCH_VIDEO) || window.innerWidth <= 940
  );

  return (
    <>
      {userState.isUserAuthTokenExist &&
      RestrictRouteList.includes(location.pathname) ? (
        <></>
      ) : (
        <>
          <Navbar />
          <SideNavbar
            showShrinkedSideNav={showShrinkedSideNav}
            setShowShrinkedSideNav={setShowShrinkedSideNav}
          />
        </>
      )}

      <main className={showShrinkedSideNav ? "ml-8" : "ml-24"}>
        <Routes>
          <Route path={ROUTE_ROOT} element={<Home />} />

          <Route element={<RestrictRoute />}>
            <Route path={ROUTE_SIGN_IN} element={<SignIn />} />
            <Route path={ROUTE_SIGN_UP} element={<SignUp />} />
          </Route>

          <Route
            path={`${ROUTE_WATCH_VIDEO}/:id`}
            element={<SingleVideoPage />}
          />

          <Route path={ROUTE_PLAYLISTS} element={<Playlists />} />
          <Route path={ROUTE_LIKED} element={<Liked />} />
          <Route path={ROUTE_WATCH_LATER} element={<WatchLater />} />
          <Route path={ROUTE_HISTORY} element={<History />} />

          <Route path="/mockman-test" element={<Mockman />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
