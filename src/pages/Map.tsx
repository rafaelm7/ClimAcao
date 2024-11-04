import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    windyInit: (options: any, windyAPI: any) => void;
  }
}

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadWindyAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const windyScript = document.createElement('script');
        windyScript.src = 'https://api.windy.com/assets/map-forecast/libBoot.js';
        windyScript.async = true;
        document.body.appendChild(windyScript);

        windyScript.onload = initializeWindy;
      };
    };

    const initializeWindy = () => {
      const options = {
        key: '1bTDaOiC5ERN1c3g8yNxka99OpEI2JZR',
        lat: -14.235,
        lon: -51.925,
        zoom: 4,
        timestamp: Date.now(),
        hourFormat: '24h',
        // Adicione mais opções conforme necessário
      };

      window.windyInit(options, (windyAPI: any) => {
        const { picker, utils, broadcast } = windyAPI;

        // Exemplo de uso do picker para obter dados de um ponto específico
        picker.on('pickerOpened', ({ lat, lon, values, overlay }: any) => {
          console.log('Dados do ponto selecionado:', { lat, lon, values, overlay });
        });

        // Exemplo de uso do utils para converter unidades
        const tempInC = utils.temperature(25, 'C');
        console.log('Temperatura em Celsius:', tempInC);

        // Exemplo de uso do broadcast para atualizar o mapa
        broadcast.on('redrawFinished', () => {
          console.log('Mapa atualizado');
        });
      });
    };

    if (mapRef.current) {
      loadWindyAPI();
    }

    return () => {
      const scripts = document.querySelectorAll('script[src^="https://unpkg.com/leaflet"], script[src^="https://api.windy.com"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Mapa de Ventos, Temperatura e Pressão Atmosférica</h2>
      <div id="windy" ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
      <div className="mt-4 p-4 bg-green-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Como usar o mapa:</h3>
        <ul className="list-disc pl-5">
          <li>O mapa mostra a variaçoes do clima para o Brasil e e mundo.</li>
          <li>Você pode navegar pelo mapa arrastando e usando o zoom.</li>
          <li>Use os controles no canto superior direito para alterar as camadas e visualizações.</li>
          <li>Caso não visualize as camadas do mapa, acesse o site Windy.com no topo.</li>
        </ul>
      </div>
    </div>
  );
};

export default Map;