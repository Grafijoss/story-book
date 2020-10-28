/* eslint-disable max-len */

import { useEffect, useMemo, useCallback } from 'react';

import { createMachine, assign } from 'xstate';

import { useMachine } from '@xstate/react';


import theme from '~theme';


import { isDef, isEmpty } from '~utils/core';


import useFilter from '~hooks/useFilter';

import usePrevious from '~hooks/usePrevious';

import useWindowSize from '~hooks/useWindowSize';


class UseFilterDropdownError extends Error { }


/**

 * @typedef {{ open: {}; closed: {}; }} MobileDropdownStateSchema

 */


/**

 * @typedef {{ open: {}; opening: {}; closed: {}; closing: {}; }} DesktopDropdownStateSchema

 */


/**

 * @typedef {Object} DropdownStateSchema

 * @property {{

        desktopMode: DesktopDropdownStateSchema;

        mobileMode: MobileDropdownStateSchema;

    }} states

 */


/**

 * @typedef {Object} DiscriminatorsInformation

 * @property {string} name

 * @property {Array<string>} possibleValues

 * @property {boolean} canChooseMultipleValues

 */


/**

 * @typedef {Object} CreateDropdownMachineOptions

 * @property {string} id

 * @property {string} placeholderLabel

 * @property {Array<DiscriminatorsInformation>} discriminators

 * @property {(opts: Record<string, Array<string>>) => void} onApply

 */


/**

 * @typedef {Object} DoesDiscriminatorUsesMultipleValuesOptions

 * @property {DropdownMachineContext} context

 * @property {DropdownMachineEvent} event

 */


/**

 * @function

 * @param {DoesDiscriminatorUsesMultipleValuesOptions} opts

 * @returns {boolean}

 */

const doesDiscriminatorUsesMultipleValues = ({ context, event }) => {

    let targetDiscriminatorName;


    if (context.isOnMobileMode) {

        targetDiscriminatorName = event.discriminatorName;

    } else {

        targetDiscriminatorName = context.activeDiscriminatorName;

    }


    const { discriminators } = context;


    return discriminators[targetDiscriminatorName].canChooseMultipleValues;

};


/**

 * Get the initial context for a dropdown machine given some options

 * @function

 * @param {CreateDropdownMachineOptions} opts

 * @returns {DropdownMachineContext}

 */


/**

 * @typedef {Object} Discriminator

 * @property {Object} name

 * @property {Array<string>} values

 * @property {boolean} canChooseMultipleValues

 */


/**

 * @typedef {Object} DropdownMachineContext

 * @property {string} activeDiscriminatorName

 * @property {Record<string, Discriminator>} discriminators

 */


/**

 * Given the options to create a dropdown machine. Returns the context of such machine.

 * @function

 * @param {CreateDropdownMachineOptions} opts

 * @returns {DropdownMachineContext}

 */

const getInitialContextFromOptions = opts => ({

    isOnMobileMode: true,

    activeDiscriminatorName: null,

    discriminators: opts.discriminators

        .reduce((discriminatorsMap, discriminator) => ({

            ...discriminatorsMap,

            [discriminator.name]: {

                name: discriminator.name,

                values: [opts.placeholderLabel],

                canChooseMultipleValues: discriminator.canChooseMultipleValues,

            },

        }), {}),

});


/**

 * @typedef {Object} DiscriminatorPanelOpenedEvent

 * @property {'OPENED_DISCRIMINATOR_PANEL'} type

 * @property {string} value

 */


/**

 * @typedef {Object} DiscriminatorPanelClosedEvent

 * @property {'CLOSED_DISCRIMINATOR_PANEL'} type

 */


/**

 * @typedef {Object} DiscriminatorValueAddedEvent

 * @property {'DISCRIMINATOR_VALUE_ADDED'} type

 * @property {string} value

 * @property {string=} discriminatorName Discriminator name to be used. Use on mobile mode only.

 */


/**

 * @typedef {Object} DiscriminatorValueRemovedEvent

 * @property {'DISCRIMINATOR_VALUE_REMOVED'} type

 * @property {string} value

 * @property {string=} discriminatorName Discriminator name to be used. Use on mobile mode only.

 */


/**

 * @typedef {Object} DiscriminatorsAppliedEvent

 * @property {'DISCRIMINATORS_APPLIED'} type

 */


