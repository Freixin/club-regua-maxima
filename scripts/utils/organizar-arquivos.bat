@echo off
echo Organizando arquivos do projeto...

:: Mover scripts de utilidades
move check-deps.bat scripts\utils\ >nul 2>&1
move check-health.bat scripts\utils\ >nul 2>&1
move check-services.bat scripts\utils\ >nul 2>&1
move install-deps.bat scripts\utils\ >nul 2>&1
move install-mongodb.bat scripts\utils\ >nul 2>&1
move update-content.bat scripts\utils\ >nul 2>&1
move update-from-github.bat scripts\utils\ >nul 2>&1

:: Mover scripts de backup
move backup.bat scripts\backup\ >nul 2>&1

:: Mover scripts de inicialização
move iniciar.bat scripts\startup\ >nul 2>&1
move parar.bat scripts\startup\ >nul 2>&1
move stop-services.bat scripts\startup\ >nul 2>&1
move setup-autostart.bat scripts\startup\ >nul 2>&1
move create-shortcuts.bat scripts\startup\ >nul 2>&1
move criar-atalho-desktop.bat scripts\startup\ >nul 2>&1

:: Mover arquivos de documentação
move test_result.md docs\ >nul 2>&1
move hex.txt docs\ >nul 2>&1

:: Limpar arquivos desnecessários
del *.log >nul 2>&1

echo Arquivos organizados com sucesso!

:: Criar um novo script iniciar-tudo.bat que aponta para o script na pasta scripts\startup
echo @echo off > iniciar-tudo-novo.bat
echo cd scripts\startup >> iniciar-tudo-novo.bat
echo call iniciar.bat >> iniciar-tudo-novo.bat
move iniciar-tudo-novo.bat iniciar-tudo.bat >nul 2>&1

:: Atualizar o atalho no desktop
call scripts\startup\criar-atalho-desktop.bat

echo Organização concluída!