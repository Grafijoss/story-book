
import styled, { keyframes, css  } from "styled-components";


const exit = (widthSlide, sideAnimaiton) => keyframes`
	from {
		left: calc(50%);
		opacity: 1;
	}

	to {
		left: calc(50% ${sideAnimaiton === 'PREV' ? '+' : '-'} ${widthSlide/2}px);
		opacity: 0;
	}
`;

const enter = (widthSlide, sideAnimaiton) =>  keyframes`
	from {
		left: calc(50% ${sideAnimaiton === 'PREV' ? '-' : '+'} ${widthSlide/2}px);
		opacity: 0;
	}

	to {
		left: calc(50%);
		opacity: 1;
	}
`;

const typesAnimations = {
	enter,
	exit
};

export const slideAnimate = ({
  time = "0.5s",
  type = "ease",
  typeAnimation,
  widthSlide,
  sideAnimaiton
} = {}) => {
  return css`
    animation: ${time} ${typesAnimations[typeAnimation](widthSlide, sideAnimaiton)} ${type};
  `;
};

export const Slide = styled.div`
  ${(props) =>
    !!props.typeAnimation &&
    css`
      ${slideAnimate({ typeAnimation: props.typeAnimation, widthSlide: props.widthSlide, sideAnimaiton: props.sideAnimaiton })}
    `}
  animation-fill-mode: forwards;
  height: ${props => props.heightSlide ? props.heightSlide + 'px' : '100%' };
  left: 50%;
  margin-left: -${props => props.widthSlide/2}px;
  position: absolute;
  width: ${props => props.widthSlide}px;
  will-change: left, opacity;
`;

export const WrrpSlider = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;
