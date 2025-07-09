@echo off
setlocal EnableDelayedExpansion

echo 📸 Validando screenshots capturados...
echo.

set "missing=0"

echo 🔍 Verificando screenshots obrigatórios...

if exist "screenshots\home-page.png" (
    echo ✅ home-page.png - OK
) else (
    echo ❌ home-page.png - FALTANDO
    set "missing=1"
)

if exist "screenshots\agendamento.png" (
    echo ✅ agendamento.png - OK  
) else (
    echo ❌ agendamento.png - FALTANDO
    set "missing=1"
)

if exist "screenshots\admin-dashboard.png" (
    echo ✅ admin-dashboard.png - OK
) else (
    echo ❌ admin-dashboard.png - FALTANDO
    set "missing=1"
)

if exist "screenshots\whatsapp-status.png" (
    echo ✅ whatsapp-status.png - OK
) else (
    echo ❌ whatsapp-status.png - FALTANDO
    set "missing=1"
)

echo.
echo 📱 Verificando screenshots mobile...

if exist "screenshots\mobile\home-mobile.png" (
    echo ✅ home-mobile.png - OK
) else (
    echo ⚠️  home-mobile.png - OPCIONAL (mas recomendado)
)

if exist "screenshots\mobile\agendamento-mobile.png" (
    echo ✅ agendamento-mobile.png - OK
) else (
    echo ⚠️  agendamento-mobile.png - OPCIONAL (mas recomendado)
)

echo.

if !missing! == 0 (
    echo 🎉 Todos os screenshots obrigatórios estão presentes!
    echo.
    echo 📋 Próximos passos:
    echo 1. git add screenshots/
    echo 2. git commit -m "docs: Adicionar screenshots do projeto"
    echo 3. git push origin main
    echo.
    
    set /p commit="Deseja commitar automaticamente? (y/n): "
    if /i "!commit!" == "y" (
        echo 📦 Adicionando screenshots ao Git...
        git add screenshots/
        git commit -m "docs: Adicionar screenshots reais do projeto - Screenshots da página inicial - Interface de agendamento - Painel administrativo - Status do WhatsApp - Versões mobile (se disponíveis)"
        
        echo 🚀 Enviando para GitHub...
        git push origin main
        
        echo ✅ Screenshots commitados com sucesso!
    )
) else (
    echo ❌ Alguns screenshots obrigatórios estão faltando.
    echo Por favor, capture as imagens necessárias antes de continuar.
)

echo.
pause
