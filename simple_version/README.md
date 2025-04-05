# Simple Instagram Sidebar Plugin

This is a simplified version of the Instagram Sidebar Plugin that's guaranteed to work for testing purposes.

## Features

- Displays Instagram-like reels in a sidebar on the right side of the browser
- Auto-scrolls to the next reel when the current one finishes
- Toggle sidebar visibility with a button
- Keyboard navigation

## Installation

1. Download or clone this folder
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked"
5. Select this folder

## Usage

- After installation, a sidebar will appear on the right side of any webpage
- Click the toggle button (<<) on the right side to hide/show the sidebar
- Use keyboard shortcuts for navigation:
  - Arrow Down or J key: Next reel
  - Arrow Up or K key: Previous reel

## Files

- `manifest.json` - Extension configuration
- `content.js` - Content script that injects the sidebar
- `styles.css` - Styles for the sidebar
- `sidebar.html` - HTML for the sidebar that displays reels
- `popup.html` - Popup that appears when clicking the extension icon

## Testing

This simplified version uses publicly available sample videos for testing purposes. It does not actually connect to Instagram's API but simulates the experience using local data.

## Notes

This is a simpler version of the full Instagram Sidebar Plugin, designed for reliable testing. The full version includes features like:

- Real Instagram content fetching
- User preferences
- More advanced UI
- Error handling and automatic retries 