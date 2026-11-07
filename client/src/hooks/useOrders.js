import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export function useOrders({ name = '', page = 1, limit = 5 } = {}) {
  return useQuery({
    queryKey: ['orders', { name, page, limit }],
    queryFn: async () => {
      const { data } = await client.get(ENDPOINTS.orders, {
        params: { name, page, limit },
      });
      return data;
    },
    placeholderData: (prev) => prev,
  });
}
