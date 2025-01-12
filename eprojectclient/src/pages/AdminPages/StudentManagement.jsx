import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css';

function StudentManagement() {
    const [students, setStudents] = useState([]);
    const { classId } = useParams(); 

    useEffect(() => {
        axios.get(`http://localhost:5190/api/Manager/GetStudentsByClass/${classId}`)
            .then(res => {
                if (res.status === 200) {
                    setStudents(res.data); 
                }
            })
            .catch(err => {
                console.error('Error fetching students', err);
            });
    }, [classId]);

    return (
        <div className={styles.studentManagementContainer}>
            <h1 className={styles.title}>Students of Class {classId}</h1>
            <div className={styles.studentRows}>
                {students.length === 0 ? (
                    <p>No students available for this class.</p>
                ) : (
                    students.map((student, index) => (
                        <div className={styles.studentItem} key={index}>
                            <h4>{student.name}</h4>
                            <h5>Student ID: {student.id}</h5>
                            <h5>Age: {student.age}</h5>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default StudentManagement;
