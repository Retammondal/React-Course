// ------------------------------------------------------------------------------------------------------
// App.jsx 
// ------------------------------------------------------------------------------------------------------
import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import { AuthDashboard } from './components/Dashboard';
import { AuthProfile } from './components/Profile';
import useLoading from './hooks/useLoading';



// ======================================================================================================
// Part 1: Higher-Order Functions vs. Higher-Order Components (HOC)
// ======================================================================================================
// Higher-Order Function -> A function that takes a function as an argument OR returns a function.
// Higher-Order Component (HOC) -> A function that takes a Component & returns a NEW Component with 
// additional behavior (like Auth checking, Analytics tracking, or Styling).

// Folder Structure Convention:
// HOCs are typically placed in a 'utils' (utilities/helpful tools) folder.
// Naming Convention: HOC names always start with 'with' (e.g., withAuth, withRouter, withTheme).

// HOC Work Flow (The Journey of a Component):
// 1. We pass the raw 'Dashboard' component into the 'withAuth' function.
// 2. 'withAuth' wraps it with extra logic and returns a new component: 'AuthDashboard'.
// 3. In App.jsx, we render <AuthDashboard /> instead of the original Dashboard.
// 4. PROPS PASSING: Any props we give <AuthDashboard /> travel into the HOC, which then safely 
//    passes them down to the original Dashboard using the spread operator {...props}.


// ======================================================================================================
// Part 2: Custom Hooks (Rules & Concepts)
// ======================================================================================================
// Custom Hook -> A normal JavaScript function that extracts component logic into reusable functions.
// 
// 🚨 The 5 Rules of Hooks:
// 1. Naming: Names MUST strictly start with 'use' (e.g., useFetch, useWindowSize).
// 2. Top Level Only: Must be called at the very top level of your component.
// 3. No Nesting: NEVER call a Hook inside a loop, if-condition, or nested function.
// 4. Composition: Custom Hooks are allowed to call other built-in Hooks (useState, useEffect, etc.).
// 5. Independent State: Each time you call a Custom Hook, it gets its own independent, isolated state. 
//    (If Component A and Component B both call useCounter(), they do NOT share the same count).


// ======================================================================================================
// Part 3: App Component & Routing
// ======================================================================================================
export default function App() {
    const {loading,startLoading, stopLoading} = useLoading();     // destructuring as useLoading returning {}

    // Mock user data to demonstrate passing props through HOCs
    let name = "Retam";
    let role = "Web Developer";

    // Method 2 of passing props through HOC's
    let user = {
        name: "Retam Mondal",
        role: "Web Developer"
    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <div>
              <button onClick={startLoading}>Start</button>
              <button onClick={stopLoading}>Stop</button>
              <h2>Loading : {loading}</h2>
            </div>
            <hr style={{ margin: '20px 0' }} />

            <Navbar />
            <hr style={{ margin: '20px 0' }} />
            
            <Routes>
                <Route path="/" element={<h2>Welcome To the World...</h2>} />
                
                {/* Method 1: Passing the entire object by spreading it (name="...", role="...") */}
                <Route path="/dashboard" element={<AuthDashboard {...user} />} />
                
                {/* Method 2: Passing individual props manually */}
                <Route path="/profile" element={<AuthProfile name={name} role={role} />} />
            </Routes>
        </div>
    );
}