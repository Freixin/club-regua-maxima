@echo off
echo Verificando status dos servicos...

:: Definir o diretorio do projeto
set PROJECT_DIR=C:\Users\IPRV AMD\Documents\Estudos\Projetos\Site
cd /d %PROJECT_DIR%

:: Verificar WhatsApp Bot (porta 3001)
echo Verificando WhatsApp Bot (porta 3001)...
netstat -ano | findstr ":3001" > nul
if %errorlevel% neq 0 (
    echo WhatsApp Bot nao esta rodando. Iniciando...
    start "WhatsApp Bot" cmd /k "cd whatsapp-bot && node index.js"
) else (
    echo WhatsApp Bot esta rodando.
)

:: Verificar Backend (porta 8000)
echo Verificando Backend (porta 8000)...
netstat -ano | findstr ":8000" > nul
if %errorlevel% neq 0 (
    echo Backend nao esta rodando. Iniciando...
    start "Backend Server" cmd /k "cd backend && uvicorn server:app --host 0.0.0.0 --port 8000"
) else (
    echo Backend esta rodando.
)

:: Verificar Frontend (porta 3000)
echo Verificando Frontend (porta 3000)...
netstat -ano | findstr ":3000" > nul
if %errorlevel% neq 0 (
    echo Frontend nao esta rodando. Iniciando...
    start "Frontend Server" cmd /k "cd frontend && npm start"
) else (
    echo Frontend esta rodando.
)

echo.
echo Verificacao concluida!
echo %date% %time% - Verificacao de servicos executada >> %PROJECT_DIR%\service_check_log.txt