let player2Currency = 100;
let selectedEnemyType = "basic"; // Default enemy type
let gameTimer = 600; // Timer in seconds (5 minutes)
let timerInterval = 1000; // Timer updates every second

const enemyTypes = {
  Minotaur: {
    cost: 10,
    class: BasicEnemy,
    image: "assets/Minotaur_alone.png",
  },
  Goblin: {
    cost: 20,
    class: FastEnemy,
    image: "assets/FastEnemy_goblin_alone.png",
  },
  Troll: { cost: 50, class: TankEnemy, image: "assets/TankEnemyOrc_Alone.png" },
  EyeSpawn: {
    cost: 30,
    class: FlyingEnemy,
    image: "assets/FlyingEnemy_ALONE.png",
  },
  SkyBeetle: {
    cost: 40,
    class: FlyingTankEnemy,
    image: "assets/FlyingTank_ALONE.png",
  },
  AirMarauder: {
    cost: 80,
    class: BalloonEnemy,
    image: "assets/BalloonEnemySpriteSheet_ALONE.png",
  },
  ImpWing: {
    cost: 70,
    class: CowardEnemy,
    image: "assets/cowardEnemy_Alone.png",
  },
  BoneGuard: {
    cost: 70,
    class: ShieldedEnemy,
    image: "assets/shieldedEnemy_Alone.png",
  },
  SlingBeast: {
    cost: 80,
    class: ThrowingEnemy,
    image: "assets/ThrowingEnemy_ALONE.png",
  },
  HexWraith: {
    cost: 70,
    class: DisablingEnemy,
    image: "assets/DisablerEnemySorceress_ALONE.png",
  },
  HealMage: {
    cost: 60,
    class: HealingEnemy,
    image: "assets/HealingEnemySpriteSheet_ALONE.png",
  },
  Scientist: {
    cost: 100,
    class: SmartEnemy,
    image: "assets/smartEnemy_alone.png",
  },
  Brute: {
    cost: 200,
    class: ShieldedBossEnemy,
    image: "assets/ShieldedBossSpriteSheet_ALONE.png",
  },
  VenomSpine: {
    cost: 180,
    class: DestroyerBossEnemy,
    image: "assets/DestroyerBoss_WormSpriteSheet_ALONE.png",
  },
  SpikeMauler: {
    cost: 200,
    class: RageBossEnemy,
    image: "assets/RageEnemyBossSpritesheet_ALONEpng.png",
  },

  StormShroud: {
    cost: 120,
    class: WeatherBoss,
    image: "assets/WeatherBoss_ALONE.png",
  },

  WisdomMage: {
    cost: 90,
    class: AdaptiveEnemy,
    image: "assets/Adaptiv_ALONE.png",
  },
};

const enemySelectionContainer = document.getElementById("enemy-selection");
const selectedEnemyDisplay = document.getElementById("selected-enemy");

// Set initial values
let selectedEnemyIndex = 0;
const enemyKeys = Object.keys(enemyTypes);

// Populate the enemy cards
enemyKeys.forEach((key, index) => {
  const enemyData = enemyTypes[key];
  const card = document.createElement("div");
  card.className = "enemy-card";
  card.dataset.index = index;
  card.innerHTML = `
  <h4>${key.charAt(0).toUpperCase() + key.slice(1)}</h4>
  <img src="${enemyData.image}" alt="${key} enemy" />
  <p>Cost: ${enemyData.cost}</p>
`;
  enemySelectionContainer.appendChild(card);
});

// Highlight the default selected card
function updateCardSelection() {
  // Remove 'selected' class from all cards
  document
    .querySelectorAll(".enemy-card")
    .forEach((el) => el.classList.remove("selected"));

  // Add 'selected' class to the current card
  const selectedCard = document.querySelector(
    `.enemy-card[data-index="${selectedEnemyIndex}"]`
  );
  if (selectedCard) {
    selectedCard.classList.add("selected");
  }

  // Update selected enemy display
  const selectedKey = enemyKeys[selectedEnemyIndex];
  selectedEnemyDisplay.textContent =
    selectedKey.charAt(0).toUpperCase() + selectedKey.slice(1);
}
updateCardSelection(); // Initial setup

