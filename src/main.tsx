import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { VirtualAction } from './state/actions.ts'

// SETUP

/**
 * Add all the VirtualAction members to the global scope
 * to be able to access them in misc. scripts on the page
 */
// @ts-expect-error back
window.$vm_back = VirtualAction.back;
// @ts-expect-error forward
window.$vm_forward = VirtualAction.forward;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
