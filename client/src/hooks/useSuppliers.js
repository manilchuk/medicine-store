import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export function useSuppliers({ name = '', page = 1, limit = 5 } = {}) {
  return useQuery({
    queryKey: ['suppliers', { name, page, limit }],
    queryFn: async () => {
      const { data } = await client.get(ENDPOINTS.suppliers, {
        params: { name, page, limit },
      });
      return data;
    },
    placeholderData: (prev) => prev,
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await client.post(ENDPOINTS.suppliers, payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['suppliers'] }),
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await client.put(`${ENDPOINTS.suppliers}/${id}`, payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['suppliers'] }),
  });
}
