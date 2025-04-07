// Game state management
let gameIsPaused = false;
let animationFrameId = null;

// Modified game initialization
window.onload = function () {
  // Initialize guide first
  initGuide();

  // Then initialize game mode
  if (multiplayerActive) {
    startMultiplayerMode();
  } else if (arcadeActive) {
    startArcadeMode();
  } else {
    startClassicMode();
  }
};

function createGuide() {
  const guideHTML = `

 

    <div id="game-guide" class="guide-modal" style="display: none;">
        <div class="guide-content">
            <div class="guide-header">
                <h2>Game Guide</h2>
                <button class="close-button" onclick="closeGuide()">&times;</button>
            </div>
            
            <div class="guide-tabs">
                <button class="tab-button active" onclick="openTab(event, 'howToPlay')">How to Play</button>
                <button class="tab-button" onclick="openTab(event, 'towers')">Towers</button>
                <button class="tab-button" onclick="openTab(event, 'enemies')">Enemies</button>
                <button class="tab-button" onclick="openTab(event, 'spells')">Spells</button>
            </div>

            <div id="howToPlay" class="tab-content active">
                <h3>Game Basics</h3>
                <p>Defend your fortress by strategically placing towers along the enemy path. Manage your resources and survive increasingly difficult waves of enemies.</p>
                
                <h3>Getting Started</h3>
                <ul>
                    <li>Start with 100 gold to build your initial defenses</li>
                    <li>Click on a tower from the selection panel to choose it</li>
                    <li>Click on a valid placement tile to build your tower</li>
                    <li>Upgrade towers by clicking on them and using the upgrade button</li>
                    <li>Use spells strategically to support your towers</li>
                </ul>

                <h3>Game Modes</h3>
                <ul>
                    <li><strong>Classic Mode:</strong> Survive 100 waves of increasingly difficult enemies</li>
                    <li><strong>Arcade Mode:</strong> Survive 100 waves with a unique challenge of randomly generated paths</li>
                    <li><strong>Multiplayer Mode:</strong> One player defends while another sends enemies</li>
                </ul>
            </div>

            <div id="towers" class="tab-content">
                <div class="tower-info">
                    <div class="tower-card">
                        <h3>Default Tower - 25 Gold</h3>
                        <img src="assets/tower_sprites/DefaultTower_alone.png" alt="Default Tower">
                        <p>Basic defense tower with balanced range and damage. Good for early game.</p>
                    </div>

                    <div class="tower-card">
                        <h3>Splash Tower - 50 Gold</h3>
                        <img src="assets/tower_sprites/splash_tower_alone.png" alt="Splash Tower">
                        <p>Deals area damage to groups of enemies. Excellent for clustered enemies.</p>
                    </div>

                    <div class="tower-card">
                        <h3>X-Ray Tower - 80 Gold</h3>
                        <img src="assets/tower_sprites/xray_alone.png" alt="X-Ray Tower">
                        <p>Pierces through multiple enemies in a line. Great for tight paths.</p>
                    </div>

                    <div class="tower-card">
                        <h3>Sniper Tower - 90 Gold</h3>
                        <img src="assets/tower_sprites/sniper_tower_alone.png" alt="Sniper Tower">
                        <p>Long range with high single-target damage. Perfect for strong enemies.</p>
                    </div>

                    <div class="tower-card">
                        <h3>Freezing Tower - 75 Gold</h3>
                        <img src="assets/tower_sprites/ice_tower_alone.png" alt="Freezing Tower">
                        <p>Slows enemies within range. Excellent support tower.</p>
                    </div>

                    <div class="tower-card">
                        <h3>Air Defence Tower - 80 Gold</h3>
                        <img src="assets/tower_sprites/air_defence_alone.png" alt="Air Defence Tower">
                        <p>Specializes in targeting flying enemies. Essential for late game.</p>
                    </div>
                </div>
            </div>

            <div id="enemies" class="tab-content">
            <div class="enemy-info">
                <div class="enemy-card">
                    <h3>Basic Enemy</h3>
                    <p>Standard ground unit with balanced health and speed.</p>
                    <ul>
                        <li>Health: 100</li>
                        <li>Speed: 2</li>
                        <li>Damage: 1</li>
                        <li>Reward: 1 Gold</li>
                        <li>Spell Drop Chance: 1%</li>
                    </ul>
                </div>

                <div class="enemy-card">
                    <h3>Fast Enemy</h3>
                    <p>Quick unit with lower health. Can slip through defenses if not careful.</p>
                    <ul>
                        <li>Health: 70</li>
                        <li>Speed: 4</li>
                        <li>Damage: 2</li>
                        <li>Reward: 2 Gold</li>
                        <li>Spell Drop Chance: 3%</li>
                    </ul>
                </div>

                <div class="enemy-card">
                    <h3>Tank Enemy</h3>
                    <p>Slow but very tough. Requires significant firepower to take down.</p>
                    <ul>
                        <li>Health: 200</li>
                        <li>Speed: 1</li>
                        <li>Damage: 5</li>
                        <li>Reward: 2 Gold</li>
                        <li>Spell Drop Chance: 4%</li>
                    </ul>
                </div>

                <div class="enemy-card">
                    <h3>Flying Enemy</h3>
                    <p>Bypasses ground obstacles. Can only be hit by certain towers.</p>
                    <ul>
                        <li>Health: 80</li>
                        <li>Speed: 3</li>
                        <li>Damage: 2</li>
                        <li>Reward: 3 Gold</li>
                        <li>Spell Drop Chance: 5%</li>
                    </ul>
                </div>

                <div class="enemy-card">
                    <h3>Flying Tank Enemy</h3>
                    <p>A tough aerial unit that can absorb significant damage.</p>
                    <ul>
                        <li>Health: 150</li>
                        <li>Speed: 2</li>
                        <li>Damage: 2</li>
                        <li>Reward: 3 Gold</li>
                        <li>Spell Drop Chance: 7%</li>
                    </ul>
                </div>

                <div class="enemy-card">
                    <h3>Balloon Enemy</h3>
                    <p>Special floating unit that drops enemies onto the path.</p>
                    <ul>
                        <li>Health: 150</li>
                        <li>Speed: 2</li>
                        <li>Damage: 3</li>
                        <li>Reward: 6 Gold</li>
                        <li>Spell Drop Chance: 10%</li>
                        <li>Special: Drops enemies periodically</li>
                    </ul>
                </div>

                  <div class="enemy-card">
                    <h3>Shielded Enemy</h3>
                    <p>Protected by a shield that absorbs damage before its health is affected. Splash towers deal extra damage to shields.</p>
                    <ul>
                        <li>Health: 120</li>
                        <li>Speed: 1</li>
                        <li>Damage: 3</li>
                        <li>Reward: 4 Gold</li>
                        <li>Shield Strength: 50</li>
                        <li>Shield Properties: Takes 140% damage from splash towers, 30% damage from other towers</li>
                        <li>Spell Drop Chance: 1%</li>
                    </ul>
                    </div>

                    <div class="enemy-card">
                    <h3>Throwing Enemy</h3>
                    <p>Carries and periodically throws smaller enemies onto the path, effectively spawning additional threats.</p>
                    <ul>
                        <li>Health: Variable</li>
                        <li>Speed: Variable</li>
                        <li>Damage: 3</li>
                        <li>Reward: 4 Gold</li>
                        <li>Special: Throws new enemies at set intervals</li>
                        <li>Spell Drop Chance: 15%</li>
                    </ul>
                    </div>

                    <div class="enemy-card">
                    <h3>Disabling Enemy</h3>
                    <p>Emits a disabling field that affects nearby towers.</p>
                    <ul>
                        <li>Health: 80</li>
                        <li>Speed: 2</li>
                        <li>Damage: 3</li>
                        <li>Reward: 5 Gold</li>
                        <li>Disable Radius: 120px</li>
                        <li>Spell Drop Chance: 20%</li>
                    </ul>
                    </div>

                    <div class="enemy-card">
                    <h3>Healing Enemy</h3>
                    <p>Restores health to nearby enemies, making them harder to eliminate.</p>
                    <ul>
                        <li>Health: 100</li>
                        <li>Speed: 2</li>
                        <li>Damage: 2</li>
                        <li>Reward: 5 Gold</li>
                        <li>Heal Radius: 150px</li>
                        <li>Heal Amount: 5 health per second</li>
                        <li>Spell Drop Chance: 20%</li>
                    </ul>
                    </div>

                    <div class="enemy-card">
                    <h3>Smart Enemy</h3>
                    <p>Advanced unit that adapts its behavior based on battlefield conditions. Can change states depending on health and threats.</p>
                    <ul>
                        <li>Health: Random (Up to 100)</li>
                        <li>Base Speed: 2</li>
                        <li>Damage: 2</li>
                        <li>Reward: 4 Gold</li>
                        <li>Spell Drop Chance: 50%</li>
                    </ul>
                    <h4>States:</h4>
                    <ul>
                        <li><strong>Normal:</strong> Default state with balanced movement.</li>
                        <li><strong>Defensive:</strong> Activated at low health (below 40%). Reduces speed by 20% but gains 40% damage reduction.</li>
                        <li><strong>Aggressive:</strong> Activated at high health (above 80%) with few towers nearby. Doubles speed but takes 50% more damage.</li>
                        <li><strong>Evasive:</strong> Activated when threats exceed tolerance. Grants 20% damage reduction and can trigger dash ability.</li>
                    </ul>
                    <h4>Special Abilities:</h4>
                    <ul>
                        <li><strong>Dash:</strong> Triples speed for 3 seconds when in evasive state. Has a 2-second cooldown.</li>
                        <li><strong>Speed Boost:</strong> Doubles speed for 1 second when low on health or surrounded. Has an 8-second cooldown.</li>
                    </ul>
                </div>
                <div class="enemy-card">
                    <h3>Coward Enemy</h3>
                    <p>Flying unit that actively avoids towers and prioritizes survival. Becomes more evasive at lower health.</p>
                    <ul>
                        <li>Health: Random (Up to 100)</li>
                        <li>Base Speed: 2</li>
                        <li>Damage: 1</li>
                        <li>Reward: 3 Gold</li>
                        <li>Spell Drop Chance: 30%</li>
                        <li>Special: Flying (immune to ground-only towers)</li>
                    </ul>
                    <h4>States:</h4>
                    <ul>
                        <li><strong>Normal:</strong> Default state when no towers are visible.</li>
                        <li><strong>Cautious:</strong> Activated when towers are visible. Reduces speed by 20% but increases vision range.</li>
                        <li><strong>Panic:</strong> Activated at low health (below 40%). Increases speed by 30% and vision range.</li>
                        <li><strong>Fleeing:</strong> Activated when under high threat. Increases speed by 50% and maximizes vision range for a short duration.</li>
                    </ul>
                    <h4>Special Abilities:</h4>
                    <ul>
                        <li><strong>Tower Avoidance:</strong> Actively detects and avoids towers within its vision range.</li>
                        <li><strong>Path Deviation:</strong> Can temporarily leave the path to find safer routes before returning.</li>
                        <li><strong>Flying:</strong> Immune to X-ray, splash, and freezing tower attacks.</li>
                    </ul>
                </div>

                 <div class="enemy-card">
            <h3>Adaptive Enemy</h3>
            <p>Intelligent flying unit that learns from past defeats and adapts its behavior.</p>
            <ul>
                <li>Health: 120 (increases with adaptation level)</li>
                <li>Speed: 2 (increases with adaptation level)</li>
                <li>Damage: 5</li>
                <li>Reward: 2 Gold</li>
                <li>Flying: Yes (immune to ground obstacles)</li>
            </ul>
            <div class="enemy-special">
                <h4>Adaptation Features:</h4>
                <ul>
                    <li>Shares collective memory with other Adaptive Enemies</li>
                    <li>Remembers dangerous areas where others have died</li>
                    <li>Avoids towers and known danger zones</li>
                    <li>Increases vision range and personal space with each adaptation level</li>
                    <li>Can deviate from path to find safer routes</li>
                    <li>Adaptation level increases up to a maximum of 7</li>
                    <li>Each level grants:
                        <ul>
                            <li>10% increased health</li>
                            <li>10% increased speed</li>
                            <li>10 unit increase in vision range</li>
                            <li>5 unit increase in personal space</li>
                        </ul>
                    </li>
                </ul>
                <h4>Tactical Behavior:</h4>
                <p>Dynamically adjusts path based on nearby towers and returns to original path when safe. Develops more intelligent avoidance patterns as game progresses and shows visual indicators of adaptation level and learned danger zones.</p>
            </div>
        </div>

                    <h2>Boss Enemies</h2>
                    
                    <div class="enemy-card boss">
                    <h3>Shielded Boss</h3>
                    <p>Heavily shielded enemy that regenerates its shield after it breaks. When defeated, spawns three Shielded Enemies.</p>
                    <ul>
                        <li>Health: 500</li>
                        <li>Speed: 1</li>
                        <li>Damage: 10</li>
                        <li>Reward: 10 Gold</li>
                        <li>Shield Strength: 200</li>
                        <li>Shield Regeneration: Every 7 seconds after breaking</li>
                        <li>Special: Spawns 3 Shielded Enemies on death</li>
                        <li>Spell Drop Chance: 100%</li>
                    </ul>
                    </div>

                    <div class="enemy-card boss">
                    <h3>Destroyer Boss</h3>
                    <p>Fires projectiles at towers within range, destroying them completely.</p>
                    <ul>
                        <li>Health: 300</li>
                        <li>Speed: 1</li>
                        <li>Damage: 10</li>
                        <li>Reward: 10 Gold</li>
                        <li>Destroy Radius: 150px</li>
                        <li>Fire Rate: One shot every 8 seconds</li>
                        <li>Special: Projectiles destroy towers on impact</li>
                        <li>Spell Drop Chance: 100%</li>
                    </ul>
                    </div>

                    <div class="enemy-card boss">
                    <h3>Rage Boss</h3>
                    <p>Emits a rage aura that increases the speed of nearby enemies while reducing damage they take.</p>
                    <ul>
                        <li>Health: 300</li>
                        <li>Speed: 1</li>
                        <li>Damage: 20</li>
                        <li>Reward: 50 Gold</li>
                        <li>Rage Radius: 150px</li>
                        <li>Speed Boost: 150% to affected enemies</li>
                        <li>Damage Reduction: 50% for affected enemies</li>
                        <li>Boost Duration: 3 seconds after leaving radius</li>
                        <li>Spell Drop Chance: 100%</li>
                    </ul>
                    </div>

                         <div class="enemy-card">
                    <h3>Weather Boss</h3>
                    <p>Powerful enemy that can manipulate weather conditions, affecting both towers and other enemies.</p>
                    <ul>
                        <li>Health: 220</li>
                        <li>Speed: 1 (varies by weather state)</li>
                        <li>Damage: 10</li>
                        <li>Reward: 3 Gold</li>
                        <li>Spell Drop Chance: 70%</li>
                    </ul>
                    <div class="enemy-special">
                        <h4>Weather States:</h4>
                        <ul>
                            <li><strong>Normal:</strong> No special effects</li>
                            <li><strong>Rainy:</strong> Boss moves 30% faster, takes 20% more damage, all enemies move 50% faster</li>
                            <li><strong>Foggy:</strong> Boss moves 20% slower, reduces tower range by 30%</li>
                            <li><strong>Snowy:</strong> Boss moves 40% slower, reduces tower fire rate by 80%</li>
                        </ul>
                        <h4>Tactical Behavior:</h4>
                        <p>The Weather Boss intelligently switches between states based on battlefield conditions. It evaluates threats, its own health, and nearby enemies to make strategic decisions:</p>
                        <ul>
                            <li>At low health, it favors Foggy and Snowy states for protection</li>
                            <li>When surrounded by towers, it prefers Foggy state to reduce their range</li>
                            <li>When many enemies are nearby, it prefers Rainy state to boost their speed</li>
                            <li>Regularly changes states to keep players adapting their strategy</li>
                        </ul>
                    </div>
                </div>

                <div class="enemy-card">
                    <h3>Status Effects</h3>
                    <p>Enemies can be affected by various status effects:</p>
                    <ul>
                        <li><strong>Frozen:</strong> Reduces enemy speed temporarily</li>
                        <li><strong>Raged:</strong> Reduces damage taken by enemy</li>
                        <li><strong>Spell Drops:</strong> Enemies have a chance to drop fire, freeze, or rage spells when defeated</li>
                    </ul>
                </div>
            </div>
        </div>
            <div id="spells" class="tab-content">
                <h3>Spell System</h3>
                <p>Spells are powerful abilities that can turn the tide of battle. Each spell has a cooldown period and requires charges to use. Collect spell charges throughout the game to build your arsenal.</p>
                
                <div class="tower-info">
                    <div class="tower-card">
                        <h3>Fire Spell</h3>
                        <p>Creates a burning area of effect that damages enemies over time.</p>
                        <ul>
                            <li>Duration: 4 seconds</li>
                            <li>Cooldown: 10 seconds</li>
                            <li>Damage: 50 per second</li>
                            <li>Area: 100 pixel radius</li>
                        </ul>
                    </div>

                    <div class="tower-card">
                        <h3>Freeze Spell</h3>
                        <p>Temporarily freezes enemies in place within its area of effect.</p>
                        <ul>
                            <li>Duration: 5 seconds</li>
                            <li>Cooldown: 15 seconds</li>
                            <li>Effect: Stops enemy movement</li>
                            <li>Area: 100 pixel radius</li>
                        </ul>
                    </div>

                    <div class="tower-card">
                        <h3>Rage Spell</h3>
                        <p>Enhances tower fire rate within its area of effect.</p>
                        <ul>
                            <li>Duration: 5 seconds</li>
                            <li>Cooldown: 15 seconds</li>
                            <li>Effect: Doubles tower fire rate</li>
                            <li>Area: 150 pixel radius</li>
                        </ul>
                    </div>
                </div>

                <h3>Spell Tips</h3>
                <ul>
                    <li>Time your spells carefully - wait for enemy clusters to maximize their effect</li>
                    <li>Combine spells strategically - Freeze + Fire can deal massive damage to tough enemies</li>
                    <li>Use Rage spell on your most powerful towers for maximum effectiveness</li>
                    <li>Save some spell charges for boss waves</li>
                </ul>
            </div>
        *${
          document.getElementById("game-guide")
            ? document.getElementById("game-guide").innerHTML
            : ""
        }
        </div>
    </div>`;

  // Only insert if it doesn't exist
  document.body.insertAdjacentHTML("beforeend", guideHTML);
}

