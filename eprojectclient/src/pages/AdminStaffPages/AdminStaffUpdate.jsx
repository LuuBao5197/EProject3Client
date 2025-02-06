import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStaffDetails, updateStaff } from '../../API/getAdminStaff';

const AdminStaffUpdate = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        dob: '',
        joinDate: new Date().toISOString().split('T')[0],
        role: 'Staff',
        address: '',
        isReviewer: false, // Add isReviewer field
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [dobError, setDobError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const staffData = await getStaffDetails(id);
                setFormData({
                    username: staffData.user.username,
                    password: staffData.user.password,
                    name: staffData.user.name,
                    email: staffData.user.email,
                    phone: staffData.user.phone,
                    dob: staffData.user.dob,
                    joinDate: staffData.user.joinDate,
                    role: staffData.user.role,
                    address: staffData.user.address,
                    isReviewer: staffData.isReviewer || false, // Add isReviewer from staffData
                });
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle checkbox input separately
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
            return;
        }

        if (name === 'dob') {
            if (!validateAge(value)) {
                setDobError('Staff must be at least 20 years old');
            } else {
                setDobError('');
            }
        }

        if (name === 'phone') {
            if (!validatePhoneNumber(value)) {
                setPhoneError('Phone number must start with 0 and have 10 digits');
            } else {
                setPhoneError('');
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const validateAge = (dob) => {
        const birthDate = new Date(dob);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const month = currentDate.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 20;  // Kiểm tra nhân viên phải từ 20 tuổi trở lên
    };

    const validatePhoneNumber = (phone) => {
        const phonePattern = /^0\d{9}$/;
        return phonePattern.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setEmailError('');
        setDobError('');
        setPhoneError('');

        // Kiểm tra dữ liệu đầu vào
        if (!formData.username || !formData.password || !formData.name || !formData.email || !formData.phone || !formData.dob || !formData.address) {
            setError('Please fill in all fields');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        if (!validateAge(formData.dob)) {
            setDobError('Staff must be at least 20 years old');
            return;
        }

        if (!validatePhoneNumber(formData.phone)) {
            setPhoneError('Phone number must start with 0 and have 10 digits');
            return;
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(val => formDataToSend.append(key, val));
            } else {
                formDataToSend.append(key, value);
            }
        });

        try {
            await updateStaff(id, formDataToSend); // Sửa lại API để cập nhật theo ID
            setMessage('Staff updated successfully');
            navigate('/admin/StaffList');
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center mt-auto" style={{ paddingTop: "60px" , paddingBottom: "1px"}}>Update Staff</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        {emailError && <div className="text-danger">{emailError}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                        {phoneError && <div className="text-danger">{phoneError}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            required
                        />
                        {dobError && <div className="text-danger">{dobError}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="address" className="form-label">Address</label>
                        <textarea
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isReviewer"
                                name="isReviewer"
                                checked={formData.isReviewer}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="isReviewer">
                                Is Reviewer
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary mt-4">Update</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminStaffUpdate;
