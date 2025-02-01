import { useVirtualStore } from "./store";

function getState() {
  return useVirtualStore.getState();
}

function logState(...params: unknown[]) {
  console.log(getState());
  console.log('params:', params);
}

export const VirtualAction = {
  stop: () => {
    console.info('Stopping Virtual machine...');
    getState().setIsRunning(false);
    logState('Stopped Virtual machine...');
  },
  // 'api' methods
  back: (by = 1) => {
    console.log(`Advance tape back by ${by}`);
    getState().back();
  },
  forward: (by = 1) => {
    console.log(`Advance tape forward by ${by}`);
    getState().forward(2);
  }
}

export const TurningState = {
  isRunning: () => {
    return getState().isRunning;
  },
}
