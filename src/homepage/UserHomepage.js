import React from 'react';
import './UserHomepage.css';
import carouselItems from '../data/CarouselData.js'
import categories from '../data/CategoriesData.js'
import Footer from '../components/Footer';
import Header from '../components/Header';
import HomepagCarousel from './HomepagCarousel.js';
import CategoriesContainer from '../components/CategoriesContainer';
import LocateUs from '../components/LocateUs.js';
import branchesData from '../data/BranchesData.js';

const UserHomepage = () => {
  return (
    <div className="user-homepage">
      
<Header/>
      <main>
        <HomepagCarousel items={carouselItems}/>

        <section className="offerings">
          {/* categories */}
          
          <h2>What we offer</h2>
          
          <div className="offerings-grid">
          <CategoriesContainer items={categories}/>
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