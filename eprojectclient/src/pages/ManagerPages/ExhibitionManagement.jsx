import axios from "axios";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from '../../layout/AdminLayout.module.css';

function ExhibitionManagement() {
    const [exhibitions, setExhibitions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5190/api/Manager/GetAllExhibition")
            .then(res => {
                if (res.status === 200) {
                    setExhibitions(res.data);
                }
            })
            .catch(err => {
                console.error('Error fetching exhibitions', err);
            });
    }, []);

    return (
        <div className={styles.exhibitionManagementContainer}>
            <h1 className={styles.title}>EXHIBITION LIST</h1>
            <div className={styles.exhibitionRows}>
                {exhibitions.length === 0 ? (
                    <p>No exhibitions available at the moment.</p>
                ) : (
                    exhibitions.map((item, index) => (
                        <div className={styles.exhibitionItem} key={index}>
                            <Link to={`/manager/exhibitiondetail/${item.id}`} className={styles.imageLink}>
                                <div className={styles.defaultImage}>
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.name} />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </div>
                                <h4>{item.name}</h4>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ExhibitionManagement;
