class Projectile {
  constructor(startX, startY, target, speed, damage, towerType = "default") {
    this.x = startX;
    this.y = startY;
    this.target = target;
    this.speed = speed;
    this.damage = damage;
    this.towerType = towerType;
    this.angle = 0;
  }

  update() {
    if (this.target) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const distance = Math.hypot(dx, dy);

      this.angle = Math.atan2(dy, dx);

      if (distance > 0) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      }
    }
  }

  hasHitTarget() {
    if (!this.target) {
      return false;
    }
    const distanceToTarget = Math.hypot(
      this.target.x - this.x,
      this.target.y - this.y
    );
    return distanceToTarget < 7;
  }

  applyDamage() {
    if (this.target) {
      this.target.takeDamage(this.damage, this.towerType);
    }
    this.remove = true;
  }

  isOutOfBounds(canvas) {
    return (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    );
  }

  draw(context) {
    context.save();

    context.translate(this.x, this.y);
    context.rotate(this.angle);

    const arrowLength = 12;
    const arrowWidth = 3;
    const headSize = 6;

    context.fillStyle = "#654321";
    context.fillRect(
      -arrowLength / 2,
      -arrowWidth / 2,
      arrowLength,
      arrowWidth
    );

    context.beginPath();
    context.fillStyle = "#4a4a4a";
    context.moveTo(arrowLength / 2, 0);
    context.lineTo(arrowLength / 2 - headSize, -headSize / 2);
    context.lineTo(arrowLength / 2 - headSize, headSize / 2);
    context.closePath();
    context.fill();

    context.fillStyle = "#dcdcdc";
    const fletchingSize = 4;

    context.beginPath();
    context.moveTo(-arrowLength / 2, 0);
    context.lineTo(-arrowLength / 2 + fletchingSize, -fletchingSize);
    context.lineTo(-arrowLength / 2 + fletchingSize, 0);
    context.closePath();
    context.fill();

    context.beginPath();
    context.moveTo(-arrowLength / 2, 0);
    context.lineTo(-arrowLength / 2 + fletchingSize, fletchingSize);
    context.lineTo(-arrowLength / 2 + fletchingSize, 0);
    context.closePath();
    context.fill();

    context.restore();
  }
}
class SplashProjectile extends Projectile {
  constructor(
    startX,
    startY,
    target,
    speed,
    damage,
    splashRadius,
    enemies,
    towerType = "splash",
    canTargetFlying = false
  ) {
    super(startX, startY, target, speed, damage, (towerType = "splash"));
    this.splashRadius = splashRadius;
    this.enemies = enemies;
    this.canTargetFlying = canTargetFlying;
  }

  applyDamage() {
    if (this.target) {
      this.target.takeDamage(this.damage, this.towerType);

      for (let enemy of this.enemies) {
        if (enemy.isFlying && !this.canTargetFlying) {
          continue;
        }

        if (enemy !== this.target) {
          const distance = Math.hypot(
            this.target.x - enemy.x,
            this.target.y - enemy.y
          );
          if (distance <= this.splashRadius) {
            enemy.takeDamage(this.damage / 2, this.towerType);
          }
        }
      }
    }
    this.remove = true;
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);

    context.fillStyle = "black";
    context.beginPath();
    context.arc(0, 0, 6, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.strokeStyle = "gray";
    context.lineWidth = 2;
    context.moveTo(0, -6);
    context.quadraticCurveTo(5, -12, 0, -15);
    context.stroke();

    context.fillStyle = this.explosionFrames % 10 < 5 ? "yellow" : "orange";
    context.beginPath();
    context.arc(0, -15, 2, 0, Math.PI * 2);
    context.fill();

    context.restore();

    if (this.hasHitTarget) {
      context.beginPath();
      context.arc(
        this.target.x,
        this.target.y,
        this.splashRadius,
        0,
        Math.PI * 2
      );
      context.fillStyle = "rgba(255, 165, 0, 0.2)";
      context.fill();
      context.strokeStyle = "blue";
      context.lineWidth = 2;
      context.stroke();
    }
  }
}

class PiercingProjectile extends Projectile {
  constructor(
    startX,
    startY,
    direction,
    damage,
    maxDistance,
    enemies,
    towerType = "xray",
    canTargetFlying = false
  ) {
    super(startX, startY, null, 0, damage, towerType);
    this.direction = direction;
    this.enemies = enemies;
    this.remove = false;
    this.speed = 10;
    this.canTargetFlying = canTargetFlying;

    this.length = 20;
    this.width = 4;
    this.glowWidth = 12;
    this.angle = Math.atan2(direction.dy, direction.dx);
    this.pulsePhase = 0;
  }

  update() {
    if (this.remove) return;

    this.x += this.direction.dx * this.speed;
    this.y += this.direction.dy * this.speed;

    this.pulsePhase = (this.pulsePhase + 0.1) % (Math.PI * 2);

    this.enemies.forEach((enemy) => {
      if (enemy.isFlying && !this.canTargetFlying) return;

      const distanceToEnemy = Math.hypot(this.x - enemy.x, this.y - enemy.y);
      if (distanceToEnemy < 40) {
        enemy.takeDamage(this.damage, this.towerType);
      }
    });

    if (
      this.x < 0 ||
      this.y < 0 ||
      this.x > canvas.width ||
      this.y > canvas.height
    ) {
      this.remove = true;
    }
  }

  draw(context) {
    if (this.remove) return;

    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);

    const pulseIntensity = (Math.sin(this.pulsePhase) + 1) / 2;

