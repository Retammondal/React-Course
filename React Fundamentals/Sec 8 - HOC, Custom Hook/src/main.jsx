import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router"; // Import the router
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <div>
    {/* BrowserRouter enables the routing context for the entire application */}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </div>
)
