import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css'; // Đảm bảo rằng bạn đã import đúng file CSS

function RequestsContestJudge() {
    const { staffId, contestId } = useParams();  // Lấy tham số từ URL
    const navigate = useNavigate(); 
    const [contestJudgeDetails, setContestJudgeDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!staffId || !contestId) {
            setError("Invalid staffId or contestId");
            setLoading(false);
            return;
        }

        const fetchContestJudgeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5190/api/Manager/GetContestJudgeDetail/${staffId}/${contestId}`);
                setContestJudgeDetails(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error while fetching data!');
                setLoading(false);
            }
        };

        fetchContestJudgeDetails();
    }, [staffId, contestId]);

    const updateStatus = (newStatus) => {
        const updateContestJudge = {
            ...contestJudgeDetails,
            status: newStatus,
        };

        axios.put(`http://localhost:5190/api/Manager/UpdateContestJudgeStatus/${staffId}/${contestId}`, updateContestJudge)
            .then((response) => {
                setContestJudgeDetails({ ...contestJudgeDetails, status: newStatus });
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

    if (!contestJudgeDetails) {
        return <div className={styles['award-error-message']}>Award details not found.</div>;
    }

    return (
        <div className={styles['award-container']}>
            <h2 className={styles['award-header']}>Student Award Detail</h2>
            <ul className={styles['award-details-list']}>
                <li><strong>Student ID:</strong> {contestJudgeDetails.staffId}</li>
                <li><strong>Award ID:</strong> {contestJudgeDetails.contestId}</li>
                <li><strong>Status:</strong> {contestJudgeDetails.status}</li>
                <li><strong>Student:</strong> {contestJudgeDetails.student ? contestJudgeDetails.student : 'No student information available'}</li>
                <li><strong>Award:</strong> {contestJudgeDetails.award ? contestJudgeDetails.award : 'No award information available'}</li>
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

export default RequestsContestJudge;
