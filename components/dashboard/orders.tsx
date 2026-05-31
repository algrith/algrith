'use client';

import { EllipsisOutlined } from '@ant-design/icons';
import Dropdown from 'antd/es/dropdown/dropdown';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TableWrapper } from '../shared/layout/styled';
import { Addon, OrderModel } from '@/types';
import { ColumnsType } from 'antd/es/table';
import { fetchOrders } from './slices';
import { MenuProps } from 'antd';

const Orders = () => {
  const { orders } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const columns: ColumnsType<OrderModel> = [
    {
      render: (plan) => plan?.name || '-',
      dataIndex: 'plan',
      title: 'Package',
      key: 'plan'
    },
    {
      // render: (date) => (date ? getDateFormat(date).iso : '-'),
      dataIndex: 'paid_at',
      key: 'paid_at',
      title: 'Date'
    },
    {
      render: (addons) => addons?.map((addon: Addon) => addon.text).join(', ') || '-',
      dataIndex: 'addons',
      title: 'Addons',
      key: 'addons'
    },
    {
      dataIndex: 'status',
      align: 'center',
      title: 'Status',
      key: 'status'
    },
    {
      render: (_, order) => {
        const items: MenuProps['items'] = [
          {
            onClick: () => router.push(`/dashboard/orders/${order._id}`),
            label: 'View',
            key: 'view'
          },
          {
            onClick: () => {},
            label: 'Delete',
            danger: true,
            key: 'delete'
          }
        ];

        return (
          <Dropdown menu={{ items }} trigger={['hover']}>
          <EllipsisOutlined />
					</Dropdown>
        );
      },
      title: 'Actions',
      align: 'center',
      key: 'actions'
    }
  ];

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <TableWrapper
      columns={columns as ColumnsType<unknown>}
      scroll={{ x: 'max-content' }}
      dataSource={orders.list}
      loading={orders.loading}
      pagination={false}
      rowKey="id"
    />
  );
};

export default Orders;