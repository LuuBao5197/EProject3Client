import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function StudentDetail() {
    const { id } = useParams();
    const [student, setStudent] = useState({id: null, userId: null, enrollmentDate: "", parentName: "", parentPhoneNumber: ""});

    useEffect(() => {
        axios.get(`http://localhost:5190/api/Manager/GetStudentDetail/${id}`)
        .then(res => {
            if (res.status === 200) {
                setStudent(res.data);
            }
        })
        .catch(err => {
            console.error('Error fetching student details', err);
        });
    }, [id]);

    if (!student || !student.id) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Student Detail</h2>
            <p>ID: {student.id}</p>
            <p>User ID: {student.userId}</p>
            <p>Enrollment Date: {student.enrollmentDate}</p>
            <p>Parent Name: {student.parentName}</p>
            <p>Parent Phone: {student.parentPhoneNumber}</p>
        </div>
    );
}

export default StudentDetail;
