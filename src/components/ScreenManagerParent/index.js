import React, {useState} from 'react'

import {AnimationContainer} from '../AnimationContainer'

import { WrppButtons, WrrpContent } from "./styles"

export const ScreenManagerParent = () => {

    const [currentManager, setCurrentManager] = useState(null)
    const [counter, setCounter] = useState(0)

    const nextMngrSlide = () => {
        setCurrentManager('next')
    }

    const isFinishedAnimationMngr = () => {
        if (!!currentManager) {
            const counterAdd = currentManager === 'next' ? counter + 1 : counter - 1
            setCurrentManager(null)
            setCounter(counterAdd)
        }
    }

    return (
        <div className="card-container">
          <WrppButtons>
            <button onClick={() => setCurrentManager("prev")}>Prev</button>
          </WrppButtons>
          <WrrpContent>
            <AnimationContainer 
                callbackAnimation={isFinishedAnimationMngr}
                moveAnimation={currentManager}
                widthSlide={360}
            > 
                <div>
                    <h3>
                        Aja esto es una prueba {counter}
                    </h3>
                    <button onClick={nextMngrSlide}>Click</button>
                </div>
            </AnimationContainer>
          </WrrpContent>

        </div>
      );
}



{/* <CompetitiveView>
    <AnimationContainer>
        <Content title isCollapsed>
            <Timeline />
        </Content>
    -------------------------------
        <ScreenManagerParent onExit="() => animate()"> ==> meaning each component: ReportResult, 
            {CHILDREN} ==> implements ScreenManagerAPI
        </ScreenManagerParent>
    </AnimationContainer>
</CompetitiveView> */}