/**

 * @typedef {Object} FilterChangedEvent

 * @property {'FILTER_CHANGED'} type

 * @property {import('~contexts/filters').Filter['discriminators']} values

 */


/**

 * @typedef {Object} DiscriminatorsUpdatedEvent

 * @property {'POSSIBLE_VALUES_CHANGED'} type

 * @property {Array<DiscriminatorsInformation>} discriminators

 * @property {Array<DiscriminatorsInformation>} prevDiscriminators

 */


/**

 * @typedef {

        DiscriminatorPanelOpenedEvent

        | DiscriminatorPanelClosedEvent

        | DiscriminatorValueAddedEvent

        | DiscriminatorValueRemovedEvent

        | DiscriminatorsAppliedEvent

        | DiscriminatorsUpdatedEvent

    * } DropdownMachineEvent

 */


/**

 * A dropdown machine factory. Share common dropdown behavior but with enough flexibility.

 * @function

 * @param {CreateDropdownMachineOptions} opts

 * @returns {import('xstate').StateMachine<DropdownMachineContext, DropdownStateSchema, DropdownMachineEvent>}

 */

const createDropdownMachine = (opts) => {

    /** @type {import('xstate').StateMachine<DropdownMachineContext, DropdownStateSchema, DropdownMachineEvent>}} */

    const machine = createMachine({

        id: opts.id,

        context: getInitialContextFromOptions(opts),

        initial: 'mobileMode',

        states: {

            mobileMode: {

                initial: 'closed',

                states: {

                    closed: {

                        on: {

                            OPENED_DISCRIMINATOR_PANEL: 'open',

                        },

                    },

                    open: {

                        on: {

                            CLOSED_DISCRIMINATOR_PANEL: 'closed',

                            DISCRIMINATOR_VALUE_ADDED: {

                                actions: ['addDiscriminatorValue'],

                            },

                            DISCRIMINATOR_VALUE_REMOVED: {

                                actions: ['removeDiscriminatorValue'],

                            },

                            DISCRIMINATORS_APPLIED: {

                                target: 'closed',

                                actions: ['invokeApplyCallback'],

                            },

                        },

                    },

                    hist: {

                        // This is used to track the last state of the machine

                        type: 'history',

                    },

                },

                on: {

                    DESKTOP_MODE_SET: {

                        target: 'desktopMode.hist',

                        actions: ['toggleMobileModeFlag'],

                    },

                },

            },

            desktopMode: {

                initial: 'closed',

                states: {

                    closed: {

                        on: {

                            OPENED_DISCRIMINATOR_PANEL: {

                                target: 'open',

                                actions: ['setActiveDiscriminator'],

                            },

                        },

                    },

                    opening: {

                        after: {

                            750: {

                                target: 'open',

                            },

                        },

                    },

                    open: {

                        on: {

                            OPENED_DISCRIMINATOR_PANEL: {

                                actions: ['setActiveDiscriminator'],

                            },

                            CLOSED_DISCRIMINATOR_PANEL: 'closing',

                            DISCRIMINATOR_VALUE_ADDED: {

                                actions: ['addDiscriminatorValue'],

                            },

                            DISCRIMINATOR_VALUE_REMOVED: {

                                actions: ['removeDiscriminatorValue'],

                            },

                            DISCRIMINATORS_APPLIED: {

                                target: 'closing',

                                actions: ['invokeApplyCallback'],

                            },

                        },

                    },

                    closing: {

                        after: {

                            750: {

                                target: 'closed',

                                actions: ['removeActiveDiscriminator'],

                            },

                        },

                    },

                    hist: {

                        // This is used to track the last state of the machine

                        type: 'history',

                    },

                },

                on: {

                    MOBILE_MODE_SET: {

                        target: 'mobileMode.hist',

                        actions: ['toggleMobileModeFlag'],

                    },

                },

            },

        },

        on: {

            FILTER_CHANGED: {

                actions: ['updateDiscriminatorsWithFilterSnapshot'],

            },

            POSSIBLE_VALUES_CHANGED: {

                actions: ['removeImpossibleDiscriminatorValues'],

            },

        },

    }, {

        actions: {

            toggleMobileModeFlag: assign({

                isOnMobileMode: ctx => !ctx.isOnMobileMode,

            }),

            setActiveDiscriminator: assign({

                activeDiscriminatorName: (context, event) => event.value,

            }),

            removeActiveDiscriminator: assign({

                activeDiscriminatorName: null,

            }),

            addDiscriminatorValue: assign({

                discriminators: (context, event) => {

                    /** @type {string} */

                    let targetDiscriminatorName;


                    if (context.isOnMobileMode) {

                        targetDiscriminatorName = event.discriminatorName;

                    } else {

                        targetDiscriminatorName = context.activeDiscriminatorName;

                    }


                    const { discriminators } = context;

                    const activeDiscriminator = discriminators[targetDiscriminatorName];

                    const { values: targetDiscriminatorValues } = activeDiscriminator;


                    if (event.value === opts.placeholderLabel) {

                        return {

                            ...context.discriminators,

                            [targetDiscriminatorName]: {

                                ...activeDiscriminator,

                                values: [opts.placeholderLabel],

                            },

                        };

                    }


                    const handleMultipleValues = doesDiscriminatorUsesMultipleValues({

                        context,

                        event,

                    });


                    /** @type {Array<string>} */

                    let updatedTargetDiscriminatorValues;


                    if (handleMultipleValues) {

                        updatedTargetDiscriminatorValues = [

                            ...targetDiscriminatorValues,

                            event.value,

                        ];

                    } else {

                        updatedTargetDiscriminatorValues = [event.value];

                    }


                    const updatedTargetDiscriminatorValuesWithoutPlaceholder = updatedTargetDiscriminatorValues.filter(activeDiscriminatorValue => activeDiscriminatorValue !== opts.placeholderLabel);


                    /** @type {DiscriminatorsInformation} */

                    const targetDiscriminatorInfo = opts.discriminators.find(discriminator => discriminator.name === targetDiscriminatorName);


                    const howManyValuesCanTheActiveDiscriminatorHave = targetDiscriminatorInfo.possibleValues.length;

                    const howManyValuestheActiveDiscriminatorCurrentlyHaveSelected = updatedTargetDiscriminatorValuesWithoutPlaceholder.length;


                    if (howManyValuesCanTheActiveDiscriminatorHave === howManyValuestheActiveDiscriminatorCurrentlyHaveSelected) {

                        return {

                            ...context.discriminators,

                            [targetDiscriminatorName]: {

                                ...activeDiscriminator,

                                values: [opts.placeholderLabel],

                            },

                        };

                    }


                    return {

                        ...context.discriminators,

                        [targetDiscriminatorName]: {

                            ...activeDiscriminator,

                            values: updatedTargetDiscriminatorValuesWithoutPlaceholder,

                        },

                    };

                },

            }),

            removeDiscriminatorValue: assign({

                discriminators: (context, event) => {

                    /** @type {string} */

                    let targetDiscriminatorName;


                    if (context.isOnMobileMode) {

                        targetDiscriminatorName = event.discriminatorName;

                    } else {

                        targetDiscriminatorName = context.activeDiscriminatorName;

                    }


                    const { discriminators } = context;


                    const targetDiscriminator = discriminators[targetDiscriminatorName];


                    const { values: targetDiscriminatorValues } = targetDiscriminator;


                    const updatedTargetDiscriminatorValues = targetDiscriminatorValues.filter(

                        v => v !== event.value,

                    );


                    const shouldUsePlaceholder = isEmpty(updatedTargetDiscriminatorValues);


                    return {

                        ...context.discriminators,

                        [targetDiscriminatorName]: {

                            ...targetDiscriminator,

                            values: shouldUsePlaceholder

                                ? [opts.placeholderLabel]

                                : updatedTargetDiscriminatorValues,

                        },

                    };

                },

            }),

            invokeApplyCallback: (context) => {

                const discriminators = Object.entries(context.discriminators)

                    .map(([discriminatorName, discriminatorValue]) => ({

                        [discriminatorName]: discriminatorValue.values,

                    }))

                    .reduce((acc, current) => ({ ...acc, ...current }), {});


                opts.onApply(discriminators);

            },

            updateDiscriminatorsWithFilterSnapshot: assign({

                discriminators: (context, event) => {

                    if (isEmpty(event.discriminators)) {

                        return context.discriminators;

                    }


                    /** @type {DropdownMachineContext['discriminators']} */

                    const updatedDiscriminators = Object.entries(context.discriminators)

                        .reduce((discriminatorsMap, [discriminatorName, discriminatorValue]) => {

                            /** @type {[string, Array<string>] | undefined} */

                            const filterDiscriminatorEntry = Object.entries(event.discriminators)

                                .find(([filterDiscriminatorName]) => filterDiscriminatorName === discriminatorName);


                            if (!isDef(filterDiscriminatorEntry)) {

                                throw new UseFilterDropdownError(`There is a filter mistatch here. You are using a dropdown that uses the discriminator "${discriminatorName}" but the filter itself was updated either by other component or by a hydration event and there is no such discriminator!`);

                            }


                            const filterDiscriminatorValues = filterDiscriminatorEntry[1];


                            return {

                                ...discriminatorsMap,

                                [discriminatorName]: {

                                    ...discriminatorValue,

                                    values: filterDiscriminatorValues,

                                },

                            };

                        }, {});


                    return updatedDiscriminators;

                },

            }),

            removeImpossibleDiscriminatorValues: assign({

                discriminators: (context, event) => {

                    // Perform an intersection between the previous and current snapshot

                    // Remember: discriminator names are the same, only the values change over time.


                    /** @type {Array<{name: string; values: Array<string>}>} */

                    const discriminatorValuesThatShouldBeRemoved = event.prevDiscriminators.map((prevDiscriminator) => {

                        /** @type {string} */

                        const prevDiscriminatorName = prevDiscriminator.name;


                        /** @type {DiscriminatorsInformation} */

                        const currentSnapshotOfTheDiscriminator = event.discriminators.find((discriminator) => {

                            /** @type {string} */

                            const discriminatorName = discriminator.name;


                            return prevDiscriminatorName === discriminatorName;

                        });


                        /** @type {Array<string>} */

                        const prevDiscriminatorValues = context.discriminators[prevDiscriminator.name].values;


                        /** @type {Array<string>} */

                        const valuesThatShouldBeRemoved = prevDiscriminatorValues.filter((prevDiscriminatorValue) => {

                            const possibleValuesOfCurrentDiscriminator = currentSnapshotOfTheDiscriminator.possibleValues;


                            return !possibleValuesOfCurrentDiscriminator.includes(prevDiscriminatorValue);

                        });


                        return {

                            name: prevDiscriminatorName,

                            values: valuesThatShouldBeRemoved,

                        };

                    });


                    /** @type {DropdownMachineContext['discriminators']} */

                    const updatedDiscriminators = Object.entries(context.discriminators)

                        .reduce((discriminatorsMap, [discriminatorName, discriminatorValue]) => {

                            /** @type {{ name: string; values: Array<string> }} */

                            const dictionaryWithDiscriminatorValuesToBeDeleted = discriminatorValuesThatShouldBeRemoved

                                .find(discriminatorUpdate => discriminatorUpdate.name === discriminatorName);


                            // Because, you know...

                            if (isEmpty(dictionaryWithDiscriminatorValuesToBeDeleted.values)) {

                                return {

                                    ...discriminatorsMap,

                                    [discriminatorName]: discriminatorValue,

                                };

                            }


                            const updatedDiscriminatorValues = discriminatorValue.values.filter(valueInDiscriminator => !dictionaryWithDiscriminatorValuesToBeDeleted.values.includes(valueInDiscriminator));


                            if (isEmpty(updatedDiscriminatorValues)) {

                                return {

                                    ...discriminatorsMap,

                                    [discriminatorName]: {

                                        ...discriminatorValue,

                                        values: [opts.placeholderLabel],

                                    },

                                };

                            }


                            return {

                                ...discriminatorsMap,

                                [discriminatorName]: {

                                    ...discriminatorValue,

                                    values: updatedDiscriminatorValues,

                                },

                            };

                        }, {});


                    return updatedDiscriminators;

                },

            }),

        },

    });


    return machine;

};


