import { LinkWrapper } from '@/components/shared/button/styled';
import { LinkProps } from '@/types';

const Link = (props: LinkProps) => {
  const { children, asButton = false, rounded = false, type, size, ...rest } = props;
  
  const className = [
    rounded ? 'rounded' : '',
    asButton ? 'button' : '',
    type ?? 'default',
    rest.className,
    size
  ].join(' ').trim();
  
  return (
    <LinkWrapper {...rest} className={className} id={rest.id}>
      {children}
    </LinkWrapper>
  );
};

export default Link;