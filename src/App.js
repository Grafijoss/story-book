import React, { useEffect, useState } from "react";

import { CompetView } from "./components/CompetView";
import { ManagerView } from "./components/ManagerView";

import { Slide, Header } from "./styles/style";

import "./App.css";

function App() {
  const [isAnimation, setIsAnimation] = useState(false);
  const [wrr1, setWrr1] = useState({ type: null, initial: true });
  const [wrr2, setWrr2] = useState({ type: null, initial: false });
  const [currentSlide, setCurrentSlide] = useState("wrpp1");

  useEffect(function () {
    const $wrpp1 = document.getElementById("wrpp1");
    $wrpp1.addEventListener("animationend", (event) => {
      const nextSlide = currentSlide === "wrpp1" ? "wrpp2" : "wrpp1";
      setCurrentSlide(nextSlide);
      setIsAnimation(false);
    });
  });

  const moveSlide = (value) => {
    if (!isAnimation) {
      setIsAnimation(true);
      if (value === "prev") {
        setWrr1({
          type: currentSlide === "wrpp1" ? "exitLeft" : "enterRight",
          initial: false,
        });
        setWrr2({
          type: currentSlide === "wrpp2" ? "exitLeft" : "enterRight",
          initial: false,
        });
      } else {
        setWrr1({
          type: currentSlide === "wrpp1" ? "exitRight" : "enterLeft",
          initial: false,
        });
        setWrr2({
          type: currentSlide === "wrpp2" ? "exitRight" : "enterLeft",
          initial: false,
        });
      }
    }
  };

  return (
    <div className="App">
      <Header>
        <button onClick={() => moveSlide("prev")}>CompetView</button>
        <button onClick={() => moveSlide("next")}>ManagerView</button>
      </Header>

      <Slide id="wrpp1" typeAnimation={wrr1}>
        <CompetView />
      </Slide>
      <Slide id="wrpp2" typeAnimation={wrr2}>
        <ManagerView prevSlide={moveSlide} />
      </Slide>
    </div>
  );
}

export default App;
