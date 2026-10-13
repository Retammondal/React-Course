// ------------------------------------------------------------------------------------------------------
// The useState Hook & State Management
// ------------------------------------------------------------------------------------------------------
import React from 'react';
import { useState } from 'react'

// VS Code Tip: 'rfce' (React Functional Component Export) generates this component template instantly!

function Counter({count,setCount}) {
    
    // ---------------------------------------------------------
    // 1. The Problem: Normal Variables
    // ---------------------------------------------------------
    let counting = 0;                                      // Data updates in memory, but UI does NOT rerender
                                                        // when this changes!

    // ---------------------------------------------------------
    // 2. The Solution: useState() Hook
    // ---------------------------------------------------------
    // Hook: A function starting with 'use'. useState() solves our 2 main issues:
    // i.  Stores the Data (survives re-renders).
    // ii. Triggers a UI re-render when the data changes.
    
    // useState(defaultValue) returns an array: [CurrentValue, UpdaterFunction]
    // defaultValue can be anything -- Number/String/[]/{}
    const [value, setValue] = useState(0);              
    
    // 💡 AI Note: It's convention to use 'const' here instead of 'let'. We never reassign 'value' 
    // directly (like value = 2). We ONLY change it by calling the 'setValue' function!

    
    // ---------------------------------------------------------
    // 3. Updating State (Standard vs. Functional Updates)
    // ---------------------------------------------------------
    function increment() {
        counting++;                                        // Backend data updates, but UI stays 0.

        // Scenario A: Standard Update (React Batches these!)
        // setValue(value + 1); 
        // setValue(value + 1);
        // setValue(value + 1); 
        // Result: +1 (React looks at the snapshot, sees 0+1 three times, and just sets it to 1)

        // Scenario B: Callback/Functional Update (Dynamic)
        setValue((prev) => prev + 1);
        setValue((prev) => prev + 1);
        setValue((prev) => prev + 1);
        // Result: +3 (React passes the actual pending value to the next function in the queue)

        // Note: If the new value is exactly the same as the previous value, React aborts the render!
        
        setCount((prev) => prev+3)                        // Sends current state to Parent via Props
    }

    function decrement() {
        // 💡 AI Note: Avoid using pre-increments like setValue(--value). Mutating the state variable 
        // directly is an anti-pattern in React. Always calculate based on the value instead:
        setValue(value - 1);                            // ✅ Correct way (No delay, no direct mutation)
        setCount(value - 1)
    }


    // ---------------------------------------------------------
    // 4. The UI (Render)
    // ---------------------------------------------------------
    return (
        <>
            <h1>Counter</h1>

            <button onClick={increment} style={{backgroundColor:'black'}}>+</button>
            <p>Normal Variable: {counting}</p>
            <p>State Variable: {value}</p>
            <button onClick={decrement} style={{backgroundColor:'black'}}>-</button>
        </>
    );
}

export default Counter;


// ------------------------------------------------------------------------------------------------------
// Core React Concepts & Rules
// ------------------------------------------------------------------------------------------------------

// ==========================================
// 1. Props vs. State
// ==========================================
// Props -> External Data passed down by a parent. It is completely READ-ONLY (immutable).
// State -> Internal Data managed by the component itself. It CAN be changed (mutable).

// ==========================================
// 2. Rules of Hooks
// ==========================================
// 1. Call hooks ONLY at the Top Level of a component. Do not put them inside loops, if-statements, 
//    or nested functions!
// 2. Call hooks ONLY inside React Components (or custom hooks).

// ==========================================
// 3. The Re-Render Trigger
// ==========================================
// React components ONLY rerender (update the UI) when their STATE changes or PROPS change.
// Changing a normal JavaScript variable does absolutely nothing to the UI.