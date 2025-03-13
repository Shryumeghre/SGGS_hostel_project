import React, { useState } from "react";
import "./RegisterForm.css";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        reg_no: "",
        gender: "",
        email: "",
        dept: "",
        year_of_study: "",
        dob: "",
        phone: "",
        hostel: "",
        hostel_fees: "",
        receipt_hostel: null,
        mess_fees: "",
        receipt_mess: null,
        room_alloted: "",
        id_card: null,
        id_proof: null,
        permanent_addr: "",
        father_name: "",
        parents_num: "",
        localgardian_num: "",
        password: "",
    });

    const [errors, setErrors] = useState({}); // ✅ Define errors state
    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: file,
            }));
        }
    };

    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors before submission
    
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
    
        try {
            const response = await fetch('http://localhost:5001/api/student/register', {
                method: 'POST',
                body: data,
            });
            const responseData = await response.json();
    
            if (response.ok) {
                alert("✅ Student Registration Successful!");
            } else {
                // const errorData = await response.json();
                console.error("Registration failed", responseData);
                alert(`❌ Registration failed: ${responseData.message || "Something went wrong!"}`);

                // Set error message in state to display on UI
                setErrors({ general: responseData.message });
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("❌ Something went wrong. Please try again.");
            setErrors({ general: "Something went wrong. Please try again." });
        }
    };
    
    return (
        <div className="register-form-container">
            <h1>Student Registration Form</h1>
            <form className="register-form" onSubmit={handleSubmit} encType="multipart/form-data">
                {step === 1 && (
                    <div className="form-step">
                        <h2>Step 1: Personal Information</h2>
                        <label>
                            Name:
                            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                        </label>
                        <label>
                            Registration Number:
                            <input type="text" name="reg_no" value={formData.reg_no} onChange={handleChange} required />
                            {errors.reg_no && <p className="error">{errors.reg_no}</p>}
                        </label>
                        <label>Gender:</label>
                        <div className="gender-options">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                            />
                            <label htmlFor="male" className="gender-btn">Male</label>

                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                            />
                            <label htmlFor="female" className="gender-btn">Female</label>

                            <input
                                type="radio"
                                id="other"
                                name="gender"
                                value="Other"
                                checked={formData.gender === "Other"}
                                onChange={handleChange}
                            />
                            <label htmlFor="other" className="gender-btn">Other</label>
                        </div>
                        {errors.gender && <p className="error">{errors.gender}</p>}

                        <label>
                            Email:
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </label>
                        <label>
                            Department:
                            <input type="text" name="dept" value={formData.dept} onChange={handleChange} required />
                        </label>
                        <label>
                            Year of Study:
                            <input type="number" name="year_of_study" value={formData.year_of_study} onChange={handleChange} min="1" max="5" required />
                        </label>
                    </div>
                )}
                {step === 2 && ( 
                    <div className="form-step">
                        <h2>Step 2: Hostel Information</h2>

                        <div className="form-group">
                            <label>Date of Birth:</label>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Hostel:</label>
                            <select name="hostel" value={formData.hostel} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Krishna">Krishna</option>
                                <option value="Godavari">Godavari</option>
                                <option value="Deogiri">Deogiri</option>
                                <option value="Nandgiri">Nandgiri</option>
                                <option value="Sahayadri">Sahayadri</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Hostel Fees Paid:</label>
                            <select name="hostel_fees" value={formData.hostel_fees} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Full Fees">Full Fees</option>
                                <option value="Partially Paid">Partially Paid</option>
                                <option value="Not Paid">Not Paid</option>
                            </select>
                        </div>

                        {formData.hostel_fees !== "Not Paid" && (
                            <div className="form-group">
                                <label>Upload Hostel Fee Receipt:</label>
                                <input type="file" name="receipt_hostel" accept=".jpg,.png,.pdf" onChange={handleFileChange} required />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Mess Fees Paid:</label>
                            <select name="mess_fees" value={formData.mess_fees} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Full Fees">Full Fees</option>
                                <option value="Partially Paid">Partially Paid</option>
                                <option value="Not Paid">Not Paid</option>
                            </select>
                        </div>

                        {formData.mess_fees !== "Not Paid" && (
                            <div className="form-group">
                                <label>Upload Mess Fee Receipt:</label>
                                <input type="file" name="receipt_mess" accept=".jpg,.png,.pdf" onChange={handleFileChange} required />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Room Allotted:</label>
                            <input type="text" name="room_alloted" value={formData.room_alloted} onChange={handleChange} required />
                        </div>

                        {/* <div className="button-group">
                            <button type="button" onClick={handlePrevious}>Previous</button>
                            <button type="submit">Next</button>
                        </div> */}
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step">
                        <h2>Step 3: Additional Information</h2>
                        <label>
                            ID Card (File Upload):
                            <input type="file" name="id_card" accept=".jpg,.png,.pdf" onChange={handleFileChange} required />
                        </label>
                        <label>
                            ID Proof (File Upload):
                            <input type="file" name="id_proof" accept=".jpg,.png,.pdf" onChange={handleFileChange} required />
                        </label>
                        <label>
                            Permanent Address:
                            <input type="text" name="permanent_addr" value={formData.permanent_addr} onChange={handleChange} required />
                        </label>
                        <label>
                            Father Name:
                            <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} required />
                        </label>
                        <label>
                            Parents' Contact Number:
                            <input type="text" name="parents_num" value={formData.parents_num} onChange={handleChange} required />
                        </label>
                        <label>
                            Local Guardian Contact Number:
                            <input type="text" name="localgardian_num" value={formData.localgardian_num} onChange={handleChange} />
                        </label>
                        <label>
                            Password:
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </label>
                    </div>
                )}
                <div className="form-navigation">
                    {step > 1 && <button type="button" onClick={handlePrevious}>Previous</button>}
                    {step < 3 && <button type="button" onClick={handleNext}>Next</button>}
                    {step === 3 && <button type="submit">Register</button>}
                    {/* {errors.general && <p className="error">{errors.general}</p>} */}
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
