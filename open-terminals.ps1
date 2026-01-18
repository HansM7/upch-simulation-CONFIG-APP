# Ruta donde está este script (config-app)
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Subir un nivel (workspace)
$workspacePath = Resolve-Path "$scriptPath\.."

Get-ChildItem -Path $workspacePath -Directory | ForEach-Object {
    # Ignorar la carpeta config-app
    if ($_.Name -eq "upch-simulation-CONFIG-APP") {
        return
    }

    if (Test-Path "$($_.FullName)\.git") {
        Write-Host "Abriendo terminal: $($_.Name)" -ForegroundColor Cyan
        
        # Abre una nueva ventana PowerShell en el directorio del proyecto y ejecuta npm run start:dev
        Start-Process powershell.exe -ArgumentList "-NoExit -Command `"cd '$($_.FullName)'; npm run start:dev`""
        
        # Pequeña pausa para evitar saturar el sistema
        Start-Sleep -Milliseconds 300
    }
}

Write-Host "`nTerminales abiertas para todos los proyectos." -ForegroundColor Green
