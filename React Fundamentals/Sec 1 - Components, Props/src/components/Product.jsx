// ------------------------------------------------------------------------------------------------------
// Product.jsx - Props, Inline Destructuring & The 'children' Prop
// ------------------------------------------------------------------------------------------------------
import React from 'react';

// ---------------------------------------------------------
// Method 1: Standard Props Object (Commented out)
// ---------------------------------------------------------
/*
export default function Product(props) {
    // 'props' is an Object (e.g., {title, price}) passed down as attributes from the parent.
    return (
        <article>
            <p>{props.title}</p>
            <p>{props.price}</p>
        </article>
    );
}
*/

// ---------------------------------------------------------
// Method 2: Inline Destructuring with Default Values
// ---------------------------------------------------------
// Instead of writing 'props.title' everywhere, we destructure immediately in the parameters.
// We also set default values ("anonymous", 0) in case the parent forgets to pass them!

export default function Product({ title = "anonymous", price = 0, children }) {
    
    return (
        <article>
            <p>{title}</p>
            <p>{price}</p>
            
            {/* The 'children' prop is special. It automatically catches whatever is written */}
            {/* INSIDE the component tags in the parent (e.g., <Product>THIS GOES HERE</Product>) */}
            <p>{children}</p>
        </article>
    );
}