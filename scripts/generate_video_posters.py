#!/usr/bin/env python3
from pathlib import Path
import subprocess

MEDIA_DIR = Path("media/assets/student-videos-and-conference-presentations")

VIDEOS = [
    "EV_Charging_Presentation.mp4",
    "Federated_Learning_Presentation.mp4",
    "Metaheuristic_Tuning_Presentation.mp4",
    "Scattering_Imaging_Presentation.mp4",
    "tDCS_Presentation.mp4",
]

def poster_name(video_name: str) -> str:
    return f"{Path(video_name).stem}_poster.webp"

def generate_poster(video_path: Path, output_path: Path) -> None:
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i", str(video_path),
            "-frames:v", "1",
            "-vf", "scale='min(1200,iw)':-2",
            "-c:v", "libwebp",
            "-quality", "78",
            "-compression_level", "6",
            str(output_path),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
    )

def main() -> None:
    for video_name in VIDEOS:
        video_path = MEDIA_DIR / video_name
        if not video_path.exists():
            raise SystemExit(f"Missing presentation video: {video_path}")
        output_path = MEDIA_DIR / poster_name(video_name)
        generate_poster(video_path, output_path)
        print(f"generated {output_path}")

if __name__ == "__main__":
    main()
