import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../layout/AdminLayout.module.css';

function Requests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5190/api/Manager/GetAllRequest');
                const updatedRequests = response.data.map(request => {
                    const currentTime = Date.now(); 
                    const meetingTime = new Date(request.meetingTime).getTime(); 

                    if (meetingTime < currentTime) {
                        if (request.status !== 'DONE') {
                            request.status = 'DONE';
                        }
                    } else if (meetingTime - currentTime <= 60 * 60 * 1000) {
                        if (request.status !== 'PREPARING') {
                            request.status = 'PREPARING';
                        }
                    }
                    return request;
                });
                setRequests(updatedRequests);
                setLoading(false);
            } catch (err) {
                setError('Cannot load data!');
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

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
                        <th>DESCRIPTION</th>
                        <th>By</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{new Date(request.meetingTime).toLocaleString()}</td>
                            <td>{request.status}</td>
                            <td>{request.description}</td>
                            <td>{request.organized || 'Test'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Requests;
