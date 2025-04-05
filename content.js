// Create and inject the Instagram sidebar
let autoScrollEnabled = true;
let sidebarInjected = false;

function debug(message) {
  console.log(`[Instagram Sidebar] ${message}`);
}

function createSidebar() {
  if (sidebarInjected) {
    debug("Sidebar already injected, skipping");
    return;
  }
  
  debug("Creating sidebar");
  
  // Create the sidebar container
  const sidebar = document.createElement('div');
  sidebar.id = 'instagram-sidebar';
  
  // Create iframe to load the sidebar content
  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('sidebar.html');
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  
  // Append iframe to sidebar
  sidebar.appendChild(iframe);
  
  // Append sidebar to body
  document.body.appendChild(sidebar);
  
  // Create toggle button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'instagram-sidebar-toggle';
  toggleButton.innerHTML = '&lt;&lt;';
  toggleButton.title = 'Toggle Instagram Sidebar';
  
  // Add click event to toggle sidebar
  toggleButton.addEventListener('click', () => {
    const sidebar = document.getElementById('instagram-sidebar');
    if (sidebar.classList.contains('collapsed')) {
      sidebar.classList.remove('collapsed');
      toggleButton.innerHTML = '&lt;&lt;';
    } else {
      sidebar.classList.add('collapsed');
      toggleButton.innerHTML = '&gt;&gt;';
    }
  });
  
  // Append toggle button to body
  document.body.appendChild(toggleButton);
  
  // Load visibility preference
  chrome.storage.sync.get(['sidebarVisible'], (result) => {
    if (result.sidebarVisible === false) {
      sidebar.classList.add('collapsed');
      toggleButton.innerHTML = '&gt;&gt;';
    }
  });
  
  // Load auto-scroll preference
  chrome.storage.sync.get(['autoScroll'], (result) => {
    if (result.autoScroll !== undefined) {
      autoScrollEnabled = result.autoScroll;
      
      // Send message to iframe
      setTimeout(() => {
        try {
          iframe.contentWindow.postMessage({
            action: 'toggleAutoScroll',
            isEnabled: autoScrollEnabled
          }, '*');
        } catch (error) {
          debug(`Error sending message to iframe: ${error.message}`);
        }
      }, 1000); // Small delay to ensure iframe is loaded
    }
  });
  
  sidebarInjected = true;
  debug("Sidebar successfully injected");
}

// Ensure we wait for the page to be fully loaded
function ensureSidebarInjection() {
  debug("Ensuring sidebar injection");
  
  if (document.body) {
    createSidebar();
  } else {
    debug("Body not ready, will retry");
    setTimeout(ensureSidebarInjection, 100);
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  debug(`Message received: ${message.action}`);
  
  if (message.action === 'toggleSidebar') {
    const sidebar = document.getElementById('instagram-sidebar');
    const toggleButton = document.getElementById('instagram-sidebar-toggle');
    
    if (sidebar) {
      if (message.isVisible) {
        sidebar.classList.remove('collapsed');
        toggleButton.innerHTML = '&lt;&lt;';
      } else {
        sidebar.classList.add('collapsed');
        toggleButton.innerHTML = '&gt;&gt;';
      }
    } else {
      debug("Sidebar not found, trying to inject it");
      ensureSidebarInjection();
    }
  } else if (message.action === 'toggleAutoScroll') {
    autoScrollEnabled = message.isEnabled;
    
    // Forward message to iframe
    const iframe = document.querySelector('#instagram-sidebar iframe');
    if (iframe) {
      try {
        iframe.contentWindow.postMessage({
          action: 'toggleAutoScroll',
          isEnabled: autoScrollEnabled
        }, '*');
      } catch (error) {
        debug(`Error sending message to iframe: ${error.message}`);
      }
    }
  }
});

// Execute when the DOM is fully loaded
if (document.readyState === 'loading') {
  debug("Document loading, waiting for DOMContentLoaded");
  document.addEventListener('DOMContentLoaded', ensureSidebarInjection);
} else {
  debug("Document already loaded, injecting sidebar");
  ensureSidebarInjection();
}

// Backup method: try again after a delay to ensure injection
setTimeout(() => {
  if (!sidebarInjected) {
    debug("Backup injection after timeout");
    ensureSidebarInjection();
  }
}, 1000); 