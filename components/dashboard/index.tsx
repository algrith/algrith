'use client';

import { AuditOutlined, CarryOutOutlined, HourglassOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchOrders } from './slices';
import { OrderModel } from '@/types';
import { Cards } from './styled';

const orderSummary = [
  {
    description: 'See all your orders',
    icon: <ShoppingOutlined />,
    title: 'All Orders',
    status: 'all',
    id: 'orders'
  },
  {
    description: 'All pending orders',
    icon: <HourglassOutlined />,
    status: 'pending',
    title: 'Pending',
    id: 'pending'
  },
  {
    description: 'All completed orders',
    icon: <CarryOutOutlined />,
    status: 'completed',
    title: 'Completed',
    id: 'completed'
  },
  {
    description: 'All delivered orders',
    icon: <AuditOutlined />,
    status: 'delivered',
    title: 'Delivered',
    id: 'delivered'
  }
];

const Dashboard = () => {
  const { orders } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const orderStatusCount = orders.items.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {
    all: orders.items.length,
    cancelled: 0,
    delivered: 0,
    completed: 0,
    pending: 0,
  });
  
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <Cards>
      {orderSummary.map((item) => (
        <div className="item" key={item.id}>
          <div className="metadata">
            <h2>{item.title}</h2>
            <span>
              {orderStatusCount[item.status as OrderModel['status']]}
            </span>
          </div>

          <div className="icon">
            {item.icon}
          </div>
        </div>
      ))}
    </Cards>
  );
};

export default Dashboard;