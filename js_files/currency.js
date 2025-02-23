let playerCurrency = 300;

const currencyImg = new Image();
currencyImg.src = "assets/stats_ui/Currency_icon.png"; // Adjust path as needed

function drawTextWithIcon(context, img, text, x, y) {
  const iconSize = 70;
  const textOffset = 65;

  // Save the current context state
  context.save();

  // Set transparency for the icon
  context.globalAlpha = 0.7; // Adjust this value between 0 and 1 for desired transparency

  // Draw icon
  context.drawImage(img, x, y - iconSize + 5, iconSize, iconSize);

  // Restore context to full opacity for the text
  context.restore();

  // Calculate text metrics to center vertically
  context.fillStyle = "white";
  context.font = "bold 18px Arial";
  const textHeight = 18;
  const iconCenter = y - iconSize / 2 + 5;
  const textY = iconCenter + textHeight / 3;

  // Draw text
  context.fillText(text, x + textOffset, textY);
}

function drawCurrency(context) {
  drawTextWithIcon(context, currencyImg, `${playerCurrency}`, 250, 60);
}
