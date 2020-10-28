const machine = Machine(
  {
    id: "Unintegrated Tournaments",
    initial: "setup",
    context: {
      // This value should be adjusted once you retrieve the serialized state from the API.
      tournamentIdsWhereUserCheckedIn: [],
      serializedLastStoredState: null,
      parsedLastStoredState: null,
    },
    states: {
      // Just like a TV, we have a "setup" state where we are fetch the serialized information
      // parse it and then decide where to send the user.
      setup: {
        on: {
          PROCESSED_LAST_STORED_STATE: [
            {
              target: "during.waitingCheckInTimeToEnd",
              cond: "wasCheckingIfCheckInTimeEnded",
            },
            { target: "during.waitingMatch", cond: "wasWaitingForMatch" },
            {
              target: "during.waitingRoom.fetchingFriendshipInformation",
              cond: "wasFetchingFriendshipInformationWhileOnWaitingRoom",
            },
            {
              target: "during.waitingRoom.waitingForOpponentToAcceptInvitation",
              cond: "wasWaitingForOpponentToAcceptInvitation",
            },
            {
              target: "during.waitingRoom.preparingFriendRequest",
              cond: "wasPreparingFriendRequest",
            },
            {
              target: "during.playing.confirmingOpponentPresence",
              cond: "wasConfirmingOpponentPresence",
            },
            {
              target: "during.playing.matchInProgress",
              cond: "wasInAMatchInProgress",
            },
            {
              target: "during.playing.reportingMatchResult",
              cond: "wasReportingResult",
            },
            {
              target: "after.checkingMatchResult",
              cond: "wasInAFinishedMatch",
            },
            {
              target: "after.disputingMatchResult",
              cond: "wasDisputingResults",
            },
            {
              target: "after.checkingRemainingMatches",
              cond: "wasCheckingRemainingMatches",
            },
            { target: "before" },
          ],
        },
        initial: "fetching",
        states: {
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
        },
      },
      before: {
        on: {
          // This should be called when you register in a tournament.
          USER_CHECKED_IN: {
            target: "during.waitingCheckInTimeToEnd",
            cond: "hasCheckedInInTournament",
            actions: "saveTournamentId",
          },
        },
      },
      during: {
        initial: "waitingCheckInTimeToEnd",
        on: {
          MATCH_RESULT_SAVED: "after",
        },
        states: {
          waitingCheckInTimeToEnd: {
            on: {
              CHECK_IN_TIME_ENDED: "waitingMatch",
            },
            invoke: {
              id: "checkIfCheckInTimeEnded",
              src: () => (callback) => {
                // Long poll using a data provider.
                // Call an endpoint that knows if the checking time has finished.
                const id = setInterval(() => {
                  debugger;
                  callback("CHECK_IN_TIME_ENDED");
                }, 1000);

                return () => clearInterval(id);
              },
            },
          },
          waitingMatch: {
            on: {
              MATCH_FOUND: {
                target: "waitingRoom",
                actions: "setMatchInformation",
              },
            },
            invoke: {
              id: "fetchForMatchInformation",
              src: () => (callback) => {
                // Long poll using a data provider.
                // Call an endpoint that returns the match information of a user.
                // We should use the tournament ids we have stored.
                const id = setInterval(() => {
                  debugger;
                  callback("MATCH_FOUND");
                }, 1000);

                return () => clearInterval(id);
              },
            },
          },
          waitingRoom: {
            initial: "fetchingFriendshipInformation",
            on: {
              MATCH_CAN_START: "playing",
              PLAYER_HAS_INVITATION_PENDING:
                "waitingRoom.receivedOpponentFriendRequest",
              PLAYER_HAS_TO_WAIT_OPPONENT:
                "waitingRoom.waitingForOpponentToAcceptInvitation",
              PLAYER_HAS_TO_SEND_INVITATION:
                "waitingRoom.preparingFriendRequest",
              OPPONENT_DID_NOT_ACCEPT_INVITATION:
                "playing.reportingMatchResult",
            },
            states: {
              fetchingFriendshipInformation: {
                initial: "fetching",
                states: {
                  fetching: {
                    invoke: {
                      id: "fetchFriendshipInformation",
                      src: "fetchFriendshipInformation",
                      onDone: "processing",
                      onError: "failure",
                    },
                  },
                  processing: {
                    on: {
                      "": [
                        {
                          cond: "areFriends",
                          actions: send("MATCH_CAN_START"),
                        },
                        {
                          cond: "hasPendingInvitation",
                          actions: send("PLAYER_HAS_INVITATION_PENDING"),
                        },
                        {
                          cond: "hasSentInvitationAlready",
                          actions: send("PLAYER_HAS_TO_WAIT_OPPONENT"),
                        },
                        {
                          actions: send("PLAYER_HAS_TO_SEND_INVITATION"),
                        },
                      ],
                    },
                  },
                  failure: {
                    on: {
                      RETRY: "fetching",
                    },
                  },
                },
              },
              waitingForOpponentToAcceptInvitation: {
                invoke: {
                  id: "checkIfOponnetHasAcceptedInvitation",
                  src: () => (callback) => {
                    const id = setInterval(() => {
                      // We can perform long polling here
                      callback("MATCH_CAN_START");
                    }, 1000);

                    return () => clearInterval(id);
                  },
                },
              },
              receivedOpponentFriendRequest: {
                initial: "idle",
                states: {
                  idle: {
                    on: {
                      FRIEND_REQUEST_ACCEPTED: "replyingFriendRequest",
                    },
                  },
                  replyingFriendRequest: {
                    initial: "fetching",
                    states: {
                      fetching: {
                        invoke: {
                          id: "acceptFriendRequest",
                          src: "acceptFriendRequest",
                          onDone: {
                            actions: send("MATCH_CAN_START"),
                          },
                          onError: "failure",
                        },
                      },
                      failure: {
                        on: {
                          RETRY: "fetching",
                        },
                      },
                    },
                  },
                },
              },
              preparingFriendRequest: {
                initial: "instructions",
                on: {
                  PLAYER_HAS_TO_WAIT_OPPONENT:
                    "waitingForOpponentToAcceptInvitation",
                },
                states: {
                  instructions: {
                    on: {
                      OK: "sendingFriendRequest",
                    },
                  },
                  sendingFriendRequest: {
                    invoke: {
                      id: "sendFriendRequestToOpponent",
                      src: "sendFriendRequestToOpponent",
                      onDone: {
                        actions: send("PLAYER_HAS_TO_WAIT_OPPONENT"),
                      },
                      onError: "failure",
                    },
                  },
                  failure: {
                    on: {
                      RETRY: "sendingFriendRequest",
                    },
                  },
                },
              },
            },
          },
          playing: {
            initial: "confirmingOpponentPresence",
            states: {
              confirmingOpponentPresence: {
                on: {
                  OPPONENT_SHOWED_UP: "matchInProgress",
                  OPPONENT_DID_NOT_SHOW_UP:
                    "reportingMatchResult.didOpponentShowedUp",
                },
              },
              matchInProgress: {
                on: {
                  MATCH_ENDED: "reportingMatchResult",
                },
              },
              reportingMatchResult: {
                initial: "prompt",
                states: {
                  prompt: {
                    on: {
                      I_WON_SELECTED: "savingMatchResult",
                      I_LOST_SELECTED: "savingMatchResult",
                      OPPONENT_DID_NOT_ACCEPT_INVITATION: "didOpponentShowedUp",
                    },
                  },
                  didOpponentShowedUp: {
                    on: {
                      SUBMIT: "savingMatchResult",
                    },
                  },
                  savingMatchResult: {
                    initial: "form",
                    states: {
                      form: {
                        on: {
                          SUBMIT: "fetching",
                        },
                      },
                      fetching: {
                        invoke: {
                          id: "saveMatchResult",
                          src: "saveMatchResult",
                          onDone: {
                            actions: [send("MATCH_RESULT_SAVED")],
                          },
                          onError: {
                            target: "failure",
                          },
                        },
                      },
                      failure: {
                        on: {
                          RETRY: "fetching",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      after: {
        initial: "checkingMatchResult",
        on: {
          HAS_REMAINING_MATCHES: "during.waitingMatch",
        },
        states: {
          checkingMatchResult: {
            on: {
              // What do we do here?
              MATCH_RESULT_REJECTED: "disputingMatchResult",
              MATCH_RESULT_APPROVED: "checkingRemainingMatches",
            },
          },
          disputingMatchResult: {
            on: {
              RESULTS_DISPUTED: "checkingRemainingMatches",
            },
          },
          checkingRemainingMatches: {
            initial: "fetching",
            states: {
              fetching: {
                invoke: {
                  id: "checkRemainingMatches",
                  src: "checkRemainingMatches",
                  onDone: "processing",
                  onError: "failure",
                },
              },
              processing: {
                on: {
                  "": [
                    {
                      cond: "hasRemainingMatches",
                      actions: send("HAS_REMAINING_MATCHES"),
                    },
                  ],
                },
              },
              failure: {
                on: {
                  RETRY: "fetching",
                },
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      saveSerializedLastStoredState: assign({}),
      parseSerializedState: assign({}),
      saveTournamentId: assign({}),
      "send START_MATCH_EVENT": send("MATCH_CAN_START"),
      "send MATCH_CANNOT_START": send("MATCH_CANNOT_START"),
    },
    guards: {
      hasCheckedInInTournament: (context, event) => true,
      wasCheckingIfCheckInTimeEnded: (context, event) => true,
      wasWaitingForMatch: (context, event) => true,
      wasFetchingFriendshipInformationWhileOnWaitingRoom: (context, event) =>
        true,
      wasWaitingForOpponentToAcceptInvitation: (context, event) => true,
      wasPreparingFriendRequest: (context, event) => true,
      wasOnInstructions: (context, event) => true,
      wasCheckingAvailability: (context, event) => true,
      wasConfirmingOpponentPresence: (context, event) => true,
      wasInAMatchInProgress: (context, event) => true,
      wasReportingResult: (context, event) => true,
      wasInAFinishedMatch: (context, event) => true,
      wasDisputingResults: (context, event) => true,
      wasCheckingRemainingMatches: (context, event) => true,
      areFriends: (context, event) => true,
      hasPendingInvitation: (context, event) => true,
      hasSentInvitationAlready: (context, event) => true,
    },
    services: {
      fetchSerializedState: () => Promise.resolve(),
      fetchingFriendshipInformation: () => Promise.resolve(),
      sendFriendRequestToOpponent: () => Promise.resolve(),
      fetchFriendshipInformation: () => Promise.resolve(),
      saveMatchResult: () => Promise.resolve(),
      acceptFriendRequest: () => Promise.resolve(),
      checkRemainingMatches: () => Promise.resolve(),
    },
  }
);
