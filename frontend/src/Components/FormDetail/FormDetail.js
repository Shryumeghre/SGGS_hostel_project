import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormDetail = () => {
  const { formId } = useParams(); // Get formId from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Fetch the specific form details by formId
    const token = localStorage.getItem('token');
    const fetchFormDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/leaveform/${formId}`,{
            headers: {
                Authorization: `Bearer ${token}` // Pass the token in the request header
              }        
        });
        // console.log('Form Data:', response.data)
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form detail:', error);
      }
    };

    fetchFormDetail();
  }, [formId]);

  if (!formData) {
    return <div>Loading form details...</div>;
  }

  return (
    <div style={{ margin: '20px auto', width: '60%' }}>
      <h1>Form Details</h1>
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Room Number:</strong> {formData.roomNum}</p>
      <p><strong>Branch:</strong> {formData.branch}</p>
      <p><strong>Registration Number:</strong> {formData.regNo}</p>
      <p><strong>Phone Number:</strong> {formData.phoneNum}</p>
      <p><strong>Reason for Leave:</strong> {formData.reasonOfLeave}</p>
      <p><strong>Duration of Leave:</strong> {formData.durationOfLeave}</p>
      <p><strong>Departure Date:</strong> {new Date(formData.departure.date).toLocaleDateString()}</p>
      <p><strong>Departure Time:</strong> {formData.departure.time}</p>
      <p><strong>Arrival Date:</strong> {new Date(formData.arrival.date).toLocaleDateString()}</p>
      <p><strong>Arrival Time:</strong> {formData.arrival.time}</p>
      <p><strong>Parents' Contact Number:</strong> {formData.parentsNum}</p>
      <p><strong>Recipient:</strong> {formData.recipient}</p>
      <p><strong>Status:</strong> {formData.status}</p>

      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
        onClick={() => navigate(`/status-track/${formId}`)} // Navigate to status tracker page
      >
        Check Status
      </button>
    </div>
  );
};

export default FormDetail;
