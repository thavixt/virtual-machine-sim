import { ReactNode, useRef, useState, useEffect } from "react";

/**
 * Render child with parent's scroll dimensions
 */
export function Container({ children }: { children: (width: number, height: number) => ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!elementRef.current) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
      setHeight(entry.contentRect.height)
    });

    resizeObserver.observe(elementRef.current);
    return () => resizeObserver.disconnect(); // clean up 
  }, []);

  return (
    <div ref={elementRef} className="size-full">
      {(!width || !height) ? (
        <div>Loading ...</div>
      ) : (
        children(width, height)
      )}
    </div>
  );
}