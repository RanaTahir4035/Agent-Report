import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Transformation function to map API data to table columns
const transformUsers = (users) => {
  return users.map(user => {
    // Mock values for demo (since not in API)
    const totalCalls = Math.floor(Math.random() * 100);
    const avgScore = Math.floor(Math.random() * 10) + 1;

    let status = "Average";
    if (avgScore >= 8) status = "Excellent";
    else if (avgScore >= 6) status = "Good";

    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      totalCalls,
      averageScore: avgScore,
      status,
      // Keep original data for reference
      originalData: user
    };
  });
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (response) => {
        // Transform the response to match our table structure
        return transformUsers(response.users);
      },
      providesTags: ['Users'],
    }),
    
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      transformResponse: (response) => {
        // Transform single user response
        return transformUsers([response])[0];
      },
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
} = usersApi;
