import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-green-600 text-white fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            ClimAção
          </Link>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-4">
              <NavLink to="/" text="Home" />
              <NavLink to="/calculator" text="Calculadora" />
              <NavLink to="/map" text="Mapa" />
              <NavLink to="/sustentabilidade" text="Sustentabilidade" />
              {user && <NavLink to="/profile" text="Perfil" />}
            </div>
            <div className="flex space-x-2 items-center">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full font-semibold bg-white text-green-600 hover:bg-green-100 transition duration-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-full font-semibold bg-white text-green-600 hover:bg-green-100 transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-full font-semibold bg-white text-green-600 hover:bg-green-100 transition duration-300"
                  >
                    Registrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-green-600 p-4`}>
        <NavLink to="/" text="Home" mobile />
        <NavLink to="/calculator" text="Calculadora" mobile />
        <NavLink to="/map" text="Mapa" mobile />
        <NavLink to="/sustentabilidade" text="Sustentabilidade" mobile />
        {user && <NavLink to="/profile" text="Perfil" mobile />}
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full font-semibold bg-white text-green-600 hover:bg-green-100 transition duration-300 w-full mt-4"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-full font-semibold bg-white text-green-600 hover:bg-green-100 transition duration-300 w-full mt-4 block text-center"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-full font-semibold bg-white text-green-600 hover:bg-green-100 transition duration-300 w-full mt-2 block text-center"
            >
              Registrar
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

const NavLink: React.FC<{ to: string; text: string; mobile?: boolean }> = ({ to, text, mobile }) => (
  <Link
    to={to}
    className={`${
      mobile
        ? 'block py-2 px-4 text-white hover:bg-green-700 rounded transition duration-300'
        : 'text-white hover:text-green-200 transition duration-300'
    }`}
  >
    {text}
  </Link>
);

export default Navbar;