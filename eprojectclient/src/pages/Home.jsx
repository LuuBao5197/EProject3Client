import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


function Home(props) {
    const [user, setUser] = useState(null);
    const [exhibitions, setExhibitions] = useState([]);
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
                    setUser(response.data); 
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }

        // Fetch exhibition data
        axios.get('http://localhost:5190/api/Exhibition') // Thay URL bằng API của bạn
            .then(response => {
                setExhibitions(response.data); // Lưu danh sách exhibitions
            })
            .catch(error => {
                console.error("Error fetching exhibition data:", error);
            });
    }, []);
<<<<<<< HEAD

=======
>>>>>>> 5296559f075ad7e0b409f99110386a411376482d
    const handleLogout = () => {
        localStorage.removeItem("inforToken");  
        setUser(null);  
        navigate("/login");
    };

<<<<<<< HEAD
    // Phân loại triển lãm
    const now = new Date();
    const pastExhibitions = exhibitions.filter(exhibition => new Date(exhibition.endDate) < now);
    const upcomingExhibitions = exhibitions.filter(exhibition => new Date(exhibition.startDate) > now);
    const ongoingExhibitions = exhibitions.filter(exhibition => new Date(exhibition.startDate) <= now && new Date(exhibition.endDate) >= now);
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

>>>>>>> 5296559f075ad7e0b409f99110386a411376482d

    return (
        <div>
            <div>
                <h4>Home PAGE - DEMO</h4>

                <h1>Đã tổ chức</h1>
                {/* Slider cho triển lãm đã tổ chức */}
                <div id="carouselPastExhibitions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {pastExhibitions.map((_, index) => (
                            <button 
                                key={index}
                                type="button" 
                                data-bs-target="#carouselPastExhibitions" 
                                data-bs-slide-to={index} 
                                className={index === 0 ? "active" : ""} 
                                aria-current={index === 0 ? "true" : "false"} 
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {pastExhibitions.map((exhibition, index) => (
                            <div key={exhibition.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                <h5>{exhibition.name}</h5>
                                <p>Location: {exhibition.location}</p>
                                <p>Organized By: {exhibition.organizedBy}</p>
                                <p>Start Date: {new Date(exhibition.startDate).toLocaleDateString()}</p>
                                <p>End Date: {new Date(exhibition.endDate).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselPastExhibitions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselPastExhibitions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


                <h1>Đang tổ chức</h1>
                {/* Slider cho triển lãm đang tổ chức */}
                <div id="carouselOngoingExhibitions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {ongoingExhibitions.map((_, index) => (
                            <button 
                                key={index}
                                type="button" 
                                data-bs-target="#carouselOngoingExhibitions" 
                                data-bs-slide-to={index} 
                                className={index === 0 ? "active" : ""} 
                                aria-current={index === 0 ? "true" : "false"} 
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {ongoingExhibitions.map((exhibition, index) => (
                            <div key={exhibition.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                <h5>{exhibition.name}</h5>
                                <p>Location: {exhibition.location}</p>
                                <p>Organized By: {exhibition.organizedBy}</p>
                                <p>Start Date: {new Date(exhibition.startDate).toLocaleDateString()}</p>
                                <p>End Date: {new Date(exhibition.endDate).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselOngoingExhibitions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselOngoingExhibitions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* Slider cho triển lãm sắp tổ chức */}
                <h1>Sắp tổ chức</h1>
                <div id="carouselUpcomingExhibitions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {upcomingExhibitions.map((_, index) => (
                            <button 
                                key={index}
                                type="button" 
                                data-bs-target="#carouselUpcomingExhibitions" 
                                data-bs-slide-to={index} 
                                className={index === 0 ? "active" : ""} 
                                aria-current={index === 0 ? "true" : "false"} 
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {upcomingExhibitions.map((exhibition, index) => (
                            <div key={exhibition.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                <h5>{exhibition.name}</h5>
                                <p>Location: {exhibition.location}</p>
                                <p>Organized By: {exhibition.organizedBy}</p>
                                <p>Start Date: {new Date(exhibition.startDate).toLocaleDateString()}</p>
                                <p>End Date: {new Date(exhibition.endDate).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselUpcomingExhibitions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselUpcomingExhibitions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <div>
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
        </div>
    );
}

export default Home;
