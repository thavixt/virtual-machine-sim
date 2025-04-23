import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useState, useCallback } from 'react';
import { FormInput } from './FormInput';

interface CodeEditorProps {
  label?: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}

export function CodeEditor({ label = 'Javascript code', defaultValue, name }: CodeEditorProps) {
  const [value, setValue] = useState(defaultValue ?? '');
  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <div className="grid grid-cols-10 grid-rows-1">
      <div className="col-span-2">
        <FormInput
          type="text"
          className="hidden"
          label={label}
          name={name}
          value={value}
          required
        />
      </div>
      <div className="col-span-8 flex flex-col items-center">
        <CodeMirror
          className='size-full'
          extensions={[javascript()]}
          height="300px"
          onChange={onChange}
          theme="dark"
          value={value}
        />
      </div>
    </div>
  )
}