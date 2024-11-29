import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
     <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Sobre Nós</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          ClimAção é um projeto desenvolvido como parte da avaliação A3 da Unidade Curricular de Usabilidade, Desenvolvimento Web, Mobile e Jogos, do curso de Sistemas de Informação e Ciência da Computação. Esse trabalho foi elaborado com o objetivo de aplicar conhecimentos teóricos e práticos sobre usabilidade e desenvolvimento de aplicações digitais, visando criar uma solução que combine funcionalidade, acessibilidade e impacto social.
        </p>
        <p className="mb-4">
          Orientado pela professora Eliane Isadora Faveron Maciel, o projeto é fruto da colaboração de um grupo de alunos comprometidos em explorar o potencial de tecnologias web e mobile para conscientização sobre mudanças climáticas. Por meio do ClimAção, buscamos promover a educação e o engajamento da comunidade em ações que contribuam para um futuro mais sustentável.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Equipe de Desenvolvimento:</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Ian Freire Borges - 12723134698</li>
          <li>Raí Lapa de Souza - 12723132815</li>
          <li>Irvin Marques de Moura - 12723123617</li>
          <li>Rafael Cordeiro Magalhães - 1272019188</li>
          <li>Rafael Teixeira Queiroz de Carvalho - 12723129558</li>
          <li>Pedro Henrique Martins Mattos Barreiros - 1272319265</li>
        </ul>
        <p>
          Com dedicação e inovação, esperamos que o ClimAção inspire novas iniciativas e contribua para um impacto positivo no mundo.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
