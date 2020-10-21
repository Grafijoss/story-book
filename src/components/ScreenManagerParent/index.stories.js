import React, { useState } from 'react'

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from '@storybook/addon-knobs'
import {ScreenManagerParent} from ".";

const MAX_COUNT = 3
const TYPES_ANIMATIONS = {
    PREV: 'PREV',
    NEXT: 'NEXT'
}

storiesOf('CompetView|ScreenManagerParent')
    .addDecorator(withKnobs)
    .add('Default', () => {

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

        return (
            <ScreenManagerParent 
                currentManager={currentManager}
                buttonPrevManager={moveSlideManager}
                finishAnimation={isFinishedAnimationMngr}
                onExit={action('return timeline')}
                isCard={boolean('isCard', true)}
                disableButtonPrevManager={boolean('disableButtonPrev', false)}
            > 
                <div>
                    <h3>
                        Manager {counter}
                    </h3>
                    <button onClick={() => moveSlideManager(TYPES_ANIMATIONS.NEXT )}>Click</button>
                </div>
            </ScreenManagerParent>
        )
    })

