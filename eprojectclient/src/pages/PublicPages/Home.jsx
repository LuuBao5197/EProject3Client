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

    const handleLogout = () => {
        localStorage.removeItem("inforToken");  
        setUser(null);  
        navigate("/login");
    };

    // Phân loại triển lãm
    const now = new Date();
    const pastExhibitions = exhibitions.filter(exhibition => new Date(exhibition.endDate) < now);
    const upcomingExhibitions = exhibitions.filter(exhibition => new Date(exhibition.startDate) > now);
    const ongoingExhibitions = exhibitions.filter(exhibition => new Date(exhibition.startDate) <= now && new Date(exhibition.endDate) >= now);

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
