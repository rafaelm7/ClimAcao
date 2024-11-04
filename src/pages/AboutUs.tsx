import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
     <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Sobre Nós</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          A ClimAção é uma organização dedicada a promover a conscientização ambiental e ações sustentáveis para combater as mudanças climáticas. Nossa missão é inspirar e capacitar indivíduos e comunidades a fazerem escolhas mais ecológicas em seu dia a dia.
        </p>
        <p className="mb-4">
          Trabalhamos para educar, motivar e facilitar mudanças positivas em prol do nosso planeta.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Nossos Objetivos:</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Educar o público sobre as causas e impactos das mudanças climáticas</li>
          <li>Promover práticas sustentáveis em comunidades e empresas</li>
          <li>Desenvolver e implementar soluções inovadoras para reduzir a pegada de carbono</li>
          <li>Colaborar com organizações locais e globais para amplificar nosso impacto positivo</li>
        </ul>
        <p>
          Junte-se a nós nesta jornada para criar um futuro mais verde e sustentável. Cada ação conta, e juntos podemos fazer a diferença!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;