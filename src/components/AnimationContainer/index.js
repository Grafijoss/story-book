import React, { useImperativeHandle, forwardRef, useEffect, useState } from "react";
import { WrrpSlider, Slide } from "./styles";

const ANIMATION_TYPES = {
  PREV: 'PREV',
  NEXT: 'NEXT'
}

const SLIDE_TYPES = {
  ENTER: 'ENTER',
  EXIT: 'EXIT'
}

export const AnimationContainer = forwardRef(({ children, callbackAnimation, moveAnimation, widthSlide, heightSlide}, ref) => {
  const [isAnimation, setIsAnimation] = useState(false);
  const [typeAnimation, setTypeAnimation] = useState(SLIDE_TYPES.EXIT);
  const [leftSlide, setLeftSlide] = useState({
    heightSlide,
    left: 50,
    opacity: 1,
    widthSlide
  })

  useImperativeHandle(ref, () => ({

    getAlert() {
      alert("getAlert from Child");
    }

  }));

  useEffect(() => {

    const styles = {
      heightSlide,
      widthSlide
    }

    if(!!moveAnimation) {
      if (typeAnimation === SLIDE_TYPES.ENTER) {
        const left = moveAnimation === ANIMATION_TYPES.NEXT ? 0 : 100;
        setLeftSlide({...styles, left, opacity: 0, transition: 'all 0s ease'})

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

      if (value === ANIMATION_TYPES.NEXT) {
        left = typeAnimation === SLIDE_TYPES.ENTER ? 50 : 100;
        opacity = typeAnimation === SLIDE_TYPES.ENTER ? 1 : 0;
      }

      if (value === ANIMATION_TYPES.PREV ) {
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

  }

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
});
