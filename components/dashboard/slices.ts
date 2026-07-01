import { signOut } from 'next-auth/react';

import { setAnalytics, setOrder, setOrders, setProfile, setUser, setUsers } from './reducer';
import { AppDispatch, store } from '@/store';
import { Fetch } from '@/utils/api';

export const fetchOrders = (limit = 10, page = 1) => async (dispatch: AppDispatch) => {
  dispatch(setOrders({ loading: true }));

  const { data } = await Fetch({
    path: `/orders?page=${page}&limit=${limit}`
  });
  
  dispatch(setOrders({
    hasNext: data.hasNext || false,
    hasPrev: data.hasPrev || false,
    limit: data.limit || 50,
    total: data.total || 0,
    pages: data.pages || 1,
    list: data.list || [],
    page: data.page || 1,
    loading: false
  }));
};

export const fetchUsers = (limit = 50, page = 1) => async (dispatch: AppDispatch) => {
  dispatch(setUsers({ loading: true }));

  const { data } = await Fetch({
    path: `/users?page=${page}&limit=${limit}`
  });
  
  dispatch(setUsers({
    hasNext: data.hasNext || false,
    hasPrev: data.hasPrev || false,
    limit: data.limit || 50,
    total: data.total || 0,
    pages: data.pages || 1,
    list: data.list || [],
    page: data.page || 1,
    loading: false
  }));
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

export const deleteOrder = (orderId: string) => async (dispatch: AppDispatch) => {
  const { orders } = store.getState().dashboard;

  const { success } = await Fetch({
    path: `/orders/${orderId}`,
    method: 'DELETE'
  });

  if (!success) return;

  dispatch(setOrders({
    list: orders.list.filter(({ id }) => id !== orderId),
    total: orders.total - 1
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

export const deleteUser = (userId: string) => async (dispatch: AppDispatch) => {
  const { profile: { data }, users } = store.getState().dashboard;
  const isLoggedInUser = data?.id === userId;
  const isStaff = data?.role !== 'customer';

  const { success } = await Fetch({
    path: `/users/${userId}`,
    method: 'DELETE'
  });

  if (success && isLoggedInUser) return signOut({
    redirectTo: '/auth'
  });

  if (isStaff) dispatch(setUsers({
    list: users.list.filter(({ id }) => id !== userId),
    total: users.total - 1
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