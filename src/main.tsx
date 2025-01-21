import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeContextProvider } from "./ThemeContext.tsx";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ThemeContextProvider>
          <Provider store={store}>
            <ToastContainer />
            <App />
          </Provider>
        </ThemeContextProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
