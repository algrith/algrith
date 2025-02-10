import { LinkWrapper } from '@/components/shared/button/styled';
import { LinkProps } from '@/types';

const Link = ({ children, asButton = false, ...rest }: LinkProps) => {
  const className = [
    rest.rounded ? 'rounded' : '',
    asButton ? 'button' : '',
    rest.type ?? 'default',
    rest.className,
    rest.size
  ].join(' ').trim();
  
  return (
    <LinkWrapper {...rest} className={className} id={rest.id}>
      {children}
    </LinkWrapper>
  );
};

export default Link;