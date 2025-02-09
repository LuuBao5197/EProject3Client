import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css'; 

const Rejected = () => {
    const [rejectedAwards, setRejectedAwards] = useState([]);
    const [rejectedContests, setRejectedContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchAwards = axios.get('http://localhost:5190/api/Manager/GetAllAward');
        const fetchContests = axios.get('http://localhost:5190/api/Manager/GetAllContest');

        Promise.all([fetchAwards, fetchContests])
            .then(([awardResponse, contestResponse]) => {
                const rejectedAwards = awardResponse.data.filter(item => item.status === 'Rejected');
                const rejectedContests = contestResponse.data.filter(item => item.status === 'Rejected');

                setRejectedAwards(rejectedAwards);
                setRejectedContests(rejectedContests);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error fetching data!');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className={styles['loading-message']}>Loading rejected items...</div>;
    }

    if (error) {
        return <div className={styles['error-message']}>{error}</div>;
    }

    return (
        <div className={styles['approved-container']}>
            <h2 className={styles['approved-header']}>Rejected Awards</h2>
            {rejectedAwards.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {rejectedAwards.map((award) => (
                        <li key={award.id} className={styles['approved-item']}>
                            <strong>ID:</strong> {award.id} <br />
                            <strong>Name:</strong> {award.name} <br />
                            <strong>Value:</strong> ${award.value} <br />
                            <strong>Status:</strong> {award.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No rejected awards found.</div>
            )}

            <h2 className={styles['approved-header']}>Rejected Contests</h2>
            {rejectedContests.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {rejectedContests.map((contest) => (
                        <li key={contest.id} className={styles['approved-item']}>
                            <strong>ID:</strong> {contest.id} <br />
                            <strong>Name:</strong> {contest.name} <br />
                            <strong>Description:</strong> {contest.description} <br />
                            <strong>Status:</strong> {contest.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No rejected contests found.</div>
            )}
        </div>
    );
};

export default Rejected;
