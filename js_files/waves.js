class Wave {
  constructor(enemyTypes, spawnInterval, totalEnemies) {
    this.enemyTypes = enemyTypes;
    this.spawnInterval = spawnInterval;
    this.totalEnemies = totalEnemies;
    this.enemiesSpawned = 0;
    this.lastSpawnTime = 0;
    this.hasPlayedStartSound = false;
  }

  spawnEnemy(currentTime, enemiesArray, initialPath) {
    if (!this.hasPlayedStartSound) {
      gameSounds.waveStart.play();
      this.hasPlayedStartSound = true;
    }

    if (
      this.enemiesSpawned < this.totalEnemies &&
      currentTime - this.lastSpawnTime >= this.spawnInterval
    ) {
      let enemyPath = initialPath;

      if (
        !arcadeActive &&
        typeof selectedMap !== "undefined" &&
        selectedMap === "map2"
      ) {
        enemyPath = Math.random() < 0.5 ? pathMap2First : pathMap2Second;
      }
      const enemyClasses = {
        BasicEnemy: BasicEnemy,
        FastEnemy: FastEnemy,
        TankEnemy: TankEnemy,
        FlyingEnemy: FlyingEnemy,
        FlyingTankEnemy: FlyingTankEnemy,
        BalloonEnemy: BalloonEnemy,
        ShieldedEnemy: ShieldedEnemy,
        ThrowingEnemy: ThrowingEnemy,
        HealingEnemy: HealingEnemy,
        DisablingEnemy: DisablingEnemy,
        ShieldedBossEnemy: ShieldedBossEnemy,
        DestroyerBossEnemy: DestroyerBossEnemy,
        RageBossEnemy: RageBossEnemy,
        SmartEnemy: SmartEnemy,
        CowardEnemy: CowardEnemy,
        WeatherBoss: WeatherBoss,
        AdaptiveEnemy: AdaptiveEnemy,
      };

      const enemyType =
        this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
      const EnemyClass = enemyClasses[enemyType];

      let newEnemy;
      if (EnemyClass === ThrowingEnemy) {
        newEnemy = new ThrowingEnemy(
          enemyPath,
          2,
          150,
          8000,
          BasicEnemy,
          enemiesArray
        );
      } else if (EnemyClass === ShieldedBossEnemy) {
        newEnemy = new ShieldedBossEnemy(enemyPath, enemiesArray);
      } else if (EnemyClass === BalloonEnemy) {
        newEnemy = new BalloonEnemy(
          enemyPath,
          this.speed,
          this.dropInterval,
          ParachuteEnemy,
          enemiesArray
        );
      } else {
        newEnemy = new EnemyClass(enemyPath);
      }

      if (enemySounds[enemyType]) {
        enemySounds[enemyType].play();
      }

      enemiesArray.push(newEnemy);

      this.enemiesSpawned++;
      this.lastSpawnTime = currentTime;
    }
  }

  isWaveComplete() {
    return this.enemiesSpawned >= this.totalEnemies;
  }
}

const enemyCosts = {
  BasicEnemy: 1,
  FastEnemy: 1.5,
  TankEnemy: 2,
  FlyingEnemy: 2,
  FlyingTankEnemy: 3,
  BalloonEnemy: 3,
  CowardEnemy: 2,
  ShieldedEnemy: 3,
  ThrowingEnemy: 4,
  HealingEnemy: 2.5,
  DisablingEnemy: 3,
  ShieldedBossEnemy: 50,
  DestroyerBossEnemy: 50,
  RageBossEnemy: 50,
  SmartEnemy: 7,
  WeatherBoss: 20,
  AdaptiveEnemy: 4,
};

const baseDifficulty = 10;
const difficultyIncrement = 5;

function generateWave(difficultyBudget) {
  const availableEnemies = Object.keys(enemyCosts);
  const enemies = [];
  const initialBudget = difficultyBudget;

  while (difficultyBudget > 0) {
    const affordableEnemies = availableEnemies.filter(
      (type) => enemyCosts[type] <= difficultyBudget
    );

    if (affordableEnemies.length === 0) {
      break;
    }

    const enemyType =
      affordableEnemies[Math.floor(Math.random() * affordableEnemies.length)];
    const cost = enemyCosts[enemyType];

    enemies.push(enemyType);
    difficultyBudget -= cost;
  }

  while (difficultyBudget > 0) {
    const affordableEnemies = availableEnemies.filter(
      (type) => enemyCosts[type] <= difficultyBudget
    );

    if (affordableEnemies.length === 0) {
      break;
    }

    const bestFit = affordableEnemies.reduce((best, current) => {
      const currentCost = enemyCosts[current];
      const bestCost = enemyCosts[best];

      return currentCost > bestCost ? current : best;
    });

    enemies.push(bestFit);
    difficultyBudget -= enemyCosts[bestFit];
  }

  if (enemies.length === 0) {
    enemies.push("BasicEnemy");
  }

  return enemies;
}

