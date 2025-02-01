import { useCallback, useEffect } from "react";

type EventName = string;
type EventHandler<T extends Record<string, unknown>> = ((params: T) => void | Promise<void>);
type EventTrigger<T extends Record<string, unknown>> = (params: T) => void
type EventPayload = Record<string, unknown>;

const EVENT_TARGET_QUERY_SELECTOR = '#virtualEventTarget';
const LISTENERS: Record<EventName, EventListener> = {};

/**
 * - Create a CustomEvent registration
 * - Use the `useEvent` hook to fire the appropriate CustomEvent
 */
export function useRegisterEvent<T extends EventPayload>(eventName: EventName, eventHandler: EventHandler<T>) {
  const eventTarget = getVirtualEventTarget();

  useEffect(() => {
    // @ts-expect-error uhhh...
    const listener: EventListener = (e: CustomEvent<T>) => {
      eventHandler(e.detail);
    };
    LISTENERS[eventName] = listener;
    eventTarget.addEventListener(eventName, listener, false);

    // Clean up the previous event handler
    return () => {
      if (LISTENERS[eventName]) {
        eventTarget.removeEventListener(eventName, LISTENERS[eventName])
      }
    }
  }, [eventHandler, eventName, eventTarget])
}

/**
 * - Lister for a CustomEvent
 * - Use the `registerEvent` hook to first register the CustomEvent
 */
export function useEvent<T extends EventPayload>(eventName: EventName): EventTrigger<T> {
  return useCallback((params: T) => {
    const event = new CustomEvent(eventName, { detail: params });
    getVirtualEventTarget().dispatchEvent(event);
  }, [eventName]);
}

export function fireEvent<T extends EventPayload>(eventName: EventName, params: T) {
  const event = new CustomEvent(eventName, { detail: params });
  getVirtualEventTarget().dispatchEvent(event);
}

function getVirtualEventTarget(): HTMLDivElement {
  return document.body.querySelector<HTMLDivElement>(EVENT_TARGET_QUERY_SELECTOR)!;
}

/** Example usage in a React component */

/**
 * @todo replace some interactivity/hooks/effects/store shit with my custom event handling hooks
 */

// import { useEvent, useRegisterEvent } from "../logic/event";

/**
  <div className="bg-slate-700 text-slate-200 p-2 m-2">
    <Handler />
    <Trigger />
  </div>
 */

/*
type MyCustomEventDetails = Record<string, number | string>;
const eventName = 'test-event';

function Trigger() {
  const triggerEvent = useEvent<MyCustomEventDetails>(eventName);

  return (
    <div>
      <button onClick={() => triggerEvent({ rand: Math.random() })}>trigger event {eventName}</button>
    </div>
  )
}
*/

/*
function Handler() {
  const [times, setTimes] = useState(0);  const [lastDetails, setLastDetails] = useState<Record<string, unknown>>({});

 const eventHandler = useCallback((params: MyCustomEventDetails) => {
   setTimes(t => t + 1);
   setLastDetails(params);
 }, []);

 useRegisterEvent<MyCustomEventDetails>(eventName, eventHandler)

 return (
   <div>
     <div>handled event {eventName} {times} times</div>
     <div>with details <code>{JSON.stringify(lastDetails)}</code></div>
   </div>
 )
}
*/
