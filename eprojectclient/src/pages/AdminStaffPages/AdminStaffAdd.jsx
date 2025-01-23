import React, { useState, useEffect } from 'react';
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
        joinDate: new Date().toISOString().split('T')[0], // Set current date as default
        staffSubjectIds: [],
        staffQualificationIds: [],
        role: 'Staff'
    });

    const [subjects, setSubjects] = useState([]);
    const [qualifications, setQualifications] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [dobError, setDobError] = useState('');
    const [phoneError, setPhoneError] = useState(''); // State for phone error
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

    const validateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age >= 20;
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^0\d{9}$/;
        return phoneRegex.test(phone);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dob') {
            if (!validateAge(value)) {
                setDobError('Staff must be at least 20 years old');
            } else {
                setDobError('');
            }
        }

        if (name === 'phone') {
            // Kiểm tra số điện thoại
            if (!validatePhoneNumber(value)) {
                setPhoneError('Phone number must start with 0 and have 10 digits');
            } else {
                setPhoneError(''); // Xóa lỗi nếu hợp lệ
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubjectChange = (e) => {
        const values = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setFormData({
            ...formData,
            staffSubjectIds: values
        });
    };

    const handleQualificationChange = (e) => {
        const values = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setFormData({
            ...formData,
            staffQualificationIds: values
        });
    };

    const validateEmail = async (email) => {
        try {
            // Assume we have an API endpoint to check email existence
            const response = await fetch(`http://localhost:5190/api/AdminStaff/check-email?email=${email}`);
            const data = await response.json();
            return !data.exists;
        } catch (err) {
            console.error('Error checking email:', err);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setEmailError('');
        setDobError('');
        setPhoneError('');
        // Kiểm tra định dạng email
        if (!formData.username || !formData.password || !formData.name || !formData.email || !formData.phone || !formData.dob) {
            setError('Please fill in all fields');
            return;
        }
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        
        // Validate age
        if (!validateAge(formData.dob)) {
            setDobError('Staff must be at least 20 years old');
            return;
        }

        // Validate email
        const isEmailValid = await validateEmail(formData.email);
        if (!isEmailValid) {
            setEmailError('This email is already in use');
            return;
        }
        // Validate that at least one subject is selected
        if (formData.staffSubjectIds.length === 0) {
            setError('Please select at least one subject');
            return;
        }

        // Validate that at least one qualification is selected
        if (formData.staffQualificationIds.length === 0) {
            setError('Please select at least one qualification');
            return;
        }

        // Validate phone
        if (!validatePhoneNumber(formData.phone)) {
            setPhoneError('Phone number must start with 0 and have 10 digits');
            return;
        }

        try {
            const response = await addStaff(formData);
            setMessage('Staff added successfully');
            navigate('/admin/stafflayout');
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Create Staff</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="email">Email</label>
                            {emailError && <div className="invalid-feedback">{emailError}</div>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input
                                type="tel"
                                className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="phone">Phone</label>
                            {phoneError && <div className="invalid-feedback">{phoneError}</div>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input
                                type="date"
                                className={`form-control ${dobError ? 'is-invalid' : ''}`}
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="dob">Date of Birth</label>
                            {dobError && <div className="invalid-feedback">{dobError}</div>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input
                                type="date"
                                className="form-control"
                                id="joinDate"
                                name="joinDate"
                                value={formData.joinDate}
                                readOnly
                            />
                            <label htmlFor="joinDate">Join Date</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="role"
                                name="role"
                                value={formData.role}
                                disabled
                            />
                            <label htmlFor="role">Role</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <select
                                className={`form-select ${formData.staffSubjectIds.length === 0 ? 'is-invalid' : ''}`}
                                id="staffSubjectIds"
                                name="staffSubjectIds"
                                multiple
                                onChange={handleSubjectChange}
                                value={formData.staffSubjectIds}
                                style={{ height: '100px' }}
                            >
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="staffSubjectIds">Subjects</label>
                            {formData.staffSubjectIds.length === 0 && (
                                <div className="invalid-feedback">Please select at least one subject</div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <select
                                className={`form-select ${formData.staffQualificationIds.length === 0 ? 'is-invalid' : ''}`}
                                id="staffQualificationIds"
                                name="staffQualificationIds"
                                multiple
                                onChange={handleQualificationChange}
                                value={formData.staffQualificationIds}
                                style={{ height: '100px' }}
                            >
                                {qualifications.map((qualification) => (
                                    <option key={qualification.id} value={qualification.id}>
                                        {qualification.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="staffQualificationIds">Qualifications</label>
                            {formData.staffQualificationIds.length === 0 && (
                                <div className="invalid-feedback">Please select at least one qualification</div>
                            )}
                        </div>
                    </div>

                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                        Create Staff
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminStaffAdd;
