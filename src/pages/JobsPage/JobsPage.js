import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_URL from '../../config'; // Import API_URL
import "./JobsPage.css";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch job listings on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs.php`);
        if (Array.isArray(response.data)) {
          setJobs(response.data); // Set jobs state with fetched job listings
        }
      } catch (error) {
        console.error('Error fetching job listings:', error);
        setMessage('An error occurred while fetching job listings.');
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-page">
      <h1>Job Listings</h1>
      {message && <p>{message}</p>}

      <div className="job-listings">
        {jobs.length === 0 ? (
          <p>No jobs available at the moment.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h3>{job.title}</h3> {/* Fixed: changed job.job_title to job.title */}
              <p><strong>Company:</strong> {job.company_name}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Job Type:</strong> {job.job_type}</p>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Requirements:</strong> {job.requirements}</p>
              <Link
                to={`/apply/${job.id}`}
                state={{
                  jobTitle: job.title,
                  companyName: job.company_name,
                  posterEmail: job.employer_email, // Passing poster email
                  location: job.location,
                }}
                className="apply-button"
              >
                Apply Now
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobsPage;
