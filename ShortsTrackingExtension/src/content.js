// Track the current Short ID
function getShortId() {
  const path = window.location.pathname;
  return path.includes('/shorts/') ? path.split('/')[2] : null;
}

// Increment counter only for new Shorts
function checkForShorts() {
  const currentVideoId = getShortId();
  if (!currentVideoId) return;

  chrome.storage.local.get(['lastVideoId', 'shortsCount'], (result) => {
    // Only increment if it's a new Short
    if (currentVideoId !== result.lastVideoId) {
      const newCount = (result.shortsCount || 0) + 1;
      chrome.storage.local.set({
        shortsCount: newCount,
        lastVideoId: currentVideoId
      });
    }
  });
}

// Detect URL/DOM changes
const observer = new MutationObserver(checkForShorts);
observer.observe(document.body, { childList: true, subtree: true });
window.addEventListener('popstate', checkForShorts);

// Initial check
checkForShorts();

