// ------------------------------------------------------------------------------------------------------
// react-router-dom-master.jsx - Routing, Navigation & URLs
// ------------------------------------------------------------------------------------------------------
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Outlet } from 'react-router-dom';
import './App.css';

// ======================================================================================================
// Setup Notes: React Router DOM
// ======================================================================================================
// 📦 npm is like a Playstore that provides packages we can use in Node/React applications.
// Install it via terminal: npm i react-router-dom (You will find it in package.json dependencies).
// 
// Core Components to remember:
// 1. <BrowserRouter> -> Enables Routing. You MUST wrap your <App /> inside this in your main.jsx!
// 2. <Routes>        -> Decides which page is shown. It wraps all your individual Route rules.
// 3. <Route>         -> The actual routing rule (e.g., path="/about" element={<AboutUs/>}).


// ======================================================================================================
// Part 1: Mock Data & Standard Components
// ======================================================================================================
const products = [
    { id: 1, title: "Laptop" },
    { id: 2, title: "Mobile" }
];

function Home() {
    return (
        <div>
            <h2>Home</h2>
            <p>Here All the Home Page will be shown...</p>
        </div>
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

function ContactUs() {
    return (
        <>
            <h2>Contact Us</h2>
            <p>Provide Contact Information</p>
        </>
    );
}


// ======================================================================================================
// Part 2: Layouts, <Link>, and The <Outlet>
// ======================================================================================================
function Navbar() {
    return (
        <>
            <ul>
                {/* 
                  Link vs <a> tag: 
                  In React, NEVER use <a href="..."> for internal links because it forces a full page 
                  reload! Use <Link to="..."> instead. It updates the URL and changes components instantly.
                  (Note: Only use <a> tags when redirecting to an external website like google.com).
                */}
                <li style={{ cursor: 'pointer' }}><Link to={"/"}>Home</Link></li>
                <li style={{ cursor: 'pointer' }}><Link to={"/product-page"}>Product</Link></li>
                <li style={{ cursor: 'pointer' }}><Link to={"/about-us"}>About Us</Link></li>
                <li style={{ cursor: 'pointer' }}><Link to={"/login"}>Login</Link></li>
                <li><a href="/contact-us">Contact Us (Will cause reload)</a></li>
            </ul>
            
            <hr />
            
            {/* 
              💡 AI Note on The Outlet Process:
              Think of <Outlet /> as a blank picture frame inside your Navbar layout.
              When a user goes to website.com/about-us:
              1. React Router matches the parent Route "/" and renders this <Navbar /> component.
              2. It sees the child route matches "/about-us".
              3. It takes the <AboutUs /> component and injects it exactly where <Outlet /> is written!
            */}
            <Outlet />
        </>
    );
}


// ======================================================================================================
// Part 3: Dynamic Routes & useParams()
// ======================================================================================================
// Parameters in URLs:
// Query string (Old way): localhost:5173/product?id=1
// Dynamic Route (React way): localhost:5173/product/1
// In our Route setup, we define dynamic segments using a colon: path="/product-page/:id"

function Product() {
    // useParams() returns an object of the dynamic variables in the URL.
    // e.g., If the URL is /product-page/2, useParams() returns { id: "2" }
    const { id } = useParams(); 

    // Convert the string ID from the URL into a Number to find it in our mock database
    const data = products.find((p) => p.id === Number(id));

    return (
        <>
            <h2>Product Page</h2>
            <p>Here All the Product details will be shown...</p>
            <h3>Products List</h3>
            <div>
                {/* Dynamically generating links based on the product ID */}
                {products.map((p) => (
                    <section key={p.id}>
                        <Link to={`/product-page/${p.id}`}>{p.title}</Link>
                    </section>
                ))}
            </div>
            {/* Safe rendering: If data exists, show title. If undefined, show error. */}
            <div>
              <h3>--- Product Clicked on ---</h3>
              {data ? <p>Viewing: {data.title}</p> : <p>No Products Found</p>}
            </div>
        </>
    );
}


// ======================================================================================================
// Part 4: Programmatic Navigation (useNavigate)
// ======================================================================================================
function Dashboard() {
    return (
        <div>
            <h2>Hello, Retam</h2>
            <p>Welcome to Dashboard</p>
        </div>
    );
}

function LoginForm() {
    // useNavigate() provides a function that lets you change routes using JavaScript logic.
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();                     // Must prevent default form submission reload!
        
        // Imagine checking a password here... if success:
        navigate("/dashboard");                 // Programmatically sends the user to the dashboard
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" name='username' placeholder="Username" />
                <button>Login (Logic)</button>
                
                {/* A Link inside a button works, but you CANNOT attach logic (like password checks) */}
                <button type="button"><Link to={"/dashboard"}>Login (Direct Link)</Link></button>
            </form>
        </div>
    );
}


// ======================================================================================================
// Part 5: The App Component (Connecting the Routes)
// ======================================================================================================
function App() {
    return (
        <Routes>
            
            {/* 
              PARENT ROUTE (The Layout): 
              Anything nested inside this route will automatically have the <Navbar /> rendered above it.
              Note: If we give multiple routes the exact same path, only the FIRST matching route renders.
            */}
            <Route path="/" element={<Navbar />}>
                
                {/* Child Routes - Injected into the Navbar's <Outlet /> */}
                <Route path="/" element={<><Home /> <ContactUs /></>} />    
                
                <Route path="/product-page" element={<Product />}>
                    {/* Dynamic Route: The ':id' is a placeholder variable for useParams() */}
                    {/* E.g., /product-page/:id/:title/offer -> offer is fixed, id/title are dynamic */}
                    <Route path="/product-page/:id" element={<Product />} />
                </Route>
                
                <Route path="/about-us" element={<AboutUs />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Route>

            {/* 
              STANDALONE ROUTES:
              These routes are NOT inside the "/" parent route, so they will NOT have a Navbar! 
            */}
            <Route path='/login' element={<LoginForm />} />
            <Route path='/contact-us' element={<ContactUs/>}/>

            {/* 
              FALLBACK ROUTE (The 404 Page):
              The '*' path means "Catch Everything Else". If the user types a URL that doesn't match 
              any of the routes above, React Router defaults to this one.
            */}
            <Route path='*' element={
                <div>
                    <img 
                        src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" 
                        alt="Not Found" 
                        style={{ width: '200px' }} 
                    />
                    <h2>Page Not Found</h2>
                </div>
            } />
            
        </Routes>
    );
}

export default App;