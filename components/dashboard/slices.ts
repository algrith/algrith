import { setOrder, setOrders } from './reducer';
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