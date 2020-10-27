import React, { useImperativeHandle, forwardRef, useRef, useEffect } from 'react'

import {AnimationContainer} from '../AnimationContainer'

import { WrrpScrrenManager, WrppButtons, WrrpContent } from "./styles"

const TYPES_ANIMATIONS = {
    PREV: 'PREV',
    NEXT: 'NEXT'
}

export const ScreenManagerParent = forwardRef(({ children, currentManager, buttonPrevManager, disableButtonPrevManager = false, finishAnimation,  isCard }, ref) => {
  const animationContainerRef = useRef(null);


  useImperativeHandle(ref, () => ({

    refMoveStep(value) {
      animationContainerRef.current.refMoveStep(value)
    }
  
  }));

    return (
        <WrrpScrrenManager isCard={isCard}>
          <WrppButtons>
            <button
              disabled={!!disableButtonPrevManager}
              onClick={() => buttonPrevManager(TYPES_ANIMATIONS.PREV)}
            >
              Prev
            </button>
          </WrppButtons>
          <WrrpContent>
            <AnimationContainer 
              ref={animationContainerRef}
                callbackAnimation={finishAnimation}
                moveAnimation={currentManager}
                heightSlide={500}
                widthSlide={350}
            > 
                { children }
            </AnimationContainer>
          </WrrpContent>
        </WrrpScrrenManager>
      );
})
