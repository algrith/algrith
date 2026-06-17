'use client';

import { OrderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { TogglerWrapper } from '@/components/shared/layout/styled';
import useClassName from '@/hooks/class-name';

const Toggler = ({ noOffset = false, onClick }: { onClick: () => void; noOffset: boolean; }) => {
  const [togglerOffsetClass, setTogglerOffsetClass] = useState('offset');
  const togglerClassName = useClassName([togglerOffsetClass, 'toggler']);
  
  const offsetToggler = () => {
    if (noOffset) return setTogglerOffsetClass('');
    const scrollToTopElement = document.querySelector('#algrith-scroll-to-top-controller');
    setTogglerOffsetClass(scrollToTopElement?.checkVisibility() ? 'offset' : '');
  };
  
  useEffect(() => {
    window.addEventListener('scroll', offsetToggler);
    offsetToggler();

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