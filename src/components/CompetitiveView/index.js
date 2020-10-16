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

export const CompetitiveView = () => {

    const [currenSlide, setCurrenSlide] = useState(null)
    const [currenView, setCurrenView] = useState(COMPETITION_VIEWS.TIMELINE)
    const [currenNextView, setCurrenNextView] = useState(COMPETITION_VIEWS.TIMELINE)

    // manager

    const [currentManager, setCurrentManager] = useState(null)
    const [counter, setCounter] = useState(0)

    const moveSlideManager = (value) => {
        if (value === 'NEXT') {
            if (counter < MAX_COUNT) {
                setCurrentManager(value)     
            }  else {
                setCurrentManager('RETURN')
                setCounter(0)
                // changeView(COMPETITION_VIEWS.TIMELINE)
            }
        } else if (value === 'PREV') {
            if (counter > 0) {
                setCurrentManager(value)      
            }  else {
                setCurrentManager('RETURN')
                setCounter(0)
                // changeView(COMPETITION_VIEWS.TIMELINE)
            }
        }
    }

    const isFinishedAnimationMngr = () => {
        if (!!currentManager) {
            setCurrentManager(null)
            const counterAdd = currentManager === 'NEXT' ? counter + 1 : counter - 1
            setCounter(counterAdd)
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
            if (view === COMPETITION_VIEWS.TIMELINE) {
                setCurrenSlide("PREV")
            } else {
                setCurrenSlide("NEXT")
            }
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
                        > 
                            <div>
                                <h3>
                                    Manager {counter}
                                </h3>
                                <button onClick={() => moveSlideManager("NEXT")}>Click</button>
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