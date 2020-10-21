import React, {useState} from 'react'
import { CompetView } from "../CompetView";
import { AnimationContainer } from "../AnimationContainer";
import { ScreenManagerParent } from '../ScreenManagerParent'

import { Header } from "./styles";

const MAX_COUNT = 3
const COMPETITION_VIEWS = {
    TIMELINE: 'CompetView',
    SCREEN_MANAGER: "ScreenManagerParent"
}
const TYPES_ANIMATIONS = {
    PREV: 'PREV',
    NEXT: 'NEXT'
}

export const CompetitiveView = () => {

    const [currenSlide, setCurrenSlide] = useState(null)
    const [currenView, setCurrenView] = useState(COMPETITION_VIEWS.TIMELINE)
    const [currenNextView, setCurrenNextView] = useState(COMPETITION_VIEWS.TIMELINE)

    // manager

    const [currentManager, setCurrentManager] = useState(null)
    const [counter, setCounter] = useState(0)


    const moveSlideManager = (value) => {
        if(!!TYPES_ANIMATIONS[value]) {
            if (value === TYPES_ANIMATIONS.NEXT ?  counter < MAX_COUNT : counter > 0) setCurrentManager(value) 
            else {
                setCurrentManager('RETURN')
                setCounter(0)
            }
        }
    }

    const isFinishedAnimationMngr = () => {
        if (!!currentManager) {
            setCurrentManager(null)
            setCounter(currentManager === TYPES_ANIMATIONS.NEXT ? counter + 1 : counter - 1)
        }
    }

    // manager

    // compet view

    const isFinishedAnimationView = () => {
        if (!!currenSlide) {
            setCurrenView(currenNextView)
            setCurrenSlide(null)
        }
    }

    const changeView = (view) => {
        if (view !== currenView) {
            setCurrenSlide(view === COMPETITION_VIEWS.TIMELINE ? TYPES_ANIMATIONS.PREV : TYPES_ANIMATIONS.NEXT )
            setCurrenNextView(view)
        }
    }

    // compet view

    return (
        <>
            <Header>
                <button onClick={() => changeView(COMPETITION_VIEWS.SCREEN_MANAGER)}>ScreenManagerParent</button>
            </Header>

            <div className="card-container">
                <AnimationContainer 
                    callbackAnimation={isFinishedAnimationView}
                    moveAnimation={currenSlide}
                    widthSlide={375}
                > 
                    {currenView === COMPETITION_VIEWS.TIMELINE && <CompetView />}
                    {currenView === COMPETITION_VIEWS.SCREEN_MANAGER && (
                        <ScreenManagerParent 
                            currentManager={currentManager}
                            buttonPrevManager={moveSlideManager}
                            finishAnimation={isFinishedAnimationMngr}
                            onExit={() => changeView(COMPETITION_VIEWS.TIMELINE)}
                            disableButtonPrevManager={true}
                        > 
                            <div>
                                <h3>
                                    Manager {counter}
                                </h3>
                                <button onClick={() => moveSlideManager(TYPES_ANIMATIONS.NEXT)}>Click</button>
                            </div>
                        </ScreenManagerParent>
                    )}
                </AnimationContainer>
            </div>
        </>
    )
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