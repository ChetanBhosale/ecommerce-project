import { configureStore } from "@reduxjs/toolkit";
import authSlice, { loading } from "./storage/authSlice";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

const initializeApp = async () => {
  store.dispatch(loading(true));

  await store.dispatch(
    authApi.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );

  await store.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
  store.dispatch(loading(false));
};

initializeApp();
