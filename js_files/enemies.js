const spritesheet = new Image();
spritesheet.src = "assets/Minotaur.png";

const minotaurFlipped = new Image();
minotaurFlipped.src = "assets/FlippedSprites/Minotaur_flipped.png";

const fastEnemySpriteSheet = new Image();
fastEnemySpriteSheet.src = "assets/FastEnemy_goblin.png";

const fastEnemySpriteSheet_flipped = new Image();
fastEnemySpriteSheet_flipped.src =
  "assets/FlippedSprites/FastEnemy_goblin_flipped.png";

const tankEnemySpriteSheet = new Image();
tankEnemySpriteSheet.src = "assets/TankEnemyOrc.png";

const tankEnemySpriteSheet_flipped = new Image();
tankEnemySpriteSheet_flipped.src =
  "assets/FlippedSprites/TankEnemyOrc_flipped.png";

const FlyingEnemySpritesheet = new Image();
FlyingEnemySpritesheet.src = "assets/FlyingEnemySpritesheet.png";

const FlyingEnemySpritesheet_flipped = new Image();
FlyingEnemySpritesheet_flipped.src =
  "assets/FlippedSprites/FlyingEnemySpritesheet_flipped.png";

const FlyingTankEnemySpritesheet = new Image();
FlyingTankEnemySpritesheet.src = "assets/FlyingTank.png";

const FlyingTankEnemySpritesheet_flipped = new Image();
FlyingTankEnemySpritesheet_flipped.src =
  "assets/FlippedSprites/FlyingTank_flipped.png";

const BalloonEnemySpritesheet = new Image();
BalloonEnemySpritesheet.src = "assets/BalloonEnemySpriteSheet.png";

const BalloonEnemySpritesheet_flipped = new Image();
BalloonEnemySpritesheet_flipped.src =
  "assets/FlippedSprites/BalloonEnemySpriteSheet_flipped.png";

const ParachuteEnemySpritesheet = new Image();
ParachuteEnemySpritesheet.src = "assets/ParashuteEnemy.png";

const ParachuteEnemySpritesheet_flipped = new Image();
ParachuteEnemySpritesheet_flipped.src =
  "assets/FlippedSprites/ParashuteEnemy_flipped.png";

const ShieldedEnemy_SkeletonSprite = new Image();
ShieldedEnemy_SkeletonSprite.src = "assets/shieldedEnemy.png";

const ShieldedEnemy_SkeletonSprite_flipped = new Image();
ShieldedEnemy_SkeletonSprite_flipped.src =
  "assets/FlippedSprites/shieldedEnemy_flipped.png";

const throwingEnemySpriteSheet = new Image();
throwingEnemySpriteSheet.src = "assets/ThrowingEnemy.png";

const throwingEnemySpriteSheet_flipped = new Image();
throwingEnemySpriteSheet_flipped.src =
  "assets/FlippedSprites/ThrowingEnemy_flipped.png";

const disablingEnemySpriteSheet = new Image();
disablingEnemySpriteSheet.src = "assets/DisablerEnemySorceress.png";

const disablingEnemySpriteSheet_flipped = new Image();
disablingEnemySpriteSheet_flipped.src =
  "assets/FlippedSprites/DisablerEnemySorceress_flipped.png";

const healingEnemySpriteSheet = new Image();
healingEnemySpriteSheet.src = "assets/HealingEnemySpriteSheet.png";

const healingEnemySpriteSheet_flipped = new Image();
healingEnemySpriteSheet_flipped.src =
  "assets/FlippedSprites/HealingEnemySpriteSheet_flipped.png";

const shieldedBossEnemySpriteSheet = new Image();
shieldedBossEnemySpriteSheet.src = "assets/ShieldedBossSpriteSheet.png";

const shieldedBossEnemySpriteSheet_flipped = new Image();
shieldedBossEnemySpriteSheet_flipped.src =
  "assets/FlippedSprites/ShieldedBossSpriteSheet_flipped.png";

const destroyerEnemySpriteSheet = new Image();
destroyerEnemySpriteSheet.src = "assets/DestroyerBoss_WormSpriteSheet.png";

const destroyerEnemySpriteSheet_flipped = new Image();
destroyerEnemySpriteSheet_flipped.src =
  "assets/FlippedSprites/DestroyerBoss_WormSpriteSheet_flipped.png";

const RageEnemyBossSpritesheet = new Image();
RageEnemyBossSpritesheet.src = "assets/RageEnemyBossSpritesheet.png";

const RageEnemyBossSpritesheet_flipped = new Image();
RageEnemyBossSpritesheet_flipped.src =
  "assets/FlippedSprites/RageEnemyBossSpritesheet_flipped.png";

const SmartEnemySpritesheet = new Image();
SmartEnemySpritesheet.src = "assets/smartEnemySpritesheet.png";

const SmartEnemySpritesheet_flipped = new Image();
SmartEnemySpritesheet_flipped.src =
  "assets/FlippedSprites/smartEnemySpritesheet_flipped.png";

const CowardEnemySpritesheet = new Image();
CowardEnemySpritesheet.src = "assets/cowardEnemySpritesheet.png";

const CowardEnemySpritesheet_flipped = new Image();
CowardEnemySpritesheet_flipped.src =
  "assets/FlippedSprites/cowardEnemySpritesheet_flipped.png";

const WeatherBossEnemySpritesheet = new Image();
WeatherBossEnemySpritesheet.src = "assets/WeatherBoss.png";

const WeatherBossEnemySpritesheet_flipped = new Image();
WeatherBossEnemySpritesheet_flipped.src =
  "assets/FlippedSprites/WeatherBoss_flipped.png";

const AdaptiveEnemySpritesheet = new Image();
AdaptiveEnemySpritesheet.src = "assets/Adaptive.png";

const AdaptiveEnemySpritesheet_flipped = new Image();
AdaptiveEnemySpritesheet_flipped.src =
  "assets/FlippedSprites/Adaptive_flipped.png";

AdaptiveEnemySpritesheet.onload = () => {
  const totalWidth = AdaptiveEnemySpritesheet.width;
  const totalHeight = AdaptiveEnemySpritesheet.height;

  const spriteWidth = totalWidth / 2;
  const spriteHeight = totalHeight;

  const numSprites = 2;
  const gap = (totalWidth - spriteWidth * numSprites) / (numSprites - 1);

  console.log(`Width: ${spriteWidth}, Height: ${spriteHeight}, Gap: ${gap}`);
};

class Enemy {
  constructor(
    path,
    speed,
    delay = 0,
    health,
    reward,
    damage,
    spriteInfo = null,
    isFlying = false,
    spellDropChance = 0
  ) {
    this.path = path;
    this.x = path[0].x;
    this.y = path[0].y;
    this.speed = speed;
    this.currentWaypointIndex = 0;
    this.delay = delay;
    this.active = false;
    this.health = health;
    this.maxHealth = health;

    this.reward = reward;
    this.damage = damage;
    this.isDead = false;
    this.spriteInfo = spriteInfo;
    this.animationFrame = 0;
    this.frameTimer = 0;
    this.frameInterval = 100;
    this.isFlying = isFlying;
    this.damageReduction = 1;
    this.hasRageEffect = false;
    this.rageSource = null;
    this.spellDropChance = spellDropChance;

    this.originalSpeed = speed;
    this.isFrozen = false;
    this.freezeEndTime = 0;
    this.currentSlowAmount = 1;

    this.movingLeft = false;
  }

  takeDamage(amount) {
    if (this.isDead) return;

    const reducedDamage = amount * this.damageReduction;
    this.health -= reducedDamage;

    if (this.health <= 0) {
      this.die();
    }

    if (this.hasRageEffect) {
      console.log(
        `Rage-boosted enemy took ${reducedDamage} damage (Reduced from ${amount})`
      );
    }
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;

    playerCurrency += this.reward;
    console.log("Enemy died");
    console.log(`Gained ${this.reward} currency!`);

    if (Math.random() < this.spellDropChance) {
      const spells = ["fire", "freeze", "rage"];
      const randomSpell = spells[Math.floor(Math.random() * spells.length)];
      console.log(
        `Enemy dropped a ${
          randomSpell.charAt(0).toUpperCase() + randomSpell.slice(1)
        } Spell!`
      );
      addSpellToInventory(randomSpell);
    }

    return true;
  }

  move() {
    if (!this.active) {
      this.delay--;
      if (this.delay <= 0) this.active = true;
      return;
    }

    const currentTime = Date.now();
    this.checkFreezeStatus(currentTime);

    if (this.currentWaypointIndex >= this.path.length) {
      console.log("Enemy reached the end of the path");
      playerHealth -= this.damage;
      console.log("Player health:", playerHealth);

      enemies.splice(enemies.indexOf(this), 1);
      return;
    }

    const targetWaypoint = this.path[this.currentWaypointIndex];
    const dx = targetWaypoint.x - this.x;
    const dy = targetWaypoint.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    this.movingLeft = dx < 0;

    if (distance > this.speed) {
      const directionX = dx / distance;
      const directionY = dy / distance;
      this.x += directionX * this.speed;
      this.y += directionY * this.speed;
    } else {
      this.x = targetWaypoint.x;
      this.y = targetWaypoint.y;
      this.currentWaypointIndex++;
    }
  }

  applyFreeze(slowAmount, endTime) {
    if (!this.isFrozen || slowAmount < this.currentSlowAmount) {
      this.isFrozen = true;
      this.currentSlowAmount = slowAmount;
      this.freezeEndTime = endTime;
      this.speed = this.originalSpeed * slowAmount;
    }
  }

  checkFreezeStatus(currentTime) {
    if (this.isFrozen && currentTime >= this.freezeEndTime) {
      this.isFrozen = false;
      this.currentSlowAmount = 1;
      this.speed = this.originalSpeed;
    }
  }

