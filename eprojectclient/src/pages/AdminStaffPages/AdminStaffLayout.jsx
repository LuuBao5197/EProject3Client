import React, { useEffect, useState } from 'react';
import { getAllStaff, deleteStaff } from '../../API/getAdminStaff';

const AdminStaffLayout = ({ onEdit }) => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const data = await getAllStaff();
      setStaffList(data);
    } catch (error) {
      console.error('Failed to fetch staff:', error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff?')) {
      try {
        await deleteStaff(id);
        fetchStaff();  // Refresh the list
      } catch (error) {
        console.error('Failed to delete staff:', error.response?.data?.message || error.message);
      }
    }
  };
  


  return (
    <div>
      <h2>Staff List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.user.name}</td>
              <td>{staff.user.email}</td>
              <td>
                <button onClick={() => onEdit(staff)}>Edit</button>
                <button onClick={() => handleDelete(staff.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStaffLayout;
