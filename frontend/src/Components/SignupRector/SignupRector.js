import React, { useState } from "react";
import "./SignupRector.css";

const SignupRector = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    Address: "",
    idProof: null,
    password: "",
    confirmPassword: "",
    role: "rector"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ///[e.target.name]:e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      idProof: e.target.files[0]
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("mobile", formData.mobile);
    form.append("address", formData.address);
    form.append("password", formData.password);
    form.append("confirmPassword", formData.confirmPassword);
    form.append("role", formData.role);
    form.append("idProof", formData.idProof);

    try {
      const response = await fetch("http://localhost:5001/auth/signup", {
        method: "POST",
        body: form
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", data);
        alert("User registered successfully");
      } else {
        console.error("Error:", data);
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
    console.log(formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="rector">Rector</option>
              <option value="warden">Warden</option>
              <option value="guard">Guard</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="idProof">ID Proof:</label>
            <input
              type="file"
              id="idProof"
              name="idProof"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupRector;
