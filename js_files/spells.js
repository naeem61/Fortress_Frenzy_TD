class Spell {
  constructor(name, duration, cooldown) {
    this.name = name;
    this.duration = duration;
    this.cooldown = cooldown;
    this.isReady = true;
    this.lastUsedTime = 0;
    this.spellEndTime = 0;
    this.quantity = 0;

    this.activeSound = null;
  }

  canCast() {
    const currentTime = Date.now();
    return (
      this.isReady &&
      currentTime - this.lastUsedTime >= this.cooldown &&
      this.quantity > 0
    );
  }

  cast() {
    if (!this.canCast()) {
      console.log(`${this.name} is on cooldown or not available in inventory.`);
      return false;
    }
    this.isReady = false;
    this.lastUsedTime = Date.now();
    this.spellEndTime = this.lastUsedTime + this.duration;
    this.quantity--;

    const spellKey = this.name.toLowerCase().replace(" ", "");
    spellInventory[spellKey] = this.quantity;

    this.startSound();

    setTimeout(() => {
      this.stopSound();
      this.isReady = true;
    }, this.cooldown);
    return true;
  }

  startSound() {
    if (spellSounds[this.name]) {
      this.activeSound = spellSounds[this.name].play();
      if (this.activeSound) {
        this.activeSound.loop = true;
      }
    }
  }

  stopSound() {
    if (this.activeSound) {
      this.activeSound.loop = false;
      this.activeSound.pause();
      this.activeSound.currentTime = 0;
      this.activeSound = null;
    }
  }
}

class FireSpell extends Spell {
  constructor(radius, damagePerSecond) {
    super("fire", 4000, 10000);
    this.radius = radius;
    this.damagePerSecond = damagePerSecond;
  }

  applyEffect(x, y, enemies) {
    if (!this.cast()) return;

    activeSpells[this.name] = {
      x,
      y,
      endTime: Date.now() + this.duration,
    };

    console.log(`Fire Spell cast at (${x}, ${y})!`);

    selectedSpell = null;
    deselectSpellButtons();

    updateSpellCards();

    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime >= this.spellEndTime) {
        clearInterval(interval);
        this.stopSound();
        console.log("Fire Spell ended.");
        return;
      }

