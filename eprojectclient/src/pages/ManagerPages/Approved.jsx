import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css'; 

const Approved = () => {
    const [approvedAwards, setApprovedAwards] = useState([]);
    const [approvedContests, setApprovedContests] = useState([]);
    const [approvedExhibitions, setApprovedExhibitions] = useState([]);
    const [approvedStudentAwards, setApprovedStudentAwards] = useState([]);
    const [approvedExhibitionArtworks, setApprovedExhibitionArtworks] = useState([]);
    const [approvedContestJudges, setApprovedContestJudges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchAwards = axios.get('http://localhost:5190/api/Manager/GetAllAward');
        const fetchContests = axios.get('http://localhost:5190/api/Manager/GetAllContest');
        const fetchExhibitions = axios.get('http://localhost:5190/api/Manager/GetAllExhibition');
        const fetchStudentAwards = axios.get('http://localhost:5190/api/Manager/GetAllStudentAward');
        const fetchExhibitionArtworks = axios.get('http://localhost:5190/api/Manager/GetAllExhibitionArtwork');
        const fetchContestJudges = axios.get('http://localhost:5190/api/Manager/GetAllContestJudge');

        Promise.all([fetchAwards, fetchContests, fetchExhibitions, fetchStudentAwards, fetchExhibitionArtworks, fetchContestJudges])
            .then(([awardResponse, contestResponse, exhibitionResponse, studentAwardResponse, exhibitionartworkRespone, contestJudgeRespone]) => {
                const approvedAwards = awardResponse.data.filter(item => item.status === 'Approved');
                const approvedContests = contestResponse.data.filter(item => item.status === 'Approved');
                const approvedExhibitions = exhibitionResponse.data.filter(item => item.status === 'Approved');
                const approvedStudentAwards = studentAwardResponse.data.filter(item => item.status === 'Approved');
                const approvedExhibitionArtworks = exhibitionartworkRespone.data.filter(item => item.status === 'Approved');
                const approvedContestJudges = contestJudgeRespone.data.filter(item => item.status === 'Approved');

                setApprovedAwards(approvedAwards);
                setApprovedContests(approvedContests);
                setApprovedExhibitions(approvedExhibitions);
                setApprovedStudentAwards(approvedStudentAwards);
                setApprovedExhibitionArtworks(approvedExhibitionArtworks);
                setApprovedContestJudges(approvedContestJudges);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error fetching data!');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className={styles['loading-message']}>Loading approved items...</div>;
    }

    if (error) {
        return <div className={styles['error-message']}>{error}</div>;
    }

    return (
        <div className={styles['approved-container']}>
            <h2 className={styles['approved-header']}>Approved Awards</h2>
            {approvedAwards.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {approvedAwards.map((award) => (
                        <li key={award.id} className={styles['approved-item']}>
                            <strong>ID:</strong> {award.id} <br />
                            <strong>Name:</strong> {award.name} <br />
                            <strong>Value:</strong> ${award.value} <br />
                            <strong>Status:</strong> {award.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No approved awards found.</div>
            )}

            <h2 className={styles['approved-header']}>Approved Contests</h2>
            {approvedContests.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {approvedContests.map((contest) => (
                        <li key={contest.id} className={styles['approved-item']}>
                            <strong>ID:</strong> {contest.id} <br />
                            <strong>Name:</strong> {contest.name} <br />
                            <strong>Description:</strong> {contest.description} <br />
                            <strong>Status:</strong> {contest.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No approved contests found.</div>
            )}

            <h2 className={styles['approved-header']}>Approved Exhibitions</h2>
            {approvedExhibitions.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {approvedExhibitions.map((exhibition) => (
                        <li key={exhibition.id} className={styles['approved-item']}>
                            <strong>ID:</strong> {exhibition.id} <br />
                            <strong>Name:</strong> {exhibition.name} <br />
                            <strong>Description:</strong> {exhibition.description} <br />
                            <strong>Status:</strong> {exhibition.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No approved exhibitions found.</div>
            )}

            <h2 className={styles['approved-header']}>Approved Student Awards</h2>
            {approvedStudentAwards.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {approvedStudentAwards.map((studentAward) => (
                        <li key={studentAward.id} className={styles['approved-item']}>
                            <strong>Student ID:</strong> {studentAward.studentId} <br />
                            <strong>Award ID:</strong> {studentAward.awardId} <br />
                            <strong>Status:</strong> {studentAward.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No approved student awards found.</div>
            )}

            <h2 className={styles['approved-header']}>Approved Exhibition Artworks</h2>
            {approvedExhibitionArtworks.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {approvedExhibitionArtworks.map((exhibitionArtwork) => (
                        <li key={exhibitionArtwork.id} className={styles['approved-item']}>
                            <strong>Exhibition ID:</strong> {exhibitionArtwork.exhibitionId} <br />
                            <strong>Artwork ID:</strong> {exhibitionArtwork.artworkId} <br />
                            <strong>Status:</strong> {exhibitionArtwork.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No approved exhibition artworks found.</div>
            )}

            <h2 className={styles['approved-header']}>Approved Contest Judges</h2>
            {approvedContestJudges.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {approvedContestJudges.map((contestJudge) => (
                        <li key={contestJudge.id} className={styles['approved-item']}>
                            <strong>Staff ID:</strong> {contestJudge.staffId} <br />
                            <strong>Contest ID:</strong> {contestJudge.contestId} <br />
                            <strong>Status:</strong> {contestJudge.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No approved contest judges found.</div>
            )}
            
        </div>
    );
};

export default Approved;
