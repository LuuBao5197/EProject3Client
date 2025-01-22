import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './AdminStudentImportForm';

const AdminStudentImportForm = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailErrors, setEmailErrors] = useState([]);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setMessage('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setMessage('');
        setEmailErrors([]);
        setStudents([]);

        try {
            const response = await fetch('http://localhost:5190/api/AdminStudent/import-students', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setStudents(data.students);
                setEmailErrors(data.emailErrors);
                setMessage('Students imported successfully!');
                setTimeout(() => {
                    navigate('/adminstudent/adminstudentlist'); // Điều hướng về trang Student List sau 2 giây
                }, 2000);  // Thời gian chờ 2 giây trước khi chuyển hướng
            } else {
                setMessage(data.message || 'An error occurred.');
            }
        } catch (error) {
            setMessage('An error occurred during the import.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Import Students</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".csv , .txt"
                    className={styles.fileInput}
                />
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Importing...' : 'Import Students'}
                </button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
            {emailErrors.length > 0 && (
                <div className={styles.errors}>
                    <h4>Email Send Errors:</h4>
                    <ul>
                        {emailErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            {students.length > 0 && (
                <div className={styles.studentsList}>
                    <h4>Imported Students:</h4>
                    <ul>
                        {students.map((student, index) => (
                            <li key={index}>
                                {student.name} - {student.email}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminStudentImportForm;
