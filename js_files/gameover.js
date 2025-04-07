let playerHealth = 10;
let gameOver = false;

function showGameOver() {
  const context = canvas.getContext("2d");

  context.fillStyle = "rgba(0, 0, 0, 0.8)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "white";
  context.font = "48px Arial";
  context.textAlign = "center";
  context.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 40);

  context.font = "28px Arial";
  context.fillText(
    `You survived ${currentWaveIndex} waves!`,
    canvas.width / 2,
    canvas.height / 2
  );

  context.font = "24px Arial";
  context.fillText(
    "Press R to Restart",
    canvas.width / 2,
    canvas.height / 2 + 50
  );

  gameOver = true;

  cancelAnimationFrame(animationFrame);
}

const healthImg = new Image();
healthImg.src = "assets/stats_ui/health_icon.png";

function drawHealth(context) {
  drawTextWithIcon(context, healthImg, `${playerHealth}`, 360, 60);
}

window.addEventListener("keydown", (event) => {
  if (gameOver && event.key === "r") {
    location.reload();
  }
});
