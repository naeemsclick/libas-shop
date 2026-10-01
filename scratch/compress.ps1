Add-Type -AssemblyName System.Drawing
$srcPath = "g:\N@EEM\ClientWork\LIBAS Shop\public\images\og-share-banner.jpg"
$destPath = "g:\N@EEM\ClientWork\LIBAS Shop\public\images\og-share-banner-compressed.jpg"

$img = [System.Drawing.Image]::FromFile($srcPath)

# Create a scaled down bitmap if needed (e.g. max width 1200)
$newWidth = 1200
$newHeight = [int]($img.Height * ($newWidth / $img.Width))

$bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $newWidth, $newHeight)

$codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
$jpegCodec = $null
foreach ($c in $codecs) {
    if ($c.MimeType -eq "image/jpeg") {
        $jpegCodec = $c
        break
    }
}

$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, 70)

$bmp.Save($destPath, $jpegCodec, $encoderParams)

$g.Dispose()
$bmp.Dispose()
$img.Dispose()

Remove-Item $srcPath
Move-Item $destPath $srcPath

$newSize = (Get-Item $srcPath).Length
Write-Host "New compressed file size:" $newSize "bytes"
