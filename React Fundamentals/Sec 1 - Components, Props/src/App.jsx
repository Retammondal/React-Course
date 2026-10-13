// ------------------------------------------------------------------------------------------------------
// React JSX Fundamentals & Syntax Rules
// ------------------------------------------------------------------------------------------------------
// JSX is the magic syntax of React. 
// It allows us to write HTML-like code directly inside our JavaScript files. 
// Under the hood, Vite converts this HTML-like syntax into complex JavaScript objects.

// Golden Rule : 
// Return a Single Parent Element


// ------------------------------------------------------------------------------------------------------
// main.jsx - The Entry Point & Execution Flow
// ------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------
// Execution Flow Explained:
// ---------------------------------------------------------
// 1. ENTRY POINT:            The compiler enters 'main.jsx' first.
// 2. DEPENDENCY PAUSE:       It hits 'import' statements(Dependencies) and pauses 'main.jsx'.
// 3. COMPONENT EVALUATION:   It jumps into 'App.jsx' (and its sub-imports) 
//                            to run files and store functions in memory.
// 4. RESUMING MAIN:          Once all dependencies are evaluated, execution returns to 'main.jsx'.
// 5. THE RENDER:             'createRoot' hooks into the 'root' div in 'index.html' and 
//                            triggers the App render.


// ------------------------------------------------------------------------------------------------------
// Import Dependencies
// ------------------------------------------------------------------------------------------------------
// Dependencies are external code libraries, packages, or modules 
// that project relies on to function properly
 
import Footer2, { Footer as FooterUpdate } from "./components/Footer"; 
import HomeNav from "./components/HomeNav";
import Product from "./components/Product";

let name = "Retam Mondal";
console.log("App.jsx File executed");

let friendList = ["Amit", "Rahul", "Priya", "Sneha", "Vikram", "Neha", "Arjun"];

const user = {
    name: "Nishant",
    isActive: true,
    isLoggedIn: true
};

const products = [
    { id: 1, title: "Nike Air Jordan", price: 12995 },
    { id: 2, title: "Adidas Ultraboost", price: 17999 },
    { id: 3, title: "Puma RS-X", price: 8999 }
];

// ------------------------------------------------------------------------------------------------------
// Internal Component/ Child Component (Navbar, printName)
// ------------------------------------------------------------------------------------------------------
// A Component is the core building block of React. It is simply a JavaScript function that returns JSX.
// Two Types of Component : Parent Component & Child Component

// Q: Why are React Components ALWAYS written with a Capital first letter?
// A: So React can differentiate between standard HTML tags (<app>) and Custom Components (<App />).

function printName() {
    console.log(user.name);                                     // Will print to the browser console
}

function Navbar() {
    console.log("Navbar Component (Internal Child)");
    return (
        <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>About Us</li>
        </ul>
    );
}

// ------------------------------------------------------------------------------------------------------
// Main App Component (Parent)
// ------------------------------------------------------------------------------------------------------

function App() {
    console.log("App Component rendered");
    
    return (
        // Rule 1: Fragments (<>...</>) 
        // React requires you to return a single parent element. Fragments group them without adding a div.
        <>
            {/* ============================================================================== */}
            {/* --- 7 FUNDAMENTAL JSX RULES --- */}
            {/* ============================================================================== */}
            
            <div>Hello, How are You?</div>
            
            {/* Rule 2: Evaluating JS inside JSX using curly braces {} */}
            <p>5+6</p>                                          {/* Output: "5+6" (Rendered as text) */}
            <p>{5 + 6}</p>                                      {/* Output: "11"  (Evaluated as JS) */}
            
            {/* Rule 3: Rendering Arrays using .map() */}
            <ul>
                {friendList.map((c, index) => {
                    return <li key={index}>{c}</li>;            {/* Note: React requires a 'key' prop! */}
                })}
            </ul>

            {/* Rule 4: Conditional Rendering */}
            <p>
                {/* Standard if/else blocks CANNOT be written inside JSX curly braces. */}
                {/* We MUST use the Ternary Operator for inline conditional logic: */}
                {user.isLoggedIn ? `${user.name} is online` : `Offline`}
            </p>
            <br />

            {/* Rule 5: Event Handling */}
            {/* Pass the function REFERENCE. Do NOT invoke it immediately like onClick={printName()} */}
            <button onClick={printName}>Click On Me</button>
            <br />

            {/* Rule 6: Self-Closing Tags */}
            {/* Tags like <img>, <input>, or <br> MUST have a closing slash in JSX */}
            <img src="/favicon.svg" alt="Placeholder" width={24} height={24} />

            {/* Rule 7: CSS Classes */}
            {/* Since 'class' is a reserved JS keyword, React uses 'className' for HTML attributes */}
            <div className="my-container">Styled Box</div>
            
            <hr />

            {/* ============================================================================== */}
            {/* --- COMPONENT RENDERING & PROPS --- */}
            {/* ============================================================================== */}

            {/* 1. Component Invocation: <Navbar/> (Self-closing) or <Navbar></Navbar> */}
            <Navbar />       
            <Navbar></Navbar> 

            <h1>Hii, I am {name}</h1>
            
            {/* Passing 'user' object down as a prop named 'userData' */}
            <HomeNav userData={user} />        

            <br />

            {/* 2. Inline CSS Styling (Must be an object with camelCase properties) */}
            <div style={{ backgroundColor: "whitesmoke", color: "black" }}>
                
                {/* 3. Rendering Lists via .map() */}
                {/* Q: Why can't we use forEach here? */}
                {/* A: forEach returns 'undefined'. JSX needs an array of elements (use .map). */}
                {
                    products.map((product, i) => {
                        return (
                            <article key={i}>
                                <p>{product.title}</p>
                                <p>{product.price}</p>
                            </article>
                        );
                    })
                }
            </div>

            <br />

            {/* 4. Rendering Lists using a Custom Component + Destructuring */}
            <div style={{ backgroundColor: "whitesmoke", color: "black" }}>
                {
                    products.map(({ title, price }, i) => {
                        // Passing destructured data into our Product component via Props.
                        // Data flow is strictly Unidirectional (Parent -> Child).
                        return <Product key={i} title={title} price={price} />;
                    })
                }
            </div>
            
            {/* 5. Testing Default Props */}
            <Product /> 
            
            {/* 6. Testing the 'children' Prop */}
            <Product title="Retam" price={250}>
                Hello
                Hii
                <p>Kaise Hoo...</p>
            </Product>

            <FooterUpdate />
            <Footer2 />
        </>
    );
}

export default App;