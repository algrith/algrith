import { AppDispatch } from '@/store';
import { OrderModel } from '@/types';
import { Fetch } from '@/utils/api';

export const createOrder = (payload: OrderModel) => async (dispatch: AppDispatch) => {
  const { success } = await Fetch({
    path: '/orders',
    method: 'POST',
    body: payload
  });
};