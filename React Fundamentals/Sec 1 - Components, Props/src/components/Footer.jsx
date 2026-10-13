// ------------------------------------------------------------------------------------------------------
// Footer.jsx - Exporting Methods in React
// ------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------
// VS Code Tip: ES7+ React/Redux Extension
// ---------------------------------------------------------
// Install the "ES7+ React/Redux" extension for built-in React snippets.
// e.g., typing 'rfc' (React Functional Component) generates a component function template instantly!

/*
// Standard way of exporting at the bottom:
function Footer() {
    return (
        <div>Standard Footer</div>
    );
}
export default Footer;
*/

// ---------------------------------------------------------
// 1. Default Export (Import WITHOUT curly braces)
// ---------------------------------------------------------
// NOTE: A file can have ONLY ONE default export.
// When importing, you can rename a default export directly whatever you want:
// import ChangedName from './Footer'; (React auto-understands this maps to the default export).

export default function Footer2() {
    return (
        <div>Default Footer</div>
    );
}

// ---------------------------------------------------------
// 2. Named Export (Import WITH curly braces {})
// ---------------------------------------------------------
// NOTE: A file can have MULTIPLE named exports.
// When importing, the name MUST match exactly. To rename it, you MUST use the 'as' keyword:
// import { Footer as FooterUpdate } from './Footer'; 
// (Note: After using 'as', the previous name 'Footer' will no longer work in that import file).

export function Footer() {
    return (
        <div>Named Footer</div>
    );
}