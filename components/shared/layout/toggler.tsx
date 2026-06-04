'use client';

import { OrderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { TogglerWrapper } from '@/components/shared/layout/styled';
import useClassName from '@/hooks/class-name';

const Toggler = ({ onClick }: { onClick: () => void }) => {
  const [togglerOffsetClass, setTogglerOffsetClass] = useState('');
  const togglerClassName = useClassName([togglerOffsetClass, 'toggler']);
  
  const offsetToggler = () => {
    const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
    setTogglerOffsetClass(scrollPosition > 200 ? 'offset' : '');
  };
  
  useEffect(() => {
    window.addEventListener('scroll', offsetToggler);
    
    return () => {
      window.removeEventListener('scroll', offsetToggler);
    }
	}, []);

  return (
    <TogglerWrapper
      icon={<OrderedListOutlined />}
      className={togglerClassName}
      onClick={onClick}
      shape="circle"
      type="primary"
      size="large"
    />
  );
};

export default Toggler;