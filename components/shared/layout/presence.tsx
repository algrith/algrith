import { useAppSelector } from '@/store/hooks';
import useClassName from '@/hooks/class-name';
import { PresenceWrapper } from './styled';

const Presence = ({ userId, small = false }: { small?: boolean; userId: string }) => {
  const status = useAppSelector((state) => state.dashboard.presences[userId]);
  const className = useClassName([small ? 'small' : '', status]);
  return <PresenceWrapper className={className} title="Online" />;
};

export default Presence;