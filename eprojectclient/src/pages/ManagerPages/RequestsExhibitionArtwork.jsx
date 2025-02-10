import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css'; // Đảm bảo rằng bạn đã import đúng file CSS

function RequestsStudentAward() {
    const { exhibitionId, artworkId } = useParams();  // Lấy tham số từ URL
    const navigate = useNavigate(); 
    const [exhibitionartworkDetails, setExhibitionArtworkDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!exhibitionId || !artworkId) {
            setError("Invalid exhibitionId or artworkId");
            setLoading(false);
            return;
        }

        const fetchExhibitionArtworkDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5190/api/Manager/GetExhibitionArtworkDetail/${exhibitionId}/${artworkId}`);
                setExhibitionArtworkDetails(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error while fetching data!');
                setLoading(false);
            }
        };

        fetchExhibitionArtworkDetail();
    }, [exhibitionId, artworkId]);

    const updateStatus = (newStatus) => {
        const updateExhibitionArtwork = {
            ...exhibitionartworkDetails,
            status: newStatus,
        };

        axios.put(`http://localhost:5190/api/Manager/UpdateExhibitionArtworkStatus/${exhibitionId}/${artworkId}`, updateExhibitionArtwork)
            .then((response) => {
                setExhibitionArtworkDetails({ ...exhibitionartworkDetails, status: newStatus });
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

    if (!exhibitionartworkDetails) {
        return <div className={styles['award-error-message']}>Artwork details not found.</div>;
    }

    return (
        <div className={styles['award-container']}>
            <h2 className={styles['award-header']}>Student Artwork Detail</h2>
            <ul className={styles['award-details-list']}>
                <li><strong>Exhibition ID:</strong> {exhibitionartworkDetails.exhibitionId}</li>
                <li><strong>Artwork ID:</strong> {exhibitionartworkDetails.artworkId}</li>
                <li><strong>Status:</strong> {exhibitionartworkDetails.status}</li>
                <li><strong>Exhibition:</strong> {exhibitionartworkDetails.exhibition ? exhibitionartworkDetails.exhibition : 'No student information available'}</li>
                <li><strong>Artwork:</strong> {exhibitionartworkDetails.artwork ? exhibitionartworkDetails.artwork : 'No award information available'}</li>
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
