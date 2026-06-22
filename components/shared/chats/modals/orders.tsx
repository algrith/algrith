'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchOrders } from '@/components/dashboard/slices';
import { setShowOrdersModal } from '../reducer';
import { OrdersModalWrapper } from './styled';
import { setupOrderChat } from '../slices';
import { OrderModel } from '@/types';

const OrdersModal = () => {
  const { profile, orders } = useAppSelector((State) => State.dashboard);
  const { showOrdersModal } = useAppSelector((State) => State.chat);
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(setShowOrdersModal(false));
  
  const handleSetupOrderChat = (order: OrderModel) => () => {
    dispatch(setupOrderChat(order, profile.data));
    closeModal();
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <OrdersModalWrapper
      loading={orders.loading}
      title="Select an Order"
      open={showOrdersModal}
      onCancel={closeModal}
      footer={null}
      width={350}
      centered
    >
      <div className="content">
        {orders.list.map((order) => (
          <button onClick={handleSetupOrderChat(order)} className="item" key={order.id}>
            <span>{order.plan.name}</span>
            <span>#{order.reference}</span>
          </button>
        ))}
      </div>
    </OrdersModalWrapper>
  );
};

export default OrdersModal;