import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import About from './about/About.js'
import Browse from './browse/Browse.js'
import UserHomepage from "./homepage/UserHomepage";
import Login from "./auth/Login";
import Wishlist from './wishlist/Wishlist.js'
import Contact from './contact/Contact.js'
import Register from "./auth/Register";
import "./App.css";
import WishlistContext from "./context/WishlistContext.js";
import { AuthProvider } from "./context/AuthContext.js";

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
        </div>
      </Router>
    </WishlistContext>
    </AuthProvider>
  );
}

export default App;