  updateAnimation(deltaTime) {
    if (this.spriteInfo) {
      this.frameTimer += deltaTime;
      if (this.frameTimer >= this.frameInterval) {
        this.frameTimer = 0;
        this.animationFrame =
          (this.animationFrame + 1) % this.spriteInfo.frames;
      }
    }
  }

  drawHealthBar(ctx) {
    const width = 50;
    const height = 8;

    const healthPercentage = Math.max(0, this.health / this.maxHealth);

    let verticalOffset = 35;
    if (this.spriteInfo) {
      verticalOffset = this.spriteInfo.dh / 2 + 10;
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(
      this.x - width / 2 + 2,
      this.y - verticalOffset + 2,
      width,
      height
    );

    const bgGradient = ctx.createLinearGradient(
      this.x - width / 2,
      this.y - verticalOffset,
      this.x - width / 2,
      this.y - verticalOffset + height
    );
    bgGradient.addColorStop(0, "#600");
    bgGradient.addColorStop(1, "#400");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(this.x - width / 2, this.y - verticalOffset, width, height);

    const healthGradient = ctx.createLinearGradient(
      this.x - width / 2,
      this.y - verticalOffset,
      this.x - width / 2,
      this.y - verticalOffset + height
    );
    healthGradient.addColorStop(0, "#0f0");
    healthGradient.addColorStop(1, "#080");
    ctx.fillStyle = healthGradient;
    ctx.fillRect(
      this.x - width / 2,
      this.y - verticalOffset,
      width * healthPercentage,
      height
    );

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x - width / 2, this.y - verticalOffset, width, height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(
      this.x - width / 2,
      this.y - verticalOffset,
      width,
      height / 2
    );
  }

  drawRageEffect(ctx) {
    if (this.hasRageEffect) {
      ctx.save();

      ctx.shadowColor = "rgba(128, 0, 128, 0.8)";
      ctx.shadowBlur = 15;
      ctx.strokeStyle = "rgba(128, 0, 128, 0.6)";
      ctx.lineWidth = 3;

      const size = this.spriteInfo ? this.spriteInfo.dw : 50;
      ctx.beginPath();
      ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      ctx.save();
      ctx.fillStyle = "purple";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText("RAGED", this.x, this.y - 50);
      ctx.restore();
    }
  }

  drawFreezeEffect(ctx) {
    if (this.isFrozen) {
      ctx.save();

      ctx.shadowColor = "rgba(135, 206, 235, 0.8)";
      ctx.shadowBlur = 15;
      ctx.strokeStyle = "rgba(135, 206, 235, 0.6)";
      ctx.lineWidth = 3;
      const size = this.spriteInfo ? this.spriteInfo.dw : 50;
      ctx.beginPath();
      ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      ctx.save();

      ctx.fillStyle = "cyan";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText("FROZEN", this.x, this.y - 50);
      ctx.restore();
    }
  }

  draw(ctx) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);

    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;

      const currentSpritesheet = this.movingLeft
        ? minotaurFlipped
        : spritesheet;

      ctx.drawImage(
        currentSpritesheet,
        sx + this.animationFrame * sw,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "purple";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }

    this.drawHealthBar(ctx);
  }

  drawAtPosition(context, x, y) {
    const tempX = this.x;
    const tempY = this.y;
    this.x = x;
    this.y = y;
    this.draw(context);
    this.x = tempX;
    this.y = tempY;
  }
}

class BasicEnemy extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 98.25,
      sh: 94,
      dw: 90,
      dh: 90,
      frames: 8,
    };
    super(path, 2, Math.floor(Math.random() * 101), 100, 1, 1, spriteInfo);
    this.spellDropChance = 0.01;
  }
}

class FastEnemy extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 49,
      sh: 66,
      dw: 90,
      dh: 90,
      frames: 6,
    };
    super(path, 4, Math.floor(Math.random() * 101), 70, 2, 2, spriteInfo);
    this.spellDropChance = 0.03;
  }

  draw(context) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);

    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 100;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? fastEnemySpriteSheet_flipped
        : fastEnemySpriteSheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "yellow";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }
    this.drawHealthBar(ctx);
  }
}

class TankEnemy extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 106,
      sh: 79,
      dw: 80,
      dh: 80,
      frames: 7,
    };

    super(path, 1, Math.floor(Math.random() * 70), 200, 2, 5, spriteInfo);
    this.spellDropChance = 0.04;
  }
  draw(context) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 0;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? tankEnemySpriteSheet_flipped
        : tankEnemySpriteSheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }
    this.drawHealthBar(ctx);
  }
}

class FlyingEnemy extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 150,
      sh: 150,
      dw: 120,
      dh: 120,
      frames: 6,
    };

    super(path, 3, Math.floor(Math.random() * 101), 80, 3, 2, spriteInfo, true);
    this.spellDropChance = 0.05;
  }

  draw(context) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 0;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? FlyingEnemySpritesheet_flipped
        : FlyingEnemySpritesheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "navy";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }

    this.drawHealthBar(ctx);

    ctx.beginPath();
    ctx.strokeStyle = "lightblue";
    ctx.setLineDash([5, 5]);
    ctx.arc(this.x, this.y, 25, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

class FlyingTankEnemy extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 569,
      sh: 537,
      dw: 110,
      dh: 110,
      frames: 10,
    };

    super(
      path,
      2,
      Math.floor(Math.random() * 101),
      150,
      3,
      2,
      spriteInfo,
      true
    );
    this.frameInterval = 1;
    this.spellDropChance = 0.07;
  }

  draw(context) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 0;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? FlyingTankEnemySpritesheet_flipped
        : FlyingTankEnemySpritesheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "navy";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }

    this.drawHealthBar(ctx);

    ctx.beginPath();
    ctx.strokeStyle = "lightblue";
    ctx.setLineDash([5, 5]);
    ctx.arc(this.x, this.y, 25, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

class BalloonEnemy extends Enemy {
  constructor(
    path,
    speed = 2,
    dropInterval = 10000,
    droppedEnemyType,
    enemiesArray
  ) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 158.5,
      sh: 227,
      dw: 90,
      dh: 90,
      frames: 2,
    };

    super(
      path,
      speed,
      Math.floor(Math.random() * 101),
      150,
      6,
      3,
      spriteInfo,
      true
    );

    this.dropInterval = dropInterval;
    this.droppedEnemyType = droppedEnemyType;
    this.enemiesArray = enemiesArray;
    this.lastDropTime = 0;
    this.heldEnemy = new this.droppedEnemyType(path);
    this.frameInterval = 800;
    this.spellDropChance = 0.1;
  }

  update(currentTime) {
    if (currentTime - this.lastDropTime >= this.dropInterval) {
      this.dropEnemy();
      this.lastDropTime = currentTime;

      this.heldEnemy = new this.droppedEnemyType(this.path);
    }
  }

  dropEnemy() {
    if (this.heldEnemy) {
      this.heldEnemy.x = this.x;
      this.heldEnemy.y = this.y;
      this.heldEnemy.currentWaypointIndex = this.findNextWaypoint(
        this.heldEnemy
      );
      this.enemiesArray.push(this.heldEnemy);
      console.log("BalloonEnemy has dropped a new enemy!");
    }
  }

  findNextWaypoint(enemy) {
    for (let i = this.currentWaypointIndex; i < this.path.length; i++) {
      const waypoint = this.path[i];
      const dx = waypoint.x - enemy.x;
      const dy = waypoint.y - enemy.y;
      const distance = Math.hypot(dx, dy);
      if (distance > enemy.speed) {
        return i;
      }
    }
    return this.path.length - 1;
  }

  draw(context) {
    this.drawRageEffect(context);
    this.drawFreezeEffect(context);

    const floatOffset = Math.sin(performance.now() / 500) * 10;

    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 30;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      context.save();
      context.shadowColor = "rgba(135, 206, 235, 0.5)";
      context.shadowBlur = 15;

      const currentSpritesheet = this.movingLeft
        ? BalloonEnemySpritesheet_flipped
        : BalloonEnemySpritesheet;
      context.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2 + floatOffset,
        dw,
        dh
      );
      context.restore();
    } else {
      context.fillStyle = "skyblue";
      context.fillRect(this.x - 25, this.y - 25 + floatOffset, 50, 50);
    }

    context.fillStyle = "red";
    context.fillRect(this.x - 25, this.y - 45 + floatOffset, 50, 5);
    context.fillStyle = "green";
    const healthPercentage = Math.max(0, this.health / this.maxHealth);
    context.fillRect(
      this.x - 25,
      this.y - 45 + floatOffset,
      50 * healthPercentage,
      5
    );

    if (this.heldEnemy) {
      context.save();

      const offsetY = 40 + floatOffset;

      const scale = 0.4;
      context.translate(this.x, this.y + offsetY);
      context.scale(scale, scale);
      this.heldEnemy.drawAtPosition(context, 0, 0);
      context.restore();
    }

    context.beginPath();
    context.strokeStyle = "lightblue";
    context.setLineDash([5, 5]);
    context.arc(this.x, this.y + floatOffset, 35, 0, Math.PI * 2);
    context.stroke();
    context.setLineDash([]);
  }
}

class ParachuteEnemy extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 62,
      sh: 70,
      dw: 40,
      dh: 40,
      frames: 3,
    };
    super(path, 2, Math.floor(Math.random() * 101), 50, 2, 1, spriteInfo);
    this.spellDropChance = 0.01;
  }

  draw(context) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);

    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 0;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? ParachuteEnemySpritesheet_flipped
        : ParachuteEnemySpritesheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "yellow";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }

    this.drawHealthBar(ctx);
  }
}

