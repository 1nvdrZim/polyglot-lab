# Serve the site at http://localhost:8000 (Ctrl+C to stop).
# The site loads lesson source files with fetch(), which browsers block on
# file:// pages, so it has to come from a web server.
param([int]$Port = 8000)

$root = Split-Path $PSScriptRoot -Parent
Write-Host "Serving $root at http://localhost:$Port"
py -m http.server $Port --directory $root
