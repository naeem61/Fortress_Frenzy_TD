class Spell {
  constructor(name, duration, cooldown) {
    this.name = name; // Name of the spell
    this.duration = duration; // Duration in milliseconds
    this.cooldown = cooldown; // Cooldown in milliseconds
    this.isReady = true; // Whether the spell is ready to use
    this.lastUsedTime = 0; // Last time the spell was used
    this.spellEndTime = 0; // Time when the spell effect ends
    this.quantity = 0; // How many spells the player has

    this.activeSound = null; // Track the currently playing sound
  }

  // Check if the spell is ready to cast and available in inventory
  canCast() {
    const currentTime = Date.now();
    return (
      this.isReady &&
      currentTime - this.lastUsedTime >= this.cooldown &&
      this.quantity > 0
    );
  }

  // Cast the spell
  cast() {
    if (!this.canCast()) {
      console.log(`${this.name} is on cooldown or not available in inventory.`);
      return false;
    }
    this.isReady = false;
    this.lastUsedTime = Date.now();
    this.spellEndTime = this.lastUsedTime + this.duration; // Set end time for the effect
    this.quantity--; // Reduce spell count

    // Update the spellInventory object
    const spellKey = this.name.toLowerCase().replace(" ", ""); // e.g., "fire spell" -> "firespell"
    spellInventory[spellKey] = this.quantity;

    this.startSound();

    // Ensure cooldown is respected
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
        this.activeSound.loop = true; // Enable looping for continuous effects
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
    super("fire", 4000, 10000); // Duration: 4s, Cooldown: 10s
    this.radius = radius; // AoE radius
    this.damagePerSecond = damagePerSecond; // Damage per second
  }

  // Apply AoE damage
  applyEffect(x, y, enemies) {
    if (!this.cast()) return; // Check if the spell can be cast

    activeSpells[this.name] = {
      x,
      y,
      endTime: Date.now() + this.duration,
    };

    console.log(`Fire Spell cast at (${x}, ${y})!`);

    // Deselect the spell after casting
    selectedSpell = null;
    deselectSpellButtons(); // Ensure the button is visually unselected

    // Update the spell inventory UI
    updateSpellCards();

    // Deal damage over the duration
    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime >= this.spellEndTime) {
        clearInterval(interval); // Stop after duration
        this.stopSound(); // Stop the sound when the spell ends
        console.log("Fire Spell ended.");
        return;
      }

      // Apply damage to enemies within the radius
      enemies.forEach((enemy) => {
        const dx = enemy.x - x;
        const dy = enemy.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= this.radius) {
          enemy.takeDamage(this.damagePerSecond / 10); // Spread damage evenly per tick
        }
      });
    }, 100); // Damage is applied every 100ms
  }

  drawEffect(ctx, x, y) {
    ctx.save();

    // Draw the main fire circle
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
    gradient.addColorStop(0, "rgba(255, 165, 0, 0.8)"); // Orange core
    gradient.addColorStop(0.5, "rgba(255, 69, 0, 0.6)"); // Red-orange middle
    gradient.addColorStop(1, "rgba(255, 0, 0, 0)"); // Fade to transparent

    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add a simple pulsing ring
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
    super("freeze", freezeDuration, 15000); // Freeze duration and 15s cooldown
    this.radius = radius; // AoE radius for the freeze effect
  }

  // Apply freeze effect
  applyEffect(x, y, enemies) {
    if (!this.cast()) return; // Check if the spell can be cast

    activeSpells[this.name] = {
      x,
      y,
      endTime: Date.now() + this.duration,
    };

    console.log(`Freeze Spell cast at (${x}, ${y})!`);

    // Deselect the spell after casting
    selectedSpell = null;
    deselectSpellButtons(); // Ensure the button is visually unselected

    // Update the spell inventory UI
    updateSpellCards();

    // Freeze all enemies within the radius
    const freezeEndTime = Date.now() + this.duration;
    enemies.forEach((enemy) => {
      const dx = enemy.x - x;
      const dy = enemy.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= this.radius) {
        enemy.applyFreeze(0, freezeEndTime); // Freeze enemy by setting speed to 0
      }
    });

    setTimeout(() => {
      this.stopSound();
    }, this.duration);
  }

  drawEffect(ctx, x, y) {
    ctx.save();

    // Create a more transparent icy gradient
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
    gradient.addColorStop(0, "rgba(220, 240, 255, 0.3)"); // Very light, transparent core
    gradient.addColorStop(0.3, "rgba(135, 206, 235, 0.25)"); // Light blue, more transparent
    gradient.addColorStop(0.6, "rgba(0, 127, 255, 0.2)"); // Medium blue, very transparent
    gradient.addColorStop(1, "rgba(0, 61, 165, 0)"); // Fade to nothing

    // Draw main freeze area
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add subtle crystalline pattern
    const crystalCount = 8;
    const time = Date.now() / 1000;

    for (let i = 0; i < crystalCount; i++) {
      const angle = (i / crystalCount) * Math.PI * 2;
      const wave = Math.sin(time * 2 + i) * 5;

      // Draw ice crystal spikes
      ctx.beginPath();
      ctx.moveTo(
        x + Math.cos(angle) * (this.radius * 0.3),
        y + Math.sin(angle) * (this.radius * 0.3)
      );
      ctx.lineTo(
        x + Math.cos(angle) * (this.radius + wave),
        y + Math.sin(angle) * (this.radius + wave)
      );

      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"; // More transparent crystal lines
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Add lighter pulsing outer ring
    const pulseSize = Math.sin(time * 4) * 3;
    ctx.beginPath();
    ctx.arc(x, y, this.radius + pulseSize, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(135, 206, 250, 0.4)"; // More transparent ring
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}

class RageSpell extends Spell {
  constructor(radius, boostDuration, fireRateMultiplier) {
    super("rage", boostDuration, 15000); // Boost duration and 15s cooldown
    this.radius = radius; // AoE radius for the rage effect
    this.fireRateMultiplier = fireRateMultiplier; // Multiplier for tower fire rate
  }

  // Apply the rage effect
  applyEffect(x, y, towers) {
    if (!this.cast()) return; // Check if the spell can be cast

    activeSpells[this.name] = {
      x,
      y,
      endTime: Date.now() + this.duration,
    };

    console.log(`Rage Spell cast at (${x}, ${y})!`);

    // Deselect the spell after casting
    selectedSpell = null;
    deselectSpellButtons(); // Ensure the button is visually unselected

    // Update the spell inventory UI
    updateSpellCards();

    // Boost the fire rate of towers within the radius
    const rageEndTime = Date.now() + this.duration;
    towers.forEach((tower) => {
      const dx = tower.x * 32 + 16 - x; // Tower center X
      const dy = tower.y * 32 + 16 - y; // Tower center Y
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= this.radius) {
        // Apply fire rate boost
        tower.fireRate /= this.fireRateMultiplier;
        tower.isRaged = true; // Add a flag for visual effects or logic
        tower.rageEndTime = rageEndTime;
      }
    });

    // Reset the fire rate of towers after the boost duration
    setTimeout(() => {
      towers.forEach((tower) => {
        if (tower.isRaged && tower.rageEndTime <= Date.now()) {
          tower.fireRate *= this.fireRateMultiplier; // Revert fire rate
          tower.isRaged = false;
        }
      });
      this.stopSound();
      console.log("Rage Spell ended.");
    }, this.duration);
  }

  drawEffect(ctx, x, y) {
    ctx.save();

    // Create more vibrant purple gradient
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
    gradient.addColorStop(0, "rgba(147, 0, 211, 0.45)"); // Brighter purple core
    gradient.addColorStop(0.4, "rgba(138, 43, 226, 0.4)"); // More visible blue violet
    gradient.addColorStop(0.7, "rgba(148, 0, 211, 0.35)"); // Stronger dark violet
    gradient.addColorStop(1, "rgba(75, 0, 130, 0)"); // Fade out at edge

    // Draw main rage area
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add energy swirls
    const swirls = 12;
    const time = Date.now() / 1000;

    for (let i = 0; i < swirls; i++) {
      const angle = (i / swirls) * Math.PI * 2;
      const spin = time * 2 + i * (Math.PI / 6);

      // Draw energy lines
      ctx.beginPath();
      ctx.moveTo(
        x + Math.cos(angle + spin) * (this.radius * 0.3),
        y + Math.sin(angle + spin) * (this.radius * 0.3)
      );
      ctx.lineTo(
        x + Math.cos(angle + spin) * (this.radius * 0.8),
        y + Math.sin(angle + spin) * (this.radius * 0.8)
      );

      ctx.strokeStyle = "rgba(186, 85, 211, 0.5)"; // Stronger medium orchid
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Add pulsing outer ring
    const pulseSize = Math.sin(time * 6) * 4;
    ctx.beginPath();
    ctx.arc(x, y, this.radius + pulseSize, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(147, 112, 219, 0.6)"; // More visible purple ring
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add speed lines
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

      ctx.strokeStyle = "rgba(218, 112, 214, 0.45)"; // More visible orchid
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    ctx.restore();
  }
}

const spells = {
  fire: new FireSpell(100, 50), // Radius: 100px, 50 DPS
  freeze: new FreezeSpell(100, 5000), // Radius: 100px, Freeze duration: 5s
  rage: new RageSpell(150, 5000, 2), // Radius: 150px, Duration: 5s, Fire rate x2
};

//let lastSpellPosition = { x: null, y: null }; // Tracks the last spell's position

const activeSpells = {
  fire: null, // Tracks the active position and end time for the fire spell
  freeze: null, // Tracks the active position and end time for the freeze spell
  rage: null, // Tracks the active position and end time for the rage spell
};

function drawActiveSpells(ctx) {
  const currentTime = Date.now();

  Object.keys(activeSpells).forEach((spellKey) => {
    const spell = activeSpells[spellKey];
    if (spell && currentTime < spell.endTime) {
      // Draw the active spell effect
      spells[spellKey].drawEffect(ctx, spell.x, spell.y);
    } else {
      // Clear the active spell if expired
      activeSpells[spellKey] = null;
    }
  });
}

const spellInventory = {
  fire: 0, // Default: no fire spells
  freeze: 0,
  rage: 0,
};

// Add spell to inventory
function addSpellToInventory(spellName) {
  if (spells[spellName]) {
    spellInventory[spellName]++;
    spells[spellName].quantity++; // Update the spell's internal quantity
    console.log(`${spellName} spell added to inventory!`);
    updateSpellCards(); // Update the UI to reflect the new inventory
  }
}

function updateSpellCards() {
  const spellButtons = document.querySelectorAll(".spell-button");
  const currentTime = Date.now();

  spellButtons.forEach((button) => {
    const spellKey = button.id.replace("-spell", ""); // e.g., "fire-spell" -> "fire"
    const spell = spells[spellKey];
    const quantity = spellInventory[spellKey] || 0; // Get inventory count
    const quantitySpan = button.querySelector(".spell-quantity");
    const cooldownOverlay = button.querySelector(".cooldown-overlay");

    // Update quantity display
    if (quantitySpan) {
      quantitySpan.textContent = quantity;
    }

    // Calculate cooldown time remaining
    const timeSinceLastUse = currentTime - spell.lastUsedTime;
    const timeLeft = Math.max(0, spell.cooldown - timeSinceLastUse);
    const onCooldown = timeLeft > 0;

    // Update button state
    button.disabled = quantity === 0 || onCooldown;

    // Update cooldown overlay
    if (cooldownOverlay) {
      if (onCooldown) {
        cooldownOverlay.style.display = "block";
        cooldownOverlay.textContent = `${(timeLeft / 1000).toFixed(1)}s`; // Show remaining cooldown time
      } else {
        cooldownOverlay.style.display = "none";
      }
    }
  });

  // Keep updating cooldown display
  requestAnimationFrame(updateSpellCards);
}

function deselectSpellButtons() {
  const spellButtons = document.querySelectorAll(".spell-button");
  spellButtons.forEach((button) => {
    button.classList.remove("selected"); // Remove the active class
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

// Function to get spell radius
function getSpellRadius(spellType) {
  if (!spells[spellType]) return 0;
  return spells[spellType].radius;
}

// Draw a preview of the spell range when a spell is selected
function drawSpellPreview() {
  // Only draw if a spell is selected
  if (!selectedSpell) return;

  const spellData = spells[selectedSpell];
  if (!spellData) return;

  // Animate preview alpha for a pulsing effect
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

  // Draw a preview of what the spell effect would look like
  ctx.globalAlpha = spellPreviewAlpha * 1; // Make the preview semi-transparent

  // Draw the spell effect with customized transparency
  if (selectedSpell === "fire") {
    // Draw fire spell preview with adjusted transparency
    const gradient = ctx.createRadialGradient(
      mousePosition.x,
      mousePosition.y,
      0,
      mousePosition.x,
      mousePosition.y,
      spellData.radius
    );
    gradient.addColorStop(0, `rgba(255, 165, 0, ${spellPreviewAlpha * 0.5})`); // Orange core
    gradient.addColorStop(0.5, `rgba(255, 69, 0, ${spellPreviewAlpha * 0.4})`); // Red-orange middle
    gradient.addColorStop(1, "rgba(255, 0, 0, 0)"); // Fade to transparent

    ctx.beginPath();
    ctx.arc(mousePosition.x, mousePosition.y, spellData.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add border to show range clearly
    ctx.strokeStyle = `rgba(255, 69, 0, ${spellPreviewAlpha * 0.8})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (selectedSpell === "freeze") {
    // Draw freeze spell preview with adjusted transparency
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

    // Add border
    ctx.strokeStyle = `rgba(135, 206, 250, ${spellPreviewAlpha * 0.8})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (selectedSpell === "rage") {
    // Draw rage spell preview with adjusted transparency
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

    // Add border
    ctx.strokeStyle = `rgba(147, 112, 219, ${spellPreviewAlpha * 0.8})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Reset global alpha to default
  ctx.globalAlpha = 1.0;
}

// Volume and mute control functions for spell sounds
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

// Cleanup function for spell sounds
function cleanupSpellSounds() {
  Object.values(spellSounds).forEach((pool) => {
    pool.audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  });
}
