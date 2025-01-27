import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../../layout/AdminLayout.module.css'; 

function Requests() {
    const [requests, setRequests] = useState([]); 
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);       

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5190/api/Manager/GetAllRequest');
                setRequests(response.data);  
                setLoading(false);
            } catch (err) {
                setError('Can not loading data!');
                setLoading(false);
            }
        };

        fetchRequests();  
    }, []);  

    const handleUpdateRequestStatus = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:5190/api/Manager/UpdateRequest/${id}`, {
                status,  
            });
    
            if (response.status === 200) {
                setRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.id === id ? { ...request, status: response.data.data.status } : request
                    )
                );
                alert('Cập nhật trạng thái thành công!');
            }
        } catch (err) {
            console.error("Error occurred while updating request:", err);
            alert('Cập nhật thất bại. Vui lòng thử lại!');
        }
    };    

    const handleAccept = (id) => {
        handleUpdateRequestStatus(id, 'Accepted');
    };
    
    const handleReject = (id) => {
        handleUpdateRequestStatus(id, 'Rejected');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.requestsContainer}>
            <h2 className='text-center'>REQUEST</h2>
            <table className={styles.requestsTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>MEETING TIME</th>
                        <th>STATUS</th>
                        <th>By</th>
                        <th>CONFIRM</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{new Date(request.meetingTime).toLocaleString()}</td>
                            <td>{request.status}</td>
                            <td>{request.organized || 'Test'}</td>
                            <td className="text-center">
                                {request.status === 'Approving' && (
                                    <>
                                        <button
                                            className={`${styles.confirmButton} ${styles.acceptButton}`}
                                            onClick={() => handleAccept(request.id)}
                                        >
                                            <FontAwesomeIcon icon={faCheckCircle} /> 
                                        </button>
                                        <button
                                            className={`${styles.confirmButton} ${styles.rejectButton}`}
                                            onClick={() => handleReject(request.id)}
                                        >
                                            <FontAwesomeIcon icon={faTimesCircle} /> 
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Requests;
