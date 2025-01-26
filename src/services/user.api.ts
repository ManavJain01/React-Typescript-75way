import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, UserResponse } from './api';

export const apiUser = createApi({
  reducerPath: "apiUser",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Users APIs
    showUsers: builder.mutation({
      query: () => ({
        url: `users/`,
        method: 'GET',
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: 'users',
        method: 'POST',
        body: data,
      }),
    }),
    getUserById: builder.mutation<User, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation({
      query: ({id, ...data}) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: data
      }),
    }),
    editUser: builder.mutation({
      query: ({id, ...data}) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: data
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE'
      }),
    }),
    showManagers: builder.mutation({
      query: () => ({
        url: `users/managers`,
        method: 'GET',
      }),
    }),
  }),
});

export const { 
  // Users
  useShowUsersMutation, useCreateUserMutation, useGetUserByIdMutation, useEditUserMutation, useUpdateUserMutation, useDeleteUserMutation,
  useShowManagersMutation,
 } = apiUser;