function calculateSpawnInterval(totalEnemies, difficultyBudget) {
  const baseInterval = 1500;

  const intensityFactor = Math.max(1, difficultyBudget / totalEnemies / 2);

  return Math.min(Math.max(baseInterval / intensityFactor, 800), 3000);
}

function generateWaves(totalWaves) {
  const waves = [];

  waves.push(new Wave(["BasicEnemy"], 2000, 10));
  waves.push(new Wave(["FastEnemy"], 1500, 12));
  waves.push(new Wave(["TankEnemy"], 3000, 5));

  let currentDifficulty = baseDifficulty + 4 * difficultyIncrement;

  for (let i = 0; i < totalWaves; i++) {
    currentDifficulty = Math.max(
      currentDifficulty,
      baseDifficulty + (i + 4) * difficultyIncrement
    );

    const enemyTypes = generateWave(currentDifficulty);
    const spawnInterval = calculateSpawnInterval(
      enemyTypes.length,
      currentDifficulty
    );
    waves.push(new Wave(enemyTypes, spawnInterval, enemyTypes.length));

    currentDifficulty += difficultyIncrement;
  }

  return waves;
}

function calculateSpawnInterval(totalEnemies, difficultyBudget) {
  const baseInterval = 1500;

  const intensityFactor = Math.max(1, difficultyBudget / totalEnemies / 2);

  return Math.min(Math.max(baseInterval / intensityFactor, 800), 3000);
}

function generateWaves(totalWaves) {
  const waves = [];

  waves.push(new Wave(["BasicEnemy"], 2000, 10));
  waves.push(new Wave(["FastEnemy"], 1500, 12));
  waves.push(new Wave(["TankEnemy"], 3000, 5));

  let currentDifficulty = baseDifficulty + 4 * difficultyIncrement;

  for (let i = 0; i < totalWaves; i++) {
    currentDifficulty = Math.max(
      currentDifficulty,
      baseDifficulty + (i + 4) * difficultyIncrement
    );

    const enemyTypes = generateWave(currentDifficulty);
    const spawnInterval = calculateSpawnInterval(
      enemyTypes.length,
      currentDifficulty
    );
    waves.push(new Wave(enemyTypes, spawnInterval, enemyTypes.length));

    currentDifficulty += difficultyIncrement;
  }

  return waves;
}

const totalWaves = 100;
const waves = generateWaves(totalWaves);

waves.forEach((wave, index) => {});

const waveImg = new Image();
waveImg.src = "assets/stats_ui/waves_icon.png";

function drawWaves(context) {
  drawTextWithIcon(context, waveImg, `${currentWaveIndex + 1}`, 760, 60);
}

const enemySounds = {
  BasicEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/mixkit-wild-lion-animal-roar-6.mp3"
  ),
  FastEnemy: new AudioPool("assets/enemy_spawning_sounds/FastEnemy.mp3"),
  TankEnemy: new AudioPool("assets/enemy_spawning_sounds/TankEnemy.mp3"),
  FlyingEnemy: new AudioPool("assets/enemy_spawning_sounds/FlyingEnemy.mp3"),
  FlyingTankEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/flapping-39306.mp3"
  ),
  BalloonEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/balloon-inflation-85039.mp3"
  ),
  ShieldedEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/step-skeleton-47785.mp3"
  ),
  ThrowingEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/ThrowingEnemy.mp3"
  ),
  HealingEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/lighting-a-fire-14421.mp3"
  ),
  DisablingEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/electro_hit_01-95940.mp3"
  ),
  ShieldedBossEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/dragon-roar-90344.mp3"
  ),
  DestroyerBossEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/breeze-of-blood-122253.mp3"
  ),
  RageBossEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/mixkit-angry-monster-scream-1963.mp3"
  ),
  SmartEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/laughter-01-105588.mp3"
  ),
  CowardEnemy: new AudioPool("assets/enemy_spawning_sounds/CowardEnemy.mp3"),
  WeatherBoss: new AudioPool(
    "assets/enemy_spawning_sounds/storm-rain-263044.mp3"
  ),
  AdaptiveEnemy: new AudioPool(
    "assets/enemy_spawning_sounds/hmm-reflexion-male-voice-thinking-101442.mp3"
  ),
};

const gameSounds = {
  ...enemySounds,
  waveStart: new AudioPool("assets/New_Wave_sound/new-level-142995.mp3"),
};

function setEnemySoundVolume(volume) {
  Object.values(enemySounds).forEach((pool) => {
    pool.setVolume(volume);
  });
}

function toggleEnemySounds(muted) {
  Object.values(enemySounds).forEach((pool) => {
    pool.mute(muted);
  });
}

function cleanupEnemySounds() {
  Object.values(enemySounds).forEach((pool) => {
    pool.audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  });
}
