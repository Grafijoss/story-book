import React, { useEffect, useState } from "react";
import { WrrpSlider, Slide } from "./styles";

export const AnimationContainer = ({ children, callbackAnimation, moveAnimation, widthSlide }) => {
  const [isAnimation, setIsAnimation] = useState(false);
  // const [stepSlide, setStepSlide] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [finishSlide, setfinishSlide] = useState("enter");
  const $step = document.querySelector(Slide);


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
      // setStepSlide("enter");
    } else {
      setIsAnimation(false); // complete animation ends
      callbackAnimation()
    }
  };

  const moveStep = (value) => {
    if (!isAnimation) {
      setIsAnimation(true);
      setCurrentSlide(value);
      setfinishSlide("exit");
      // setStepSlide("exit");
    }
  };

  return (
    <>
      <WrrpSlider>
        <Slide 
          typeAnimation={finishSlide} 
          widthSlide={widthSlide} 
          sideAnimaiton={currentSlide}
        >
          { children }
        </Slide>
      </WrrpSlider>
    </>
  );
};
