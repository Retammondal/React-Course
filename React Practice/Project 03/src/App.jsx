import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { ThemeContext } from './components/ThemeButton'
import { use } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const {theme,display} = use(ThemeContext)
  return (
    <div id={display}>
      <Navbar/>
      <div className='py-5'>
        <h2>Welcome, Retam!</h2>
        <p>Current Theme : {display}</p>
      </div>
    </div>
  )
}


export default App