    const glowGradient = context.createLinearGradient(
      -this.length,
      0,
      this.length,
      0
    );
    glowGradient.addColorStop(0, "rgba(0, 255, 255, 0)");
    glowGradient.addColorStop(
      0.2,
      `rgba(0, 255, 255, ${0.2 + pulseIntensity * 0.2})`
    );
    glowGradient.addColorStop(
      0.5,
      `rgba(0, 255, 255, ${0.4 + pulseIntensity * 0.3})`
    );
    glowGradient.addColorStop(
      0.8,
      `rgba(0, 255, 255, ${0.2 + pulseIntensity * 0.2})`
    );
    glowGradient.addColorStop(1, "rgba(0, 255, 255, 0)");

    context.fillStyle = glowGradient;
    context.fillRect(
      -this.length,
      -this.glowWidth / 2,
      this.length * 2,
      this.glowWidth
    );

    const coreGradient = context.createLinearGradient(
      -this.length,
      0,
      this.length,
      0
    );
    coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    coreGradient.addColorStop(
      0.2,
      `rgba(255, 255, 255, ${0.7 + pulseIntensity * 0.3})`
    );
    coreGradient.addColorStop(0.5, "#FFFFFF");
    coreGradient.addColorStop(
      0.8,
      `rgba(255, 255, 255, ${0.7 + pulseIntensity * 0.3})`
    );
    coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    context.fillStyle = coreGradient;
    context.fillRect(
      -this.length,
      -this.width / 2,
      this.length * 2,
      this.width
    );

    const particleCount = 3;
    context.fillStyle = "#FFFFFF";
    for (let i = 0; i < particleCount; i++) {
      const particleOffset =
        (i / particleCount) * this.length * 2 - this.length;
      const particleSize = 2 + pulseIntensity * 2;
      context.beginPath();
      context.arc(particleOffset, 0, particleSize, 0, Math.PI * 2);
      context.fill();
    }

    context.restore();
  }
}

class SniperProjectile extends Projectile {
  constructor(startX, startY, target, speed, damage, towerType = "sniper") {
    super(startX, startY, target, speed, damage, towerType);
  }

  draw(context) {
    context.save();

    context.translate(this.x, this.y);
    context.rotate(this.angle);

    const bulletLength = 28;
    const bulletWidth = 8;
    const tipSize = 10;

    context.fillStyle = "#d4af37";
    context.fillRect(
      -bulletLength / 2,
      -bulletWidth / 2,
      bulletLength,
      bulletWidth
    );

    context.fillStyle = "#4a4a4a";
    context.beginPath();
    context.moveTo(bulletLength / 2, 0);
    context.lineTo(bulletLength / 2 - tipSize, -bulletWidth / 2);
    context.lineTo(bulletLength / 2 - tipSize, bulletWidth / 2);
    context.closePath();
    context.fill();

    context.restore();
  }
}
class FreezingProjectile extends Projectile {
  constructor(
    startX,
    startY,
    target,
    speed,
    damage,
    freezeRadius,
    slowAmount,
    slowDuration,
    enemies,
    canTargetFlying,
    towerType = "freeze"
  ) {
    super(startX, startY, target, speed, damage, towerType);
    this.freezeRadius = freezeRadius;
    this.slowAmount = slowAmount;
    this.slowDuration = slowDuration;
    this.enemies = enemies;
    this.canTargetFlying = canTargetFlying;
    this.hasExploded = false;
    this.trailParticles = [];
  }

  applyDamage() {
    if (this.target && !this.hasExploded) {
      const currentTime = Date.now();

      this.enemies.forEach((enemy) => {
        if (enemy.isFlying && !this.canTargetFlying) return;

        const distance = Math.hypot(
          this.target.x - enemy.x,
          this.target.y - enemy.y
        );
        if (distance <= this.freezeRadius) {
          enemy.takeDamage(this.damage, this.towerType);
          enemy.applyFreeze(this.slowAmount, currentTime + this.slowDuration);
        }
      });

      this.hasExploded = true;
      this.remove = true;
    }
  }

  draw(context) {
    context.save();

    const gradient = context.createRadialGradient(
      this.x,
      this.y,
      2,
      this.x,
      this.y,
      7
    );
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.3, "cyan");
    gradient.addColorStop(1, "blue");

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(this.x, this.y, 6, 0, Math.PI * 2);
    context.fill();

    this.trailParticles.push({ x: this.x, y: this.y, opacity: 1 });
    this.trailParticles = this.trailParticles.filter((p) => p.opacity > 0);
    this.trailParticles.forEach((p, index) => {
      context.fillStyle = `rgba(173, 216, 230, ${p.opacity})`;
      context.beginPath();
      context.arc(p.x, p.y, 3, 0, Math.PI * 2);
      context.fill();
      p.opacity -= 0.05;
    });

    if (this.hasHitTarget) {
      context.beginPath();
      context.arc(
        this.target.x,
        this.target.y,
        this.freezeRadius,
        0,
        Math.PI * 2
      );
      context.fillStyle = "rgba(135, 206, 235, 0.3)";
      context.fill();
      context.strokeStyle = "rgba(135, 206, 235, 0.6)";
      context.lineWidth = 2;
      context.stroke();
    }

    context.restore();
  }
}

class AirDefenseProjectile extends Projectile {
  constructor(startX, startY, target, speed, damage) {
    super(startX, startY, target, speed, damage, "airdefense");
  }

  draw(context) {
    context.save();

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const angle = Math.atan2(dy, dx);

    context.translate(this.x, this.y);
    context.rotate(angle);

    context.fillStyle = "white";
    context.fillRect(0, -2, 10, 4);

    context.beginPath();
    context.moveTo(10, 0);
    context.lineTo(8, -3);
    context.lineTo(8, 3);
    context.closePath();
    context.fillStyle = "red";
    context.fill();

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(-5, -2);
    context.lineTo(-5, 2);
    context.closePath();
    context.fillStyle = "orange";
    context.fill();

    context.restore();
  }
}
