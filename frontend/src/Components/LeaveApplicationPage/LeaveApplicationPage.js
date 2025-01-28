import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "./LeaveApplicationPage.css";

const LeaveApplicationPage = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:5001'); // Update with backend URL

    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5001/api'); // Replace with actual endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setError('Failed to fetch applications. Please try again later.');
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();

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

    return () => socket.close();
  }, []);

  const groupedApplications = {
    Accepted: applications.filter((app) => app.status === 'leave granted'),
    Rejected: applications.filter((app) => app.status === 'Rejected'),
    Pending: applications.filter((app) => app.status !== 'leave granted' && app.status !== 'Rejected'),
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
  };

  const closeDetails = () => {
    setSelectedApplication(null);
  };

  return (
    <div>
    <h1 className="headline">Leave Form Applications</h1>
    <br></br>
    <div className="leave-applications-container">

      {error && <p className="error-message">{error}</p>}

      {['Accepted', 'Rejected', 'Pending'].map((status) => (
        <div className="status-section" key={status}>
          <h3 className={`status-title ${status.toLowerCase()}`}>{status} Applications</h3>
          {groupedApplications[status].length > 0 ? (
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Registration Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groupedApplications[status].map((application) => (
                  <tr key={application._id}>
                    <td>{application.name}</td>
                    <td>{application.regNo}</td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleViewDetails(application)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-applications">No {status.toLowerCase()} applications.</p>
          )}
        </div>
      ))}

      {/* Details Modal */}
      {selectedApplication && (
        <div className="details-modal">
          <div className="modal-content">
            <h2>Leave Application Details</h2>
            <p><strong>Name:</strong> {selectedApplication.name}</p>
            <p><strong>Registration Number:</strong> {selectedApplication.regNo}</p>
            <p><strong>Status:</strong> {selectedApplication.status}</p>
            <p><strong>Reason:</strong> {selectedApplication.reasonOfLeave}</p>
            <p><strong>Start Date:</strong> {selectedApplication.departure.date}</p>
            <p><strong>End Date:</strong> {selectedApplication.arrival.date}</p>
            <button className="close-button" onClick={closeDetails}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </div>

  );
};

export default LeaveApplicationPage;
