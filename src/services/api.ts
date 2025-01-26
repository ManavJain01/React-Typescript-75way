import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { logoutUser, resetTokens, setTokens } from "../store/reducers/authReducer";

const baseURL = `${import.meta.env.VITE_BE_URL}/api/`

export interface UserResponse {
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

export interface ProductResponse {
  data: {
    data: {
      _id: string;
      name: string;
      price: number;
      quantity: number;
      lowStockThreshold: number;
      warehouse_id: string;
    };
  }
}

export interface WarehouseResponse {
  data: {
    data: {
      _id: string;
      name: string;
      location: string;
      managerId: string;
    };
  }
}

interface RefreshTokenResponse {
  data: {
    data: {
      user: Object;
      accessToken: string;
      refreshToken: string;
    };
  }
}

const refreshTokenBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    // Skip setting the accessToken for the /refresh-token endpoint
    const token = state.auth.refreshToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
})

export const publicBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
});

export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    // Skip setting the accessToken for the /refresh-token endpoint
    const token = state.auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Access token expired, attempt to refresh
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (refreshToken) {
      // Attempt token refresh
      const refreshResult = await refreshTokenBaseQuery(
        {
          url: "refresh-token",
          method: "POST"
        },
        api,
        extraOptions
      ) as RefreshTokenResponse;

      if (refreshResult.data.data) {
        // Save new tokens in Redux state
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResult.data.data as {
          accessToken: string;
          refreshToken: string;
        };
        api.dispatch(
          setTokens({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          })
        );

        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token failed, log the user out
        api.dispatch(resetTokens());
        api.dispatch(logoutUser());
      }
    } else {
      // No refresh token available, log the user out
      api.dispatch(resetTokens());
      api.dispatch(logoutUser());
    }
  }

  return result;
};