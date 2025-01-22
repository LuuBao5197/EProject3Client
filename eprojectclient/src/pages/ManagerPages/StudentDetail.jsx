import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css';

function StudentDetail() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5190/api/Manager/GetStudentDetail/${id}`)
            .then((response) => {
                setStudent(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the student details!", error);
            });
    }, [id]);

    if (!student) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.studentDetailContainer}>
            <h1>Student Detail</h1>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan="2">Student Information</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Student ID:</strong></td>
                        <td>{student.id}</td>
                    </tr>
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>{student.user?.name || "No name available"}</td>
                    </tr>
                    <tr>
                        <td><strong>Enrollment Date:</strong></td>
                        <td>{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td><strong>Parent Name:</strong></td>
                        <td>{student.parentName}</td>
                    </tr>
                    <tr>
                        <td><strong>Parent Phone:</strong></td>
                        <td>{student.parentPhoneNumber}</td>
                    </tr>
                </tbody>
            </table>

            <h3 className={styles.submissionsTitle}>Submissions</h3>
            {student.submissions && student.submissions.length > 0 ? (
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Submission ID</th>
                            <th>Contest</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Submission Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student.submissions.map((submission) => (
                            <tr key={submission.id}>
                                <td>{submission.id}</td>
                                <td>{submission.contest?.name || "No contest"}</td>
                                <td>{submission.description}</td>
                                <td>{submission.status || "Not Reviewed"}</td>
                                <td>
                                    {submission.submissionReviews && submission.submissionReviews.length > 0 ? (
                                        <Link
                                            to={`/manager/submissionsreviewdetail/${submission.id}`}
                                        >
                                            <button className="btn btn-info">
                                                Review Detail      <i className="fa fa-info-circle"></i>
                                            </button>
                                        </Link>
                                    ) : (
                                        <span>No reviews available</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No submissions found.</p>
            )}
        </div>
    );
}

export default StudentDetail;
