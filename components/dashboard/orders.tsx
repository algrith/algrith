'use client';

import { MoreOutlined } from '@ant-design/icons';
import Dropdown from 'antd/es/dropdown/dropdown';
import { useRouter } from 'next/navigation';
import capitalize from 'lodash/capitalize';
import { useEffect } from 'react';
import { MenuProps } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TableWrapper } from '../shared/layout/styled';
import Status from '../shared/layout/status';
import { Addon, OrderModel } from '@/types';
import { ColumnsType } from 'antd/es/table';
import { MainViewWrapper } from './styled';
import { getDateFormat } from '@/utils';
import { fetchOrders } from './slices';

const Orders = () => {
  const { profile: { data: authUser }, orders } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isAdmin = authUser?.role === 'admin';
  const columns: ColumnsType<OrderModel> = [
    {
      render: (plan) => capitalize(plan?.name || '-'),
      dataIndex: 'plan',
      title: 'Package',
      key: 'plan'
    },
    {
      render: (customer) => customer?.name,
      dataIndex: 'customer',
      title: 'Owner',
      key: 'owner'
    },
    {
      render: (date) => (date ? getDateFormat(date).full : '-'),
      dataIndex: 'paid_at',
      key: 'paid_at',
      title: 'Date'
    },
    {
      render: (addons) => addons?.map((addon: Addon) => addon.text).join(', ') || '-',
      dataIndex: 'addons',
      title: 'Addons',
      key: 'addons',
      width: 300
    },
    {
      render: (_, order) => <Status payload={order} isEditable />,
      dataIndex: 'status',
      align: 'center',
      title: 'Status',
      key: 'status'
    },
    {
      render: (_, order) => {
        const items: MenuProps['items'] = [
          {
            onClick: () => router.push(`/dashboard/orders/${order.id}`),
            label: 'View',
            key: 'view'
          },
          ...(isAdmin ? [
            {
              onClick: () => router.push(`/dashboard/users/${order.user}`),
              label: 'Owner',
              key: 'owner'
            },
            {
              onClick: () => {},
              label: 'Delete',
              danger: true,
              key: 'delete'
            }
          ] : [])
        ];

        return (
          <Dropdown menu={{ items }} trigger={['hover']}>
          <MoreOutlined />
					</Dropdown>
        );
      },
      title: 'Actions',
      align: 'center',
      key: 'actions'
    }
  ];

  const onRow = (record: unknown) => {
    const order = record as OrderModel;
    
    return {
      onDoubleClick: () => router.push(`/dashboard/orders/${order.id}`)
    }
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <MainViewWrapper>
      <header>
        <h1>Orders</h1>
      </header>

      <div className="content">
        <TableWrapper
          columns={columns as ColumnsType<unknown>}
          scroll={{ x: 'max-content' }}
          dataSource={orders.list}
          loading={orders.loading}
          pagination={false}
          onRow={onRow}
          rowKey="id"
        />
      </div>
    </MainViewWrapper>
  );
};

export default Orders;