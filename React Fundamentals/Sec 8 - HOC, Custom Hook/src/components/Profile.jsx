// ------------------------------------------------------------------------------------------------------
// components/Dashboard.jsx & components/Profile.jsx (The Raw Components)
// ------------------------------------------------------------------------------------------------------
import React from 'react';
import withAuth from '../utils/withAuth';

// --- Profile Component ---
export function Profile({ name, role }) {
    return (
        <div style={{ backgroundColor: '#e6f7ff', padding: '15px', marginTop: '10px' }}>
            <h2>Profile Page</h2>
            <p>Name : {name}</p>
            <p>Role : {role}</p>
        </div>
    );
}
// Exporting the upgraded HOC version for App.jsx to use!
export const AuthProfile = withAuth(Profile);