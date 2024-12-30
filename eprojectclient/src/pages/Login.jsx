import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5190/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                // Save token or user data to localStorage or context if needed
                localStorage.setItem('token', data.token);
                navigate('/'); // Redirect to the desired page
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
      
        </div>
    );
}

export default Login;
