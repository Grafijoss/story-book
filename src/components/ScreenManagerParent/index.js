import React, { useEffect } from 'react'

import {AnimationContainer} from '../AnimationContainer'

import { WrrpScrrenManager, WrppButtons, WrrpContent } from "./styles"

const TYPES_ANIMATIONS = {
    PREV: 'prev',
    NEXT: 'next'
}

export const ScreenManagerParent = ({ children, currentManager, buttonPrevManager, finishAnimation, onExit, isCard }) => {


    useEffect(() => {
        currentManager && !TYPES_ANIMATIONS[currentManager] && onExit()
    }, [currentManager])

    return (
        <WrrpScrrenManager isCard={isCard}>
          <WrppButtons>
            <button onClick={() => buttonPrevManager("PREV")}>Prev</button>
          </WrppButtons>
          <WrrpContent>
            <AnimationContainer 
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
}
