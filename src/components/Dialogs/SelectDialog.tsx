import { useState } from "react";
import { CALCULATIONS } from "../../logic/calculations";
import { useVirtualStore } from "../../state";
import { Calculation } from "../..";
import { padString } from "../../logic/utils";

export function SelectDialog() {
  const running = useVirtualStore(state => state.isRunning);
  const calculation = useVirtualStore(state => state.calculation);
  const [current, setCurrent] = useState<Calculation>(calculation);

  return (
    <div className="flex flex-col space-y-2 w-[500px]">
      <div className="w-full flex space-x-4 items-center">
        <label htmlFor="calcName">Method:</label>
        <select
          className="w-full h-8"
          defaultValue={current}
          id="calcName"
          name="calcName"
          onChange={e => setCurrent(e.currentTarget.value)}
        >
          {Object.entries(CALCULATIONS)
            .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
            .map(([key, value]) => {
              let tooltip = value.description
              if (value.tip) {
                tooltip += `\n\nTip:\n${value.tip}`;
              }
              return (
                <option
                  disabled={running}
                  key={key}
                  value={key}
                  title={tooltip}
                >
                  {padString(`[${key}]`, 10, ' ')} {value.name}
                </option>
              )
            })}
        </select>
      </div>
      <div className="text-sm">
        <b>Description:</b>
        <p className="whitespace-pre-wrap">{CALCULATIONS[current].description}</p>
      </div>
      <div className="text-sm">
        <b>Tip:</b>
        <p>{CALCULATIONS[current].tip ?? '-'}</p>
      </div>
    </div>
  )
}