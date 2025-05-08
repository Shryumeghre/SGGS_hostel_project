import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './LeaveApplicationPage.css';

const LeaveApplicationPage = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:5001');

    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5001/api');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to fetch applications. Please try again later.');
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

  // Utility function to normalize a date to midnight
  const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  // Filter applications submitted in the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const recentApplications = applications.filter((app) => {
    const departureDate = new Date(app.departure.date);
    return departureDate >= oneWeekAgo;
  });

  // Further filter based on selected date
  const applicationsForSelectedDate = selectedDate
    ? recentApplications.filter((app) => {
        const departureDate = normalizeDate(app.departure.date);
        const selected = normalizeDate(selectedDate);
        return departureDate.getTime() === selected.getTime();
      })
    : recentApplications;

  // Further filter based on search term
  const filteredApplications = applicationsForSelectedDate.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group applications by status
  const groupedApplications = {
    Accepted: filteredApplications.filter((app) => app.status === 'leave granted'),
    Rejected: filteredApplications.filter(
      (app) =>
        app.status === 'Rejected by HOD' ||
        app.status === 'Rejected by Rector-Warden'
    ),
    Pending: filteredApplications.filter(
      (app) =>
        app.status === 'pending' ||
        app.status === 'accepted by HOD'
    ),
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
  };

  const closeDetails = () => {
    setSelectedApplication(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1 className="headline">Leave Form Applications</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by student name or registration number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <button
          className="clear-date-button"
          onClick={() => setSelectedDate(null)}
        >
          Clear Date Filter
        </button>
      </div>

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
              <p><strong>Branch:</strong> {selectedApplication.branch}</p>
              <p><strong>Contact Number:</strong> {selectedApplication.phoneNum}</p>
              <p><strong>Room Number:</strong> {selectedApplication.roomNum}</p>
              <p><strong>Status:</strong> {selectedApplication.status}</p>
              <p><strong>Reason:</strong> {selectedApplication.reasonOfLeave}</p>
              <p><strong>Start Date:</strong> {new Date(selectedApplication.departure.date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(selectedApplication.arrival.date).toLocaleDateString()}</p>
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
