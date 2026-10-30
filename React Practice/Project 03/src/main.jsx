import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeButton from './components/ThemeButton.jsx'
import Navbar from './components/Navbar.jsx'

// Kind of Implemented Bakcground color toggle but taken a bad way ...i know that.. but this was a experimental..
// I know there is something good way to do this but i was just playing with the concepts...
// will complete this project with this backdated method ; at last i will change to newer version
createRoot(document.getElementById('root')).render(
  <>
    <ThemeButton>
      <App />
    </ThemeButton>
  </>
)
