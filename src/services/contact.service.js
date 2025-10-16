import { API } from '@/utils/API';
import { useMutation } from '@tanstack/react-query';

export const useMutateContact = () => {
  return useMutation({
    mutationFn: (params) =>
      API.request({
        url: '/api/product/contact',
        params,
        method: 'POST'
      })
  });
};

export const useMutateOrder = () => {
  return useMutation({
    mutationFn: (params) =>
      API.request({
        url: '/api/product/order',
        params,
        method: 'POST'
      })
  });
};
