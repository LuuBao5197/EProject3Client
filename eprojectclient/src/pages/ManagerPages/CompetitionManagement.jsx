import axios from "axios";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from '../../layout/AdminLayout.module.css';

function CompetitionManagement() {
    const [competitions, setCompetitions] = useState([]);
    const [filteredCompetitions, setFilteredCompetitions] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5190/api/Manager/GetAllContest")
            .then(res => {
                if (res.status === 200) {
                    setCompetitions(res.data);
                    setFilteredCompetitions(res.data);
                }
            })
            .catch(err => {
                console.error('Error fetching competitions', err);
            });
    }, []);

    const validateDateRange = () => {
        setErrorMessage(""); 

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            setErrorMessage("Start date cannot be later than end date.");
            return false;
        }

        return true;
    };

    const handleDateFilter = () => {
        if (!validateDateRange()) {
            return; 
        }

        const filtered = competitions.filter(item => {
            const itemStartDate = new Date(item.startDate);
            const itemEndDate = new Date(item.endDate);

            const userStartDate = startDate ? new Date(startDate) : null;
            const userEndDate = endDate ? new Date(endDate) : null;


            const isWithinRange = (
                (!userStartDate || itemStartDate >= userStartDate) &&  
                (!userEndDate || itemEndDate <= userEndDate)          
            );

            return isWithinRange;
        });

        setFilteredCompetitions(filtered);
    };

    return (
        <div className={styles.competitionManagementContainer}>
            <h1 className={styles.title}>COMPETITION LIST</h1>

            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

            <div className={styles.filterContainer}>
                <label htmlFor="startDate">Start Date: </label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className={styles.dateInput}
                />

                <label htmlFor="endDate">End Date: </label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className={styles.dateInput}
                />

                <button onClick={handleDateFilter} className={styles.filterButton}>
                    Search
                </button>
            </div>

            {filteredCompetitions.length === 0 ? (
                <div className={styles.noDataMessage}>
                    <p>No competitions found for the selected dates.</p>
                </div>
            ) : (
                <div className={styles.competitionRows}>
                    {filteredCompetitions.map((item, index) => (
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
