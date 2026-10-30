import React from 'react';
import { Link } from 'react-router';

export default function Navbar() {
    return (
        <nav style={{ display: 'flex', gap: '20px', fontSize: '18px', fontWeight: 'bold' }}>
            <Link to={"/"} style={{ textDecoration: 'none', color: 'blue' }}>Home</Link>
            <Link to={"/dashboard"} style={{ textDecoration: 'none', color: 'blue' }}>Dashboard</Link>
            <Link to={"/profile"} style={{ textDecoration: 'none', color: 'blue' }}>Profile</Link>
        </nav>
    );
}