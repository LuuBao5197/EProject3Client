import axios from "axios";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from '../../layout/AdminLayout.module.css';

function CompetitionManagement() {
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5190/api/Manager/GetAllContest")
            .then(res => {
                if (res.status === 200) {
                    setCompetitions(res.data);
                }
            })
            .catch(err => {
                console.error('Error fetching competitions', err);
            });
    }, []);

    return (
        <div className={styles.competitionManagementContainer}>
            <h1 className={styles.title}>COMPETITION LIST</h1>

            {/* Kiểm tra nếu không có dữ liệu */}
            {competitions.length === 0 ? (
                <div className={styles.noDataMessage}>
                    <p>No competitions found at the moment.</p>
                </div>
            ) : (
                <div className={styles.competitionRows}>
                    {competitions.map((item, index) => (
                        <div className={styles.competitionItem} key={index}>
                            <div className={styles.defaultImage}>
                                {item.image ? (
                                    <img src={item.image} alt={item.name} />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </div>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>{new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</p>
                            <p>Deadline: {new Date(item.submissionDeadline).toLocaleDateString()}</p>
                            <p className={`${styles.status} ${item.isActive ? '' : 'inactive'}`}>
                                {item.isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CompetitionManagement;
