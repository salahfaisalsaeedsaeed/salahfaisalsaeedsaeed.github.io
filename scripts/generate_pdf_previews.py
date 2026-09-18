#!/usr/bin/env python3
from pathlib import Path
from tempfile import TemporaryDirectory
import subprocess
from PIL import Image

MEDIA_DIR = Path("media/assets/student-videos-and-conference-presentations")
MAX_WIDTH = 1200
QUALITY = 78

def render_preview(pdf_path: Path) -> Path:
    output_path = pdf_path.with_name(f"{pdf_path.stem}_preview.webp")
    with TemporaryDirectory() as tmp:
        prefix = Path(tmp) / "page"
        subprocess.run(
            [
                "pdftoppm",
                "-f", "1",
                "-singlefile",
                "-png",
                "-r", "150",
                str(pdf_path),
                str(prefix),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
        )
        png_path = prefix.with_suffix(".png")
        with Image.open(png_path) as image:
            image = image.convert("RGB")
            if image.width > MAX_WIDTH:
                height = round(image.height * MAX_WIDTH / image.width)
                image = image.resize((MAX_WIDTH, height), Image.Resampling.LANCZOS)
            image.save(output_path, "WEBP", quality=QUALITY, method=6)
    return output_path

def main() -> None:
    pdfs = sorted(MEDIA_DIR.glob("*.pdf"))
    if not pdfs:
        raise SystemExit("No PDF presentations found.")
    for pdf_path in pdfs:
        output = render_preview(pdf_path)
        print(f"generated {output}")

if __name__ == "__main__":
    main()
