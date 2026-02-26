# GDrive Image → Static Link Generator

A simple web tool that converts Google Drive image share links into direct static image links.

Live demo: https://humanmint.github.io/gdrive-image-to-static-link-generator/

## What it does

- Accepts a Google Drive file share URL (or file ID)
- Extracts the Drive file ID
- Converts it to a static image URL format:
  - `https://lh3.googleusercontent.com/d/<FILE_ID>`
- Shows the generated static link
- Auto-copies the static link to clipboard on convert (when browser allows)
- Provides a manual **Copy static link** button
- Renders an image preview hyperlinked to the generated URL
- Displays clear success/failure status messages

## Usage

1. Upload an image to Google Drive
2. Right click the file → **Share**
3. Ensure access is set to **Anyone with the link – Viewer**
4. Click **Copy link**
5. Paste into the input field and click **Convert**
6. Use the generated static link in websites, email signatures, docs, or automations

## Notes

- This is a static client-side app (no backend).
- Public visibility can’t be fully pre-validated in advance from a static app, so the tool verifies by attempting to load the generated image.
- If preview fails, common causes are:
  - File is not public
  - Invalid/partial Drive URL
  - Unsupported file type

## Tech

- Plain HTML/CSS/JavaScript
- Hosted with GitHub Pages via GitHub Actions

## Development

Run locally:

```bash
python3 -m http.server 8090
```

Then open:

`http://127.0.0.1:8090`

## Deploy

This repo uses `.github/workflows/deploy-pages.yml` to deploy on push to `main`.

## License

MIT (or project owner preference)
