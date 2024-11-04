import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-green-400">ClimAção</h2>
          </div>
          <div className="flex flex-wrap justify-center space-x-4">
            <Link to="/sobre-nos" className="hover:text-green-400 transition duration-300">Sobre Nós</Link>
            <Link to="/services" className="hover:text-green-400 transition duration-300">Serviços</Link>
            <Link to="/contact" className="hover:text-green-400 transition duration-300">Contato</Link>
            <Link to="/privacy" className="hover:text-green-400 transition duration-300">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;