import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material"; // Import CssBaseline for global styles

import theme from "./style/theme";
import { AuthProvider } from "./contexts/AuthContext";
import { store } from "./store.js";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply global styles */}
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
