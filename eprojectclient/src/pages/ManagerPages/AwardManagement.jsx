import axios from "axios";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from '../../layout/AdminLayout.module.css';

function AwardManagement() {
    const [awards, setAwards] = useState([]);
    const [contestId, setContestId] = useState('');  
    const [filteredAwards, setFilteredAwards] = useState([]);  

    useEffect(() => {
        axios.get("http://localhost:5190/api/Manager/GetAllAward")
            .then(res => {
                if (res.status === 200) {
                    setAwards(res.data);
                    setFilteredAwards(res.data);  
                }
            })
            .catch(err => {
                console.error('Error fetching awards', err);
            });
    }, []);

    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
        setContestId(filterValue);

        if (filterValue) {
            const filtered = awards.filter(award => award.contestId === parseInt(filterValue));
            setFilteredAwards(filtered);
        } else {
            setFilteredAwards(awards);
        }
    };

    return (
        <div className={styles.competitionManagementContainer}>
            <h1 className={styles.title}>AWARD LIST</h1>
            
            <div className="mb-3">
                <label htmlFor="contestId" className="form-label">Filter by Contest ID:</label>
                <input
                    type="number"
                    className="form-control"
                    id="contestId"
                    value={contestId}
                    onChange={handleFilterChange}
                    placeholder="Enter Contest ID"
                />
            </div>

            <div className={styles.competitionRows}>
                {filteredAwards.length === 0 ? (
                    <p>No awards available at the moment.</p>
                ) : (
                    filteredAwards.map((item, index) => (
                        <div className={styles.competitionItem} key={index}>
                            <div className={styles.defaultImage}>No Image</div>
                            <h3>{item.name}</h3>
                            <p>Value: {item.value}</p>
                            <p>Award Quantity: {item.awardQuantity}</p>
                            <p>Contest ID: {item.contestId}</p>
                            <Link to={`/admin/awarddetail/${item.id}`} className={styles.link}>View Details</Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default AwardManagement;
