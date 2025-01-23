import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminStudentImportForm';

const AdminStudentImportForm = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailErrors, setEmailErrors] = useState([]);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

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
                setStudents(data.students || []);
                setEmailErrors(data.emailErrors || []);
                setMessage('Students imported successfully!');
                navigate('/admin/adminstudentlist');
            } else {
                if (data.duplicateEmails) {
                    setMessage(`Error: Duplicate emails found: ${data.duplicateEmails.join(', ')}`);
                } else {
                    const errorMessage = data.message || 'An unexpected error occurred.';
                    setMessage(`Error: ${errorMessage}`);
                }
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
                    accept=".xlsx, .xls"
                    className={styles.fileInput}
                />
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Importing...' : 'Import Students'}
                </button>
            </form>
            {loading && <div className={styles.spinner}>Loading...</div>}
            {message && <p className={styles.message}>{message}</p>}
            {emailErrors.length > 0 && (
                <div className={styles.errors} style={{ maxHeight: '200px', overflowY: 'scroll' }}>
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
