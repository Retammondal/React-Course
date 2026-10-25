// ------------------------------------------------------------------------------------------------------
// main.jsx - Context API Setup & Providers
// ------------------------------------------------------------------------------------------------------
import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App, { AppContext, ExtraApp } from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

// 1. Creating the Context: 
// createContext is a built-in React function that initializes a Context object.
export let UserContext = createContext(null);
let username = "Retam Mondal";

createRoot(document.getElementById('root')).render(
    <>
        
        {/* App has NO access to UserContext because it is not wrapped inside the Provider! */}
        <App />
        
        {/* 2. Providing the Value: 
            Wrap the component tree inside <Context.Provider value={...}>. 
            Any child inside this wrapper can now access the 'username' data globally! */}
        <UserContext.Provider value={username}>
            <AppContext />
        </UserContext.Provider>
        
        {/* Using a Custom Provider (Cleanest approach for complex state like Themes/Auth) */}
        {/* ExtraApp is passed as the 'children' prop to ThemeProvider */}
        <ThemeProvider>
            <ExtraApp />
        </ThemeProvider>
        
    </>
);