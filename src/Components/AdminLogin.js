// src/Components/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email address is invalid.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const res = await fetch("http://localhost:5000/users");
        const users = await res.json();
        const adminUser = users.find(user => user.email === formData.email && user.password === formData.password && user.isAdmin);
        if (adminUser) {
          setMessage("Admin Login successful!");
          setErrors({});
          // Redirect to admin dashboard or specific admin area
          navigate("/admin-dashboard");
        } else {
          setMessage("Invalid email or password for admin.");
        }
      } catch (err) {
        console.log(err);
        setMessage("Error fetching user data.");
      }
    }
  };

  return (
    <div className="text-center p-3 container">
      <h2>Admin Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <input
            className={`form-control mb-3 ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleOnChange}
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <input
            className={`form-control mb-3 ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleOnChange}
            required
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
