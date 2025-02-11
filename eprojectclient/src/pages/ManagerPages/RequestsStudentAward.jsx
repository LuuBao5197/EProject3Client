import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css'; // Đảm bảo rằng bạn đã import đúng file CSS

function RequestsStudentAward() {
    const { studentId, awardId } = useParams();  // Lấy tham số từ URL
    const navigate = useNavigate(); 
    const [awardDetail, setAwardDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!studentId || !awardId) {
            setError("Invalid studentId or awardId");
            setLoading(false);
            return;
        }

        const fetchAwardDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5190/api/Manager/GetStudentAwardDetail/${studentId}/${awardId}`);
                setAwardDetail(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error while fetching data!');
                setLoading(false);
            }
        };

        fetchAwardDetail();
    }, [studentId, awardId]);

    const updateStatus = (newStatus) => {
        const updateAward = {
            ...awardDetail,
            status: newStatus,
        };

        axios.put(`http://localhost:5190/api/Manager/UpdateStudentAwardStatus/${studentId}/${awardId}`, updateAward)
            .then((response) => {
                setAwardDetail({ ...awardDetail, status: newStatus });
                setSuccessMessage('Status updated successfully!');

                setTimeout(() => {
                    navigate('/manager/requests');
                }, 2000);
            })
            .catch((err) => {
                setError('Error while updating status!');
            });
    };

    if (loading) {
        return <div className={styles['award-loading-message']}>Loading...</div>;
    }

    if (error) {
        return <div className={styles['award-error-message']}>{error}</div>;
    }

    if (!awardDetail) {
        return <div className={styles['award-error-message']}>Award details not found.</div>;
    }

    return (
        <div className={styles['award-container']}>
            <h2 className={styles['award-header']}>Student Award Detail</h2>
            <ul className={styles['award-details-list']}>
                <li><strong>Student ID:</strong> {awardDetail.studentId}</li>
                <li><strong>Award ID:</strong> {awardDetail.awardId}</li>
                <li><strong>Status:</strong> {awardDetail.status}</li>
                <li><strong>Student:</strong> {awardDetail.student ? awardDetail.student : 'No student information available'}</li>
                <li><strong>Award:</strong> {awardDetail.award ? awardDetail.award : 'No award information available'}</li>
            </ul>

            {successMessage && (
                <div className={styles['award-success-message']}>
                    {successMessage}
                </div>
            )}

            <div className={styles['award-button-container']}>
                <button 
                    className={styles['award-button-approved']} 
                    onClick={() => updateStatus('Approved')}
                >
                    Approve
                </button>
                <button  
                    className={styles['award-button-rejected']} 
                    onClick={() => updateStatus('Rejected')}
                >
                    Reject
                </button>
            </div>
        </div>
    );
}

export default RequestsStudentAward;
