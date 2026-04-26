'use client';

import useClassName from '@/hooks/class-name';
import { IntroWrapper } from './styled';
import useTypist from '@/hooks/typist';
import { IntroProps } from '@/types';
import Button from '../button';

const Intro = (props: IntroProps) => {
  useTypist(props.title);

  const {
    titleAlignment,
    description,
    accomodate,
    titleCase,
    subtitle,
    action,
    title,
    ...rest
  } = props;

  const descriptionClassName = useClassName([
    description.alignment ?? '',
    description.case ?? '',
    'description'
  ]);

  const subtitleClassName = useClassName([
    accomodate ? 'accomodate' : '',
    description.alignment ?? '',
    description.case ?? '',
    'subtitle'
  ]);

  const actionClassName = useClassName([
    accomodate ? 'accomodate' : '',
    'ripple-node',
    'action'
  ]);

  const titleClassName = useClassName([
    titleAlignment ?? '',
    titleCase ?? '',
    'typing-pad',
    'title'
  ]);

	return (
		<IntroWrapper {...rest}>
			<div className="inner">
        {title && <h1 data-aos="fade-down" className={titleClassName}></h1>}
        
        {description.text && (
          <p
            dangerouslySetInnerHTML={{ __html: description.text }}
            className={descriptionClassName}
            data-aos="fade-up"
          />
        )}
        
        {subtitle && (
          <aside data-aos="fade-right" className={subtitleClassName}>
            {subtitle}
          </aside>
        )}
      </div>

      {action?.scrollTo && (
        <Button type="primary" className={actionClassName} data-scroll-to={action.scrollTo}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
        </Button>
      )}
		</IntroWrapper>
	);
};

export default Intro;