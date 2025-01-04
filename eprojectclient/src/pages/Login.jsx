import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';
import InputField from '../components/InputField';
import '../assets/css/Login.css';

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
            setError('Password or Email wrong.');
        }
    };

    return (
        <div className="Login-Form">
            <div className="login-container">
                <h2 className="form-title">Login</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <InputField 
                    type="email" 
                    placeholder="Email address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                    <InputField 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    />

                    {error && <p className="error-message">{error}</p>}
                    <a href="#" className="forgot-password-link">Forgot password?</a>
                    <button type="submit" className="login-button">Log In</button>
                </form> 
            </div>
        </div>
    );
}

export default Login;
