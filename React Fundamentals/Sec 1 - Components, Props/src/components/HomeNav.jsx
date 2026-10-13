// ------------------------------------------------------------------------------------------------------
// HomeNav.jsx - Destructuring, Default Props & Exporting
// ------------------------------------------------------------------------------------------------------
// Q: Why do we use Import and Export?
// A: To divide the code into multiple files and reuse components easily across the application.

console.log("HomeNav.jsx file executed");

// ---------------------------------------------------------
// Component Definition & Default Props
// ---------------------------------------------------------
// 'userData' is passed from the parent via props (e.g., userData={{name:"Nishant", isActive: true}}).
// We assign a DEFAULT value to userData just in case the parent forgets to pass it.

function HomeNav({ userData = { name: "Retam", isActive: false } }) {
    
    // Multiple-level destructuring: Extracting exact properties from the userData object
    let { isActive, name } = userData; 
    
    console.log("Navbar Component (Child) - Outside");
    
    return (                                                    // Returns the UI that React will display
        <ul>
            <li>Home - External</li>
            <li>Shop - External</li>
            <li>About Us - External</li>
            
            {/* Conditional rendering using the destructured props */}
            <li>{isActive ? name : "LogIn"}</li>
        </ul>
    );
}

// Exporting allows this component to be imported and used in other files (like App.jsx)
export default HomeNav;