class ShieldedEnemy extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 195.5,
      sh: 319,
      dw: 60,
      dh: 60,
      frames: 4,
    };

    super(path, 1, Math.floor(Math.random() * 101), 120, 4, 3, spriteInfo);
    this.shieldStrength = 50;
    this.shieldBroken = false;
    this.spellDropChance = 0.01;
  }

  takeDamage(amount, towerType) {
    const reducedAmount = amount * this.damageReduction;

    if (!this.shieldBroken) {
      if (towerType === "splash") {
        this.shieldStrength -= reducedAmount * 1.4;
        console.log("SUPER EFFECTIVE");
      } else {
        this.shieldStrength -= reducedAmount * 0.3;
        console.log("NOT EFFECTIVE");
      }

      if (this.shieldStrength <= 0) {
        this.shieldBroken = true;
        console.log("Shield broken!");
      }
    } else {
      this.health -= reducedAmount;
    }

    if (this.health <= 0) {
      this.die();
    }

    if (this.hasRageEffect) {
      console.log(
        `Rage-boosted shielded enemy took ${reducedAmount} damage (Reduced from ${amount})`
      );
    }
  }

  draw(context) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 2;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? ShieldedEnemy_SkeletonSprite_flipped
        : ShieldedEnemy_SkeletonSprite;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }

    this.drawHealthBar(ctx);

    if (!this.shieldBroken) {
      context.strokeStyle = "blue";
      context.lineWidth = 2;
      context.strokeRect(this.x - 5, this.y - 5, 40, 40);
    }
  }
}
class ThrowingEnemy extends Enemy {
  constructor(
    path,
    speed,
    health,
    throwInterval,
    throwEnemyType,
    enemiesArray
  ) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 138.6,
      sh: 168,
      dw: 97,
      dh: 97,
      frames: 5,
    };
    super(
      path,
      speed,
      Math.floor(Math.random() * 101),
      health,
      4,
      3,
      spriteInfo
    );
    this.throwInterval = throwInterval;
    this.throwEnemyType = throwEnemyType;
    this.enemiesArray = enemiesArray;
    this.lastThrowTime = 0;
    this.heldEnemy = new this.throwEnemyType(path);
    this.spellDropChance = 0.15;
  }

  update(currentTime) {
    if (currentTime - this.lastThrowTime >= this.throwInterval) {
      this.throwEnemy();
      this.lastThrowTime = currentTime;
    }
  }

  throwEnemy() {
    if (this.heldEnemy) {
      this.heldEnemy.x = this.x;
      this.heldEnemy.y = this.y;
      this.heldEnemy.currentWaypointIndex = this.findNextWaypoint(
        this.heldEnemy
      );
      this.enemiesArray.push(this.heldEnemy);
      console.log("ThrowingEnemy has thrown a new enemy!");
      this.heldEnemy = new this.throwEnemyType(this.path);
    }
  }

  findNextWaypoint(enemy) {
    for (let i = this.currentWaypointIndex; i < this.path.length; i++) {
      const waypoint = this.path[i];
      const dx = waypoint.x - enemy.x;
      const dy = waypoint.y - enemy.y;
      const distance = Math.hypot(dx, dy);
      if (distance > enemy.speed) {
        return i;
      }
    }
    return this.path.length - 1;
  }

  draw(context) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);

    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 0;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? throwingEnemySpriteSheet_flipped
        : throwingEnemySpriteSheet;

      context.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      context.fillStyle = "green";
      context.fillRect(this.x - 25, this.y - 25, 50, 50);
    }

    this.drawHealthBar(ctx);

    if (this.heldEnemy) {
      context.save();

      const offsetX = -10;
      const offsetY = 25;

      context.translate(this.x + offsetX, this.y + offsetY);

      const scale = 0.5;
      context.scale(scale, scale);

      this.heldEnemy.drawAtPosition(context, 0, 0);

      context.restore();
    }
  }
}

class DisablingEnemy extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 158.1,
      sh: 158,
      dw: 130,
      dh: 130,
      frames: 10,
    };

    super(path, 2, Math.floor(Math.random() * 101), 80, 5, 3, spriteInfo);
    this.disableRadius = 120;
    this.spellDropChance = 0.2;
  }

  draw(context) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 0;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? disablingEnemySpriteSheet_flipped
        : disablingEnemySpriteSheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "Aqua";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }

    this.drawHealthBar(ctx);

    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.disableRadius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 0, 0, 0.2)";
    context.fill();
    context.strokeStyle = "red";
    context.stroke();
    context.restore();
  }
}

class HealingEnemy extends Enemy {
  constructor(path, healRadius = 150, healAmount = 5, healInterval = 1000) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 150,
      sh: 150,
      dw: 200,
      dh: 200,
      frames: 8,
    };

    super(path, 2, Math.floor(Math.random() * 101), 100, 5, 2, spriteInfo);
    this.healRadius = healRadius;
    this.healAmount = healAmount;
    this.healInterval = healInterval;
    this.lastHealTime = 0;
    this.spellDropChance = 0.2;
  }

  heal(currentTime) {
    if (currentTime - this.lastHealTime >= this.healInterval) {
      this.lastHealTime = currentTime;

      enemies.forEach((enemy) => {
        if (enemy !== this && this.isWithinHealRadius(enemy)) {
          enemy.health = Math.min(enemy.health + this.healAmount, 100);
          console.log(
            `Healing enemy at (${enemy.x}, ${enemy.y}) by ${this.healAmount}`
          );
        }
      });
    }
  }

  isWithinHealRadius(enemy) {
    const dx = this.x - enemy.x;
    const dy = this.y - enemy.y;
    return Math.sqrt(dx * dx + dy * dy) <= this.healRadius;
  }

  update(currentTime) {
    this.heal(currentTime);
  }

  draw(context) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 0;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? healingEnemySpriteSheet_flipped
        : healingEnemySpriteSheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "DeepPink";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }

    this.drawHealthBar(ctx);

    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.healRadius, 0, Math.PI * 2);
    context.fillStyle = "rgba(0, 255, 0, 0.2)";
    context.fill();
    context.strokeStyle = "green";
    context.stroke();
    context.restore();
  }
}

class ShieldedBossEnemy extends Enemy {
  constructor(path, enemiesArray) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 132,
      sh: 147,
      dw: 100,
      dh: 100,
      frames: 2,
    };

    super(path, 1, Math.floor(Math.random() * 101), 500, 10, 10, spriteInfo);
    this.shieldStrength = 200;
    this.shieldBroken = false;
    this.shieldRegenTimer = 7000;
    this.lastShieldBreakTime = 0;
    this.enemiesArray = enemiesArray;
    this.spawnedEnemyType = ShieldedEnemy;
    this.spellDropChance = 1;
  }

  takeDamage(amount, towerType) {
    if (this.isDead) return;

    const reducedAmount = amount * this.damageReduction;

    if (!this.shieldBroken) {
      if (towerType === "splash") {
        this.shieldStrength -= reducedAmount * 1.4;
        console.log("SUPER EFFECTIVE");
      } else {
        this.shieldStrength -= reducedAmount * 0.3;
        console.log("NOT EFFECTIVE");
      }

      if (this.shieldStrength <= 0) {
        this.shieldBroken = true;
        this.lastShieldBreakTime = performance.now();
        console.log("Shield broken!");
      }
    } else {
      this.health -= reducedAmount;
    }

    if (this.health <= 0) {
      this.die();
    }

    if (this.hasRageEffect) {
      console.log(
        `Rage-boosted shielded boss took ${reducedAmount} damage (Reduced from ${amount})`
      );
    }
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;

    for (let i = 0; i < 3; i++) {
      this.spawnShieldedEnemy();
    }

    console.log("Shielded Boss died and spawned 3 ShieldedEnemies!");

    playerCurrency += this.reward;
    console.log(`Gained ${this.reward} currency!`);

    if (Math.random() < this.spellDropChance) {
      const spells = ["fire", "freeze", "rage"];
      const randomSpell = spells[Math.floor(Math.random() * spells.length)];
      console.log(
        `Enemy dropped a ${
          randomSpell.charAt(0).toUpperCase() + randomSpell.slice(1)
        } Spell!`
      );
      addSpellToInventory(randomSpell);
    }
  }

  update(currentTime) {
    if (
      this.shieldBroken &&
      currentTime - this.lastShieldBreakTime >= this.shieldRegenTimer
    ) {
      this.shieldBroken = false;
      this.shieldStrength = 200;
      console.log("Shield regenerated!");
    }
  }

  spawnShieldedEnemy() {
    const newEnemy = new this.spawnedEnemyType(this.path);

    newEnemy.x = this.x;
    newEnemy.y = this.y;
    newEnemy.currentWaypointIndex = this.findNextWaypoint(newEnemy);
    this.enemiesArray.push(newEnemy);
    console.log("Shielded Boss spawned a ShieldedEnemy!");
  }

  findNextWaypoint(enemy) {
    for (let i = this.currentWaypointIndex; i < this.path.length; i++) {
      const waypoint = this.path[i];
      const dx = waypoint.x - enemy.x;
      const dy = waypoint.y - enemy.y;
      const distance = Math.hypot(dx, dy);

      if (distance > enemy.speed) {
        return i;
      }
    }
    return this.path.length - 1;
  }

  draw(context) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 0;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? shieldedBossEnemySpriteSheet_flipped
        : shieldedBossEnemySpriteSheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "orange";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(this.x - 25, this.y - 70, 50, 5);

    ctx.fillStyle = "green";
    const healthPercentage = Math.max(0, this.health / this.maxHealth);
    ctx.fillRect(this.x - 25, this.y - 70, 50 * healthPercentage, 5);

    if (!this.shieldBroken) {
      context.strokeStyle = "blue";
      context.lineWidth = 4;
      context.strokeRect(this.x - 50, this.y - 50, 100, 100);
    }
  }
}

