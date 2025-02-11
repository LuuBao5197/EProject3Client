import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../layout/AdminLayout.module.css'; 

const Rejected = () => {
    const [rejectedAwards, setRejectedAwards] = useState([]);
    const [rejectedContests, setRejectedContests] = useState([]);
    const [rejectedExhibitions, setRejectedExhibitions] = useState([]);
    const [rejectedStudentAwards, setRejectedStudentAwards] = useState([]);
    const [rejectedExhibitionArtworks, setRejectedExhibitionArtworks] = useState([]);
    const [rejectedContestJudges, setRejectedContestJudges] = useState([]);
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
                const rejectedAwards = awardResponse.data.filter(item => item.status === 'Rejected');
                const rejectedContests = contestResponse.data.filter(item => item.status === 'Rejected');
                const rejectedExhibitions = exhibitionResponse.data.filter(item => item.status === 'Rejected');
                const rejectedStudentAwards = studentAwardResponse.data.filter(item => item.status === 'Rejected');
                const rejectedExhibitionArtworks = exhibitionartworkRespone.data.filter(item => item.status === 'Rejected');
                const rejectedContestJudges = contestJudgeRespone.data.filter(item => item.status === 'Rejected');

                setRejectedAwards(rejectedAwards);
                setRejectedContests(rejectedContests);
                setRejectedExhibitions(rejectedExhibitions);
                setRejectedStudentAwards(rejectedStudentAwards);
                setRejectedExhibitionArtworks(rejectedExhibitionArtworks);
                setRejectedContestJudges(rejectedContestJudges);
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

            <h2 className={styles['approved-header']}>Rejected Exhibitions</h2>
            {rejectedExhibitions.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {rejectedExhibitions.map((exhibition) => (
                        <li key={exhibition.id} className={styles['approved-item']}>
                            <strong>ID:</strong> {exhibition.id} <br />
                            <strong>Name:</strong> {exhibition.name} <br />
                            <strong>Description:</strong> {exhibition.description} <br />
                            <strong>Status:</strong> {exhibition.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No rejected exhibitions found.</div>
            )}

            <h2 className={styles['approved-header']}>Rejected Student Awards</h2>
            {rejectedStudentAwards.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {rejectedStudentAwards.map((studentAward) => (
                        <li key={studentAward.id} className={styles['approved-item']}>
                            <strong>ID:</strong> {studentAward.id} <br />
                            <strong>Student ID:</strong> {studentAward.studentId} <br />
                            <strong>Award ID:</strong> {studentAward.awardId} <br />
                            <strong>Status:</strong> {studentAward.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No rejected student awards found.</div>
            )}

            <h2 className={styles['approved-header']}>Rejected Exhibition Artworks</h2>
            {rejectedExhibitionArtworks.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {rejectedExhibitionArtworks.map((exhibitionArtwork) => (
                        <li key={exhibitionArtwork.id} className={styles['approved-item']}>
                            <strong>ID:</strong> {exhibitionArtwork.id} <br />
                            <strong>Exhibition ID:</strong> {exhibitionArtwork.exhibitionId} <br />
                            <strong>Artwork ID:</strong> {exhibitionArtwork.artworkId} <br />
                            <strong>Status:</strong> {exhibitionArtwork.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No rejected exhibition artworks found.</div>
            )}

            <h2 className={styles['approved-header']}>Rejected Contest Judges</h2>
            {rejectedContestJudges.length > 0 ? (
                <ul className={styles['approved-items-list']}>
                    {rejectedContestJudges.map((contestJudge) => (
                        <li key={contestJudge.id} className={styles['approved-item']}>
                            <strong>ID:</strong> {contestJudge.id} <br />
                            <strong>Staff ID:</strong> {contestJudge.staffId} <br />
                            <strong>Contest ID:</strong> {contestJudge.contestId} <br />
                            <strong>Status:</strong> {contestJudge.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles['no-data-message']}>No rejected contest judges found.</div>
            )}
        </div>
    );
};

export default Rejected;
