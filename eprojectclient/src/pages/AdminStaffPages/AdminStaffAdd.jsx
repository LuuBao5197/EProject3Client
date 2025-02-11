import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubjects, getQualifications, CreateStaff } from '../../API/getAdminStaff';

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
        role: 'Staff',
        address: '',
        profileImage: null, // Thêm ảnh vào formData
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
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate image file
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
        setImageError('');

        // Kiểm tra dữ liệu đầu vào
        if (!formData.username || !formData.password || !formData.name || !formData.email || !formData.phone || !formData.dob || !formData.address) {
            setError('Please fill in all fields');
            return;
        }

        // Kiểm tra định dạng email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        // Kiểm tra tuổi
        if (!validateAge(formData.dob)) {
            setDobError('Staff must be at least 20 years old');
            return;
        }

        // Kiểm tra email đã tồn tại chưa
        const isEmailValid = await validateEmail(formData.email);
        if (!isEmailValid) {
            setEmailError('This email is already in use');
            return;
        }

        // Kiểm tra lựa chọn môn học
        if (formData.staffSubjectIds.length === 0) {
            setError('Please select at least one subject');
            return;
        }

        // Kiểm tra lựa chọn bằng cấp
        if (formData.staffQualificationIds.length === 0) {
            setError('Please select at least one qualification');
            return;
        }

        // Kiểm tra số điện thoại
        if (!validatePhoneNumber(formData.phone)) {
            setPhoneError('Phone number must start with 0 and have 10 digits');
            return;
        }

        // **Tạo `formDataToSend`**
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(val => formDataToSend.append(key, val));
            } else {
                formDataToSend.append(key, value);
            }
        });

        // **Thêm hình ảnh nếu có**
        if (profileImage) {
            formDataToSend.append('profileImage', profileImage);
        }

        try {
            await CreateStaff(formDataToSend);
            setMessage('Staff added successfully! Redirecting...');
            
            
            setTimeout(() => {
                navigate('/admin/StaffList');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="container mt-2">
            <h2 className="mb-4 text-center mt-auto" >Create Staff</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                {/* Username */}
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

                    {/* Password */}
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

                    {/* Name */}
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

                    {/* Email */}
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

                    {/* Phone */}
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

                    {/* Date of Birth */}
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





                    {/* Subjects */}
                    <div className="col-md-6 ">
                        <label htmlFor="subjects" className="form-label">Subjects</label>
                        <select
                            multiple
                            className="form-control"
                            id="subjects"
                            onChange={handleSubjectChange}
                            required
                        >
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Qualifications */}
                    <div className="col-md-6 ">
                        <label htmlFor="qualifications" className="form-label">Qualifications</label>
                        <select
                            multiple
                            className="form-control"
                            id="qualifications"
                            onChange={handleQualificationChange}
                            required
                        >
                            {qualifications.map((qualification) => (
                                <option key={qualification.id} value={qualification.id}>
                                    {qualification.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Address */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {/* Profile Image */}
                    <div className="col-md-6">
                        <label htmlFor="profileImage" className="form-label">Profile Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imageError && <div className="text-danger">{imageError}</div>}
                        {imagePreview && (
                            <div className="mt-2">
                                <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    className="img-thumbnail"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                            </div>
                        )}
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