class DestroyerBossEnemy extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 90,
      sh: 90,
      dw: 200,
      dh: 200,
      frames: 9,
    };

    super(path, 1, Math.floor(Math.random() * 101), 300, 10, 10, spriteInfo);
    this.destroyRadius = 150;
    this.fireCooldown = 0;
    this.fireRate = 8000;
    this.projectiles = [];
    this.spellDropChance = 1;
  }

  fireAtClosestTower(towers) {
    if (this.fireCooldown > 0) return;

    let closestTower = null;
    let minDistance = Infinity;

    for (let tower of towers) {
      const distance = Math.hypot(this.x - tower.x * 32, this.y - tower.y * 32);
      if (distance <= this.destroyRadius && distance < minDistance) {
        closestTower = tower;
        minDistance = distance;
      }
    }

    if (closestTower) {
      this.projectiles.push({
        x: this.x,
        y: this.y,
        target: closestTower,
        speed: 4,
      });
      console.log("DestroyerBossEnemy fired at a tower!");
      this.fireCooldown = this.fireRate;
    }
  }

  updateProjectiles(towers) {
    this.projectiles = this.projectiles.filter((projectile) => {
      const dx = projectile.target.x * 32 - projectile.x;
      const dy = projectile.target.y * 32 - projectile.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 5) {
        const index = towers.indexOf(projectile.target);
        if (index !== -1) {
          const destroyedTower = towers[index];

          const gridX = destroyedTower.x;
          const gridY = destroyedTower.y;
          map2DArray[gridY][gridX] = 2927;

          towers.splice(index, 1);
          console.log(`Tower destroyed at (${gridX}, ${gridY})!`);
        }
        return false;
      }

      const directionX = dx / distance;
      const directionY = dy / distance;
      projectile.x += directionX * projectile.speed;
      projectile.y += directionY * projectile.speed;

      return true;
    });
  }

  move(towers, deltaTime) {
    if (!this.active) {
      this.delay--;
      if (this.delay <= 0) this.active = true;
      return;
    }

    if (this.fireCooldown > 0) {
      this.fireCooldown -= deltaTime;
    }

    this.fireAtClosestTower(towers);

    this.updateProjectiles(towers);

    const currentTime = Date.now();
    this.checkFreezeStatus(currentTime);

    if (this.currentWaypointIndex >= this.path.length) {
      console.log("DestroyerBossEnemy reached the end of the path");
      playerHealth -= this.damage;
      enemies.splice(enemies.indexOf(this), 1);
      return;
    }

    const targetWaypoint = this.path[this.currentWaypointIndex];
    const dx = targetWaypoint.x - this.x;
    const dy = targetWaypoint.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    this.movingLeft = dx < 0;

    if (distance > this.speed) {
      const directionX = dx / distance;
      const directionY = dy / distance;
      this.x += directionX * this.speed;
      this.y += directionY * this.speed;
    } else {
      this.x = targetWaypoint.x;
      this.y = targetWaypoint.y;
      this.currentWaypointIndex++;
    }
  }

  draw(ctx) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 0;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? destroyerEnemySpriteSheet_flipped
        : destroyerEnemySpriteSheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }

    this.drawHealthBar(ctx);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.destroyRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
    ctx.stroke();

    for (let projectile of this.projectiles) {
      ctx.fillStyle = "#33ff00";
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(projectile.x - 5, projectile.y);
      ctx.lineTo(projectile.x + 5, projectile.y);
      ctx.lineTo(projectile.x, projectile.y + 8);
      ctx.closePath();
      ctx.fill();
    }
  }
}
class RageBossEnemy extends Enemy {
  constructor(
    path,
    speed = 1,
    health = 300,
    rageRadius = 150,
    damageReduction = 0.5,
    speedBoost = 1.5,
    boostDuration = 3000
  ) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 122,
      sh: 150,
      dw: 100,
      dh: 100,
      frames: 2,
    };

    super(
      path,
      speed,
      Math.floor(Math.random() * 101),
      health,
      50,
      20,
      spriteInfo
    );
    this.rageRadius = rageRadius;
    this.damageReduction = damageReduction;
    this.speedBoost = speedBoost;
    this.boostDuration = boostDuration;
    this.boostedEnemies = new Map();
    this.frameInterval = 400;
    this.spellDropChance = 1;
  }

  update(currentTime) {
    this.applyRageEffect(currentTime);
  }

  applyRageEffect(currentTime) {
    enemies.forEach((enemy) => {
      if (enemy !== this && !(enemy instanceof RageBossEnemy)) {
        const distance = this.getDistance(enemy);

        if (distance <= this.rageRadius) {
          if (!enemy.hasRageEffect) {
            if (!this.boostedEnemies.has(enemy)) {
              this.boostedEnemies.set(enemy, {
                originalSpeed: enemy.speed,
                expiryTime: null,
              });

              enemy.speed *= this.speedBoost;
              enemy.damageReduction = this.damageReduction;
              enemy.hasRageEffect = true;
              enemy.rageSource = this;
            } else {
              const boostInfo = this.boostedEnemies.get(enemy);
              boostInfo.expiryTime = null;
            }
          }
        } else if (this.boostedEnemies.has(enemy)) {
          const boostInfo = this.boostedEnemies.get(enemy);

          if (!boostInfo.expiryTime) {
            boostInfo.expiryTime = currentTime + this.boostDuration;
          }

          if (currentTime >= boostInfo.expiryTime) {
            enemy.speed = boostInfo.originalSpeed;
            enemy.damageReduction = 1;
            enemy.hasRageEffect = false;
            enemy.rageSource = null;
            this.boostedEnemies.delete(enemy);
          }
        }
      }
    });
  }

  getDistance(enemy) {
    const dx = this.x - enemy.x;
    const dy = this.y - enemy.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  draw(context) {
    this.drawFreezeEffect(ctx);

    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 5;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? RageEnemyBossSpritesheet_flipped
        : RageEnemyBossSpritesheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "DarkRed";
      ctx.fillRect(this.x - 50, this.y - 50, 50, 50);
    }

    this.drawHealthBar(ctx);

    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.rageRadius, 0, Math.PI * 2);
    context.fillStyle = "rgba(128, 0, 129, 0.2)";
    context.fill();
    context.strokeStyle = "#301934";
    context.stroke();
    context.restore();
  }
}

