import { keyframes, css } from 'styled-components'

const exitLeft = keyframes`
	from {
		left: 50%;
		opacity: 1;
	}

	to {
		left: calc(50% - 200px);
		opacity: 0;
	}
`

const enterLeft = keyframes`
	from {
		left: calc(50% - 200px);
		opacity: 0;
	}

	to {
		left: 50%;
		opacity: 1;
	}
`

const exitRight = keyframes`
	from {
		left: calc(50%);
		opacity: 1;
	}

	to {
		left: calc(50% + 200px);
		opacity: 0;
	}
`

const enterRight = keyframes`
	from {
		left: calc(50% + 200px);
		opacity: 0;
	}

	to {
		left: calc(50%);
		opacity: 1;
	}
`

const typesAnimations = {
  exitLeft,
  enterRight,
  enterLeft,
  exitRight,
}

export const slideAnimate = ({
  time = '0.5s',
  type = 'ease',
  typeAnimation,
} = {}) => {
  return css`
    animation: ${time} ${typesAnimations[typeAnimation]} ${type};
  `
}
