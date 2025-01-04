import axios from "axios";
import React, { useState, useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from '../../layout/AdminLayout.module.css';

function StudentManagement() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5190/api/Manager/GetAllStudent")
            .then(res => {
                if (res.status === 200) {
                    setStudents(res.data);
                }
            })
            .catch(err => {
                console.error('Error fetching students', err);
            });
    }, [students]);

    return (
        <div className={styles.studentManagementContainer}>
            <h1 className={styles.title}>STUDENT LIST</h1>
            <div className={styles.studentRows}>
                {students.length > 0 && students.map((item, index) => (
                    <div className={styles.studentRow} key={index}>
                        <Link to={`/admin/studentdetail/${item.id}`} className={styles.studentItem}>
                            <span className={styles.link}>{item.id}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentManagement;
