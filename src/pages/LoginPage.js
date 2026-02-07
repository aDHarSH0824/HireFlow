
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../App'; // Import AuthContext
import "../styles/LoginPage.css";

const LoginPage = () => {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const { setIsLoggedIn, setUserRole,setUserEmail } = useContext(AuthContext); // Access AuthContext
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:80/phpdbms/HireWay/hireway/api/login.php",
                inputs,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.status === 1) {
                setMessage('Login successful!');
                setIsLoggedIn(true); // Update login state

                setUserRole(response.data.user.role); 
                setUserEmail(response.data.user.email);// Update user role
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
