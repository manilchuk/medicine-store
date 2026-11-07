import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import { useAuth } from './useAuth';

export function useLogout() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await client.get(ENDPOINTS.auth.logout);
    },
    onSettled: async () => {
      await logout();
      queryClient.clear();
    },
  });
}
