import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
import React from "react";
import { useLoadUserQuery } from "./store/api/authApi.tsx";
import LoadingPage from "./components/LoadingPage.tsx";

// eslint-disable-next-line react-refresh/only-export-components
const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  return <>{isLoading ? <LoadingPage /> : <>{children}</>}</>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Custom>
        <App />
      </Custom>
    </BrowserRouter>
  </Provider>
);
