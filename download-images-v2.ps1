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

# Download placeholder images from placekitten.com (a reliable placeholder image service)
$downloads = @{
    "public\images\hero-illustration.png" = "https://placekitten.com/800/600"
    
    # Avatars
    "public\images\avatars\avatar1.jpg" = "https://placekitten.com/200/200"
    "public\images\avatars\avatar2.jpg" = "https://placekitten.com/201/201"
    "public\images\avatars\avatar3.jpg" = "https://placekitten.com/202/202"
    "public\images\avatars\avatar4.jpg" = "https://placekitten.com/203/203"
    
    # Services
    "public\images\services\digital-strategy.png" = "https://placekitten.com/400/400"
    "public\images\services\seo.png" = "https://placekitten.com/401/401"
    "public\images\services\social-media.png" = "https://placekitten.com/402/402"
    "public\images\services\content-marketing.png" = "https://placekitten.com/403/403"
    "public\images\services\ppc.png" = "https://placekitten.com/404/404"
    "public\images\services\email-marketing.png" = "https://placekitten.com/405/405"
    
    # Process
    "public\images\process\discovery.png" = "https://placekitten.com/300/300"
    "public\images\process\planning.png" = "https://placekitten.com/301/301"
    "public\images\process\execution.png" = "https://placekitten.com/302/302"
    "public\images\process\analysis.png" = "https://placekitten.com/303/303"
    
    # About
    "public\images\about\team.jpg" = "https://placekitten.com/800/600"
    "public\images\about\office.jpg" = "https://placekitten.com/801/601"
    
    # Portfolio
    "public\images\portfolio\project1.jpg" = "https://placekitten.com/600/400"
    "public\images\portfolio\project2.jpg" = "https://placekitten.com/601/401"
    "public\images\portfolio\project3.jpg" = "https://placekitten.com/602/402"
    "public\images\portfolio\project4.jpg" = "https://placekitten.com/603/403"
    
    # Blog
    "public\images\blog\post1.jpg" = "https://placekitten.com/800/400"
    "public\images\blog\post2.jpg" = "https://placekitten.com/801/401"
    "public\images\blog\post3.jpg" = "https://placekitten.com/802/402"
}

foreach ($item in $downloads.GetEnumerator()) {
    Write-Host "Downloading $($item.Key)..."
    try {
        Invoke-WebRequest -Uri $item.Value -OutFile $item.Key
        Write-Host "Successfully downloaded $($item.Key)"
    }
    catch {
        Write-Host "Failed to download $($item.Key)"
        Write-Host $_.Exception.Message
    }
}
