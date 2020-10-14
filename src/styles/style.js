import styled, { css } from "styled-components";
import { slideAnimate } from "./animation";

export const Slide = styled.div`
  ${(props) =>
    !!props.typeAnimation && !!props.typeAnimation.type
      ? css`
          ${slideAnimate({ typeAnimation: props.typeAnimation.type })}
        `
      : css`
          opacity: ${props.typeAnimation.initial ? 1 : 0};
        `}

  animation-fill-mode: forwards;
  background: #fff;
  border-radius: 10px 10px 0 0;
  bottom: 0;
  height: 500px;
  left: 50%;
  margin-left: -200px;
  padding: 20px;
  position: fixed;
  transition: 0.2s;
  width: 400px;
  will-change: left, opacity;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 100px;
  justify-content: center;
  width: 100vw;
  button: {
    background: blue;
    color: #fff;
    line-height: 50px;
    width: 200px;
  }
`;
