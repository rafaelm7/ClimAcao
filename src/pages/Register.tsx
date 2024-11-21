import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { User, Mail, Lock, Car, Zap, Recycle } from 'lucide-react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [transportationMode, setTransportationMode] = useState('');
  const [energySaving, setEnergySaving] = useState('');
  const [recycling, setRecycling] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await register(email, password);
      const user = userCredential.user;
      
      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        transportationMode,
        energySaving,
        recycling,
        joinDate: new Date().toISOString(),
      });

      navigate('/profile');
    } catch (error) {
      setError('Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600 transition-all duration-300 hover:scale-110 hover:text-green-700">
          Cadastro
        </h1>
        {error && (
          <p className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg transform transition-all duration-300 hover:scale-105">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group transform transition-all duration-300 hover:translate-x-2">
            <label htmlFor="name" className="block mb-2 font-semibold text-gray-700 transition-colors duration-300 group-hover:text-green-600">
              Nome
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-400 group-hover:text-green-500 transition-colors duration-300" size={20} />
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-400 hover:border-green-400"
              />
            </div>
          </div>

          <div className="group transform transition-all duration-300 hover:translate-x-2">
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 transition-colors duration-300 group-hover:text-green-600">
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400 group-hover:text-green-500 transition-colors duration-300" size={20} />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-400 hover:border-green-400"
              />
            </div>
          </div>

          <div className="group transform transition-all duration-300 hover:translate-x-2">
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700 transition-colors duration-300 group-hover:text-green-600">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400 group-hover:text-green-500 transition-colors duration-300" size={20} />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-400 hover:border-green-400"
              />
            </div>
          </div>

          <div className="group transform transition-all duration-300 hover:translate-x-2">
            <label htmlFor="transportationMode" className="block mb-2 font-semibold text-gray-700 transition-colors duration-300 group-hover:text-green-600">
              Modo de Transporte Principal
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Car className="text-gray-400 group-hover:text-green-500 transition-colors duration-300" size={20} />
              </div>
              <select
                id="transportationMode"
                value={transportationMode}
                onChange={(e) => setTransportationMode(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-400 hover:border-green-400"
              >
                <option value="">Selecione uma opção</option>
                <option value="car">Carro</option>
                <option value="publicTransport">Transporte Público</option>
                <option value="bicycle">Bicicleta</option>
                <option value="walking">A pé</option>
              </select>
            </div>
          </div>

          <div className="group transform transition-all duration-300 hover:translate-x-2">
            <label htmlFor="energySaving" className="block mb-2 font-semibold text-gray-700 transition-colors duration-300 group-hover:text-green-600">
              Usa Eletrodomésticos Eficientes?
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Zap className="text-gray-400 group-hover:text-green-500 transition-colors duration-300" size={20} />
              </div>
              <select
                id="energySaving"
                value={energySaving}
                onChange={(e) => setEnergySaving(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-400 hover:border-green-400"
              >
                <option value="">Selecione uma opção</option>
                <option value="yes">Sim</option>
                <option value="some">Alguns</option>
                <option value="no">Não</option>
              </select>
            </div>
          </div>

          <div className="group transform transition-all duration-300 hover:translate-x-2">
            <label htmlFor="recycling" className="block mb-2 font-semibold text-gray-700 transition-colors duration-300 group-hover:text-green-600">
              Frequência de Reciclagem
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Recycle className="text-gray-400 group-hover:text-green-500 transition-colors duration-300" size={20} />
              </div>
              <select
                id="recycling"
                value={recycling}
                onChange={(e) => setRecycling(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-400 hover:border-green-400"
              >
                <option value="">Selecione uma opção</option>
                <option value="always">Sempre</option>
                <option value="often">Frequentemente</option>
                <option value="sometimes">Às vezes</option>
                <option value="rarely">Raramente</option>
                <option value="never">Nunca</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-green-600 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        <p className="mt-6 text-center transform transition-all duration-300 hover:scale-105">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-green-500 hover:text-green-700 transition-colors duration-300 hover:underline font-semibold">
            Entre aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;