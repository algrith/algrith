import { signOut } from 'next-auth/react';

import { setOrder, setOrders, setUser } from './reducer';
import { AppDispatch, store } from '@/store';
import { Fetch } from '@/utils/api';

export const fetchOrder = (orderId: string) => async (dispatch: AppDispatch) => {
  dispatch(setOrder({ loading: true }));

  const { data: order } = await Fetch({
    path: `/orders/${orderId}`
  });
  
  dispatch(setOrder({
    data: order || undefined,
    loading: false
  }));
};

export const deleteAccount = () => async (dispatch: AppDispatch) => {
  const { success } = await Fetch({
    method: 'DELETE',
    path: `/account`
  });

  if (success) signOut({
    redirectTo: '/auth'
  });
};

export const fetchOrders = () => async (dispatch: AppDispatch) => {
  dispatch(setOrders({ loading: true }));

  const { data: orders } = await Fetch({
    path: `/orders`
  });
  
  dispatch(setOrders({
    list: orders || [],
    loading: false
  }));
};

export const fetchUser = () => async (dispatch: AppDispatch) => {
  dispatch(setUser({ loading: true }));

  const { data: user } = await Fetch({
    path: `/account`
  });
  
  dispatch(setUser({
    data: user || undefined,
    loading: false
  }));
};