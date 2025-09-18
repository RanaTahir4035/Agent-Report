import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { dashboardApi } from './dashboardApi';

export const deleteDashboardAgentApi = createApi({
  reducerPath: 'deleteDashboardAgentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  tagTypes: ['DashboardUsers'],
  endpoints: (builder) => ({
    deleteDashboardAgent: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          
          // Store deleted ID in localStorage (dashboard-specific)
          const deletedIds = JSON.parse(localStorage.getItem('dashboardDeletedUserIds') || '[]');
          deletedIds.push(id);
          localStorage.setItem('dashboardDeletedUserIds', JSON.stringify(deletedIds));
          
          // Manually remove the user from the dashboard cache only
          dispatch(
            dashboardApi.util.updateQueryData('getDashboardUsers', undefined, (draft) => {
              return draft.filter(user => user.id !== id);
            })
          );
        } catch (error) {
          console.error('Dashboard delete failed:', error);
        }
      },
    }),
  }),
});

export const { useDeleteDashboardAgentMutation } = deleteDashboardAgentApi;
