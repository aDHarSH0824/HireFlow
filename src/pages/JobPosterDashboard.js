import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../styles/JobPosterDashboard.css"; // Add your CSS styles
import { AuthContext } from '../App'; // Import AuthContext

const JobPosterDashboard = () => {
  const { userEmail } = useContext(AuthContext); // Get the email from context
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!userEmail) {
          setMessage('You must be logged in to view applications.');
          return;
        }

        const response = await axios.get(`http://localhost:80/phpdbms/HireWay/hireway/api/get_applications.php?poster_email=${userEmail}`);
        
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
  }, [userEmail]); // Dependency on userEmail to refetch when it changes

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.post(`http://localhost:80/phpdbms/HireWay/hireway/api/update_application_status.php`, {
        id,
        status,
      });
      if (response.data.status === 1) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status } : app))
        );
        setMessage('Application status updated successfully.');
      } else {
        setMessage('Failed to update status.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage('An error occurred while updating status.');
    }
  };

  const handleDownloadResume = async (applicationId) => {
    try {
      const response = await axios.get(`http://localhost:80/phpdbms/HireWay/hireway/api/download_resume.php`, {
        params: {
          application_id: applicationId,
          poster_email: userEmail,
        },
        responseType: 'blob',
      });

      // Create a link element to download the file
      const link = document.createElement('a');
      const fileName = response.headers['content-disposition']
        ? response.headers['content-disposition'].split('filename=')[1].replace(/"/g, '')
        : 'resume.pdf';
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('Error downloading resume:', error);
      setMessage('An error occurred while downloading the resume.');
    }
  };

  return (
    <div className="job-poster-dashboard">
      <h1>Manage Job Applications</h1>
      {message && <p>{message}</p>}
      {applications.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Job Title</th>
              <th>Company Name</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.user_name}</td>
                <td>{app.job_title}</td>
                <td>{app.company_name}</td>
                <td>{app.application_date}</td>
                <td>{app.status}</td>
                <td>
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button className="download-resume-btn" onClick={() => handleDownloadResume(app.id)}>
  Download Resume
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications to manage.</p>
      )}
    </div>
  );
};

export default JobPosterDashboard;
