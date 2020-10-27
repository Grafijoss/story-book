import React, { useImperativeHandle, forwardRef, useEffect, useState } from "react";
import { WrrpSlider, Slide } from "./styles";

export const AnimationContainer = forwardRef(({ children, callbackAnimation, moveAnimation, widthSlide, heightSlide, auto}, ref) => {
  const [isAnimation, setIsAnimation] = useState(false);
  const [stepSlide, setStepSlide] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [finishSlide, setfinishSlide] = useState("enter");
  // const $step = document.querySelector(Slide);

  const TYPES_ANIMATIONS = {
    PREV: 'PREV',
    NEXT: 'NEXT'
  }
  const SLIDE_TYPES = {
    ENTER: 'ENTER',
    EXIT: 'EXIT'
  }

  // useEffect(() => {
    // $step && $step.addEventListener("animationend", animation);
  // });

  // useEffect(() => {
  //   !!moveAnimation && moveStep(moveAnimation)
  // }, [moveAnimation])

  // const animation = (value) => {

  //   console.log('aquii animacion end')

  //   // $step.removeEventListener("animationend", animation);
  //   if (finishSlide === "exit") {
  //     setfinishSlide("enter");
  //     setStepSlide("enter");
  //   } else {
  //     setIsAnimation(false); // complete animation ends
  //     callbackAnimation({typeAnimation: finishSlide, slideType: value})
  //   }
  // };

  const moveStep = (value) => {

    console.log(finishSlide)

    if (!isAnimation && !!TYPES_ANIMATIONS[value]) {
      
      if (finishSlide === "exit") {
        setfinishSlide("enter");
        setStepSlide("enter");
      } else {
        setIsAnimation(true);
        setCurrentSlide(value);
        setfinishSlide("exit");
        setStepSlide("exit");
      }


    }

    setIsAnimation(false);
    if (finishSlide === "enter") {
      setTimeout(() => {
        callbackAnimation({typeAnimation: SLIDE_TYPES.EXIT , slideType: value})
        auto && ref.current.refMoveStep(value)
      }, 600) 
    }

  };

  useImperativeHandle(ref, () => ({

    refMoveStep(value) {
      moveStep(value)
    }

  }));

  return (
    <>
      <WrrpSlider>
        <Slide 
          heightSlide={heightSlide}
          sideAnimaiton={currentSlide}
          typeAnimation={stepSlide} 
          widthSlide={widthSlide} 
        >
          { children }
        </Slide>
      </WrrpSlider>
    </>
  );
});
