import React from "react";

import styled, { css } from "styled-components";

import { Machine } from "xstate";
import { useMachine } from "@xstate/react";

// import { CompetitiveView } from "./components/CompetitiveView"

import useUnintegratedMachine from "./hooks/useUnintegratedMachine";

import "./App.css";

const Title = styled.h1`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

function App() {
  // nos retorna el estado de la maquina y el send para metiri eventos dentor de la maquina
  //   const [state, send] = useMachine(unintegratedMachine)
  const { state } = useUnintegratedMachine({
    enabled: true,
  });

  console.log("esto es state");
  console.log(state.context.counter);
  console.log(state.value);

  return (
    <div className="App">
      <Title>{state.context.counter}</Title>
    </div>
  );
}

export default App;
