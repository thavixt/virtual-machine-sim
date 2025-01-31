import { PropsWithChildren } from "react";

export function ListItem({title, children}: PropsWithChildren<{title: string}>) {
  return (
    <li>
      <code>{title}</code>:{' '}{children} 
    </li>
  )
}