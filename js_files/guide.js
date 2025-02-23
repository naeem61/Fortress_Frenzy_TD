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
                    <li><strong>Arcade Mode:</strong> Face unique challenges with multiple paths and special rules</li>
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
                        <img src="assets/towers/splash-tower.png" alt="Splash Tower">
                        <p>Deals area damage to groups of enemies. Excellent for clustered enemies.</p>
                    </div>

                    <div class="tower-card">
                        <h3>X-Ray Tower - 100 Gold</h3>
                        <img src="assets/tower_sprites/xray_alone.png" alt="X-Ray Tower">
                        <p>Pierces through multiple enemies in a line. Great for tight paths.</p>
                    </div>

                    <div class="tower-card">
                        <h3>Sniper Tower - 100 Gold</h3>
                        <img src="assets/tower_sprites/sniper_tower_alone.png" alt="Sniper Tower">
                        <p>Long range with high single-target damage. Perfect for strong enemies.</p>
                    </div>

                    <div class="tower-card">
                        <h3>Freezing Tower - 100 Gold</h3>
                        <img src="assets/tower_sprites/ice_tower_alone.png" alt="Freezing Tower">
                        <p>Slows enemies within range. Excellent support tower.</p>
                    </div>

                    <div class="tower-card">
                        <h3>Air Defence Tower - 100 Gold</h3>
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
                            <li>Health: Medium</li>
                            <li>Speed: Normal</li>
                            <li>Reward: 5 Gold</li>
                        </ul>
                    </div>

                    <div class="enemy-card">
                        <h3>Fast Enemy</h3>
                        <p>Quick unit with low health. Can slip through defenses if not careful.</p>
                        <ul>
                            <li>Health: Low</li>
                            <li>Speed: Very Fast</li>
                            <li>Reward: 8 Gold</li>
                        </ul>
                    </div>

                    <div class="enemy-card">
                        <h3>Heavy Enemy</h3>
                        <p>Slow but very tough. Requires significant firepower to take down.</p>
                        <ul>
                            <li>Health: High</li>
                            <li>Speed: Slow</li>
                            <li>Reward: 15 Gold</li>
                        </ul>
                    </div>

                    <div class="enemy-card">
                        <h3>Flying Enemy</h3>
                        <p>Bypasses ground obstacles. Can only be hit by certain towers.</p>
                        <ul>
                            <li>Health: Medium</li>
                            <li>Speed: Fast</li>
                            <li>Reward: 12 Gold</li>
                        </ul>
                    </div>

                    <div class="enemy-card">
                        <h3>Boss Enemy</h3>
                        <p>Extremely tough with special abilities. Appears at wave milestones.</p>
                        <ul>
                            <li>Health: Very High</li>
                            <li>Speed: Varies</li>
                            <li>Reward: 50 Gold</li>
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
        *${document.getElementById('game-guide') ? document.getElementById('game-guide').innerHTML : ''}
        </div>
    </div>`;

    // Only insert if it doesn't exist
    document.body.insertAdjacentHTML('beforeend', guideHTML);
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
        const selectedMode = localStorage.getItem('gameMode') || 'classic';
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
    const guideElement = document.getElementById('game-guide');
    if (!guideElement) {
        console.error('Guide element not found! Reinitializing...');
        initGuide();
    }
    document.getElementById('game-guide').style.display = 'flex';
    pauseGame(); // Pause the game when guide is opened
}

function closeGuide() {
    const guideElement = document.getElementById('game-guide');
    if (guideElement) {
        guideElement.style.display = 'none';
        resumeGame(); // Resume the game when guide is closed
    }
}

function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let content of tabContents) {
        content.classList.remove('active');
    }

    const tabButtons = document.getElementsByClassName('tab-button');
    for (let button of tabButtons) {
        button.classList.remove('active');
    }

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Initialize guide
function initGuide() {
    createGuide();
    
    const guideElement = document.getElementById('game-guide');
    if (!guideElement) {
        console.error('Failed to initialize guide!');
        return;
    }

    // Add click outside listener
    guideElement.addEventListener('click', function(event) {
        if (event.target === this) {
            closeGuide();
        }
    });

    // Add escape key listener
    document.addEventListener('keydown', function(event) {
        if (event.key === 'o' && guideElement.style.display === 'flex') {
            closeGuide();
        }
    });
}


// Export functions
window.openGuide = openGuide;
window.closeGuide = closeGuide;
window.openTab = openTab;
window.initGuide = initGuide;