import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllClasses, GetStudentDetails, updateStudent } from '../../API/getAdminStudent';

const AdminStudentUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
        address: '',
        classIds: []
    });

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [classes, setClasses] = useState([]);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [currentImagePath, setCurrentImagePath] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch classes
                const classesData = await getAllClasses();
                setClasses(classesData);

                // Fetch student data
                const studentData = await GetStudentDetails(id);
                if (studentData && studentData.user) {
                    setFormData({
                        username: studentData.user.username,
                       
                        password: studentData.user.password, 
                        name: studentData.user.name,
                        email: studentData.user.email,
                        phone: studentData.user.phone,
                        dob: studentData.user.dob ? new Date(studentData.user.dob).toISOString().split('T')[0] : '',
                        joinDate: studentData.user.joinDate ? new Date(studentData.user.joinDate).toISOString().split('T')[0] : '',
                        enrollmentDate: studentData.enrollmentDate ? new Date(studentData.enrollmentDate).toISOString().split('T')[0] : '',
                        parentName: studentData.parentName,
                        parentPhoneNumber: studentData.parentPhoneNumber,
                        address: studentData.user.address,
                        classIds: studentData.studentClasses ? studentData.studentClasses.map(sc => sc.classId) : []
                    });

                    if (studentData.user.imagepath) {
                        setCurrentImagePath(studentData.user.imagepath);
                        setImagePreview(studentData.user.imagepath);
                    console.log("Current Image Path:", studentData.user.imagepath);                  }
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setMessage('Error loading student data');
            }
        };

        fetchData();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required.';
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
        setFormData(prev => ({
            ...prev,
            classIds: selectedOptions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (errors.profileImage) {
            const { profileImage: _, ...restErrors } = errors;
            setErrors(restErrors);
        }

        if (!validateForm()) return;

        const formDataToSubmit = new FormData();

        // Append all form fields
        Object.keys(formData).forEach(key => {
            if (key === 'classIds') {
                formData.classIds.forEach(classId => 
                    formDataToSubmit.append('classIds', classId)
                );
            } else if (key === 'password' && !formData[key]) {
                // Skip empty password
            } else {
                formDataToSubmit.append(key, formData[key]);
            }
        });

        // Append profile image if a new one was selected
        if (profileImage) {
            formDataToSubmit.append('profileImage', profileImage);
        }

        try {
            await updateStudent(id, formDataToSubmit);
            setMessage('Student updated successfully');
            setTimeout(() => navigate('/admin/studentlist'), 2000);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrors({ email: err.response.data.message });
            } else {
                setMessage('An error occurred while updating the student.');
            }
        }
    };
    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center mt-auto" style={{ paddingTop: "50px" , paddingBottom: "1px"}}>Update Student</h2>
            {message && <p className="alert alert-success">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Column 1 */}
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
                            <label htmlFor="password" className="form-label">Password </label>
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
                                readOnly
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
                        <div className=" mb-3">
                        <label htmlFor="classIds" className="form-label">Classes</label>
                        <select
                            id="classIds"
                            name="classIds"
                            multiple
                            className={`form-select ${errors.classIds ? 'is-invalid' : ''}`}
                            onChange={handleClassChange}
                            value={formData.classIds}
                        >
                            {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                </option>
                            ))}
                        </select>
                        {errors.classIds && <div className="invalid-feedback">{errors.classIds}</div>}
                    </div>
                    </div>

                    {/* Column 2 */}
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
                        
                        <div className="mb-3">
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
                            {errors.profileImage && <div className="text-danger">{errors.profileImage}</div>}
                        </div>
                    </div>

                    
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Update Student</button>
                </div>
            </form>
        </div>
    );
};

export default AdminStudentUpdate;