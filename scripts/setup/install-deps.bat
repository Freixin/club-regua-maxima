@echo off
echo Instalando todas as dependencias necessarias...

cd frontend

echo.
echo === Instalando dependencias do frontend ===
call npm install @radix-ui/react-dialog @radix-ui/react-select clsx tailwind-merge react-big-calendar moment

echo.
echo Todas as dependencias foram instaladas com sucesso!
echo Para iniciar o sistema com as dependencias, execute:
echo auto-start.bat
pause