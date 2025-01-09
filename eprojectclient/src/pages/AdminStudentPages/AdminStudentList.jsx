import React, { useEffect, useState } from 'react';
import {
  getAllStudents,
  deleteStudent,
} from '../../API/getAdminStudent';

const AdminStudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents(); // Lấy danh sách sinh viên
      setStudents(data); // Giả sử data là danh sách sinh viên
      console.log(data);
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const data = await searchStudentsByName(search); // Gọi hàm tìm kiếm
      setStudents(data); // Giả sử data trả về là danh sách đã tìm kiếm
    } catch (error) {
      alert("No students found with that name.");
      console.error("Error searching students:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
     
      await deleteStudent(id); 
      fetchStudents(); 
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
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
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.user.name }</td>
              <td>{student.user.email }</td>
              <td>
                <button onClick={() => onEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudentList;
