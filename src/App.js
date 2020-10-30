import React from "react";

import styled, { css } from "styled-components";

import { Machine } from "xstate";
import { useMachine } from "@xstate/react";

// import { CompetitiveView } from "./components/CompetitiveView"

import useUnintegratedMachine from "./hooks/useUnintegratedMachine";

import "./App.css";

import { addMinutes, compareAsc } from "date-fns";
// import compareAsc from 'date-fns/compareAsc'

const Title = styled.h1`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

// const now = Math.floor(new Date() / 1000);

const testAddMinutes = addMinutes(new Date(), 15); // añado 15 minutos
const higherBecomeUTC = testAddMinutes.getTime();

console.log("este es higher");
console.log(higherBecomeUTC);
console.log(testAddMinutes);
console.log(testAddMinutes.toISOString());

const currentDate = new Date();
const currentDateUTC = currentDate.getTime();

console.log("este es current");
console.log(currentDateUTC);
console.log(currentDate);
console.log(currentDate.toISOString());

const compareDates = compareAsc(higherBecomeUTC, currentDateUTC); // (after, before)
console.log("es mayor");
console.log(compareDates);
console.log(!!compareDates);

const now = new Date();

const formatDate = (date) => {
  //   const date = new Date(ms);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours} : ${minutes} : ${seconds}`;
};

const formatUTCDate = (date) => {
  //   const date = new Date(ms);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${hours} : ${minutes} : ${seconds}`;
};

const timeUTC = Math.floor(new Date().getTime() / 1000); // segundos
console.log(timeUTC);

console.log(now);
console.log(formatDate(now));
// console.log(now.getTime());  // milisegundos
console.log(formatUTCDate(now));

function App() {
  // nos retorna el estado de la maquina y el send para metiri eventos dentor de la maquina
  //   const [state, send] = useMachine(unintegratedMachine)
  const { state } = useUnintegratedMachine({
    enabled: true,
  });

  //   console.log("esto es state");
  //   console.log(state.context.counter);
  console.log(state.value);

  return (
    <div className="App">
      <Title>{state.context.counter}</Title>
    </div>
  );
}

export default App;
