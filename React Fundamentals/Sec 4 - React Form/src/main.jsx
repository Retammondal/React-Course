// ------------------------------------------------------------------------------------------------------
// main.jsx - The Entry Point (Rendering Multiple Components)
// ------------------------------------------------------------------------------------------------------
import { createRoot } from 'react-dom/client';
import './index.css';

// 💡 AI Note: Combining Imports!
// 'App' is the default export (no braces). 
// The other forms are named exports from the exact same file, so they MUST be in curly braces {}.
import App, { Form, UncontrolledForm, UncontrolledFormUseRef } from './App.jsx';



// ---------------------------------------------------------
// Execution Flow & Rendering
// ---------------------------------------------------------
createRoot(document.getElementById('root')).render(
    
    // Rule 1 Reminder: React requires a single parent element. 
    // We use a Fragment (<>...</>) to group all these standalone components together on the page!
    <>
        <App />
        
        <hr />
        <Form />
        
        <hr />
        <UncontrolledForm />
        
        <hr />
        <UncontrolledFormUseRef />
    </>
);