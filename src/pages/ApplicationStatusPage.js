import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App'; // Import AuthContext for dynamic email
import "../styles/JobSeekerDashboard.css"; // Add your custom styles for the page

const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');
  const { userEmail } = useContext(AuthContext); // Get email from AuthContext

  // Fetch applications for the logged-in job seeker
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!userEmail) {
          setMessage('User is not logged in');
          return;
        }
        const response = await axios.get(`http://localhost:80/phpdbms/HireWay/hireway/api/applications.php?user_email=${userEmail}`);
        if (response.data.status === 1) {
          setApplications(response.data.applications);
        } else {
          setMessage('No applications found.');
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        setMessage('An error occurred while fetching applications.');
      }
    };

    fetchApplications();
  }, [userEmail]); // Fetch applications when userEmail changes

  // Helper to determine CSS class for application status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Accepted':
        return 'status-accepted';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <div className="job-seeker-dashboard">
      <h1>My Applications</h1>
      {message && <p>{message}</p>}

      {applications.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Application Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.job_title}</td>
                <td>{app.company_name}</td>
                <td>{app.application_date}</td>
                <td className="status-cell">
                  <div className="status-bar">
                    <div className={`status-bar-fill ${getStatusClass(app.status)}`}></div>
                  </div>
                  <span className={`status-text ${getStatusClass(app.status)}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default JobSeekerDashboard;
