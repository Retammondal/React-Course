import React, { useEffect } from 'react'
import { Children } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const ThemeContext = createContext(null)


export default function ThemeButton({children}) {
    let [theme,setTheme] = useState(true)
    let [display,setDisplay] = useState("Light")

    useEffect(()=>{
      if (theme){
        setDisplay("Light")
      }
      if (!theme){
        setDisplay("Dark")
    }
  },[theme])

  return (
    <ThemeContext.Provider value={{theme,setTheme,display}}>
        {children}
    </ThemeContext.Provider>
  )
}

