// ------------------------------------------------------------------------------------------------------
// react-manual-routing.jsx - Conditional Rendering (The "Jugaad" Router)
// ------------------------------------------------------------------------------------------------------
import { useState } from 'react';


// ======================================================================================================
// Part 1: The Page Components
// ======================================================================================================
// These are simple dummy components representing different "pages" in our application.

function Home() {
    return (
        <>
            <h2>Home</h2>
            <p>Here All the Home Page will be shown...</p>
        </>
    );
}

function Product() {
    return (
        <>
            <h2>Product Page</h2>
            <p>Here All the Product details will be shown...</p>
        </>
    );
}

function AboutUs() {
    return (
        <>
            <h2>About Us Page</h2>
            <p>Here All the Company information will be shown...</p>
        </>
    );
}


// ======================================================================================================
// Part 2: Manual Routing via State
// ======================================================================================================
// This acts as a Single Page Application (SPA). Everything happens on a single HTML page without 
// the browser ever actually refreshing or jumping to a new document.

function Navbar() {
    // We use state to track which "page" the user wants to see. Defaults to "home".
    const [page, setPage] = useState("home");

    return (
        <>
            <p style={{borderBottom:'solid 1px white'}}></p>
            <ul>
                {/* Clicking these updates the state, triggering a Re-render, NOT a page Reload */}
                <li style={{ cursor: 'pointer' }} onClick={() => setPage("home")}>Home</li>
                <li style={{ cursor: 'pointer' }} onClick={() => setPage("productPage")}>Product</li>
                <li style={{ cursor: 'pointer' }} onClick={() => setPage("aboutUs")}>About Us</li>
            </ul>

            <hr />

            {/* 
              ===========================================================================================
              Conditional Rendering (The "Jugaad" Router)
              ===========================================================================================
              Just a conditional statement: if the left side (page === "...") is true, the right 
              side (<Component/>) will render. It acts just like HTML header navigation, but here 
              it's all on a single page and WITHOUT a browser reload.

              💡 AI Note: Why is this "just a jugaad" and not a real solution?
              - The URL never actually changes (e.g., website.com/product). 
              - The user cannot bookmark or share a link to the Product page.
              - The Browser Back/Forward buttons will not work!
              - For real applications, we use React Router DOM (which we learned in the previous file).
            */}
            
            {page === "home" && <Home />}
            {page === "productPage" && <Product />}
            {page === "aboutUs" && <AboutUs />}

            {/* 
              ===========================================================================================
              Concept: Reload vs. Re-render (ReRun)
              ===========================================================================================
              Reload: Refreshes the ENTIRE webpage from the server. It destroys and resets all state.
              
              Re-render: Updates ONLY a specific UI component in memory when its data (state/props) 
              changes. It keeps the rest of the application fully intact and is incredibly fast.
            */}
            <p style={{borderBottom:'solid 1px white'}}></p>
        </>
    );
}

export default Navbar;