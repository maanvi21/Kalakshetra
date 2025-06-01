import React from 'react';
import './AdminHomepage.css';
import carouselItems from '../data/CarouselData.js'
import branchesData from '../data/BranchesData.js';
import Footer from '../components/Footer';
import AdminHeader from '../components/admin-components/AdminHeader.js'; // ✅ Correct Header
import HomepagCarousel from './HomepagCarousel.js';
import LocateUs from '../components/LocateUs.js';
import Offers from '../components/Offers.js';

const AdminHomepage = () => {
  return (
    <div className="admin-homepage">
      <AdminHeader />  {/* ✅ Only Admin Header */}

      <main>
        <HomepagCarousel items={carouselItems} />

        <section className="offerings">
          <h2>Offers</h2>
          <div className="offerings-grid">
            <Offers />
          </div>
        </section>

        <section className="branches">
          <LocateUs items={branchesData} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminHomepage;