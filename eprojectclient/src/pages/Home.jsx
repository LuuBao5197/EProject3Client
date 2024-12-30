
import React, { useEffect, useState } from 'react';

function Home(props) {
    const [upcomingData, setUpcomingData] = useState([]);
    const [pastData, setPastData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5190/api/Exhibition')
            .then(response => response.json())
            .then(data => {
                const today = new Date();
                const upcomingExhibitions = data.filter(exhibition => 
                    new Date(exhibition.startDate) > today // Exhibitions starting after today
                );
                const pastExhibitions = data.filter(exhibition => 
                    new Date(exhibition.endDate) < today // Exhibitions that have already ended
                );
                setUpcomingData(upcomingExhibitions); // Set upcoming exhibitions
                setPastData(pastExhibitions); // Set past exhibitions
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
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

            <h1>Exhibition đã diễn ra</h1>
            <ul>
                {pastData.length > 0 ? (
                    pastData.map((exhibition) => (
                        <li key={exhibition.id}>
                            <strong>{exhibition.name}</strong><br />
                            <span>Start Date: {new Date(exhibition.startDate).toLocaleDateString()}</span><br />
                            <span>End Date: {new Date(exhibition.endDate).toLocaleDateString()}</span><br />
                            <span>Location: {exhibition.location}</span><br />
                            <span>Organized By: {exhibition.organizedBy}</span><br />
                        </li>
                    ))
                ) : (
                    <p>No past exhibitions found.</p>
                )}
            </ul>
        </div>
    );
}

export default Home;
