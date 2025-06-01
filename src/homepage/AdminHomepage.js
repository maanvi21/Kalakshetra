import React from 'react';
import './AdminHomepage.css';
import carouselItems from '../data/CarouselData.js'
import categories from '../data/CategoriesData.js'
import Footer from '../components/Footer';
import HomepagCarousel from './HomepagCarousel.js';
import CategoriesContainer from '../components/CategoriesContainer';
import LocateUs from '../components/LocateUs.js';
import branchesData from '../data/BranchesData.js';
import Offers from '../components/Offers.js';

const AdminHomepage = () => {
  return (
    <div className="admin-homepage">
      
{/* <AdminHeader/> */}
      <main>
        <HomepagCarousel items={carouselItems}/>

        <section className="offerings">
          {/* categories */}
          
          <h2>Offers</h2>
          
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

export default AdminHomepage;