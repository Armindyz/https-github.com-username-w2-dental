$ErrorActionPreference = "Stop"

$ProjectDir = Split-Path -Parent $PSScriptRoot
$Url = "http://localhost:3000/"
$ExpectedText = "W2 Dental"

function Test-W2DentalReady {
    try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
        return ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500 -and $response.Content.Contains($ExpectedText))
    }
    catch {
        return $false
    }
}

Set-Location $ProjectDir

if (Test-W2DentalReady) {
    Start-Process $Url
    exit 0
}

if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js / npm was not found. Please install Node.js, then run this launcher again."
    Read-Host "Press Enter to close"
    exit 1
}

$serverCommand = "title W2 Dental Dev Server && cd /d `"$ProjectDir`" && npm.cmd run dev"
Start-Process -FilePath "cmd.exe" -ArgumentList @("/k", $serverCommand) -WorkingDirectory $ProjectDir

Write-Host "Starting W2 Dental on $Url ..."
for ($i = 0; $i -lt 45; $i++) {
    Start-Sleep -Seconds 1
    if (Test-W2DentalReady) {
        Start-Process $Url
        exit 0
    }
}

Write-Host "The server window opened, but the site did not answer within 45 seconds."
Write-Host "Keep the server window open and check it for any error message."
Start-Process $Url
Read-Host "Press Enter to close"
