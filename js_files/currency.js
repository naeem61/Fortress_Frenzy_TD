let playerCurrency = 300;

const currencyImg = new Image();
currencyImg.src = "assets/stats_ui/Currency_icon.png";

function drawTextWithIcon(context, img, text, x, y) {
  const iconSize = 70;
  const textOffset = 65;

  context.save();

  context.globalAlpha = 0.7;

  context.drawImage(img, x, y - iconSize + 5, iconSize, iconSize);

  context.restore();

  context.fillStyle = "white";
  context.font = "bold 18px Arial";
  const textHeight = 18;
  const iconCenter = y - iconSize / 2 + 5;
  const textY = iconCenter + textHeight / 3;

  context.fillText(text, x + textOffset, textY);
}

function drawCurrency(context) {
  drawTextWithIcon(context, currencyImg, `${playerCurrency}`, 250, 60);
}
