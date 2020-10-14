import React, { useEffect, useState } from "react";
import { WrrpSlider, Slide, WrppButtons } from "./style";

export const ManagerSteps = ({ children, mngrCallback, moveMngr }) => {
  const [isAnimation, setIsAnimation] = useState(false);
  const [stepSlide, setStepSlide] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [finishSlide, setfinishSlide] = useState("enter");
  const [indexStep, setIndexStep] = useState(1);
  const $step1 = document.getElementById("step1");

  

  const animation = () => {
    $step1.removeEventListener("animationend", animation);
    if (finishSlide === "exit") {
      setfinishSlide("enter");
      if (currentSlide === "prev") {
        indexStep > 1 && setIndexStep(indexStep - 1);
        setStepSlide("enterRight");
      } else {
        setIndexStep(indexStep + 1);
        setStepSlide("enterLeft");
      }
    } else {
      setIsAnimation(false); // the complete animation finished
      mngrCallback()
    }
  };

  const moveStep = (value) => {
    if (!isAnimation) {
      setIsAnimation(true);
      setCurrentSlide(value);
      setfinishSlide("exit");
      if (value === "prev") {
        if (indexStep > 1) {
          setStepSlide("exitLeft");
        } else {
          setIsAnimation(false);
          setfinishSlide("enter");
          // mngrCallback("prev"); // function that returns to competview
        }
      } else {
        setStepSlide("exitRight");
      }
    }
  };

  useEffect(() => {
    $step1 && $step1.addEventListener("animationend", animation);
  });

  useEffect(() => {
    !!moveMngr && moveStep(moveMngr)
  }, [moveMngr])

  return (
    <div className="card-container">
      <h1>Manager View</h1>
      <WrppButtons>
        <button onClick={() => moveStep("prev")}>Prev</button>
        {indexStep < 3 && (
          <button onClick={() => moveStep("next")}>Next</button>
        )}
      </WrppButtons>
      <WrrpSlider>
        <Slide id="step1" typeAnimation={stepSlide}>
          { children }
          {/* {indexStep === 2 && <Step2 />}
          {indexStep === 3 && <Step3 />} */}
        </Slide>
      </WrrpSlider>
    </div>
  );
};
