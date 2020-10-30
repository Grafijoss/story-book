import { createMachine, assign, send } from "xstate";
import { unintegratedContexts } from "./contexts";
import { fetchCheckedTournament, checkingStartTime } from "./services";

const unintegratedMachine = (opts) => {
  const initialState = !opts.enabled ? "disabled" : "setUp";

  const machine = createMachine(
    {
      id: "Unintegrated Tournaments",
      initial: initialState,
      context: {
        ...unintegratedContexts,
      },
      states: {
        disabled: {
          type: "final",
        },
        setUp: {
          on: {
            PROCESSED_LAST_STORED_STATE: [{ target: "before" }],
          },
          //   entry: send("PROCESSED_LAST_STORED_STATE"),
          initial: "polling",
          states: {
            polling: {
              // invoca el servicio apenas llega al estado
              invoke: {
                id: "fetchCheckedTournament",
                // get es el endpoint del serivio o el metodo que vamos allamar
                src: "fetchCheckedTournament",
                // cuando la respuesta es correcta
                onDone: {
                  target: "waiting",
                  actions: "setTournament",
                },
                onError: "failure",
              },
            },
            waiting: {
              after: {
                POLL_DELAY: [
                  {
                    target: "polling",
                    cond: "ifTournamentDoesNotExist",
                  },
                  {
                    target: "restoring",
                  },
                ],
              },
            },
            failure: {
              on: {
                RETRY: "polling",
              },
            },
            restoring: {
              entry: send("PROCESSED_LAST_STORED_STATE"),
            },
          },
        },
        before: {
          on: {
            PROCESSING_PREVIOUS_STEPS: [{ target: "during" }],
          },
          initial: "validatingTheCheckedTime",
          states: {
            validatingTheCheckedTime: {
              invoke: {
                id: "checkingStartTime",
                src: "checkingStartTime",
                onDone: {
                  target: "waitingCheckedTime",
                  actions: "setCheckingTimeStarted",
                },
                onError: "failureCheckedTime",
              },
            },
            waitingCheckedTime: {
              after: {
                CHECKED_TIME_DELAY: [
                  {
                    target: "validatingTheCheckedTime",
                    cond: "ifCurrentIsLessCheckedTime",
                  },
                  {
                    target: "processingBeforeSteps",
                  },
                ],
              },
            },
            failureCheckedTime: {
              on: {
                RETRY: "validatingTheCheckedTime",
              },
            },
            processingBeforeSteps: {
              entry: send("PROCESSING_PREVIOUS_STEPS"),
            },
          },
        },

        during: {
          id: "during",
        },
        after: {},
      },
    },
    {
      guards: {
        ifTournamentDoesNotExist: (context) => {
          const tournament = Object.keys(context.tournament);
          return !tournament.length;
        },
        ifCurrentIsLessCheckedTime: (context) => !context.isCheckinTime,
      },
      delays: {
        POLL_DELAY: (context) => context.tournamentInterval,
        CHECKED_TIME_DELAY: (context) => context.checkedInterval,
      },
      services: {
        fetchCheckedTournament,
        checkingStartTime,
      },
      actions: {
        setTournament: assign({
          tournament: (context, e) => e.data.data.entries,
        }),
        setCheckingTimeStarted: assign({
          isCheckinTime: (context, e) => e.data,
        }),
      },
    }
  );

  return machine;
};

export default unintegratedMachine;
