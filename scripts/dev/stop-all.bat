@echo off
echo Parando todos os servicos...

:: Parar processos nas portas específicas
echo Parando WhatsApp Bot (porta 3001)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001"') do (
    taskkill /F /PID %%a 2>nul
)

echo Parando Backend (porta 8000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8000"') do (
    taskkill /F /PID %%a 2>nul
)

echo Parando Frontend (porta 3000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000"') do (
    taskkill /F /PID %%a 2>nul
)

echo Todos os servicos foram parados!