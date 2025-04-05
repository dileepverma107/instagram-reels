// Simple version of the Instagram Sidebar Plugin
console.log('Instagram Sidebar Plugin loaded');

// Create and inject the Instagram sidebar
function createSidebar() {
  console.log('Creating sidebar');
  
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
  toggleButton.textContent = '<<';
  toggleButton.title = 'Toggle Instagram Sidebar';
  
  // Add click event to toggle sidebar
  toggleButton.addEventListener('click', () => {
    const sidebar = document.getElementById('instagram-sidebar');
    if (sidebar.classList.contains('collapsed')) {
      sidebar.classList.remove('collapsed');
      toggleButton.textContent = '<<';
    } else {
      sidebar.classList.add('collapsed');
      toggleButton.textContent = '>>';
    }
  });
  
  // Append toggle button to body
  document.body.appendChild(toggleButton);
  
  console.log('Sidebar created');
}

// Execute when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createSidebar);
} else {
  createSidebar();
}

// Backup method: try again after a delay
setTimeout(() => {
  if (!document.getElementById('instagram-sidebar')) {
    console.log('Backup injection after timeout');
    createSidebar();
  }
}, 1000); 