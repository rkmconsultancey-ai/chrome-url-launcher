document.addEventListener('DOMContentLoaded', function () {
  const urlInput = document.getElementById('url-input');
  const launchBtn = document.getElementById('btn-custom-launch');
  const clearBtn = document.getElementById('btn-clear-history');
  const clearStatsBtn = document.getElementById('btn-clear-stats');
  const quickButtons = document.querySelectorAll('.quick-links button');
  const historyContainer = document.getElementById('history-container');
  const statsContainer = document.getElementById('stats-container');
  const fallbackInput = document.getElementById('fallback-input');
  const saveFallbackBtn = document.getElementById('btn-save-fallback');

  loadHistory();
  loadFallbackSetting();
  loadErrorStats();

  function launchURL(url) {
    let targetUrl = url.trim();
    if (!targetUrl) return;
    if (!targetUrl.startsWith('chrome://') && !targetUrl.startsWith('about:')) {
      targetUrl = 'chrome://' + targetUrl;
    }
    saveToHistory(targetUrl);
    chrome.runtime.sendMessage({ action: "launchTracked", url: targetUrl }, () => {
      setTimeout(loadErrorStats, 150);
    });
  }

  launchBtn.addEventListener('click', () => launchURL(urlInput.value));
  urlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') launchURL(urlInput.value); });
  quickButtons.forEach(btn => btn.addEventListener('click', function() { launchURL(this.getAttribute('data-url')); }));
  clearBtn.addEventListener('click', () => chrome.storage.local.set({ urlHistory: [] }, loadHistory));
  clearStatsBtn.addEventListener('click', () => chrome.storage.local.set({ errorStats: {} }, loadErrorStats));
  
  saveFallbackBtn.addEventListener('click', () => {
    const rawVal = fallbackInput.value.trim();
    if (rawVal) chrome.storage.local.set({ fallbackUrl: rawVal }, () => alert(`Saved! Hotkey targets: ${rawVal}`));
  });

  urlInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().replace('chrome://', '');
    quickButtons.forEach(btn => {
      const text = btn.textContent.toLowerCase(), url = btn.getAttribute('data-url').toLowerCase();
      btn.style.display = (text.includes(query) || url.includes(query)) ? "block" : "none";
    });
  });

  function saveToHistory(url) {
    chrome.storage.local.get({ urlHistory: [] }, (data) => {
      let history = data.urlHistory.filter(item => item !== url);
      history.unshift(url);
      if (history.length > 5) history.pop();
      chrome.storage.local.set({ urlHistory: history }, loadHistory);
    });
  }

  function loadHistory() {
    chrome.storage.local.get({ urlHistory: [] }, (data) => {
      historyContainer.innerHTML = data.urlHistory.length ? '' : '<div class="empty-text">No recent entries</div>';
      data.urlHistory.forEach(url => {
        const btn = document.createElement('button');
        btn.textContent = `⏱️ ${url.replace('chrome://', '')}`;
        btn.addEventListener('click', () => launchURL(url));
        historyContainer.appendChild(btn);
      });
    });
  }

  function loadFallbackSetting() {
    chrome.storage.local.get({ fallbackUrl: "chrome://settings" }, (data) => { fallbackInput.value = data.fallbackUrl.replace('chrome://', ''); });
  }

  function loadErrorStats() {
    chrome.storage.local.get({ errorStats: {} }, (data) => {
      const stats = data.errorStats, keys = Object.keys(stats);
      statsContainer.innerHTML = keys.length ? '' : '<div class="empty-text">No policy blocks detected</div>';
      keys.forEach(url => {
        const card = document.createElement('div');
        card.className = 'stats-card';
        card.innerHTML = `<strong>❌ ${url.replace('chrome://', '')}</strong>Blocked ${stats[url].count}x<br>Reason: <em>${stats[url].lastReason}</em>`;
        statsContainer.appendChild(card);
      });
    });
  }
});
