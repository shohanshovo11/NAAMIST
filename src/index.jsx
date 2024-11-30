import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { HelmetProvider } from "react-helmet-async";
import { PhotoProvider } from "react-photo-view";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider store={store}>
      <BrowserRouter>
        <PhotoProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </PhotoProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
