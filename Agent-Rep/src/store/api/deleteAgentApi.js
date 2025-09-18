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
          
          // Store deleted ID in localStorage to persist across refreshes
          const deletedIds = JSON.parse(localStorage.getItem('deletedUserIds') || '[]');
          deletedIds.push(id);
          localStorage.setItem('deletedUserIds', JSON.stringify(deletedIds));
          
          // Manually remove the user from the cache
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