class SmartEnemy extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 188,
      sh: 290,
      dw: 90,
      dh: 90,
      frames: 2,
    };
    super(path, 2, Math.floor(Math.random() * 101), 150, 4, 2, spriteInfo);

    this.states = {
      NORMAL: "normal",
      DEFENSIVE: "defensive",
      AGGRESSIVE: "aggressive",
      EVASIVE: "evasive",
    };

    this.currentState = this.states.NORMAL;
    this.originalSpeed = this.speed;
    this.healthThreshold = 0.4;
    this.nearbyTowerThreshold = 150;
    this.evasiveTimer = 0;
    this.evasiveInterval = 3000;
    this.aggressiveHealthThreshold = 0.8;
    this.lastStateChange = Date.now();
    this.stateChangeDelay = 1000;

    this.baseThreatTolerance = 2;
    this.threatToleranceMultiplier = 0.8;

    this.canSpeedBoost = true;
    this.speedBoostCooldown = 8000;
    this.lastSpeedBoost = 0;
    this.spellDropChance = 0.5;

    this.dashSpeed = this.originalSpeed * 3;
    this.dashDuration = 3000;
    this.isDashing = false;
    this.dashCooldown = 2000;
    this.lastDashTime = 0;

    this.frameInterval = 300;
  }

  getNearbyTowers() {
    if (!towers || !Array.isArray(towers)) {
      return [];
    }

    const nearbyTowers = towers.filter((tower) => {
      const towerPixelX = tower.x * 32 + 16;
      const towerPixelY = tower.y * 32 + 16;

      const enemyX = this.x;
      const enemyY = this.y;

      const dx = towerPixelX - enemyX;
      const dy = towerPixelY - enemyY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      return distance <= this.nearbyTowerThreshold;
    });

    return nearbyTowers;
  }

  evaluateThreatLevel() {
    const nearbyTowers = this.getNearbyTowers();
    let threatLevel = 0;

    nearbyTowers.forEach((tower) => {
      const towerDamage = (tower.damage || 1) * 0.7;
      threatLevel += towerDamage;

      if (tower.type === "splash") {
        threatLevel *= 1.1;
      }
    });

    nearbyTowers.forEach((tower) => {
      const towerPixelX = tower.x * 32 + 16;
      const towerPixelY = tower.y * 32 + 16;
      const distance = Math.sqrt(
        Math.pow(towerPixelX - this.x, 2) + Math.pow(towerPixelY - this.y, 2)
      );

      const distanceFactor = 1 - distance / this.nearbyTowerThreshold;
      threatLevel *= Math.max(0.5, distanceFactor);
    });

    return threatLevel;
  }

  updateState() {
    const currentTime = Date.now();
    if (currentTime - this.lastStateChange < this.stateChangeDelay) {
      return;
    }

    const healthPercentage = this.health / 100;
    const threatLevel = this.evaluateThreatLevel();
    const nearbyTowers = this.getNearbyTowers();

    const currentThreatTolerance =
      this.baseThreatTolerance *
      (1 + healthPercentage * this.threatToleranceMultiplier);

    let shouldChangeState = false;
    let newState = this.currentState;

    switch (this.currentState) {
      case this.states.NORMAL:
        if (healthPercentage < this.healthThreshold) {
          newState = this.states.DEFENSIVE;
          shouldChangeState = true;
        } else if (threatLevel > currentThreatTolerance) {
          newState = this.states.EVASIVE;
          shouldChangeState = true;
        } else if (
          healthPercentage > this.aggressiveHealthThreshold &&
          nearbyTowers.length === 1
        ) {
          newState = this.states.AGGRESSIVE;
          shouldChangeState = true;
        }
        break;

      case this.states.DEFENSIVE:
        if (healthPercentage > this.healthThreshold * 1.5) {
          newState = this.states.NORMAL;
          shouldChangeState = true;
        } else if (threatLevel > currentThreatTolerance * 1.5) {
          newState = this.states.EVASIVE;
          shouldChangeState = true;
        }
        break;

      case this.states.EVASIVE:
        if (
          currentTime - this.evasiveTimer > this.evasiveInterval ||
          threatLevel < currentThreatTolerance * 0.7
        ) {
          if (healthPercentage > this.aggressiveHealthThreshold) {
            newState = this.states.AGGRESSIVE;
          } else {
            newState = this.states.NORMAL;
          }
          shouldChangeState = true;
        }
        break;

      case this.states.AGGRESSIVE:
        if (healthPercentage < this.healthThreshold) {
          newState = this.states.DEFENSIVE;
          shouldChangeState = true;
        } else if (threatLevel > currentThreatTolerance * 1.2) {
          newState = this.states.EVASIVE;
          shouldChangeState = true;
        } else if (nearbyTowers.length > 2) {
          newState = this.states.NORMAL;
          shouldChangeState = true;
        }
        break;
    }

    if (shouldChangeState && newState !== this.currentState) {
      this.changeState(newState);
    }
  }

  changeState(newState) {
    this.currentState = newState;
    this.lastStateChange = Date.now();

    switch (newState) {
      case this.states.DEFENSIVE:
        this.damageReduction = 0.6;
        this.speed = this.originalSpeed * 0.8;
        break;

      case this.states.EVASIVE:
        this.evasiveTimer = Date.now();
        this.speed = this.originalSpeed;
        this.damageReduction = 0.8;
        this.tryDash();
        break;

      case this.states.AGGRESSIVE:
        this.speed = this.originalSpeed * 2;
        this.damageReduction = 1.5;
        break;

      case this.states.NORMAL:
      default:
        this.speed = this.originalSpeed;
        this.damageReduction = 1;
        break;
    }
  }

  move() {
    if (!this.active) {
      this.delay--;
      if (this.delay <= 0) this.active = true;
      return;
    }

    this.updateState();

    if (this.currentState === this.states.EVASIVE) {
      this.tryDash();
    }

    super.move();

    this.trySpeedBoost();
  }

  tryDash() {
    const currentTime = Date.now();
    if (
      currentTime - this.lastDashTime >= this.dashCooldown &&
      !this.isDashing
    ) {
      this.isDashing = true;
      this.lastDashTime = currentTime;

      const originalSpeed = this.speed;
      this.speed = this.dashSpeed;

      setTimeout(() => {
        this.isDashing = false;
        this.speed = originalSpeed;
      }, this.dashDuration);
    }
  }

  trySpeedBoost() {
    const currentTime = Date.now();
    if (
      this.canSpeedBoost &&
      currentTime - this.lastSpeedBoost >= this.speedBoostCooldown
    ) {
      if (this.health < 50 || this.getNearbyTowers().length > 2) {
        this.speed *= 2;
        setTimeout(() => (this.speed = this.originalSpeed), 1000);
        this.lastSpeedBoost = currentTime;
      }
    }
  }

  draw(context) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 5;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? SmartEnemySpritesheet_flipped
        : SmartEnemySpritesheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "gray";
      ctx.fillRect(this.x - 50, this.y - 50, 50, 50);
    }

    this.drawHealthBar(ctx);

    context.save();
    context.font = "12px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(this.currentState.toUpperCase(), this.x, this.y - 60);

    if (this.isDashing) {
      context.strokeStyle = "white";
      context.setLineDash([5, 5]);
      context.beginPath();
      context.moveTo(this.x - 20, this.y);
      context.lineTo(this.x + 20, this.y);
      context.stroke();
    }

    switch (this.currentState) {
      case this.states.DEFENSIVE:
        context.strokeStyle = "blue";
        context.setLineDash([5, 5]);
        context.beginPath();
        context.arc(this.x, this.y, 30, 0, Math.PI * 2);
        context.stroke();
        break;

      case this.states.EVASIVE:
        context.strokeStyle = "yellow";
        context.setLineDash([2, 2]);
        context.beginPath();
        context.arc(this.x, this.y, 35, 0, Math.PI * 2);
        context.stroke();
        break;

      case this.states.AGGRESSIVE:
        context.strokeStyle = "red";
        context.beginPath();
        context.arc(this.x, this.y, 32, 0, Math.PI * 2);
        context.stroke();
        break;
    }

    context.restore();
  }
}

