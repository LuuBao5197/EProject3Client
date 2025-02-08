import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css';

const RequestsArtwork = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [artworkDetails, setArtworkDetails] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(''); 

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`http://localhost:5190/api/Manager/GetArtworkDetail/${id}`)
            .then((response) => {
                setArtworkDetails(response.data); 
                setLoading(false); 
            })
            .catch((err) => {
                setError('Error while fetching data!'); 
                setLoading(false); 
            });
    }, [id]); 

    const updateStatus = (newStatus) => {
        const updatedAward = {
            ...artworkDetails, 
            status: newStatus, 
        };

        axios.put(`http://localhost:5190/api/Manager/UpdateAwardStatus/${id}`, updatedAward)
            .then((response) => {
                setArtworkDetails({ ...artworkDetails, status: newStatus });

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

    if (!artworkDetails) {
        return <div className={styles['award-error-message']}>Award details not found.</div>;
    }

    return (
        <div className={styles['award-container']}>
            <h2 className={styles['award-header']}>Award Details</h2>
            <ul className={styles['award-details-list']}>
                <li><strong>ID:</strong> {artworkDetails.id}</li>
                <li><strong>Name:</strong> {artworkDetails.name}</li>
                <li><strong>Value:</strong> ${artworkDetails.value}</li>
                <li><strong>Contest ID:</strong> {artworkDetails.contestId}</li>
                <li><strong>Award Quantity:</strong> {artworkDetails.awardQuantity}</li>
                <li><strong>Status:</strong> {artworkDetails.status}</li>
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
};

export default RequestsArtwork;
