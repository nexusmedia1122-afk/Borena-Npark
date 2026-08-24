<#
Checks for required tools (node, npm, docker) and prints install instructions for Windows.
Run: .\scripts\check-env.ps1
#>
function Check-Command($cmd, $name){
    $found = Get-Command $cmd -ErrorAction SilentlyContinue
    if($null -eq $found){
        Write-Host "[MISSING] $name ($cmd)" -ForegroundColor Yellow
        return $false
    } else {
        $ver = & $cmd --version 2>$null
        Write-Host "[OK] $name : $ver" -ForegroundColor Green
        return $true
    }
}

Write-Host "Checking environment for Borena site..." -ForegroundColor Cyan

$node = Check-Command node "Node.js"
$npm = Check-Command npm "npm"
$docker = Check-Command docker "Docker"

if($node -and $npm -and $docker){
    Write-Host "All required tools are installed. You can run npm install or Docker commands." -ForegroundColor Green
    exit 0
}

Write-Host "\nHow to install on Windows:" -ForegroundColor Cyan
if(-not $node -or -not $npm){
    Write-Host "- Node.js (includes npm):" -ForegroundColor White
    Write-Host "  * Recommended: install LTS via winget:" -ForegroundColor Gray
    Write-Host "    winget install --id OpenJS.NodeJS.LTS -e" -ForegroundColor Yellow
    Write-Host "  * Or download installer: https://nodejs.org/en/download/" -ForegroundColor Yellow
}
if(-not $docker){
    Write-Host "- Docker Desktop:" -ForegroundColor White
    Write-Host "  * Install via winget:" -ForegroundColor Gray
    Write-Host "    winget install --id Docker.DockerDesktop -e" -ForegroundColor Yellow
    Write-Host "  * Or download: https://www.docker.com/get-started" -ForegroundColor Yellow
}

Write-Host "\nAfter installing, restart your terminal or PowerShell and re-run this script." -ForegroundColor Cyan
exit 1
