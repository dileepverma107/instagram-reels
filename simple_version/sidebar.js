function log(message) {
  console.log(message);
  const debugInfo = document.getElementById('debug-info');
  if (debugInfo) {
    const time = new Date().toLocaleTimeString();
    const logEntry = document.createElement('span');
    logEntry.textContent = `[${time}] ${message}`;
    debugInfo.appendChild(logEntry);
    debugInfo.appendChild(document.createElement('br'));
  }
}

log('Sidebar loaded');

// Sample reels data
const reelsData = [
  {
    id: 1,
    username: 'instagram_official',
    caption: 'Check out our latest features! #instagram #reels',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    likes: 28456,
    comments: 1823
  },
  {
    id: 2,
    username: 'travel_enthusiast',
    caption: 'Exploring beautiful destinations around the world! #travel #adventure',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    likes: 15678,
    comments: 942
  },
  {
    id: 3,
    username: 'food_lover',
    caption: 'Delicious recipes you need to try today! #foodie #cooking',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    likes: 21345,
    comments: 1156
  },
  {
    id: 4,
    username: 'fitness_coach',
    caption: 'Quick and effective workout routine for busy people #fitness #health',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    likes: 18976,
    comments: 834
  },
  {
    id: 5,
    username: 'tech_reviewer',
    caption: 'First look at the latest smartphone release! #tech #gadgets',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    likes: 12567,
    comments: 723
  }
];

const reelsContainer = document.getElementById('reelsContainer');
const loading = document.getElementById('loading');
let currentReelIndex = 0;
let reelElements = [];

// Create DOM element with attributes
function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  
  // Set attributes
  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'text') {
      element.textContent = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
    } else {
      element.setAttribute(key, value);
    }
  }
  
  // Append children
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  
  return element;
}

// Load reels
function loadReels() {
  log('Loading reels');
  loading.style.display = 'none';
  
  reelsData.forEach((reel, index) => {
    log(`Creating reel ${index + 1}`);
    
    // Create elements using DOM methods instead of innerHTML
    const reelElement = createElement('div', {
      class: 'reel',
      style: { transform: `translateY(${index === 0 ? '0' : '100%'})` }
    });
    
    // Create content container
    const reelContent = createElement('div', { class: 'reel-content' });
    
    // Create video element
    const video = createElement('video', { 
      class: 'reel-video',
      src: reel.videoUrl,
      loop: 'true',
      playsinline: 'true'
    });
    
    // Create info section
    const reelInfo = createElement('div', { class: 'reel-info' });
    const usernameDiv = createElement('div', { class: 'reel-username', text: `@${reel.username}` });
    const captionDiv = createElement('div', { class: 'reel-caption', text: reel.caption });
    
    reelInfo.appendChild(usernameDiv);
    reelInfo.appendChild(captionDiv);
    reelContent.appendChild(video);
    reelContent.appendChild(reelInfo);
    
    // Create actions
    const reelActions = createElement('div', { class: 'reel-actions' });
    
    // Like button
    const likeButton = createElement('button', { class: 'action-button' });
    likeButton.textContent = '❤️';
    const likeCount = createElement('span', { class: 'action-count', text: reel.likes.toString() });
    likeButton.appendChild(likeCount);
    
    // Comment button
    const commentButton = createElement('button', { class: 'action-button' });
    commentButton.textContent = '💬';
    const commentCount = createElement('span', { class: 'action-count', text: reel.comments.toString() });
    commentButton.appendChild(commentCount);
    
    // Share button
    const shareButton = createElement('button', { class: 'action-button', text: '📤' });
    
    reelActions.appendChild(likeButton);
    reelActions.appendChild(commentButton);
    reelActions.appendChild(shareButton);
    
    // Assemble the reel
    reelElement.appendChild(reelContent);
    reelElement.appendChild(reelActions);
    
    reelsContainer.appendChild(reelElement);
    reelElements.push(reelElement);
    
    // Auto-play first video
    if (index === 0) {
      video.autoplay = true;
      video.muted = true;
      video.play().catch(e => log(`Error playing video: ${e.message}`));
    }
    
    // Add video ended event to auto-scroll to next reel
    video.addEventListener('ended', () => {
      log('Video ended, scrolling to next reel');
      scrollToNextReel();
    });
    
    // Add error handling
    video.addEventListener('error', () => {
      log(`Error loading video for reel ${index + 1}`);
      if (index === currentReelIndex) {
        scrollToNextReel();
      }
    });
  });
}

// Scroll to the next reel
function scrollToNextReel() {
  if (currentReelIndex < reelElements.length - 1) {
    log(`Scrolling from reel ${currentReelIndex + 1} to ${currentReelIndex + 2}`);
    
    // Pause current video
    const currentVideo = reelElements[currentReelIndex].querySelector('video');
    currentVideo.pause();
    
    currentReelIndex++;
    
    // Update position of all reel elements
    reelElements.forEach((reel, index) => {
      const offset = index - currentReelIndex;
      reel.style.transform = `translateY(${offset * 100}%)`;
    });
    
    // Play the next video
    const nextVideo = reelElements[currentReelIndex].querySelector('video');
    nextVideo.currentTime = 0;
    nextVideo.play().catch(e => log(`Error playing video: ${e.message}`));
  } else {
    log('Reached last reel, looping back to first');
    currentReelIndex = -1;  // Will be incremented to 0 in the next call
    scrollToNextReel();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  log('DOM content loaded');
  loadReels();
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'j') {
      scrollToNextReel();
    } else if (e.key === 'ArrowUp' || e.key === 'k') {
      if (currentReelIndex > 0) {
        // Go to previous reel
        const currentVideo = reelElements[currentReelIndex].querySelector('video');
        currentVideo.pause();
        
        currentReelIndex--;
        
        reelElements.forEach((reel, index) => {
          const offset = index - currentReelIndex;
          reel.style.transform = `translateY(${offset * 100}%)`;
        });
        
        const prevVideo = reelElements[currentReelIndex].querySelector('video');
        prevVideo.currentTime = 0;
        prevVideo.play().catch(e => log(`Error playing video: ${e.message}`));
      }
    }
  });
});

// Initialize immediately if already loaded
if (document.readyState !== 'loading') {
  log('Document already loaded, initializing immediately');
  loadReels();
} 