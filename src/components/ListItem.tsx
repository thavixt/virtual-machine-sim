import { PropsWithChildren } from "react";

export function ListItem({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <li>
      <div className="inline-flex space-x-4">
        <div>
          <code>{title}</code>
        </div>
        <div>
          {children}
        </div>
      </div>
    </li>
  )
}