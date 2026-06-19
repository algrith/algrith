import { signOut } from 'next-auth/react';

import { setAnalytics, setOrder, setOrders, setProfile, setUser, setUsers } from './reducer';
import { AppDispatch, store } from '@/store';
import { Fetch } from '@/utils/api';

export const deleteUser = (userId: string, isLoggedInUser = false) => async (dispatch: AppDispatch) => {
  const { success } = await Fetch({
    path: `/users/${userId}`,
    method: 'DELETE'
  });

  if (success && isLoggedInUser) signOut({
    redirectTo: '/auth'
  });
};

export const fetchUserProfile = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(setProfile({ loading: true }));

  const { data: user } = await Fetch({
    path: `/users/${userId}`
  });

  dispatch(setProfile({
    data: user || undefined,
    loading: false
  }));
};

export const fetchOrders = (userId?: string) => async (dispatch: AppDispatch) => {
  dispatch(setOrders({ loading: true }));

  const { data: orders } = await Fetch({
    path: `/orders${userId ? `/users/${userId}` : ''}`
  });
  
  dispatch(setOrders({
    list: orders || [],
    loading: false
  }));
};

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

export const fetchUser = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(setUser({ loading: true }));

  const { data: user } = await Fetch({
    path: `/users/${userId}`
  });
  
  dispatch(setUser({
    data: user || undefined,
    loading: false
  }));
};

export const fetchOrdersAnalytics = () => async (dispatch: AppDispatch) => {
  dispatch(setAnalytics({ loading: true }));

  const { data: analytics, success } = await Fetch({
    path: `/analytics/orders`
  });
  
  dispatch(setAnalytics({
    data: success ? analytics : {},
    loading: false
  }));
};

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch(setUsers({ loading: true }));

  const { data: users } = await Fetch({
    path: `/users`
  });
  
  dispatch(setUsers({
    list: users || [],
    loading: false
  }));
};