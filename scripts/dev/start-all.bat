@echo off
echo Iniciando todos os servicos do Club Regua Maxima...

echo 1. Verificando MongoDB...
netstat -ano | findstr ":27017" > nul
if %errorlevel% neq 0 (
    echo MongoDB nao esta rodando, iniciando...
    start "MongoDB" mongod --dbpath=C:\data\db
    timeout /t 5 /nobreak > nul
) else (
    echo MongoDB ja esta rodando.
)

echo 2. Iniciando backend...
start "Backend" cmd /k "cd /d C:\Users\IPRV AMD\Documents\Estudos\Projetos\Site\backend && uvicorn server:app --host 0.0.0.0 --port 8000"
timeout /t 3 /nobreak > nul

echo 3. Iniciando frontend...
start "Frontend" cmd /k "cd /d C:\Users\IPRV AMD\Documents\Estudos\Projetos\Site\frontend && npm start"

echo Todos os servicos foram iniciados!
echo.
echo Para acessar o painel de administracao: http://localhost:3000/admin
echo Para acessar o site principal: http://localhost:3000
echo.
start http://localhost:3000/admin
echo.