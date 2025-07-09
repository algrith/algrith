import { OrderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { TableOfContentWrapper } from './styled';
import useClassName from '@/hooks/class-name';
import { TableOfContentProps } from '@/types';
import { Overlay } from '../layout/styled';
import useViewport from '@/hooks/viewport';
import Link from '../button/link';
import Button from '../button';

const TableOfContent = ({ targetRef, items }: TableOfContentProps) => {
  const [togglerOffsetClass, setTogglerOffsetClass] = useState('');
  const [activeItemId, setActiveItemId] = useState(items[0]?.id);
  const [show, setShow] = useState(false);
  const { viewport } = useViewport();

  const showOverlay = ['md', 'sm'].includes(viewport) && show;
  
  const togglerClassName = useClassName([
    togglerOffsetClass,
    'toggler'
  ]);
  
  const className = useClassName([
    show ? 'show' : '',
    'content-wrapper'
  ]);
  
  const updateActiveItemId = (itemId: string) => () => setActiveItemId(itemId);
  const toggleTableOfContent = () => setShow(!show);

  const offsetToggler = () => {
    const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
    setTogglerOffsetClass(scrollPosition > 200 ? 'offset' : '');
  };

  useEffect(() => {
    window.addEventListener('scroll', offsetToggler);

    const observer = new IntersectionObserver((entries) => {
			const targetId = entries[0].target.id;
      if (entries[0].isIntersecting) {
				setActiveItemId(targetId);
      }
		}, { threshold: [0.3] });
	
    const observed = Array.from(targetRef?.current?.childNodes || []).filter(
      (node): node is Element => node.nodeType === Node.ELEMENT_NODE
    );

    observed.forEach((element) => observer.observe(element));
      
    return () => {
      window.removeEventListener(
        'scroll',
        offsetToggler
      );
    }
	}, []);

  return (
    <TableOfContentWrapper>
      <Overlay onClick={toggleTableOfContent} className={showOverlay ? 'open' : 'closed'} />

      <div className={className}>
        <h2>Table of Content</h2>

        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Link
                className={activeItemId === item.id ? 'active' : ''}
                onClick={updateActiveItemId(item.id)}
                href={`#${item.id}`}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <Button
        icon={<OrderedListOutlined />}
        onClick={toggleTableOfContent}
        className={togglerClassName}
        shape="circle"
        type="primary"
        size="large"
      />
    </TableOfContentWrapper>
  );
};

export default TableOfContent;