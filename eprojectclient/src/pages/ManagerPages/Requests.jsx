import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../layout/AdminLayout.module.css';
import { useParams, Link } from 'react-router-dom';
function Requests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            if (!selectedCategory) return;

            setLoading(true);
            setError(null);

            let url = '';
            if (selectedCategory === 'contest') {
                url = 'http://localhost:5190/api/Manager/GetAllContest';
            } else if (selectedCategory === 'exhibition') {
                url = 'http://localhost:5190/api/Manager/GetAllExhibition';
            } else if (selectedCategory === 'award') {
                url = 'http://localhost:5190/api/Manager/GetAllAward';
            } else if (selectedCategory === 'studentaward') {
                url = 'http://localhost:5190/api/Manager/GetAllStudentAward';
            } else if (selectedCategory === 'exhibitionartwork') {
                url = 'http://localhost:5190/api/Manager/GetAllExhibitionArtwork';
            }

            try {
                const response = await axios.get(url);
                const filteredRequests = response.data.filter(request => request.status === 'Pending');
                setRequests(filteredRequests);
                setLoading(false);
            } catch (err) {
                setError('Cannot load data!');
                setLoading(false);
            }
        };

        fetchRequests();
    }, [selectedCategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setRequests([]);
    };

    if (error) {
        return <div>{error}</div>;
    }

    const renderTable = () => {
        if (!requests.length) return <div>No pending requests</div>;

        switch (selectedCategory) {
            case 'contest':
                return (
                    <table className={styles.requestsTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>DESCRIPTION</th>
                                <th>STATUS</th>
                                <th>MORE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.id}</td>
                                    <td>{request.name || 'No name'}</td>
                                    <td>{request.description || 'No description'}</td>
                                    <td>{request.status || 'No status'}</td>
                                    <td>
                                        <Link to={`/manager/requestscontest/${request.id}`}>
                                            <button className="btn btn-info">
                                                <i className="fa fa-info-circle"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'studentaward':
                return (
                    <table className={styles.requestsTable}>
                        <thead>
                            <tr>
                                <th>STUDENT ID</th>
                                <th>AWARD ID</th>
                                <th>STATUS</th>
                                <th>MORE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.studentId}</td>
                                    <td>{request.awardId}</td>
                                    <td>{request.status || 'No status'}</td>
                                    <td>
                                        <Link to={`/manager/requestsstudentaward/${request.studentId}/${request.awardId}`}>
                                            <button className="btn btn-info">
                                                <i className="fa fa-info-circle"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'exhibition':
                return (
                    <table className={styles.requestsTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>LOCATION</th>
                                <th>STATUS</th>
                                <th>MORE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.id}</td>
                                    <td>{request.name || 'No name'}</td>
                                    <td>{request.location || 'No location'}</td>
                                    <td>{request.status || 'No status'}</td>
                                    <td>
                                        <Link to={`/manager/requestsexhibition/${request.id}`}>
                                            <button className="btn btn-info">
                                                <i className="fa fa-info-circle"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'award':
                return (
                    <table className={styles.requestsTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>VALUE</th>
                                <th>STATUS</th>
                                <th>MORE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.id}</td>
                                    <td>{request.name || 'No name'}</td>
                                    <td>{request.value || 'No value'}</td>
                                    <td>{request.status || 'No status'}</td>
                                    <td>
                                        <Link to={`/manager/requestsaward/${request.id}`}>
                                            <button className="btn btn-info">
                                                <i className="fa fa-info-circle"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'exhibitionartwork':
                return (
                    <table className={styles.requestsTable}>
                        <thead>
                            <tr>
                                <th>ARTWORK ID</th>
                                <th>EXHIBITION ID</th>
                                <th>STATUS</th>
                                <th>MORE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.artworkId}</td>
                                    <td>{request.exhibitionId}</td>
                                    <td>{request.status || 'No status'}</td>
                                    <td>
                                        <Link to={`/manager/requestsexhibitionartwork/${request.artworkId}/${request.exhibitionId}`}>
                                            <button className="btn btn-info">
                                                <i className="fa fa-info-circle"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            default:
                return null;
        }
    };

    return (
        <div className={styles.requestsContainer}>
            <h2 className='text-center'>REQUEST</h2>
            <div className="category-filter">
                <label htmlFor="category" className={styles['category-label']}>Select Category: </label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className={styles['category-select']}
                >
                    <option value="">Select Category</option>
                    <option value="award">Awards</option>
                    <option value="contest">Contests</option>
                    <option value="exhibition">Exhibitions</option>
                    <option value="studentaward">Student Award</option>
                    <option value="exhibitionartwork">Exhibition Artwork</option>
                </select>

                <Link to={`/manager/approved`}><button className={styles['award-button-approved']}>APPROVED</button></Link>
                <Link to={`/manager/rejected`}><button className={styles['award-button-rejected']}>REJECTED</button></Link>
            </div>

            {renderTable()}
        </div>
    );
}

export default Requests;
