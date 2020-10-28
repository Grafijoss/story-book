import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';


const createUnintegratedMachine = (opts) => {

    const initialState = !opts.enabled ? 'disabled' : '';

    const machine = createMachine(
        {
            id: 'Unintegrated Tournaments',
            initial: initialState,
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

    return machine
}


const useUnintegratedMachine = (opts) => {

    const unintegratedMachine = createUnintegratedMachine({

        id: `${filterName}DropdownMachine`,

        onApply: changeDiscriminators,

        discriminators,

        ...rest,

    });

    const [current, send] = useMachine(unintegratedMachine);


}

export default useUnintegratedMachine