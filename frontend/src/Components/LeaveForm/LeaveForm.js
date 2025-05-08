import React, { useState , useEffect } from "react";
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
    const [errors, setErrors] = useState({
        phoneNum: "",
        parentsNum: "",
        departureTime: "",
        arrivalTime: "",
        dateLogic: ""
    });
      
    useEffect(() => {
        const { departure, arrival } = formData;
        if (departure.date && arrival.date) {
            const start = new Date(departure.date);
            const end = new Date(arrival.date);
            const diffTime = end - start;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (!isNaN(diffDays) && diffDays >= 0) {
                setFormData((prev) => ({ ...prev, durationOfLeave: diffDays.toString() }));
            }
        }
    }, [formData.departure.date, formData.arrival.date]);
    
    useEffect(() => {
        const { departure, arrival } = formData;
        if (departure.date && arrival.date) {
            const depDate = new Date(departure.date);
            const arrDate = new Date(arrival.date);
            if (arrDate < depDate) {
                setErrors((prev) => ({
                    ...prev,
                    dateLogic: "Arrival date must be after or same as departure date.",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    dateLogic: "",
                }));
            }
        }
    }, [formData.departure.date, formData.arrival.date]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        const isValidTime = (time) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
        
        if (name === "departureDate" || name === "departureTime") {
            if (name === "departureTime") {
                setErrors((prev) => ({
                    ...prev,
                    departureTime: isValidTime(value) ? "" : "Invalid time format (HH:mm).",
                }));
            }
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
          if (name === "phoneNum" || name === "parentsNum") {
            setErrors((prev) => ({
                ...prev,
                [name]: value.length === 10 ? "" : "Phone number must be exactly 10 digits.",
            }));
        }
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
                    {errors.phoneNum && <h4 style={{ color: "red" }}>{errors.phoneNum}</h4>}
                </label>
                <label>Reason for Leave:
                    <textarea name="reasonOfLeave" value={formData.reasonOfLeave} onChange={handleChange} required />
                </label>
                <label>Departure Date:
                    <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
                </label>
                <label>Departure Time:
                    <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} required />
                </label>
                <label>Arrival Date:
                    <input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} required />
                    {errors.dateLogic && <h4 style={{ color: "red" }}>{errors.dateLogic}</h4>}
                </label>
                <label>Arrival Time:
                    <input type="time" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} required />
                </label>
                <label>Duration of Leave:
                    <input type="text" name="durationOfLeave" value={formData.durationOfLeave} onChange={handleChange} required />
                </label>
                <label>Parents' Contact Number:
                    <input type="text" name="parentsNum" value={formData.parentsNum} onChange={handleChange} required />
                    {errors.parentsNum && <h4 style={{ color: "red" }}>{errors.parentsNum}</h4>}
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
