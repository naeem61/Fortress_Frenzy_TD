const defaultTowerSpriteSheet = new Image();
defaultTowerSpriteSheet.src = "assets/DefaultTower.png";

const splashTowerSpriteSheet = new Image();
splashTowerSpriteSheet.src = "assets/tower_sprites/splash_tower.png";

const XrayTowerSpriteSheet = new Image();
XrayTowerSpriteSheet.src = "assets/tower_sprites/xray.png";

const sniperTowerSpriteSheet = new Image();
sniperTowerSpriteSheet.src = "assets/tower_sprites/sniper_tower.png";

const iceTowerSpriteSheet = new Image();
iceTowerSpriteSheet.src = "assets/tower_sprites/ice_tower.png";

const airDefenceTowerSpriteSheet = new Image();
airDefenceTowerSpriteSheet.src = "assets/tower_sprites/air_defence.png";

splashTowerSpriteSheet.onload = () => {
  const totalWidth = splashTowerSpriteSheet.width; // Total width of the sprite sheet
  const totalHeight = splashTowerSpriteSheet.height; // Total height of the sprite sheet

  const spriteWidth = totalWidth / 2; // Divide by the number of sprites
  const spriteHeight = totalHeight; // Height remains the same

  const numSprites = 2;
  const gap = (totalWidth - spriteWidth * numSprites) / (numSprites - 1);

  console.log(`Width: ${spriteWidth}, Height: ${spriteHeight}, Gap: ${gap}`);
};

// Tower class definition
class Tower {
  constructor(
    x,
    y,
    range,
    damage,
    fireRate,
    upgradeCost,
    spriteInfo,
    canTargetFlying = false
  ) {
    this.x = x;
    this.y = y;
    this.range = range;
    this.damage = damage;
    this.fireRate = fireRate;
    this.target = null;
    this.lastFired = 0;
    this.disabled = false; // New property to track disabled state
    this.upgradeCost = upgradeCost;
    this.level = 1; // Track the current upgrade level

    // Sprite information
    this.spriteInfo = spriteInfo; // Include sprite info as a parameter
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.animationSpeed = 100; // Time in ms per frame

    this.canTargetFlying = canTargetFlying;

    this.isRaged = false;
    this.rageEndTime = 0;

    this.type = "default";
    this.sound = towerSounds[this.type];
  }

  update(currentTime) {
    // Check if the rage effect has expired
    if (this.isRaged && currentTime >= this.rageEndTime) {
      this.fireRate *= this.fireRateMultiplier; // Reset fire rate
      this.isRaged = false;
    }
  }

  // Check if the tower is within any DisablingEnemy's radius
  updateDisabledState(enemies) {
    this.disabled = enemies.some(
      (enemy) =>
        enemy instanceof DisablingEnemy &&
        Math.hypot(enemy.x - this.x * 32, enemy.y - this.y * 32) <=
          enemy.disableRadius
    );
  }

  isEnemyInCanvas(enemy, canvas) {
    // Add padding to prevent firing right at the edge
    const padding = 0;
    return (
      enemy.x >= -padding &&
      enemy.x <= canvas.width + padding &&
      enemy.y >= -padding &&
      enemy.y <= canvas.height + padding
    );
  }

  findTarget(enemies) {
    let highestProgressEnemy = null;
    let maxProgress = -1;
    let shortestDistance = Infinity;

    for (let enemy of enemies) {
      // Skip enemies that aren't within canvas bounds
      if (!this.isEnemyInCanvas(enemy, canvas)) {
        continue;
      }

      // Skip flying enemies if tower can't target them
      if (enemy.isFlying && !this.canTargetFlying) {
        continue;
      }

      const distance = Math.hypot(enemy.x - this.x * 32, enemy.y - this.y * 32);

      // Only consider enemies within range
      if (distance <= this.range) {
        const pathProgress = enemy.currentWaypointIndex / enemy.path.length;

        if (
          pathProgress > maxProgress ||
          (pathProgress === maxProgress && distance < shortestDistance)
        ) {
          maxProgress = pathProgress;
          shortestDistance = distance;
          highestProgressEnemy = enemy;
        }
      }
    }

    this.target = highestProgressEnemy;
  }

