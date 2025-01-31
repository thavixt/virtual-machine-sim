import { useTuringStore } from "./store";

function getState() {
  return useTuringStore.getState();
}

function logState(...params: unknown[]) {
  console.log(getState());
  console.log('params:', params);
}

export const TuringAction = {
  stop: () => {
    console.info('Stopping Turing machine...');
    getState().setIsRunning(false);
    logState('Stopped Turing machine...');
  }
}

export const TurningState = {
  isRunning: () => {
    return getState().isRunning;
  },
}
