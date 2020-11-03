import React, { useState, useRef } from 'react';

import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { H4, P, Button } from '~components/Foundation';
import ScreenManager from '..';
import AnimationContainer, { ANIMATIONS_TYPES, SLIDE_TYPES } from '../../AnimationContainer';

const WrrpButtonTest = styled.div`
    button + button {
        margin-left: 10px;
    }
`;

const WrrpFake = styled.div`
    background: var(--colors-white);
    border-radius: 10px 10px 0 0;
    border: solid 1px var(--colors-border-gray);
    bottom: 0;
    height: 446px;
    left: 50%;
    position: fixed;
    transform: translateX(-50%);
    width: 375px;
`;

const WrrpManagerContent = styled.div`
    padding: 1.5rem 1.5rem;
`;

const ExampleContainer = styled.div`
    align-items: center;
    color: var(--colors-black);
    justify-content: center;
    display: flex;
    height: 100%; 
    width: 100%;
`;

const HeaderExample = styled.div`
    align-items: center;
    color: var(--colors-black);
    justify-content: center;
    display: flex;
    left: 0;
    height: 50px; 
    position: fixed: 
    top: 0;
    width: 100%;
`;

const MAX_COUNT = 3;

storiesOf('PS5|Competitive View/ScreenManager')
    .addDecorator(withKnobs)
    .add('Manual manager', () => {
        const [counter, setCounter] = useState(0);

        const screenManagerRef = useRef(null);

        const moveSlideManager = (value) => {
            if (ANIMATIONS_TYPES[value]) {
                if (value === ANIMATIONS_TYPES.NEXT ? counter < MAX_COUNT : counter > 0) {
                    screenManagerRef.current.moveStepRef(value);
                }
            }
        };

        const changeContent = (value) => {
            if (value.typeAnimation === SLIDE_TYPES.EXIT) {
                setCounter(value.slideType === ANIMATIONS_TYPES.NEXT ? counter + 1 : counter - 1);

                screenManagerRef.current.moveStepRef(value.slideType);
            }
        };

        return (
            <WrrpFake>
                <ScreenManager
                    ref={screenManagerRef}
                    onChangeContent={changeContent}
                    isPrevButton={boolean('Disable Prev Button', false)}
                    onPrevButton={moveSlideManager}
                    auto={false}
                >
                    <WrrpManagerContent>
                        <H4>
                            Report Results
                            {' '}
                            {counter}
                        </H4>
                        <P>
                            For this match select the result.
                        </P>
                        <WrrpButtonTest>
                            <Button
                                type="button"
                                onClick={() => moveSlideManager(ANIMATIONS_TYPES.NEXT)}
                                primary
                                inverted
                            >
                                Next slide
                            </Button>
                        </WrrpButtonTest>
                    </WrrpManagerContent>
                </ScreenManager>
            </WrrpFake>
        );
    })
    .add('Automatic manager', () => {
        const [counter, setCounter] = useState(0);

        const screenManagerRef = useRef(null);

        const moveSlideManager = (value) => {
            if (ANIMATIONS_TYPES[value]) {
                if (value === ANIMATIONS_TYPES.NEXT ? counter < MAX_COUNT : counter > 0) {
                    screenManagerRef.current.moveStepRef(value);
                }
            }
        };

        const changeContent = (value) => {
            if (value.typeAnimation === SLIDE_TYPES.EXIT) {
                setCounter(value.slideType === ANIMATIONS_TYPES.NEXT ? counter + 1 : counter - 1);
            }
        };

        return (
            <WrrpFake>
                <ScreenManager
                    ref={screenManagerRef}
                    onChangeContent={changeContent}
                    isPrevButton={boolean('Disable Prev Button', false)}
                    onPrevButton={moveSlideManager}
                >
                    <WrrpManagerContent>
                        <H4>
                            Report Results
                            {' '}
                            {counter}
                        </H4>
                        <P>
                            For this match select the result.
                        </P>
                        <WrrpButtonTest>
                            <Button
                                type="button"
                                onClick={() => moveSlideManager(ANIMATIONS_TYPES.NEXT)}
                                primary
                                inverted
                            >
                                Next slide
                            </Button>
                        </WrrpButtonTest>
                    </WrrpManagerContent>
                </ScreenManager>
            </WrrpFake>
        );
    })
    .add('Automatic animation', () => {
        const animationContainerRef = useRef(null);
        const [first, setFirst] = useState(true);

        const moveAnimation = (value) => {
            animationContainerRef.current.moveStepRef(value);
        };

        const onChangeContent = () => {
            setFirst(!first);
        };

        return (
            <>
                <HeaderExample>
                    <button
                        type="button"
                        onClick={() => moveAnimation(ANIMATIONS_TYPES.NEXT)}
                    >
                        Next
                    </button>
                    <button
                        type="button"
                        onClick={() => moveAnimation(ANIMATIONS_TYPES.PREV)}
                    >
                        Prev
                    </button>
                </HeaderExample>
                <WrrpFake>

                    <AnimationContainer
                        ref={animationContainerRef}
                        onChangeContent={onChangeContent}
                    >
                        <ExampleContainer>
                            {first && <h1>Slide 1</h1>}
                            {!first && <h1>Slide 2</h1>}
                        </ExampleContainer>
                    </AnimationContainer>
                </WrrpFake>
            </>

        );
    })
    .add('Manual animation', () => {
        const animationContainerRef = useRef(null);
        const [first, setFirst] = useState(true);

        const moveAnimation = (value) => {
            animationContainerRef.current.moveStepRef(value);
        };

        const onChangeContent = (value) => {
            setFirst(!first);
            animationContainerRef.current.moveStepRef(value.slideType);
        };

        return (
            <>
                <HeaderExample>
                    <button
                        type="button"
                        onClick={() => moveAnimation(ANIMATIONS_TYPES.NEXT)}
                    >
                        Next
                    </button>
                    <button
                        type="button"
                        onClick={() => moveAnimation(ANIMATIONS_TYPES.PREV)}
                    >
                        Prev
                    </button>
                </HeaderExample>
                <WrrpFake>

                    <AnimationContainer
                        ref={animationContainerRef}
                        auto={false}
                        onChangeContent={onChangeContent}
                    >
                        <ExampleContainer>
                            {first && <h1>Slide 1</h1>}
                            {!first && <h1>Slide 2</h1>}
                        </ExampleContainer>
                    </AnimationContainer>
                </WrrpFake>
            </>

        );
    });

