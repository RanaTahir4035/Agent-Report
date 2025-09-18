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
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          
          const deletedIds = JSON.parse(localStorage.getItem('deletedUserIds') || '[]');
          deletedIds.push(id);
          localStorage.setItem('deletedUserIds', JSON.stringify(deletedIds));
          
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