import React, { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeButton'
import { use } from 'react'

export default function Navbar() {
  
  const {theme,setTheme,display} = use(ThemeContext)
  const isLight = true


  return (
    <div className='py-4 px-4 border-b flex justify-between items-center'>
        <h2>My React App</h2>
        <button onClick={()=>setTheme((prev)=>!prev)}>
          {display}
        </button>
    </div>
  )
}

