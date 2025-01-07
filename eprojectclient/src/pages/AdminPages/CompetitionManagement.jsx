import axios from "axios";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from '../../layout/AdminLayout.module.css';

function CompetitionManagement() {
    const [competitions, setCompetitions] = useState([]);
    const [filteredCompetitions, setFilteredCompetitions] = useState([]);
    const [startDate, setStartDate] = useState("00/00/0000");
    const [endDate, setEndDate] = useState("00/00/0000");

    useEffect(() => {
        // Fetching all competitions from API when component mounts
        axios.get("http://localhost:5190/api/Manager/GetAllContest")
            .then(res => {
                if (res.status === 200) {
                    setCompetitions(res.data);
                    setFilteredCompetitions(res.data); // Initially show all competitions
                }
            })
            .catch(err => {
                console.error('Error fetching competitions', err);
            });
    }, []);

    const handleDateChange = (e, setter) => {
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, "/");
        setter(value);
    };

    const validateDate = (dateString) => {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        return regex.test(dateString);
    };

    const isValidDate = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);

        if (year > 2025) return false;

        if (month < 1 || month > 12) return false;

        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) return false;

        return true;
    };

    useEffect(() => {
        if (startDate === "00/00/0000" && endDate === "00/00/0000") {
            setFilteredCompetitions(competitions);
            return;
        }

        if (!startDate || !endDate || !validateDate(startDate) || !validateDate(endDate)) {
            return;
        }

        if (!isValidDate(startDate) || !isValidDate(endDate)) {
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            const temp = startDate;
            setStartDate(endDate);
            setEndDate(temp);
            return;
        }

        const filtered = competitions.filter(item => {
            const contestStartDate = new Date(item.startDate);
            const contestEndDate = new Date(item.endDate);

            return contestStartDate >= new Date(startDate) && contestEndDate <= new Date(endDate);
        });

        if (filtered.length === 0) {
            setFilteredCompetitions(null);
        } else {
            setFilteredCompetitions(filtered);
        }

    }, [startDate, endDate, competitions]); 

    return (
        <div className={styles.competitionManagementContainer}>
            <h1 className={styles.title}>COMPETITION LIST</h1>

            <div className={styles.sortContainer}>
                <div className={styles.sortInput}>
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="text"
                        id="startDate"
                        value={startDate}
                        onInput={(e) => handleDateChange(e, setStartDate)}
                        className={styles.dateInput}
                        maxLength={10} 
                        placeholder="00/00/0000"
                    />
                </div>

                <div className={styles.sortInput}>
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="text"
                        id="endDate"
                        value={endDate}
                        onInput={(e) => handleDateChange(e, setEndDate)}
                        className={styles.dateInput}
                        maxLength={10} 
                        placeholder="00/00/0000"
                    />
                </div>
            </div>

            {filteredCompetitions === null ? (
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
