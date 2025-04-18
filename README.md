# Instagram Sidebar Plugin

A browser extension that displays Instagram reels on the right side of the browser with auto-scrolling functionality.

## Features

- Displays real Instagram reels in a sidebar on the right side of the browser
- Auto-scrolls to the next reel when the current one finishes
- Toggle sidebar visibility with a button
- Enable/disable auto-scrolling in extension popup
- Mobile-like interface for Instagram reels
- Works on all websites
- Keyboard shortcuts for navigation (Arrow Up/Down or J/K keys)
- Error handling and automatic recovery when videos fail to load
- Backup reels when Instagram content can't be fetched

## Installation

### Chrome Web Store (Coming Soon)

1. Visit the Chrome Web Store (link to be added)
2. Click "Add to Chrome"
3. Confirm installation

### Manual Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked"
5. Select the folder containing the extension files

## Usage

- After installation, a sidebar will appear on the right side of the browser
- Click the toggle button (<<) to hide/show the sidebar
- Click the extension icon in the browser toolbar to:
  - Enable/disable the sidebar
  - Enable/disable auto-scrolling
- Use keyboard shortcuts for navigation:
  - Arrow Down or J key: Next reel
  - Arrow Up or K key: Previous reel

## How It Works

This extension attempts to fetch real Instagram reels using Instagram's public data endpoints. If the fetch fails, it falls back to backup content. Features include:

- Real-time fetching of Instagram reels content
- Auto-scrolling after video completion
- Periodic scrolling if a video is too long
- Responsive design for different screen sizes
- Touch-based swiping for mobile users
- Error handling with automatic retry

## Development

The extension is built using pure HTML, CSS, and JavaScript.

### Project Structure

- `manifest.json` - Extension configuration
- `content.js` - Content script that injects the sidebar
- `styles.css` - Styles for the sidebar
- `sidebar.html` - Contains the Instagram reels interface with data fetching
- `popup.html` - Popup that appears when clicking the extension icon
- `popup.js` - JavaScript for the popup functionality
- `images/` - Extension icons

## Future Improvements

- Use a more reliable method to fetch Instagram content
- Add user authentication to display personalized reels
- Add more interaction options (like, comment, share)
- Improve performance and reduce resources usage
- Add options for sidebar width and position
- Support for more social media platforms

## Technical Notes

- The extension uses publicly available data endpoints from Instagram
- Due to Instagram's API limitations, the extension may periodically fall back to backup content
- No user data is collected or stored by this extension

## License

MIT License #   i n s t a g r a m - r e e l s  
 