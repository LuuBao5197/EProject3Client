import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


function EditProfile() {
    const [user, setUser] = useState(null);
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

    // Bấm submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUser = localStorage.getItem("inforToken");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const decodedToken = jwtDecode(parsedUser.token);
            const userId = decodedToken.Id;

            axios.patch(`http://localhost:5190/api/User/${userId}`, user)
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
                    <button type="submit" className="open-modal-btn">Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
