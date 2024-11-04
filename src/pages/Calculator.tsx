import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { Zap, Flame, Car, Plane, Beef } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Calculator: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [calculatorData, setCalculatorData] = useState<any>(null);
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const electricity = parseFloat(formData.get('electricity') as string) || 0;
    const gas = parseFloat(formData.get('gas') as string) || 0;
    const car = parseFloat(formData.get('car') as string) || 0;
    const flights = parseFloat(formData.get('flights') as string) || 0;
    const redMeat = parseFloat(formData.get('redMeat') as string) || 0;

    const carbonFootprint = ((electricity * 0.5) + (gas * 2) + (car * 0.2) + (flights * 1.5) + (redMeat * 0.1)) / 1000;
    setResult(carbonFootprint);

    const newTips = [];
    if (electricity > 300) newTips.push('Considere usar lâmpadas LED e aparelhos mais eficientes.');
    if (car > 1000) newTips.push('Tente usar mais transporte público ou considere um veículo elétrico.');
    if (flights > 2) newTips.push('Reduza as viagens aéreas ou compense suas emissões através de programas de carbono.');
    setTips(newTips);

    setCalculatorData({
      carbonFootprint,
      electricity,
      gas,
      car,
      flights,
      redMeat,
      lastCalculated: new Date().toISOString()
    });

    if (user) {
      setShowSavePrompt(true);
    }
  };

  const handleSaveToProfile = async () => {
    if (user && calculatorData) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          calculatorData
        });
        setShowSavePrompt(false);
        toast.success('Informações da calculadora salvas no seu perfil!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Error saving calculator data:", error);
        toast.error('Erro ao salvar as informações. Por favor, tente novamente.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Calculadora de Pegada de Carbono</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <InputField
          id="electricity"
          label="Uso Mensal de Eletricidade (kWh)"
          icon={<Zap className="text-yellow-500" size={24} />}
        />
        <InputField
          id="gas"
          label="Uso Mensal de Gás (m³)"
          icon={<Flame className="text-orange-500" size={24} />}
        />
        <InputField
          id="car"
          label="Viagem Mensal de Carro (km)"
          icon={<Car className="text-blue-500" size={24} />}
        />
        <InputField
          id="flights"
          label="Número de Voos por Ano"
          icon={<Plane className="text-gray-500" size={24} />}
        />
        <InputField
          id="redMeat"
          label="Consumo Semanal de Carne Vermelha (g)"
          icon={<Beef className="text-red-500" size={24} />}
        />
        <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-bold text-lg mt-6">
          Calcular
        </button>
      </form>

      {result !== null && (
        <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Sua Pegada de Carbono</h3>
          <p className="text-2xl font-bold text-green-600 mb-4">{result.toFixed(2)} toneladas CO2/ano</p>
          {tips.length > 0 && (
            <div>
              <h4 className="font-bold mb-2">Dicas para Reduzir sua Pegada:</h4>
              <ul className="list-disc pl-5">
                {tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
          {showSavePrompt && (
            <button
              onClick={handleSaveToProfile}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-bold"
            >
              Salvar no Perfil
            </button>
          )}
        </div>
      )}
      <ToastContainer
  position="top-center"
  style={{ top: '60px' }} // Adjust this value based on your header height
  rtl
/>
    </div>
  );
};

interface InputFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, icon }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2 font-semibold text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type="number"
        id={id}
        name={id}
        className="w-full pl-12 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        required
      />
    </div>
  </div>
);

export default Calculator;