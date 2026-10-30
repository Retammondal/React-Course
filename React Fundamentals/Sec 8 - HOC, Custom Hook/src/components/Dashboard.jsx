import React from 'react';
import withAuth from '../utils/withAuth';

// --- Dashboard Component ---
export function Dashboard({ name }) {
    return (
        <div style={{ backgroundColor: '#f0f0f0', padding: '15px', marginTop: '10px' }}>
            <h2>Dashboard</h2>
            <p>Name : {name}</p>
        </div>
    );
}
// Exporting the upgraded HOC version for App.jsx to use!
export const AuthDashboard = withAuth(Dashboard);