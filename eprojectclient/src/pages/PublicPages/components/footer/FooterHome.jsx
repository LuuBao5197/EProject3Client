import React from 'react';

function FooterHome(props) {
    return (
        <div style={styles.footer}>
            <div style={styles.container}>
                <p style={styles.text}>© 2025 Your Company. All rights reserved.</p>
                <div style={styles.socialIcons}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>Instagram</a>
                </div>
            </div>
        </div>
    );
}

const styles = {
    footer: {
        padding: '20px 0',
        textAlign: 'center',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 15px',
    },
    text: {
        margin: '0',
        fontSize: '14px',
    },
    socialIcons: {
        marginTop: '10px',
    },
    icon: {
        textDecoration: 'none',
        margin: '0 10px',
        fontSize: '16px',
    },
};

export default FooterHome;