  attack(currentTime, projectiles) {
    //checks if the time since the last shot is > firerate, id so a projectile is created and fire rate reset
    if (this.disabled) return;
    if (this.target && currentTime - this.lastFired >= this.fireRate) {
      const projectile = new Projectile(
        this.x * 32 + 16,
        this.y * 32 + 16,
        this.target,
        10,
        this.damage
      );
      projectiles.push(projectile);
      this.lastFired = currentTime; // Reset fire rate timer

      this.playFireSound();
    }
  }

  playFireSound() {
    if (this.sound) {
      this.sound.play();
    }
  }
  upgrade() {
    if (this.level < 3) {
      // Maximum level is 3
      this.level++;
      this.range += 40; // Increase range
      this.damage += 7; // Increase damage
      this.fireRate -= 100; // Increase fire rate (reduce time)
      this.upgradeCost += 50; // Increment cost for upgrades
    } else {
      console.log("Tower is already at maximum level.");
    }
  }

  updateAnimation(deltaTime) {
    if (this.spriteInfo) {
      this.animationTimer += deltaTime;
      if (this.animationTimer >= this.animationSpeed) {
        this.animationTimer = 0;
        this.animationFrame =
          (this.animationFrame + 1) % this.spriteInfo.frames; // Loop animation
      }
    }
  }

  draw(context) {
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames, gap } = this.spriteInfo;
      const spriteX = sx + this.animationFrame * (sw + gap);

      // Save the current context state
      context.save();

      if (this.disabled) {
        // Create a red tint effect for disabled state
        context.globalCompositeOperation = "source-over";
        context.drawImage(
          defaultTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );

        // Add red overlay
        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        // Add slight darkening
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
        // Normal drawing for enabled state
        context.drawImage(
          defaultTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );
      }

      // Restore the context to its original state
      context.restore();
    } else {
      // Fallback: simple rectangle for towers
      context.fillStyle = this.disabled ? "gray" : "blue";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);
    }

    // Indicate the level visually
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Lv${this.level}`, this.x * 32 + 4, this.y * 32 + 20);
  }
}

const defaultTowerSpriteInfo = {
  sx: 0, // X-coordinate of the first frame
  sy: 0, // Y-coordinate of the first frame
  sw: 70, // Width of each frame
  sh: 130, // Height of each frame
  dw: 64, // Width to draw on canvas
  dh: 42, // Height to draw on canvas
  frames: 6, // Number of animation frames
  gap: 0, // Space between frames (if any)
};

class SplashTower extends Tower {
  constructor(x, y) {
    super(x, y, 150, 20, 2000, 80, splashTowerSpriteInfo, false); // Example: range, damage, fire rate, cost
    this.splashRadius = 200; // Splash radius
    this.type = "splash";
    this.animationSpeed = 400;
    this.sound = towerSounds[this.type];
  }

  attack(currentTime, projectiles, enemies) {
    //checks if the time since the last shot is > firerate, id so a projectile is created and fire rate reset
    if (this.disabled) return;
    if (this.target && currentTime - this.lastFired >= this.fireRate) {
      const splashProjectile = new SplashProjectile(
        this.x * 32 + 16,
        this.y * 32 + 16,
        this.target,
        10, // Speed
        this.damage,
        this.splashRadius,
        enemies,
        this.canTargetFlying
      );
      splashProjectile.towerType = "splash"; // Add tower type to projectile
      projectiles.push(splashProjectile);
      this.lastFired = currentTime; // Reset fire rate timer

      this.playFireSound();
    }
  }

  draw(context) {
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames, gap } = this.spriteInfo;
      const spriteX = sx + this.animationFrame * (sw + gap);

      context.save();

      if (this.disabled) {
        // Create a red tint effect for disabled state
        context.globalCompositeOperation = "source-over";
        context.drawImage(
          splashTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );

        // Add red overlay
        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        // Add slight darkening
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
        // Normal drawing for enabled state
        context.drawImage(
          splashTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );
      }

      context.restore();
    } else {
      // Fallback to simple rectangle if sprite fails to load
      context.fillStyle = this.disabled ? "gray" : "yellow";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);
    }

    // Indicate the level visually
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Lv${this.level}`, this.x * 32 + 4, this.y * 32 + 20);
  }

  upgrade() {
    if (this.level < 3) {
      super.upgrade();
      this.splashRadius += 50;
    }
  }
}

const splashTowerSpriteInfo = {
  sx: 0, // X-coordinate of the first frame
  sy: 0, // Y-coordinate of the first frame
  sw: 204, // Width of each frame
  sh: 250, // Height of each frame
  dw: 64, // Width to draw on canvas
  dh: 42, // Height to draw on canvas
  frames: 2, // Number of animation frames
  gap: 8, // Gap between frames
};

