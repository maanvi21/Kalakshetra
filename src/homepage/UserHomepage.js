import React from 'react';
import './UserHomepage.css';

import Footer from '../components/Footer';
import Header from '../components/Header';
import HomepagCarousel from './HomepagCarousel';
const carouselItems = [
  {
    image: "assets/homeimg2.png",
    alt: "Art 1",
    title: "Beautiful Art",
    description: "A masterpiece of creativity.",
  },
  {
    image: "assets/homeimg3.png",
    alt: "Art 2",
    title: "Cultural Heritage",
    description: "Preserving traditions through art.",
  },
  {
    image: "assets/homeimg4.png",
    alt: "Art 3",
    title: "Modern Expression",
    description: "Blending past and future.",
  },
];
const UserHomepage = () => {
  return (
    <div className="user-homepage">
      
<Header/>
      <main>
        <HomepagCarousel items={carouselItems}/>

        <section className="offerings">
          <h2>What we offer</h2>
          <div className="offerings-grid">
            <div>
              <h3>Sarees</h3>
              <p>Handloom hand-painted sarees</p>
              <button>Browse</button>
            </div>
            <div>
              <h3>Sarees</h3>
              <p>Handloom hand-painted sarees</p>
              <button>Browse</button>
            </div>
            <div>
              <h3>Sarees</h3>
              <p>Handloom hand-painted sarees</p>
              <button>Browse</button>
            </div>
            <div>
              <h3>Dresses</h3>
              <p>Handloom hand-painted dresses</p>
              <button>Browse</button>
            </div>
            <div>
              <h3>Dresses</h3>
              <p>Handloom hand-painted dresses</p>
              <button>Browse</button>
            </div>
          </div>
        </section>

        <section className="branches">
          <h2>Locate our branches</h2>
          <div className="branch-grid">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.185780985396!2d80.22822871538961!3d13.054792390790354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52667bad989ed7%3A0x6d8be7ba2aeb6fa3!2sKalakshetra%20Foundation!5e0!3m2!1sen!2sin!4v1675372741935!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0143426004625!2d80.27096991537866!3d12.993660990880095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5268d94a0f1dcd%3A0x2c2db5b3f5b63f5e!2sKalakshetra%20Foundation!5e0!3m2!1sen!2sin!4v1675372808904!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
<Footer/>
    </div>
  );
};

export default UserHomepage;