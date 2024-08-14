import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material"; // Import CssBaseline for global styles

import theme from "./style/theme";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";

import "./fonts.css";
import "./style.css";
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply global styles */}
      <Provider store={store}>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
