import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./about/About.js";
import Browse from "./browse/Browse.js";
import UserHomepage from "./homepage/UserHomepage";
import AuthForm from "./auth/AuthForm.jsx"; // Renamed import for clarity
import Wishlist from "./wishlist/Wishlist.js";
import Contact from "./contact/Contact.js";
import "./App.css";
import Context from "./context/Context";

function App() {
  return (
    <Context>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<UserHomepage />} />
            <Route path="/userbrowse" element={<Browse />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/register" element={<AuthForm />} />
          </Routes>
        </div>
      </Router>
    </Context>
  );
}

export default App;
