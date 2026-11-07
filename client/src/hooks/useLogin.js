import { useMutation } from '@tanstack/react-query';
import client from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import { useAuth } from './useAuth';

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await client.post(ENDPOINTS.auth.login, { email, password });
      return data;
    },
    onSuccess: (data) => {
      login(data.token, data.user);
    },
  });
}
