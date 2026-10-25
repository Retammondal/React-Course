// ------------------------------------------------------------------------------------------------------
// context/ThemeContext.jsx - Custom Provider Component
// ------------------------------------------------------------------------------------------------------
import { createContext, useState } from "react";

// 1. Create the Context (Exported so children can consume it)
export let ThemeContext = createContext(null);

// 2. Create a Custom Provider Component
// Why do this? It keeps main.jsx clean and centralizes all the state logic (useState) for the theme!
export function ThemeProvider({ children }) {
    
    const [theme, setTheme] = useState("light");
    
    return (
        // 💡 React 19 Note: We can just use <ThemeContext> instead of <ThemeContext.Provider>
        // We pass BOTH the state and the updater function inside an object: {{theme, setTheme}}
        <ThemeContext value={{ theme, setTheme }}>
            {children}
        </ThemeContext>
    );
}