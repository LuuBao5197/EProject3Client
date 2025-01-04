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

<<<<<<< HEAD
    const handleLogout = () => {
        localStorage.removeItem("inforToken");  
        setUser(null);  
        navigate("/login");
    };
=======
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Group 1</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/Login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Contest">Contest</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/AwardReceived">AwardReceived</a>
        </li>
       
      </ul>
    </div>
  </div>
</nav>
            <h1>Exhibition sắp diễn ra</h1>
            <ul>
                {upcomingData.length > 0 ? (
                    upcomingData.map((exhibition) => (
                        <li key={exhibition.id}>
                            <strong>{exhibition.name}</strong><br />
                            <span>Start Date: {new Date(exhibition.startDate).toLocaleDateString()}</span><br />
                            <span>End Date: {new Date(exhibition.endDate).toLocaleDateString()}</span><br />
                            <span>Location: {exhibition.location}</span><br />
                            <span>Organized By: {exhibition.organizedBy}</span><br />
                        </li>
                    ))
                ) : (
                    <p>No upcoming exhibitions found.</p>
                )}
            </ul>
>>>>>>> d1b05ad03f8a303790818adb3e742160d54041ac

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
