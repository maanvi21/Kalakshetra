import React, { useState } from 'react';
import Button from './Button';

import './LoginToggle.css';
import { useNavigate } from 'react-router-dom';

export default function LoginToggle() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin = () => {
        setIsLogin(!isLogin);
        navigate('/login')
    };

    return (
        <div>
            {isLogin ? (
                <Button text="Logout" onClick={toggleLogin} />
            ) : (
                <Button text="Login" onClick={toggleLogin} />
            )}
        </div>
    );
}
