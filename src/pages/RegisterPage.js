


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Register.css";

const RegisterPage = () => {
    // const [inputs, setInputs] = useState({ name: '', email: '', password: '' });
    const [inputs, setInputs] = useState({ name: '', email: '', password: '', role: '' });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:80/phpdbms/HireWay/hireway/api/users.php",
                inputs, // Sending inputs directly
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.status === 1) {
                setMessage('Registration successful!');
                setTimeout(() => {
                    navigate('/'); // Redirect to main page after success
                }, 2000); // Optional delay of 2 seconds
            } else {
                setMessage(response.data.message || 'Registration failed!');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while registering.');
        }
    };

    return (
        <div className="register-page">
            <div className="container">
                <h2>Register</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            name="name"
                            value={inputs.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                            placeholder="Create a password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={inputs.role || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="job_seeker">Job Seeker</option>
                            <option value="job_poster">Job Poster</option>
                        </select>
                    </div>

                    <button type="submit" className="btn">Register</button>
                </form>
                <p className="text-muted">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
