import React from 'react';
import './About.css';
import Header from '../components/user-components/Header';

const About = () => {
    return (
        <div className="about-container">
            <Header/>
            <div className="about-content">
          
                {/* Hero Section */}
                <div className="hero-section">
                   
                   <h3>  Welcome to Kalashetra, where tradition meets innovation. We're a brand that celebrates the rich cultural heritage of India, particularly in the realm of textiles. </h3>
                  
                </div>

                {/* Mission Section */}
                <div className="mission-container">
                    <div className="mission-content">
                        <h2>Our Journey</h2>
                        <p>Our journey began with a passion for Kalamkari, Ajrakh, and Indigo 
                            dyeing techniques, which have been an integral part of Indian craftsmanship
                             for centuries. We saw an opportunity to revive these traditional methods and bring them to the modern world of fashion.</p>
                    </div>
                    <div className="values-box">
                        <h3>Our Values</h3>
                        <ul>
                            <li>Authenticity in every design</li>
                            <li>Supporting local artisans</li>
                            <li>Sustainable fashion practices</li>
                            <li>Customer satisfaction</li>
                        </ul>
                    </div>
                </div>

                {/* Features Section */}
                <div className="features-container">
                    <div className="feature-box">
                        <h3>Craftsmanship</h3>
                        <p>We work closely with skilled artisans and craftsmen from across India to ensure that every piece of clothing that bears our name is a testament to the country's rich textile heritage. Our commitment to sustainability and eco-friendliness means that we use only natural dyes and environmentally responsible practices in our production process.</p>
                    </div>
                    <div className="feature-box">
                        <h3>Quality</h3>
                        <p>Behind every beautiful piece is a team of passionate individuals dedicated 
                       to bringing you the finest in ethnic fashion. Our experts carefully curate 
                       each collection to ensure authenticity and quality.</p>
                    </div>
                    <div className="feature-box">
                        <h3>Heritage</h3>
                        <p>At Kalashetra, we're dedicated to creating unique, handcrafted Kurtis that not only reflect our cultural roots but also cater to the contemporary tastes of our customers. Our designs are inspired by the intricate patterns, motifs,
                        and colors found in traditional Indian textiles.</p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="team-section">
                    <h2>"There is nothing either good or bad, but thinking makes it so.” </h2>
                    <h3> ― Khushi Kori </h3>
                   
                </div>
            </div>
        </div>
    );
};

export default About;