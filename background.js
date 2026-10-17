chrome.commands.onCommand.addListener((command) => {
  if (command === "launch-fallback") {
    chrome.storage.local.get({ fallbackUrl: "chrome://settings" }, (data) => {
      let targetUrl = data.fallbackUrl.trim();
      if (!targetUrl.startsWith('chrome://') && !targetUrl.startsWith('about:')) {
        targetUrl = 'chrome://' + targetUrl;
      }
      launchWithTracking(targetUrl);
    });
  }
});

function launchWithTracking(url) {
  chrome.tabs.create({ url: url }, (tab) => {
    if (chrome.runtime.lastError) {
      logError(url, chrome.runtime.lastError.message || "Blocked by browser policy");
    } else if (!tab || !tab.id) {
      logError(url, "Failed to instantiate tab context");
    }
  });
}

function logError(url, contextMessage) {
  chrome.storage.local.get({ errorStats: {} }, (data) => {
    let stats = data.errorStats;
    if (!stats[url]) {
      stats[url] = { count: 0, lastReason: "" };
    }
    stats[url].count += 1;
    stats[url].lastReason = contextMessage;
    chrome.storage.local.set({ errorStats: stats });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "launchTracked") {
    launchWithTracking(request.url);
    sendResponse({ status: "processing" });
  }
  return true;
});
