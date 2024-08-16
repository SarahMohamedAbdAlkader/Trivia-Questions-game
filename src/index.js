import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

import { PlayerProvider } from "contexts/player";

import App from "./App";

import "./index.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <QueryClientProvider client={queryClient}>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
