import axios from "axios";
import React, { useState, useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from '../../layout/AdminLayout.module.css';

function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5190/api/Manager/GetAllStudent")
            .then(res => {
                if (res.status === 200) {
                    setStudents(res.data);
                    setFilteredStudents(res.data); 
                }
            })
            .catch(err => {
                console.error('Error fetching students', err);
            });
    }, []);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredStudents(students); 
        } else {
            setFilteredStudents(
                students.filter(student =>
                    student.parentName.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, students]);

    return (
        <div className={styles.studentManagementContainer}>
            <h1 className={styles.title}>STUDENT LIST</h1>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search by Name"
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>

            <div className={styles.studentRows}>
                {filteredStudents.length > 0 && filteredStudents.map((item, index) => (
                    <div className={styles.studentRow} key={index}>
                        <Link to={`/admin/studentdetail/${item.id}`} className={styles.studentItem}>
                            <span className={styles.link}>{item.parentName}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentManagement;
