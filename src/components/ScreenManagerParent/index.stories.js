import React, { useState } from 'react'

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {ScreenManagerParent} from ".";

const MAX_COUNT = 3

storiesOf('CompetView|ScreenManagerParent')
    .add('Card', () => {

        const [currentManager, setCurrentManager] = useState(null)
        const [counter, setCounter] = useState(0)

        const moveSlideManager = (value) => {
            if (value === 'NEXT') {
                if (counter < MAX_COUNT) {
                    setCurrentManager(value)     
                }  else {
                    setCurrentManager('RETURN')
                    setCounter(0)
                }
            } else if (value === 'PREV') {
                if (counter > 0) {
                    setCurrentManager(value)      
                }  else {
                    setCurrentManager('RETURN')
                    setCounter(0)
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

        return (
            <ScreenManagerParent 
                currentManager={currentManager}
                buttonPrevManager={moveSlideManager}
                finishAnimation={isFinishedAnimationMngr}
                onExit={action('exit')}
                isCard={true}
            > 
                <div>
                    <h3>
                        Manager {counter}
                    </h3>
                    <button onClick={() => moveSlideManager("NEXT")}>Click</button>
                </div>
            </ScreenManagerParent>
        )
    })

