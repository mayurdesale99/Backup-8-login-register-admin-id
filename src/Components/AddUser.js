// src/Components/AddUser.js
import React, { useState } from "react";

const AddUser = ({ addUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addUser(formData.name, formData.email, formData.address, formData.phone);
    setFormData({ name: "", email: "", address: "", phone: "" }); // Clear form fields
  };

  return (
    <div className="mb-3">
      <h3>Add User</h3>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <input
            className="form-control mb-3"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control mb-3"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control mb-3"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleOnChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
