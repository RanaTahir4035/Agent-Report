import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          expiresInMins: 30,
        }),
        credentials: 'include',
      }),
      transformResponse: (response) => {
        return {
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          gender: response.gender,
          image: response.image,
          token: response.token,
          expiresIn: response.expiresIn,
        };
      },
      invalidatesTags: ['Auth'],
    }),

    getProfile: builder.query({
      query: (token) => ({
        url: '/auth/me',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
} = authApi;