// Add event listener for arrow keys
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    selectedEnemyIndex = (selectedEnemyIndex + 1) % enemyKeys.length;
    updateCardSelection();
  } else if (event.key === "ArrowLeft") {
    selectedEnemyIndex =
      (selectedEnemyIndex - 1 + enemyKeys.length) % enemyKeys.length;
    updateCardSelection();
  } else if (event.key === "Enter") {
    // Send selected enemy if Player 2 has enough currency
    const selectedEnemyType = enemyKeys[selectedEnemyIndex];
    const enemyData = enemyTypes[selectedEnemyType];
    if (player2Currency >= enemyData.cost) {
      player2Currency -= enemyData.cost;

      // Determine the path for map2
      let enemyPath = path;
      if (selectedMap === "map2") {
        // Randomly select path for each enemy on map2
        enemyPath = Math.random() < 0.5 ? pathMap2First : pathMap2Second;
      }

      let newEnemy;
      if (enemyData.class === ThrowingEnemy) {
        // Ensure all required parameters are passed correctly
        newEnemy = new ThrowingEnemy(
          enemyPath, // Path to follow
          2, // Speed of ThrowingEnemy
          150, // Health of ThrowingEnemy
          8000, // Interval for throwing new enemies
          BasicEnemy, // Type of enemy to throw
          enemies // Pass the current enemies array for spawning
        );
      } else if (enemyData.class === ShieldedBossEnemy) {
        newEnemy = new ShieldedBossEnemy(
          enemyPath, // Path to follow
          enemies // Pass the current enemies array for spawning the ShieldedEnemy
        );
      } else if (enemyData.class === BalloonEnemy) {
        newEnemy = new BalloonEnemy(
          enemyPath, // Path to follow
          this.speed, // Speed of BalloonEnemy
          this.dropInterval, // Drop interval (5 seconds)
          ParachuteEnemy, // Type of enemy to drop
          enemies // Pass the current enemies array for spawning
        );
      } else {
        newEnemy = new enemyData.class(enemyPath); // Generic enemy initialization
      }

      if (enemySounds[enemyData.class.name]) {
        enemySounds[enemyData.class.name].play();
      }

      enemies.push(newEnemy); // Push all enemies to the same array
    }
  }
});

// Frequency settings (in milliseconds)
const smallGainInterval = 5000; // 3 seconds
const largeGainInterval = 60000; // 20 seconds

// Scaling values
let smallGainAmount = 5; // Initial periodic gain
let largeGainAmount = 100; // Initial large sum gain

// Track game progression (e.g., wave count or time)
let gameProgress = 1;

// Update player's currency
function addCurrency(amount) {
  player2Currency += amount;
  console.log(`Currency Added: ${amount}. Total: ${player2Currency}`);
}

// Periodic small gains
setInterval(() => {
  // Scale small gain amount based on progression
  let scaledSmallGain = smallGainAmount + Math.floor(gameProgress * 0.5);
  addCurrency(scaledSmallGain);
}, smallGainInterval);

// Large timed sums
setInterval(() => {
  // Scale large gain amount more significantly
  let scaledLargeGain = largeGainAmount + Math.floor(gameProgress * 5);
  addCurrency(scaledLargeGain);
}, largeGainInterval);

// Example: Progress scaling (increment every wave or time)
setInterval(() => {
  gameProgress++;
  console.log(`Game Progression Level: ${gameProgress}`);
}, 10000); // Increment progression every 10 seconds

function updateCurrencyDisplay() {
  document.getElementById(
    "player2-currency"
  ).innerText = `Currency: ${player2Currency}`;
}
setInterval(updateCurrencyDisplay, 100); // Refresh currency display frequently

const timerDisplay = document.getElementById("game-timer-text");
const timerCircle = document.getElementById("game-timer-circle");
const timerContainer = document.getElementById("game-timer-container");

function initializeTimer(gameMode) {
  // Reset timer state

  // Clear any existing timer
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // Only initialize timer for multiplayer mode
  if (gameMode === "multiplayer") {
    timerContainer.style.display = "block";
    startTimer();
  } else {
    timerContainer.style.display = "none";
  }
}

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    if (gameTimer > 0) {
      gameTimer--;
      updateTimerDisplay();
    } else {
      endGame("Player 1 wins!");
      clearInterval(timerInterval);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const progress = (gameTimer / 300) * 100;
  timerCircle.style.setProperty("--progress", `${progress}%`);

  const minutes = Math.floor(gameTimer / 60);
  const seconds = gameTimer % 60;
  timerDisplay.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Modified endGame function
function endGame(winner) {
  stopTimer();
  if (selectedMode === "multiplayer") {
    alert(winner);
    location.reload();
  }
}
let autoSpawnTimer = 0; // Time since the last auto-spawn
const autoSpawnInterval = 6000; // Auto-spawn a BasicEnemy every 6 seconds
const maxAutoSpawnEnemies = 5; // Maximum auto-spawned BasicEnemies at a time

function autoSpawnBasicEnemy(deltaTime, enemiesArray, initialPath) {
  // Decrement the auto-spawn timer by the elapsed time
  autoSpawnTimer -= deltaTime;

  // Check if it's time to spawn a new enemy
  if (
    autoSpawnTimer <= 0 &&
    countAutoSpawnedEnemies(enemiesArray) < maxAutoSpawnEnemies
  ) {
    // Determine the path for map2
    let enemyPath = initialPath;
    if (selectedMap === "map2") {
      // Randomly select path for each auto-spawned enemy on map2
      enemyPath = Math.random() < 0.5 ? pathMap2First : pathMap2Second;
    }

    const basicEnemy = new BasicEnemy(enemyPath);
    basicEnemy.autoSpawned = true; // Mark the enemy as auto-spawned

    enemySounds["BasicEnemy"].play();

    enemiesArray.push(basicEnemy);

    // Reset the timer after spawning an enemy
    autoSpawnTimer = autoSpawnInterval;
  }
}

// Count auto-spawned BasicEnemies in the enemies array
function countAutoSpawnedEnemies(enemiesArray) {
  return enemiesArray.filter((enemy) => enemy.autoSpawned).length;
}