function pauseGame() {
  if (!gameIsPaused) {
    gameIsPaused = true;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }
}

function resumeGame() {
  if (gameIsPaused) {
    gameIsPaused = false;
    // Resume the game loop based on current mode
    const selectedMode = localStorage.getItem("gameMode") || "classic";
    if (selectedMode === "classic") {
      animationFrameId = requestAnimationFrame(updateClassicMode);
    } else if (selectedMode === "arcade") {
      animationFrameId = requestAnimationFrame(updateArcadeMode);
    } else if (selectedMode === "multiplayer") {
      animationFrameId = requestAnimationFrame(updateMultiplayerMode);
    }
  }
}

// Guide control functions
function openGuide() {
  const guideElement = document.getElementById("game-guide");
  if (!guideElement) {
    console.error("Guide element not found! Reinitializing...");
    initGuide();
  }
  document.getElementById("game-guide").style.display = "flex";
  pauseGame(); // Pause the game when guide is opened
}

function closeGuide() {
  const guideElement = document.getElementById("game-guide");
  if (guideElement) {
    guideElement.style.display = "none";
    resumeGame(); // Resume the game when guide is closed
  }
}

function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let content of tabContents) {
    content.classList.remove("active");
  }

  const tabButtons = document.getElementsByClassName("tab-button");
  for (let button of tabButtons) {
    button.classList.remove("active");
  }

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

// Initialize guide
function initGuide() {
  createGuide();

  const guideElement = document.getElementById("game-guide");
  if (!guideElement) {
    console.error("Failed to initialize guide!");
    return;
  }

  // Add click outside listener
  guideElement.addEventListener("click", function (event) {
    if (event.target === this) {
      closeGuide();
    }
  });

  // Add escape key listener
  document.addEventListener("keydown", function (event) {
    if (event.key === "o" && guideElement.style.display === "flex") {
      closeGuide();
    }
  });
}

// Export functions
window.openGuide = openGuide;
window.closeGuide = closeGuide;
window.openTab = openTab;
window.initGuide = initGuide;
