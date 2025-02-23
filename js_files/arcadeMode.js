// Cache paths for different levels
let cachedPaths = {
  level1: null,
  level2: null,
};

function generateRandomPaths(level, canvasWidth, canvasHeight) {
  // For level 1, return single path
  if (level === 1) {
    if (!cachedPaths.level1) {
      cachedPaths.level1 = createFullPath(canvasWidth, canvasHeight);
    }
    return [cachedPaths.level1];
  }
  // For level 2, return two paths
  else if (level === 2) {
    if (!cachedPaths.level2) {
      // Generate two distinct paths
      const path1 = createFullPath(canvasWidth, canvasHeight, "upper");
      const path2 = createFullPath(canvasWidth, canvasHeight, "lower");
      cachedPaths.level2 = [path1, path2];
    }
    return cachedPaths.level2;
  }
  // For other levels, generate new random paths
  return [createFullPath(canvasWidth, canvasHeight)];
}

function createFullPath(canvasWidth, canvasHeight, pathType = "any") {
  const path = [];
  const segmentCount = 25;
  const verticalStepSize = canvasHeight * 0.2;
  const checkpointInterval = canvasWidth / segmentCount;

  // Adjust starting Y position based on path type
  let startY;
  if (pathType === "upper") {
    startY = Math.floor(Math.random() * (canvasHeight * 0.4)); // Upper 40% of screen
  } else if (pathType === "lower") {
    startY = Math.floor(
      canvasHeight * 0.6 + Math.random() * (canvasHeight * 0.4)
    ); // Lower 40% of screen
  } else {
    startY = Math.floor(Math.random() * canvasHeight);
  }

  let currentX = -100;
  let currentY = startY;
  let lastMove = "horizontal";

  path.push({ x: currentX, y: currentY });

  for (let i = 1; i <= segmentCount; i++) {
    const targetX = Math.min(currentX + checkpointInterval, canvasWidth * 0.95);
    const isHorizontal = lastMove === "vertical" || Math.random() < 0.7;

    if (isHorizontal) {
      const horizontalStep = Math.random() * (targetX - currentX);
      currentX = Math.min(currentX + horizontalStep, targetX);
      lastMove = "horizontal";
    } else {
      // Restrict vertical movement based on path type
      let verticalDirection;
      if (pathType === "upper") {
        verticalDirection = currentY < canvasHeight * 0.4 ? 1 : -1;
      } else if (pathType === "lower") {
        verticalDirection = currentY > canvasHeight * 0.6 ? -1 : 1;
      } else {
        verticalDirection =
          lastMove === "up"
            ? 1
            : lastMove === "down"
            ? -1
            : Math.random() < 0.5
            ? -1
            : 1;
      }

      const verticalStep = verticalDirection * verticalStepSize;
      currentY = Math.min(Math.max(currentY + verticalStep, 0), canvasHeight);
      lastMove = verticalDirection === -1 ? "down" : "up";
    }

    path.push({ x: currentX, y: currentY });

    if (currentX >= canvasWidth * 0.85) break;
  }

  // Add intermediate waypoints
  for (let i = 0; i < 15; i++) {
    currentX = Math.min(currentX + canvasWidth * 0.05, canvasWidth * 0.95);
    const verticalRange =
      pathType === "upper" ? 0.4 : pathType === "lower" ? 0.6 : 1;
    currentY = Math.min(
      Math.max(
        currentY + (Math.random() - 0.5) * verticalStepSize,
        pathType === "lower" ? canvasHeight * 0.6 : 0
      ),
      pathType === "upper" ? canvasHeight * 0.4 : canvasHeight
    );
    path.push({ x: currentX, y: currentY });
  }

  // Ensure final point lands on right edge within appropriate zone
  let finalY;
  if (pathType === "upper") {
    finalY = Math.floor(Math.random() * (canvasHeight * 0.4));
  } else if (pathType === "lower") {
    finalY = Math.floor(
      canvasHeight * 0.6 + Math.random() * (canvasHeight * 0.4)
    );
  } else {
    finalY = Math.floor(Math.random() * canvasHeight);
  }
  path.push({ x: canvasWidth, y: finalY });

  return path;
}

