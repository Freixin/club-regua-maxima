@echo off
echo Configurando inicializacao automatica dos servicos...

:: Definir o diretorio do projeto
set PROJECT_DIR=C:\Users\IPRV AMD\Documents\Estudos\Projetos\Site

:: Criar arquivo de inicialização na pasta Startup
echo @echo off > "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\IniciarClubReguaMaxima.bat"
echo cd /d %PROJECT_DIR% >> "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\IniciarClubReguaMaxima.bat"
echo call auto-start.bat >> "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\IniciarClubReguaMaxima.bat"

echo Arquivo de inicialização criado na pasta Startup

echo.
echo Configuracao concluida! Os servicos serao iniciados automaticamente:
echo 1. Quando voce fizer login no Windows
echo 2. Diariamente as 8:00 da manha
echo.
echo Para iniciar os servicos manualmente, execute auto-start.bat
pause