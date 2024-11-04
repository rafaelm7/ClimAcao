# ClimAção 🌱

ClimAção é uma aplicação web focada em conscientização ambiental e ações sustentáveis para combater as mudanças climáticas. A plataforma fornece ferramentas e informações para ajudar os usuários a entenderem e reduzirem seu impacto ambiental.

## Funcionalidades 🚀

- **Calculadora de Pegada de Carbono**: Calcule sua pegada de carbono pessoal com base em diversos fatores
- **Mapa Interativo do Clima**: Visualize padrões de vento, temperatura e pressão atmosférica em todo o mundo
- **Dicas de Sustentabilidade**: Receba recomendações personalizadas para um estilo de vida mais ecológico
- **Perfis de Usuário**: Acompanhe seu progresso e hábitos ambientais
- **Conteúdo Educativo**: Aprenda sobre mudanças climáticas e práticas sustentáveis

## Tecnologias Utilizadas 💻

- React 18
- TypeScript
- Tailwind CSS
- Firebase Authentication & Firestore
- Vite
- React Router DOM
- React Toastify
- Windy API
- Leaflet Maps

## Como Começar 🏁

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Conta Firebase

### Instalação

1. Clone o repositório
bash
git clone https://github.com/seunome/climacao.git

2. Instale as dependências
bash
cd climacao
npm install

3. Crie um arquivo `.env` na raiz do projeto com suas credenciais do Firebase e Windy API:
env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_WINDY_API_KEY=sua_windy_api_key

4. Inicie o servidor de desenvolvimento
bash
npm run dev


## Estrutura do Projeto 📁
climacao/
├── src/
│ ├── components/
│ ├── contexts/
│ ├── pages/
│ ├── App.tsx
│ └── main.tsx
├── public/
└── ...


## Detalhamento das Funcionalidades 🔍

### Calculadora de Pegada de Carbono
- Calcula emissões de CO2 com base em:
  - Consumo de eletricidade
  - Uso de gás
  - Transporte
  - Frequência de voos
  - Hábitos alimentares

### Mapa Interativo
- Visualização do clima em tempo real
- Padrões de vento
- Distribuição de temperatura
- Pressão atmosférica

### Dicas de Sustentabilidade
- Recomendações personalizadas
- Organização por categorias
- Guias práticos de implementação

## Como Contribuir 🤝

1. Faça um fork do repositório
2. Crie sua branch de feature (`git checkout -b feature/NovaFuncionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## Agradecimentos 👏

- Windy API pelos dados meteorológicos
- Firebase pelos serviços de autenticação e banco de dados
- Todos os contribuidores que ajudaram a moldar este projeto

---

