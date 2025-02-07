import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SweetAlert } from '../../../StudentPages/Notifications/SweetAlert';

function NavbarHome(props) {
    // State to manage login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const nav = useNavigate();
    useEffect(() => {
        // Check for inforToken in localStorage or any other storage
        const inforToken = localStorage.getItem('inforToken');
        if (inforToken) {
            setIsLoggedIn(true); // User is logged in if the token exists
        }
    }, []);

    const handleLogout = () => {
        // Remove inforToken from storage during logout
        localStorage.removeItem('inforToken');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        SweetAlert('Logout sucessfully', 'success')
        nav('/')
    };

    return (
        <div style={styles.navbar}>
            <div style={styles.container}>
                <div style={styles.logo}>
                    <img src="/images/Logo.png" alt="Logo" width="100px" />
                </div>
                <div style={styles.links}>
                    {!isLoggedIn ? (
                        <a href="/auth/sign-in" style={styles.link}>Login</a>
                    ) : (
                        <>
                            <a href="/" style={styles.link}>Home</a>
                            <a href="/edit" style={styles.link}>Profile</a>
                            <a href="/aboutus" style={styles.link}>About Us</a>
                            <a href="/mysubmissions" style={styles.link}>My Exams</a>
                            <a href="#" onClick={handleLogout} style={styles.link}>Logout</a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    navbar: {
        padding: '10px 0',
        position: 'sticky',
        top: '0',
        zIndex: '1000',
        backgroundColor: 'white',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 15px',
    },
    logo: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    links: {
        display: 'flex',
    },
    link: {
        textDecoration: 'none',
        margin: '0 15px',
        fontSize: '16px',
        fontWeight: 'normal',
        color: 'black',
        padding: '10px 20px',
        border: '2px solid black',
        borderRadius: '5px',
        transition: 'background-color 0.3s, color 0.3s',
    },
};

export default NavbarHome;
