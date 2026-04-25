import { WavesWrapper } from './styled';

const Waves = ({ inverse = false }) => {
  return (
    <WavesWrapper className={inverse ? 'inverse' : ''}>
      <svg className="top-wave" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
        <path
          d="M0,192 C240,256 480,128 720,160 C960,192 1200,256 1440,192 L1440,320 L0,320 Z"
          fill="rgba(44,163,116,0.12)"
        />
      </svg>

      <svg className="bottom-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          d="M0,224 C240,160 480,288 720,240 C960,192 1200,128 1440,224 L1440,320 L0,320 Z"
          fill="rgba(236,175,34,0.10)"
        />
      </svg>
    </WavesWrapper>
  );
};

export default Waves;