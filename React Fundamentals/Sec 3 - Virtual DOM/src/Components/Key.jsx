// ------------------------------------------------------------------------------------------------------
// Reconciliation, Diffing Algorithm & Keys
// ------------------------------------------------------------------------------------------------------
import React from 'react';

// ======================================================================================================
// Part 1: Reconciliation & The Diffing Algorithm
// ======================================================================================================
// How does React know exactly what to change in the Commit Phase? It uses "Reconciliation" powered 
// by a Diffing Algorithm to compare the New Virtual DOM against the Old Virtual DOM.

// The Rules of Diffing:
// 1. Different Element Types (e.g., <div> to <span>): 
//    React destroys the old element and its entire child tree, rebuilding from scratch.
// 2. Same Element Types (e.g., <div className="red"> to <div className="blue">): 
//    React keeps the element on screen but simply updates the changed attributes.
// 3. Same Component at Same Position: 
//    React keeps the component instance alive (state is preserved) and just passes new props down.


// ======================================================================================================
// Part 2: The Magic of the 'key' Prop
// ======================================================================================================
// When mapping lists, React compares them top to bottom. If a new item is inserted at the top, 
// React gets confused and brutally rebuilds the entire list. Keys give elements a permanent identity!

// 🔑 Rules of Keys:
// 1. Unique Among Siblings: They only need to be unique inside that specific .map() loop.
// 2. Stable: Keys MUST remain exactly the same across re-renders (NEVER use Math.random()!).
// 3. Prefer IDs: Always prefer database IDs (e.g., user.id) over simple strings.
// 4. Secret Prop: React absorbs the key prop. If you log props.key inside a child, it is undefined.

function Key() {
    const students = [
        { "id": 101, "name": "Aditya" },
        { "id": 102, "name": "Zoya" },
        { "id": 103, "name": "Gagan" },
        { "id": 104, "name": "Fariha" },
        { "id": 105, "name": "Alok" },
        { "id": 106, "name": "Ankit" },
        { "id": 107, "name": "Satyam" },
        { "id": 108, "name": "Debadrita" }
]
    
    return (
        <div>
            <h1>Student's List</h1>
            <ul>
                {students.map(({id,name}, index) => (
                    
                    // ==============================================================================
                    // 🚨 The Array Index Trap (Why key={index} is dangerous)
                    // ==============================================================================
                    // Beginners often use the array index as a key (key={index}).
                    // This is fine ONLY IF the list is strictly static (never changes).
                    // 
                    // Why it fails on dynamic lists:
                    // If Index 0 is "Apple" and you delete it, "Banana" moves up and becomes Index 0.
                    // React sees Index 0 is still there, assumes the element is exactly the same, 
                    // and just changes the text. If the user had typed data into a box next to 
                    // "Apple", it will now accidentally attach to "Banana"!
                    
                    <li key={id}>{name}</li>        // ✅ Using unique string instead of index
                    
                ))}
            </ul>
        </div>
    );
}

export default Key;