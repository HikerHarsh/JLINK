# JLINK - JDownloader 2 Web Integration

A lightweight, open-source browser extension that seamlessly connects your web browser to your local **JDownloader 2** instance. 

Designed for privacy and speed, JLINK completely bypasses the need for a "MyJDownloader" account by communicating directly with JDownloader's local FlashGot API.

> ## ⚠️ STRICT LEGAL DISCLAIMER & TERMS OF USE
> 
> **1. Educational & Non-Commercial Project**
> JLINK is a completely free, open-source project created solely for educational purposes. It generates absolutely zero revenue, contains no ads, and is not a commercial product.
> 
> **2. Trademark & Affiliation Disclaimer**
> This project is **100% unofficial and independent**. It is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with **JDownloader**, **AppWork GmbH**, or any of their subsidiaries or affiliates. The name "JDownloader" and related trademarks belong to their respective owners. This tool merely sends URLs to a user's own local client.
> 
> **3. Anti-Piracy & Copyright Policy**
> The creator of JLINK strictly condemns piracy and copyright infringement. This tool is intended *only* for downloading royalty-free, public domain, or user-owned content. The creator has no control over how this tool is used and holds absolutely no responsibility for what users choose to download. Any legal liability arising from the misuse of this tool to download copyrighted material falls entirely and exclusively on the end-user.
> 
> **4. Liability & Warranty**
> Provided under the MIT License, this software comes "as is" with absolutely no warranty. By installing this extension, you agree that the author cannot be held liable for any damages, legal disputes, or account bans resulting from its use.

---

## 🚀 Features

- **Zero-Config & Privacy First:** No accounts, no API keys, no tracking. It talks directly to `127.0.0.1:9666`.
- **Smart Iframe Penetration:** Automatically detects and extracts embedded videos (e.g., Mixdrop, DoodStream, Streamtape) even when they are hidden behind layers of iframes on host sites.
- **Non-Intrusive UI:** Displays a sleek, draggable "Send to JDownloader" floating button only when a valid, playable video is detected on the screen.
- **LinkGrabber Integration:** Links are sent directly to your JD2 LinkGrabber, allowing you to review qualities, rename files, and organize packages before starting the download.
- **Lightweight:** Built with Vanilla JavaScript and CSS. No heavy frameworks.

## 🛠️ Installation (Developer Mode)

Currently, JLINK is available as an unpacked extension.

1. Download or clone this repository to your local machine.
2. Open your browser and navigate to the Extensions page:
   - Chrome/Brave/Edge: `chrome://extensions/`
3. Enable **Developer mode** (usually a toggle in the top-right corner).
4. Click **Load unpacked** and select the folder containing this repository.
5. The extension is now active!

## ⚙️ Prerequisites

- **JDownloader 2** must be open and running on your computer.
- Ensure JD2's local FlashGot port (`9666`) is active (this is on by default in JD2).

## 💻 Technical Architecture

- **Manifest V3:** Built using the latest modern Chrome extension standards.
- **Service Worker (`src/background/service_worker.js`):** Handles background POST requests to the JDownloader FlashGot API, ensuring CORS and network rules are safely managed.
- **Content Scripts (`src/content/`):** 
  - Utilizes `MutationObserver` for dynamic video detection on SPAs (Single Page Applications like YouTube).
  - Injects an isolated UI over valid `<video>` elements.
  - Uses `all_frames: true` in the manifest to penetrate embedded iframe players.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is open-source and available under the MIT License.
