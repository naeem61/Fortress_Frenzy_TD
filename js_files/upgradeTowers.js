function showTowerOverlay(tower) {
  const overlay = document.getElementById("tower-overlay");

  const baseCost = Object.values(towerTypes).find(
    (type) => type.class.name === tower.constructor.name
  )?.cost;

  const baseRefund = baseCost * 0.5;
  const upgradeBonus = (tower.level - 1) * 25;
  const sellCost = baseRefund + upgradeBonus;

  const nextLevel = tower.level + 1;
  const maxLevel = 3;
  const upgradePreview =
    nextLevel <= maxLevel
      ? {
          range: tower.range + 40,
          damage: tower.damage + 7,
          fireRate: Math.max(100, tower.fireRate - 100),
        }
      : null;

  document.getElementById("tower-type").textContent = tower.constructor.name;
  document.getElementById("tower-level").textContent = tower.level;
  document.getElementById("tower-range").textContent = tower.range;
  document.getElementById("tower-damage").textContent = tower.damage;
  document.getElementById("tower-fireRate").textContent = tower.fireRate;
  document.getElementById("tower-cost").textContent = tower.upgradeCost;

  const sellCostElement = document.getElementById("tower-sell-cost");
  if (!sellCostElement) {
    const newSellCostElement = document.createElement("p");
    newSellCostElement.id = "tower-sell-cost";
    newSellCostElement.innerHTML = `<strong>Sell Refund:</strong> ${sellCost}`;
    overlay.appendChild(newSellCostElement);
  } else {
    sellCostElement.innerHTML = `<strong>Sell Refund:</strong> ${sellCost}`;
  }

  const upgradePreviewElement = document.getElementById(
    "tower-upgrade-preview"
  );
  if (upgradePreview) {
    if (!upgradePreviewElement) {
      const newUpgradePreviewElement = document.createElement("p");
      newUpgradePreviewElement.id = "tower-upgrade-preview";
      newUpgradePreviewElement.innerHTML = `
        <strong>Next Level Stats:</strong>
        Range: +40, Damage: +7, Fire Rate: -100 ms`;
      overlay.appendChild(newUpgradePreviewElement);
    } else {
      upgradePreviewElement.innerHTML = `
        <strong>Next Level Stats:</strong>
        Range: +40, Damage: +7, Fire Rate: -100 ms`;
    }
  } else if (upgradePreviewElement) {
    upgradePreviewElement.remove();
  }

  overlay.style.display = "block";
}

function hideTowerOverlay() {
  const overlay = document.getElementById("tower-overlay");
  overlay.style.display = "none";
}

document
  .getElementById("upgrade-tower-button")
  .addEventListener("click", () => {
    if (selectedTower) {
      if (
        playerCurrency >= selectedTower.upgradeCost &&
        selectedTower.level < 3
      ) {
        playerCurrency -= selectedTower.upgradeCost;
        selectedTower.upgrade();
        playTowerSound("towerUpgrade");
        showTowerOverlay(selectedTower);
      } else {
        console.log("Not enough currency to upgrade.");
      }
    } else {
      console.log("No tower selected.");
    }
  });

document.getElementById("sell-tower-button").addEventListener("click", () => {
  if (selectedTower) {
    sellTower(selectedTower);
    hideTowerOverlay();
  } else {
    console.log("No tower selected to sell.");
  }
});

function sellTower(tower) {
  const baseCost = Object.values(towerTypes).find(
    (type) => type.class.name === tower.constructor.name
  )?.cost;

  if (baseCost === undefined) {
    console.error("Unable to determine tower type for selling.");
    return;
  }

  const baseRefund = baseCost * 0.5;
  const upgradeBonus = (tower.level - 1) * 25;
  const refund = baseRefund + upgradeBonus;

  playerCurrency += refund;

  const index = towers.indexOf(tower);
  if (index !== -1) {
    towers.splice(index, 1);
    map2DArray[tower.y][tower.x] = 2927;
    playTowerSound("towerSell");
  }

  console.log(
    `Tower sold for ${refund} currency. Tower position (${tower.x}, ${tower.y}) is now free.`
  );
}

const AUDIO_FILES = {
  towerUpgrade: "assets/sell_and_upgrade_sounds/power-up-sparkle-1-177983.mp3",
  towerSell:
    "assets/sell_and_upgrade_sounds/wood-surface-single-coin-payout-4-215284.mp3",
};

const audioPool = {
  towerUpgrade: Array.from(
    { length: 4 },
    () => new Audio(AUDIO_FILES.towerUpgrade)
  ),
  towerSell: Array.from({ length: 4 }, () => new Audio(AUDIO_FILES.towerSell)),
};

function playTowerSound(soundType) {
  const pool = audioPool[soundType];
  const audio = pool.find((audio) => audio.paused);

  if (audio) {
    audio.currentTime = 0;
    audio.play().catch((error) => console.log("Audio play failed:", error));
  }
}
