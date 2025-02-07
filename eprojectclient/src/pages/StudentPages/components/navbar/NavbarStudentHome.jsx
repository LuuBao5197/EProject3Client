import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SweetAlert } from '../../../StudentPages/Notifications/SweetAlert'; // Ensure SweetAlert is correctly imported

function NavbarStudentHome(props) {
    // State to manage login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        // Check for inforToken in localStorage or any other storage
        const inforToken = localStorage.getItem('inforToken');
        if (inforToken) {
            setIsLoggedIn(true); // User is logged in if the token exists
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('inforToken');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        SweetAlert('Logout successfully', 'success'); // Correctly use SweetAlert
        nav('/');
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
                            <div
                                style={styles.link}
                                onMouseEnter={() => setDropdownVisible(true)}
                                onMouseLeave={() => setDropdownVisible(false)}
                            >
                                My Exams
                                {dropdownVisible && (
                                    <div style={styles.dropdown}>
                                        <a href="/student/mysubmissions" style={styles.dropdownItem}>View Submissions</a>
                                        <a href="/student/awardreceived" style={styles.dropdownItem}>View My Award</a>
                                        <a href="/student/exhibitionartwork" style={styles.dropdownItem}>View Exhibition Artwork</a>
                                    </div>
                                )}
                            </div>
                            <a onClick={handleLogout} href='/' style={styles.link}>Logout</a>
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
        border: '2px solid black',
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
        position: 'relative',
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: '0',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        zIndex: '10',
    },
    dropdownItem: {
        display: 'block',
        padding: '10px 20px',
        textDecoration: 'none',
        color: 'black',
        borderBottom: '1px solid #ddd',
    },
};

export default NavbarStudentHome;
        