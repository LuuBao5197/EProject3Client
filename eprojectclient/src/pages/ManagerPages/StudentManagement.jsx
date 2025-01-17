import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import styles from '../../layout/AdminLayout.module.css';

function StudentManagement() {
    const [classDetails, setClassDetails] = useState(null);
    const { classId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5190/api/Manager/GetStudentByClass/${classId}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    setClassDetails(res.data);
                }
            })
            .catch(err => {
                console.error('Error fetching class details', err);
            });
    }, [classId]);

    if (!classDetails) {
        return <p>Loading...</p>;
    }

    const students = classDetails.students || [];

    if (students.length === 0) {
        return <p>No students available for this class.</p>;
    }

    return (
        <div className={styles.studentManagementContainer}>
            <h1 className={styles.title}>Students of Class {classDetails.className}</h1>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan="2" className="">Teacher Of Class</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Teacher Name:</strong></td>
                        <td className={styles.teacherName}>
                            <Link to={`/manager/teacherdetail/${classDetails.teacherId}`}>
                                {classDetails.teacherName || "No teacher assigned"}
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>School Year:</strong></td>
                        <td className={styles.teacherName}>{classDetails.schoolYear}</td>
                    </tr>
                </tbody>
            </table>

            <h3 className={styles.titleStudentList}>Student List</h3>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Admission Date</th>
                        <th>Parent Name</th>
                        <th>Parent Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.id}</td>
                            <td>{student.user?.name || "No name available"}</td>
                            <td>{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                            <td>{student.parentName}</td>
                            <td>{student.parentPhoneNumber}</td>
                            <td>
                                <Link to={`/manager/studentdetail/${student.id}`}>
                                    <button className="btn btn-info">
                                        <i className="fa fa-info-circle"></i>
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentManagement;
