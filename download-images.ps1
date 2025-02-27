$ErrorActionPreference = "Stop"

# Function to download and save image
function Download-Image {
    param (
        [string]$Url,
        [string]$FilePath
    )
    
    Write-Host "Downloading $FilePath..."
    try {
        Invoke-WebRequest -Uri $Url -OutFile $FilePath
        Write-Host "Successfully downloaded $FilePath"
    }
    catch {
        Write-Host "Failed to download $FilePath"
        Write-Host $_.Exception.Message
    }
}

# Create directories if they don't exist
$directories = @(
    "public\images\avatars",
    "public\images\services",
    "public\images\process",
    "public\images\about",
    "public\images\portfolio",
    "public\images\blog"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
    }
}

# Hero Section
Download-Image -Url "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Marketing/SVG/ic_fluent_marketing_48_regular.svg" -FilePath "public\images\hero-illustration.png"

# Avatars
Download-Image -Url "https://randomuser.me/api/portraits/men/1.jpg" -FilePath "public\images\avatars\avatar1.jpg"
Download-Image -Url "https://randomuser.me/api/portraits/women/1.jpg" -FilePath "public\images\avatars\avatar2.jpg"
Download-Image -Url "https://randomuser.me/api/portraits/men/2.jpg" -FilePath "public\images\avatars\avatar3.jpg"
Download-Image -Url "https://randomuser.me/api/portraits/women/2.jpg" -FilePath "public\images\avatars\avatar4.jpg"

# Services
$serviceUrls = @{
    "digital-strategy.png" = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Strategy/SVG/ic_fluent_brain_circuit_48_regular.svg"
    "seo.png" = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Search/SVG/ic_fluent_search_info_48_regular.svg"
    "social-media.png" = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Share/SVG/ic_fluent_share_48_regular.svg"
    "content-marketing.png" = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Document/SVG/ic_fluent_document_48_regular.svg"
    "ppc.png" = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Click/SVG/ic_fluent_click_48_regular.svg"
    "email-marketing.png" = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Mail/SVG/ic_fluent_mail_48_regular.svg"
}

foreach ($service in $serviceUrls.GetEnumerator()) {
    Download-Image -Url $service.Value -FilePath "public\images\services\$($service.Key)"
}

# Process
$processUrls = @{
    "discovery.png" = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Search/SVG/ic_fluent_search_48_regular.svg"
    "planning.png" = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Clipboard/SVG/ic_fluent_clipboard_task_48_regular.svg"
    "execution.png" = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Rocket/SVG/ic_fluent_rocket_48_regular.svg"
    "analysis.png" = "https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Data/SVG/ic_fluent_data_trending_48_regular.svg"
}

foreach ($process in $processUrls.GetEnumerator()) {
    Download-Image -Url $process.Value -FilePath "public\images\process\$($process.Key)"
}

# About
$aboutUrls = @{
    "team.jpg" = "https://source.unsplash.com/800x600/?business-team"
    "office.jpg" = "https://source.unsplash.com/800x600/?modern-office"
}

foreach ($about in $aboutUrls.GetEnumerator()) {
    Download-Image -Url $about.Value -FilePath "public\images\about\$($about.Key)"
}

# Portfolio
for ($i = 1; $i -le 4; $i++) {
    Download-Image -Url "https://source.unsplash.com/600x400/?digital-marketing" -FilePath "public\images\portfolio\project$i.jpg"
}

# Blog
for ($i = 1; $i -le 3; $i++) {
    Download-Image -Url "https://source.unsplash.com/800x400/?marketing-strategy" -FilePath "public\images\blog\post$i.jpg"
}

Write-Host "Image download complete!"
