import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';  // Thêm DataTables
import { Link, useNavigate } from 'react-router-dom'; // Import Link và useNavigate
import { getAllStaff, deleteStaff } from '../../API/getAdminStaff';

const AdminStaffLayout = ({ onEdit }) => {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate(); // Để điều hướng đến trang khác

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

  const handleDetail = (id) => {
    navigate(`/admin/Staff-Detail/${id}`); // Điều hướng đến đường dẫn mới
  };

  useEffect(() => {
    if (staffList.length > 0) {
      $('#staffTable').DataTable(); // Khởi tạo DataTable sau khi danh sách nhân viên được tải
    }
    return () => {
      if ($.fn.DataTable.isDataTable('#staffTable')) {
        $('#staffTable').DataTable().destroy(); // Hủy DataTable khi component bị unmount
      }
    };
  }, [staffList]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Staff List</h2>
      <table id="staffTable" className="table table-striped table-bordered">
        <thead className="table-dark">
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
                <button className="btn btn-warning mr-2" onClick={() => onEdit(staff)}>Edit</button>
                <button className="btn btn-info" onClick={() => handleDetail(staff.id)}>Detail</button> {/* Nút Detail */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStaffLayout;
