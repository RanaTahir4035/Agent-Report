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
        
        const deletedIds = JSON.parse(localStorage.getItem('agentsDeletedUserIds') || '[]');
        return transformedUsers.filter(user => !deletedIds.includes(user.id));
      },
      providesTags: ['AgentsUsers'],
    }),
    searchAgentsUsers: builder.query({
      query: (searchTerm) => `/users/search?q=${encodeURIComponent(searchTerm)}`,
      transformResponse: (response) => {
        const transformedUsers = transformUsers(response.users);
        
        const deletedIds = JSON.parse(localStorage.getItem('agentsDeletedUserIds') || '[]');
        return transformedUsers.filter(user => !deletedIds.includes(user.id));
      },
      providesTags: ['AgentsUsers'],
    }),
    enhancedSearchAgentsUsers: builder.query({
      query: (searchTerm) => '/users', 
      transformResponse: (response, meta, arg) => {
        const allUsers = transformUsers(response.users);
        
        const deletedIds = JSON.parse(localStorage.getItem('agentsDeletedUserIds') || '[]');
        const filteredUsers = allUsers.filter(user => !deletedIds.includes(user.id));
        
        if (!arg || arg.trim().length === 0) {
          return filteredUsers;
        }
        
        const searchLower = arg.toLowerCase().trim();
        console.log('Enhanced search for term:', searchLower);
        console.log('Total users before filtering:', filteredUsers.length);
        
        const searchResults = filteredUsers.filter(user => {
          const fullName = user.name.toLowerCase();
          const email = user.email.toLowerCase();
          const firstName = user.originalData.firstName.toLowerCase();
          const lastName = user.originalData.lastName.toLowerCase();
          
          const matches = (
            fullName.includes(searchLower) ||
            email.includes(searchLower) ||
            firstName.includes(searchLower) ||
            lastName.includes(searchLower) ||
            firstName.startsWith(searchLower) ||
            lastName.startsWith(searchLower)
          );
          
          if (matches) {
            console.log('Match found:', user.name, 'firstName:', firstName, 'lastName:', lastName);
          }
          
          return matches;
        });
        
        console.log('Search results count:', searchResults.length);
        return searchResults;
      },
      providesTags: ['AgentsUsers'],
    }),
  }),
});

export const {
  useGetAgentsUsersQuery,
  useSearchAgentsUsersQuery,
  useEnhancedSearchAgentsUsersQuery,
} = agentsApi;
