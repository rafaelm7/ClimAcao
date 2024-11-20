import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, MapPin, Leaf, UserCircle } from 'lucide-react';

const legadoCards = [
  { icon: '🌱', title: 'Educação Ambiental', description: 'Inspiramos a reflexão sobre a preservação ambiental através de conteúdos educativos que ampliam a consciência ecológica.' },
  { icon: '🌊', title: 'Conscientização sobre os Oceanos', description: 'Divulgamos a importância de proteger nossos oceanos, destacando o papel vital que eles desempenham no equilíbrio ambiental.' },
  { icon: '🌳', title: 'Preservação das Florestas', description: 'Promovemos o conhecimento sobre a importância das florestas na manutenção da vida e na regulação climática.' },
  { icon: '♻️', title: 'Consciência sobre Reciclagem', description: 'Educamos sobre a relevância da reciclagem, incentivando a reflexão sobre a gestão correta dos resíduos.' },
  { icon: '🚲', title: 'Sustentabilidade na Mobilidade', description: 'Divulgamos a importância de meios de transporte sustentáveis e seus impactos positivos no meio ambiente.' },
  { icon: '🏞️', title: 'Importância das Áreas Verdes', description: 'Ressaltamos o valor das áreas verdes e sua contribuição para o bem-estar das cidades e da biodiversidade.' },
  { icon: '🌿', title: 'Conscientização sobre Agricultura Sustentável', description: 'Fomentamos o entendimento sobre práticas agrícolas que respeitam o meio ambiente e promovem o equilíbrio ecológico.' },
  { icon: '🎤', title: 'Diálogos Inspiradores', description: 'Facilitamos a troca de ideias e experiências sobre a importância de adotar uma mentalidade ecológica no cotidiano.' }
];


const Home: React.FC = () => {
  const [randomLegadoCards, setRandomLegadoCards] = useState(legadoCards);

  useEffect(() => {
    const shuffled = [...legadoCards].sort(() => 0.5 - Math.random());
    setRandomLegadoCards(shuffled.slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        <section id="home" className="bg-cover bg-center text-white -mt-16" style={{backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80')"}}>
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center bg-black bg-opacity-20 p-8 rounded-lg">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Promovendo Ações Sustentáveis</h1>
              <p className="text-xl mb-8">Junte-se à <strong>ClimAção</strong> e faça a diferença na luta contra as mudanças climáticas.</p>
              <Link to="/register" className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-600 hover:text-white transition duration-300">Comece Agora</Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-600">Nossos Recursos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureItem icon={<Calculator size={48} />} title="Calculadora de Carbono" link="/calculator" />
              <FeatureItem icon={<MapPin size={48} />} title="Mapa Interativo" link="/map" />
              <FeatureItem icon={<Leaf size={48} />} title="Sustentabilidade" link="/sustentabilidade" />
              <FeatureItem icon={<UserCircle size={48} />} title="Perfil" link="/profile" />
            </div>
          </div>
        </section>

        <section id="nature-images" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-600">Nossa Missão</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" alt="Conscientização Ecológica" className="w-full h-64 object-cover rounded-lg shadow-md" />
              <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec" alt="Oceano" className="w-full h-64 object-cover rounded-lg shadow-md" />
              <img src="https://images.unsplash.com/photo-1542856391-010fb87dcfed" alt="Ecologia" className="w-full h-64 object-cover rounded-lg shadow-md" />
            </div>
          </div>
        </section>

        <section id="legado" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-600">Legado</h2>
            <p className="text-center text-xl mb-12">Nossas ações de conscientização ambiental permitem avanços significativos na sociedade:</p>
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

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; link: string }> = ({ icon, title, link }) => (
  <Link to={link} className="text-center group">
    <div className="bg-green-100 text-green-600 rounded-full p-4 inline-block mb-4 group-hover:bg-green-200 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-semibold group-hover:text-green-600 transition-colors">{title}</h3>
  </Link>
);

const LegadoItem: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="text-center bg-green-50 p-6 rounded-lg shadow-md">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-green-600">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default Home;