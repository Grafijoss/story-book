import React, {useState, useRef} from 'react'
import { CompetView } from "../CompetView";
import { AnimationContainer } from "../AnimationContainer";
import { ScreenManagerParent } from '../ScreenManagerParent'

import { Header } from "./styles";

import { useMachine } from '@xstate/react';
import { toggleMachine } from '../../stateMachines/toogleMachine';





const MAX_COUNT = 3
const COMPETITION_VIEWS = {
    TIMELINE: 'CompetView',
    SCREEN_MANAGER: "ScreenManagerParent"
}
const TYPES_ANIMATIONS = {
    PREV: 'PREV',
    NEXT: 'NEXT'
}
const SLIDE_TYPES = {
    ENTER: 'ENTER',
    EXIT: 'EXIT'
  }

export const CompetitiveView = () => {

    const [currenSlide, setCurrenSlide] = useState(null)
    const [currenView, setCurrenView] = useState(COMPETITION_VIEWS.TIMELINE)

    // manager

    // const [currentManager, setCurrentManager] = useState(null)
    const [counter, setCounter] = useState(0)


    const moveSlideManager = (value) => {
        if(!!TYPES_ANIMATIONS[value]) {
            if (value === TYPES_ANIMATIONS.NEXT ?  counter < MAX_COUNT : counter > 0) screenManagerParentRef.current.refMoveStep(value)
            if (value === TYPES_ANIMATIONS.PREV && counter === 0)  changeView(TYPES_ANIMATIONS.PREV)
        }
    }

    const isFinishedAnimationMngr = (value) => {
        console.log('final manager')
        if (value.typeAnimation === SLIDE_TYPES.EXIT) {
            setCounter(value.slideType === TYPES_ANIMATIONS.NEXT ? counter + 1 : counter - 1)

            screenManagerParentRef.current.refMoveStep(value.slideType)
        }
    }

    // manager

    // compet view

    const isFinishedAnimationView = (value) => {
        setCurrenSlide(null)
        if (value.typeAnimation === SLIDE_TYPES.EXIT) {
            setCurrenView(currenView === COMPETITION_VIEWS.TIMELINE ? COMPETITION_VIEWS.SCREEN_MANAGER : COMPETITION_VIEWS.TIMELINE )
            animationContainerRef.current.refMoveStep(value.slideType)
            
        }
    }

    const changeView = (view) => {
        if (view !== currenView) {
            // setCurrenSlide(view === COMPETITION_VIEWS.TIMELINE ? TYPES_ANIMATIONS.PREV : TYPES_ANIMATIONS.NEXT )
            animationContainerRef.current.refMoveStep(view === COMPETITION_VIEWS.TIMELINE ? TYPES_ANIMATIONS.PREV : TYPES_ANIMATIONS.NEXT)
        }
    }

    // compet view

    //state machine
    const [current, send] = useMachine(toggleMachine);
    //state machine


    const animationContainerRef = useRef(null);
    const screenManagerParentRef = useRef(null);


    return (
        <>
            <Header>
                <button onClick={() => 
                    changeView(COMPETITION_VIEWS.SCREEN_MANAGER)}
                >ScreenManagerParent</button>
                <button onClick={() => 
                    send('TOGGLE')}
                >Toogle</button>
                <h3>{current.matches('inactive') ? 'inactive' : 'active'}</h3>
            </Header>

            <div className="card-container">
                <AnimationContainer 
                    ref={animationContainerRef}
                    auto={false}
                    callbackAnimation={isFinishedAnimationView}
                    moveAnimation={currenSlide}
                    heightSlide={500}
                    widthSlide={375}
                > 
                    {currenView === COMPETITION_VIEWS.TIMELINE && <CompetView />}
                    {currenView === COMPETITION_VIEWS.SCREEN_MANAGER && (
                        <ScreenManagerParent 
                            ref={screenManagerParentRef}
                            // currentManager={currentManager}
                            buttonPrevManager={moveSlideManager}
                            finishAnimation={isFinishedAnimationMngr}
                            disableButtonPrevManager={false}
                        > 
                            <div>
                                <h3>
                                    Manager {counter}
                                </h3>
                                <button onClick={() => moveSlideManager(TYPES_ANIMATIONS.NEXT )}>Click</button>
                                {/* <button onClick={() => screenManagerParentRef.current.refMoveStep(TYPES_ANIMATIONS.NEXT )}>Click</button> */}
                                {/* <button onClick={() => inputRef.current.getAlert()}>Click</button> */}
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