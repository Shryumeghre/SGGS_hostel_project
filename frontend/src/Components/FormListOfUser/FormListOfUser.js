import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormList = () => {
    const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const userId=localStorage.getItem('userId');

  useEffect(() => {
    // Fetch the forms filled by the logged-in user
    const token = localStorage.getItem('token');
    const fetchForms = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/leaveforms/${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`  
              }
        }); 
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, [userId]);


  return (
    <div>
      <h1>Your Filled Forms</h1>
      <table style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Departure Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Reason</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Action</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {forms.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>
                No forms submitted yet.
              </td>
            </tr>
          ) : (
            forms.map((form) => (
              <tr key={form._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(form.departure.date).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{form.reasonOfLeave}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <Link to={`/formDetail/${form._id}`}>
                    <button style={{ padding: '6px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      View
                    </button>
                  </Link>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{form.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default FormList;
