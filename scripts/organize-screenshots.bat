@echo off
REM Script para organizar screenshots do projeto Club Régua Máxima

echo 📸 Organizando screenshots do projeto...

REM Criar estrutura de pastas se não existir
if not exist "screenshots\mobile" mkdir screenshots\mobile
if not exist "screenshots\admin" mkdir screenshots\admin  
if not exist "screenshots\features" mkdir screenshots\features

echo ✅ Estrutura de pastas criada!
echo.
echo 📋 Próximos passos:
echo 1. Adicione suas capturas de tela na pasta screenshots/
echo 2. Use nomes descritivos como: home-page.png, agendamento.png, etc.
echo 3. Execute 'git add screenshots/' para versionar as imagens
echo 4. Faça commit das alterações
echo.
echo 📁 Estrutura recomendada:
echo screenshots/
echo ├── home-page.png
echo ├── agendamento.png
echo ├── admin-dashboard.png
echo ├── whatsapp-status.png
echo └── mobile/
echo     ├── home-mobile.png
echo     └── agendamento-mobile.png
echo.

pause