function drawPath(ctx, path) {
  if (path.length < 2) return; // Need at least 2 points to draw a line

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "red"; // Set the color of the path

  // Move to the starting point
  ctx.moveTo(path[0].x, path[0].y);

  // Draw lines to each point in the path
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }

  ctx.stroke(); // Finalize the drawing
}

function generateDualMap(tileSize, mapWidth, mapHeight, paths) {
  const mapData = Array(mapHeight)
    .fill(null)
    .map(() => Array(mapWidth).fill(0));
  const pathPadding = 1;

  // Mark both paths on the map
  paths.forEach((path) => {
    for (let i = 0; i < path.length - 1; i++) {
      const startX = Math.floor(path[i].x / tileSize);
      const startY = Math.floor(path[i].y / tileSize);
      const endX = Math.floor(path[i + 1].x / tileSize);
      const endY = Math.floor(path[i + 1].y / tileSize);

      const steps = Math.ceil(Math.hypot(endX - startX, endY - startY) * 2);
      for (let j = 0; j <= steps; j++) {
        const t = j / steps;
        const x = Math.floor((1 - t) * startX + t * endX);
        const y = Math.floor((1 - t) * startY + t * endY);

        for (let dx = -pathPadding; dx <= pathPadding; dx++) {
          for (let dy = -pathPadding; dy <= pathPadding; dy++) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < mapWidth && ny >= 0 && ny < mapHeight) {
              mapData[ny][nx] = 1;
            }
          }
        }
      }
    }
  });

  // Enhanced pond generation with varied sizes and shapes
  const pondCount = Math.floor((mapWidth * mapHeight) / 150); // Increased pond density
  for (let i = 0; i < pondCount; i++) {
    const centerX = Math.floor(Math.random() * mapWidth);
    const centerY = Math.floor(Math.random() * mapHeight);
    const radius = Math.floor(Math.random() * 4) + 2; // Varied pond sizes
    const irregularity = Math.random() * 0.3; // Makes ponds less perfectly circular

    let isValidPond = true;
    for (let y = -radius; y <= radius; y++) {
      for (let x = -radius; x <= radius; x++) {
        const nx = centerX + x;
        const ny = centerY + y;
        const distortion = 1 + Math.sin(x * y * 0.5) * irregularity;

        if (
          nx >= 0 &&
          nx < mapWidth &&
          ny >= 0 &&
          ny < mapHeight &&
          Math.hypot(x, y) <= radius * distortion
        ) {
          if (mapData[ny][nx] === 1 || mapData[ny][nx] === 5) {
            isValidPond = false;
            break;
          }
        }
      }
      if (!isValidPond) break;
    }

    if (isValidPond) {
      for (let y = -radius; y <= radius; y++) {
        for (let x = -radius; x <= radius; x++) {
          const nx = centerX + x;
          const ny = centerY + y;
          const distortion = 1 + Math.sin(x * y * 0.5) * irregularity;

          if (nx >= 0 && nx < mapWidth && ny >= 0 && ny < mapHeight) {
            const dist = Math.hypot(x, y);
            if (dist <= radius * distortion) {
              mapData[ny][nx] = 2; // Water
            } else if (dist <= (radius + 0.5) * distortion) {
              mapData[ny][nx] = 6; // Water edge
            }
          }
        }
      }
    }
  }

  // Enhanced vegetation and rock distribution
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      if (mapData[y][x] === 0) {
        const randomValue = Math.random();
        const nearWater = checkNearbyTiles(mapData, x, y, 2, 2); // Check if near water

        if (nearWater && randomValue < 0.15) {
          mapData[y][x] = 3; // More dense vegetation near water
        } else if (randomValue < 0.04) {
          mapData[y][x] = 3; // Regular vegetation
        } else if (randomValue < 0.06) {
          mapData[y][x] = 4; // Rocks
        } else if (randomValue < 0.08) {
          mapData[y][x] = 7; // Small vegetation patches
        } else {
          mapData[y][x] = 2927; // Placement area
        }
      }
    }
  }

  return mapData;
}
function checkNearbyTiles(mapData, x, y, tileType, radius) {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < mapData[0].length && ny >= 0 && ny < mapData.length) {
        if (mapData[ny][nx] === tileType) return true;
      }
    }
  }
  return false;
}

