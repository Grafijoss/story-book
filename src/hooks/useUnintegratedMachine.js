import { useEffect, useMemo, useCallback } from "react";

import { createMachine, assign, send } from "xstate";
import { useMachine } from "@xstate/react";

const fetchCheckedTournament = async (context) => {
  console.log("entraaa aqui");
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    headers: { Accept: "application/json" },
  });

  console.log("fetchCheckedTournament inside");

  return response.json();
};

const createUnintegratedMachine = (opts) => {
  const initialState = !opts.enabled ? "disabled" : "setUp";

  console.log("esto es opts");
  console.log(!opts.enabled);

  console.log(initialState);

  const machine = createMachine(
    {
      id: "Unintegrated Tournaments",
      initial: initialState,
      context: {
        interval: 10000, // beep every second
        isPolling: false,
        counter: 0,
      },
      states: {
        disabled: {
          type: "final",
        },
        setUp: {
          on: {
            PROCESSED_LAST_STORED_STATE: [{ target: "before" }],
          },
          entry: send("PROCESSED_LAST_STORED_STATE"),
        },
        before: {
          on: {
            USER_CHECKED_IN: {
              // estado al que quiero llegar
              target: "polling",
              // condicion
              // cond: "validInterval",
              // accion que cambia el estado de poolling a true
              actions: "setPollingOn",
            },
          },
          entry: send("USER_CHECKED_IN"),
        },
        polling: {
          // invoca el servicio apenas llega al estado
          invoke: {
            id: "fetchCheckedTournament",
            // get es el endpoint del serivio o el metodo que vamos allamar
            src: "fetchCheckedTournament",
            // cuando la respuesta es correcta
            onDone: {
              target: "waiting",
              actions: "setCounter",
            },
          },
        },
        waiting: {
          after: {
            POLL_DELAY: [
              {
                target: "polling",
                cond: "ifIsLessThanFive",
              },
              {
                target: "during",
              },
            ],
          },
        },
        during: {},
        after: {},
      },
    },
    // main states
    {
      guards: {
        ifIsLessThanFive: (context) => context.counter <= 5,
      },
      delays: {
        POLL_DELAY: (context) => context.interval,
      },
      services: {
        fetchCheckedTournament,
      },
      actions: {
        setPollingOn: assign({ isPolling: (_) => true }),
        setCounter: assign({
          counter: (context, e) => {
            console.log("pero si funciona");
            console.log(e);
            return context.counter + 1;
          },
        }),
      },
    }
    // main states
  );

  return machine;
};

const useUnintegratedMachine = ({ enabled }) => {
  const unintegratedMachine = createUnintegratedMachine({
    enabled,
  });

  const [state, current, send] = useMachine(unintegratedMachine);

  return {
    state,
  };
};

export default useUnintegratedMachine;
