// ------------------------------------------------------------------------------------------------------
// Todo.jsx - Forms, Inputs & Array State Management
// ------------------------------------------------------------------------------------------------------
import React, { useState } from 'react';

function Todo() {

    // ---------------------------------------------------------
    // 1. State Initialization
    // ---------------------------------------------------------
    // let value = "";                                      // Normal variable won't trigger UI updates
    const [value, setValue] = useState("");                 // State for the input field (String)

    // let todos = ["todo 1", "todo 2"];                    // Normal variable won't trigger UI updates
    const [todos, setTodos] = useState(["Todo 1", "Todo 2"]); // State for the list (Array)


    // ---------------------------------------------------------
    // 2. Event Handlers
    // ---------------------------------------------------------
    
    // Captures every keystroke and updates the 'value' state
    function printValue(e) {
        // e.target.value holds the actual text currently in the input box
        setValue(e.target.value);
    }

    // Handles the form submission (Triggered by button click OR pressing Enter)
    function addTodo(e) {
        e.preventDefault();                                 // Prevents the browser from reloading the page
        
        if (!value.trim()) {                                // Validation: Prevents adding empty/blank todos
            return;
        }
        
        // 💡 AI Note: Never mutate arrays directly in React state (e.g., prev.push(value)).
        // ALWAYS return a brand-new array using the spread operator [...prev] to trigger a re-render!
        setTodos((prev) => {
            return [...prev, value];                        // Copies old todos and adds the new one at the end
        });
        
        setValue("");                                       // Clears the input box after adding
    }


    // ---------------------------------------------------------
    // 3. The UI (Render)
    // ---------------------------------------------------------
    return (
        <div>
            <h1>ToDo</h1>
            
            {/* The form acts as a wrapper to catch submit events (like hitting 'Enter') */}
            <form onSubmit={addTodo}>
                
                {/* 
                  Controlled Component: The input's display value is locked to React State (value={value}). 
                  Without onChange={printValue}, the box would be frozen and you couldn't type in it! 
                */}
                <input value={value} type="text" onChange={printValue} />
                
                {/* 
                  We pass the function REFERENCE (printValue), NOT the invocation (printValue()). 
                  React will call it by default and pass the event object (e) when triggered. 
                */}
                <button>Add</button>
            </form>

            <ul>
                {
                    todos.map((todoValue, index) => {
                        // 💡 AI Note: React requires a unique 'key' prop for mapped list elements 
                        // so it can efficiently track exactly which item is added, changed, or removed.
                        return <li key={index}>{todoValue}</li>;
                    })
                }
            </ul>
        </div>
    );
}

export default Todo;