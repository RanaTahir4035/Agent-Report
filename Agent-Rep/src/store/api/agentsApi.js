import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const transformUsers = (users) => {
  return users.map(user => {
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
      originalData: user
    };
  });
};

export const agentsApi = createApi({
  reducerPath: 'agentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['AgentsUsers'],
  endpoints: (builder) => ({
    getAgentsUsers: builder.query({
      query: () => '/users',
      transformResponse: (response) => {
        const transformedUsers = transformUsers(response.users);
        
        // Filter out deleted users from localStorage (agents-specific)
        const deletedIds = JSON.parse(localStorage.getItem('agentsDeletedUserIds') || '[]');
        return transformedUsers.filter(user => !deletedIds.includes(user.id));
      },
      providesTags: ['AgentsUsers'],
    }),
  }),
});

export const {
  useGetAgentsUsersQuery,
} = agentsApi;
