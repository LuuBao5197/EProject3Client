import React, { useState, useEffect } from 'react';
import { getAllClasses, addStudent } from '../../API/getAdminStudent'; // Import các hàm API đã viết
import { useNavigate } from 'react-router-dom';

const AdminStudentAdd = () => {
    const today = new Date().toISOString().split('T')[0];
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        dob: '',
        joinDate: today,
        enrollmentDate: '',
        parentName: '',
        parentPhoneNumber: '',
        classIds: []
    });

    const [classes, setClasses] = useState([]); // Danh sách lớp học
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await getAllClasses();
                setClasses(data);
            } catch (err) {
                console.error('Error fetching classes:', err.message);
            }
        };

        fetchClasses();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required.';
        if (!formData.password.trim()) newErrors.password = 'Password is required.';
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim() || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = 'Invalid email address.';
        }
        if (!formData.phone.trim() || !/^0\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must start with 0 and contain exactly 10 digits.';
        }
        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required.';
        } else {
            const dob = new Date(formData.dob);
            const age = new Date().getFullYear() - dob.getFullYear();
            if (age < 12) newErrors.dob = 'Date of birth indicates age less than 12.';
        }
        if (!formData.enrollmentDate) {
            newErrors.enrollmentDate = 'Enrollment date is required.';
        } else {
            const enrollmentDate = new Date(formData.enrollmentDate);
            if (enrollmentDate < new Date()) {
                newErrors.enrollmentDate = 'Enrollment date cannot be in the past.';
            }
        }
        if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required.';
        if (!formData.parentPhoneNumber.trim() || !/^0\d{9}$/.test(formData.parentPhoneNumber)) {
            newErrors.parentPhoneNumber = 'Parent phone number must start with 0 and contain exactly 10 digits.';
        }
        if (formData.classIds.length === 0) newErrors.classIds = 'At least one class must be selected.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
        if (!validateForm()) return;

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
                joinDate: today,
                enrollmentDate: '',
                parentName: '',
                parentPhoneNumber: '',
                classIds: []
            });
            navigate('/admin/studentlist');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrors({ email: err.response.data.message });
            } else {
                setErrors({ email: 'Email already exists.' });
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Create Student</h2>
            {message && <p className="alert alert-success">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Cột 1 */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                    </div>

                    {/* Cột 2 */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                id="dob"
                                className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                value={formData.dob}
                                onChange={handleInputChange}
                            />
                            {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="enrollmentDate" className="form-label">Enrollment Date</label>
                            <input
                                type="date"
                                name="enrollmentDate"
                                id="enrollmentDate"
                                className={`form-control ${errors.enrollmentDate ? 'is-invalid' : ''}`}
                                value={formData.enrollmentDate}
                                onChange={handleInputChange}
                            />
                            {errors.enrollmentDate && <div className="invalid-feedback">{errors.enrollmentDate}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="parentName" className="form-label">Parent Name</label>
                            <input
                                type="text"
                                name="parentName"
                                id="parentName"
                                className={`form-control ${errors.parentName ? 'is-invalid' : ''}`}
                                value={formData.parentName}
                                onChange={handleInputChange}
                            />
                            {errors.parentName && <div className="invalid-feedback">{errors.parentName}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="parentPhoneNumber" className="form-label">Parent Phone Number</label>
                            <input
                                type="tel"
                                name="parentPhoneNumber"
                                id="parentPhoneNumber"
                                className={`form-control ${errors.parentPhoneNumber ? 'is-invalid' : ''}`}
                                value={formData.parentPhoneNumber}
                                onChange={handleInputChange}
                            />
                            {errors.parentPhoneNumber && <div className="invalid-feedback">{errors.parentPhoneNumber}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="classIds" className="form-label">Classes</label>
                            <select
                                id="classIds"
                                name="classIds"
                                className={`form-select ${errors.classIds ? 'is-invalid' : ''}`}
                                onChange={handleClassChange}
                                value={formData.classIds.length === 0 ? "" : formData.classIds[0]}
                            >
                                <option value="">Select a class</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                            {errors.classIds && <div className="invalid-feedback">{errors.classIds}</div>}
                        </div>

                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Create Student</button>
                </div>
            </form>
        </div>

    );
};

export default AdminStudentAdd;
