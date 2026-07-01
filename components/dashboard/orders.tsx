'use client';

import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { BookOutlined, MoreOutlined } from '@ant-design/icons';
import Dropdown from 'antd/es/dropdown/dropdown';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import capitalize from 'lodash/capitalize';
import { User } from 'next-auth';
import { MenuProps } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TableWrapper } from '../shared/layout/styled';
import { deleteOrder, fetchOrders } from './slices';
import Prompt from '../shared/feedback/prompt';
import Status from '../shared/layout/status';
import { Addon, OrderModel } from '@/types';
import { MainViewWrapper } from './styled';
import { getDateFormat } from '@/utils';
import Button from '../shared/button';

const DeleteOrderLabel = ({ orderId }: { orderId: string }) => {
  const [isDeleting, setDeleting] = useState(false);
  const dispatch = useAppDispatch();
  
  const handleDeleteOrder = async () => {
    setDeleting(true);
    await dispatch(deleteOrder(orderId));
    setDeleting(false);
  };

  return (
    <Prompt
      description="Do you wish to proceed?"
      onConfirmed={handleDeleteOrder}
      title="Confirm Action"
      disabled={isDeleting}
      target="deleteOrder"
    >
      Delete
    </Prompt>
  );
};

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
      render: (assignees) => assignees?.map((assignee: User) => assignee.name).join(', ') || '-',
      dataIndex: 'assignees',
      title: 'Assigned',
      key: 'assigned'
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
              label: <DeleteOrderLabel orderId={order.id} />,
              key: 'delete',
              danger: true
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

  const pagination: TablePaginationConfig = {
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} orders`,
    onChange: (page, pageSize) => dispatch(fetchOrders(pageSize, page)),
    hideOnSinglePage: orders.pages < 2,
    pageSize: orders.limit,
    current: orders.page,
    total: orders.total,
    size: 'small',
  };

  const onRow = (record: unknown) => {
    const order = record as OrderModel;
    
    return {
      onDoubleClick: () => router.push(`/dashboard/orders/${order.id}`)
    }
  };

  const createOrder = () => {
    router.push('/pricing');
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <MainViewWrapper>
      <header>
        <h1>Orders</h1>
        
        <Button onClick={createOrder} icon={<BookOutlined />} type="primary" size="small" rounded>
          Create Order
        </Button>
      </header>

      <div className="content">
        <TableWrapper
          columns={columns as ColumnsType<unknown>}
          scroll={{ x: 'max-content' }}
          dataSource={orders.list}
          loading={orders.loading}
          pagination={pagination}
          onRow={onRow}
          size="small"
          rowKey="id"
        />
      </div>
    </MainViewWrapper>
  );
};

export default Orders;