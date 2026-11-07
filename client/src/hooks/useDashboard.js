import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await client.get(ENDPOINTS.dashboard);
      return data;
    },
  });
}
