import React, { useState } from 'react';
import Button from './Button';
import './LoginToggle.css';

export default function LoginToggle() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin = () => {
        setIsLogin(!isLogin);
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
