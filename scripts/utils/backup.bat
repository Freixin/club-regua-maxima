@echo off
echo Criando backup do projeto...

set BACKUP_DIR=%USERPROFILE%\Documents\Backups\ClubReguaMaxima
set BACKUP_FILE=backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%_%time:~0,2%%time:~3,2%.zip

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo Criando arquivo de backup em %BACKUP_DIR%\%BACKUP_FILE%...

powershell -Command "Compress-Archive -Path '%CD%\*' -DestinationPath '%BACKUP_DIR%\%BACKUP_FILE%' -Force"

if %errorlevel% equ 0 (
    echo Backup criado com sucesso em:
    echo %BACKUP_DIR%\%BACKUP_FILE%
) else (
    echo Erro ao criar backup.
)

pause