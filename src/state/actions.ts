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
  reverse: () => {
    console.log(`Reverse the tape direction (was ${getState().direction})`);
    getState().reverse();
  },
  write: (n: number) => {
    console.log(`Write ${n} to the tape`);
    getState().write(n);
  }
}

export const VirtualMachineState = {
  isRunning: () => {
    return getState().isRunning;
  },
  getDirection: () => {
    return getState().direction;
  },
}
