import { IntroWrapper } from './styled';
import useTypist from '@/hooks/typist';
import { IntroProps } from '@/types';
import Link from '../button/link';

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

  const classNames = {
    subtitle: [
      accomodate ? 'accomodate' : '',
      description.alignment,
      description.case,
      'subtitle'
    ].join(' ').trim(),
    description: [
      description.alignment,
      description.case,
      'description'
    ].join(' ').trim(),
    title: [
      titleAlignment,
      'typing-pad',
      titleCase,
      'title'
    ].join(' ').trim(),
    action: [
      accomodate ? 'accomodate' : '',
      'ripple-node',
      'action'
    ].join(' ').trim()
  };

	return (
		<IntroWrapper {...rest}>
			<div className="inner">
				<div className="content">
					{title && <h1 data-aos="fade-down" className={classNames.title}></h1>}
					
					{description.text && (
            <p data-aos="fade-up" className={classNames.description}>
              {description.text}
            </p>
          )}
					
					{subtitle && (
            <aside data-aos="fade-right" className={classNames.subtitle}>
              {subtitle}
            </aside>
          )}
				</div>

				{action.scrollTo && (
          <Link href={`#${action.scrollTo}`} className={classNames.action}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          </Link>
        )}
			</div>
		</IntroWrapper>
	);
};

export default Intro;