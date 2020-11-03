import React, { useImperativeHandle, forwardRef, useRef } from 'react';

import AnimationContainer, { ANIMATIONS_TYPES } from '../AnimationContainer';

import {
    ButtonsContainer, Content, ScreenManagerContainer, BackButton,
} from './StyledComponents';


const ScreenManager = forwardRef(({
    children,
    onChangeContent,
    isPrevButton = false,
    onPrevButton,
    auto,
}, ref) => {
    const animationContainerRef = useRef(null);

    useImperativeHandle(ref, () => ({

        moveStepRef(value) {
            animationContainerRef.current.moveStepRef(value);
        },

    }));

    return (
        <ScreenManagerContainer>
            <ButtonsContainer>
                <BackButton
                    type="button"
                    disabled={!!isPrevButton}
                    onClick={() => onPrevButton(ANIMATIONS_TYPES.PREV)}
                    data-testid="prev-button"
                >
                   Return
                </BackButton>
            </ButtonsContainer>
            <Content>
                <AnimationContainer
                    ref={animationContainerRef}
                    auto={auto}
                    onChangeContent={onChangeContent}
                    slideHeight={390}
                >
                    <ScreenManagerContainer>
                        { children }
                    </ScreenManagerContainer>
                </AnimationContainer>
            </Content>
        </ScreenManagerContainer>
    );
});

export default ScreenManager;
