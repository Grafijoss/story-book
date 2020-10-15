import styled, { css } from "styled-components";
import { slideAnimate } from "./animation";

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


