import React from 'react';
import Button from './Button';
import './LoginToggle.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import auth context

export default function LoginToggle() {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Get user state and logout function

    const handleClick = () => {
        if (user) {
            logout(); // Call logout from context
            navigate('/login'); // Redirect to login page
            alert('Logged out successfully');
        } else {
            navigate('/login'); // Redirect to login page for login
        }
    };

    return (
        <div>
            <Button text={user ? "Logout" : "Login"} onClick={handleClick} />
        </div>
    );
}
