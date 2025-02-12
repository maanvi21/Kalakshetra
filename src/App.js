import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./about/About.js";
import Browse from "./browse/Browse.js";
import UserHomepage from "./homepage/UserHomepage";
import Wishlist from './wishlist/Wishlist.js'
import Contact from './contact/Contact.js'

import AuthForm from "./auth/AuthForm.jsx";

import "./App.css";
import WishlistContext from "./context/WishlistContext.js";
import { AuthProvider } from "./context/AuthContext.js";

import Cart from "./cart/Cart.js";



function App() {
  return (
    <AuthProvider>
    <WishlistContext>
      <Router>
        <div className="App">
          <Routes>
          <Route path='/' element={[<UserHomepage/>]}/>

<Route path='/userbrowse' element={[<Browse/>]}/>
<Route path='/wishlist' element={[<Wishlist/>]}/>
<Route path='/about' element={[<About/>]}/>
<Route path='/contact' element={[<Contact/>]}/>

           
            <Route path="/browse" element={<Browse />} />
            <Route path="/" element={<UserHomepage />} />
            <Route path="/userbrowse" element={<Browse />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/register" element={<AuthForm />} />
            <Route path="/cart" element={<Cart />} />

          </Routes>
        </div>
      </Router>
    </WishlistContext>
    </AuthProvider>
  );
}

export default App;
