import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css';

const RequestsExhibition = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [exhibitionDetails, setExhibitionDetails] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(''); 

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`http://localhost:5190/api/Manager/GetExhibitionDetail/${id}`)
            .then((response) => {
                setExhibitionDetails(response.data); 
                setLoading(false); 
            })
            .catch((err) => {
                setError('Error while fetching data!'); 
                setLoading(false); 
            });
    }, [id]); 

    const updateStatus = (newStatus) => {
        const updateExhibition = {
            ...exhibitionDetails, 
            status: newStatus, 
        };

        axios.put(`http://localhost:5190/api/Manager/UpdateExhibitionStatus/${id}`, updateExhibition)
            .then((response) => {
                setExhibitionDetails({ ...exhibitionDetails, status: newStatus });

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

    if (!exhibitionDetails) {
        return <div className={styles['award-error-message']}>Exhibition details not found.</div>;
    }

    return (
        <div className={styles['award-container']}>
            <h2 className={styles['award-header']}>Exhibition Details</h2>
            <ul className={styles['award-details-list']}>
                <li><strong>ID:</strong> {exhibitionDetails.id}</li>
                <li><strong>Name:</strong> {exhibitionDetails.name}</li>
                <li><strong>Value:</strong> ${exhibitionDetails.value}</li>
                <li><strong>Contest ID:</strong> {exhibitionDetails.contestId}</li>
                <li><strong>Exhibition Quantity:</strong> {exhibitionDetails.awardQuantity}</li>
                <li><strong>Status:</strong> {exhibitionDetails.status}</li>
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

export default RequestsExhibition;
