import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Cadastro</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="transportationMode" className="block mb-1">Modo de Transporte Principal</label>
          <select
            id="transportationMode"
            value={transportationMode}
            onChange={(e) => setTransportationMode(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Selecione uma opção</option>
            <option value="car">Carro</option>
            <option value="publicTransport">Transporte Público</option>
            <option value="bicycle">Bicicleta</option>
            <option value="walking">A pé</option>
          </select>
        </div>
        <div>
          <label htmlFor="energySaving" className="block mb-1">Usa Eletrodomésticos Eficientes?</label>
          <select
            id="energySaving"
            value={energySaving}
            onChange={(e) => setEnergySaving(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Selecione uma opção</option>
            <option value="yes">Sim</option>
            <option value="some">Alguns</option>
            <option value="no">Não</option>
          </select>
        </div>
        <div>
          <label htmlFor="recycling" className="block mb-1">Frequência de Reciclagem</label>
          <select
            id="recycling"
            value={recycling}
            onChange={(e) => setRecycling(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Selecione uma opção</option>
            <option value="always">Sempre</option>
            <option value="often">Frequentemente</option>
            <option value="sometimes">Às vezes</option>
            <option value="rarely">Raramente</option>
            <option value="never">Nunca</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Já tem uma conta? <Link to="/login" className="text-green-500 hover:underline">Entre aqui</Link>
      </p>
    </div>
  );
};

export default Register;