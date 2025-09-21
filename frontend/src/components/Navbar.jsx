import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-950 text-white shadow-md py-4 px-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
      {user ? (
        <button onClick={handleLogout} className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition text-white font-semibold">Logout</button>
      ) : (
        <button onClick={() => navigate('/login')} className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition text-white font-semibold">Login</button>
      )}
    </header>
  );
}