class XRayTower extends Tower {
  constructor(x, y) {
    super(x, y, 125, 1, 800, 70, xrayTowerSpriteInfo, false); // Example: range, damage, fire rate, cost
    this.animationSpeed = 500;
    this.type = "xray";
    this.sound = towerSounds[this.type];
  }

  attack(currentTime, projectiles, enemies) {
    //checks if the time since the last shot is > firerate, id so a projectile is created and fire rate reset
    if (this.disabled) return;
    if (this.target && currentTime - this.lastFired >= this.fireRate) {
      // Calculate direction vector from tower to target
      const dx = this.target.x - this.x * 32;
      const dy = this.target.y - this.y * 32;
      const distance = Math.hypot(dx, dy);
      const direction = { dx: dx / distance, dy: dy / distance };

      // Create a PiercingProjectile
      const piercingProjectile = new PiercingProjectile(
        this.x * 32 + 16, // Start X (center of the tower)
        this.y * 32 + 16, // Start Y (center of the tower)
        direction,
        this.damage,
        this.range,
        enemies, // Pass all enemies
        this.canTargetFlying
      );
      PiercingProjectile.towerType = "xray"; // Add tower type to projectile
      projectiles.push(piercingProjectile);

      this.lastFired = currentTime; // Reset fire timer

      this.playFireSound();
    }
  }

  draw(context) {
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames, gap } = this.spriteInfo;
      const spriteX = sx + this.animationFrame * (sw + gap);

      context.save();

      if (this.disabled) {
        // Create a red tint effect for disabled state
        context.globalCompositeOperation = "source-over";
        context.drawImage(
          XrayTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );

        // Add red overlay
        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        // Add slight darkening
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
        // Normal drawing for enabled state
        context.drawImage(
          XrayTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );
      }

      context.restore();
    } else {
      // Fallback to simple rectangle if sprite fails to load
      context.fillStyle = this.disabled ? "gray" : "purple";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);
    }

    // Indicate the level visually
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Lv${this.level}`, this.x * 32 + 4, this.y * 32 + 20);
  }

  upgrade() {
    if (this.level < 3) {
      // Maximum level is 3
      this.level++;
      this.range += 40; // Increase range
      this.damage += 2; // Increase damage
      this.fireRate -= 100; // Increase fire rate (reduce time)
      this.upgradeCost += 50; // Increment cost for upgrades
    } else {
      console.log("Tower is already at maximum level.");
    }
  }

}
const xrayTowerSpriteInfo = {
  sx: 0, // X-coordinate of the first frame
  sy: 0, // Y-coordinate of the first frame
  sw: 283.5, // Width of each frame
  sh: 303, // Height of each frame
  dw: 64, // Width to draw on canvas
  dh: 42, // Height to draw on canvas
  frames: 2, // Number of animation frames
  gap: 20, // Gap between frames
};

class SniperTower extends Tower {
  constructor(x, y) {
    // Long range, high damage, slow fire rate, and high cost
    super(x, y, 400, 50, 4000, 90, sniperTowerSpriteInfo, true); // range=300, damage=50, fireRate=3000ms, cost=200
    this.animationSpeed = 500;
    this.type = "sniper";
    this.sound = towerSounds[this.type];
  }

  attack(currentTime, projectiles) {
    //checks if the time since the last shot is > firerate, id so a projectile is created and fire rate reset
    if (this.disabled) return;
    if (this.target && currentTime - this.lastFired >= this.fireRate) {
      const projectile = new SniperProjectile(
        this.x * 32 + 16,
        this.y * 32 + 16,
        this.target,
        15,
        this.damage
      );
      projectiles.push(projectile);
      this.lastFired = currentTime; // Reset fire rate timer

      this.playFireSound();
    }
  }

  draw(context) {
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames, gap } = this.spriteInfo;
      const spriteX = sx + this.animationFrame * (sw + gap);

      context.save();

      if (this.disabled) {
        // Create a red tint effect for disabled state
        context.globalCompositeOperation = "source-over";
        context.drawImage(
          sniperTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );

        // Add red overlay
        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        // Add slight darkening
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
        // Normal drawing for enabled state
        context.drawImage(
          sniperTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );
      }

      context.restore();
    } else {
      // Fallback to simple rectangle if sprite fails to load
      context.fillStyle = this.disabled ? "gray" : "Fuchsia";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);
      context.fillStyle = "black";
      context.fillRect(this.x * 32 + 6, this.y * 32 + 12, 8, 8); // Simulate a scope
    }

    // Indicate the level visually
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Lv${this.level}`, this.x * 32 + 4, this.y * 32 + 20);
  }
}
const sniperTowerSpriteInfo = {
  sx: 0, // X-coordinate of the first frame
  sy: 0, // Y-coordinate of the first frame
  sw: 283.5, // Width of each frame
  sh: 281, // Height of each frame
  dw: 64, // Width to draw on canvas
  dh: 42, // Height to draw on canvas
  frames: 2, // Number of animation frames
  gap: 20, // Gap between frames
};

