class Wave {
  constructor(enemyTypes, spawnInterval, totalEnemies) {
    this.enemyTypes = enemyTypes; // Array of enemy types for variety
    this.spawnInterval = spawnInterval; // Time between enemy spawns
    this.totalEnemies = totalEnemies;
    this.enemiesSpawned = 0;
    this.lastSpawnTime = 0;
    this.hasPlayedStartSound = false; // Add this flag
  }

  spawnEnemy(currentTime, enemiesArray, initialPath) {
    // Play wave start sound on first spawn of the wave
    if (!this.hasPlayedStartSound) {
      gameSounds.waveStart.play();
      this.hasPlayedStartSound = true;
    }

    if (
      this.enemiesSpawned < this.totalEnemies &&
      currentTime - this.lastSpawnTime >= this.spawnInterval
    ) {
      // Determine the path for this enemy
      let enemyPath = initialPath;
      // Only check for map2 paths if we're in classic/multiplayer mode
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
      const EnemyClass = enemyClasses[enemyType]; // Map string to constructor

      let newEnemy;
      if (EnemyClass === ThrowingEnemy) {
        newEnemy = new ThrowingEnemy(
          enemyPath, // Path to follow
          2, // Speed of ThrowingEnemy
          150, // Health of ThrowingEnemy
          8000, // Interval for throwing new enemies
          BasicEnemy, // Type of enemy to throw
          enemiesArray // Pass the current enemies array for spawning
        );
      } else if (EnemyClass === ShieldedBossEnemy) {
        newEnemy = new ShieldedBossEnemy(
          enemyPath, // Path to follow
          enemiesArray // Pass the current enemies array for spawning the ShieldedEnemy
        );
      } else if (EnemyClass === BalloonEnemy) {
        newEnemy = new BalloonEnemy(
          enemyPath, // Path to follow
          this.speed, // Speed of BalloonEnemy
          this.dropInterval, // Drop interval (5 seconds)
          ParachuteEnemy, // Type of enemy to drop
          enemiesArray // Pass the current enemies array for spawning
        );
      } else {
        newEnemy = new EnemyClass(enemyPath); // Generic enemy initialization
      }

      // Play spawn sound for the enemy type
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

// // Initializing wave example:
//  waves = [
//   new Wave([BasicEnemy, FastEnemy], 1000, 10), // Wave with mixed enemies every second
//   new Wave([FastEnemy, BasicEnemy], 1500, 15), // Next wave with different enemies every 1.5 sec
//   new Wave([TankEnemy, ShieldedEnemy], 1500, 10), // Next wave with different enemies every 1.5 sec
//   new Wave([TankEnemy, ThrowingEnemy, HealingEnemy], 1500, 15), // Next wave with different enemies every 1.5 sec
//   new Wave([DisablingEnemy, ThrowingEnemy, HealingEnemy], 1500, 25), // Next wave with different enemies every 1.5 sec
//   new Wave([DisablingEnemy, ThrowingEnemy, HealingEnemy], 1500, 35), // Next wave with different enemies every 1.5 sec
// ];

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

const baseDifficulty = 10; // Starting difficulty
const difficultyIncrement = 5; // Increase per wave

function generateWave(difficultyBudget) {
  const availableEnemies = Object.keys(enemyCosts);
  const enemies = [];
  const initialBudget = difficultyBudget;

  // First pass: randomly select enemies until we can't fit any more
  while (difficultyBudget > 0) {
    // Filter enemies that fit within the remaining budget
    const affordableEnemies = availableEnemies.filter(
      (type) => enemyCosts[type] <= difficultyBudget
    );

    if (affordableEnemies.length === 0) {
      break;
    }

    // Completely random selection from affordable enemies
    const enemyType =
      affordableEnemies[Math.floor(Math.random() * affordableEnemies.length)];
    const cost = enemyCosts[enemyType];

    enemies.push(enemyType);
    difficultyBudget -= cost;
  }

  // Second pass: if we have leftover budget, fill it with whatever fits
  while (difficultyBudget > 0) {
    const affordableEnemies = availableEnemies.filter(
      (type) => enemyCosts[type] <= difficultyBudget
    );

    if (affordableEnemies.length === 0) {
      // If we can't fit any more enemies, we're done
      break;
    }

    // Find the enemy that makes best use of remaining budget
    const bestFit = affordableEnemies.reduce((best, current) => {
      const currentCost = enemyCosts[current];
      const bestCost = enemyCosts[best];
      // Choose the enemy that uses more of the remaining budget
      return currentCost > bestCost ? current : best;
    });

    enemies.push(bestFit);
    difficultyBudget -= enemyCosts[bestFit];
  }

  // Ensure the wave has at least one enemy
  if (enemies.length === 0) {
    enemies.push("BasicEnemy");
  }

  return enemies;
}

function calculateSpawnInterval(totalEnemies, difficultyBudget) {
  const baseInterval = 1500;
  // Adjust spawn interval based on wave difficulty and enemy count
  const intensityFactor = Math.max(1, difficultyBudget / totalEnemies / 2);
  // Ensure spawn interval doesn't get too short or too long
  return Math.min(Math.max(baseInterval / intensityFactor, 800), 3000);
}

function generateWaves(totalWaves) {
  const waves = [];

  // First four fixed waves for easier onboarding
  waves.push(new Wave(["BasicEnemy"], 2000, 10));
  waves.push(new Wave(["FastEnemy"], 1500, 12));
  waves.push(new Wave(["TankEnemy"], 3000, 5));

  let currentDifficulty = baseDifficulty + 4 * difficultyIncrement;

  for (let i = 0; i < totalWaves; i++) {
    // Ensure difficulty always increases
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
  // Adjust spawn interval based on wave difficulty and enemy count
  const intensityFactor = Math.max(1, difficultyBudget / totalEnemies / 2);
  // Ensure spawn interval doesn't get too short or too long
  return Math.min(Math.max(baseInterval / intensityFactor, 800), 3000);
}

function generateWaves(totalWaves) {
  const waves = [];

  // First four fixed waves for easier onboarding
  waves.push(new Wave(["BasicEnemy"], 2000, 10));
  waves.push(new Wave(["FastEnemy"], 1500, 12));
  waves.push(new Wave(["TankEnemy"], 3000, 5));

  let currentDifficulty = baseDifficulty + 4 * difficultyIncrement;

  for (let i = 0; i < totalWaves; i++) {
    // Ensure difficulty always increases
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

// function applyWaveModifiers(wave, waveIndex) {
//   if ((waveIndex + 1) % 7 === 0) {
//     // Check if the wave number is a multiple of 7
//     const bossCount = Math.pow(2, Math.floor((waveIndex + 1) / 7) - 1); // Calculate the number of bosses
//     wave.enemyTypes = ["ShieldedBossEnemy"];
//     wave.totalEnemies = bossCount;
//     wave.spawnInterval = 3000; // Keep a reasonable spawn interval
//     console.log(
//       `Wave ${waveIndex + 1}: Spawning ${bossCount} ShieldedBossEnemies!`
//     );
//   } else if ((waveIndex + 1) % 10 === 0) {
//     // Every 10th wave is a Boss Wave
//     wave.enemyTypes = ["DestroyerBossEnemy"];
//     wave.totalEnemies = 1;
//     wave.spawnInterval = 3000;
//     // } else if (Math.random() < 0.2) {
//     //   // 20% chance for Swarm Wave
//     //   wave.enemyTypes = ["BasicEnemy", "FastEnemy"];
//     //   wave.totalEnemies *= 2;
//     //   wave.spawnInterval /= 2;
//   }
//   // // Other modifiers can be added similarly
// }

const totalWaves = 100; // Number of waves
const waves = generateWaves(totalWaves);

waves.forEach((wave, index) => {
  // applyWaveModifiers(wave, index); // Add special wave types
});

const waveImg = new Image();
waveImg.src = "assets/stats_ui/waves_icon.png";
// Display currency
function drawWaves(context) {
  drawTextWithIcon(context, waveImg, `${currentWaveIndex + 1}`, 760, 60);
}

// Create audio pools for each enemy type
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
  ...enemySounds, // Keep existing enemy sounds
  waveStart: new AudioPool("assets/New_Wave_sound/new-level-142995.mp3"), // Add your wave start sound file
};

// Volume control function
function setEnemySoundVolume(volume) {
  Object.values(enemySounds).forEach((pool) => {
    pool.setVolume(volume);
  });
}

// Mute control function
function toggleEnemySounds(muted) {
  Object.values(enemySounds).forEach((pool) => {
    pool.mute(muted);
  });
}

// Cleanup function
function cleanupEnemySounds() {
  Object.values(enemySounds).forEach((pool) => {
    pool.audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  });
}
