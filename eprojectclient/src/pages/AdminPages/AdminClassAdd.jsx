import React, { useState, useEffect } from 'react';
import { addClass, getAllStaff } from '../../API/GetClass'; // Import API addClass và getAllStaff

const AdminClassAdd = () => {
  const [classData, setClassData] = useState({
    name: '',
    totalStudent: '',
    year: '',
    staffId: '',
  });
  const [staffList, setStaffList] = useState([]); // Lưu danh sách nhân viên
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const currentYear = new Date().getFullYear(); // Lấy năm hiện tại

  useEffect(() => {
    // Lấy danh sách nhân viên khi component được render
    const fetchStaffList = async () => {
      try {
        const staffData = await getAllStaff();
        setStaffList(staffData);
      } catch (err) {
        setError('Failed to fetch staff list');
      }
    };
    fetchStaffList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate trực tiếp khi nhập giá trị
    if (name === 'totalStudent') {
      if (value < 10 || value > 50) {
        setError('Total students must be between 10 and 50.');
      } else {
        setError('');
      }
    }

    if (name === 'year') {
      if (value < currentYear) {
        setError(`Year must not be less than ${currentYear}.`);
      } else {
        setError('');
      }
    }

    setClassData({ ...classData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra tổng số học sinh
    if (classData.totalStudent < 10 || classData.totalStudent > 50) {
      setError('Total students must be between 10 and 50.');
      setSuccess(false);
      return;
    }

    // Kiểm tra năm
    if (classData.year < currentYear) {
      setError(`Year must not be less than ${currentYear}.`);
      setSuccess(false);
      return;
    }

    try {
      const newClass = await addClass(classData);
      setSuccess(true);
      setError('');
      console.log('Class added successfully:', newClass);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Class</h2>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">Class created successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={classData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Students:</label>
          <input
            type="number"
            name="totalStudent"
            className="form-control"
            value={classData.totalStudent}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Year:</label>
          <input
            type="number"
            name="year"
            className="form-control"
            value={classData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Staff:</label>
          <select
            name="staffId"
            className="form-select"
            value={classData.staffId}
            onChange={handleChange}
            required
          >
            <option value={0}>Select Staff</option>
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.user.name} {/* Hiển thị tên nhân viên */}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Class</button>
      </form>
    </div>
  );
};

export default AdminClassAdd;
