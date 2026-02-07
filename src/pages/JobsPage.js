// import React from 'react';
// import "../styles/JobsPage.css"; // Create and style this CSS file for the page

// const JobsPage = () => {
//   const jobs = [
//     {
//       id: 1,
//       title: "Frontend Developer",
//       company: "TechCorp",
//       location: "Remote",
//       description: "Build and maintain web applications.",
//     },
//     {
//       id: 2,
//       title: "Backend Developer",
//       company: "InnovateSoft",
//       location: "New York, NY",
//       description: "Design scalable backend systems.",
//     },
//     {
//       id: 3,
//       title: "UI/UX Designer",
//       company: "DesignPro",
//       location: "San Francisco, CA",
//       description: "Create engaging user experiences.",
//     },
//   ];

//   const applyJob = (jobId) => {
//     alert(`You applied for job ID: ${jobId}`);
//   };

//   return (
//     <div className="job-page">
//       <h1>Available Jobs</h1>
//       <div className="job-cards">
//         {jobs.map((job) => (
//           <div key={job.id} className="job-card">
//             <h2>{job.title}</h2>
//             <h3>{job.company}</h3>
//             <p>Location: {job.location}</p>
//             <p>Description: {job.description}</p>
//             <button onClick={() => applyJob(job.id)}>Apply</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobsPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/JobsPage.css";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch job listings on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:80/phpdbms/HireWay/hireway/api/jobs.php');
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
              <h3>{job.job_title}</h3>
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
