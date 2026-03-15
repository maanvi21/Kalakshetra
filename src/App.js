import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import branchesData from "./data/BranchesData.js";
import About from "./about/About.js";
import UserHomepage from "./homepage/UserHomepage";
import Wishlist from './wishlist/Wishlist.js';
import Contact from './contact/Contact.js';
import AuthForm from "./auth/AuthForm.jsx";
import MenProducts from "./browse/MenProducts.js";
import WomenProducts from "./browse/WomenProducts.js";
import BagsProducts from "./browse/BagsProducts.js";
import AccessoriesProducts from "./browse/AccessoriesProducts.js";
import "./App.css";
import { AuthProvider } from "./context/AuthContext.js";
import CartProvider from './context/CartContext.js';
import Cart from "./cart/Cart.js";
import WishlistProvider from "./context/WishlistContext.js";
import AuthHandler from "./auth/AuthHandler.js";
import AdminManagement from "./browse/AdminManagement.js";
import Checkout from "./checkout/Checkout.js";
import AdminHomepage from "./homepage/AdminHomepage.js";
import AdminLogin from "./admin-login/AdminLogin.js";
import ProductDescription from "./browse/ProductDescription.js";
import { ProductProvider } from "./context/ProductContext.js";
import LocateUs from "./components/LocateUs.js";
import AdminOffers from "./components/admin-components/AdminOffers.js";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="App">
                <Routes>
                  {/* ── Home ── */}
                  <Route path="/" element={<UserHomepage />} />

                  {/* ── Authentication ── */}
                  <Route path="/auth/callback" element={<AuthHandler />} />
                  <Route path="/login" element={<AuthForm />} />
                  <Route path="/register" element={<AuthForm />} />

                  {/* ── Product Browse ── */}
                  <Route path="/menProducts" element={<MenProducts />} />
                  <Route path="/womenProducts" element={<WomenProducts />} />
                  <Route path="/bagsProducts" element={<BagsProducts />} />
                  <Route path="/accessoriesProducts" element={<AccessoriesProducts />} />

                  {/* ── User ── */}
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />

                  {/* ── Informational ── */}
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/locateus" element={<LocateUs items={branchesData} />} />

                  {/* ── Admin ── ALL admin routes must be above /:id ── */}
                  <Route path="/abc321" element={<AdminLogin />} />
                  <Route path="/xyz321" element={<AdminHomepage />} />
                  <Route path="/adminmanagement" element={<AdminManagement />} />
                  <Route path="/adminoffers" element={<AdminOffers />} />

                  {/* ── Catch-all dynamic route — MUST be last ── */}
                  <Route path="/:id" element={<ProductDescription />} />
                </Routes>
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;