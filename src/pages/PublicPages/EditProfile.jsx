import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import banner from "@/assets/img/auth/banner.png";
import Profile from './components/Profile';

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


    return (
        <div className="login-container">
            <div>
                <Profile
                    gridArea='1 / 3/ 2 / 2'
                    banner={banner}
                    id={user?.id}
                    avatar={user?.imagepath}
                    name={user?.name || ''}
                    job={user?.role || ''}
                    username={user?.username || ''}
                    email={user?.email || ''}
                    password={user?.password || ''}
                    phone={user?.phone || ''}
                />
                
            </div>
        </div>
    );
}

export default EditProfile;