class FreezingTower extends Tower {
  constructor(x, y) {
    // Parameters: position, range, damage, fire rate, upgrade cost, sprite info, can target flying
    super(x, y, 150, 10, 2000, 75, iceTowerSpriteInfo, false);
    this.freezeRadius = 100; // Area of effect for freezing
    this.slowAmount = 0.5; // Slow enemies to 50% speed
    this.slowDuration = 3000; // Duration in milliseconds (3 seconds)
    this.animationSpeed = 500;
    this.type = "freezing";
    this.sound = towerSounds[this.type];
  }

  attack(currentTime, projectiles, enemies) {
    if (this.disabled) return;

    if (this.target && currentTime - this.lastFired >= this.fireRate) {
      const freezeProjectile = new FreezingProjectile(
        this.x * 32 + 16,
        this.y * 32 + 16,
        this.target,
        10, // projectile speed
        this.damage,
        this.freezeRadius,
        this.slowAmount,
        this.slowDuration,
        enemies,
        this.canTargetFlying
      );
      projectiles.push(freezeProjectile);
      this.lastFired = currentTime;

      this.playFireSound();
    }
  }

  draw(context) {
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames, gap } = this.spriteInfo;
      const spriteX = sx + this.animationFrame * (sw + gap);

      context.save();

      if (this.disabled) {
        // Create a red tint effect for disabled state
        context.globalCompositeOperation = "source-over";
        context.drawImage(
          iceTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );

        // Add red overlay
        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        // Add slight darkening
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
        // Normal drawing for enabled state
        context.drawImage(
          iceTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );
      }

