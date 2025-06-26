@echo off
echo Verificando se o MongoDB esta instalado...

where mongod > nul 2>&1
if %errorlevel% neq 0 (
    echo MongoDB nao esta instalado!
    echo.
    echo Por favor, instale o MongoDB Community Edition:
    echo 1. Acesse https://www.mongodb.com/try/download/community
    echo 2. Baixe e instale a versao para Windows
    echo 3. Adicione C:\Program Files\MongoDB\Server\X.X\bin ao PATH
    echo 4. Crie o diretorio C:\data\db
    echo.
    echo Apos a instalacao, execute este script novamente.
    pause
    exit /b 1
)

echo MongoDB esta instalado!
echo.
echo Verificando se o MongoDB esta rodando...

netstat -ano | findstr ":27017" > nul
if %errorlevel% neq 0 (
    echo MongoDB nao esta rodando!
    echo Criando diretorio de dados...
    
    if not exist "C:\data\db" (
        mkdir "C:\data\db"
    )
    
    echo Iniciando MongoDB...
    start "MongoDB" cmd /k "mongod --dbpath=C:\data\db"
    echo MongoDB iniciado em uma nova janela.
) else (
    echo MongoDB ja esta rodando na porta 27017.
)

echo.
echo Agora voce pode inicializar o banco de dados:
echo cd backend
echo init-db.bat
pause