import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./about/About.js";
import Browse from "./browse/Browse.js";
import UserHomepage from "./homepage/UserHomepage";
import Wishlist from './wishlist/Wishlist.js'
import Contact from './contact/Contact.js'
<<<<<<< HEAD
import AuthForm from "./auth/AuthForm.jsx";
=======
>>>>>>> 1aa9caa96178aed1cbd1a66cd5e94086e96b5ff5

import "./App.css";
import WishlistContext from "./context/WishlistContext.js";
import { AuthProvider } from "./context/AuthContext.js";
<<<<<<< HEAD
import Cart from "./cart/Cart.js";

=======
import AuthForm from "./auth/AuthForm.jsx";
>>>>>>> 1aa9caa96178aed1cbd1a66cd5e94086e96b5ff5

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
<<<<<<< HEAD
           
            <Route path="/browse" element={<Browse />} />
            <Route path="/" element={<UserHomepage />} />
            <Route path="/userbrowse" element={<Browse />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/register" element={<AuthForm />} />
            <Route path="/cart" element={<Cart />} />
=======
            <Route path="/login" element={<AuthForm/>} />
           
            <Route path="/browse" element={<Browse />} />
>>>>>>> 1aa9caa96178aed1cbd1a66cd5e94086e96b5ff5
          </Routes>
        </div>
      </Router>
    </WishlistContext>
    </AuthProvider>
  );
}

export default App;
