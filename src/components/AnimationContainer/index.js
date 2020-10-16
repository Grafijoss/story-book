import React, { useEffect, useState } from "react";
import { WrrpSlider, Slide } from "./styles";

export const AnimationContainer = ({ children, callbackAnimation, moveAnimation, widthSlide, heightSlide}) => {
  const [isAnimation, setIsAnimation] = useState(false);
  const [stepSlide, setStepSlide] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [finishSlide, setfinishSlide] = useState("enter");
  const $step = document.querySelector(Slide);

  const TYPES_ANIMATIONS = {
    PREV: 'prev',
    NEXT: 'next'
  }

  useEffect(() => {
    $step && $step.addEventListener("animationend", animation);
  });

  useEffect(() => {
    !!moveAnimation && moveStep(moveAnimation)
  }, [moveAnimation])

  const animation = () => {
    $step.removeEventListener("animationend", animation);
    if (finishSlide === "exit") {
      setfinishSlide("enter");
      setStepSlide("enter");
    } else {
      setIsAnimation(false); // complete animation ends
      callbackAnimation()
    }
  };

  const moveStep = (value) => {
    if (!isAnimation && !!TYPES_ANIMATIONS[value]) {
      setIsAnimation(true);
      setCurrentSlide(value);
      setfinishSlide("exit");
      setStepSlide("exit");
    }
  };

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
};
