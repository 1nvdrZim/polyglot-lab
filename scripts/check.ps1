# Run every lesson in every language and confirm that all five
# implementations of a lesson print exactly the same output.
#   .\scripts\check.ps1
$root = Split-Path $PSScriptRoot -Parent
$langs = 'python', 'java', 'csharp', 'c', 'cpp'
$lessons = Get-ChildItem (Join-Path $root 'languages\python') -Directory | ForEach-Object Name
$failed = 0

foreach ($lesson in $lessons) {
    $expected = $null
    foreach ($lang in $langs) {
        $output = (& (Join-Path $PSScriptRoot 'run.ps1') $lang $lesson | Out-String) -replace "`r", ''
        if ($null -eq $expected) { $expected = $output }

        if ($LASTEXITCODE -ne 0) {
            Write-Host "FAIL  $lesson  $lang  (exit code $LASTEXITCODE)" -ForegroundColor Red
            $failed++
        } elseif ($output -ne $expected) {
            Write-Host "DIFF  $lesson  $lang  (output differs from $($langs[0]))" -ForegroundColor Red
            $failed++
        } else {
            Write-Host "ok    $lesson  $lang" -ForegroundColor Green
        }
    }
}

if ($failed -gt 0) {
    Write-Host "$failed problem(s)" -ForegroundColor Red
    exit 1
}
Write-Host 'All lessons match across all languages.' -ForegroundColor Green
