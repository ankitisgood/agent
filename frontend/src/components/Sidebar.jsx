import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/agents', label: 'Agents' },
  { to: '/upload-lists', label: 'Upload Lists' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="bg-gray-900 text-gray-100 w-60 min-h-screen flex flex-col py-8 px-4 shadow-lg">
      <nav className="flex flex-col gap-4 flex-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg font-semibold transition-colors text-lg ${isActive ? 'bg-gray-700 text-white shadow' : 'hover:bg-gray-800 hover:text-white'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8">
        {user ? (
          <button onClick={handleLogout} className="w-full py-3 px-4 rounded-lg font-semibold bg-gray-800 hover:bg-gray-700 text-white transition">Logout</button>
        ) : (
          <button onClick={() => navigate('/login')} className="w-full py-3 px-4 rounded-lg font-semibold bg-gray-800 hover:bg-gray-700 text-white transition">Login</button>
        )}
      </div>
    </aside>
  );
}
