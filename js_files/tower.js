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
  const totalWidth = splashTowerSpriteSheet.width;
  const totalHeight = splashTowerSpriteSheet.height;

  const spriteWidth = totalWidth / 2;
  const spriteHeight = totalHeight;

  const numSprites = 2;
  const gap = (totalWidth - spriteWidth * numSprites) / (numSprites - 1);

  console.log(`Width: ${spriteWidth}, Height: ${spriteHeight}, Gap: ${gap}`);
};

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
    this.disabled = false;
    this.upgradeCost = upgradeCost;
    this.level = 1;

    this.spriteInfo = spriteInfo;
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.animationSpeed = 100;

    this.canTargetFlying = canTargetFlying;

    this.isRaged = false;
    this.rageEndTime = 0;

    this.type = "default";
    this.sound = towerSounds[this.type];
  }

  update(currentTime) {
    if (this.isRaged && currentTime >= this.rageEndTime) {
      this.fireRate *= this.fireRateMultiplier;
      this.isRaged = false;
    }
  }

  updateDisabledState(enemies) {
    this.disabled = enemies.some(
      (enemy) =>
        enemy instanceof DisablingEnemy &&
        Math.hypot(enemy.x - this.x * 32, enemy.y - this.y * 32) <=
          enemy.disableRadius
    );
  }

  isEnemyInCanvas(enemy, canvas) {
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
      if (!this.isEnemyInCanvas(enemy, canvas)) {
        continue;
      }

      if (enemy.isFlying && !this.canTargetFlying) {
        continue;
      }

      const distance = Math.hypot(enemy.x - this.x * 32, enemy.y - this.y * 32);

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
      const projectile = new Projectile(
        this.x * 32 + 16,
        this.y * 32 + 16,
        this.target,
        10,
        this.damage
      );
      projectiles.push(projectile);
      this.lastFired = currentTime;

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
      this.level++;
      this.range += 40;
      this.damage += 7;
      this.fireRate -= 100;
      this.upgradeCost += 50;
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
          (this.animationFrame + 1) % this.spriteInfo.frames;
      }
    }
  }

  draw(context) {
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames, gap } = this.spriteInfo;
      const spriteX = sx + this.animationFrame * (sw + gap);

      context.save();

      if (this.disabled) {
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

        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
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

      context.restore();
    } else {
      context.fillStyle = this.disabled ? "gray" : "blue";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);
    }

    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Lv${this.level}`, this.x * 32 + 4, this.y * 32 + 20);
  }
}

const defaultTowerSpriteInfo = {
  sx: 0,
  sy: 0,
  sw: 70,
  sh: 130,
  dw: 64,
  dh: 42,
  frames: 6,
  gap: 0,
};

class SplashTower extends Tower {
  constructor(x, y) {
    super(x, y, 150, 20, 2000, 80, splashTowerSpriteInfo, false);
    this.splashRadius = 200;
    this.type = "splash";
    this.animationSpeed = 400;
    this.sound = towerSounds[this.type];
  }

  attack(currentTime, projectiles, enemies) {
    if (this.disabled) return;
    if (this.target && currentTime - this.lastFired >= this.fireRate) {
      const splashProjectile = new SplashProjectile(
        this.x * 32 + 16,
        this.y * 32 + 16,
        this.target,
        10,
        this.damage,
        this.splashRadius,
        enemies,
        this.canTargetFlying
      );
      splashProjectile.towerType = "splash";
      projectiles.push(splashProjectile);
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

        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
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
      context.fillStyle = this.disabled ? "gray" : "yellow";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);
    }

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
  sx: 0,
  sy: 0,
  sw: 204,
  sh: 250,
  dw: 64,
  dh: 42,
  frames: 2,
  gap: 8,
};

class XRayTower extends Tower {
  constructor(x, y) {
    super(x, y, 125, 1, 800, 70, xrayTowerSpriteInfo, false);
    this.animationSpeed = 500;
    this.type = "xray";
    this.sound = towerSounds[this.type];
  }

  attack(currentTime, projectiles, enemies) {
    if (this.disabled) return;
    if (this.target && currentTime - this.lastFired >= this.fireRate) {
      const dx = this.target.x - this.x * 32;
      const dy = this.target.y - this.y * 32;
      const distance = Math.hypot(dx, dy);
      const direction = { dx: dx / distance, dy: dy / distance };

      const piercingProjectile = new PiercingProjectile(
        this.x * 32 + 16,
        this.y * 32 + 16,
        direction,
        this.damage,
        this.range,
        enemies,
        this.canTargetFlying
      );
      PiercingProjectile.towerType = "xray";
      projectiles.push(piercingProjectile);

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

        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
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
      context.fillStyle = this.disabled ? "gray" : "purple";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);
    }

    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Lv${this.level}`, this.x * 32 + 4, this.y * 32 + 20);
  }

  upgrade() {
    if (this.level < 3) {
      this.level++;
      this.range += 40;
      this.damage += 2;
      this.fireRate -= 100;
      this.upgradeCost += 50;
    } else {
      console.log("Tower is already at maximum level.");
    }
  }
}
const xrayTowerSpriteInfo = {
  sx: 0,
  sy: 0,
  sw: 283.5,
  sh: 303,
  dw: 64,
  dh: 42,
  frames: 2,
  gap: 20,
};

