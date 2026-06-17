import useClassName from '@/hooks/class-name';
import { StatusWrapper } from './styled';
import { OrderModel } from '@/types';
import { Select } from '../input';

type Status = OrderModel['status'] | 'verified' | 'unverified';

interface StatusProps {
  onChange?: (status: Status) => void;
  isOrderStatus?: boolean;
  isEditable?: boolean;
  status: Status;
}

const orderStatusOptions = [
  { label: 'Delivered', value: 'delivered' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Pending', value: 'pending' }
];

const Status = (props: StatusProps) => {
  const { isOrderStatus, isEditable, onChange, status } = props;
  const options = isOrderStatus ? orderStatusOptions : [];
  const className = useClassName([
    isEditable ? 'editable' : '',
    status
  ]);

  return (
    <StatusWrapper className={className}>
      {!isEditable ? (
        status
      ) : (
        <Select
          onChange={onChange}
          options={options}
          value={status}
          size="small"
        />
      )}
    </StatusWrapper>
  );
};

export default Status;