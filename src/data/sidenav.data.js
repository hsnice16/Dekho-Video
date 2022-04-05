import { v4 as uuid } from "uuid";
import {
  HistoryIcon,
  HomeIcon,
  LikedIcon,
  PlaylistsIcon,
  WatchLaterIcon,
} from "assets";
import {
  ROUTE_ROOT,
  ROUTE_HISTORY,
  ROUTE_LIKED,
  ROUTE_PLAYLISTS,
  ROUTE_WATCH_LATER,
} from "utils";

export const SideNavLinks = [
  {
    _id: uuid(),
    linkTo: ROUTE_ROOT,
    linkFor: "Home",
    GetIcon: (props) => <HomeIcon {...props} />,
  },
  {
    _id: uuid(),
    linkTo: ROUTE_PLAYLISTS,
    linkFor: "Playlists",
    GetIcon: (props) => <PlaylistsIcon {...props} />,
  },
  {
    _id: uuid(),
    linkTo: ROUTE_LIKED,
    linkFor: "Liked",
    GetIcon: (props) => <LikedIcon {...props} />,
  },
  {
    _id: uuid(),
    linkTo: ROUTE_WATCH_LATER,
    linkFor: "Watch Later",
    GetIcon: (props) => <WatchLaterIcon {...props} />,
  },
  {
    _id: uuid(),
    linkTo: ROUTE_HISTORY,
    linkFor: "History",
    GetIcon: (props) => <HistoryIcon {...props} />,
  },
];
