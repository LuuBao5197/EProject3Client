import React from 'react';
import NavbarHome from './components/navbar/NavbarHome';
import FooterHome from './components/footer/FooterHome';

const AboutUs = () => {
    return (
        <div>
            <div className="container">
            <NavbarHome />
            </div>
            
            {/* First Section: Text on the left, Image on the right */}
            <div style={{ display: 'flex', padding: '50px', fontFamily: 'Arial, sans-serif' }}>
                
                {/* Text Section */}
                <div style={{ flex: 1, paddingRight: '200px', paddingLeft: '150px' }}>
                    <h3 style={{ letterSpacing: '2px', fontSize: '20px', textTransform: 'uppercase', color: '#888' }}>About Us</h3>
                    <h1 style={{ fontSize: '36px', margin: '10px 0' }}>Who We Are</h1>
                    <p style={{ fontSize: '23px', lineHeight: '1.8', color: '#555' }}>
                        The Institute: your destination for the past, present, and future of art.
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                        The Institute is a thriving center of advanced research and graduate teaching in art history, archaeology, and art conservation. A site of knowledge production since its founding in 1932, the Institute has also produced many of the world’s leading art historians, museum directors, curators, and conservators. Learn more about what's happening at the Institute in the Annual.
                    </p>
                    <h1 style={{ fontSize: '36px', margin: '10px 0' }}>What We Do</h1>
                    <p style={{ fontSize: '26px', lineHeight: '1.8', color: '#555' }}>
                        The Institute: a community of learning
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                    Institute students join a tradition of research excellence and share in the latest thinking. They are prepared for careers in the art world, in museums, in conservation, and in universities. We offer the following degrees and fields of study:
                    </p>
                </div>

                {/* Image Section */}
                <div style={{ flex: 1, position: 'relative' }}>
                    <img
                        src="/images/AboutUs1.png"
                        alt="About Us"
                        style={{ width: "500px",height: "500px", borderRadius: '5px', objectFit: 'cover', marginLeft:-90 }}
                    />
                </div>
            </div>

            {/* Second Section: Image on the left, Text on the right */}
            <div style={{ display: 'flex', padding: '100px', marginLeft: '100px', fontFamily: 'Arial, sans-serif' }}>
                {/* Image Section */}
                <div style={{ flex: 1, position: 'relative', marginLeft: '30px' }}> {/* Add marginLeft to shift image right */}
                    <img
                        src="/images/AboutUs2.png"
                        alt="About Us"
                        style={{ width: "500px", borderRadius: '5px', objectFit: 'cover' }}
                    />
                </div>

                {/* Text Section */}
                <div style={{ flex: 1, paddingLeft: '50px', paddingRight: '200px' }}>
                    <h3 style={{ letterSpacing: '2px', fontSize: '20px', textTransform: 'uppercase', color: '#888' }}>Imagine</h3>
                    <h1 style={{ fontSize: '36px', margin: '10px 0' }}>Thoughtful and Considered</h1>
                    <p style={{ fontSize: '23px', lineHeight: '1.8', color: '#555' }}>
                        Everything we create is designed to tangibly improve your rest.
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                    The University of Fine Arts is one of the leading institutions for art education, dedicated to nurturing and developing creative talent in the field of fine arts. With a team of experienced and highly skilled faculty, the university provides a dynamic learning environment that encourages students to explore and enhance their artistic abilities. The university offers a diverse range of programs, from painting, sculpture, graphic design, to applied arts, equipping students with both theoretical knowledge and practical experience. Students are prepared with the skills, knowledge, and creative thinking required to succeed in both the local and international art markets.
                    </p>
                </div>
            </div>
            <div className="container">
            <FooterHome />
            </div>
        </div>
    );
};

export default AboutUs;
