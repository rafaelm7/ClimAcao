import React, { useState, useEffect } from 'react';
import { Lightbulb, Car, Utensils, Recycle, Droplet, Sun, Wind, Leaf, ShoppingBag, Home, Zap, Trash2, Smartphone, Thermometer, Umbrella, Coffee, Shirt, Book, Tv, Plane } from 'lucide-react';

const allTips = [
  { icon: <Lightbulb size={48} />, title: "Economia de Energia", tips: ["Use lâmpadas LED", "Desligue aparelhos eletrônicos quando não estiver usando", "Opte por eletrodomésticos com boa eficiência energética"] },
  { icon: <Car size={48} />, title: "Transporte", tips: ["Use transporte público sempre que possível", "Considere andar de bicicleta ou a pé para trajetos curtos", "Se precisar de um carro, opte por modelos mais eficientes ou elétricos"] },
  { icon: <Utensils size={48} />, title: "Alimentação", tips: ["Reduza o consumo de carne, especialmente carne vermelha", "Compre alimentos locais e sazonais", "Evite desperdício de alimentos"] },
  { icon: <Recycle size={48} />, title: "Consumo e Reciclagem", tips: ["Pratique os 3 Rs: Reduzir, Reutilizar e Reciclar", "Evite produtos com embalagens excessivas", "Doe ou recicle itens que não usa mais"] },
  { icon: <Droplet size={48} />, title: "Economia de Água", tips: ["Conserte vazamentos rapidamente", "Tome banhos mais curtos", "Use a máquina de lavar roupa apenas com carga completa"] },
  { icon: <Sun size={48} />, title: "Energia Solar", tips: ["Considere instalar painéis solares", "Use aquecedores solares de água", "Aproveite a luz natural sempre que possível"] },
  { icon: <Wind size={48} />, title: "Energia Eólica", tips: ["Apoie projetos de energia eólica em sua comunidade", "Considere investir em cooperativas de energia eólica", "Eduque-se sobre os benefícios da energia eólica"] },
  { icon: <Leaf size={48} />, title: "Plantio de Árvores", tips: ["Plante árvores em seu quintal ou comunidade", "Participe de eventos de reflorestamento", "Apoie organizações de conservação florestal"] },
  { icon: <ShoppingBag size={48} />, title: "Compras Conscientes", tips: ["Compre produtos duráveis e de qualidade", "Opte por produtos com certificações ambientais", "Evite compras por impulso"] },
  { icon: <Home size={48} />, title: "Casa Sustentável", tips: ["Melhore o isolamento térmico de sua casa", "Use cortinas térmicas", "Instale um termostato programável"] },
  { icon: <Zap size={48} />, title: "Eficiência Energética", tips: ["Faça uma auditoria energética em sua casa", "Substitua equipamentos antigos por modelos mais eficientes", "Use timers para controlar o uso de energia"] },
  { icon: <Trash2 size={48} />, title: "Redução de Resíduos", tips: ["Use sacolas reutilizáveis", "Evite produtos descartáveis", "Comece a compostar resíduos orgânicos"] },
  { icon: <Smartphone size={48} />, title: "Tecnologia Verde", tips: ["Recicle seus eletrônicos antigos", "Use carregadores solares para dispositivos móveis", "Opte por serviços de streaming em vez de comprar mídia física"] },
  { icon: <Thermometer size={48} />, title: "Controle de Temperatura", tips: ["Ajuste o termostato para economizar energia", "Use ventiladores em vez de ar condicionado quando possível", "Vista-se adequadamente para a temperatura ambiente"] },
  { icon: <Umbrella size={48} />, title: "Captação de Água da Chuva", tips: ["Instale um sistema de captação de água da chuva", "Use a água da chuva para regar plantas e jardins", "Lave áreas externas com água da chuva"] },
  { icon: <Coffee size={48} />, title: "Consumo Sustentável", tips: ["Use uma garrafa de água reutilizável", "Leve sua própria caneca para cafeterias", "Escolha produtos com menos embalagens"] },
  { icon: <Shirt size={48} />, title: "Moda Sustentável", tips: ["Compre roupas de segunda mão", "Escolha tecidos sustentáveis", "Conserte roupas em vez de descartá-las"] },
  { icon: <Book size={48} />, title: "Educação Ambiental", tips: ["Leia sobre questões ambientais", "Participe de workshops sobre sustentabilidade", "Compartilhe conhecimentos com amigos e família"] },
  { icon: <Tv size={48} />, title: "Entretenimento Ecológico", tips: ["Assista a documentários sobre meio ambiente", "Participe de atividades ao ar livre", "Organize eventos de limpeza comunitária"] },
  { icon: <Plane size={48} />, title: "Viagens Sustentáveis", tips: ["Compense as emissões de carbono de suas viagens", "Escolha destinos ecoturísticos", "Use transporte público em suas viagens"] }
];

const Tips: React.FC = () => {
  const [randomTips, setRandomTips] = useState<typeof allTips>([]);

  useEffect(() => {
    const shuffled = [...allTips].sort(() => 0.5 - Math.random());
    setRandomTips(shuffled.slice(0, 4));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Dicas Sustentáveis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {randomTips.map((tip, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-500 mb-4">{tip.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
            <ul className="list-disc pl-5">
              {tip.tips.map((item, itemIndex) => (
                <li key={itemIndex} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;