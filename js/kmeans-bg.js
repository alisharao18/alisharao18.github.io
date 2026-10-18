const KMEANS_BACKGROUND_CONFIG = Object.freeze({
  desktopDotCount: 260,
  smallDeviceDotCount: 90,
  smallDeviceBreakpoint: 600,
  initialK: 4,
  minK: 2,
  maxK: 6,
  clusterColors: ["--red", "--violet", "--yellow", "--cyan"],
  maxDpr: 2,
  dotRadius: 1.35,
  dotGlowRadius: 3.8,
  darkDotOpacity: 0.34,
  lightDotOpacity: 0.2,
  darkGlowOpacity: 0.12,
  lineOpacity: 0.065,
  maxConnectionLines: 85,
  connectionDistance: 155,
  randomDrift: 0.12,
  dotFriction: 0.99,
  clusterPull: 0.0001,
  mouseMagnetStrength: 0.24,
  mouseSpeedBoost: 1.55,
  mouseBrightnessBoost: 0.14,
  centroidLerp: 0.018,
  centroidRadius: 9,
  centroidPulse: 1.8,
  trailLength: 7,
  shockwaveSpeed: 480,
  shockwaveRadius: 245,
  shockwaveForce: 1.8,
  shockwaveDuration: 0.62,
  hudEnabled: true,
  hudUpdateInterval: 250,
  staticIterations: 40,
  slowFrameThreshold: 24,
  slowFrameSamples: 24,
  slowFrameSkip: 2,
  slowDotRatio: 0.65,
  recoveryFrameSamples: 90,
  recoveryFrameSkip: 1,
});

