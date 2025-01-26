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
        mess_fees: "",
        room_alloted: "",
        id_card: "",
        id_proof: "",
        permanent_addr: "",
        father_name: "",
        parents_num: "",
        localgardian_num: "",
        password: "",
    });

    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: file, // Add the file to the formData state under the correct field name
            }));
        } else {
            console.error("No file selected");
        }
    };
    
    
    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value); // Append each field and its value to FormData
        });
    
        try {
            const response = await fetch('http://localhost:5001/api/student/register', {
                method: 'POST',
                body: data, // Use FormData as the body
            });
    
            if (response.ok) {
                alert("Student Registration Successful");
            } else {
                const errorData = await response.json();
                console.error("Registration failed", errorData);
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };
    
    

    return (
        <div className="register-form-container">
            {/* Main Heading */}
            <h1>Student Registration Form</h1>
            <form className="register-form" onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Step Content */}
                {step === 1 && (
                    <div className="form-step">
                        {/* Step Heading */}
                        <h2>Step 1: Personal Information</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Registration Number:
                            <input
                                type="text"
                                name="reg_no"
                                value={formData.reg_no}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Gender:
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Department:
                            <input
                                type="text"
                                name="dept"
                                value={formData.dept}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Year of Study:
                            <input
                                type="number"
                                name="year_of_study"
                                value={formData.year_of_study}
                                onChange={handleChange}
                                min="1"
                                max="5"
                                required
                            />
                        </label>
                    </div>
                )}
                {step === 2 && (
                    <div className="form-step">
                        <h2>Step 2: Hostel Information</h2>
                        <label>
                            Date of Birth:
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Hostel:
                            <select
                                name="hostel"
                                value={formData.hostel}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="Krishna">Krishna</option>
                                <option value="Godavari">Godavari</option>
                                <option value="Deogiri">Deogiri</option>
                                <option value="Nandgiri">Nandgiri</option>
                                <option value="Sahayadri">Sahayadri</option>
                            </select>
                        </label>
                        <label>
                            Hostel Fees Paid:
                            <select
                                name="hostel_fees"
                                value={formData.hostel_fees}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </label>
                        <label>
                            Mess Fees Paid:
                            <select
                                name="mess_fees"
                                value={formData.mess_fees}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </label>
                        <label>
                            Room Allotted:
                            <input
                                type="text"
                                name="room_alloted"
                                value={formData.room_alloted}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                )}
                {step === 3 && (
                    <div className="form-step">
                        <h2>Step 3: Additional Information</h2>
                        <label>
                            ID Card (File Upload):
                            <input
                                type="file"
                                name="id_card"
                                accept=".jpg,.png,.pdf"
                                onChange={handleFileChange}
                                required
                            />
                        </label>
                        <label>
                            ID Proof (File Upload):
                            <input
                                type="file"
                                name="id_proof"
                                accept=".jpg,.png,.pdf"
                                onChange={handleFileChange}
                                required
                            />
                        </label>
                        <label>
                            Permanent Address:
                            <input
                                type="text"
                                name="permanent_addr"
                                value={formData.permanent_addr}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Father Name:
                            <input
                                type="text"
                                name="father_name"
                                value={formData.father_name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Parents' Contact Number:
                            <input
                                type="text"
                                name="parents_num"
                                value={formData.parents_num}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Local Guardian Contact Number:
                            <input
                                type="text"
                                name="localgardian_num"
                                value={formData.localgardian_num}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                )}
                <div className="form-navigation">
                    {step > 1 && <button type="button" onClick={handlePrevious}>Previous</button>}
                    {step < 3 && <button type="button" onClick={handleNext}>Next</button>}
                    {step === 3 && <button type="submit">Submit</button>}
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
