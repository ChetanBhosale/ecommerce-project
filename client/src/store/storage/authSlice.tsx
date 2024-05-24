import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IintialState {
  token: string | null;
  user: string | null;
  page: number;
  loading: boolean;
}

const initialState: IintialState = {
  token: null,
  user: null,
  page: 1,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string | null; user: string | null }>
    ) => {
      (state.token = action.payload.accessToken),
        (state.user = action.payload.user);
    },
    userLoggedOut: (state) => {
      (state.token = null), (state.user = null);
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  userRegistration,
  userLoggedIn,
  userLoggedOut,
  changePage,
  loading,
} = authSlice.actions;

export default authSlice.reducer;
