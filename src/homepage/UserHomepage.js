import React from 'react';
import './UserHomepage.css';
import carouselItems from '../data/CarouselData.js'

import Footer from '../components/Footer';
import Header from '../components/user-components/Header.js';
import HomepagCarousel from './HomepagCarousel.js';

import LocateUs from '../components/LocateUs.js';
import branchesData from '../data/BranchesData.js';
import Offers from '../components/Offers.js';

const UserHomepage = () => {
  return (
    <div className="user-homepage">
      
<Header/>
      <main>
        <HomepagCarousel items={carouselItems}/>

        <section className="offerings">
          {/* categories */}
          
          
          
          <div className="offerings-grid">
          <Offers/>
          </div>
        </section>

        <section className="branches">
       {/* locate us */}
          <LocateUs items={branchesData}/>
        </section>
      </main>
<Footer/>
    </div>
  );
};

export default UserHomepage;