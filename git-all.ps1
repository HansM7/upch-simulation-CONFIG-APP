param (
    [string]$CommitMessage = "feat: valid changes"
)

# Ruta donde está este script (config-app)
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Subir un nivel (workspace)
$workspacePath = Resolve-Path "$scriptPath\.."

Get-ChildItem -Path $workspacePath -Directory | ForEach-Object {
    # Ignorar la carpeta config-app
    if ($_.Name -eq "config-app") {
        return
    }

    if (Test-Path "$($_.FullName)\.git") {
        Write-Host "`nRepo: $($_.Name)" -ForegroundColor Cyan
        
        Push-Location $_.FullName
        
        $status = git status --porcelain
        if (-not $status) {
            Write-Host "Sin cambios" -ForegroundColor DarkGray
            Pop-Location
            return
        }

        git add .
        git commit -m $CommitMessage

        $branch = git branch --show-current
        git push origin $branch

        Pop-Location
    }
}
