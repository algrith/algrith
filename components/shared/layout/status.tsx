import { User } from 'next-auth';
import { useState } from 'react';
import { Spin } from 'antd';

import { updateOrderStatus } from '../chats/slices';
import { useAppDispatch } from '@/store/hooks';
import useClassName from '@/hooks/class-name';
import { StatusWrapper } from './styled';
import { OrderModel } from '@/types';
import { Select } from '../input';

type Status = OrderModel['status'] | 'verified' | 'unverified';

interface StatusProps {
  onChange?: (status: Status) => void;
  payload?: OrderModel | User;
  target?: 'order' | 'user';
  isEditable?: boolean;
}

const statusOptions = {
  user: [],
  order: [
    { label: 'Delivered', value: 'delivered' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Pending', value: 'pending' }
  ]
};

const Status = (props: StatusProps) => {
  const { isEditable, onChange, payload, target = 'order' } = props;
  const [loading, setLoading] = useState(false);
  const options = statusOptions[target] ?? [];
  const dispatch = useAppDispatch();
  let status = '';

  if (payload) {
    if ('status' in payload) status = payload.status;
    if ('is_verified' in payload) {
      status = payload.is_verified ? 'verified' : 'unverified';
    }
  }

  const className = useClassName([
    isEditable ? 'editable' : '',
    status
  ]);

  const handleChange = async (status: OrderModel['status']) => {
    onChange?.(status);
    setLoading(true);
    
    if (target === 'order' && payload?.id) {
      await dispatch(updateOrderStatus({
        ...(payload as OrderModel),
        status
      }));
    }

    setLoading(false);
  };

  return (
    <StatusWrapper className={className}>
      {loading && <Spin size="small" />}
      {!isEditable ? (
        status
      ) : (
        <Select
          dropdownStyle={{ minWidth: '105px' }}
          onChange={handleChange}
          disabled={loading}
          options={options}
          loading={loading}
          value={status}
          size="small"
        />
      )}
    </StatusWrapper>
  );
};

export default Status;