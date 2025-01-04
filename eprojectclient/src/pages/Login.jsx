<<<<<<< HEAD
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';
import InputField from '../components/InputField';
import '../assets/css/Login.css';
>>>>>>> d1b05ad03f8a303790818adb3e742160d54041ac


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5190/api/Auth/login", { email, password });
            console.log("res: ", res);
            localStorage.setItem("inforToken", JSON.stringify(res.data));
            const decodedToken = jwtDecode(res.data.token);
            navigate("/", { state: { user: decodedToken } }); // Pass user info to home page

            alert("Login successful");
        } catch (err) {
            console.error(err);
            alert("Login failed. Please check your credentials.");
        }
    }
    
    return (
        <div className="login-container">
            <div className="login-form">
                <h4 className="form-label">Đăng nhập</h4>
                <form onSubmit={handleLogin}>
                    <div className="form-group">                  
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="nhập email..."
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="pwd"
                                placeholder="Password..."
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="open-modal-btn">
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
