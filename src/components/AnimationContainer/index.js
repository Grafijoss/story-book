import React, { useEffect, useState } from "react";
import { WrrpSlider, Slide } from "./styles";

const ANIMATION_TYPES = {
  PREV: 'PREV',
  NEXT: 'NEXT'
}

const SLIDE_TYPES = {
  ENTER: 'ENTER',
  EXIT: 'EXIT'
}

export const AnimationContainer = ({ children, callbackAnimation, moveAnimation, widthSlide, heightSlide}) => {
  const [isAnimation, setIsAnimation] = useState(false);
  const [typeAnimation, setTypeAnimation] = useState(SLIDE_TYPES.EXIT);
  const [leftSlide, setLeftSlide] = useState({
    heightSlide,
    left: 50,
    opacity: 1,
    widthSlide
  })
  // const $step = document.querySelector(Slide);

  

  // useEffect(() => {
  //   $step && $step.addEventListener("animationend", animation);
  // });

  useEffect(() => {

    const styles = {
      heightSlide,
      widthSlide
    }

    if(!!moveAnimation) {
      if (typeAnimation === SLIDE_TYPES.ENTER) {

        console.log('entrada')

        console.log('es de entrada')
        console.log(moveAnimation)
        console.log()

        const left = moveAnimation === ANIMATION_TYPES.NEXT ? 0 : 100;
        const opacity = 0;
        const transition = 'all 0s ease';

        setLeftSlide({...styles, left, opacity, transition})

      }  
      setTimeout(() => moveStep(moveAnimation), typeAnimation === SLIDE_TYPES.ENTER ? 200 : 0)
    }
    

  }, [moveAnimation])

  const moveStep = (value) => {

    setIsAnimation(true);

    const styles = {
      heightSlide,
      widthSlide
    }

    let left = 50;
    let opacity = 1; 

    if (!isAnimation && !!ANIMATION_TYPES[value]) {

      console.log('ENTRA AQUIRRR')
      console.log(value)
      console.log(typeAnimation)
      
      if (value === ANIMATION_TYPES.NEXT) {
        console.log('entra next')
        console.log(typeAnimation)
        left = typeAnimation === SLIDE_TYPES.ENTER ? 50 : 100;
        opacity = typeAnimation === SLIDE_TYPES.ENTER ? 1 : 0;
      }

      if (value === ANIMATION_TYPES.PREV ) {
        console.log('entra prev')
        left = typeAnimation === SLIDE_TYPES.ENTER ? 50 : 0;
        opacity = typeAnimation === SLIDE_TYPES.ENTER ? 1 : 0;
      }

      setLeftSlide({...styles, left, opacity, transition: 'all 0.5s ease'})
  
      setTimeout(() => {
        callbackAnimation({typeAnimation, slideType: value})
        setTypeAnimation(typeAnimation === SLIDE_TYPES.ENTER ? SLIDE_TYPES.EXIT : SLIDE_TYPES.ENTER)
        setIsAnimation(false);
      }, 500)
    }


    // switch () {

    // }
  }



  // const animation = () => {
  //   $step.removeEventListener("animationend", animation);
  //   if (finishSlide === "exit") {
  //     setfinishSlide("enter");
  //     setStepSlide("enter");
  //   } else {
  //     setIsAnimation(false); // complete animation ends
  //     callbackAnimation()
  //   }
  // };

  // const moveStep = (value) => {
  //   if (!isAnimation && !!TYPES_ANIMATIONS[value]) {
  //     setIsAnimation(true);
  //     setCurrentSlide(value);
  //     setfinishSlide("exit");
  //     setStepSlide("exit");
  //   }
  // };

  return (
    <>
      <WrrpSlider>
        <Slide
          {...leftSlide}
        >
          { children }
        </Slide>
      </WrrpSlider>
    </>
  );
};
