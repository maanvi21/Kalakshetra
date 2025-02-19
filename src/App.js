import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./about/About.js";
import Browse from "./browse/Browse.js";
import AdminBrowse from "./browse/Adminbrowse.js"; // Ensure this file exists
import UserHomepage from "./homepage/UserHomepage";
import Wishlist from "./wishlist/Wishlist.js";
import Contact from "./contact/Contact.js";
import AuthForm from "./auth/AuthForm.jsx";
import Cart from "./cart/Cart.js";
import LocateUs from "./components/LocateUs.js";

import { AuthProvider } from "./context/AuthContext.js";
import CartProvider from "./context/CartContext.js";
import WishlistProvider from "./context/WishlistContext.js";

import "./index.css"; // Ensure Tailwind CSS is applied

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="bg-custom-bg min-h-screen">
              <Routes>
                {/* ✅ User Routes */}
                <Route path="/" element={<UserHomepage />} />
                <Route path="/userbrowse" element={<Browse />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<AuthForm />} />
                <Route path="/register" element={<AuthForm />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/locate" element={<LocateUs />} />

                {/* ✅ Admin Routes */}
                <Route path="/adminbrowse" element={<AdminBrowse />} />
              </Routes>
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