/**

 * @typedef {Object} DropdownMenuAPI

 * @property {boolean} isActive

 * @property {VoidFunction} placeholderClickHandler

 * @property {boolean} placeholderSelected

 */


/**

 * @typedef {Object} FilterDropdownBaseAPI

 * @property {(opts: { discriminatorName: string, value: string }) => boolean} isDiscriminatorValueSelected

 * @property {(opts: { discriminatorName: string; value: string }) => void} toggleDiscriminatorValue

 * @property {(name: string) => Discriminator} getDiscriminatorByName

 * @property {(name: string) => Array<string>} getSelectedDiscriminatorsValuesByName

 * @property {(name: string) => DropdownMenuAPI} getDropdownMenu

 * @property {VoidFunction} applyDiscriminators

 */


/**

* @typedef {FilterDropdownBaseAPI & FilterDropdownMobileAPI} FilterDropdownFullMobileAPI

*/


/**

 * @typedef {Object} FilterDropdownDesktopAPI

 * @property {boolean} isOpen

 * @property {boolean} isClosed

 * @property {boolean} isClosing

 * @property {boolean} isOpening

 * @property {string} activeDiscriminatorName

 * @property {{ name: string; canChooseMultipleValues: boolean; }} activeDiscriminator

 * @property {(name: string) => Array<string>} getSelectedDiscriminatorsValuesByName

 * @property {(name: string) => boolean} isDiscriminatorActive

 * @property {(name: string) => void} toggleDiscriminatorPanel

 */


