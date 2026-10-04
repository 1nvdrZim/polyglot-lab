# Run the tests for one practice problem.
#   .\scripts\practice.ps1 001
param(
    [Parameter(Mandatory, Position = 0)]
    [string]$Problem
)

$root = Split-Path $PSScriptRoot -Parent
$dir = Get-ChildItem (Join-Path $root 'practice') -Directory |
    Where-Object { $_.Name -like "$Problem*" } |
    Select-Object -First 1

if (-not $dir) {
    Write-Host "No practice problem matching '$Problem'" -ForegroundColor Red
    exit 1
}

node (Join-Path $dir.FullName 'javascript\solution.test.js')
exit $LASTEXITCODE
