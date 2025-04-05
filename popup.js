document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const autoScrollToggle = document.getElementById('autoScrollToggle');
  
  // Load saved preferences
  chrome.storage.sync.get(['sidebarVisible', 'autoScroll'], (result) => {
    if (result.sidebarVisible !== undefined) {
      sidebarToggle.checked = result.sidebarVisible;
    }
    
    if (result.autoScroll !== undefined) {
      autoScrollToggle.checked = result.autoScroll;
    }
  });
  
  // Save preferences when toggles are changed
  sidebarToggle.addEventListener('change', () => {
    const isVisible = sidebarToggle.checked;
    
    // Save preference
    chrome.storage.sync.set({ sidebarVisible: isVisible });
    
    // Send message to content script to update sidebar visibility
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleSidebar', isVisible });
      }
    });
  });
  
  autoScrollToggle.addEventListener('change', () => {
    const isEnabled = autoScrollToggle.checked;
    
    // Save preference
    chrome.storage.sync.set({ autoScroll: isEnabled });
    
    // Send message to content script to update auto-scroll setting
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleAutoScroll', isEnabled });
      }
    });
  });
}); 