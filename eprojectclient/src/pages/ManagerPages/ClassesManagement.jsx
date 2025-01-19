import axios from "axios";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from '../../layout/AdminLayout.module.css';

function ClassesManagement() {
    const [classes, setClasses] = useState([]);
    const [searchYear, setSearchYear] = useState(''); 

    useEffect(() => {
        axios.get("http://localhost:5190/api/Manager/GetAllClass")
            .then(res => {  
                if (res.status === 200) {
                    setClasses(res.data);
                }
            })
            .catch(err => {
                console.error('Error fetching classes', err);
            });
    }, []);

    const filteredClasses = classes.filter(item => 
        item.year.toString().includes(searchYear)
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setSearchYear(value); 
        }
    };

    return (
        <div className={styles.exhibitionManagementContainer}>
            <h1 className={styles.title}>CLASSES</h1>

            <div className={styles.searchContainer}>
                <label htmlFor="searchYear" className="form-label">Search by School Year</label>
                <input 
                    type="text" 
                    id="searchYear" 
                    className={styles.searchInput} 
                    value={searchYear} 
                    onChange={handleSearchChange} 
                    placeholder="Enter year"
                />
            </div>
            
            <div className={styles.exhibitionRows}>
                {filteredClasses.length === 0 ? (
                    <p>No classes available for the selected year.</p>
                ) : (
                    filteredClasses.map((item, index) => (
                        <div className={styles.exhibitionItem} key={index}>
                            <Link to={`/manager/students/${item.id}`} className={styles.imageLink}>
                                <div className={styles.defaultImage}>
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.name} /> 
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </div>
                                <h4>{item.name}</h4>
                                <h5>Teacher: {item.teacherName}</h5>
                                <h5>Student: {item.totalStudent}</h5>    
                                <h5>School Year: {item.year}</h5>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ClassesManagement;
