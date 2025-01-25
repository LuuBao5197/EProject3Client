import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Import Students</h2>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 text-center">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".xlsx, .xls"
                                        className="form-control"
                                        id="formFile"
                                    />
                                </div>
                                
                                <div className="d-grid gap-2">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Importing...
                                            </>
                                        ) : 'Import Students'}
                                    </button>
                                </div>
                            </form>

                            {message && (
                                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mt-3`}>
                                    {message}
                                </div>
                            )}

                            {emailErrors.length > 0 && (
                                <div className="mt-4">
                                    <h4>Email Send Errors:</h4>
                                    <div className="alert alert-warning" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        <ul className="list-unstyled mb-0">
                                            {emailErrors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {students.length > 0 && (
                                <div className="mt-4">
                                    <h4>Imported Students:</h4>
                                    <div className="list-group">
                                        {students.map((student, index) => (
                                            <div key={index} className="list-group-item">
                                                {student.name} - {student.email}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStudentImportForm;