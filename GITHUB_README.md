# 🪒 Club Régua Máxima - Barbershop Booking System

> Sistema completo de agendamento online para barbearia com integração WhatsApp

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green.svg)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)

## 🚀 Sobre o Projeto

Sistema full-stack desenvolvido para automatizar o processo de agendamento de uma barbearia, incluindo notificações automáticas via WhatsApp e painel administrativo completo.

### ✨ Principais Funcionalidades

- 📅 **Agendamento Online** - Interface intuitiva para clientes
- 📱 **Integração WhatsApp** - Confirmações e lembretes automáticos  
- 👨‍💼 **Painel Admin** - Gestão completa de agendamentos e clientes
- 📊 **Dashboard** - Estatísticas e relatórios em tempo real
- 🎨 **Design Responsivo** - Otimizado para todos os dispositivos
- ⚡ **Performance** - Carregamento rápido e animações suaves

## 🛠️ Tecnologias

### Frontend
- **React.js** - Biblioteca para interfaces de usuário
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **React Router** - Roteamento SPA
- **Axios** - Cliente HTTP

### Backend
- **FastAPI** - Framework web moderno para Python
- **MongoDB** - Banco de dados NoSQL
- **Pydantic** - Validação de dados
- **Motor** - Driver assíncrono para MongoDB

### Automação
- **Node.js** - Runtime JavaScript
- **Baileys** - Biblioteca WhatsApp Web
- **WebSocket** - Comunicação em tempo real

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Python 3.9+
- MongoDB 7.0+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/club-regua-maxima.git
cd club-regua-maxima

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie todos os serviços
./iniciar.bat  # Windows
# ou
./iniciar.sh   # Linux/Mac
```

### Acesso
- **Frontend:** http://localhost:3000
- **API:** http://localhost:8000
- **Admin:** http://localhost:3000/admin

## 📱 Screenshots

### Interface Principal
![Hero Section](screenshots/hero.png)

### Agendamento
![Booking Form](screenshots/booking.png)

### Painel Admin
![Admin Dashboard](screenshots/admin.png)

## 🏗️ Arquitetura

```
├── frontend/          # React.js application
├── backend/           # FastAPI application  
├── whatsapp-bot/      # Node.js WhatsApp integration
├── scripts/           # Automation scripts
└── docs/              # Documentation
```

## 🎯 Funcionalidades Detalhadas

### Para Clientes
- [x] Visualização de serviços disponíveis
- [x] Seleção de data e horário
- [x] Preenchimento de dados pessoais
- [x] Confirmação via WhatsApp
- [x] Cancelamento de agendamentos

### Para Administradores
- [x] Dashboard com métricas
- [x] Calendário de agendamentos
- [x] Gestão de clientes
- [x] Configuração de serviços
- [x] Relatórios e estatísticas

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**[Seu Nome]**
- LinkedIn: [seu-linkedin]
- GitHub: [seu-github]
- Email: [seu-email]

---

⭐ Se este projeto te ajudou, considere dar uma estrela!