      context.restore();
    } else {
      // Fallback to previous drawing method if sprite info is not available
      context.fillStyle = this.disabled ? "gray" : "lightblue";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);
    }

    // Indicate the level visually
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Lv${this.level}`, this.x * 32 + 4, this.y * 32 + 20);
  }

  upgrade() {
    if (this.level < 3) {
      super.upgrade();
      this.freezeRadius += 25; // Increase freeze radius
      this.slowAmount *= 0.8; // Increase slow effect (lower number = slower enemies)
      this.slowDuration += 500; // Increase slow duration by 0.5 seconds
    }
  }
}

const iceTowerSpriteInfo = {
  sx: 0, // X-coordinate of the first frame
  sy: 0, // Y-coordinate of the first frame
  sw: 283.5, // Width of each frame
  sh: 313, // Height of each frame
  dw: 64, // Width to draw on canvas
  dh: 42, // Height to draw on canvas
  frames: 2, // Number of animation frames (based on previous console log)
  gap: 0, // Calculate gap
};

class AirDefenseTower extends Tower {
  constructor(x, y) {
    // High range and damage against air units, moderate fire rate
    super(x, y, 250, 40, 1500, 75, airDefenseTowerSpriteInfo, true);
    this.canTargetGround = false; // Override to only target air units
    this.type = "airdefence";
    this.sound = towerSounds[this.type];
  }

  findTarget(enemies) {
    let highestProgressEnemy = null;
    let maxProgress = -1;
    let shortestDistance = Infinity;

    for (let enemy of enemies) {
      // Skip enemies that aren't within canvas bounds
      if (!this.isEnemyInCanvas(enemy, canvas)) {
        continue;
      }

      // Only target flying enemies
      if (!enemy.isFlying) {
        continue;
      }

      const distance = Math.hypot(enemy.x - this.x * 32, enemy.y - this.y * 32);

      // Only consider enemies within range
      if (distance <= this.range) {
        const pathProgress = enemy.currentWaypointIndex / enemy.path.length;

        if (
          pathProgress > maxProgress ||
          (pathProgress === maxProgress && distance < shortestDistance)
        ) {
          maxProgress = pathProgress;
          shortestDistance = distance;
          highestProgressEnemy = enemy;
        }
      }
    }

    this.target = highestProgressEnemy;
  }

  attack(currentTime, projectiles) {
    if (this.disabled) return;

    if (this.target && currentTime - this.lastFired >= this.fireRate) {
      const projectile = new AirDefenseProjectile(
        this.x * 32 + 16,
        this.y * 32 + 16,
        this.target,
        12,
        this.damage
      );
      projectiles.push(projectile);
      this.lastFired = currentTime;

      this.playFireSound();
    }
  }

  draw(context) {
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames, gap } = this.spriteInfo;
      const spriteX = sx + this.animationFrame * (sw + gap);

      context.save();

      if (this.disabled) {
        // Create a red tint effect for disabled state
        context.globalCompositeOperation = "source-over";
        context.drawImage(
          airDefenceTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );

        // Add red overlay
        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        // Add slight darkening
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
        // Normal drawing for enabled state
        context.drawImage(
          airDefenceTowerSpriteSheet,
          spriteX,
          sy,
          sw,
          sh,
          this.x * 32,
          this.y * 32,
          dw,
          dh
        );
      }

      context.restore();
    } else {
      // Fallback to previous drawing method if sprite info is not available
      context.fillStyle = this.disabled ? "gray" : "ForestGreen";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);

      // Add a distinctive missile launcher appearance
      context.fillStyle = this.disabled ? "darkgray" : "navy";
      context.beginPath();
      context.moveTo(this.x * 32 + 16, this.y * 32 + 8);
      context.lineTo(this.x * 32 + 48, this.y * 32 + 8);
      context.lineTo(this.x * 32 + 32, this.y * 32 + 24);
      context.closePath();
      context.fill();
    }

    // Indicate the level visually
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Lv${this.level}`, this.x * 32 + 4, this.y * 32 + 20);
  }
}
const airDefenseTowerSpriteInfo = {
  sx: 0, // X-coordinate of the first frame
  sy: 0, // Y-coordinate of the first frame
  sw: 283.5, // Width of each frame (adjust based on your sprite sheet)
  sh: 319, // Height of each frame (adjust based on your sprite sheet)
  dw: 64, // Width to draw on canvas
  dh: 42, // Height to draw on canvas
  frames: 2, // Number of animation frames (based on sprite sheet)
  gap: 20, // Calculate gap between frames if needed
};

// Create an audio pool for each tower type
class AudioPool {
  constructor(soundPath, poolSize = 3) {
    this.audioElements = Array.from({ length: poolSize }, () => {
      const audio = new Audio(soundPath);
      audio.volume = 0.3;
      return audio;
    });
    this.currentIndex = 0;
  }

  play() {
    // Get next available audio element
    const audio = this.audioElements[this.currentIndex];
    
    // If the audio is still playing, stop it first
    if (!audio.ended) {
      audio.currentTime = 0;
    }
    
    // Play the sound
    audio.play().catch(error => {
      console.log('Error playing sound:', error);
    });
    
    // Move to next audio element in pool
    this.currentIndex = (this.currentIndex + 1) % this.audioElements.length;
  }

  setVolume(volume) {
    this.audioElements.forEach(audio => {
      audio.volume = volume;
    });
  }

  mute(muted) {
    this.audioElements.forEach(audio => {
      audio.muted = muted;
    });
  }
}

// Create audio pools for each tower type
const towerSounds = {
  default: new AudioPool('assets/tower_sounds/default.mp3'),
  splash: new AudioPool('assets/tower_sounds/splash.mp3'),
  xray: new AudioPool('assets/tower_sounds/xray.mp3'),
  sniper: new AudioPool('assets/tower_sounds/sniper.mp3'),
  freezing: new AudioPool('assets/tower_sounds/freezing.mp3'),
  airdefence: new AudioPool('assets/tower_sounds/airdefence.mp3')
};

function setTowerSoundVolume(volume) {
  Object.values(towerSounds).forEach(pool => {
    pool.setVolume(volume);
  });
}

function toggleTowerSounds(muted) {
  Object.values(towerSounds).forEach(pool => {
    pool.mute(muted);
  });
}

// Optional: Function to clean up audio resources when game ends
function cleanupTowerSounds() {
  Object.values(towerSounds).forEach(pool => {
    pool.audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  });
}
