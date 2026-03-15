import React, { useState, useEffect } from 'react';
import './AdminHomepage.css';
import AdminHeader from '../components/admin-components/AdminHeader.js';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['women', 'men', 'bags', 'accessories'];
const SUBCATEGORIES = {
  women: ['kurtis', 'sarees', 'tops', 'trousers'],
  men: ['shirts', 'trousers', 'jackets', 'shoes'],
  bags: ['handbags', 'totes', 'wallets', 'backpacks'],
  accessories: ['earrings', 'necklaces', 'rings', 'bracelets', 'watches'],
};

const QUICK_ACTIONS = [
  { label: 'Add Product', icon: '➕', path: '/adminmanagement', color: '#67301B' },
  { label: 'View Orders', icon: '🧾', path: '/adminorders', color: '#2c6e49' },
  { label: 'Manage Offers', icon: '🏷️', path: '/adminoffers', color: '#1a4a8a' },
  { label: 'Branches', icon: '📍', path: '/adminbranches', color: '#6b3fa0' },
  { label: 'Users', icon: '👥', path: '/adminusers', color: '#b5451b' },
  { label: 'Settings', icon: '⚙️', path: '/adminsettings', color: '#333' },
];

const CATEGORY_META = {
  women: { icon: '👗', color: '#d4829a' },
  men:   { icon: '👔', color: '#6a9ec7' },
  bags:  { icon: '👜', color: '#b8965a' },
  accessories: { icon: '💍', color: '#9b7ec8' },
};

export default function AdminHomepage() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    fetchAllCounts();
  }, []);

  const fetchAllCounts = async () => {
    const result = {};
    const recent = [];

    for (const category of CATEGORIES) {
      let catTotal = 0;
      for (const sub of SUBCATEGORIES[category]) {
        try {
          const res = await fetch(
            `https://kalakshetra3-5 .onrender.com/${category}/fetch/${sub}`
          );
          if (res.ok) {
            const data = await res.json();
            const items = data.items || [];
            catTotal += items.length;
            // Collect a few recent items
            if (recent.length < 5) {
              items.slice(0, 2).forEach((item) => {
                if (recent.length < 5) {
                  recent.push({ ...item, category, subcategory: sub });
                }
              });
            }
          }
        } catch (_) {}
      }
      result[category] = catTotal;
    }

    setCounts(result);
    setRecentItems(recent);
    setLoadingCounts(false);
  };

  const totalProducts = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="admin-homepage">
      <AdminHeader />

      <main className="admin-dashboard">
        {/* Welcome Banner */}
        <section className="dashboard-banner">
          <div className="banner-text">
            <p className="banner-greeting">Welcome back,</p>
            <h1 className="banner-title">Admin Dashboard</h1>
            <p className="banner-sub">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          </div>
          <div className="banner-stat-highlight">
            <span className="highlight-number">
              {loadingCounts ? '…' : totalProducts}
            </span>
            <span className="highlight-label">Total Products Listed</span>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="stats-section">
          <h2 className="section-title">Catalog Overview</h2>
          <div className="stats-grid">
            {CATEGORIES.map((cat) => (
              <div
                key={cat}
                className="stat-card"
                onClick={() => navigate('/adminmanagement')}
                style={{ '--card-accent': CATEGORY_META[cat].color }}
              >
                <div className="stat-icon">{CATEGORY_META[cat].icon}</div>
                <div className="stat-info">
                  <p className="stat-label">{cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
                  <p className="stat-value">
                    {loadingCounts ? '—' : counts[cat] ?? 0}
                    <span className="stat-unit"> items</span>
                  </p>
                </div>
                <div className="stat-arrow">→</div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                className="quick-action-btn"
                onClick={() => navigate(action.path)}
                style={{ '--btn-color': action.color }}
              >
                <span className="qa-icon">{action.icon}</span>
                <span className="qa-label">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Products */}
        <section className="recent-section">
          <div className="section-header-row">
            <h2 className="section-title">Recent Products</h2>
            <button className="view-all-btn" onClick={() => navigate('/adminmanagement')}>
              View All →
            </button>
          </div>

          {loadingCounts ? (
            <div className="loading-shimmer-grid">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="shimmer-card" />
              ))}
            </div>
          ) : recentItems.length === 0 ? (
            <div className="empty-state">
              <span>📭</span>
              <p>No products found. Start by adding items.</p>
              <button onClick={() => navigate('/adminmanagement')}>+ Add Product</button>
            </div>
          ) : (
            <div className="recent-grid">
              {recentItems.map((item) => (
                <div key={item._id} className="recent-card">
                  {item.image1 && (
                    <div className="recent-card-img">
                      <img src={item.image1} alt={item.name} />
                    </div>
                  )}
                  <div className="recent-card-body">
                    <p className="recent-card-name">{item.name}</p>
                    <p className="recent-card-meta">
                      {item.category} › {item.subcategory}
                    </p>
                    <p className="recent-card-price">₹{parseFloat(item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}