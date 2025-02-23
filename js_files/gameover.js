let playerHealth = 10; // Starting health
let gameOver = false; // A flag to check if the game is over

function showGameOver() {
  const context = canvas.getContext("2d");

  // Dark overlay
  context.fillStyle = "rgba(0, 0, 0, 0.8)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Game Over text
  context.fillStyle = "white";
  context.font = "48px Arial";
  context.textAlign = "center";
  context.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 40);

  // Display waves survived
  context.font = "28px Arial";
  context.fillText(
    `You survived ${currentWaveIndex} waves!`,
    canvas.width / 2,
    canvas.height / 2
  );

  // Restart instructions
  context.font = "24px Arial";
  context.fillText(
    "Press R to Restart",
    canvas.width / 2,
    canvas.height / 2 + 50
  );

  gameOver = true;
  // Stop the game loop
  cancelAnimationFrame(animationFrame);
}

const healthImg = new Image();
healthImg.src = "assets/stats_ui/health_icon.png";
// Display currency
function drawHealth(context) {
  drawTextWithIcon(context, healthImg, `${playerHealth}`, 360, 60);
}
// Add a keydown listener for "R" to reload the page
window.addEventListener("keydown", (event) => {
  if (gameOver && event.key === "r") {
    location.reload(); // Reloads the page
  }
});
