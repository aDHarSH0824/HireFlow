import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../styles/ApplyPage.css";

const ApplyPage = () => {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract job details from location.state
  const { jobTitle, companyName, posterEmail } = location.state || {};

  const [message, setMessage] = useState('');
  const [application, setApplication] = useState({
    userName: '',
    email: '',
    resume: null,
  });

  // Update poster email if available
  useEffect(() => {
    setApplication((prev) => ({ ...prev, employer_email: posterEmail }));
  }, [posterEmail]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setApplication((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setApplication((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userName', application.userName);
    formData.append('email', application.email);
    formData.append('resume', application.resume);
    formData.append('employer_email', posterEmail);
    formData.append('jobTitle', jobTitle); // Add job title
    formData.append('companyName', companyName); // Add company name

    try {
      const response = await axios.post('http://localhost:80/phpdbms/HireWay/hireway/api/apply_job.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status === 1) {
        setMessage('Application submitted successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMessage(response.data.message || 'Failed to apply. Please try again later.');
      }
    } catch (error) {
      console.error('Error applying for the job:', error);
      setMessage('An error occurred while applying.');
    }
  };

  return (
    <div className="apply-page">
      <h1>Apply for {jobTitle}</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="userName">Your Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={application.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={application.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Upload Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyPage;
