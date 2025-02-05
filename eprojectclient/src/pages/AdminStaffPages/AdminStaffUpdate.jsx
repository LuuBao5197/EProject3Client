import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjects, getQualifications, getStaffDetails, updateStaff } from '../../API/getAdminStaff';

const AdminStaffUpdate = () => {
    const { id } = useParams();  // Lấy ID từ URL để tải dữ liệu của nhân viên cần cập nhật
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        dob: '',
        joinDate: new Date().toISOString().split('T')[0],
        staffSubjectIds: [],
        staffQualificationIds: [],
        role: 'Staff',
        address: '',
        profileImage: null,
    });
    const [subjects, setSubjects] = useState([]);
    const [qualifications, setQualifications] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [dobError, setDobError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageError, setImageError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSubjects = await getSubjects();
                setSubjects(fetchedSubjects);

                const fetchedQualifications = await getQualifications();
                setQualifications(fetchedQualifications);

                const staffData = await getStaffDetails(id);  // Lấy dữ liệu nhân viên theo ID
                setFormData(staffData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                setImageError('Invalid file type. Please upload JPEG, PNG, or GIF.');
                return;
            }

            if (file.size > maxSize) {
                setImageError('File size exceeds 5MB limit.');
                return;
            }

            setProfileImage(file);
            setFormData({ ...formData, profileImage: file });

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
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
            if (!validatePhoneNumber(value)) {
                setPhoneError('Phone number must start with 0 and have 10 digits');
            } else {
                setPhoneError('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setEmailError('');
        setDobError('');
        setPhoneError('');
        setImageError('');

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

        const isEmailValid = await validateEmail(formData.email);
        if (!isEmailValid) {
            setEmailError('This email is already in use');
            return;
        }

        if (formData.staffSubjectIds.length === 0) {
            setError('Please select at least one subject');
            return;
        }

        if (formData.staffQualificationIds.length === 0) {
            setError('Please select at least one qualification');
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

        if (profileImage) {
            formDataToSend.append('profileImage', profileImage);
        }

        try {
            await updateStaff(id, formDataToSend);  // Gọi API để cập nhật nhân viên
            setMessage('Staff updated successfully');
            navigate('/admin/StaffList');
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Update Staff</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                {/* Các trường nhập liệu như Username, Password, Name, Email, Phone, DOB, Profile Image */}
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
                    <div className="col-md-12">
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
                        <label htmlFor="profileImage" className="form-label">Profile Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="profileImage"
                            name="profileImage"
                            onChange={handleImageChange}
                        />
                        {imageError && <div className="text-danger">{imageError}</div>}
                        {imagePreview && <img src={imagePreview} alt="Profile Preview" width="100" />}
                    </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                        Update Staff
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminStaffUpdate;
