import { useCallback } from 'react';
import { useLoginMutation, useGetProfileQuery } from '../store/api/authApi';

export const useAuthApi = () => {
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();

  const handleLogin = useCallback(async (username, password) => {
    try {
      const result = await login({ username, password }).unwrap();
      return result;
    } catch (error) {
      throw new Error(error.data?.message || 'Login failed');
    }
  }, [login]);

  return {
    login: handleLogin,
    isLoginLoading,
    loginError,
  };
};

export const useProfileApi = (token) => {
  const {
    data: profile,
    error: profileError,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useGetProfileQuery(token, {
    skip: !token,
  });

  return {
    profile,
    profileError,
    isProfileLoading,
    refetchProfile,
  };
};
