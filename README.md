# Chrome URL Launcher Extension

A lightweight, secure Google Chrome extension built using **Manifest V3** that allows you to instantly search and launch privileged internal `chrome://` URLs (like `chrome://settings`, `chrome://flags`, or `chrome://version`) directly from a clean popup interface.

## 📂 Project Structure

```text
chrome-url-launcher/
├── manifest.json   # Extension metadata and system configuration
├── popup.html      # Visual user interface (HTML & CSS)
├── popup.js        # Extension application logic (JavaScript)
└── README.md       # Project documentation (This file)
```

## ✨ Key Features

- **Elevated Privilege Execution:** Uses the isolated `chrome.tabs.create` API to safely load privileged browser screens that regular links are blocked from opening.
- **Smart URL Normalization:** Automatically fixes short strings (e.g., typing `version` immediately scales to `chrome://version`).
- **Real-Time Directory Search:** Instantly filters the list of available shortcuts as you type into the entry container.
- **Persistent History Log:** Saves up to 5 of your most recently launched custom debug targets locally via `chrome.storage.local`.

## 🚀 Installation & Loading Instructions

Because this is a developer-staged build, you load it directly via Chrome's unpacked extension engine:

1. **Open Extensions Page:** Open Google Chrome and navigate to `chrome://extensions/` using your address bar.
2. **Enable Developer Mode:** Locate the **Developer mode** toggle switch in the upper-right corner and turn it **ON**.
3. **Load the Unpacked Folder:** Click the **Load unpacked** button that appears in the top-left section.
4. **Target the Project:** Select your main `chrome-url-launcher` directory folder. 
5. **Pin & Test:** Click the puzzle piece icon on your browser toolbar, pin **Chrome URL Launcher**, and click it to open the control panel.

## 🛠️ Development & Modifications

- To tweak the available list of hardcoded links, simply add new `<button data-url="chrome://your-url">` components to the `popup.html` file.
- To inspect errors or modify script executions, right-click inside the open extension popup window and click **Inspect**.
