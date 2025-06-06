import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './theme-light.css' // Import our custom light theme
import AppWrapper from './AppWrapper.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)