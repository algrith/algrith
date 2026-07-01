'use client';

import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import Dropdown from 'antd/es/dropdown/dropdown';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MenuProps } from 'antd';
import { User } from 'next-auth';

import { StatusWrapper, TableWrapper } from '../shared/layout/styled';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteUser, fetchUsers } from './slices';
import Presence from '../shared/layout/presence';
import Prompt from '../shared/feedback/prompt';
import Status from '../shared/layout/status';
import { MainViewWrapper } from './styled';
import { getDateFormat } from '@/utils';

const DeleteUserLabel = ({ userId }: { userId: string }) => {
  const [isDeleting, setDeleting] = useState(false);
  const dispatch = useAppDispatch();
  
  const handleDeleteOrder = async () => {
    setDeleting(true);
    await dispatch(deleteUser(userId));
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

const Users = () => {
  const { profile: { data: authUser }, users } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const isAdmin = authUser?.role === 'admin';
  
  const pagination: TablePaginationConfig = {
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
    onChange: (page, pageSize) => dispatch(fetchUsers(pageSize, page)),
    hideOnSinglePage: users.pages < 2,
    pageSize: users.limit,
    current: users.page,
    total: users.total,
    size: 'small',
  };
  
  const columns: ColumnsType<User> = [
    {
      render: (_, user) => <><Presence userId={user.id as string} /> {user.name}</>,
      dataIndex: 'name',
      title: 'Name',
      key: 'name'
    },
    {
      dataIndex: 'email',
      title: 'Email',
      key: 'email'
    },
    {
      render: (date) => (date ? getDateFormat(date).shortMonthDayFullYear : '-'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      title: 'Joined'
    },
    {
      render: (role) => <StatusWrapper>{role}</StatusWrapper>,
      dataIndex: 'role',
      align: 'center',
      title: 'Role',
      key: 'role'
    },
    {
      dataIndex: 'orders_count',
      key: 'orders_count',
      align: 'center',
      title: 'Orders'
    },
    {
      render: (_, user) => <Status payload={user} />,
      dataIndex: 'is_verified',
      title: 'Status',
      align: 'center',
      key: 'verified'
    },
    {
      render: (_, user) => {
        const items: MenuProps['items'] = [
          {
            onClick: () => router.push(`/dashboard/users/${user.id}`),
            label: 'View',
            key: 'view'
          },
          ...(isAdmin ? [{
            label: <DeleteUserLabel userId={user.id as string} />,
            key: 'delete',
            danger: true
          }] : [])
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
    const user = record as User;
    
    return {
      onDoubleClick: () => router.push(`/dashboard/users/${user.id}`)
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <MainViewWrapper>
      <header>
        <h1>Users</h1>
      </header>

      <div className="content">
        <TableWrapper
          columns={columns as ColumnsType<unknown>}
          scroll={{ x: 'max-content' }}
          dataSource={users.list}
          loading={users.loading}
          pagination={pagination}
          onRow={onRow}
          size="small"
          rowKey="id"
        />
      </div>
    </MainViewWrapper>
  );
};

export default Users;