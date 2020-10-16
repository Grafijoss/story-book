import { keyframes, css } from "styled-components";


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
