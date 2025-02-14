import { PingAnimationWrapper, WelcomeIntroWrapper } from './styled';
import Link from '@/components/shared/button/link';
import useTypist from '@/hooks/typist';
import { IntroProps } from '@/types';

const WelcomeIntro = (props: IntroProps) => {
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

  return (
    <WelcomeIntroWrapper {...rest}>
      <div className="inner">
        <div data-aos="fade" className="left">
          <span className="typing-pad"></span>

          {description.text && (
            <span className="description">
              {description.text}
            </span>
          )}

          {action.text && (
            <Link type="primary" href={`#${action?.scrollTo}`} rounded asButton>
              <PingAnimationWrapper>
                <div className="animator">
                  <div className="background" />
                </div>
              </PingAnimationWrapper>

              {action.text}
              {action.icon}
            </Link>
          )}
        </div>
      </div>
    </WelcomeIntroWrapper>
  );
};

export default WelcomeIntro;
