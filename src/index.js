import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  CategoryProvider,
  HistoryProvider,
  ModalProvider,
  OptionsListProvider,
  UserProvider,
  VideosProvider,
  WatchLaterProvider,
} from "context";

import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <VideosProvider>
          <CategoryProvider>
            <HistoryProvider>
              <WatchLaterProvider>
                <OptionsListProvider>
                  <ModalProvider>
                    <App />
                  </ModalProvider>
                </OptionsListProvider>
              </WatchLaterProvider>
            </HistoryProvider>
          </CategoryProvider>
        </VideosProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