class CowardEnemy extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 241,
      sh: 186,
      dw: 90,
      dh: 90,
      frames: 2,
    };

    super(path, 2, Math.floor(Math.random() * 101), 80, 3, 1, spriteInfo, true);

    this.visionRange = 200;
    this.personalSpace = 100;
    this.panicHealth = 40;
    this.originalPath = [...path];
    this.currentPath = [...path];
    this.pathUpdateInterval = 500;
    this.lastPathUpdate = 0;

    this.states = {
      NORMAL: "normal",
      CAUTIOUS: "cautious",
      PANIC: "panic",
      FLEEING: "fleeing",
    };

    this.currentState = this.states.NORMAL;
    this.fleeingDuration = 2000;
    this.lastStateChange = Date.now();
    this.spellDropChance = 0.3;

    this.baseSpeed = this.speed;
    this.maxDeviationDistance = 150;
    this.returningToPath = false;
    this.pathDeviationPoint = null;

    this.lastSafePoint = null;

    this.escapeAttempts = 0;
    this.maxEscapeAttempts = 4;
    this.escapeAngleVariance = Math.PI / 4;
  }

  evaluateThreatLevel() {
    const visibleTowers = this.getVisibleTowers();
    let threatLevel = 0;

    visibleTowers.forEach((tower) => {
      const distance = this.getDistanceToTower(tower);
      const towerThreat = this.calculateTowerThreat(tower, distance);
      threatLevel += towerThreat;
    });

    return threatLevel;
  }

  calculateTowerThreat(tower, distance) {
    if (
      tower.type === "xray" ||
      tower.type === "splash" ||
      tower.type === "freezing"
    ) {
      return 0;
    }

    const baseThreat = tower.damage || 1;
    const distanceFactor = 1 - distance / this.visionRange;
    let threatMultiplier = 1;

    if (tower.type === "sniper") threatMultiplier *= 1.5;
    if (tower.type === "default") threatMultiplier *= 1.2;
    if (tower.type === "airdefense") threatMultiplier *= 3;

    return baseThreat * distanceFactor * threatMultiplier;
  }

  getVisibleTowers() {
    if (!towers || !Array.isArray(towers)) return [];

    return towers.filter((tower) => {
      if (
        tower.type === "xray" ||
        tower.type === "splash" ||
        tower.type === "freezing"
      ) {
        return false;
      }

      const towerPixelX = tower.x * 32 + 16;
      const towerPixelY = tower.y * 32 + 16;
      const distance = Math.sqrt(
        Math.pow(towerPixelX - this.x, 2) + Math.pow(towerPixelY - this.y, 2)
      );
      return distance <= this.visionRange;
    });
  }

  getDistanceToTower(tower) {
    const towerPixelX = tower.x * 32 + 16;
    const towerPixelY = tower.y * 32 + 16;
    return Math.sqrt(
      Math.pow(towerPixelX - this.x, 2) + Math.pow(towerPixelY - this.y, 2)
    );
  }

  updateState() {
    const currentTime = Date.now();
    const healthPercentage = (this.health / 100) * 100;
    const threatLevel = this.evaluateThreatLevel();
    const visibleTowers = this.getVisibleTowers();

    if (currentTime - this.lastStateChange < 1000) return;

    let newState = this.currentState;

    switch (this.currentState) {
      case this.states.NORMAL:
        if (healthPercentage <= this.panicHealth) {
          newState = this.states.PANIC;
        } else if (visibleTowers.length > 0) {
          newState = this.states.CAUTIOUS;
        }
        break;

      case this.states.CAUTIOUS:
        if (healthPercentage <= this.panicHealth) {
          newState = this.states.PANIC;
        } else if (threatLevel > 3) {
          newState = this.states.FLEEING;
        } else if (visibleTowers.length === 0) {
          newState = this.states.NORMAL;
        }
        break;

      case this.states.PANIC:
        if (healthPercentage > this.panicHealth && visibleTowers.length === 0) {
          newState = this.states.CAUTIOUS;
        } else if (threatLevel > 2) {
          newState = this.states.FLEEING;
        }
        break;

      case this.states.FLEEING:
        if (currentTime - this.lastStateChange > this.fleeingDuration) {
          newState =
            healthPercentage <= this.panicHealth
              ? this.states.PANIC
              : this.states.CAUTIOUS;
        }
        break;
    }

    if (newState !== this.currentState) {
      this.changeState(newState);
    }
  }

  changeState(newState) {
    this.currentState = newState;
    this.lastStateChange = Date.now();

    switch (newState) {
      case this.states.NORMAL:
        this.speed = this.baseSpeed;
        this.visionRange = 200;
        break;

      case this.states.CAUTIOUS:
        this.speed = this.baseSpeed * 0.8;
        this.visionRange = 250;
        break;

      case this.states.PANIC:
        this.speed = this.baseSpeed * 1.3;
        this.visionRange = 300;
        break;

      case this.states.FLEEING:
        this.speed = this.baseSpeed * 1.5;
        this.visionRange = 350;
        break;
    }
  }

  findSafePoint() {
    const visibleTowers = this.getVisibleTowers();
    if (visibleTowers.length === 0) return null;

    const pathEndpoint = this.originalPath[this.originalPath.length - 1];

    let avgTowerX = 0;
    let avgTowerY = 0;
    visibleTowers.forEach((tower) => {
      avgTowerX += tower.x * 32 + 16;
      avgTowerY += tower.y * 32 + 16;
    });
    avgTowerX /= visibleTowers.length;
    avgTowerY /= visibleTowers.length;

    if (
      this.currentState === this.states.FLEEING ||
      this.currentState === this.states.PANIC
    ) {
      const escapeVectorX = this.x - avgTowerX;
      const escapeVectorY = this.y - avgTowerY;

      const baseEscapeAngle = Math.atan2(escapeVectorY, escapeVectorX);

      for (let attempt = 0; attempt < this.maxEscapeAttempts; attempt++) {
        const angleVariance = (Math.random() - 0.5) * this.escapeAngleVariance;
        const escapeAngle = baseEscapeAngle + angleVariance;

        const escapeDistance = this.personalSpace * (1.5 + attempt * 0.5);

        const testX = this.x + Math.cos(escapeAngle) * escapeDistance;
        const testY = this.y + Math.sin(escapeAngle) * escapeDistance;

        if (this.isPointSafe(testX, testY, visibleTowers)) {
          const distanceToEnd = Math.sqrt(
            Math.pow(pathEndpoint.x - testX, 2) +
              Math.pow(pathEndpoint.y - testY, 2)
          );

          if (distanceToEnd < this.maxDeviationDistance * 2) {
            return { x: testX, y: testY };
          }
        }
      }

      const toEndpointAngle = Math.atan2(
        pathEndpoint.y - this.y,
        pathEndpoint.x - this.x
      );

      for (
        let distance = this.personalSpace;
        distance <= this.maxDeviationDistance;
        distance += 50
      ) {
        const testX = this.x + Math.cos(toEndpointAngle) * distance;
        const testY = this.y + Math.sin(toEndpointAngle) * distance;

        if (this.isPointSafe(testX, testY, visibleTowers)) {
          return { x: testX, y: testY };
        }
      }
    } else {
      const targetWaypoint = this.currentPath[this.currentWaypointIndex];

      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
        const testDistance = this.personalSpace;
        const testX = this.x + Math.cos(angle) * testDistance;
        const testY = this.y + Math.sin(angle) * testDistance;

        if (this.isPointSafe(testX, testY, visibleTowers)) {
          const distanceFromPath = Math.sqrt(
            Math.pow(targetWaypoint.x - testX, 2) +
              Math.pow(targetWaypoint.y - testY, 2)
          );

          if (distanceFromPath < this.maxDeviationDistance) {
            return { x: testX, y: testY };
          }
        }
      }
    }

    return null;
  }

  isPointSafe(x, y, visibleTowers) {
    if (x < 0 || x > 800 || y < 0 || y > 600) return false;

    for (const tower of visibleTowers) {
      const towerPixelX = tower.x * 32 + 16;
      const towerPixelY = tower.y * 32 + 16;
      const distanceToTower = Math.sqrt(
        Math.pow(towerPixelX - x, 2) + Math.pow(towerPixelY - y, 2)
      );

      if (distanceToTower < this.personalSpace) {
        return false;
      }
    }

    return true;
  }

  findClosestPathPoint() {
    let closestPoint = null;
    let minDistance = Infinity;

    for (let i = 0; i < this.originalPath.length - 1; i++) {
      const start = this.originalPath[i];
      const end = this.originalPath[i + 1];

      const point = this.closestPointOnSegment(start, end);
      const distance = Math.sqrt(
        Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;

        closestPoint.pathIndex = i + 1;
      }
    }

    return closestPoint;
  }

  closestPointOnSegment(start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length === 0) return start;

    const t = Math.max(
      0,
      Math.min(
        1,
        ((this.x - start.x) * dx + (this.y - start.y) * dy) / (length * length)
      )
    );

    return {
      x: start.x + t * dx,
      y: start.y + t * dy,
    };
  }

  move() {
    if (!this.active) {
      this.delay--;
      if (this.delay <= 0) this.active = true;
      return;
    }

    this.updateState();
    const currentTime = Date.now();

    if (currentTime - this.lastPathUpdate > this.pathUpdateInterval) {
      this.lastPathUpdate = currentTime;

      if (this.currentState !== this.states.NORMAL) {
        const safePoint = this.findSafePoint();
        if (safePoint) {
          this.pathDeviationPoint = safePoint;
          this.returningToPath = false;
        }
      }
    }

    if (this.pathDeviationPoint && !this.returningToPath) {
      const dx = this.pathDeviationPoint.x - this.x;
      const dy = this.pathDeviationPoint.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > this.speed) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      } else {
        this.returningToPath = true;

        const closestPoint = this.findClosestPathPoint();
        if (closestPoint) {
          this.pathDeviationPoint = closestPoint;
          this.currentWaypointIndex = closestPoint.pathIndex;
        }
      }
    } else if (this.returningToPath) {
      const dx = this.pathDeviationPoint.x - this.x;
      const dy = this.pathDeviationPoint.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > this.speed) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      } else {
        this.returningToPath = false;
        this.pathDeviationPoint = null;
        super.move();
      }
    } else {
      super.move();
    }
  }

  draw(ctx) {
    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);

    const floatOffset = Math.sin(performance.now() / 500) * 10;
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 5;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? CowardEnemySpritesheet_flipped
        : CowardEnemySpritesheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2 + floatOffset,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "gray";
      ctx.fillRect(this.x - 50, this.y - 50, 50, 50);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(this.x - 25, this.y - 45 + floatOffset, 50, 5);
    ctx.fillStyle = "green";
    const healthPercentage = Math.max(0, this.health / this.maxHealth);
    ctx.fillRect(
      this.x - 25,
      this.y - 45 + floatOffset,
      50 * healthPercentage,
      5
    );

    ctx.beginPath();
    ctx.strokeStyle = "lightblue";
    ctx.setLineDash([5, 5]);
    ctx.arc(this.x, this.y + floatOffset, 35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 0, 0.2)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.visionRange, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(this.currentState.toUpperCase(), this.x, this.y - 65);

    switch (this.currentState) {
      case this.states.CAUTIOUS:
        ctx.strokeStyle = "yellow";
        break;
      case this.states.PANIC:
        ctx.strokeStyle = "orange";
        break;
      case this.states.FLEEING:
        ctx.strokeStyle = "red";
        break;
      default:
        ctx.strokeStyle = "green";
    }

    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(this.x, this.y, 40, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}
const activeWeatherBosses = new Map();

