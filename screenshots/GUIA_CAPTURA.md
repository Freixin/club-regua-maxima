# 📸 Guia para Capturar Screenshots

## 🎯 Screenshots Necessários (baseado no projeto atual):

### 1. 🏠 Página Inicial (home-page.png)
- **URL**: http://localhost:3000
- **Mostra**: Hero section com "Club Régua Máxima", botão "Agendar Agora"
- **Resolução**: 1200x800 pixels
- **Foco**: Interface completa com header, hero e informações

### 2. 📅 Sistema de Agendamento (agendamento.png)  
- **URL**: http://localhost:3000/agendamento
- **Mostra**: Fluxo "Faça seu Agendamento" com:
  - Seleção de serviços (Corte, Barba, Combo, etc.)
  - Preços (R$ 25, R$ 20, R$ 40, etc.)
  - Etapas: Escolha o Serviço → Data e Horário → Seus Dados → Confirmação
- **Resolução**: 1200x800 pixels

### 3. 👨‍💼 Painel Admin (admin-dashboard.png)
- **URL**: http://localhost:3000/admin
- **Mostra**: Dashboard com:
  - Estatísticas (8 agendamentos hoje, 156 clientes, R$ 4500 faturamento)
  - Ações rápidas (Novo Agendamento, Ver Mensagens, etc.)
  - Menu lateral (Dashboard, Agendamentos, Calendário, Mensagens, Clientes)
- **Resolução**: 1200x800 pixels

### 4. 📱 Status WhatsApp (whatsapp-status.png)
- **Mostra**: Indicador no canto da tela
- **Estados**: "✅ Serviço WhatsApp conectado" ou "❌ Serviço WhatsApp desconectado"
- **Resolução**: 400x300 pixels (crop da área do status)

## 🚀 Como Capturar:

### Método 1: Manual
1. **Abra o projeto**: `npm start` na pasta frontend
2. **Acesse cada URL** no navegador
3. **Use F12** → Device Toolbar → Desktop 1200x800
4. **Print Screen** de cada tela
5. **Cole no Paint/editor** e salve como PNG

### Método 2: DevTools Screenshots
1. **F12** → Console
2. **Digite**: `document.body.style.zoom = '0.8'` (ajustar tamanho)
3. **F12** → ⋯ → Capture screenshot

### Método 3: Extensão do Browser
- **Instale**: "Full Page Screen Capture" ou similar
- **Capture** cada página automaticamente

## 📱 Screenshots Mobile:

### Para versão mobile (mobile/):
1. **F12** → Device Toolbar
2. **Selecione**: iPhone 12 ou Galaxy S20
3. **Capture as mesmas telas**:
   - home-mobile.png
   - agendamento-mobile.png

## 💾 Salvando as Imagens:

```bash
# Estrutura esperada:
screenshots/
├── home-page.png           # Página inicial desktop
├── agendamento.png         # Sistema de agendamento
├── admin-dashboard.png     # Painel administrativo  
├── whatsapp-status.png     # Status do WhatsApp
└── mobile/
    ├── home-mobile.png     # Página inicial mobile
    └── agendamento-mobile.png  # Agendamento mobile
```

## ✅ Checklist:

- [ ] Frontend rodando (npm start)
- [ ] Backend rodando (para dados reais)
- [ ] WhatsApp bot ativo (para status real)
- [ ] Screenshots desktop capturadas
- [ ] Screenshots mobile capturadas
- [ ] Imagens salvas com nomes corretos
- [ ] Commit feito (git add screenshots/ && git commit)

## 🎨 Dicas de Qualidade:

- **Resolução consistente**: 1200x800 para desktop
- **Formato PNG**: Melhor qualidade para interfaces
- **Dados reais**: Use dados de exemplo interessantes
- **Estado completo**: Certifique-se que tudo está carregado
- **Clean**: Feche abas desnecessárias do navegador
