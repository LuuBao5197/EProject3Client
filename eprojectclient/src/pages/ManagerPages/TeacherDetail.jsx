import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css';

function TeacherDetail() {
    const { id } = useParams();  // Get teacher ID from URL
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5190/api/Manager/GetTeacherDetail/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setTeacher(res.data); // Save teacher details to state
                }
            })
            .catch(err => {
                console.error("Error fetching teacher details", err);
            });
    }, [id]);

    if (!teacher) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.teacherDetailContainer}>
            <h1>Teacher Detail</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan="2">Teacher Information</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Teacher ID:</strong></td>
                        <td>{teacher.teacherId}</td>
                    </tr>
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>{teacher.teacherName}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>{teacher.teacherEmail}</td>
                    </tr>
                    <tr>
                        <td><strong>Phone:</strong></td>
                        <td>{teacher.teacherPhone}</td>
                    </tr>
                    <tr>
                        <td><strong>Join Date:</strong></td>
                        <td>{teacher.joinDate}</td>
                    </tr>
                    <tr>
                        <td><strong>Is Reviewer:</strong></td>
                        <td>{teacher.isReviewer ? "Yes" : "No"}</td>
                    </tr>
                </tbody>
            </table>

            <h3 className={styles.submissionsTitle}>Classes</h3>
            {teacher.classes.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Year</th>
                            <th>Total Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacher.classes.map((classItem) => (
                            <tr key={classItem.classId}>
                                <td>{classItem.className}</td>
                                <td>{classItem.schoolYear}</td>
                                <td>{classItem.totalStudents}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No classes assigned</p>
            )}

            <h3 className={styles.submissionsTitle}>Staff Subjects</h3>
            {teacher.staffSubjects.length > 0 ? (
                <ul>
                    {teacher.staffSubjects.map((subject, index) => (
                        <li key={index}>{subject.Name}</li>
                    ))}
                </ul>
            ) : (
                <p>No subjects assigned</p>
            )}

            <h3 className={styles.submissionsTitle}>Staff Qualifications</h3>
            {teacher.staffQualifications.length > 0 ? (
                <ul>
                    {teacher.staffQualifications.map((qualification, index) => (
                        <li key={index}>{qualification.qualification}</li>
                    ))}
                </ul>
            ) : (
                <p>No qualifications available</p>
            )}

            <h3 className={styles.submissionsTitle}>Organized Contests</h3>
            {teacher.organizedContests.length > 0 ? (
                <ul>
                    {teacher.organizedContests.map((contest, index) => (
                        <li key={index}>
                            {contest.Name} ({contest.Date})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No contests organized</p>
            )}

            <h3 className={styles.submissionsTitle}>Organized Exhibitions</h3>
            {teacher.organizedExhibitions.length > 0 ? (
                <ul>
                    {teacher.organizedExhibitions.map((exhibition, index) => (
                        <li key={index}>
                            {exhibition.Name} ({exhibition.Date})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No exhibitions organized</p>
            )}

            <h3 className={styles.submissionsTitle}>Submission Reviews</h3>
            {teacher.submissionReviews.length > 0 ? (
                <ul>
                    {teacher.submissionReviews.map((review, index) => (
                        <li key={index}>
                            <strong>{review.reviewText}</strong>
                            <br />
                            <strong>Rating Level:</strong> {review.ratingLevel}
                            <br />
                            <strong>Review Date:</strong> {review.reviewDate}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews available</p>
            )}
        </div>
    );
}

export default TeacherDetail;
