import styled, { css } from "styled-components";

export const WrrpScrrenManager = styled.div`
  ${props => props.isCard 
    ? css`
      background: #fff;
      border-radius: 10px 10px 0 0;
      border: solid 1px #ccc;
      bottom: 0;
      height: 446px;
      left: 50%;
      position: fixed;
      transform: translateX(-50%);
      width: 375px;
    `    
   : css`
      height: 100%;
   `}
`

export const WrppButtons = styled.div`
  border-bottom: solid 1px #ccc;
  color: #fff;
  height: 48px;
  top: 10px;
  width: 100%;
  button {
    background: none;
    border: none;
    cursor: pointer;
    line-height: 48px;
    margin: 0 5px;
    padding 0 20px;
    width: 40px;
  }
`;

export const WrrpContent = styled.div`
  height: calc(100% - 48px);
  padding-top: 20px;
  position: relative;
  width: 100%;
`
