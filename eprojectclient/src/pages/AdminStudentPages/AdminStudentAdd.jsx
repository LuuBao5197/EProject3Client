import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent, getAllClasses, checkEmailExists } from '../../API/getAdminStudent';

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
        address: '',
        classIds: []
    });

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [classes, setClasses] = useState([]);
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
        if (!formData.address.trim()) newErrors.address = 'Address is required.';
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate image file
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                setErrors(prev => ({
                    ...prev, 
                    profileImage: 'Invalid file type. Please upload JPEG, PNG, or GIF.'
                }));
                return;
            }

            if (file.size > maxSize) {
                setErrors(prev => ({
                    ...prev, 
                    profileImage: 'File size exceeds 5MB limit.'
                }));
                return;
            }

            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
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
        
        // Clear previous image-related errors
        if (errors.profileImage) {
            const { profileImage, ...restErrors } = errors;
            setErrors(restErrors);
        }

        // Validate form fields
        if (!validateForm()) return;

        // Check if email exists before submitting
        const emailExists = await checkEmailExists(formData.email);
        if (emailExists) {
            setErrors({ email: 'Email already exists.' });
            return;
        }

        const formDataToSubmit = new FormData();
        
        // Append all form fields
        Object.keys(formData).forEach(key => {
            if (key === 'classIds') {
                formData.classIds.forEach(classId => 
                    formDataToSubmit.append('classIds', classId)
                );
            } else {
                formDataToSubmit.append(key, formData[key]);
            }
        });

        // Append profile image if exists
        if (profileImage) {
            formDataToSubmit.append('profileImage', profileImage);
        }

        try {
            const response = await addStudent(formDataToSubmit);
            setMessage('Student added successfully');
            navigate('/admin/studentlist');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrors({ email: err.response.data.message });
            } else {
                setErrors({ email: 'email already exists.' });
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center mt-auto" style={{ paddingTop: "50px", paddingBottom: "1px" }}>Create Student</h2>
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
                                type="text"
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
                            {message && <p>{message}</p>}
                            {errors.email && <p>{errors.email}</p>}
                           
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
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="profileImage" className="form-label">Profile Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="profileImage"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
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
                    <div className="col-md-12 mb-3">
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
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Create Student</button>
                </div>
            </form>
        </div>

    );
};

export default AdminStudentAdd;
