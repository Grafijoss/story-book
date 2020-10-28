import React from "react";

import styled, { css } from "styled-components";

import { Machine } from 'xstate';
import { useMachine } from '@xstate/react';

import { CompetitiveView } from "./components/CompetitiveView"

import "./App.css";


const Title = styled.h1`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;


const unintegratedMachine = Machine(
  {
    id: 'Unintegrated Tournaments',
    initial: 'setUp',
    context: {
      user: null,
      featureFlag: null
    },
    states: {
      setUp: {
        initial: 'turnOn',
        states: {
          
          turnOn: {
            on: {
              '' : [
                {
                  target: 'fetchingMatch',
                  cond: 'turnOnMachine',
                },
                {
                  target: 'machineOf',
                  cond: 'turnOfMachine',
                }
              ]
            },
            // finish on
            
          },
          fetchingMatch: {
            // invoke es equivalente al useEfect cuando se llama por primera vez o el componentDidMount
            // invoke: {
              // invoke tambien se conoce como servicio
              // el servicio tiene una fuente
              // la fuente puede ser una funcion que reciba callbacks
              // la fuente puede ser una submaquina
              // la fuente puede ser una promesa
              // la fuente ppuede ser un string
              // src: 'fetch'

            // }
              
          },

          /*

          fetching: {
            invoke: {
              id: "fetchSerializedState",
              src: "fetchSerializedState",
              onDone: {
                target: "processing",
                actions: "saveSerializedLastStoredState",
              },
              onError: "failure",
            },
          },
          processing: {
            entry: "parseSerializedState",
            on: {
              "": "restoring",
            },
          },
          failure: {
            on: {
              RETRY: "fetching",
            },
          },
          restoring: {
            entry: send("PROCESSED_LAST_STORED_STATE"),
          },

          */
            
          machineOf: {
              
          }
          
        // setUp states  
        }
        
      },
      before: {

      },
      during: {

      },
      after: {

      }
    }
    // main states
  }, 
  {
    guards: {
      turnOnMachine: (context, event) =>  {
        return context.featureFlag && context.user
      },
      turnOfMachine: (context, event) =>  {
        return !context.featureFlag || !context.user
      },
    }
  }
);


function App() {

  // nos retorna el estado de la maquina y el send para metiri eventos dentor de la maquina
  const [state, send] = useMachine(unintegratedMachine)

  return (
    <div className="App">
      {/* {state.value !== 'machineOf' &&  <CompetitiveView />} */}
      {state.value !== 'machineOf' &&  <Title>
        {state.value }
      </Title>}
      {state.value === 'machineOf' &&  <Title>
        No se puede cargar el Competitive view {state.value}
      </Title>}
    </div>
  );
}

export default App;