/**

 * @typedef {FilterDropdownBaseAPI & FilterDropdownDesktopAPI} FilterDropdownFullDesktopAPI

 */


/**

 * @typedef {Object} FilterDropdownMobileAPI

 * @property {boolean} isOpen

 * @property {boolean} isClosed

 * @property {VoidFunction} toggleVisibility

 */


/**

 * @typedef {Object} FilterDropdownAPI

 * @property {{ context: DropdownMachineContext }} current

 * @property {string} debug

 * @property {FilterDropdownFullMobileAPI} mobileApi

 * @property {FilterDropdownFullDesktopAPI} desktopApi

 */


/**

 * A react hook that creates a set of dropdown controls a given a filter name.

 * @function

 * @param {{ name: string; } & CreateDropdownMachineOptions} opts

 * @returns {FilterDropdownAPI}

 */

const useFilterDropdown = ({ name: filterName, discriminators, ...rest }) => {

    if (!isDef(filterName)) {

        throw new UseFilterDropdownError('useFilterDropdown needs to be provided the name of the filter');

    }


    if (!isDef(discriminators) || isEmpty(discriminators)) {

        throw new UseFilterDropdownError('useFilterDropdown needs to be provided a set of DiscriminatorInfo elements. The dropdown cannot simply be empty.');

    }


    const { filter, changeDiscriminators } = useFilter(filterName);


    const machine = useMemo(() => {

        const dropdownMachine = createDropdownMachine({

            id: `${filterName}DropdownMachine`,

            onApply: changeDiscriminators,

            discriminators,

            ...rest,

        });


        return dropdownMachine;

    }, []);


    const [current, send] = useMachine(machine);


    // Runs every time the filter instance is changed. It may change because another component

    // mutated it or the hydration of the filters took place.

    // Common question: Hydration? See the Filters context and look for the HYDRATED event.

    useEffect(() => {

        // Remember filters may be undefined at the beggining.

        // Also If I send that 'FILTER_CHANGED' event it triggers this effect because it mutates the

        // filter in the app context

        if (!isDef(filter) || current.event.type === 'DISCRIMINATORS_APPLIED') {

            return;

        }


        send({ type: 'FILTER_CHANGED', discriminators: filter.discriminators });

    }, [JSON.stringify(filter)]);


    // We are going to use this as the way to detect if our discriminators changed.

    // We want something that says "Hey, the possible values of our discriminators changed"

    const possibleValues = discriminators.reduce((acc, discriminator) => [

        ...acc,

        ...discriminator.possibleValues,

    ], []).join(', ');


    const prevDiscriminators = usePrevious(discriminators);


    // This is meant to runt after the possible values of the dropdown have changed.

    // Why it may change? Because after applying the filters we usually refetch some data and

    // like the games, videoTypes, news categories, etc. in other words the possible values of the

    // discriminators. That's why we should keep an eye with this effect when that happens.

    useEffect(() => {

        // When this effect is ran, we currently have stored some discriminatorValues in the machine

        // context but this may not be *valid* anymore.

        // The problem: If the possible values change, we need to make sure we are not storing an

        // impossible discriminator value. We have to remove it from the context if that happens.

        // Of course, we take into account that if you are left with one, it selects the placeholder

        // label.


        // If the previous discriminators are undefined it just means they were just created..

        if (!isDef(prevDiscriminators)) {

            return;

        }


        send({

            type: 'POSSIBLE_VALUES_CHANGED',

            discriminators,

            prevDiscriminators,

        });

    }, [possibleValues]);


    const windowSize = useWindowSize();


    // Since we have to determine which mode should be toggle, there will be a flash of content.

    // The component shouldn't appear at first but rather after mounting.

    useEffect(() => {

        if (windowSize.width > theme.breakpoints.sm) {

            send({ type: 'DESKTOP_MODE_SET' });

        } else {

            send({ type: 'MOBILE_MODE_SET' });

        }

    }, [windowSize.width]);


    const isDiscriminatorActive = useCallback(name => current.context.activeDiscriminatorName === name, [current.context]);


    const getDiscriminatorByName = useCallback((name) => {

        const discriminator = current.context.discriminators[name];


        return discriminator;

    }, [current.context]);


    const getSelectedDiscriminatorsValuesByName = useCallback((name) => {

        const discriminator = getDiscriminatorByName(name);


        return discriminator.values;

    }, [current.context]);


    const isDiscriminatorValueSelected = useCallback(({ discriminatorName, value }) => {

        const discriminatorValues = getSelectedDiscriminatorsValuesByName(discriminatorName);


        return discriminatorValues.includes(value);

    }, [getSelectedDiscriminatorsValuesByName]);


    const toggleDiscriminatorPanel = useCallback((name) => {

        const isThisPanelActive = isDiscriminatorActive(name);


        if (isThisPanelActive) {

            send({ type: 'CLOSED_DISCRIMINATOR_PANEL' });

        } else {

            send({ type: 'OPENED_DISCRIMINATOR_PANEL', value: name });

        }

    }, [isDiscriminatorActive]);


    const toggleDiscriminatorValue = useCallback(({ discriminatorName, value }) => {

        const discriminatorValues = getSelectedDiscriminatorsValuesByName(discriminatorName);


        const isThisValueAdded = discriminatorValues.includes(value);


        if (isThisValueAdded) {

            send({ type: 'DISCRIMINATOR_VALUE_REMOVED', value, discriminatorName });

        } else {

            send({ type: 'DISCRIMINATOR_VALUE_ADDED', value, discriminatorName });

        }

    }, [getSelectedDiscriminatorsValuesByName]);


    const applyDiscriminators = useCallback(() => {

        send({ type: 'DISCRIMINATORS_APPLIED' });

    }, []);


    const toggleVisibility = useCallback(() => {

        if (current.matches({ mobileMode: 'open' })) {

            send({ type: 'CLOSED_DISCRIMINATOR_PANEL' });

        } else {

            send({ type: 'OPENED_DISCRIMINATOR_PANEL' });

        }

    }, [current.value]);


    /** @type {DropdownMenuAPI} */

    const getDropdownMenu = useCallback((name) => {

        const isActive = isDiscriminatorActive(name);


        const placeholderClickHandler = () => {

            toggleDiscriminatorValue({

                discriminatorName: name,

                value: rest.placeholderLabel,

            });

        };


        const placeholderSelected = isDiscriminatorValueSelected({

            discriminatorName: name,

            value: rest.placeholderLabel,

        });


        return Object.freeze({

            isActive,

            placeholderClickHandler,

            placeholderSelected,

        });

    }, [isDiscriminatorActive, toggleDiscriminatorValue, isDiscriminatorValueSelected]);


    const commonApi = {

        isDiscriminatorValueSelected,

        toggleDiscriminatorValue,

        getSelectedDiscriminatorsValuesByName,

        getDiscriminatorByName,

        getDropdownMenu,

        applyDiscriminators,

    };


    const desktopApi = Object.freeze({

        ...commonApi,

        isOpen: current.matches({ desktopMode: 'open' }),

        isClosed: current.matches({ desktopMode: 'closed' }),

        isClosing: current.matches({ desktopMode: 'closing' }),

        isOpening: current.matches({ desktopMode: 'opening' }),

        activeDiscriminatorName: current.context.activeDiscriminatorName,

        activeDiscriminator: discriminators[current.context.activeDiscriminatorName],

        isDiscriminatorActive,

        toggleDiscriminatorPanel,

    });


    const mobileApi = Object.freeze({

        ...commonApi,

        isOpen: current.matches({ mobileMode: 'open' }),

        isClosed: current.matches({ mobileMode: 'closed' }),

        toggleVisibility,

    });


    return Object.freeze({

        current,

        debug: `State: ${JSON.stringify(current.value, null, 2)}\nMachine: ${JSON.stringify(current.context, null, 2)};`,

        mobileApi,

        desktopApi,

    });

};


export default useFilterDropdown;