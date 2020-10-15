import React, {useState} from 'react'

import {AnimationContainer} from '../AnimationContainer'

import { WrppButtons, WrrpContent } from "./styles"

const MAX_COUNT = 5

export const ScreenManagerParent = ({ onExit }) => {

    const [currentManager, setCurrentManager] = useState(null)
    const [counter, setCounter] = useState(0)

    const moveSlide = (value) => {
        if (value === 'next') {
            if (counter < MAX_COUNT) {
                setCurrentManager(value)     
            }  else {
                setCounter(0)
                onExit('CompetView')
            }
        } else {
            if (counter > 0) {
                setCurrentManager(value)      
            }  else {
                setCounter(0)
                onExit('CompetView')
            }
        } 
    }

    const isFinishedAnimationMngr = () => {
        if (!!currentManager) {
            setCurrentManager(null)
            const counterAdd = currentManager === 'next' ? counter + 1 : counter - 1
            setCounter(counterAdd)
        }
    }

    return (
        <>
          <WrppButtons>
            <button onClick={() => moveSlide("prev")}>Prev</button>
          </WrppButtons>
          <WrrpContent>
            <AnimationContainer 
                callbackAnimation={isFinishedAnimationMngr}
                moveAnimation={currentManager}
                heightSlide={500}
                widthSlide={360}
            > 
                <div>
                    <h3>
                        Manager {counter}
                    </h3>
                    <button onClick={() => moveSlide("next")}>Click</button>
                </div>
            </AnimationContainer>
          </WrrpContent>

        </>
      );
}
