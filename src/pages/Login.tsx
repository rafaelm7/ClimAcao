import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Falha no login. Por favor, verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600 transition-all duration-300 hover:scale-110 hover:text-green-700">Login</h1>
        {error && (
          <p className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg transform transition-all duration-300 hover:scale-105">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group transform transition-all duration-300 hover:translate-x-2">
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 transition-colors duration-300 group-hover:text-green-600">
              Email
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
                className="w-full pl-10 pr-3 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400"
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
                className="w-full pl-10 pr-3 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-green-600 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="mt-6 text-center transform transition-all duration-300 hover:scale-105">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-green-500 hover:text-green-700 transition-colors duration-300 hover:underline font-semibold">
            Registre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;