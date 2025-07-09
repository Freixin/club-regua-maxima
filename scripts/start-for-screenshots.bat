@echo off
echo 📸 Preparando ambiente para captura de screenshots...
echo.

echo 🚀 Etapa 1: Iniciando serviços...
echo.

echo 📱 Iniciando WhatsApp Bot...
start "WhatsApp Bot" cmd /c "cd whatsapp-bot && node index.js"
timeout /t 3

echo 🐍 Iniciando Backend...
start "Backend" cmd /c "cd backend && python server.py"
timeout /t 3

echo ⚛️ Iniciando Frontend...
start "Frontend" cmd /c "cd frontend && npm start"
timeout /t 5

echo.
echo ✅ Serviços iniciados!
echo.
echo 📋 URLs para capturar screenshots:
echo.
echo 🏠 Página Inicial:     http://localhost:3000
echo 📅 Agendamento:        http://localhost:3000/agendamento  
echo 👨‍💼 Admin Dashboard:    http://localhost:3000/admin
echo 📊 Status WhatsApp:    Observe o canto inferior direito
echo.
echo 💡 Dicas:
echo 1. Aguarde 30 segundos para tudo carregar
echo 2. Use F12 para ajustar o tamanho (1200x800)
echo 3. Salve as imagens na pasta screenshots/
echo 4. Use os nomes: home-page.png, agendamento.png, admin-dashboard.png
echo.
echo 📱 Para versão mobile:
echo 1. F12 > Device Toolbar > iPhone 12
echo 2. Salve na pasta screenshots/mobile/
echo.

pause
