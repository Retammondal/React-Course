// ------------------------------------------------------------------------------------------------------
// utils/withAuth.jsx - The Higher-Order Component
// ------------------------------------------------------------------------------------------------------
import React, { useState } from 'react';

// 1. The HOC takes a Component as its argument
function withAuth(Component) {
    
    // 2. It returns a brand new functional component
    return function (props) {
        
        // (Optional: You can add Auth validation logic here before returning the component)
        // e.g., if (!isLoggedIn) return <Redirect to="/login" />

        const name = "Retam";
        const [isLoggged, setIsLogged] = useState(false)

        function handleClick(e){
            e.preventDefault();
            const data = new FormData(e.target);
            const password = data.get("input")
            if (password === "Retam"){
                setIsLogged(true)
            }
            // This resets all input fields inside the form
            e.target.reset(); 
        }
        return (
            <div style={{ border: '2px solid red', padding: '10px', borderRadius: '8px' }}>
                <form action="" onSubmit={handleClick}>
                    <input type="text" name='input' placeholder='Enter Password' />
                </form>
                <br />
                {isLoggged ? (
                    <>
                        <p style={{ color: 'red', margin: 0 }}>[HOC Wrapper: Authentication Verified]</p>
                        
                        {/* 
                        Q: Why pass props as {...props} instead of props={props}?
                        A: 'props' comes in as an object: { name: "Retam", role: "Dev" }.
                            If we do props={props}, the child gets a nested object (props.props.name).
                            By spreading {...props}, React unpacks it so the child can destructure 
                            exactly what it needs directly: function Profile({ name, role })!
                        */}
                        <Component {...props} /> 
                    </>
                ) : (
                    <p>Wrong Password !!</p>
                )}
            </div>
        );
    };
}

export default withAuth;