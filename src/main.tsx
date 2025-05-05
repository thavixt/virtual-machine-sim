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
window.$vm_reverse = VirtualAction.reverse;
window.$vm_write = VirtualAction.write;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
