import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { usersApi } from './api/usersApi';
import { deleteAgentApi } from './api/deleteAgentApi';
import { dashboardApi } from './api/dashboardApi';
import { agentsApi } from './api/agentsApi';
import { deleteDashboardAgentApi } from './api/deleteDashboardAgentApi';
import { deleteAgentsAgentApi } from './api/deleteAgentsAgentApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [deleteAgentApi.reducerPath]: deleteAgentApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [agentsApi.reducerPath]: agentsApi.reducer,
    [deleteDashboardAgentApi.reducerPath]: deleteDashboardAgentApi.reducer,
    [deleteAgentsAgentApi.reducerPath]: deleteAgentsAgentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, 
      usersApi.middleware, 
      deleteAgentApi.middleware,
      dashboardApi.middleware,
      agentsApi.middleware,
      deleteDashboardAgentApi.middleware,
      deleteAgentsAgentApi.middleware
    ),
});

export default store;
