import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { usersApi } from './usersApi';

export const deleteAgentApi = createApi({
  reducerPath: 'deleteAgentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    deleteAgent: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      // Instead of invalidating, we'll handle the response manually
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // Manually remove the user from the cache instead of invalidating
          dispatch(
            usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
              return draft.filter(user => user.id !== id);
            })
          );
        } catch (error) {
          console.error('Delete failed:', error);
        }
      },
    }),
  }),
});

export const { useDeleteAgentMutation } = deleteAgentApi;