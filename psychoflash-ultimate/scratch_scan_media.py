import os
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

search_dirs = [
    r'C:\Users\orian\Videos',
    r'C:\Users\orian\Pictures',
    r'C:\Users\orian\Downloads\WEBBS',
    r'C:\Users\orian\Documents',
    r'C:\Users\orian\Downloads'
]

video_exts = {'.mp4', '.mov', '.mkv', '.webm', '.avi', '.m4v'}
img_exts = {'.jpg', '.jpeg', '.png', '.webp'}

found_videos = []
found_images = []

for sdir in search_dirs:
    if not os.path.exists(sdir):
        continue
    for root, dirs, files in os.walk(sdir):
        if any(x in root for x in ['node_modules', '.git', 'dist', '.system_generated', 'AppData', 'venv']):
            continue
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            full_path = os.path.join(root, f)
            try:
                size = os.path.getsize(full_path)
                if ext in video_exts and size > 200000:
                    found_videos.append((full_path, size))
                elif ext in img_exts and size > 50000:
                    found_images.append((full_path, size))
            except Exception:
                pass

with open(r'C:\Users\orian\Documents\antigravity\brave-borg\psychoflash-ultimate\scratch_media_catalog.txt', 'w', encoding='utf-8') as out:
    out.write(f"TOTAL VIDEOS: {len(found_videos)}\n")
    for p, s in sorted(found_videos, key=lambda x: -x[1]):
        out.write(f"VIDEO: {s // 1024} KB | {p}\n")
    out.write(f"\nTOTAL IMAGES: {len(found_images)}\n")
    for p, s in sorted(found_images, key=lambda x: -x[1]):
        out.write(f"IMAGE: {s // 1024} KB | {p}\n")

print(f"Cataloged {len(found_videos)} videos and {len(found_images)} images into scratch_media_catalog.txt")
