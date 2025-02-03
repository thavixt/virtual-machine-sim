import { useVirtualStore } from "./store";

function getState() {
  return useVirtualStore.getState();
}

function logState(...params: unknown[]) {
  console.log(
    'VirtualAction performed => Params:',
    params,
    'State: ',
    getState(),
  );
}

export const VirtualAction = {
  stop: () => {
    console.info('Stopping Virtual machine...');
    getState().setIsRunning(false);
    logState('Stopped Virtual machine...');
  },
  // 'api' methods
  reverse: (by = 1) => {
    console.log(`Advance tape back by ${by}`);
    getState().reverse();
  },
}

export const TurningState = {
  isRunning: () => {
    return getState().isRunning;
  },
}
