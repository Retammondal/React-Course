// ------------------------------------------------------------------------------------------------------
// App.jsx - Prop Drilling, Context Consumption & React 19 Features
// ------------------------------------------------------------------------------------------------------
import { use, useContext } from 'react';
import { UserContext } from './main';
import { ThemeContext } from './context/ThemeContext';
import './App.css';

// ======================================================================================================
// Part 1: The Problem -> Prop Drilling
// ======================================================================================================
// Prop Drilling: Passing data from a high-level component down to lower levels through intermediate 
// components that don't even need the data (like Parent and Child).

function GrandChild() {
    return (
        <div style={{ backgroundColor: 'blue', padding: '20px' }}>
            {/* GrandChild has NO access to userName unless we pass it down manually at every step */}
            <h4>GrandChild (No Data)</h4>
        </div>
    );
}

function Child({ userName }) {
    return (
        <div style={{ backgroundColor: 'green', padding: '20px' }}>
            <h3>Child - {userName}</h3>
            <GrandChild />
        </div>
    );
}

function Parent({ userName }) {
    return (
        <div style={{ backgroundColor: 'brown', padding: '20px' }}>
            <h2>Parent</h2>
            {/* Parent is forced to receive userName just so it can pass it to Child! */}
            <Child userName={userName} />
        </div>
    );
}

export default function App() {
    let userName = "Retam";
    return (
        <div style={{ backgroundColor: 'rebeccapurple', padding: '20px' }}>
            <h1>App (Prop Drilling)</h1>
            <Parent userName={userName} />
        </div>
    );
}


// ======================================================================================================
// Part 2: The Solution -> Context API
// ======================================================================================================
// Context API acts as Global Data. You bypass the middleman and give data directly to who needs it!

function GrandChildContext() {
    // 3. Accessing the Value: Use the useContext hook and pass the Context object you created!
    const value = useContext(UserContext);
    
    return (
        <div style={{ backgroundColor: 'blue', padding: '20px' }}>
            <h4>GrandChild Context - {value}</h4>
        </div>
    );
}

function ChildContext() {
    return (
        <div style={{ backgroundColor: 'green', padding: '20px' }}>
            {/* Child doesn't need to accept props anymore! */}
            <h3>Child Context</h3>
            <GrandChildContext />
        </div>
    );
}

function ParentContext() {
    return (
        <div style={{ backgroundColor: 'brown', padding: '20px' }}>
            <h2>Parent Context</h2>
            <ChildContext />
        </div>
    );
}

export function AppContext() {
    const value = useContext(UserContext);
    return (
        <div style={{ backgroundColor: 'rebeccapurple', padding: '20px' }}>
            <h1>App Context - {value}</h1>
            <ParentContext />
        </div>
    );
}


// ======================================================================================================
// Part 3: Custom Theme Provider & React 19's `use()` Hook
// ======================================================================================================
/*
    | Feature                      | useContext(MyContext)            | use(MyContext) (React 19)      |
    |------------------------------|----------------------------------|--------------------------------|
    | Classification               | React Hook                       | Special React API / Function   |
    | Where it can be called       | Top level of the component ONLY  | Anywhere (if blocks, loops!)   |
    | Early return compatibility   | Throws errors after early return | Safe to use after early return |
    | Capabilities                 | Context consumption only         | Consumes Context & Promises    |
*/

// ======================================================================================================
// Project :
// ======================================================================================================

function ChangeTheme() {
    // Using React 19's 'use()' API instead of useContext!
    // Destructuring 'setTheme' from our Custom ThemeProvider object.
    const { setTheme } = use(ThemeContext); 
    
    return (
        <>
            <div>Change Theme</div>
            <select onChange={(e) => setTheme(e.target.value)}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
            </select>
        </>
    );
}

export function ExtraApp() {
    // Destructuring 'theme' from our Custom ThemeProvider object.
    const { theme } = use(ThemeContext);

    return (
        <div style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000', padding: '20px' }}>
            <p>Theme Applied : {theme}</p>
            <ChangeTheme />
        </div>
    );
}