import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { agentsApi } from './agentsApi';

export const deleteAgentsAgentApi = createApi({
  reducerPath: 'deleteAgentsAgentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  tagTypes: ['AgentsUsers'],
  endpoints: (builder) => ({
    deleteAgentsAgent: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          
          // Store deleted ID in localStorage (agents-specific)
          const deletedIds = JSON.parse(localStorage.getItem('agentsDeletedUserIds') || '[]');
          deletedIds.push(id);
          localStorage.setItem('agentsDeletedUserIds', JSON.stringify(deletedIds));
          
          // Manually remove the user from the agents cache only
          dispatch(
            agentsApi.util.updateQueryData('getAgentsUsers', undefined, (draft) => {
              return draft.filter(user => user.id !== id);
            })
          );
        } catch (error) {
          console.error('Agents delete failed:', error);
        }
      },
    }),
  }),
});

export const { useDeleteAgentsAgentMutation } = deleteAgentsAgentApi;
