// ------------------------------------------------------------------------------------------------------
// React Architecture: Virtual DOM, Render Lifecycles & React Elements
// ------------------------------------------------------------------------------------------------------
import './App.css';
import { useState } from 'react';
import Key from './Components/Key';

console.log("Outside Component");                               // This will NOT be re-rendered


// ======================================================================================================
// Part 1: Child Component Lifecycle & State
// ======================================================================================================
function Counter() {
    console.log("Inside Child Component");
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount((prev) => prev + 1)}>
                <h2 style={{ color: 'black' }}>Increment</h2>
            </button>
        </div>
    );
}


// ======================================================================================================
// Part 2: Real DOM vs. Virtual DOM
// ======================================================================================================
// 1. Real DOM: The actual HTML on screen. Very slow and expensive to update. Modifying one item in a 
//    10,000 item list might force the browser to recalculate and redraw massive parts of the screen.
// 2. Virtual DOM: A lightweight, invisible JavaScript Object in memory. It is a blazing fast blueprint 
//    of the UI. Updating it does NOT immediately change the screen.


// ======================================================================================================
// Part 3: React Component vs. React Element
// ======================================================================================================
// React Component -> The Recipe: A reusable function that accepts props and returns a React element tree.
// React Element   -> The Dish: A single plain JS object returned by a component or written in JSX.

// 💡 Let's look at what JSX actually becomes under the hood!

console.log(<h1>Hello, I am Retam...</h1>);
console.log(<h1 id='1'><h2>Hello</h2> <p>Hii</p></h1>);

// React sees this JavaScript Object (The Virtual DOM Node):
/*
{
    type: "h1",
    key: null,
    props: {
        id: '1',
        children: [
            { type: "h2", props: { children: "Hello" } },
            " ",                                                // The empty space between the tags!
            { type: "p", props: { children: "Hii" } }
        ]
    }
}
*/
// Props.children Behavior: If a tag has plain text, children is a string. If it contains nested 
// JSX, children becomes a JS Object (or an Array of objects).


// ======================================================================================================
// Part 4: The React Lifecycle (Render Phase vs. Commit Phase)
// ======================================================================================================
// Phase 1: Render Phase (The Thinking Phase)
// - Triggered by a State or Props change.
// - React executes your Component function from top to bottom.
// - It builds a Brand New Virtual DOM tree and compares it to the Previous Virtual DOM.
// - NO UI CHANGES happen here. It is invisible and purely in memory.

// Phase 2: Commit Phase (The Doing Phase)
// - React takes the calculated differences between the Old and New Virtual DOM.
// - It safely applies ONLY those specific changes to the Real DOM.
// - The user finally sees the changes on their screen!


// ======================================================================================================
// Part 5: The Main Parent Component
// ======================================================================================================
function App() {
    console.log("Inside Parent component");

    // 💡 Logging a Component invocation:
    // console.log(<App hii={"hello"}>Retam</App>); 
    // This creates a React Element Object with type: f App(), props: {hii: "hello", children: "Retam"}
    // If you notice, all Virtual DOM objects we return (except console logs) will be used to show UI.

    return (
        <div>
            <h1>Kaise Ho...</h1>
            <Counter />                                         {/* Renders the child to the Real DOM */}
            
            <hr />
            
            <Key />                                             {/* Renders the Key practice component */}
        </div>
    );
}

export default App;