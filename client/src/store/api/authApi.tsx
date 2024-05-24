import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../storage/authSlice";

// Define the data types
interface ILoginData {
  email: string | null;
  password: string | null;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  cart: string;
  role: string;
}

interface ILoginReceived {
  accessToken: string;
  user: any;
}

// Create the API
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "update-token",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    loginUser: builder.mutation<ILoginReceived, ILoginData>({
      query: (loginData) => ({
        url: "login",
        method: "POST",
        body: loginData,
        credentials: "include",
      }),
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken as string,
              user: result.data.user,
            })
          );
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useLoadUserQuery, useLogoutMutation } =
  authApi;
