# Run one lesson in one language.
#   .\scripts\run.ps1 java 01
#   .\scripts\run.ps1 cpp 03-collections
param(
    [Parameter(Mandatory, Position = 0)]
    [ValidateSet('javascript', 'python', 'java', 'csharp', 'c', 'cpp')]
    [string]$Lang,

    [Parameter(Mandatory, Position = 1)]
    [string]$Lesson
)

$root = Split-Path $PSScriptRoot -Parent
$dir = Get-ChildItem (Join-Path $root "languages\$Lang") -Directory |
    Where-Object { $_.Name -like "$Lesson*" } |
    Select-Object -First 1

if (-not $dir) {
    Write-Host "No lesson matching '$Lesson' in languages\$Lang" -ForegroundColor Red
    exit 1
}

# C and C++ need a compile step; the executables go in build\ (git-ignored).
$build = Join-Path $root 'build'
New-Item -ItemType Directory -Force $build | Out-Null
$exe = Join-Path $build "$Lang-$($dir.Name).exe"

switch ($Lang) {
    'javascript' { node (Join-Path $dir.FullName 'main.js') }
    'java'   { java (Join-Path $dir.FullName 'Main.java') }
    'csharp' { dotnet run (Join-Path $dir.FullName 'Program.cs') }
    'python' { py (Join-Path $dir.FullName 'main.py') }
    'c' {
        gcc -std=c17 -Wall -Wextra -o $exe (Join-Path $dir.FullName 'main.c')
        if ($LASTEXITCODE -eq 0) { & $exe }
    }
    'cpp' {
        # -lstdc++exp: MinGW keeps std::print's console support in a separate library.
        g++ -std=c++23 -Wall -Wextra -o $exe (Join-Path $dir.FullName 'main.cpp') '-lstdc++exp'
        if ($LASTEXITCODE -eq 0) { & $exe }
    }
}
exit $LASTEXITCODE
