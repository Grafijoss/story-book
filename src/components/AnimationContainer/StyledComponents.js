import styled, { keyframes, css } from 'styled-components';


const exit = animationSide => keyframes`
    from {
        left: calc(50%);
        opacity: 1;
    }

    to {
        left: calc(50% ${animationSide === 'PREV' ? '+' : '-'} 60%);
        opacity: 0;
    }
`;

const enter = animationSide => keyframes`
    from {
        left: calc(50% ${animationSide === 'PREV' ? '-' : '+'} 60%);
        opacity: 0;
    }

    to {
        left: calc(50%);
        opacity: 1;
    }
`;

const typesAnimations = {
    enter,
    exit,
};

export const slideAnimate = ({
    time = '0.5s',
    type = 'ease',
    animationType,
    animationSide,
} = {}) => css`
    animation: ${time} ${typesAnimations[animationType](animationSide)} ${type};
  `;

export const Slide = styled.div`
  ${props => !!props.animationType
    && css`
      ${slideAnimate({ animationType: props.animationType, animationSide: props.animationSide })}
    `}
  animation-fill-mode: forwards;
  height: ${props => (props.heightSlide ? `${props.heightSlide}px` : '100%')};
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 100%;
  will-change: left, opacity;
`;

export const SliderContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;
