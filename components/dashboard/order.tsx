'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchOrder } from './slices';

const Order = () => {
  const { order } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();
  const { orderId } = useParams();

  useEffect(() => {
    if (!orderId || typeof orderId !== 'string') return;
    dispatch(fetchOrder(orderId));
  }, []);

  return (
    <>{order?.data?.plan?.name}</>
  );
};

export default Order;