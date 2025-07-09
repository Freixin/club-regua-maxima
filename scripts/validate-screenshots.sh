#!/bin/bash

# Script para validar e commitar screenshots
echo "📸 Validando screenshots capturados..."

# Verificar se as imagens existem
screenshots_required=(
    "screenshots/home-page.png"
    "screenshots/agendamento.png" 
    "screenshots/admin-dashboard.png"
    "screenshots/whatsapp-status.png"
)

mobile_screenshots=(
    "screenshots/mobile/home-mobile.png"
    "screenshots/mobile/agendamento-mobile.png"
)

echo "🔍 Verificando screenshots obrigatórios..."
missing=0

for screenshot in "${screenshots_required[@]}"; do
    if [ -f "$screenshot" ]; then
        echo "✅ $screenshot - OK"
    else
        echo "❌ $screenshot - FALTANDO"
        missing=1
    fi
done

echo ""
echo "📱 Verificando screenshots mobile..."

for screenshot in "${mobile_screenshots[@]}"; do
    if [ -f "$screenshot" ]; then
        echo "✅ $screenshot - OK"
    else
        echo "⚠️  $screenshot - OPCIONAL (mas recomendado)"
    fi
done

echo ""

if [ $missing -eq 0 ]; then
    echo "🎉 Todos os screenshots obrigatórios estão presentes!"
    echo ""
    echo "📋 Próximos passos:"
    echo "1. git add screenshots/"
    echo "2. git commit -m \"docs: Adicionar screenshots do projeto\""
    echo "3. git push origin main"
    echo ""
    
    read -p "Deseja commitar automaticamente? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📦 Adicionando screenshots ao Git..."
        git add screenshots/
        git commit -m "docs: Adicionar screenshots reais do projeto

- Screenshots da página inicial
- Interface de agendamento  
- Painel administrativo
- Status do WhatsApp
- Versões mobile (se disponíveis)"
        
        echo "🚀 Enviando para GitHub..."
        git push origin main
        
        echo "✅ Screenshots commitados com sucesso!"
    fi
else
    echo "❌ Alguns screenshots obrigatórios estão faltando."
    echo "Por favor, capture as imagens necessárias antes de continuar."
fi
