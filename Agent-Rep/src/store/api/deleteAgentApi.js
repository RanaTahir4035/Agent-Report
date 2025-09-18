import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { usersApi } from './usersApi';
import { agentsApi } from './agentsApi';
import { dashboardApi } from './dashboardApi';

export const deleteAgentApi = createApi({
  reducerPath: 'deleteAgentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  tagTypes: ['Users', 'AgentsUsers', 'DashboardUsers'],
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
          const agentsDeletedIds = JSON.parse(localStorage.getItem('agentsDeletedUserIds') || '[]');
          const dashboardDeletedIds = JSON.parse(localStorage.getItem('dashboardDeletedUserIds') || '[]');
          
          deletedIds.push(id);
          agentsDeletedIds.push(id);
          dashboardDeletedIds.push(id);
          
          localStorage.setItem('deletedUserIds', JSON.stringify(deletedIds));
          localStorage.setItem('agentsDeletedUserIds', JSON.stringify(agentsDeletedIds));
          localStorage.setItem('dashboardDeletedUserIds', JSON.stringify(dashboardDeletedIds));
          
          dispatch(
            usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
              return draft.filter(user => user.id !== id);
            })
          );
          
          dispatch(
            agentsApi.util.updateQueryData('getAgentsUsers', undefined, (draft) => {
              return draft.filter(user => user.id !== id);
            })
          );
          
          dispatch(
            dashboardApi.util.updateQueryData('getDashboardUsers', undefined, (draft) => {
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