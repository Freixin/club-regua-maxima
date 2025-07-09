@echo off
echo 🚀 Preparando projeto para deploy...
echo.

echo 📦 Etapa 1: Testando build do frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro no build do frontend
    pause
    exit /b 1
)
echo ✅ Build do frontend OK
cd ..

echo.
echo 🐍 Etapa 2: Verificando backend...
cd backend
python -c "import fastapi; print('✅ FastAPI OK')"
if %errorlevel% neq 0 (
    echo ❌ Erro no backend - instale as dependências
    pause
    exit /b 1
)
cd ..

echo.
echo 📋 Etapa 3: Criando checklist de deploy...
echo.
echo ✅ Arquivos de deploy criados:
echo    - vercel.json (configuração Vercel)
echo    - DEPLOY.md (guia completo)
echo    - frontend/.env.production (variáveis de produção)
echo.
echo 🔄 Próximos passos:
echo 1. Commit e push das alterações
echo 2. Criar conta MongoDB Atlas (gratuita)
echo 3. Criar conta Vercel (gratuita)  
echo 4. Importar projeto do GitHub na Vercel
echo 5. Configurar variáveis de ambiente
echo 6. Deploy automático!
echo.
echo 🌐 Depois do deploy, você terá:
echo    Frontend: https://seu-projeto.vercel.app
echo    API: https://seu-projeto.vercel.app/api
echo    Admin: https://seu-projeto.vercel.app/admin
echo.

pause
