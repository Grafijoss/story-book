import styled, { css } from "styled-components";
// import { slideAnimate } from "./animation";

export const Slide = styled.div`
  transition: all 0.5s ease;
  height: ${props => props.heightSlide ? props.heightSlide + 'px' : '100%' };
  left: ${props => props.left}%;
  margin-left: -${props => props.widthSlide/2}px;
  opacity: ${props => props.opacity};
  position: absolute;
  width: ${props => props.widthSlide}px;
`;


export const WrrpSlider = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;


