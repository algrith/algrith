'use client';

import { EllipsisOutlined } from '@ant-design/icons';
import Dropdown from 'antd/es/dropdown/dropdown';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MenuProps } from 'antd';
import { User } from 'next-auth';

import { StatusBadgeWrapper, TableWrapper } from '../shared/layout/styled';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ColumnsType } from 'antd/es/table';
import { MainViewWrapper } from './styled';
import { getDateFormat } from '@/utils';
import { fetchUsers } from './slices';

const Users = () => {
  const { users } = useAppSelector((state) => state.dashboard);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const isAdmin = session?.user.role === 'admin';

  const columns: ColumnsType<User> = [
    {
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
      render: (date) => (date ? getDateFormat(date).full : '-'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      title: 'Joined'
    },
    {
      render: (user) => user?.orders_count || 0,
      dataIndex: 'orders',
      align: 'center',
      title: 'Orders',
      key: 'orders'
    },
    {
      render: (is_verified) => {
        const verification = is_verified ? 'verified' : 'unverified';
        
        return (
          <StatusBadgeWrapper className={verification}>
            {verification}
          </StatusBadgeWrapper>
        );
      },
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
            onClick: () => {},
            label: 'Delete',
            danger: true,
            key: 'delete'
          }] : [])
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
          pagination={false}
          onRow={onRow}
          rowKey="id"
        />
      </div>
    </MainViewWrapper>
  );
};

export default Users;