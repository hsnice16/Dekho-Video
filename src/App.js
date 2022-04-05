import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  FooterNav,
  HeaderNav,
  NotFound,
  ProtectRoute,
  SideNav,
  RestrictRoute,
} from "components";
import {
  Home,
  Playlists,
  PlaylistPlayAll,
  PlaylistDetails,
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
  ROUTE_PLAYLIST,
  ROUTE_LIKED,
  ROUTE_WATCH_LATER,
  ROUTE_HISTORY,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_WATCH_VIDEO,
} from "utils";
import { useOptionsList, useUser } from "context";

// mockman-js
import Mockman from "mockman-js";

function App() {
  const { userState } = useUser();
  const { showOptionsListForVideo, setShowOptionsListForVideo } =
    useOptionsList();
  const location = useLocation();
  const [showShrinkedSideNav, setShowShrinkedSideNav] = useState(
    location.pathname.includes(ROUTE_WATCH_VIDEO) || window.innerWidth <= 940
  );

  useEffect(() => {
    // for keyboard accessiblity
    const handleEscapeKeyClick = (event) => {
      if (event.key === "Escape" && showOptionsListForVideo !== "")
        setShowOptionsListForVideo("");
    };

    document.addEventListener("keydown", handleEscapeKeyClick);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyClick);
    };
  }, [setShowOptionsListForVideo, showOptionsListForVideo]);

  return (
    <>
      {userState.isUserAuthTokenExist &&
      [ROUTE_SIGN_IN, ROUTE_SIGN_UP].includes(location.pathname) ? (
        <></>
      ) : (
        <>
          <HeaderNav />
          <SideNav
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
            path={`${ROUTE_WATCH_VIDEO}/:videoId`}
            element={<SingleVideoPage />}
          />

          <Route path={ROUTE_PLAYLISTS} element={<Playlists />} />

          <Route element={<ProtectRoute />}>
            <Route
              path={`${ROUTE_PLAYLIST}/:playlistId`}
              element={<PlaylistDetails />}
            />
            <Route
              path={`${ROUTE_PLAYLIST}/:playlistId${ROUTE_WATCH_VIDEO}/:videoId`}
              element={<PlaylistPlayAll />}
            />
          </Route>

          <Route path={ROUTE_LIKED} element={<Liked />} />
          <Route path={ROUTE_WATCH_LATER} element={<WatchLater />} />
          <Route path={ROUTE_HISTORY} element={<History />} />

          <Route
            path="*"
            element={
              <NotFound
                documentTitle="Page Not Found"
                textToShow="This page isn't available. Sorry about that."
              />
            }
          />

          <Route path="/mockman-test" element={<Mockman />} />
        </Routes>
      </main>

      <FooterNav />
    </>
  );
}

export default App;