function updateTiledMap2DArray(mapWidth, mapHeight) {
  map2DArray = [];
  for (let i = 0; i < mapHeight; i++) {
    map2DArray.push(tiledMapData.slice(i * mapWidth, (i + 1) * mapWidth));
  }
}

function drawPathWithBackground(
  ctx,
  paths,
  canvasWidth,
  canvasHeight,
  tileSize,
  mapData
) {
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
  gradient.addColorStop(0, "#90c090");
  gradient.addColorStop(1, "#78b078");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Add subtle noise texture
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    const size = Math.random() * 2;
    ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#405540";
    ctx.fillRect(x, y, size, size);
  }
  ctx.globalAlpha = 1;

  // Draw terrain features
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      const tile = mapData[y][x];
      const posX = x * tileSize;
      const posY = y * tileSize;

      switch (tile) {
        case 2: // Water
          ctx.fillStyle = "#4fa4ff";
          ctx.fillRect(posX, posY, tileSize, tileSize);
          // Add water sparkle
          if (Math.random() < 0.1) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.beginPath();
            ctx.arc(
              posX + Math.random() * tileSize,
              posY + Math.random() * tileSize,
              1,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
          break;
        case 3: // Bush
          ctx.fillStyle = "#2d5a27";
          ctx.beginPath();
          ctx.arc(
            posX + tileSize / 2,
            posY + tileSize / 2,
            tileSize / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
          break;
        case 4: // Rock
          const rockGradient = ctx.createRadialGradient(
            posX + tileSize / 2,
            posY + tileSize / 2,
            0,
            posX + tileSize / 2,
            posY + tileSize / 2,
            tileSize / 1.5
          );
          rockGradient.addColorStop(0, "#a0a0a0");
          rockGradient.addColorStop(1, "#808080");
          ctx.fillStyle = rockGradient;
          ctx.beginPath();
          ctx.arc(
            posX + tileSize / 2,
            posY + tileSize / 2,
            tileSize / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
          break;
        case 5: // Path edge
          ctx.fillStyle = "#b5a273";
          ctx.fillRect(posX, posY, tileSize, tileSize);
          break;
        case 6: // Water edge
          ctx.fillStyle = "#3d82cc";
          ctx.fillRect(posX, posY, tileSize, tileSize);
          break;
        case 7: // Small vegetation
          ctx.fillStyle = "#3a6b33";
          ctx.beginPath();
          ctx.arc(
            posX + tileSize / 2,
            posY + tileSize / 2,
            tileSize / 3,
            0,
            Math.PI * 2
          );
          ctx.fill();
          break;
      }
    }
  }

  // Draw paths with enhanced styling
  paths.forEach((path, index) => {
    // Draw path shadow
    ctx.beginPath();
    ctx.lineWidth = 22;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.moveTo(path[0].x, path[0].y + 2);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y + 2);
    }
    ctx.stroke();

    // Draw main path
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#d4c4a8";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();

    // Add path texture
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    for (let i = 0; i < path.length - 1; i++) {
      const x1 = path[i].x;
      const y1 = path[i].y;
      const x2 = path[i + 1].x;
      const y2 = path[i + 1].y;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const length = Math.hypot(x2 - x1, y2 - y1);

      for (let j = 0; j < length; j += 10) {
        const x = x1 + Math.cos(angle) * j;
        const y = y1 + Math.sin(angle) * j;
        ctx.beginPath();
        ctx.moveTo(
          x - Math.cos(angle + Math.PI / 2) * 10,
          y - Math.sin(angle + Math.PI / 2) * 10
        );
        ctx.lineTo(
          x + Math.cos(angle + Math.PI / 2) * 10,
          y + Math.sin(angle + Math.PI / 2) * 10
        );
        ctx.stroke();
      }
    }
  });
}
