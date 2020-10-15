import React, {useState} from 'react'
import { CompetView } from "../CompetView";
import { AnimationContainer } from "../AnimationContainer";
import { ScreenManagerParent } from '../ScreenManagerParent'

import { Header } from "./styles";

export const CompetitiveView = () => {

    const [currenSlide, setCurrenSlide] = useState(null)
    const [currenView, setCurrenView] = useState('CompetView')
    const [currenNextView, setCurrenNextView] = useState('CompetView')

    const isFinishedAnimationMngr = () => {
        if (!!currenSlide) {
            setCurrenView(currenNextView)
            setCurrenSlide(null)
        }
    }

    const changeView = (view) => {
        if (view !== currenView) {
            if (view === 'CompetView') {
                setCurrenSlide("prev")
            } else {
                setCurrenSlide("next")
            }
            setCurrenNextView(view)
        }
    }

    return (
        <>
            <Header>
                {/* <button onClick={() => changeView("CompetView")}>CompetView</button> */}
                <button onClick={() => changeView("ScreenManagerParent")}>ScreenManagerParent</button>
            </Header>

            <div className="card-container">
                <AnimationContainer 
                    callbackAnimation={isFinishedAnimationMngr}
                    moveAnimation={currenSlide}
                    widthSlide={400}
                > 
                    {currenView === 'CompetView' && <CompetView />}
                    {currenView === 'ScreenManagerParent' && <ScreenManagerParent onExit={changeView} /> }
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