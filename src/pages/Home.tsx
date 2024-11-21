import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, MapPin, Leaf } from 'lucide-react';

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; link: string }> = ({ icon, title, link }) => (
  <Link to={link} className="text-center group relative p-6 rounded-xl transition-all duration-300 hover:bg-green-50 transform hover:-translate-y-2 hover:shadow-xl">
    <div className="bg-green-100 text-green-600 rounded-full p-4 inline-block mb-4 transform transition-all duration-300 group-hover:bg-green-200 group-hover:scale-110 group-hover:rotate-3">
      {icon}
    </div>
    <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-green-600">{title}</h3>
    <div className="absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300 group-hover:border-green-200 group-hover:scale-105 pointer-events-none"></div>
  </Link>
);

const LegadoItem: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="text-center bg-green-50 p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-100">
    <div className="text-4xl mb-4 transform transition-all duration-300 hover:scale-125 hover:rotate-12 inline-block">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-green-600 transition-colors duration-300 hover:text-green-700">{title}</h3>
    <p className="text-gray-700 transition-all duration-300 group-hover:text-gray-900">{description}</p>
  </div>
);

const Home: React.FC = () => {
  const [randomLegadoCards, setRandomLegadoCards] = useState(legadoCards);

  useEffect(() => {
    const shuffled = [...legadoCards].sort(() => 0.5 - Math.random());
    setRandomLegadoCards(shuffled.slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        <section id="home" className="bg-cover bg-center text-white -mt-16 relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]" style={{backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80')"}}>
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center bg-black bg-opacity-20 backdrop-blur-sm p-8 rounded-lg transform transition-all duration-500 hover:bg-opacity-30 hover:scale-105">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 transition-all duration-300 hover:text-green-400">Promovendo Ações Sustentáveis</h1>
              <p className="text-xl mb-8">Junte-se à <strong className="text-green-400">ClimAção</strong> e faça a diferença na luta contra as mudanças climáticas.</p>
              <Link to="/register" className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-semibold transform transition-all duration-300 hover:bg-green-600 hover:text-white hover:scale-110 hover:shadow-lg active:scale-95">
                Comece Agora
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureItem
                icon={<Calculator size={32} />}
                title="Calculadora de Carbono"
                link="/calculator"
              />
              <FeatureItem
                icon={<MapPin size={32} />}
                title="Mapa Climático"
                link="/map"
              />
              <FeatureItem
                icon={<Leaf size={32} />}
                title="Dicas Sustentáveis"
                link="/sustentabilidade"
              />
            </div>
          </div>
        </section>

        <section id="nature-images" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-600 transition-all duration-300 hover:scale-110 hover:text-green-700">Nossa Missão</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" alt="Conscientização Ecológica" 
                className="w-full h-64 object-cover rounded-lg shadow-md transition-all duration-500 hover:scale-105 hover:shadow-2xl transform hover:-rotate-2" />
              <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec" alt="Oceano" 
                className="w-full h-64 object-cover rounded-lg shadow-md transition-all duration-500 hover:scale-105 hover:shadow-2xl transform hover:rotate-2" />
              <img src="https://images.unsplash.com/photo-1542856391-010fb87dcfed" alt="Ecologia" 
                className="w-full h-64 object-cover rounded-lg shadow-md transition-all duration-500 hover:scale-105 hover:shadow-2xl transform hover:-rotate-2" />
            </div>
          </div>
        </section>

        <section id="legado" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-600">Nosso Legado</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {randomLegadoCards.map((card, index) => (
                <LegadoItem
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const legadoCards = [
  {
    icon: "🌱",
    title: "Plantio de Árvores",
    description: "Incentivamos o plantio urbano e rural, promovendo a biodiversidade e qualidade do ar."
  },
  {
    icon: "♻️",
    title: "Reciclagem",
    description: "Estimulamos programas de reciclagem comunitários, reduzindo resíduos e promovendo a economia circular."
  },
  {
    icon: "💡",
    title: "Educação Ambiental",
    description: "Acreditamos em programas educacionais que inspiram soluções ecológicas inovadoras."
  },
  {
    icon: "🌍",
    title: "Impacto Global",
    description: "Incentivamos projetos internacionais que promovem soluções ecológicas adaptadas a diferentes contextos."
  },
  {
    icon: "🤝",
    title: "Parcerias",
    description: "Fomentamos colaborações para desenvolver e implementar soluções ecológicas em larga escala."
  },
  {
    icon: "📊",
    title: "Redução de Emissões",
    description: "Apoiamos iniciativas de energia limpa e eficiência energética para combater as mudanças climáticas."
  }
];

export default Home;