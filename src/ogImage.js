// import { createCanvas, loadImage } from "canvas";
import { createCanvas } from "canvas";

/**
 * Generate an OpenGraph image.
 *
 * @param {Object} options
 * @param {number} options.height
 * @param {string} options.text
 * @param {string} options.title
 * @param {number} options.width
 */
export default async function ogImage(options) {
  const { width = 1200, height = 630, text, title } = options;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Fill with a white background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);

  const margin = 36;
  const insetWidth = width - 2 * margin;
  const insetHeight = height - 2 * margin;

  // Draw title
  let fontHeight = 48;
  ctx.font = `bold ${fontHeight}px Helvetica`;
  ctx.fillStyle = "#000";
  const x = margin;
  let y = margin;
  y = drawText(ctx, insetWidth, insetHeight, x, y, fontHeight, title);

  // Draw body text
  fontHeight = 36;
  y += fontHeight;
  ctx.font = `normal ${fontHeight}px Helvetica`;
  ctx.fillStyle = "#333";
  drawText(ctx, insetWidth, insetHeight, x, y, fontHeight, text);

  return canvas.toBuffer();
}

// Draw text with basic wrapping
function drawText(ctx, width, height, x, y, fontHeight, text) {
  const lineHeight = 1.25 * fontHeight;
  let line = "";
  const words = text.split(/\s+/);
  for (const word of words) {
    const tryLine = line ? `${line} ${word}` : word;
    const metrics = ctx.measureText(tryLine);
    const { width: textWidth } = metrics;
    if (textWidth < width) {
      // Word fits
      line = tryLine;
    } else if (y + lineHeight <= height) {
      // Draw line so far and start a new line
      y += lineHeight;
      ctx.fillText(line, x, y);
      line = word;
    } else {
      // Can't fit any more lines
      break;
    }
  }

  if (line && y + lineHeight <= height) {
    y += lineHeight;
    ctx.fillText(line, x, y);
  }

  return y;
}
