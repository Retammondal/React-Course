// ------------------------------------------------------------------------------------------------------
// 34-react-forms-and-refs-master.jsx - Controlled, Uncontrolled & useRef
// ------------------------------------------------------------------------------------------------------
import { useRef, useState } from 'react';

// ======================================================================================================
// Part 1: The Naive Approach (The Problem)
// ======================================================================================================
export default function App() {
    // PROBLEM 1: Will we use a new useState every time we add a new input field? (Messy code)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // PROBLEM 2: Performance! 
    // If you type "Retam", this component completely re-renders 5 times (once for every keystroke). 
    // console.log("Re-render"); 

    function signUp(e) {
        e.preventDefault();                             // Stop the default page refresh
        console.log("Form Submitted", { name:name, email: email, password: password });
    }

    return (
        <form onSubmit={signUp}>
            {/* Note: In React, 'for' becomes 'htmlFor' (since 'for' is a reserved JS loop keyword) */}
            <label htmlFor="name">Name : </label>
            <input type="text" id='name' onInput={(e) => setName(e.target.value)} />
            <button>Submit</button>
        </form>
    );
}


// ======================================================================================================
// Part 2: Controlled Components (React takes charge!)
// ======================================================================================================
// Controlled Component: The form data is handled directly by React component state.

export function Form() {
    // Solution to Problem 1: Group related data into a single object!
    // Why? Because they always go together to the backend as a single payload.
    const [form, setForm] = useState({ name: "Retam", email: "", password: "" }); 

    function signUp(e) {
        e.preventDefault();
        console.log("Form Submitted to Backend:", form);
    }

    function handleInput(e) {
        // e.target gives us the actual input element ==> <input type="text" id='name' name='name' />
        const { value, name } = e.target;               // Destructuring the element's attributes
        
        // 💡 AI Note: We use computed property names [name] to dynamically update the exact field!
        // It copies the previous state (...prev), then overrides ONLY the field that was just typed in.
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div>
            <h2>Controlled Form - Live Preview: {form.name}</h2>
            <form onSubmit={signUp}>
                
                {/* 
                  CRITICAL RULE: In a Controlled Component, always use the 'value' attribute. 
                  Never hardcode a string like value="Retam", or you will NEVER be able to type in it! 
                  Always bind it to your state (value={form.name}).
                */}
                <label>Name : </label>
                <input value={form.name} type="text" name='name' onInput={handleInput} />
                <br />
                
                <label>Email : </label>
                <input value={form.email} type="text" name='email' onInput={handleInput} />
                <br />
                
                <label>Password : </label>
                <input value={form.password} type="text" name='password' onInput={handleInput} />
                <br />
                
                <button>Submit</button>
            </form>
        </div>
    );
}


// ======================================================================================================
// Part 3: Uncontrolled Components (The DOM takes charge!)
// ======================================================================================================
// Uncontrolled Component: The form data is handled by the DOM itself. React doesn't track every 
// keystroke. We only grab the data at the very end when the user clicks Submit.

export function UncontrolledForm() {
    const [name, setName] = useState("");               // Only used to display the final result

    function signUp(e) {
        e.preventDefault(); 
        
        // e.target is the entire <form> element.
        // FormData is a built-in Browser API that extracts all inputs instantly!
        const formData = new FormData(e.target); 
        
        console.log(formData.get("email"));             // Gets the specific value of name='email'
        console.log(Object.fromEntries(formData));      // Converts the entire form into a clean Object!
        
        setName(() => formData.get("name"));            // Update state ONLY on submit (No lag!)
    }

    return (
        <div>
            <h2>Uncontrolled Form (Fastest) - Submitted: {name}</h2>
            <form onSubmit={signUp}>
                {/* 
                  CRITICAL RULE: In an Uncontrolled Component, NEVER use 'value'. Use 'defaultValue'! 
                  defaultValue gives it an initial string but still allows the user to freely edit it.
                */}
                <label>Name : </label>
                <input defaultValue={"Retam"} type="text" name='name' />
                <br />

                <label>Email : </label>
                <input defaultValue={""} type="text" name='email'/>
                <br />
                
                <label>Password : </label>
                <input defaultValue={""} type="text" name='password'/>
                <br />
                
                <button>Submit</button>
            </form>
        </div>
    );
}


// ======================================================================================================
// Part 4: The useRef Hook (Direct DOM Manipulation)
// ======================================================================================================
// useRef vs useState:
// useState -> Changing the value triggers a full component Re-render.
// useRef   -> Changing the value NEVER triggers a Re-render. It quietly holds data in the background!
// useRef is React's "escape hatch" to do direct DOM manipulation (like vanilla JS).

export function UncontrolledFormUseRef() {
    const inputReference = useRef(null);                // Creates an object: { current: null }
    const [name, setName] = useState("");

    function signUp(e) {
        e.preventDefault(); 
        const formData = new FormData(e.target); 
        setName(() => formData.get("name"));
        
        // 💡 Accessing the Real DOM directly using our ref:
        console.log(inputReference);                    // Gives an object pointing to the input tag
        console.log(inputReference.current.value);      // Gives the exact typed value
        
        // Direct DOM manipulation (changing color without React state!)
        inputReference.current.style.color = "red";

        // Proving it's exactly the same as vanilla JS:
        let nameTag1 = inputReference.current;
        let nameTag2 = document.querySelector("#name");
        
        // console.log(nameTag1 === nameTag2);          // Output: true (They are the exact same element!)
        // nameTag1.value and nameTag2.value will give the exact same output.
    }

    return (
        <div>
            <h2>Uncontrolled Form (useRef) - {name}</h2>
            <form onSubmit={signUp}>
                
                <label>Name : </label>
                {/* We attach our ref object directly to this input using the 'ref' attribute */}
                <input ref={inputReference} defaultValue={"Retam"} type="text" id='name' name='name' />
                <br />
                
                <label>Email : </label>
                <input type="text" name='email' />
                <br />
                
                <button>Submit</button>
            </form>
        </div>
    );
}


// ------------------------------------------------------------------------------------------------------
// 💡 The Ultimate Rule of Forms:
// ------------------------------------------------------------------------------------------------------
// Controlled (useState)   -> Use for Live UI updates, Instant Validation, and disabling buttons.
// Uncontrolled (FormData) -> Use for simple, massive forms where you only need data on Submit.