# Chrome URL Launcher Extension

A lightweight, secure Google Chrome extension built using **Manifest V3** that allows you to instantly search and launch privileged internal `chrome://` URLs (like `chrome://settings`, `chrome://flags`, or `chrome://version`) directly from a clean popup interface.

## 📂 Project Structure

```text
chrome-url-launcher/
├── manifest.json   # Extension metadata and system configuration
├── background.js   # Intercepts tab creation and logs runtime exceptions
├── popup.html      # Visual user interface (HTML & CSS)
├── popup.js        # Extension application logic (JavaScript)
└── README.md       # Project documentation (This file)
```

## ✨ Key Features

- **Elevated Privilege Execution:** Uses the isolated `chrome.tabs.create` API to safely load privileged browser screens that regular links are blocked from opening.
- **Smart URL Normalization:** Automatically fixes short strings (e.g., typing `version` immediately scales to `chrome://version`).
- **Real-Time Directory Search:** Instantly filters the list of available shortcuts as you type into the entry container.
- **Persistent History Log:** Saves up to 5 of your most recently launched custom debug targets locally via `chrome.storage.local`.
- **Administrative Telemetry:** Intercepts tab allocation failures and records policy-blocked URLs under a dedicated stats panel.

## 🚀 Installation & Loading Instructions

Because this is a developer-staged build, you load it directly via Chrome's unpacked extension engine:

1. **Open Extensions Page:** Open Google Chrome and navigate to `chrome://extensions/` using your address bar.
2. **Enable Developer Mode:** Locate the **Developer mode** toggle switch in the upper-right corner and turn it **ON**.
3. **Load the Unpacked Folder:** Click the **Load unpacked** button that appears in the top-left section.
4. **Target the Project:** Select your main `chrome-url-launcher` directory folder. 
5. **Pin & Test:** Click the puzzle piece icon on your browser toolbar, pin **Chrome URL Launcher**, and click it to open the control panel.

## 📖 Tutorial: Using the Custom URL Input Box Effectively

The custom text box at the top of the popup is a powerful text launcher. Here is how to use it like a power user:

### ⚡ 1. The Short-Text Launch (Auto-Completion)
You do not need to type out the entire `chrome://` prefix. The launcher box handles normalization automatically.
*   **Step 1:** Click into the input box (it auto-focuses upon opening).
*   **Step 2:** Type a simple destination keyword like `flags`, `gpu`, or `version`.
*   **Step 3:** Press the **Enter** key or click the blue **Launch** button. The extension will automatically fix your input to `chrome://flags` and open it instantly.

### 🔍 2. Real-Time Directory Filtering
The input box doubles as a live directory filter for the extension links below it.
*   **Step 1:** Start typing letters (e.g., type `net`).
*   **Step 2:** Watch as the "Extension Directory" menu instantly hides unrelated items, showing only **🌐 Net Internals**.
*   **Step 3:** Click the filtered button to open it.

### 🛠️ 3. Opening Advanced Debug Paths
You can launch deep browser paths on the fly without changing any extension source files.
*   **Step 1:** Type an unlisted or deep diagnostic path, such as `device-log` or `serviceworker-internals`.
*   **Step 2:** Press **Enter**. It will launch instantly and save itself directly to your **🕒 Recent Launches** section for one-click access next time!

## ⌨️ Keyboard Shortcut Setup Guide

To speed up your debugging loop, you can map a keyboard combination to open this launcher popup instantly from any webpage:

1. Navigate directly to **`chrome://extensions/shortcuts`** using your browser address bar.
2. Scroll down until you locate the card named **Chrome URL Launcher**.
3. Look for the **"Activate the extension"** setting field.
4. Click inside the blank text box next to it and type your preferred hotkey combination (for example: `Ctrl+Shift+Y` or `Alt+U`).
5. Ensure the dropdown on the right is set to **In Chrome**.

## 🛠️ Development & Modifications

- To tweak the available list of hardcoded links, simply add new `<button data-url="chrome://your-url">` components to the `popup.html` file.
- To inspect errors or modify script executions, right-click inside the open extension popup window and click **Inspect**.
