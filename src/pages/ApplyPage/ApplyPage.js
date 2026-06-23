import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../config'; // Import API_URL
import "./ApplyPage.css";

const ApplyPage = () => {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract job details from location.state
  const { jobTitle: initialTitle, companyName: initialCompany, posterEmail: initialPosterEmail } = location.state || {};

  const [message, setMessage] = useState('');
  const [jobDetails, setJobDetails] = useState({
    title: initialTitle || '',
    company: initialCompany || '',
    posterEmail: initialPosterEmail || ''
  });

  const [application, setApplication] = useState({
    userName: '',
    email: '',
    resume: null,
  });

  // Fetch job details if they weren't passed through state (e.g. on refresh or direct access)
  useEffect(() => {
    if (!initialTitle || !initialCompany || !initialPosterEmail) {
      const fetchJobDetails = async () => {
        try {
          const response = await axios.get(`${API_URL}/jobs.php?id=${jobId}`);
          if (response.data.status === 1) {
            setJobDetails({
              title: response.data.job.title,
              company: response.data.job.company_name,
              posterEmail: response.data.job.employer_email
            });
          } else {
            setMessage(response.data.message || 'Failed to fetch job details.');
          }
        } catch (error) {
          console.error('Error fetching job details:', error);
          setMessage('An error occurred while fetching job details.');
        }
      };
      fetchJobDetails();
    } else {
      setJobDetails({
        title: initialTitle,
        company: initialCompany,
        posterEmail: initialPosterEmail
      });
    }
  }, [jobId, initialTitle, initialCompany, initialPosterEmail]);

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
    formData.append('employer_email', jobDetails.posterEmail);
    formData.append('jobTitle', jobDetails.title); // Add job title
    formData.append('companyName', jobDetails.company); // Add company name

    try {
      const response = await axios.post(`${API_URL}/apply_job.php`, formData, {
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
      <h1>Apply for {jobDetails.title}</h1>
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
