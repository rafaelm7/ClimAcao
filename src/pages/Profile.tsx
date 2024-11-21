import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Leaf, Recycle, Zap, Car, Plane, Beef, Flame } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  transportationMode: string;
  energySaving: string;
  recycling: string;
  joinDate: string;
  calculatorData?: {
    carbonFootprint: number;
    electricity: number;
    gas: number;
    car: number;
    flights: number;
    redMeat: number;
    lastCalculated: string;
  };
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data() as UserData);
          } else {
            setError("User data not found.");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("An error occurred while fetching your data. Please try again later.");
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (!user) {
    return <div className="text-center mt-8">Please log in to view your profile.</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!userData) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  const getTransportationIcon = (mode: string) => {
    switch (mode) {
      case 'car': return '🚗';
      case 'publicTransport': return '🚌';
      case 'bicycle': return '🚲';
      case 'walking': return '🚶';
      default: return '🚶';
    }
  };

  const translateTransportationMode = (mode: string) => {
    switch (mode) {
      case 'car': return 'Carro';
      case 'publicTransport': return 'Transporte Público';
      case 'bicycle': return 'Bicicleta';
      case 'walking': return 'A pé';
      default: return mode;
    }
  };

  const translateEnergySaving = (value: string) => {
    switch (value) {
      case 'yes': return 'Sim';
      case 'some': return 'Alguns';
      case 'no': return 'Não';
      default: return value;
    }
  };

  const translateRecycling = (value: string) => {
    switch (value) {
      case 'always': return 'Sempre';
      case 'often': return 'Frequentemente';
      case 'sometimes': return 'Às vezes';
      case 'rarely': return 'Raramente';
      case 'never': return 'Nunca';
      default: return value;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600 transition-all duration-300 hover:scale-110 hover:text-green-700">
        Seu Perfil
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <div className="mb-4 transform transition-all duration-300 hover:translate-x-2">
          <h3 className="text-xl font-semibold mb-2 text-green-600 transition-colors duration-300 hover:text-green-700">Informações Pessoais</h3>
          <p className="transition-all duration-300 hover:text-green-600"><strong>Nome:</strong> {userData.name}</p>
          <p className="transition-all duration-300 hover:text-green-600"><strong>E-mail:</strong> {userData.email}</p>
          <p className="transition-all duration-300 hover:text-green-600"><strong>Ingressou em:</strong> {new Date(userData.joinDate).toLocaleDateString('pt-BR')}</p>
        </div>

        <div className="mb-4 transform transition-all duration-300 hover:translate-x-2">
          <h3 className="text-xl font-semibold mb-2 text-green-600 transition-colors duration-300 hover:text-green-700">Hábitos Ecológicos</h3>
          <p className="transition-all duration-300 hover:text-green-600">
            <span className="mr-2 transform inline-block transition-all duration-300 hover:scale-125 hover:rotate-12">{getTransportationIcon(userData.transportationMode)}</span>
            <strong>Transporte Principal:</strong> {translateTransportationMode(userData.transportationMode)}
          </p>
          <p className="transition-all duration-300 hover:text-green-600">
            <Zap className="inline-block mr-2 text-yellow-500 transform transition-all duration-300 hover:scale-125 hover:rotate-12" />
            <strong>Eletrodomésticos Eficientes:</strong> {translateEnergySaving(userData.energySaving)}
          </p>
          <p className="transition-all duration-300 hover:text-green-600">
            <Recycle className="inline-block mr-2 text-green-500 transform transition-all duration-300 hover:scale-125 hover:rotate-12" />
            <strong>Frequência de Reciclagem:</strong> {translateRecycling(userData.recycling)}
          </p>
        </div>

        {userData.calculatorData && (
          <div className="mb-4 transform transition-all duration-300 hover:translate-x-2">
            <h3 className="text-xl font-semibold mb-2 text-green-600 transition-colors duration-300 hover:text-green-700">Dados da Pegada de Carbono</h3>
            <p className="transition-all duration-300 hover:text-green-600">
              <Leaf className="inline-block mr-2 text-green-500 transform transition-all duration-300 hover:scale-125 hover:rotate-12" />
              <strong>Pegada de Carbono:</strong> {userData.calculatorData.carbonFootprint.toFixed(2)} toneladas CO2/ano
            </p>
            <p className="transition-all duration-300 hover:text-green-600">
              <Zap className="inline-block mr-2 text-yellow-500 transform transition-all duration-300 hover:scale-125 hover:rotate-12" />
              <strong>Consumo de Eletricidade:</strong> {userData.calculatorData.electricity} kWh/mês
            </p>
            <p className="transition-all duration-300 hover:text-green-600">
              <Flame className="inline-block mr-2 text-orange-500 transform transition-all duration-300 hover:scale-125 hover:rotate-12" />
              <strong>Consumo de Gás:</strong> {userData.calculatorData.gas} m³/mês
            </p>
            <p className="transition-all duration-300 hover:text-green-600">
              <Car className="inline-block mr-2 text-blue-500 transform transition-all duration-300 hover:scale-125 hover:rotate-12" />
              <strong>Distância Percorrida de Carro:</strong> {userData.calculatorData.car} km/mês
            </p>
            <p className="transition-all duration-300 hover:text-green-600">
              <Plane className="inline-block mr-2 text-gray-500 transform transition-all duration-300 hover:scale-125 hover:rotate-12" />
              <strong>Voos por Ano:</strong> {userData.calculatorData.flights}
            </p>
            <p className="transition-all duration-300 hover:text-green-600">
              <Beef className="inline-block mr-2 text-red-500 transform transition-all duration-300 hover:scale-125 hover:rotate-12" />
              <strong>Consumo de Carne Vermelha:</strong> {userData.calculatorData.redMeat} g/semana
            </p>
            <p className="transition-all duration-300 hover:text-green-600"><strong>Último Cálculo:</strong> {new Date(userData.calculatorData.lastCalculated).toLocaleString('pt-BR')}</p>
          </div>
        )}

        <div className="transform transition-all duration-300 hover:translate-x-2">
          <h3 className="text-xl font-semibold mb-2 text-green-600 transition-colors duration-300 hover:text-green-700">Pontuação Ecológica</h3>
          <div className="flex items-center">
            <Leaf className="text-green-500 mr-2 transform transition-all duration-300 hover:scale-125 hover:rotate-12" />
            <div className="bg-gray-200 h-4 rounded-full flex-grow overflow-hidden">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{width: `${calculateEcoScore(userData)}%`}}
              ></div>
            </div>
            <span className="ml-2 font-semibold transition-all duration-300 hover:text-green-600">{calculateEcoScore(userData)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateEcoScore = (userData: UserData): number => {
  let score = 0;
  
  // Transportation score
  switch (userData.transportationMode) {
    case 'walking': score += 30; break;
    case 'bicycle': score += 25; break;
    case 'publicTransport': score += 20; break;
    case 'car': score += 10; break;
  }

  // Energy-saving score
  switch (userData.energySaving) {
    case 'yes': score += 30; break;
    case 'some': score += 20; break;
    case 'no': score += 10; break;
  }

  // Recycling score
  switch (userData.recycling) {
    case 'always': score += 40; break;
    case 'often': score += 30; break;
    case 'sometimes': score += 20; break;
    case 'rarely': score += 10; break;
    case 'never': score += 0; break;
  }

  // Carbon footprint score
  if (userData.calculatorData) {
    const footprint = userData.calculatorData.carbonFootprint;
    if (footprint < 5) score += 30;
    else if (footprint < 10) score += 20;
    else if (footprint < 15) score += 10;
  }

  return Math.min(score, 100); // Ensure the score doesn't exceed 100
};

export default Profile;