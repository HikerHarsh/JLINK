# JLINK - AI Agent Guidelines & Architecture Document

Hello AI Agent (Copilot, Cursor, Gemini, or any LLM). If you are reading this file, you have been tasked with modifying or understanding the JLINK codebase. 

The human developer has strictly mandated that this codebase be maintained at an **Institution/Enterprise Level**. You must adhere to the following architectural rules and principles when suggesting or making changes.

## 1. Architectural Rules
- **Vanilla Everything:** Do not introduce React, Vue, jQuery, or any build tools (Webpack/Vite) unless explicitly requested. The extension must remain extremely lightweight and natively executed in the browser.
- **Strict Modularity:** 
  - `src/background/service_worker.js`: Only for network requests that might face CORS issues if executed from the DOM (e.g., calling JD's local API). No DOM manipulation logic here.
  - `src/content/`: Contains UI generation (`widget.js`), drag physics (`drag.js`), and DOM observers (`content.js`). Keep these separated.
  - `assets/styles.css`: All styles must use `!important` to prevent the host website's CSS from overriding the extension's UI. Use an encapsulated class prefix (`jd-`).

## 2. Security & Manifest V3 (MV3)
- **Least Privilege:** Do not add unnecessary permissions to `manifest.json` (e.g., `tabs`, `activeTab`, `storage`) unless absolutely required by a new feature.
- **Service Worker Lifecycle:** Remember that `service_worker.js` is ephemeral. Do not use global variables to store persistent state; use `chrome.storage` if state persistence is needed in the future.

## 3. Core Logic & JDownloader API
- **No-ID Hybrid Approach:** We do NOT use the MyJDownloader cloud API to avoid forcing users to create an account. 
- **FlashGot Port (9666):** The primary communication vector to JDownloader is the local FlashGot API (`http://127.0.0.1:9666/flashgot`).
- **Iframe Penetration:** The `manifest.json` has `all_frames: true` to ensure the content script injects into embedded video players (e.g., Mixdrop, DoodStream). When triggering a download, always send `window.location.href` to capture the exact embed URL, not just the parent page URL.
- **Autostart:** By default, we send `autostart: 0` to ensure links land in the LinkGrabber safely for user review.

## 4. Code Quality
- Ensure zero "junk" code. Remove all unused variables, console logs (except critical errors), and commented-out old logic before committing.
- Maintain readable, well-commented code. 
- Ensure graceful error handling (use `try/catch` and visual Toasts for the user).

**Failure to adhere to these rules will break the strict structural integrity expected of this repository.**
