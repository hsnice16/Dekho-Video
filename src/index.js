import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  CategoryProvider,
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
        <OptionsListProvider>
          <VideosProvider>
            <CategoryProvider>
              <App />
            </CategoryProvider>
          </VideosProvider>
        </OptionsListProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
