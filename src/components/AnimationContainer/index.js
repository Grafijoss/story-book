import React, {
  useImperativeHandle, forwardRef, useState,
} from 'react';
import { SliderContainer, Slide } from './StyledComponents';


export const SLIDE_TYPES = {
  ENTER: 'ENTER',
  EXIT: 'EXIT',
};

export const ANIMATIONS_TYPES = {
  PREV: 'PREV',
  NEXT: 'NEXT',
};

const AnimationContainer = forwardRef(({
  children,
  onChangeContent,
  slideHeight,
  auto = true,
}, ref) => {
  const [isAnimation, setIsAnimation] = useState(false);
  const [stepSlide, setStepSlide] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [finishSlide, setfinishSlide] = useState('enter');


  const moveStep = (value) => {
      if (!isAnimation && !!ANIMATIONS_TYPES[value]) {
          if (finishSlide === 'exit') {
              setfinishSlide('enter');
              setStepSlide('enter');
          } else {
              setIsAnimation(true);
              setCurrentSlide(value);
              setfinishSlide('exit');
              setStepSlide('exit');
          }
      }

      setIsAnimation(false);
      if (finishSlide === 'enter') {
          setTimeout(() => {
              onChangeContent({ typeAnimation: SLIDE_TYPES.EXIT, slideType: value });
              if (auto) ref.current.moveStepRef(value);
          }, 600);
      }
  };


  useImperativeHandle(ref, () => ({
      moveStepRef(value) {
          moveStep(value);
      },
  }));


  return (
      <SliderContainer>
          <Slide
              slideHeight={slideHeight}
              animationSide={currentSlide}
              animationType={stepSlide}
          >
              { children }
          </Slide>
      </SliderContainer>
  );
});


export default AnimationContainer;
