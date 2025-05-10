import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// Static credentials (in a real app, this would be handled securely on the backend)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "kalakshetra2025";

export default function AdminLogin() {
    const navigate= useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError('');
      // In a real app, you would set authentication tokens/cookies here
      // and redirect to the admin dashboard
    } else {
      setError('Invalid username or password');
    }
  };

  // If logged in, show admin dashboard placeholder
  if (loggedIn) {
    navigate('/adminhome');
  }
  // Login form using div instead of form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-opacity-90" style={{
      backgroundImage: "url('/api/placeholder/1920/1080')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay'
    }}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900">Kalakshetra</h2>
          <p className="text-amber-700 italic">Admin Login</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        <div>
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter your username"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter your password"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full bg-amber-800 hover:bg-amber-900 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Credentials for testing: admin / kalakshetra2025
          </p>
        </div>
      </div>
    </div>
  );
}