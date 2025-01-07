import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { use } from 'react';

function EditProfile() {
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null); // New state for the file
    const navigate = useNavigate();

    // Lấy dữ liệu từ token
    useEffect(() => {
        const storedUser = localStorage.getItem("inforToken");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const decodedToken = jwtDecode(parsedUser.token);

            // Fetch user data using the decoded token's ID
            axios.get(`http://localhost:5190/api/User/${decodedToken.Id}`)
                .then(response => {
                    setUser(response.data); // Set the fetched user data
                })
                .catch(() => {
                    alert('Failed to fetch user data');
                });
        }
    }, []);

    // Giữ giá trị cũ nếu không thay đổi
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Handle file change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    // Bấm submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUser = localStorage.getItem("inforToken");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const decodedToken = jwtDecode(parsedUser.token);
            const userId = decodedToken.Id;

            const formData = new FormData();
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("password", user.password);
            if (file) {
                formData.append("file", file); // Append the file to form data
            }

            axios.put(`http://localhost:5190/api/User/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(() => {
                    alert('Profile updated successfully!');
                    navigate('/');
                })
                .catch(() => {
                    alert('Failed to update profile');
                });
        } else {
            alert('No valid user session found');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-user">
                <h4>Edit Profile</h4>
                <img src={user?.imagepath} className="img-thumbnail" width="150"/>
                <p className="close-icon-user" onClick={() => window.location.href = '/'}>x</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={user?.name || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user?.email || ''} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={user?.password || ''} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Profile Picture:</label>
                        <input
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className="open-modal-btn">Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
