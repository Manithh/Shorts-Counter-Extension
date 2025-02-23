/*/
document.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.getElementById('counter');
  const refreshButton = document.getElementById('refresh-button');
  const resetButton = document.getElementById('reset-button');

  // Update counter display
  function updateCounter() {
    chrome.storage.local.get(['shortsCount'], (result) => {
      counterElement.textContent = result.shortsCount || 0;
    });
  }

  // Initial load
  updateCounter();

  // Reset button
  resetButton.addEventListener('click', () => {
    chrome.storage.local.set({ shortsCount: 0, lastVideoId: null });
    updateCounter();
  });

  // Real-time updates
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.shortsCount) {
      counterElement.textContent = changes.shortsCount.newValue;
    }
  });
});
/*/
document.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.getElementById('counter');
  const resetButton = document.getElementById('reset-button');

  // Update counter display
  function updateCounter() {
    chrome.storage.local.get(['shortsCount'], (result) => {
      counterElement.textContent = result.shortsCount || 0;
    });
  }

  // Initial load
  updateCounter();

  // Reset functionality
  resetButton.addEventListener('click', () => {
    chrome.storage.local.set({ 
      shortsCount: 0,
      lastVideoId: null  // Also reset video ID tracking
    }, () => {
      counterElement.textContent = '0';
    });
  });

  // Real-time updates
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.shortsCount) {
      counterElement.textContent = changes.shortsCount.newValue;
    }
  });
});