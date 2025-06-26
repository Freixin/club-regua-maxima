@echo off
echo Verificando saude dos servicos...

echo.
echo === Verificando MongoDB (porta 27017) ===
netstat -ano | findstr ":27017" > nul
if %errorlevel% neq 0 (
    echo [X] MongoDB nao esta rodando
) else (
    echo [V] MongoDB esta rodando
)

echo.
echo === Verificando Backend (porta 8000) ===
curl -s http://localhost:8000/health > nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Backend nao esta rodando
) else (
    echo [V] Backend esta rodando
    echo     Detalhes: http://localhost:8000/health
)

echo.
echo === Verificando WhatsApp Bot (porta 3001) ===
curl -s http://localhost:3001/status > nul 2>&1
if %errorlevel% neq 0 (
    echo [X] WhatsApp Bot nao esta rodando
) else (
    echo [V] WhatsApp Bot esta rodando
    echo     Detalhes: http://localhost:3001/status
)

echo.
echo === Verificando Frontend (porta 3000) ===
curl -s http://localhost:3000 > nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Frontend nao esta rodando
) else (
    echo [V] Frontend esta rodando
)

echo.
echo Para iniciar todos os servicos, execute:
echo iniciar.bat

pause