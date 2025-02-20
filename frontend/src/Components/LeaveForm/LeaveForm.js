import React, { useState } from "react";
import "./LeaveForm.css";

const LeaveForm = () => {
    const token=localStorage.getItem('token');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        roomNum: "",
        branch: "",
        regNo: "",
        phoneNum: "",
        reasonOfLeave: "",
        durationOfLeave: "",
        departure: {
          date: "",
          time: "",
        },
        arrival: {
          date: "",
          time: "",
        },
        parentsNum: "",
        recipient: "",
    });
      

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "departureDate" || name === "departureTime") {
          setFormData((prev) => ({
            ...prev,
            departure: {
              ...prev.departure,
              [name === "departureDate" ? "date" : "time"]: value,
            },
          }));
        } else if (name === "arrivalDate" || name === "arrivalTime") {
          setFormData((prev) => ({
            ...prev,
            arrival: {
              ...prev.arrival,
              [name === "arrivalDate" ? "date" : "time"]: value,
            },
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (token) {
        try {
            const response = await fetch("http://localhost:5001/api/submit", {
                method: "POST",
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Leave form submitted successfully!");
                setFormData({
                    name: "",
                    email: "",
                    roomNum: "",
                    branch: "",
                    regNo: "",
                    phoneNum: "",
                    reasonOfLeave: "",
                    durationOfLeave: "",
                    departureDate: "",
                    departureTime: "",
                    arrivalDate: "",
                    arrivalTime: "",
                    parentsNum: "",
                    recipient: "",
                });
            } else {
                alert("Submission failed.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    } else {
        console.log('No token found in localStorage');
      }
    };

    return (
        <div className="leave-form-container">
            <h2>Leave Form</h2>
            <form onSubmit={handleSubmit} className="leave-form">
                <label>Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>Room Number:
                    <input type="text" name="roomNum" value={formData.roomNum} onChange={handleChange} required />
                </label>
                <label>Branch:
                    <select name="branch" value={formData.branch} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="CSE">CSE</option>
                        <option value="Chem">Chem</option>
                        <option value="Civil">Civil</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Instru">Instru</option>
                        <option value="IT">IT</option>
                        <option value="Mech">Mech</option>
                        <option value="Textile">Textile</option>
                        <option value="Extc">Extc</option>
                        <option value="Prod">Prod</option>
                    </select>
                </label>
                <label>Registration Number:
                    <input type="text" name="regNo" value={formData.regNo} onChange={handleChange} required />
                </label>
                <label>Phone Number:
                    <input type="text" name="phoneNum" value={formData.phoneNum} onChange={handleChange} required />
                </label>
                <label>Reason for Leave:
                    <textarea name="reasonOfLeave" value={formData.reasonOfLeave} onChange={handleChange} required />
                </label>
                <label>Duration of Leave:
                    <input type="text" name="durationOfLeave" value={formData.durationOfLeave} onChange={handleChange} required />
                </label>
                <label>Departure Date:
                    <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
                </label>
                <label>Departure Time:
                    <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} required />
                </label>
                <label>Arrival Date:
                    <input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} required />
                </label>
                <label>Arrival Time:
                    <input type="time" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} required />
                </label>
                <label>Parents' Contact Number:
                    <input type="text" name="parentsNum" value={formData.parentsNum} onChange={handleChange} required />
                </label>
                <label>Recipient:
                    <select name="recipient" value={formData.recipient} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="HOD">HOD</option>
                        <option value="Rector-Warden">Rector-Warden</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LeaveForm;
