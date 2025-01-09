import React, { useState } from 'react';
import { addStaff } from '../../API/getAdminStaff';

const AdminStaffAdd = ({ onAddSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    dob: '',
    joinDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStaff(formData);
      onAddSuccess();
      setFormData({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        dob: '',
        joinDate: '',
      });
    } catch (error) {
      console.error('Failed to add staff:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Staff</h2>
      <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
      <input name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
      <input name="joinDate" type="date" value={formData.joinDate} onChange={handleChange} />
      <button type="submit">Add Staff</button>
    </form>
  );
};

export default AdminStaffAdd;
