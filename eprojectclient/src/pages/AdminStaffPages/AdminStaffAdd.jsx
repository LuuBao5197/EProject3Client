import React, { useState, useEffect } from 'react';
import styles from './AdminStaffAdd.module.css';
import { useNavigate } from 'react-router-dom';
import { getSubjects, getQualifications, addStaff } from '../../API/getAdminStaff';

const AdminStaffAdd = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        dob: '',
        joinDate: '',
        subjectIds: [],
        qualificationIds: []
    });

    const [subjects, setSubjects] = useState([]);
    const [qualifications, setQualifications] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSubjects = await getSubjects();
                setSubjects(fetchedSubjects);

                const fetchedQualifications = await getQualifications();
                setQualifications(fetchedQualifications);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubjectChange = (e) => {
        const value = parseInt(e.target.value);
        setFormData({
            ...formData,
            subjectIds: value ? [value] : []
        });
    };

    const handleQualificationChange = (e) => {
        const value = parseInt(e.target.value);
        setFormData({
            ...formData,
            qualificationIds: value ? [value] : []
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        console.log(formData);  // Kiểm tra dữ liệu formData
    
        try {
            const response = await addStaff(formData);
            console.log(response);  // Kiểm tra phản hồi từ API
            setMessage('Staff added successfully');
            setFormData({
                username: '',
                password: '',
                name: '',
                email: '',
                phone: '',
                dob: '',
                joinDate: '',
                subjectIds: [],
                qualificationIds: []
            });
            navigate('/admin/staff-list');
        } catch (err) {
            console.error(err);  // In lỗi ra console để kiểm tra
            setError(err.message);
        }
    };
    
    return (
        <div className={styles.container}>
            <h2>Create Staff</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Join Date</label>
                    <input type="date" name="joinDate" value={formData.joinDate} onChange={handleInputChange} required />
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="subjectIds" className="form-label">Subjects</label>
                    <select
                        id="subjectIds"
                        name="subjectIds"
                        className="form-select"
                        aria-label="Subject selection"
                        onChange={handleSubjectChange}
                        value={formData.subjectIds.length === 0 ? "" : formData.subjectIds[0]}
                    >
                        <option value="">Open this select menu</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                    {formData.subjectIds.length === 0 && (
                        <div className="invalid-feedback">Please select a subject.</div>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="qualificationIds" className="form-label">Qualifications</label>
                    <select
                        id="qualificationIds"
                        name="qualificationIds"
                        className="form-select"
                        aria-label="Qualification selection"
                        onChange={handleQualificationChange}
                        value={formData.qualificationIds.length === 0 ? "" : formData.qualificationIds[0]}
                    >
                        <option value="">Open this select menu</option>
                        {qualifications.map((qualification) => (
                            <option key={qualification.id} value={qualification.id}>
                                {qualification.name}
                            </option>
                        ))}
                    </select>
                    {formData.qualificationIds.length === 0 && (
                        <div className="invalid-feedback">Please select a qualification.</div>
                    )}
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit">Create Staff</button>
                </div>
            </form>
        </div>
    );
};

export default AdminStaffAdd;