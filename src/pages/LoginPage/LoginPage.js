
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App'; // Import AuthContext
import API_URL from '../../config'; // Import API_URL
import "./LoginPage.css";

const LoginPage = () => {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const { setIsLoggedIn, setUserRole, setUserEmail } = useContext(AuthContext); // Access AuthContext
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_URL}/login.php`,
                inputs,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.status === 1) {
                setMessage('Login successful!');
                setIsLoggedIn(true); // Update login state

                setUserRole(response.data.user.role); 
                setUserEmail(response.data.user.email);// Update user role

                // Store in localStorage for persistent login session
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', response.data.user.role);
                localStorage.setItem('userEmail', response.data.user.email);
                localStorage.setItem('token', response.data.token); // Store authentication token

                setTimeout(() => {
                    navigate('/'); // Redirect to main page
                }, 2000);
            } else {
                setMessage(response.data.message || 'Login failed!');
            }
        } catch (error) {
            console.error("Login failed:", error);
            setMessage('An error occurred during login.');
        }
    };

    return (
        <div className="login-page">
            <div className="container">
                <h2>Login</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
                <p>
                    New here? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
