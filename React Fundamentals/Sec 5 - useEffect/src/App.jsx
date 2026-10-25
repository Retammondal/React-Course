// ------------------------------------------------------------------------------------------------------
// 36-react-useeffect-and-lifecycle.jsx
// ------------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';


// ======================================================================================================
// Concept 1: What is a Side Effect?
// ======================================================================================================
// React Component Main Task: Return JSX based on State & Props.
// Anything outside of this main task (fetching data, timers, etc.) is called a "Side Effect".
// 
// Common Examples of Side Effects:
// - Fetching data: Asking a database or an API on the internet for a list of user profiles.
// - Changing the browser title: Updating document.title so the tab says "New Messages (3)".
// - Timers: Running setTimeout or setInterval.
// - Manual DOM changes: Directly scrolling the window or focusing a text input box.
// - Subscriptions: Listening to a live WebSocket or chat feed.


// ======================================================================================================
// Part 1: The Problem (Side Effects WITHOUT useEffect)
// ======================================================================================================
export function AppProblem({ title = "Without useEffect" }) {
    const [productCount, setProductCount] = useState(0);
    const [name, setName] = useState("");

    // 🚨 THE INFINITE LOOP TRAP:
    // Fetch is async. It finishes, calls setProductCount() which updates state and triggers a Re-render.
    // On Re-render, React reads this code again from top to bottom, firing ANOTHER fetch...
    // This causes an infinite loop of requests and crashes your app!

    /*
    fetch("https://dummyjson.com/products?limit=0")
        .then((res) => res.json())
        .then((data) => setProductCount(data.total)); 
    */

    return (
        <div>
            <p>App - {productCount}, {title}</p>
            {/* On every keystroke, state updates, component re-renders, and fetch runs AGAIN! */}
            <input type="text" onInput={(e) => setName(e.target.value)} />
            <hr />
        </div>
    );
}


// ======================================================================================================
// Part 2: The Solution (useEffect Dependency Rules)
// ======================================================================================================
// Syntax: useEffect(callbackFunction, [DependencyArray])
// Note: Side Effects in useEffect ALWAYS happen at the very end, AFTER the main React UI has rendered.

// Rule 1: useEffect(func)         -> Runs after EVERY render (basically the same problem as above).
// Rule 2: useEffect(func, [])     -> Empty Array. Runs exactly ONCE after the first render (Mount).
// Rule 3: useEffect(func, [a, b]) -> Runs after first render, AND whenever 'a' or 'b' changes.

// Syntax : 
// useEffect(() => {
//   // Setup: synchronize something

//   return () => {
//     // Cleanup: stop synchronization
//   };
// }, [dependencies]);

export function UseEffectMount({ title = "useEffect Mount" }) {
    const [productCount, setProductCount] = useState(0);
    const [product, setProduct] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=0")
            .then((res) => res.json())
            .then((data) => {
                setProductCount(data.total);
                setProduct(data.products);              // Now, this fetch safely runs ONLY ONE time!
            });
    }, []);                                             // <-- Rule 2: Empty dependency array

    return (
        <div>
            <p>App - {productCount}, {title}</p>
            <input type="text" onInput={(e) => setName(e.target.value)} />
            <p>Hello, {name || "Retam"}</p>
            {/* Typing here triggers re-renders, but the fetch inside useEffect will NOT run again! */}
            
            <table style={{ margin: '0 auto'}}>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product ID</th>
                </tr>
              </thead>
              <tbody>
                  {product.slice(0,10).map((p)=>{
                    return (
                      <tr>
                        <td key={p.id}>{p.title}</td>
                        <td key={p.id}>{p.id}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            <hr />
        </div>
    );
}


// ======================================================================================================
// Part 3: Running Effects on Specific Variable Changes
// ======================================================================================================
export function UseEffectRender() {
    const [productCount, setProductCount] = useState(0);
    const [name, setName] = useState("");

    useEffect(() => {
        console.log("Fetch triggered because 'name' changed!");
        
        fetch("https://dummyjson.com/products?limit=0")
            .then((res) => res.json())
            .then((data) => setProductCount(data.total));
            
    }, [name]);                                         // <-- Rule 3: Array with a State Variable
    
    // Note: Normal JS variables won't work in the dependency array. You must use State variables.

    return (
        <div>
            <p>App Count: {productCount}</p>
            <label htmlFor="name">Name : </label>
            <input id='name' type="text" onInput={(e) => setName(e.target.value)} />
            <p>Whenever you type, 'name' changes, triggering the API fetch again!</p>
            <hr />
        </div>
    );
}


// ======================================================================================================
// Part 4: Component Lifecycle & The Cleanup Function
// ======================================================================================================
// React Component LifeCycle:
// 1. Mount Phase    --> Component appears on the UI (On the First Run).
// 2. Updating Phase --> State and props values update.
// 3. Unmount Phase  --> Component is removed from the UI.
//
// Rule: useEffect can ONLY return undefined, OR a Cleanup Function.
// During a re-render, React runs the Cleanup Function FIRST, then runs the body of the new useEffect.
// It also runs when the component fully Unmounts.

function Timer() {
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            setLoading(false);                          // Turns off loading screen after 2 seconds
            const timerId = setInterval(()=>{
              setTimer((prev)=>prev+1);
            },1000)
        }, 2000);


        // Returning the Clean Up Function
        return () => {
            console.log("Timer Component Unmounted -> Running Clean Up!");
            clearTimeout(timeoutId);                // cancels timeout if unmounted before 2s

            
            // CRITICAL: If we don't clear the interval, it will keep running in the browser's 
            // background memory forever, even after this component is removed from the screen!
        };
    }, []);

    // Conditional Rendering for the Loader
    if (loading) {
        return <div className="loader" style={{margin: '0 auto'}}>Loading Timer...</div>;
    }

    return (
        <div>
            <h2>Timer Component</h2>
            <h3>{timer} Seconds</h3>
        </div>
    );
}

export function TimerUse() {
    const [showTimer, setShowTimer] = useState(true);

    return (
        <div>
            <br />
            <button 
                onClick={() => setShowTimer((prev) => !prev)} 
                style={{ backgroundColor: 'black', color: 'white', fontSize:'25px', marginBottom:'10px', borderRadius:'10px'}}
            >
                Toggle Timer Component
            </button>
            
            {/* Short Circuiting Concept -> a && b. If 'a' is true, then 'b' executes/renders */}
            {showTimer && <Timer />}
            <br />
        </div>
    );
}


export default App;