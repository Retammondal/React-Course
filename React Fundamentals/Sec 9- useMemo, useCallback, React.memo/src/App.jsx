// ------------------------------------------------------------------------------------------------------
// (useMemo, useCallback, React.memo)
// ------------------------------------------------------------------------------------------------------
import React, { useCallback, useMemo, useState, memo } from 'react';
import './App.css';

// ======================================================================================================
// Concept: Memoization
// ======================================================================================================
// Memoization is an optimization technique that speeds up programs by storing the results of 
// expensive function calls and returning the cached result when the same inputs occur again.

// ======================================================================================================
// Part 1: The Problem (Expensive Calculations)
// ======================================================================================================
// If we have some Function/Task that takes a lot of time to load, calling it directly inside our 
// component means EVERY time the 'count' state changes, the App re-renders and this loop runs again.
// Result: Even if the inputs are the same, it reloads and the buttons start lagging!

function calculateTotalSum() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
        sum += i;
    }
    return sum;
}


// ======================================================================================================
// Main App Component
// ======================================================================================================
export default function App() {
    const [count, setCount] = useState(0);

    // ==================================================================================================
    // Part 2: useMemo (Caching a Value)
    // ==================================================================================================
    // Syntax: useMemo(callbackFunction, [dependencyArray])
    // useMemo returns a VALUE (while useEffect returns a cleanup function or undefined).
    // The value returned from useMemo is stored in 'memoizedSum' and will ONLY recalculate if a 
    // dependency in the array changes. Because it's [], it runs once and caches it forever!

    const memoizedSum = useMemo(() => {
        return calculateTotalSum();
    }, []);


    // ==================================================================================================
    // Part 3: useCallback (Caching a Function Reference)
    // ==================================================================================================
    // The Function Reference Trap:
    // If we write a normal function `function printHello() { ... }`, during the App component re-render, 
    // the function inside the component re-runs and its memory reference keeps changing.
    // Because the reference changes, the system thinks the function changed, which forces the 
    // ChildMemo component to re-render even though the actual code inside printHello is exactly the same!

    // Solution: useCallback()
    // By passing the function into useCallback, it caches the function reference itself so it won't 
    // change on every App re-render. Note: useCallback returns the callback function itself!

    const memoizedPrintHello = useCallback(() => {
        console.log("Hii Hello JII");
    }, []);

    // 💡 Method 2 of passing props: Grouping them in an object
    let obj = {
        value: 34,
        printHello: memoizedPrintHello
    };

    return (
        <div>
            <h2>Memoization Masterclass</h2>
            <p>Value : {count}</p>
            
            <button onClick={() => setCount((pre) => pre + 1)}>Increase</button>
            <button onClick={() => setCount((pre) => pre - 1)}>Decrease</button>
            <button onClick={() => setCount(0)}>Reset</button>

            {/* <p>Total Sum (Laggy): {calculateTotalSum()}</p> */}
            <p>Total Sum (Fast/Cached) : {memoizedSum}</p>

            <hr style={{ margin: '20px 0' }} />

            {/* 
              Now the time I will use useState -- everytime the App function will re-render, 
              ChildComponent will re-render too -- YES.
              But is it needed? If yes, okay. But here it's "faltu" (useless waste of resources).
            */}
            <ChildComponent /> 
            
            {/* We unpack the object directly into props using the spread operator {...obj} */}
            <ChildMemo {...obj} /> 
            
        </div>
    );
}


// ======================================================================================================
// 💡 The Ultimate Memoization Summary Table
// ======================================================================================================
/*
| Feature      | `useMemo`                        | `useCallback`                       | `React.memo`                          |
| :---         | :---                             | :---                                | :---                                  |
| Purpose      | Cache calculated values          | Cache function references           | Skip unnecessary component re-renders |
| Returns      | Calculated value                 | Function                            | Memoized component                    |
| Dependencies | Dependency array                 | Dependency array                    | Compares props                        |
| Common use   | Expensive filtering/calculations | Functions passed to memoized childs | Components with stable props          |
*/


// ======================================================================================================
// Child Components (Included here to keep everything in one file!)
// ======================================================================================================

// 1. Standard Child -> Will painfully re-render every time we click Increase/Decrease in App!
function ChildComponent() {
    console.log("Child Component Re-render (Waste of resources!)");
    return (
        <div style={{ padding: '10px', backgroundColor: '#ffe4e1', marginTop: '10px' }}>
            <p>ChildComponent (Standard)</p>
        </div>
    );
}

// 2. React.memo -> The Component Cacher
// memo(Component) is a performance optimization tool that skips re-rendering a component if its 
// props haven't changed. (useMemo caches a single value, memo caches a whole component).
// Because we passed `memoizedPrintHello` using useCallback, the prop stays identical, and 
// React.memo successfully blocks the re-render!

const ChildMemo = memo(function ChildMemo(props) {
    // props incoming: { value: 34, printHello: ƒ }
    const { printHello } = props; 
    
    console.log("Child Memo Rendered! (Will only log ONCE on initial load)");
    
    return (
        <div style={{ padding: '10px', backgroundColor: '#e0ffe0', marginTop: '10px' }}>
            <p>Child Component Memo (Protected from re-renders!)</p>
            <button onClick={printHello}>Print Hello in console</button>
        </div>
    );
});