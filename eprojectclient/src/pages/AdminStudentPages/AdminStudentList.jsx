import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import { getAllStudents, updateStudentStatus } from '../../API/getAdminStudent';
import { useNavigate } from 'react-router-dom';

const AdminStudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
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
    navigate(`/admin/Update-Student/${id}`);
  };

  const handleDetailClick = (id) => {
    navigate(`/admin/Student-Detail/${id}`);
  };

  const handleBanClick = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Đảo trạng thái true <-> false
      await updateStudentStatus(id, newStatus);
      
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === id ? { ...student, user: { ...student.user, status: newStatus } } : student
        )
      );
    } catch (error) {
      console.error('Error updating student status:', error.message);
    }
  };

  return (
    <div className="container mt-2">
      <h2 className="mb-4 text-center mt-auto">Student List</h2>
      <table id="studentsTable" className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Class</th>
            <th>Status</th>
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
                      <span key={index}>{sc.class.name}</span>
                    ))
                  : 'No classes'}
              </td>
              <td>
                <span className={`badge ${student.user.status ? 'bg-success' : 'bg-danger'}`}>
                  {student.user.status ? 'Active' : 'Banned'}
                </span>
              </td>
              <td>
                <button onClick={() => handleDetailClick(student.id)} className="btn btn-info btn-sm">
                  View Details
                </button>
                <button onClick={() => handleUpdateClick(student.id)} className="btn btn-warning btn-sm ml-2">
                  Update
                </button>
                <button
                  onClick={() => handleBanClick(student.id, student.user.status)}
                  className={`btn btn-${student.user.status ? 'danger' : 'success'} btn-sm ml-2`}
                >
                  {student.user.status ? 'Ban' : 'Unban'}
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
