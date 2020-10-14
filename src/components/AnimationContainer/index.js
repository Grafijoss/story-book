import React, { useEffect, useState } from "react";
import { WrrpSlider, Slide, WrppButtons } from "./style";

export const AnimationContainer = ({ children, callbackAnimation, moveAnimation, widthSlide }) => {
  const [isAnimation, setIsAnimation] = useState(false);
  const [stepSlide, setStepSlide] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [finishSlide, setfinishSlide] = useState("enter");
  const $step1 = document.querySelector(Slide);


  useEffect(() => {
    $step1 && $step1.addEventListener("animationend", animation);
  });

  useEffect(() => {
    if (!!moveAnimation) {
      moveStep(moveAnimation)
    }
  }, [moveAnimation])

  const animation = () => {
    $step1.removeEventListener("animationend", animation);
    if (finishSlide === "exit") {
      setfinishSlide("enter");
      setStepSlide("enter");
    } else {
      setIsAnimation(false); // the complete animation finished
      callbackAnimation(finishSlide)
    }
  };

  const moveStep = (value) => {
    if (!isAnimation) {
      setIsAnimation(true);
      setCurrentSlide(value);
      setfinishSlide("exit");
      setStepSlide("exit");
    }
  };

  return (
    <div className="card-container">
      <h1>Manager View</h1>
      <WrppButtons>
        <button onClick={() => moveStep("prev")}>Prev</button>
      </WrppButtons>
      <WrrpSlider>
        <Slide typeAnimation={stepSlide} widthSlide={widthSlide} sideAnimaiton={currentSlide}>
          { children }
        </Slide>
      </WrrpSlider>
    </div>
  );
};


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