(() => {
  "use strict";

  const CONFIG = KMEANS_BACKGROUND_CONFIG;
  const canvas = document.querySelector("#kmeans-background");
  if (!canvas) return;

  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("Unable to initialize the K-Means background canvas.");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smallDevice = window.matchMedia(`(max-width: ${CONFIG.smallDeviceBreakpoint}px), (pointer: coarse)`);
  const desktopPointer = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)");
  const rootStyle = getComputedStyle(document.documentElement);
  const colors = CONFIG.clusterColors.map((token) => rootStyle.getPropertyValue(token).trim());
  const dots = [];
  const centroids = [];
  const sumsX = new Float64Array(CONFIG.maxK);
  const sumsY = new Float64Array(CONFIG.maxK);
  const counts = new Uint16Array(CONFIG.maxK);
  const hud = CONFIG.hudEnabled ? document.createElement("div") : null;
  const shockwave = { x: 0, y: 0, radius: 0, previousRadius: 0, age: CONFIG.shockwaveDuration, active: false };
  const pointer = { x: 0, y: 0, active: false };
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let clusterCount = CONFIG.initialK;
  let iteration = 0;
  let inertia = 0;
  let animationFrame = 0;
  let previousTime = 0;
  let lastHudUpdate = 0;
  let slowFrames = 0;
  let recoveryFrames = 0;
  let frameSkip = CONFIG.recoveryFrameSkip;
  let frameSkipCount = 0;
  let reducedTheme = document.documentElement.dataset.theme === "light";
  let pointerMagnetEnabled = desktopPointer.matches;
  let themeColors = colors.slice();

  if (hud) {
    hud.className = "kmeans-hud";
    hud.setAttribute("aria-live", "off");
    hud.textContent = "";
    document.body.append(hud);
  }

  function randomCoordinate(maximum) {
    return Math.random() * maximum;
  }

  function createCentroid(x, y) {
    const trailX = new Float32Array(CONFIG.trailLength);
    const trailY = new Float32Array(CONFIG.trailLength);
    trailX.fill(x);
    trailY.fill(y);
    return { x, y, trailX, trailY, bornAt: iteration };
  }

  function createDot() {
    return {
      x: randomCoordinate(width),
      y: randomCoordinate(height),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      cluster: 0,
    };
  }

  function desiredDotCount() {
    return smallDevice.matches ? CONFIG.smallDeviceDotCount : CONFIG.desktopDotCount;
  }

  function setDotCount(count) {
    while (dots.length > count) dots.pop();
    while (dots.length < count) dots.push(createDot());
  }

  function resizeCanvas() {
    const nextWidth = window.innerWidth;
    const nextHeight = window.innerHeight;
    const scaleX = width ? nextWidth / width : 1;
    const scaleY = height ? nextHeight / height : 1;
    width = nextWidth;
    height = nextHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, CONFIG.maxDpr);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    dots.forEach((dot) => {
      dot.x *= scaleX;
      dot.y *= scaleY;
    });
    centroids.forEach((centroid) => {
      centroid.x *= scaleX;
      centroid.y *= scaleY;
      for (let trailIndex = 0; trailIndex < CONFIG.trailLength; trailIndex += 1) {
        centroid.trailX[trailIndex] *= scaleX;
        centroid.trailY[trailIndex] *= scaleY;
      }
    });
    setDotCount(desiredDotCount());

    if (!centroids.length) {
      for (let index = 0; index < CONFIG.maxK; index += 1) {
        centroids.push(createCentroid(randomCoordinate(width), randomCoordinate(height)));
      }
    }
    if (reducedMotion) drawFrame();
  }

  function setThemeColors() {
    reducedTheme = document.documentElement.dataset.theme === "light";
    const currentStyle = getComputedStyle(document.documentElement);
    themeColors = CONFIG.clusterColors.map((token) => currentStyle.getPropertyValue(token).trim());
  }

  function wrap(value, maximum) {
    if (value < 0) return value + maximum;
    if (value >= maximum) return value - maximum;
    return value;
  }

  function assignClusters(activeDotCount) {
    sumsX.fill(0);
    sumsY.fill(0);
    counts.fill(0);

    for (let dotIndex = 0; dotIndex < activeDotCount; dotIndex += 1) {
      const dot = dots[dotIndex];
      let nearest = 0;
      let nearestDistance = Infinity;
      for (let index = 0; index < clusterCount; index += 1) {
        const dx = dot.x - centroids[index].x;
        const dy = dot.y - centroids[index].y;
        const distance = dx * dx + dy * dy;
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      }
      dot.cluster = nearest;
      sumsX[nearest] += dot.x;
      sumsY[nearest] += dot.y;
      counts[nearest] += 1;
    }
  }

  function updateCentroids(dt) {
    for (let index = 0; index < clusterCount; index += 1) {
      const centroid = centroids[index];
      const previousX = centroid.x;
      const previousY = centroid.y;
      for (let trailIndex = CONFIG.trailLength - 1; trailIndex > 0; trailIndex -= 1) {
        centroid.trailX[trailIndex] = centroid.trailX[trailIndex - 1];
        centroid.trailY[trailIndex] = centroid.trailY[trailIndex - 1];
      }
      centroid.trailX[0] = previousX;
      centroid.trailY[0] = previousY;

      if (!counts[index]) continue;
      let targetX = sumsX[index] / counts[index];
      let targetY = sumsY[index] / counts[index];
      if (index === 0 && pointer.active && pointerMagnetEnabled) {
        targetX += (pointer.x - targetX) * CONFIG.mouseMagnetStrength;
        targetY += (pointer.y - targetY) * CONFIG.mouseMagnetStrength;
      }
      const blend = 1 - Math.pow(1 - CONFIG.centroidLerp, dt * 60);
      centroid.x = wrap(centroid.x + (targetX - centroid.x) * blend, width);
      centroid.y = wrap(centroid.y + (targetY - centroid.y) * blend, height);
    }
  }

  function pushDotsWithShockwave(dt) {
    if (!shockwave.active) return;

    shockwave.previousRadius = shockwave.radius;
    shockwave.radius = Math.min(CONFIG.shockwaveRadius, shockwave.radius + CONFIG.shockwaveSpeed * dt);
    shockwave.age += dt;
    for (let index = 0; index < dots.length; index += 1) {
      const dot = dots[index];
      const dx = dot.x - shockwave.x;
      const dy = dot.y - shockwave.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance >= shockwave.previousRadius && distance < shockwave.radius) {
        const inverseDistance = 1 / Math.max(distance, 1);
        dot.vx += dx * inverseDistance * CONFIG.shockwaveForce;
        dot.vy += dy * inverseDistance * CONFIG.shockwaveForce;
      }
    }
    if (shockwave.age >= CONFIG.shockwaveDuration || shockwave.radius >= CONFIG.shockwaveRadius) {
      shockwave.active = false;
    }
  }

  function updateDots(dt, activeDotCount) {
    const dtScale = Math.min(dt * 60, 2);
    const magnetRange = 150 * 150;
    for (let index = 0; index < activeDotCount; index += 1) {
      const dot = dots[index];
      const centroid = centroids[dot.cluster];
      let boost = 1;
      if (pointer.active && pointerMagnetEnabled) {
        const cursorDx = dot.x - pointer.x;
        const cursorDy = dot.y - pointer.y;
        if (cursorDx * cursorDx + cursorDy * cursorDy < magnetRange) boost = CONFIG.mouseSpeedBoost;
      }

      dot.vx += (centroid.x - dot.x) * CONFIG.clusterPull * dtScale;
      dot.vy += (centroid.y - dot.y) * CONFIG.clusterPull * dtScale;
      dot.vx += (Math.random() - 0.5) * CONFIG.randomDrift * boost;
      dot.vy += (Math.random() - 0.5) * CONFIG.randomDrift * boost;
      dot.vx *= CONFIG.dotFriction;
      dot.vy *= CONFIG.dotFriction;
      dot.x = wrap(dot.x + dot.vx * dtScale * boost, width);
      dot.y = wrap(dot.y + dot.vy * dtScale * boost, height);
    }
  }

  function updateInertia(activeDotCount) {
    let totalDistance = 0;
    for (let index = 0; index < activeDotCount; index += 1) {
      const dot = dots[index];
      const centroid = centroids[dot.cluster];
      const dx = dot.x - centroid.x;
      const dy = dot.y - centroid.y;
      totalDistance += dx * dx + dy * dy;
    }
    const normalization = Math.max(1, Math.min(width, height));
    inertia = totalDistance / Math.max(1, activeDotCount) / (normalization * normalization) * 100;
  }

  function updateModel(dt, activeDotCount) {
    assignClusters(activeDotCount);
    updateCentroids(dt);
    pushDotsWithShockwave(dt);
    updateDots(dt, activeDotCount);
    updateInertia(activeDotCount);
    iteration += 1;
  }

  function drawLines(activeDotCount) {
    if (smallDevice.matches || frameSkip > 1) return;
    const maximumLines = Math.min(activeDotCount, CONFIG.maxConnectionLines);
    let drawn = 0;
    context.lineWidth = 0.65;
    context.globalAlpha = reducedTheme ? CONFIG.lineOpacity * 0.65 : CONFIG.lineOpacity;
    for (let index = 0; index < activeDotCount && drawn < maximumLines; index += 1) {
      const dot = dots[index];
      const centroid = centroids[dot.cluster];
      const dx = dot.x - centroid.x;
      const dy = dot.y - centroid.y;
      if (dx * dx + dy * dy > CONFIG.connectionDistance * CONFIG.connectionDistance) continue;
      context.strokeStyle = themeColors[dot.cluster % themeColors.length];
      context.beginPath();
      context.moveTo(dot.x, dot.y);
      context.lineTo(centroid.x, centroid.y);
      context.stroke();
      drawn += 1;
    }
  }

  function drawDots(activeDotCount) {
    const darkMode = !reducedTheme;
    for (let index = 0; index < activeDotCount; index += 1) {
      const dot = dots[index];
      const color = themeColors[dot.cluster % themeColors.length];
      let brightness = 0;
      if (pointer.active && pointerMagnetEnabled) {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        if (dx * dx + dy * dy < 150 * 150) brightness = CONFIG.mouseBrightnessBoost;
      }

      if (darkMode) {
        context.globalAlpha = CONFIG.darkGlowOpacity + brightness * 0.45;
        context.fillStyle = color;
        context.beginPath();
        context.arc(dot.x, dot.y, CONFIG.dotGlowRadius, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = (darkMode ? CONFIG.darkDotOpacity : CONFIG.lightDotOpacity) + brightness;
      context.fillStyle = color;
      context.beginPath();
      context.arc(dot.x, dot.y, CONFIG.dotRadius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  }

  function drawCentroids(time) {
    for (let index = 0; index < clusterCount; index += 1) {
      const centroid = centroids[index];
      const color = themeColors[index % themeColors.length];
      if (!reducedTheme) {
        for (let trailIndex = CONFIG.trailLength - 1; trailIndex > 0; trailIndex -= 1) {
          context.globalAlpha = (1 - trailIndex / CONFIG.trailLength) * 0.12;
          context.strokeStyle = color;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(centroid.trailX[trailIndex], centroid.trailY[trailIndex]);
          context.lineTo(centroid.trailX[trailIndex - 1], centroid.trailY[trailIndex - 1]);
          context.stroke();
        }
      }
      const pulse = reducedMotion ? 1 : 1 + Math.sin(time * 0.002 * CONFIG.centroidPulse + index) * 0.12;
      context.globalAlpha = reducedTheme ? 0.52 : 0.7;
      context.strokeStyle = color;
      context.lineWidth = 1.5;
      context.shadowBlur = reducedTheme ? 0 : 14;
      context.shadowColor = color;
      context.beginPath();
      context.arc(centroid.x, centroid.y, CONFIG.centroidRadius * pulse, 0, Math.PI * 2);
      context.stroke();
      context.shadowBlur = 0;

      const age = iteration - centroid.bornAt;
      if (age < 14) {
        context.globalAlpha = Math.max(0, 1 - age / 14) * 0.55;
        context.beginPath();
        context.arc(centroid.x, centroid.y, CONFIG.centroidRadius + (14 - age) * 1.5, 0, Math.PI * 2);
        context.stroke();
      }
    }
    context.globalAlpha = 1;
  }

  function drawShockwave() {
    if (!shockwave.active) return;
    context.globalAlpha = Math.max(0, 1 - shockwave.age / CONFIG.shockwaveDuration) * 0.42;
    context.strokeStyle = themeColors[(clusterCount - 1) % themeColors.length];
    context.lineWidth = 1.5;
    context.beginPath();
    context.arc(shockwave.x, shockwave.y, shockwave.radius, 0, Math.PI * 2);
    context.stroke();
    context.globalAlpha = 1;
  }

  function drawFrame(time = 0) {
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = reducedTheme ? "source-over" : "lighter";
    const visibleDotCount = activeDotCount();
    drawLines(visibleDotCount);
    drawDots(visibleDotCount);
    drawCentroids(time);
    drawShockwave();
    context.globalCompositeOperation = "source-over";
  }

  function updateHud(time) {
    if (!hud || time - lastHudUpdate < CONFIG.hudUpdateInterval) return;
    hud.textContent = `K-MEANS · K = ${clusterCount} · ITER ${iteration} · INERTIA ${inertia.toFixed(2)}`;
    lastHudUpdate = time;
  }

  function activeDotCount() {
    return Math.min(dots.length, Math.max(1, Math.floor(dots.length * (frameSkip > 1 ? CONFIG.slowDotRatio : 1))));
  }

  function frame(time) {
    animationFrame = 0;
    if (document.hidden) return;
    const elapsed = previousTime ? time - previousTime : 16.67;
    previousTime = time;

    if (elapsed > CONFIG.slowFrameThreshold) {
      slowFrames += 1;
      recoveryFrames = 0;
      if (slowFrames >= CONFIG.slowFrameSamples) frameSkip = CONFIG.slowFrameSkip;
    } else {
      slowFrames = 0;
      if (frameSkip > CONFIG.recoveryFrameSkip) {
        recoveryFrames += 1;
        if (recoveryFrames >= CONFIG.recoveryFrameSamples) {
          frameSkip = CONFIG.recoveryFrameSkip;
          recoveryFrames = 0;
        }
      }
    }

    frameSkipCount += 1;
    if (frameSkipCount >= frameSkip) {
      frameSkipCount = 0;
      updateModel(Math.min(elapsed / 1000, 0.05), activeDotCount());
    }
    drawFrame(time);
    updateHud(time);
    animationFrame = window.requestAnimationFrame(frame);
  }

  function cycleClusterCount(x, y) {
    if (clusterCount < CONFIG.maxK) {
      clusterCount += 1;
    } else {
      clusterCount = CONFIG.minK;
      for (let index = 0; index < clusterCount; index += 1) {
        centroids[index].x = randomCoordinate(width);
        centroids[index].y = randomCoordinate(height);
        centroids[index].bornAt = iteration;
      }
    }
    if (clusterCount > CONFIG.minK && centroids[clusterCount - 1]) {
      const centroid = centroids[clusterCount - 1];
      centroid.x = x;
      centroid.y = y;
      centroid.bornAt = iteration;
      centroid.trailX.fill(x);
      centroid.trailY.fill(y);
    }
  }

  function triggerShockwave(x, y) {
    shockwave.x = x;
    shockwave.y = y;
    shockwave.radius = 0;
    shockwave.previousRadius = 0;
    shockwave.age = 0;
    shockwave.active = true;
    cycleClusterCount(x, y);
  }

  function handlePageClick(event) {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("a, button, input, select, textarea, [role='button'], [contenteditable='true'], #secret-chapter")) return;
    triggerShockwave(event.clientX, event.clientY);
  }

  function handleKeydown(event) {
    if (event.repeat || event.key.toLowerCase() !== "k") return;
    if (event.target instanceof Element && event.target.closest("a, button, input, select, textarea, [contenteditable='true']")) return;
    const x = pointer.active ? pointer.x : width * 0.5;
    const y = pointer.active ? pointer.y : height * 0.5;
    cycleClusterCount(x, y);
  }

  function handlePointerMove(event) {
    if (!pointerMagnetEnabled) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  }

  function startAnimation() {
    if (reducedMotion || document.hidden || animationFrame) return;
    previousTime = 0;
    animationFrame = window.requestAnimationFrame(frame);
  }

  function stopAnimation() {
    if (!animationFrame) return;
    window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  }

  function updatePointerMode() {
    pointerMagnetEnabled = desktopPointer.matches;
    if (!pointerMagnetEnabled) pointer.active = false;
  }

  resizeCanvas();
  for (let step = 0; step < CONFIG.staticIterations; step += 1) updateModel(1 / 60, dots.length);
  if (hud) updateHud(CONFIG.hudUpdateInterval);
  drawFrame();

  new MutationObserver(() => {
    setThemeColors();
    if (reducedMotion) drawFrame();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  if (!reducedMotion) {
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("click", handlePageClick);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAnimation();
      else startAnimation();
    });
    desktopPointer.addEventListener("change", updatePointerMode);
    smallDevice.addEventListener("change", resizeCanvas);
    startAnimation();
  }
})();
