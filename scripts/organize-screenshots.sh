#!/bin/bash

# Script para organizar e otimizar screenshots do projeto
# Execute este script após adicionar novas imagens

echo "📸 Organizando screenshots do projeto..."

# Criar estrutura de pastas se não existir
mkdir -p screenshots/mobile
mkdir -p screenshots/admin
mkdir -p screenshots/features

# Função para otimizar imagens (requer ImageMagick)
optimize_image() {
    if command -v magick &> /dev/null; then
        echo "🖼️  Otimizando $1..."
        magick "$1" -quality 85 -resize '1200x800>' "$1"
    else
        echo "⚠️  ImageMagick não encontrado. Instale para otimização automática."
    fi
}

# Verificar se existem imagens para otimizar
if ls screenshots/*.png &> /dev/null || ls screenshots/*.jpg &> /dev/null; then
    for img in screenshots/*.{png,jpg}; do
        [ -f "$img" ] && optimize_image "$img"
    done
fi

echo "✅ Screenshots organizados!"
echo ""
echo "📋 Próximos passos:"
echo "1. Adicione suas capturas de tela na pasta screenshots/"
echo "2. Use nomes descritivos como: home-page.png, agendamento.png, etc."
echo "3. Execute 'git add screenshots/' para versionar as imagens"
echo "4. Faça commit das alterações"
echo ""
echo "📁 Estrutura recomendada:"
echo "screenshots/"
echo "├── home-page.png"
echo "├── agendamento.png" 
echo "├── admin-dashboard.png"
echo "├── whatsapp-status.png"
echo "└── mobile/"
echo "    ├── home-mobile.png"
echo "    └── agendamento-mobile.png"
