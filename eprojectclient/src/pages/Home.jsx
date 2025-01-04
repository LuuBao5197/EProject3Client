import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import axios from 'axios'; // Import axios for API calls

function Home(props) {
    const [user, setUser] = useState(null);  // State to hold user info
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("inforToken");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const decodedToken = jwtDecode(parsedUser.token); 

            // Extract user ID from token
            const userId = decodedToken.Id;
            
            // Fetch user details from your API based on userId
            axios.get(`http://localhost:5190/api/User/${userId}`)
                .then(response => {
                    setUser(response.data);  // Assuming the API returns the user data
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    // You may want to handle errors here (e.g., redirect, show message)
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("inforToken");  
        setUser(null);  
        navigate("/login");
    };

    return (
        <div className='row'>
            <h4>Home PAGE - DEMO</h4>
            <div className="wrapper">
                {user ? (
                    <div>
                        <h5>Welcome, {user.name}!</h5>
                        <p>User ID: {user.id}</p>
                        <button 
                            onClick={() => navigate('/edit', { state: { user } })}
                            className="open-modal-btn">
                            Edit Profile
                        </button>
                        <br />
                        <br />
                        <button onClick={handleLogout} className="open-modal-btn">Logout</button>
                    </div>
                ) : (         
                    <Link to="/login">
                        <button className="open-modal-btn">Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Home;
