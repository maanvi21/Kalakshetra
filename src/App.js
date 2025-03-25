import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./about/About.js";
import Browse from "./browse/Browse.js";
import UserHomepage from "./homepage/UserHomepage";
import Wishlist from './wishlist/Wishlist.js'
import Contact from './contact/Contact.js'
import AdminBrowse from "./browse/AdminBrowse.js";
import AuthForm from "./auth/AuthForm.jsx";

import "./App.css";

import { AuthProvider } from "./context/AuthContext.js";
import CartProvider from './context/CartContext.js';
import Cart from "./cart/Cart.js";
import WishlistProvider from "./context/WishlistContext.js";

import AuthHandler from "./auth/AuthHandler.js";
import AdminManagement from "./browse/AdminManagement.js";



function App() {
  return (

    <AuthProvider>
      <CartProvider>
    <WishlistProvider>
      <Router>
        <AuthHandler/>
        <div className="App">
          <Routes>
          <Route path='/' element={[<UserHomepage/>]}/>

<Route path='/userbrowse' element={[<Browse/>]}/>
<Route path='/wishlist' element={[<Wishlist
/>]}/>
<Route path='/about' element={[<About/>]}/>
<Route path='/contact' element={[<Contact/>]}/>
<Route path='/adminmanagement' element={[<AdminManagement/>]}/>
           
            <Route path="/browse" element={<Browse />} />
            <Route path="/" element={<UserHomepage />} />
            <Route path="/userbrowse" element={<Browse />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/register" element={<AuthForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/adminbrowse" element={<AdminBrowse />} />
            {/* <Route path='/locate' element={<LocateUs/>} /> */}

          </Routes>
        </div>
      </Router>
      </WishlistProvider>
      </CartProvider>
    
    </AuthProvider>

  );
}

export default App;
