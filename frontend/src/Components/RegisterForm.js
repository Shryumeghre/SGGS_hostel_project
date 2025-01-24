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
        // id_card: null,
        // id_proof: null,
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

    // const handleFileChange = (e) => {
    //     const { name, files } = e.target;
    //     setFormData({ ...formData, [name]: files[0] });
    // };

    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                formDataToSend.append(key, formData[key]);
            }
        }
        try {
            const response = await fetch(`http://localhost:5001/api/student/register`, {
                method: "POST",
                body: formDataToSend,
            });
            if (response.ok) {
                alert("Registration Successful");
            } else {
                console.error("Registration failed", response.statusText);
            }
        } catch (error) {
            console.error("register", error);
        }
    };
    

    return (
        <div className="register-form-container">
            {/* Main Heading */}
            <h1>Student Registration Form</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                        {/* <label>
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
                        </label> */}
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
