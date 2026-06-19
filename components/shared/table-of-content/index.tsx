import { useEffect, useState } from 'react';

import { TableOfContentWrapper } from './styled';
import useClassName from '@/hooks/class-name';
import { TableOfContentProps } from '@/types';
import { Overlay } from '../layout/styled';
import useViewport from '@/hooks/viewport';
import Toggler from '../layout/toggler';
import Link from '../button/link';

const TableOfContent = ({ targetRef, items }: TableOfContentProps) => {
  const [activeItemId, setActiveItemId] = useState(items[0]?.id);
  const [show, setShow] = useState(false);
  const { viewport } = useViewport();

  const showOverlay = ['md', 'sm'].includes(viewport) && show;
  
  const className = useClassName([
    show ? 'show' : '',
    'content-wrapper'
  ]);
  
  const updateActiveItemId = (itemId: string) => () => setActiveItemId(itemId);
  const toggleTableOfContent = () => setShow(!show);

  useEffect(() => {
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
	}, []);

  return (
    <TableOfContentWrapper>
      {showOverlay && <Overlay onClick={toggleTableOfContent} />}

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
      
      <Toggler onClick={toggleTableOfContent} />
    </TableOfContentWrapper>
  );
};

export default TableOfContent;