import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export function useCustomers({ name = '', page = 1, limit = 5 } = {}) {
  return useQuery({
    queryKey: ['customers', { name, page, limit }],
    queryFn: async () => {
      const { data } = await client.get(ENDPOINTS.customers, {
        params: { name, page, limit },
      });
      return data;
    },
    placeholderData: (prev) => prev,
  });
}

export function useCustomerById(customerId) {
  return useQuery({
    queryKey: ['customers', customerId],
    queryFn: async () => {
      const { data } = await client.get(`${ENDPOINTS.customers}/${customerId}`);
      return data;
    },
    enabled: Boolean(customerId),
  });
}
