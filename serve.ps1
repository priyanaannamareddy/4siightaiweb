$port = 8000
$root = Get-Location
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
    Write-Output "Serving $($root) on $prefix"
} catch {
    $err = $_.Exception | Out-String
    $err | Out-File -FilePath (Join-Path $root "serve_error.log") -Encoding utf8
    Write-Output "Failed to start listener. See serve_error.log"
    exit 1
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    Start-Job -ArgumentList $context, $root -ScriptBlock {
        param($ctx, $rootPath)
        try {
            $req = $ctx.Request
            $resp = $ctx.Response
            $urlPath = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath.TrimStart('/'))
            if ([string]::IsNullOrEmpty($urlPath)) { $urlPath = 'index.html' }
            $filePath = Join-Path $rootPath $urlPath

            if (-not (Test-Path $filePath)) {
                $resp.StatusCode = 404
                $body = "404 Not Found"
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
                $resp.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                switch -regex ($filePath) {
                    '\.css$' { $resp.ContentType = 'text/css'; break }
                    '\.js$' { $resp.ContentType = 'application/javascript'; break }
                    '\.html?$' { $resp.ContentType = 'text/html'; break }
                    '\.png$' { $resp.ContentType = 'image/png'; break }
                    '\.jpe?g$' { $resp.ContentType = 'image/jpeg'; break }
                    '\.svg$' { $resp.ContentType = 'image/svg+xml'; break }
                    default { $resp.ContentType = 'application/octet-stream'; break }
                }
                $resp.ContentLength64 = $bytes.Length
                $resp.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } catch {
            # ignore per-request errors
        } finally {
            $ctx.Response.OutputStream.Close()
        }
    } | Out-Null
}

$listener.Stop()
$listener.Close()
