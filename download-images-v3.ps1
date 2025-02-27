# Create directories
New-Item -ItemType Directory -Force -Path @(
    "public\images",
    "public\images\avatars",
    "public\images\services",
    "public\images\process",
    "public\images\about",
    "public\images\portfolio",
    "public\images\blog"
)

# Download placeholder images from picsum.photos (a reliable placeholder image service)
$downloads = @{
    "public\images\hero-illustration.png" = "https://picsum.photos/800/600"
    
    # Avatars
    "public\images\avatars\avatar1.jpg" = "https://picsum.photos/200/200"
    "public\images\avatars\avatar2.jpg" = "https://picsum.photos/201/201"
    "public\images\avatars\avatar3.jpg" = "https://picsum.photos/202/202"
    "public\images\avatars\avatar4.jpg" = "https://picsum.photos/203/203"
    
    # Services
    "public\images\services\digital-strategy.png" = "https://picsum.photos/400/400"
    "public\images\services\seo.png" = "https://picsum.photos/401/401"
    "public\images\services\social-media.png" = "https://picsum.photos/402/402"
    "public\images\services\content-marketing.png" = "https://picsum.photos/403/403"
    "public\images\services\ppc.png" = "https://picsum.photos/404/404"
    "public\images\services\email-marketing.png" = "https://picsum.photos/405/405"
    
    # Process
    "public\images\process\discovery.png" = "https://picsum.photos/300/300"
    "public\images\process\planning.png" = "https://picsum.photos/301/301"
    "public\images\process\execution.png" = "https://picsum.photos/302/302"
    "public\images\process\analysis.png" = "https://picsum.photos/303/303"
    
    # About
    "public\images\about\team.jpg" = "https://picsum.photos/800/600"
    "public\images\about\office.jpg" = "https://picsum.photos/801/601"
    
    # Portfolio
    "public\images\portfolio\project1.jpg" = "https://picsum.photos/600/400"
    "public\images\portfolio\project2.jpg" = "https://picsum.photos/601/401"
    "public\images\portfolio\project3.jpg" = "https://picsum.photos/602/402"
    "public\images\portfolio\project4.jpg" = "https://picsum.photos/603/403"
    
    # Blog
    "public\images\blog\post1.jpg" = "https://picsum.photos/800/400"
    "public\images\blog\post2.jpg" = "https://picsum.photos/801/401"
    "public\images\blog\post3.jpg" = "https://picsum.photos/802/402"
}

foreach ($item in $downloads.GetEnumerator()) {
    Write-Host "Downloading $($item.Key)..."
    try {
        Invoke-WebRequest -Uri $item.Value -OutFile $item.Key
        Write-Host "Successfully downloaded $($item.Key)"
        # Add a small delay to prevent rate limiting
        Start-Sleep -Milliseconds 200
    }
    catch {
        Write-Host "Failed to download $($item.Key)"
        Write-Host $_.Exception.Message
    }
}
