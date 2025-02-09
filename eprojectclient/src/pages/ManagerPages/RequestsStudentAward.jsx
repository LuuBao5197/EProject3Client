import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RequestsStudentAward() {
    const { studentId, awardId } = useParams();  // Sử dụng useParams để lấy tham số từ URL
    const [awardDetail, setAwardDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!studentId || !awardId) {
            setError("Invalid studentId or awardId");
            setLoading(false);
            return;
        }

        const fetchAwardDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5190/api/Manager/GetStudentAwardDetail/${studentId}/${awardId}`, {
                    method: 'GET',
                    headers: {
                        'accept': '*/*',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setAwardDetail(data);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAwardDetail();
    }, [studentId, awardId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Student Award Detail</h1>
            <p><strong>Student ID:</strong> {awardDetail.studentId}</p>
            <p><strong>Award ID:</strong> {awardDetail.awardId}</p>
            <p><strong>Status:</strong> {awardDetail.status}</p>
            <p><strong>Student:</strong> {awardDetail.student ? awardDetail.student : 'No student information available'}</p>
            <p><strong>Award:</strong> {awardDetail.award ? awardDetail.award : 'No award information available'}</p>
        </div>
    );
}

export default RequestsStudentAward;
