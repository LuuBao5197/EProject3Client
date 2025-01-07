import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../layout/AdminLayout.module.css';

function ExhibitionDetail() {
    const { id } = useParams(); 
    const [exhibition, setExhibition] = useState(null);  

    useEffect(() => {
        axios.get(`http://localhost:5190/api/Manager/GetExhibitionDetail/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setExhibition(res.data);
                }
            })
            .catch(err => {
                console.error('Error fetching exhibition detail', err);
            });
    }, [id]); 

    if (!exhibition) {
        return <p>Loading...</p>; 
    }

    return (
        <div className={styles.exhibitionDetailContainer}>
            <h1 className={styles.title}>{exhibition.name}</h1>

            <div className={styles.exhibitionInfo}>
                <p><strong>ID:</strong> {exhibition.id}</p>
                <p><strong>Name:</strong> {exhibition.name}</p>
                <p><strong>Start Date:</strong> {new Date(exhibition.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(exhibition.endDate).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {exhibition.location}</p>
                <p><strong>Organized By:</strong> {exhibition.organizedBy}</p>
                <p><strong>Organizer:</strong> {exhibition.organizer}</p>
                <p><strong>Exhibition Artworks:</strong> {exhibition.exhibitionArtworks}</p>
            </div>
        </div>
    );
}

export default ExhibitionDetail;
