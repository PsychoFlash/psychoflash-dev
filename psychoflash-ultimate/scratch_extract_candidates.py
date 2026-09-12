import subprocess
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

candidates = [
    ('NBA_Bodycam_Donovan', r'C:\Users\orian\Videos\Videos\Capture sequences\Captures\(65) Donovan Mitchell’s BODY CAM View of Guarding Wemby is INSANE 👀🔥 2025 NBA All-Star Practice - YouTube - Google Chrome 2025-02-17 14-12-17.mp4'),
    ('NBA_Bodycam_Jaren', r'C:\Users\orian\Videos\Videos\Capture sequences\Captures\Jaren Jackson Jr. wears bodycam during practice _ NBA.com - Google Chrome 2025-02-17 14-15-12.mp4'),
    ('Arena_Shas_CleanFeed', r'C:\Users\orian\Videos\05_Final_Deliveries_Corrected\01_סרטון_היילייטס_כנס_שס_דרך_אמונה_בחרתי_CleanFeed.mp4'),
    ('Sony_FX6_Look', r'C:\Users\orian\Downloads\drive-download-20260903T102050Z-1-001\FX6_LOOK_FINAL+SOUND.mp4'),
    ('Vegas_Keynote_7180', r'C:\Users\orian\Downloads\Events\Conference materials\vegas-20260326T185507Z-3-001\vegas\IMG_7180.mov'),
    ('Vegas_Keynote_7189', r'C:\Users\orian\Downloads\Events\Conference materials\vegas-20260326T185507Z-3-001\vegas\IMG_7189.MOV'),
    ('Concert_20250606_1855', r'C:\Users\orian\Downloads\Images\Photos\Photos-1-001\20250606_185504.mp4'),
    ('Concert_20250606_1945', r'C:\Users\orian\Downloads\Images\Photos\Photos-1-001\20250606_194500.mp4'),
    ('Concert_20250607_1941', r'C:\Users\orian\Downloads\Images\Photo albums\Photos-1-001 (1)\20250607_194120.mp4'),
    ('Zoom_Screen_Studio', r'C:\Users\orian\Downloads\Videos\Entertainment\Screen_Recording_20260301_211942_Zoom.mp4'),
    ('Drone_Scene', r'C:\Users\orian\Downloads\Drone_shots_tracking_scene_202605251253.mp4'),
    ('CLB_Broadcast', r'C:\Users\orian\Downloads\Videos\Educational\CLB - המרכז האקדמי למנהל.mp4'),
]

os.makedirs('scratch_previews', exist_ok=True)

for name, path in candidates:
    if os.path.exists(path):
        size_mb = os.path.getsize(path) / (1024 * 1024)
        out_jpg = os.path.join('scratch_previews', f"{name}.jpg")
        cmd = ['ffmpeg', '-y', '-ss', '00:00:04', '-i', path, '-vframes', '1', '-q:v', '2', out_jpg]
        res = subprocess.run(cmd, capture_output=True)
        if os.path.exists(out_jpg):
            print(f"EXTRACTED: {name} ({size_mb:.1f} MB) -> {out_jpg}")
        else:
            print(f"FFMPEG FAILED: {name} -> {res.stderr.decode('utf-8', errors='ignore')[:150]}")
    else:
        print(f"MISSING: {name} -> {path}")
