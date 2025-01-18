import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css';

function SubmissionReviewDetail() {
    const { id } = useParams();
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5190/api/Manager/GetSubmissionsReviewDetail/${id}`)
            .then(response => {
                console.log("API response:", response.data);
                const submissionReviews = response.data[0]?.submissionReviews || []; 
                setReviews(submissionReviews);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching submission review data:", error);
                setLoading(false);
            });
    }, [id]);

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1; 
        const day = d.getDate();
        return `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!reviews || reviews.length === 0) {
        return <p>No review data found for this student.</p>;
    }

    return (
        <div className={styles.container}>
            <h1>Submission Review Details</h1>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Submission ID</th>
                            <th>Staff ID</th>
                            <th>Review Date</th>
                            <th>Review Text</th>
                            <th>Rating ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review.submissionId}>
                                <td>{review.submissionId}</td>
                                <td>{review.staffId}</td>
                                <td>{formatDate(review.reviewDate)}</td>
                                <td>{review.reviewText}</td>
                                <td>{review.ratingId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SubmissionReviewDetail;
