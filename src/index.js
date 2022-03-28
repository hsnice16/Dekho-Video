import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  CategoryProvider,
  HistoryProvider,
  OptionsListProvider,
  UserProvider,
  VideosProvider,
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
              <OptionsListProvider>
                <App />
              </OptionsListProvider>
            </HistoryProvider>
          </CategoryProvider>
        </VideosProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
