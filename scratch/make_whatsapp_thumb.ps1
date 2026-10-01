Add-Type -AssemblyName System.Drawing

$srcPath = "g:\N@EEM\ClientWork\LIBAS Shop\public\images\og-share-banner.jpg"
$squarePath = "g:\N@EEM\ClientWork\LIBAS Shop\public\images\whatsapp-thumb.jpg"

$img = [System.Drawing.Image]::FromFile($srcPath)

# Crop / Fit to 600x600 square bitmap
$size = 600
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# Center crop/fit src image into 600x600 square
$aspectSrc = $img.Width / $img.Height
if ($aspectSrc -gt 1) {
    # Source is wider than square
    $srcWidth = [int]($img.Height)
    $srcHeight = $img.Height
    $srcX = [int](($img.Width - $srcWidth) / 2)
    $srcY = 0
} else {
    $srcWidth = $img.Width
    $srcHeight = [int]($img.Width)
    $srcX = 0
    $srcY = [int](($img.Height - $srcHeight) / 2)
}

$srcRect = New-Object System.Drawing.Rectangle($srcX, $srcY, $srcWidth, $srcHeight)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)

$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

# Save as JPEG with high quality encoder
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
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, 80)

$bmp.Save($squarePath, $jpegCodec, $encoderParams)

$g.Dispose()
$bmp.Dispose()
$img.Dispose()

$squareSize = (Get-Item $squarePath).Length
Write-Host "Created 600x600 WhatsApp square thumbnail size:" $squareSize "bytes"
