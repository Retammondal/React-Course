import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppProblem, TimerUse, UseEffectMount, UseEffectRender } from './App'


createRoot(document.getElementById('root')).render(
  <>
    <AppProblem/>
    <UseEffectMount/>
    <UseEffectRender/>
    <TimerUse/>
  </>
)
