import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../App'; // Import AuthContext
import "../styles/PostJobPage.css";

const PostJobPage = () => {
    const { userEmail } = useContext(AuthContext); // Get user email from context
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        location: '',
        salary: '',
        jobType: 'full-time',
        description: '',
        requirements: '',
        poster_email: userEmail, // Attach user email to the form
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Update poster_email whenever the userEmail in context changes
        setFormData((prevData) => ({ ...prevData, poster_email: userEmail }));
    }, [userEmail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:80/phpdbms/HireWay/hireway/api/post_job.php",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.data.status === 1) {
                setMessage('Job posted successfully!');
                setFormData({
                    jobTitle: '',
                    companyName: '',
                    location: '',
                    salary: '',
                    jobType: 'full-time',
                    description: '',
                    requirements: '',
                    poster_email: '', // Reset after posting
                });

                setTimeout(() => {
                    navigate('/'); // Redirect to main page after success
                }, 2000);
            } else {
                setMessage(response.data.message || 'Failed to post the job.');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            setMessage('An error occurred while posting the job.');
        }
    };

    return (
        <div className="post-job-container">
            <h1>Post a Job</h1>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="jobType">Job Type</label>
                    <select
                        id="jobType"
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        required
                    >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="freelance">Freelance</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Job Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="requirements">Job Requirements</label>
                    <textarea
                        id="requirements"
                        name="requirements"
                        rows="5"
                        value={formData.requirements}
                        onChange={handleChange}
                        placeholder="Enter requirements, separated by commas."
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Post Job</button>
                </div>
            </form>
        </div>
    );
};

export default PostJobPage;
