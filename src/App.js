
import About from './about/About';
import './App.css';
import UserHomepage from './homepage/UserHomepage';
import Browse from './browse/Browse.js'
import Wishlist from './wishlist/Wishlist.js'
import Contact from './contact/Contact.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
       <Router>
      <Routes>
<Route path='/user' element={[<UserHomepage/>]}/>
<Route path='/userbrowse' element={[<Browse/>]}/>
<Route path='/wishlist' element={[<Wishlist/>]}/>
<Route path='/about' element={[<About/>]}/>
<Route path='/contact' element={[<Contact/>]}/>
      </Routes>
      </Router>
     
    </div>
  );
}

export default App;
