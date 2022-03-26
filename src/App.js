import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Navbar, SideNavbar } from "components";
import { Home, Playlists, Liked, WatchLater, History } from "pages";
import {
  ROUTE_ROOT,
  ROUTE_PLAYLISTS,
  ROUTE_LIKED,
  ROUTE_WATCH_LATER,
  ROUTE_HISTORY,
} from "utils";
import { VideosProvider } from "context";

// mockman-js
import Mockman from "mockman-js";

function App() {
  return (
    <>
      <Navbar />
      <SideNavbar />

      <Routes>
        <Route
          path={ROUTE_ROOT}
          element={
            <VideosProvider>
              <Home />
            </VideosProvider>
          }
        />
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