      enemies.forEach((enemy) => {
        const dx = enemy.x - x;
        const dy = enemy.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= this.radius) {
          enemy.takeDamage(this.damagePerSecond / 10);
        }
      });
    }, 100);
  }

  drawEffect(ctx, x, y) {
    ctx.save();

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
    gradient.addColorStop(0, "rgba(255, 165, 0, 0.8)");
    gradient.addColorStop(0.5, "rgba(255, 69, 0, 0.6)");
    gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    const pulseSize = Math.sin(Date.now() / 200) * 5;
    ctx.beginPath();
    ctx.arc(x, y, this.radius + pulseSize, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 69, 0, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}

class FreezeSpell extends Spell {
  constructor(radius, freezeDuration) {
    super("freeze", freezeDuration, 15000);
    this.radius = radius;
  }

  applyEffect(x, y, enemies) {
    if (!this.cast()) return;

    activeSpells[this.name] = {
      x,
      y,
      endTime: Date.now() + this.duration,
    };

    console.log(`Freeze Spell cast at (${x}, ${y})!`);

    selectedSpell = null;
    deselectSpellButtons();

    updateSpellCards();

    const freezeEndTime = Date.now() + this.duration;
    enemies.forEach((enemy) => {
      const dx = enemy.x - x;
      const dy = enemy.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= this.radius) {
        enemy.applyFreeze(0, freezeEndTime);
      }
    });

    setTimeout(() => {
      this.stopSound();
    }, this.duration);
  }

  drawEffect(ctx, x, y) {
    ctx.save();

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
    gradient.addColorStop(0, "rgba(220, 240, 255, 0.3)");
    gradient.addColorStop(0.3, "rgba(135, 206, 235, 0.25)");
    gradient.addColorStop(0.6, "rgba(0, 127, 255, 0.2)");
    gradient.addColorStop(1, "rgba(0, 61, 165, 0)");

    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    const crystalCount = 8;
    const time = Date.now() / 1000;

    for (let i = 0; i < crystalCount; i++) {
      const angle = (i / crystalCount) * Math.PI * 2;
      const wave = Math.sin(time * 2 + i) * 5;

      ctx.beginPath();
      ctx.moveTo(
        x + Math.cos(angle) * (this.radius * 0.3),
        y + Math.sin(angle) * (this.radius * 0.3)
      );
      ctx.lineTo(
        x + Math.cos(angle) * (this.radius + wave),
        y + Math.sin(angle) * (this.radius + wave)
      );

      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    const pulseSize = Math.sin(time * 4) * 3;
    ctx.beginPath();
    ctx.arc(x, y, this.radius + pulseSize, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(135, 206, 250, 0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}

class RageSpell extends Spell {
  constructor(radius, boostDuration, fireRateMultiplier) {
    super("rage", boostDuration, 15000);
    this.radius = radius;
    this.fireRateMultiplier = fireRateMultiplier;
  }

  applyEffect(x, y, towers) {
    if (!this.cast()) return;

    activeSpells[this.name] = {
      x,
      y,
      endTime: Date.now() + this.duration,
    };

    console.log(`Rage Spell cast at (${x}, ${y})!`);

    selectedSpell = null;
    deselectSpellButtons();

    updateSpellCards();

    const rageEndTime = Date.now() + this.duration;
    towers.forEach((tower) => {
      const dx = tower.x * 32 + 16 - x;
      const dy = tower.y * 32 + 16 - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= this.radius) {
        tower.fireRate /= this.fireRateMultiplier;
        tower.isRaged = true;
        tower.rageEndTime = rageEndTime;
      }
    });

    setTimeout(() => {
      towers.forEach((tower) => {
        if (tower.isRaged && tower.rageEndTime <= Date.now()) {
          tower.fireRate *= this.fireRateMultiplier;
          tower.isRaged = false;
        }
      });
      this.stopSound();
      console.log("Rage Spell ended.");
    }, this.duration);
  }

  drawEffect(ctx, x, y) {
    ctx.save();

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
    gradient.addColorStop(0, "rgba(147, 0, 211, 0.45)");
    gradient.addColorStop(0.4, "rgba(138, 43, 226, 0.4)");
    gradient.addColorStop(0.7, "rgba(148, 0, 211, 0.35)");
    gradient.addColorStop(1, "rgba(75, 0, 130, 0)");

    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    const swirls = 12;
    const time = Date.now() / 1000;

    for (let i = 0; i < swirls; i++) {
      const angle = (i / swirls) * Math.PI * 2;
      const spin = time * 2 + i * (Math.PI / 6);

      ctx.beginPath();
      ctx.moveTo(
        x + Math.cos(angle + spin) * (this.radius * 0.3),
        y + Math.sin(angle + spin) * (this.radius * 0.3)
      );
      ctx.lineTo(
        x + Math.cos(angle + spin) * (this.radius * 0.8),
        y + Math.sin(angle + spin) * (this.radius * 0.8)
      );

      ctx.strokeStyle = "rgba(186, 85, 211, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    const pulseSize = Math.sin(time * 6) * 4;
    ctx.beginPath();
    ctx.arc(x, y, this.radius + pulseSize, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(147, 112, 219, 0.6)";
    ctx.lineWidth = 3;
    ctx.stroke();

    const speedLines = 8;
    for (let i = 0; i < speedLines; i++) {
      const angle = (i / speedLines) * Math.PI * 2;
      const speedSpin = (time * 4 + i * (Math.PI / 4)) % (Math.PI * 2);

      ctx.beginPath();
      ctx.moveTo(
        x + Math.cos(angle + speedSpin) * (this.radius * 0.4),
        y + Math.sin(angle + speedSpin) * (this.radius * 0.4)
      );
      ctx.lineTo(
        x + Math.cos(angle + speedSpin) * (this.radius * 0.6),
        y + Math.sin(angle + speedSpin) * (this.radius * 0.6)
      );

      ctx.strokeStyle = "rgba(218, 112, 214, 0.45)";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    ctx.restore();
  }
}

const spells = {
  fire: new FireSpell(100, 50),
  freeze: new FreezeSpell(100, 5000),
  rage: new RageSpell(150, 5000, 2),
};

const activeSpells = {
  fire: null,
  freeze: null,
  rage: null,
};

function drawActiveSpells(ctx) {
  const currentTime = Date.now();

  Object.keys(activeSpells).forEach((spellKey) => {
    const spell = activeSpells[spellKey];
    if (spell && currentTime < spell.endTime) {
      spells[spellKey].drawEffect(ctx, spell.x, spell.y);
    } else {
      activeSpells[spellKey] = null;
    }
  });
}

const spellInventory = {
  fire: 0,
  freeze: 0,
  rage: 0,
};

function addSpellToInventory(spellName) {
  if (spells[spellName]) {
    spellInventory[spellName]++;
    spells[spellName].quantity++;
    console.log(`${spellName} spell added to inventory!`);
    updateSpellCards();
  }
}

function updateSpellCards() {
  const spellButtons = document.querySelectorAll(".spell-button");
  const currentTime = Date.now();

  spellButtons.forEach((button) => {
    const spellKey = button.id.replace("-spell", "");
    const spell = spells[spellKey];
    const quantity = spellInventory[spellKey] || 0;
    const quantitySpan = button.querySelector(".spell-quantity");
    const cooldownOverlay = button.querySelector(".cooldown-overlay");

    if (quantitySpan) {
      quantitySpan.textContent = quantity;
    }

    const timeSinceLastUse = currentTime - spell.lastUsedTime;
    const timeLeft = Math.max(0, spell.cooldown - timeSinceLastUse);
    const onCooldown = timeLeft > 0;

    button.disabled = quantity === 0 || onCooldown;

    if (cooldownOverlay) {
      if (onCooldown) {
        cooldownOverlay.style.display = "block";
        cooldownOverlay.textContent = `${(timeLeft / 1000).toFixed(1)}s`;
      } else {
        cooldownOverlay.style.display = "none";
      }
    }
  });

  requestAnimationFrame(updateSpellCards);
}

function deselectSpellButtons() {
  const spellButtons = document.querySelectorAll(".spell-button");
  spellButtons.forEach((button) => {
    button.classList.remove("selected");
  });
}

addSpellToInventory("fire");
addSpellToInventory("freeze");
addSpellToInventory("rage");

console.log("Updated spell inventory:", spellInventory);

const spellSounds = {
  fire: new AudioPool("assets/spell_sounds/fire__spell.m4a"),
  freeze: new AudioPool("assets/spell_sounds/ice__spell.m4a"),
  rage: new AudioPool("assets/spell_sounds/invisibility-spell-98622.mp3"),
};

function getSpellRadius(spellType) {
  if (!spells[spellType]) return 0;
  return spells[spellType].radius;
}

function drawSpellPreview() {
  if (!selectedSpell) return;

  const spellData = spells[selectedSpell];
  if (!spellData) return;

  spellPreviewTimer++;
  if (spellPreviewTimer % 10 === 0) {
    if (spellPreviewIncreasing) {
      spellPreviewAlpha += 0.3;
      if (spellPreviewAlpha >= 0.7) {
        spellPreviewIncreasing = false;
      }
    } else {
      spellPreviewAlpha -= 0.1;
      if (spellPreviewAlpha <= 0.4) {
        spellPreviewIncreasing = true;
      }
    }
  }

  ctx.globalAlpha = spellPreviewAlpha * 1;

  if (selectedSpell === "fire") {
    const gradient = ctx.createRadialGradient(
      mousePosition.x,
      mousePosition.y,
      0,
      mousePosition.x,
      mousePosition.y,
      spellData.radius
    );
    gradient.addColorStop(0, `rgba(255, 165, 0, ${spellPreviewAlpha * 0.5})`);
    gradient.addColorStop(0.5, `rgba(255, 69, 0, ${spellPreviewAlpha * 0.4})`);
    gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    ctx.beginPath();
    ctx.arc(mousePosition.x, mousePosition.y, spellData.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = `rgba(255, 69, 0, ${spellPreviewAlpha * 0.8})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (selectedSpell === "freeze") {
    const gradient = ctx.createRadialGradient(
      mousePosition.x,
      mousePosition.y,
      0,
      mousePosition.x,
      mousePosition.y,
      spellData.radius
    );
    gradient.addColorStop(0, `rgba(220, 240, 255, ${spellPreviewAlpha * 0.3})`);
    gradient.addColorStop(
      0.3,
      `rgba(135, 206, 235, ${spellPreviewAlpha * 0.25})`
    );
    gradient.addColorStop(0.6, `rgba(0, 127, 255, ${spellPreviewAlpha * 0.2})`);
    gradient.addColorStop(1, "rgba(0, 61, 165, 0)");

    ctx.beginPath();
    ctx.arc(mousePosition.x, mousePosition.y, spellData.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = `rgba(135, 206, 250, ${spellPreviewAlpha * 0.8})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (selectedSpell === "rage") {
    const gradient = ctx.createRadialGradient(
      mousePosition.x,
      mousePosition.y,
      0,
      mousePosition.x,
      mousePosition.y,
      spellData.radius
    );
    gradient.addColorStop(0, `rgba(147, 0, 211, ${spellPreviewAlpha * 0.3})`);
    gradient.addColorStop(
      0.4,
      `rgba(138, 43, 226, ${spellPreviewAlpha * 0.25})`
    );
    gradient.addColorStop(0.7, `rgba(148, 0, 211, ${spellPreviewAlpha * 0.2})`);
    gradient.addColorStop(1, "rgba(75, 0, 130, 0)");

    ctx.beginPath();
    ctx.arc(mousePosition.x, mousePosition.y, spellData.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = `rgba(147, 112, 219, ${spellPreviewAlpha * 0.8})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.globalAlpha = 1.0;
}

function setSpellSoundVolume(volume) {
  Object.values(spellSounds).forEach((pool) => {
    pool.setVolume(volume);
  });
}

function toggleSpellSounds(muted) {
  Object.values(spellSounds).forEach((pool) => {
    pool.mute(muted);
  });
}

function cleanupSpellSounds() {
  Object.values(spellSounds).forEach((pool) => {
    pool.audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  });
}
