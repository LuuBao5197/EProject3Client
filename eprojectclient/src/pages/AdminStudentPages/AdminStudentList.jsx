import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import { getAllStudents } from '../../API/getAdminStudent';
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng
import { styled } from '@chakra-ui/system';

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
  const handleUpdateClick = (id) => {
    // Điều hướng tới trang chỉnh sửa sinh viên với id
    navigate(`/admin/Update-Student/${id}`);
  };

  const handleDetailClick = (id) => {
    // Điều hướng tới trang chi tiết của sinh viên với id
    navigate(`/admin/Student-Detail/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2  className="mb-4 text-center mt-auto" style={{ paddingTop: "50px" , paddingBottom: "1px"}}>Student List</h2>
      <table id="studentsTable" className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            
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
                <button
                  onClick={() => handleDetailClick(student.id)}
                  className="btn btn-info btn-sm"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleUpdateClick(student.id)}
                  className="btn btn-warning btn-sm ml-2"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudentList;
