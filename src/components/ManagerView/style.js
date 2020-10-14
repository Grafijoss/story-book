import styled, { css } from "styled-components";
import { slideAnimate } from "./animation";

export const Slide = styled.div`
  ${(props) =>
    !!props.typeAnimation &&
    css`
      ${slideAnimate({ typeAnimation: props.typeAnimation })}
    `}
  animation-fill-mode: forwards;
  left: 50%;
  margin-left: -180px;
  padding: 20px;
  position: absolute;
  transition: 0.2s;
  width: 360px;
  will-change: left, opacity;
`;

export const WrrpSlider = styled.div`
  height: calc(100% - 50px);
  border: solid 1px #ccc;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const WrppButtons = styled.div`
  color: #fff;
  height: 40px;
  position: absolute;
  right: 20px;
  top: 10px;
  width: 100px;
  button {
    border: solid 1px #ccc;
    cursor: pointer;
    line-height: 40px;
    margin: 0 5px;
    width: 40px;
  }
`;
