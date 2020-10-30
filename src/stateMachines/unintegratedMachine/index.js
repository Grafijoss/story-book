import { createMachine, assign, send } from "xstate";
import { fetchCheckedTournament, checkingStartTime } from "./services";

const unintegratedMachine = (opts) => {
  const initialState = !opts.enabled ? "disabled" : "setUp";

  const machine = createMachine(
    {
      id: "Unintegrated Tournaments",
      initial: initialState,
      context: {
        counter: 0,
        checkedInterval: 10000,
        isNotCheckinTime: false,
        tournamentInterval: 5000,
        tournament: null,
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
        ifIsLessThanFive: (context) => context.counter < 5,
        ifTournamentDoesNotExist: (context) => {
          const tournament = Object.keys(context.tournament);
          return !tournament.length;
        },
        ifCurrentIsLessCheckedTime: (context) => context.isNotCheckinTime,
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
        setPollingOn: assign({ isPolling: (_) => true }),
        setCounter: assign({
          counter: (context, e) => {
            return context.counter + 1;
          },
        }),
        setTournament: assign({
          tournament: (context, e) => {
            return e.data.data.entries;
          },
        }),
        setCheckingTimeStarted: assign({
          isNotCheckinTime: (context, e) => {
            return e.data;
          },
        }),
      },
    }
  );

  return machine;
};

export default unintegratedMachine;
