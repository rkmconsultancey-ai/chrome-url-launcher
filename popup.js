document.addEventListener('DOMContentLoaded', function () {
  const urlInput = document.getElementById('url-input');
  const launchBtn = document.getElementById('btn-custom-launch');
  const clearBtn = document.getElementById('btn-clear-history');
  const quickButtons = document.querySelectorAll('.quick-links button');
  const historyContainer = document.getElementById('history-container');

  loadHistory();

  function launchURL(url) {
    let targetUrl = url.trim();
    if (!targetUrl) return;

    if (!targetUrl.startsWith('chrome://') && !targetUrl.startsWith('about:')) {
      targetUrl = 'chrome://' + targetUrl;
    }

    saveToHistory(targetUrl);
    chrome.tabs.create({ url: targetUrl });
  }

  launchBtn.addEventListener('click', () => launchURL(urlInput.value));
  urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') launchURL(urlInput.value);
  });

  quickButtons.forEach(button => {
    button.addEventListener('click', function () {
      launchURL(this.getAttribute('data-url'));
    });
  });

  clearBtn.addEventListener('click', function () {
    chrome.storage.local.set({ urlHistory: [] }, () => {
      loadHistory();
    });
  });

  urlInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().replace('chrome://', '');
    quickButtons.forEach(button => {
      const text = button.textContent.toLowerCase();
      const url = button.getAttribute('data-url').toLowerCase();
      if (text.includes(query) || url.includes(query)) {
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }
    });
  });

  function saveToHistory(url) {
    chrome.storage.local.get({ urlHistory: [] }, (data) => {
      let history = data.urlHistory;
      history = history.filter(item => item !== url);
      history.unshift(url);
      if (history.length > 5) history.pop();

      chrome.storage.local.set({ urlHistory: history }, () => {
        loadHistory();
      });
    });
  }

  function loadHistory() {
    chrome.storage.local.get({ urlHistory: [] }, (data) => {
      historyContainer.innerHTML = '';
      const history = data.urlHistory;

      if (history.length === 0) {
        historyContainer.innerHTML = '<div class="empty-text">No recent entries</div>';
        return;
      }

      history.forEach(url => {
        const btn = document.createElement('button');
        btn.textContent = `⏱️ ${url.replace('chrome://', '')}`;
        btn.setAttribute('data-url', url);
        btn.addEventListener('click', () => launchURL(url));
        historyContainer.appendChild(btn);
      });
    });
  }
});
