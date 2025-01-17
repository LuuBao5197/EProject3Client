import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import './AdminStudentList.css';
import { getAllStudents } from '../../API/getAdminStudent';
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng

const AdminStudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // Khai báo hook navigate

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching students:', error.message);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      $('#studentsTable').DataTable();
    }
    return () => {
      if ($.fn.DataTable.isDataTable('#studentsTable')) {
        $('#studentsTable').DataTable().destroy();
      }
    };
  }, [students]);

  const handleDetailClick = (id) => {
    // Điều hướng tới trang chi tiết của sinh viên với id
    navigate(`/adminstudent/adminstudentdetail/${id}`);
  };

  return (
    <div>
      <table id="studentsTable" className="display">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.user.username}</td>
              <td>{student.user.name}</td>
              <td>{student.user.email}</td>
              <td>{student.user.phone}</td>
              <td>
                {student.studentClasses && student.studentClasses.length > 0
                  ? student.studentClasses.map((sc, index) => (
                      <span key={index}>{sc.class.name}</span>  // Hiển thị tên lớp
                    ))
                  : 'No classes'}
              </td>
              <td>
                {/* Thay thế Delete bằng Detail */}
                <button onClick={() => handleDetailClick(student.id)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudentList;
