let player2Currency = 100;
let selectedEnemyType = "basic";
let gameTimer = 600;
let timerInterval = 1000;

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

let selectedEnemyIndex = 0;
const enemyKeys = Object.keys(enemyTypes);

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

function updateCardSelection() {
  document
    .querySelectorAll(".enemy-card")
    .forEach((el) => el.classList.remove("selected"));

  const selectedCard = document.querySelector(
    `.enemy-card[data-index="${selectedEnemyIndex}"]`
  );
  if (selectedCard) {
    selectedCard.classList.add("selected");
  }

  const selectedKey = enemyKeys[selectedEnemyIndex];
  selectedEnemyDisplay.textContent =
    selectedKey.charAt(0).toUpperCase() + selectedKey.slice(1);
}
updateCardSelection();

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    selectedEnemyIndex = (selectedEnemyIndex + 1) % enemyKeys.length;
    updateCardSelection();
  } else if (event.key === "ArrowLeft") {
    selectedEnemyIndex =
      (selectedEnemyIndex - 1 + enemyKeys.length) % enemyKeys.length;
    updateCardSelection();
  } else if (event.key === "Enter") {
    const selectedEnemyType = enemyKeys[selectedEnemyIndex];
    const enemyData = enemyTypes[selectedEnemyType];
    if (player2Currency >= enemyData.cost) {
      player2Currency -= enemyData.cost;

      let enemyPath = path;
      if (selectedMap === "map2") {
        enemyPath = Math.random() < 0.5 ? pathMap2First : pathMap2Second;
      }

      let newEnemy;
      if (enemyData.class === ThrowingEnemy) {
        newEnemy = new ThrowingEnemy(
          enemyPath,
          2,
          150,
          8000,
          BasicEnemy,
          enemies
        );
      } else if (enemyData.class === ShieldedBossEnemy) {
        newEnemy = new ShieldedBossEnemy(enemyPath, enemies);
      } else if (enemyData.class === BalloonEnemy) {
        newEnemy = new BalloonEnemy(
          enemyPath,
          this.speed,
          this.dropInterval,
          ParachuteEnemy,
          enemies
        );
      } else {
        newEnemy = new enemyData.class(enemyPath);
      }

      if (enemySounds[enemyData.class.name]) {
        enemySounds[enemyData.class.name].play();
      }

      enemies.push(newEnemy);
    }
  }
});

const smallGainInterval = 5000;
const largeGainInterval = 60000;

let smallGainAmount = 5;
let largeGainAmount = 100;

let gameProgress = 1;

function addCurrency(amount) {
  player2Currency += amount;
  console.log(`Currency Added: ${amount}. Total: ${player2Currency}`);
}

setInterval(() => {
  let scaledSmallGain = smallGainAmount + Math.floor(gameProgress * 0.5);
  addCurrency(scaledSmallGain);
}, smallGainInterval);

setInterval(() => {
  let scaledLargeGain = largeGainAmount + Math.floor(gameProgress * 5);
  addCurrency(scaledLargeGain);
}, largeGainInterval);

setInterval(() => {
  gameProgress++;
  console.log(`Game Progression Level: ${gameProgress}`);
}, 10000);

function updateCurrencyDisplay() {
  document.getElementById(
    "player2-currency"
  ).innerText = `Currency: ${player2Currency}`;
}
setInterval(updateCurrencyDisplay, 100);

const timerDisplay = document.getElementById("game-timer-text");
const timerCircle = document.getElementById("game-timer-circle");
const timerContainer = document.getElementById("game-timer-container");

function initializeTimer(gameMode) {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

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

function endGame(winner) {
  stopTimer();
  if (selectedMode === "multiplayer") {
    alert(winner);
    location.reload();
  }
}
let autoSpawnTimer = 0;
const autoSpawnInterval = 6000;
const maxAutoSpawnEnemies = 5;

function autoSpawnBasicEnemy(deltaTime, enemiesArray, initialPath) {
  autoSpawnTimer -= deltaTime;

  if (
    autoSpawnTimer <= 0 &&
    countAutoSpawnedEnemies(enemiesArray) < maxAutoSpawnEnemies
  ) {
    let enemyPath = initialPath;
    if (selectedMap === "map2") {
      enemyPath = Math.random() < 0.5 ? pathMap2First : pathMap2Second;
    }

    const basicEnemy = new BasicEnemy(enemyPath);
    basicEnemy.autoSpawned = true;

    enemySounds["BasicEnemy"].play();

    enemiesArray.push(basicEnemy);

    autoSpawnTimer = autoSpawnInterval;
  }
}

function countAutoSpawnedEnemies(enemiesArray) {
  return enemiesArray.filter((enemy) => enemy.autoSpawned).length;
}
