// Simple script to generate icon PNG files for the extension
// You can use this script with a web browser's console or Node.js with canvas library

function generateIcon(size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Instagram gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#fa7e1e');   // Yellow/Orange
  gradient.addColorStop(0.3, '#d62976'); // Pink
  gradient.addColorStop(0.6, '#962fbf'); // Purple
  gradient.addColorStop(1, '#4f5bd5');   // Blue
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Draw a white rectangle in center
  const innerSize = Math.floor(size * 0.6);
  const offset = Math.floor((size - innerSize) / 2);
  ctx.fillStyle = 'white';
  ctx.fillRect(offset, offset, innerSize, innerSize);
  
  // Draw small play button icon in the center
  const triangleSize = Math.floor(size * 0.3);
  const triangleOffset = Math.floor((size - triangleSize) / 2);
  
  ctx.beginPath();
  ctx.moveTo(triangleOffset + triangleSize, size / 2);
  ctx.lineTo(triangleOffset, size / 2 - triangleSize / 2);
  ctx.lineTo(triangleOffset, size / 2 + triangleSize / 2);
  ctx.closePath();
  
  ctx.fillStyle = '#405DE6';
  ctx.fill();
  
  // Draw border
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = Math.max(1, Math.floor(size / 64));
  ctx.strokeRect(0, 0, size, size);
  
  return canvas.toDataURL('image/png');
}

// Usage:
// 1. Open browser console
// 2. Copy and paste this function
// 3. Generate icons with:
//    const icon16 = generateIcon(16);
//    const icon48 = generateIcon(48);
//    const icon128 = generateIcon(128);
// 4. Right-click on the data URL and save as image

console.log("Icon Generator loaded");
console.log("To generate icons, use:");
console.log("  const icon16 = generateIcon(16);");
console.log("  const icon48 = generateIcon(48);");
console.log("  const icon128 = generateIcon(128);");
console.log("Then right-click on the data URL in the console and save as image"); 