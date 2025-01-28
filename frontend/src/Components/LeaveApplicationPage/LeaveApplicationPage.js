import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const LeaveApplicationPage = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Set up Socket.IO connection
    const socket = io('http://localhost:5001'); // Update to match your backend server's URL

    // Fetch leave applications from the backend
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5001/api'); // Replace with your actual endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched applications:', data); // Debug log
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to fetch applications. Please try again later.');
      }
    };

    fetchApplications();

    // Listen for real-time updates (status changes or new applications)
    socket.on('statusUpdate', (updatedApplication) => {
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === updatedApplication._id ? updatedApplication : application
        )
      );
    });

    socket.on('newApplication', (newApplication) => {
      setApplications((prevApplications) => [...prevApplications, newApplication]);
    });

    // Clean up socket connection
    return () => socket.close();
  }, []);

  const handleViewClick = (studentId) => {
    console.log('View details for student:', studentId);
    // Implement modal or redirection logic here
  };

  // Group applications based on their status
  const groupedApplications = {
    Accepted: applications.filter((app) => app.status === 'leave granted'), // Updated for "leave granted"
    Rejected: applications.filter((app) => app.status === 'Rejected'),
    Pending: applications.filter((app) => app.status !== 'leave granted' && app.status !== 'Rejected'), // Updated for "leave granted"
  };

  return (
    <div>
      <h1>Leave Applications</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {['Accepted', 'Rejected', 'Pending'].map((status) => (
        <section key={status}>
          <h2>{status} Applications</h2>
          <ul>
            {groupedApplications[status].length > 0 ? (
              groupedApplications[status].map((application) => (
                <li key={application._id}>
                  <div>
                    <p><strong>Name:</strong> {application.studentName}</p>
                    <p><strong>Department:</strong> {application.department}</p>
                    <p><strong>Room No:</strong> {application.roomNo}</p>
                    <button onClick={() => handleViewClick(application._id)}>View Details</button>
                  </div>
                </li>
              ))
            ) : (
              <p>No {status.toLowerCase()} applications.</p>
            )}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default LeaveApplicationPage;