class SniperTower extends Tower {
  constructor(x, y) {
    super(x, y, 400, 50, 4000, 90, sniperTowerSpriteInfo, true);
    this.animationSpeed = 500;
    this.type = "sniper";
    this.sound = towerSounds[this.type];
  }

  attack(currentTime, projectiles) {
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

        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
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
      context.fillStyle = this.disabled ? "gray" : "Fuchsia";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);
      context.fillStyle = "black";
      context.fillRect(this.x * 32 + 6, this.y * 32 + 12, 8, 8);
    }

    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Lv${this.level}`, this.x * 32 + 4, this.y * 32 + 20);
  }
}
const sniperTowerSpriteInfo = {
  sx: 0,
  sy: 0,
  sw: 283.5,
  sh: 281,
  dw: 64,
  dh: 42,
  frames: 2,
  gap: 20,
};

class FreezingTower extends Tower {
  constructor(x, y) {
    super(x, y, 150, 10, 2000, 75, iceTowerSpriteInfo, false);
    this.freezeRadius = 100;
    this.slowAmount = 0.5;
    this.slowDuration = 3000;
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
        10,
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

        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
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
      context.fillStyle = this.disabled ? "gray" : "lightblue";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);
    }

    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Lv${this.level}`, this.x * 32 + 4, this.y * 32 + 20);
  }

  upgrade() {
    if (this.level < 3) {
      super.upgrade();
      this.freezeRadius += 25;
      this.slowAmount *= 0.8;
      this.slowDuration += 500;
    }
  }
}

const iceTowerSpriteInfo = {
  sx: 0,
  sy: 0,
  sw: 283.5,
  sh: 313,
  dw: 64,
  dh: 42,
  frames: 2,
  gap: 0,
};

class AirDefenseTower extends Tower {
  constructor(x, y) {
    super(x, y, 250, 40, 1500, 75, airDefenseTowerSpriteInfo, true);
    this.canTargetGround = false;
    this.type = "airdefence";
    this.sound = towerSounds[this.type];
  }

  findTarget(enemies) {
    let highestProgressEnemy = null;
    let maxProgress = -1;
    let shortestDistance = Infinity;

    for (let enemy of enemies) {
      if (!this.isEnemyInCanvas(enemy, canvas)) {
        continue;
      }

      if (!enemy.isFlying) {
        continue;
      }

      const distance = Math.hypot(enemy.x - this.x * 32, enemy.y - this.y * 32);

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

        context.globalCompositeOperation = "multiply";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);

        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(this.x * 32, this.y * 32, dw, dh);
      } else {
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
      context.fillStyle = this.disabled ? "gray" : "ForestGreen";
      context.fillRect(this.x * 32, this.y * 32, 32 * 2, 32);

      context.fillStyle = this.disabled ? "darkgray" : "navy";
      context.beginPath();
      context.moveTo(this.x * 32 + 16, this.y * 32 + 8);
      context.lineTo(this.x * 32 + 48, this.y * 32 + 8);
      context.lineTo(this.x * 32 + 32, this.y * 32 + 24);
      context.closePath();
      context.fill();
    }

    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Lv${this.level}`, this.x * 32 + 4, this.y * 32 + 20);
  }
}
const airDefenseTowerSpriteInfo = {
  sx: 0,
  sy: 0,
  sw: 283.5,
  sh: 319,
  dw: 64,
  dh: 42,
  frames: 2,
  gap: 20,
};

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
    const audio = this.audioElements[this.currentIndex];

    if (!audio.ended) {
      audio.currentTime = 0;
    }

    audio.play().catch((error) => {
      console.log("Error playing sound:", error);
    });

    this.currentIndex = (this.currentIndex + 1) % this.audioElements.length;
  }

  setVolume(volume) {
    this.audioElements.forEach((audio) => {
      audio.volume = volume;
    });
  }

  mute(muted) {
    this.audioElements.forEach((audio) => {
      audio.muted = muted;
    });
  }
}

const towerSounds = {
  default: new AudioPool("assets/tower_sounds/default.mp3"),
  splash: new AudioPool("assets/tower_sounds/splash.mp3"),
  xray: new AudioPool("assets/tower_sounds/xray.mp3"),
  sniper: new AudioPool("assets/tower_sounds/sniper.mp3"),
  freezing: new AudioPool("assets/tower_sounds/freezing.mp3"),
  airdefence: new AudioPool("assets/tower_sounds/airdefence.mp3"),
};

function setTowerSoundVolume(volume) {
  Object.values(towerSounds).forEach((pool) => {
    pool.setVolume(volume);
  });
}

function toggleTowerSounds(muted) {
  Object.values(towerSounds).forEach((pool) => {
    pool.mute(muted);
  });
}

function cleanupTowerSounds() {
  Object.values(towerSounds).forEach((pool) => {
    pool.audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  });
}
