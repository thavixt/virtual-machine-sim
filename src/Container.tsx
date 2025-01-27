import { ReactNode, useRef, useState, useLayoutEffect } from "react";

/**
 * Render child with parent's inner dimensions
 */
export function Container({ children }: { children: (width: number, height: number) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current?.scrollWidth ?? 0)
    setHeight(ref.current?.scrollHeight ?? 0)
  }, [width, height]);

  return (
    <div ref={ref} className="w-full h-full">
      {(!width || !height) ? (
        <div>Loading ...</div>
      ) : (
        children(width, height)
      )}
    </div>
  );
}