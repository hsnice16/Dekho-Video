import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  CategoryProvider,
  HistoryProvider,
  LikedProvider,
  ModalProvider,
  OptionsListProvider,
  PlaylistsProvider,
  ToastProvider,
  UserProvider,
  VideosProvider,
  WatchLaterProvider,
} from "context";
import { Compose } from "components";

import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Compose
      components={[
        BrowserRouter,
        UserProvider,
        ToastProvider,
        VideosProvider,
        CategoryProvider,
        HistoryProvider,
        WatchLaterProvider,
        LikedProvider,
        PlaylistsProvider,
        ModalProvider,
        OptionsListProvider,
      ]}
    >
      <App />
    </Compose>
  </React.StrictMode>,
  document.getElementById("root")
);
