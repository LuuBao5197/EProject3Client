import React, { useState, useEffect } from 'react';
import { getAllClasses, addStudent } from '../../API/getAdminStudent'; // Import các hàm API đã viết
import styles from './AdminStudentAdd.module.css';
import { useNavigate } from 'react-router-dom';

const AdminStudentAdd = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        dob: '',
        joinDate: '',
        enrollmentDate: '',
        parentName: '',
        parentPhoneNumber: '',
        classIds: []
    });

    const [classes, setClasses] = useState([]); // Danh sách lớp học
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showAllClasses, setShowAllClasses] = useState(false); // Hiển thị thêm lớp
    const   navigate = useNavigate();

    // Lấy danh sách lớp học
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await getAllClasses();
                setClasses(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchClasses();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleClassChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => parseInt(option.value));
        setFormData({
            ...formData,
            classIds: selectedOptions
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await addStudent(formData);
            setMessage('Student added successfully');
            setFormData({
                username: '',
                password: '',
                name: '',
                email: '',
                phone: '',
                dob: '',
                joinDate: '',
                enrollmentDate: '',
                parentName: '',
                parentPhoneNumber: '',
                classIds: []
            });
            navigate('/adminstudent/adminstudentlist');
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleShowClasses = () => {
        setShowAllClasses(!showAllClasses);
    };

    return (
        <div className={styles.container}>
            <h2>Create Student</h2>
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
                <div>
                    <label className={styles.formGroup}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <label className={styles.formGroup}>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div>
                    <label className={styles.formGroup}>Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
                </div>
                <div>
                    <label className={styles.formGroup}>Join Date</label>
                    <input type="date" name="joinDate" value={formData.joinDate} onChange={handleInputChange} required />
                </div>
                <div>
                    <label className={styles.formGroup}>Enrollment Date</label>
                    <input type="date" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleInputChange} required />
                </div>
                <div>
                    <label className={styles.formGroup}>Parent Name</label>
                    <input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} required />
                </div>
                <div>
                    <label className={styles.formGroup}>Parent Phone Number</label>
                    <input type="tel" name="parentPhoneNumber" value={formData.parentPhoneNumber} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="classIds" className="form-label">Classes</label>
                    <select
                        id="classIds"
                        name="classIds"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleClassChange}
                        value={formData.classIds.length === 0 ? "" : formData.classIds[0]} // Lấy giá trị đầu tiên nếu có
                    >
                        <option value="">Open this select menu</option>
                        {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                                {cls.name}
                            </option>
                        ))}
                    </select>

                    {formData.classIds.length === 0 && <div className="invalid-feedback">Hãy chọn ít nhất một lớp.</div>}
                </div>


                <div className={styles.buttonGroup}>
                    <button type="submit">Create Student</button>
                </div>
            </form>
        </div>
    );
};

export default AdminStudentAdd;