class WeatherBoss extends Enemy {
  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 165.666666666,
      sh: 255,
      dw: 90,
      dh: 90,
      frames: 3,
    };

    super(path, 1, Math.floor(Math.random() * 101), 220, 10, 3, spriteInfo);

    this.bossId = `weather-boss-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    this.states = {
      NORMAL: "normal",
      RAINY: "rainy",
      FOGGY: "foggy",
      SNOWY: "snowy",
    };

    this.weatherEffects = {
      [this.states.NORMAL]: {
        color: "#87CEEB",
        speedMod: 1,
        damageReduction: 1,
        towerRangeMod: 1,
        towerSpeedMod: 1,
        globalSpeedMod: 1,
      },
      [this.states.RAINY]: {
        color: "#4682B4",
        speedMod: 1.3,
        damageReduction: 1.2,
        towerRangeMod: 1,
        towerSpeedMod: 1,
        globalSpeedMod: 1.5,
      },
      [this.states.FOGGY]: {
        color: "#B8B8B8",
        speedMod: 0.8,
        damageReduction: 1,
        towerRangeMod: 0.7,
        towerSpeedMod: 1,
        globalSpeedMod: 1,
      },
      [this.states.SNOWY]: {
        color: "#FFFFFF",
        speedMod: 0.6,
        damageReduction: 1,
        towerRangeMod: 1,
        towerSpeedMod: 1.8,
        globalSpeedMod: 1,
      },
    };

    this.currentState = this.states.NORMAL;
    this.stateTimer = 0;
    this.stateMinDuration = 5000;
    this.stateMaxDuration = 10000;
    this.lastStateChange = Date.now();
    this.weatherParticles = [];
    this.maxParticles = 50;

    this.healthThresholds = {
      high: 0.7,
      medium: 0.4,
      low: 0.2,
    };

    this.baseSpeed = this.speed;
    this.spellDropChance = 0.7;

    activeWeatherBosses.set(this.bossId, {
      boss: this,
      state: this.currentState,
    });

    this.threatAssessment = {
      nearbyTowers: 0,
      nearbyEnemies: 0,
      towerDamageReceived: 0,
      lastDamageTaken: 0,
      recentDamageHistory: [],
    };

    this.stateWeights = {
      [this.states.NORMAL]: {
        baseWeight: 1,
        lowHealth: 0.2,
        highThreat: 0.2,
        manyEnemies: 0.5,
      },
      [this.states.RAINY]: {
        baseWeight: 1,
        lowHealth: 0.3,
        highThreat: 0.8,
        manyEnemies: 1.3,
      },
      [this.states.FOGGY]: {
        baseWeight: 1,
        lowHealth: 1.5,
        highThreat: 1.5,
        manyEnemies: 0.3,
      },
      [this.states.SNOWY]: {
        baseWeight: 1,
        lowHealth: 1.2,
        highThreat: 1.2,
        manyEnemies: 0.5,
      },
    };

    this.initializeEntityProperties();
  }

  initializeEntityProperties() {
    enemies.forEach((enemy) => {
      if (enemy !== this && enemy.originalSpeed === undefined) {
        enemy.originalSpeed = enemy.speed;
      }
    });

    towers.forEach((tower) => {
      this.initializeTowerProperties(tower);
    });
  }

  initializeTowerProperties(tower) {
    if (tower.originalRange === undefined) {
      tower.originalRange = tower.range;
    }
    if (tower.originalFireRate === undefined) {
      tower.originalFireRate = tower.fireRate;
    }
  }

  applyWeatherEffectsToTower(tower) {
    this.initializeTowerProperties(tower);

    const activeEffects = {
      rainy: false,
      foggy: false,
      snowy: false,
    };

    for (const [_, bossData] of activeWeatherBosses) {
      if (bossData.state === this.states.RAINY) activeEffects.rainy = true;
      if (bossData.state === this.states.FOGGY) activeEffects.foggy = true;
      if (bossData.state === this.states.SNOWY) activeEffects.snowy = true;
    }

    if (activeEffects.foggy) {
      tower.range =
        tower.originalRange *
        this.weatherEffects[this.states.FOGGY].towerRangeMod;
    }

    if (activeEffects.snowy) {
      tower.fireRate =
        tower.originalFireRate *
        this.weatherEffects[this.states.SNOWY].towerSpeedMod;
    }
  }

  recalculateAllEntityProperties() {
    if (activeWeatherBosses.size === 0) return;

    const activeEffects = {
      rainy: false,
      foggy: false,
      snowy: false,
    };

    for (const [_, bossData] of activeWeatherBosses) {
      if (bossData.state === this.states.RAINY) activeEffects.rainy = true;
      if (bossData.state === this.states.FOGGY) activeEffects.foggy = true;
      if (bossData.state === this.states.SNOWY) activeEffects.snowy = true;
    }

    enemies.forEach((enemy) => {
      if (enemy.originalSpeed === undefined && enemy !== this) {
        enemy.originalSpeed = enemy.speed;
      }

      if (enemy.originalSpeed !== undefined && enemy !== this) {
        if (activeEffects.rainy) {
          enemy.speed =
            enemy.originalSpeed *
            this.weatherEffects[this.states.RAINY].globalSpeedMod;
        } else {
          enemy.speed = enemy.originalSpeed;
        }
      }
    });

    towers.forEach((tower) => {
      this.initializeTowerProperties(tower);

      if (activeEffects.foggy) {
        tower.range =
          tower.originalRange *
          this.weatherEffects[this.states.FOGGY].towerRangeMod;
      } else {
        tower.range = tower.originalRange;
      }

      if (activeEffects.snowy) {
        tower.fireRate =
          tower.originalFireRate *
          this.weatherEffects[this.states.SNOWY].towerSpeedMod;
      } else {
        tower.fireRate = tower.originalFireRate;
      }
    });
  }

  changeState(newState) {
    if (this.currentState !== newState) {
      activeWeatherBosses.set(this.bossId, {
        boss: this,
        state: newState,
      });

      this.currentState = newState;
      this.lastStateChange = Date.now();

      const effect = this.weatherEffects[newState];
      this.speed = this.baseSpeed * effect.speedMod;
      this.damageReduction = effect.damageReduction;

      this.recalculateAllEntityProperties();

      this.weatherParticles = [];
    }
  }

  resetToNormalState() {
    this.changeState(this.states.NORMAL);
  }

  getDistanceTo(entity) {
    const dx = this.x - entity.x;
    const dy = this.y - entity.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  updateThreatAssessment() {
    const now = Date.now();
    const THREAT_RANGE = 200;
    const DAMAGE_HISTORY_DURATION = 5000;

    this.threatAssessment.nearbyTowers = towers.filter(
      (tower) => this.getDistanceTo(tower) < THREAT_RANGE
    ).length;

    this.threatAssessment.nearbyEnemies = enemies.filter(
      (enemy) => enemy !== this && this.getDistanceTo(enemy) < THREAT_RANGE
    ).length;

    this.threatAssessment.recentDamageHistory =
      this.threatAssessment.recentDamageHistory.filter(
        (entry) => now - entry.timestamp < DAMAGE_HISTORY_DURATION
      );

    const totalRecentDamage = this.threatAssessment.recentDamageHistory.reduce(
      (sum, entry) => sum + entry.damage,
      0
    );
    this.threatAssessment.towerDamageReceived =
      totalRecentDamage / (DAMAGE_HISTORY_DURATION / 1000);
  }

  takeDamage(amount) {
    const damageTaken =
      amount * this.weatherEffects[this.currentState].damageReduction;
    this.threatAssessment.recentDamageHistory.push({
      damage: damageTaken,
      timestamp: Date.now(),
    });
    super.takeDamage(amount);
  }

  calculateStateWeight(state) {
    const healthPercentage = this.health / 300;
    const weights = this.stateWeights[state];
    const highThreatLevel = this.threatAssessment.towerDamageReceived > 20;

    let weight = weights.baseWeight;

    if (healthPercentage < 0.4) weight *= weights.lowHealth;
    if (highThreatLevel) weight *= weights.highThreat;
    if (this.threatAssessment.nearbyEnemies > 3) weight *= weights.manyEnemies;

    if (state === this.states.FOGGY && this.threatAssessment.nearbyTowers > 2) {
      weight *= 1.5;
    }
    if (
      state === this.states.RAINY &&
      this.threatAssessment.nearbyEnemies > 5
    ) {
      weight *= 1.3;
    }

    return weight;
  }

  updateState() {
    const currentTime = Date.now();
    const timeSinceLastChange = currentTime - this.lastStateChange;

    if (timeSinceLastChange < this.stateMinDuration) return;

    this.updateThreatAssessment();

    const shouldForceChange =
      timeSinceLastChange > this.stateMaxDuration ||
      this.threatAssessment.towerDamageReceived > 30;

    if (
      shouldForceChange ||
      (timeSinceLastChange > this.stateMinDuration &&
        (this.health < 100 || this.threatAssessment.nearbyTowers > 2))
    ) {
      let availableStates = Object.values(this.states);
      const stateWeights = new Map();

      availableStates.forEach((state) => {
        if (state !== this.currentState) {
          stateWeights.set(state, this.calculateStateWeight(state));
        }
      });

      let totalWeight = 0;
      stateWeights.forEach((weight) => (totalWeight += weight));

      let randomValue = Math.random() * totalWeight;
      let cumulativeWeight = 0;

      for (const [state, weight] of stateWeights) {
        cumulativeWeight += weight;
        if (randomValue <= cumulativeWeight) {
          this.changeState(state);
          break;
        }
      }
    }
  }

  move() {
    if (!this.active) {
      this.delay--;
      if (this.delay <= 0) this.active = true;
      return;
    }

    if (this.currentWaypointIndex >= this.path.length) {
      activeWeatherBosses.delete(this.bossId);

      this.recalculateAllEntityProperties();

      this.resetToNormalState();

      console.log("Weather boss reached the end of the path");
      playerHealth -= this.damage;
      console.log("Player health:", playerHealth);
      enemies.splice(enemies.indexOf(this), 1);
      return;
    }

    super.move();
    this.updateState();
    this.updateWeatherParticles();
  }

  updateWeatherParticles() {
    this.weatherParticles = this.weatherParticles.filter(
      (particle) =>
        particle.y < canvas.height &&
        particle.x > 0 &&
        particle.x < canvas.width
    );

    while (this.weatherParticles.length < this.maxParticles) {
      this.createParticle();
    }

    this.weatherParticles.forEach((particle) => {
      particle.y += particle.speed;
      particle.x += particle.windSpeed || 0;

      if (particle.y > canvas.height) {
        particle.y = -10;
        particle.x = Math.random() * canvas.width;
      }
    });
  }

  createParticle() {
    const effect = this.weatherEffects[this.currentState];
    let particle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      color: effect.color,
      speed: 0,
      size: 0,
      height: 0,
      windSpeed: 0,
    };

    switch (this.currentState) {
      case this.states.RAINY:
        particle.speed = 15;
        particle.height = 20;
        particle.windSpeed = -2;
        particle.opacity = 0.8;
        break;
      case this.states.FOGGY:
        particle.speed = 0.5;
        particle.size = 3;
        particle.windSpeed = 0.5;
        break;
      case this.states.SNOWY:
        particle.speed = 2;
        particle.size = 2;
        particle.windSpeed = Math.sin(Date.now() * 0.001) * 0.5;
        break;
      default:
        particle.speed = 0;
        particle.size = 0;
    }

    this.weatherParticles.push(particle);
  }

  die() {
    activeWeatherBosses.delete(this.bossId);

    this.recalculateAllEntityProperties();

    this.resetToNormalState();

    super.die();
  }

  draw(ctx) {
    this.weatherParticles.forEach((particle) => {
      if (this.currentState === this.states.RAINY) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x, particle.y + particle.height);
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = particle.opacity;
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 5;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? WeatherBossEnemySpritesheet_flipped
        : WeatherBossEnemySpritesheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2,
        dw,
        dh
      );
    } else {
      ctx.fillStyle = "pink";
      ctx.fillRect(this.x - 50, this.y - 50, 50, 50);
    }

    this.drawHealthBar(ctx);

    ctx.save();
    ctx.strokeStyle = this.weatherEffects[this.currentState].color;
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(this.currentState.toUpperCase(), this.x, this.y - 70);

    let effectText = "";
    switch (this.currentState) {
      case this.states.RAINY:
        effectText = "All Enemies Faster!";
        break;
      case this.states.FOGGY:
        effectText = "Tower Range Reduced!";
        break;
      case this.states.SNOWY:
        effectText = "Towers Slowed!";
        break;
    }
    if (effectText) {
      ctx.font = "14px Arial";
      ctx.fillText(effectText, this.x, this.y - 90);
    }

    ctx.restore();
  }
}

class AdaptiveEnemy extends Enemy {
  static memory = {
    dangerZones: [],
    pathHistory: [],
    trainingIterations: 0,
  };

  constructor(path) {
    const spriteInfo = {
      sx: 0,
      sy: 0,
      sw: 222,
      sh: 266,
      dw: 90,
      dh: 90,
      frames: 2,
    };

    super(
      path,
      1,
      Math.floor(Math.random() * 101),
      120,
      5,
      2,
      spriteInfo,
      true
    );

    this.maxAdaptationLevel = 7;

    this.visionRange = 200;
    this.personalSpace = 100;
    this.maxDeviationDistance = 150;
    this.dangerZoneRadius = 100;
    this.originalPath = [...path];
    this.currentPath = [...path];
    this.pathUpdateInterval = 500;
    this.lastPathUpdate = 0;

    this.learningRate = 2;
    this.baseSpeed = this.speed;
    this.baseHealth = this.health;
    this.pathDeviationPoint = null;
    this.returningToPath = false;
    this.spawnTime = Date.now();

    this.adaptationLevel = Math.min(
      this.maxAdaptationLevel,
      Math.floor(
        (AdaptiveEnemy.memory.trainingIterations || 0) / this.learningRate
      )
    );

    this.visionRange += 10 * this.adaptationLevel;
    this.personalSpace += 5 * this.adaptationLevel;
    this.speed = this.baseSpeed * (1 + 0.1 * this.adaptationLevel);
    this.health = this.baseHealth * (1 + 0.1 * this.adaptationLevel);
  }

  calculateDangerLevel(x, y) {
    return AdaptiveEnemy.memory.dangerZones.reduce((totalDanger, zone) => {
      const distance = Math.sqrt(
        Math.pow(x - zone.x, 2) + Math.pow(y - zone.y, 2)
      );

      const dangerContribution = Math.max(
        0,
        1 - distance / this.dangerZoneRadius
      );
      return totalDanger + dangerContribution;
    }, 0);
  }

  getVisibleTowers() {
    if (!towers || !Array.isArray(towers)) return [];

    return towers.filter((tower) => {
      const towerPixelX = tower.x * 32 + 16;
      const towerPixelY = tower.y * 32 + 16;
      const distance = Math.sqrt(
        Math.pow(towerPixelX - this.x, 2) + Math.pow(towerPixelY - this.y, 2)
      );
      return distance <= this.visionRange;
    });
  }

  findSafePoint() {
    const visibleTowers = this.getVisibleTowers();
    if (visibleTowers.length === 0) return null;

    let avgTowerX = 0;
    let avgTowerY = 0;
    visibleTowers.forEach((tower) => {
      avgTowerX += tower.x * 32 + 16;
      avgTowerY += tower.y * 32 + 16;
    });
    avgTowerX /= visibleTowers.length;
    avgTowerY /= visibleTowers.length;

    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      const testDistance =
        this.personalSpace * (1 + this.adaptationLevel * 0.2);
      const testX = this.x + Math.cos(angle) * testDistance;
      const testY = this.y + Math.sin(angle) * testDistance;

      if (this.isPointSafe(testX, testY)) {
        return { x: testX, y: testY };
      }
    }

    return null;
  }

  isPointSafe(x, y) {
    if (x < 0 || x > 800 || y < 0 || y > 600) return false;

    const visibleTowers = this.getVisibleTowers();
    for (const tower of visibleTowers) {
      const towerPixelX = tower.x * 32 + 16;
      const towerPixelY = tower.y * 32 + 16;
      const distanceToTower = Math.sqrt(
        Math.pow(towerPixelX - x, 2) + Math.pow(towerPixelY - y, 2)
      );

      if (distanceToTower < this.personalSpace) {
        return false;
      }
    }

    const dangerLevel = this.calculateDangerLevel(x, y);
    return dangerLevel < 0.5;
  }

  findClosestPathPoint() {
    let closestPoint = null;
    let minDistance = Infinity;

    for (let i = 0; i < this.originalPath.length - 1; i++) {
      const start = this.originalPath[i];
      const end = this.originalPath[i + 1];
      const point = this.closestPointOnSegment(start, end);
      const distance = Math.sqrt(
        Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
        closestPoint.pathIndex = i + 1;
      }
    }

    return closestPoint;
  }

  closestPointOnSegment(start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length === 0) return start;

    const t = Math.max(
      0,
      Math.min(
        1,
        ((this.x - start.x) * dx + (this.y - start.y) * dy) / (length * length)
      )
    );

    return {
      x: start.x + t * dx,
      y: start.y + t * dy,
    };
  }

  move() {
    if (!this.active) {
      this.delay--;
      if (this.delay <= 0) this.active = true;
      return;
    }

    const currentTime = Date.now();

    if (currentTime - this.lastPathUpdate > this.pathUpdateInterval) {
      this.lastPathUpdate = currentTime;

      const visibleTowers = this.getVisibleTowers();
      const currentDanger = this.calculateDangerLevel(this.x, this.y);

      if (visibleTowers.length > 0 || currentDanger > 0.3) {
        const safePoint = this.findSafePoint();
        if (safePoint) {
          this.pathDeviationPoint = safePoint;
          this.returningToPath = false;
        }
      }
    }

    if (this.pathDeviationPoint && !this.returningToPath) {
      const dx = this.pathDeviationPoint.x - this.x;
      const dy = this.pathDeviationPoint.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > this.speed) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      } else {
        this.returningToPath = true;
        const closestPoint = this.findClosestPathPoint();
        if (closestPoint) {
          this.pathDeviationPoint = closestPoint;
          this.currentWaypointIndex = closestPoint.pathIndex;
        }
      }
    } else if (this.returningToPath) {
      const dx = this.pathDeviationPoint.x - this.x;
      const dy = this.pathDeviationPoint.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > this.speed) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      } else {
        this.returningToPath = false;
        this.pathDeviationPoint = null;
        super.move();
      }
    } else {
      super.move();
    }
  }

  die() {
    const isDefeated = super.die();
    if (isDefeated) {
      AdaptiveEnemy.memory.dangerZones.push({
        x: this.x,
        y: this.y,
        towers: this.getVisibleTowers().length,
        time: Date.now() - this.spawnTime,
      });

      if (AdaptiveEnemy.memory.dangerZones.length > 20) {
        AdaptiveEnemy.memory.dangerZones.shift();
      }

      AdaptiveEnemy.memory.trainingIterations++;

      this.adaptationLevel = Math.min(
        this.maxAdaptationLevel,
        Math.floor(AdaptiveEnemy.memory.trainingIterations / 5)
      );

      this.visionRange += 10 * this.adaptationLevel;
      this.personalSpace += 5 * this.adaptationLevel;
      this.speed = this.baseSpeed * (1 + 0.1 * this.adaptationLevel);
    }
    return isDefeated;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.2;
    AdaptiveEnemy.memory.dangerZones.forEach((zone) => {
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.arc(zone.x, zone.y, this.dangerZoneRadius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    this.drawRageEffect(ctx);
    this.drawFreezeEffect(ctx);

    const floatOffset = Math.sin(performance.now() / 500) * 10;
    if (this.spriteInfo) {
      const { sx, sy, sw, sh, dw, dh, frames } = this.spriteInfo;
      const gap = 15;
      const adjustedSx = sx + this.animationFrame * (sw + gap);

      const currentSpritesheet = this.movingLeft
        ? AdaptiveEnemySpritesheet_flipped
        : AdaptiveEnemySpritesheet;

      ctx.drawImage(
        currentSpritesheet,
        adjustedSx,
        sy,
        sw,
        sh,
        this.x - dw / 2,
        this.y - dh / 2 + floatOffset,
        dw,
        dh
      );
      ctx.restore();
    } else {
      ctx.fillStyle = "skyblue";
      ctx.fillRect(this.x - 25, this.y - 25 + floatOffset, 50, 50);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(this.x - 25, this.y - 45 + floatOffset, 50, 5);
    ctx.fillStyle = "green";
    const healthPercentage = Math.max(0, this.health / this.maxHealth);
    ctx.fillRect(
      this.x - 25,
      this.y - 45 + floatOffset,
      50 * healthPercentage,
      5
    );

    ctx.beginPath();
    ctx.strokeStyle = "lightblue";
    ctx.setLineDash([5, 5]);
    ctx.arc(this.x, this.y + floatOffset, 35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.save();
    ctx.strokeStyle = `rgba(0, 255, 255, ${
      0.1 + (this.adaptationLevel || 0) * 0.1
    })`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.visionRange, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = "12px Arial";
    ctx.fillStyle = "cyan";
    ctx.textAlign = "center";
    ctx.fillText(
      `Level: ${this.adaptationLevel || 0}`,
      this.x,
      this.y - 60 + floatOffset
    );

    const progressWidth = 50;
    const progress = Math.min(
      1,
      (this.adaptationLevel || 0) / (this.maxAdaptationLevel || 1)
    );
    ctx.fillStyle = `rgba(0, 255, 0, ${0.3 + progress * 0.7})`;
    ctx.fillRect(
      this.x - progressWidth / 2,
      this.y - 75,
      progressWidth * progress,
      5
    );

    ctx.restore();
  }
}

const enemies = [];
/*
let delay = 0;
for (let i = 0; i < 10; i++) {
  enemies.push(new Enemy(path, 3, delay, 100));
  delay += 50;
}
*/
