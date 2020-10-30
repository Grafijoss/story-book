import { useEffect, useMemo, useCallback } from "react";

import unintegratedMachine from "../stateMachines/unintegratedMachine";

import { useMachine } from "@xstate/react";

const useUnintegratedMachine = ({ enabled }) => {
  const machine = unintegratedMachine({
    enabled,
  });

  const [state, current, send] = useMachine(machine);

  return {
    state,
  };
};

export default useUnintegratedMachine;
