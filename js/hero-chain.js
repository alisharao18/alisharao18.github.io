(() => {
  "use strict";

  const CONFIG = {
    timing: {
      charge: 0.8,
      shuttleFlight: 0.55,
      headphones: 0.5,
      camera: 0.45,
      manhwa: 0.55,
      smiley: 0.6,
      fwip: 0.3,
      shuttleReturn: 0.45,
      bolt: 0.25,
      cooldown: 2,
    },
    intervals: {
      chainMin: 8000,
      chainMax: 10000,
      ambientMin: 2600,
      ambientMax: 4800,
      ambientDuration: 0.15,
      mobileAmbientFactor: 1.8,
    },
    colors: {
      dark: "--chain-accent",
      light: "--chain-light-accent",
      core: "--chain-core",
    },
    boltThickness: 3,
    iconOrder: ["racket", "shuttle", "headphones", "camera", "manhwa", "smiley", "fwip"],
    selectors: {
      racket: ".cutout-racket",
      shuttle: ".cutout-shuttle",
      headphones: ".cutout-headphones",
      camera: ".cutout-camera",
      manhwa: ".cutout-manhwa",
      smiley: ".cutout-food",
      fwip: ".hero-sfx",
    },
    maxBolts: 6,
    mobileWidth: 600,
  };

  const hero = document.querySelector(".hero");
  const cutouts = hero?.querySelector(".hero-cutouts");
  const gsap = window.gsap;
  if (!hero || !cutouts) return;
  if (!gsap) {
    console.error("Smash Chain requires GSAP, but GSAP was not found.");
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.className = "hero-chain-overlay";
  canvas.setAttribute("aria-hidden", "true");
  cutouts.append(canvas);
  const smileyOverlay = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  smileyOverlay.classList.add("hero-chain-smiley");
  smileyOverlay.setAttribute("viewBox", "0 0 100 100");
  smileyOverlay.setAttribute("aria-hidden", "true");
  smileyOverlay.innerHTML = '<ellipse cx="35" cy="43" rx="11" ry="14"/><ellipse cx="65" cy="43" rx="11" ry="14"/><circle class="chain-eye" cx="35" cy="45" r="3"/><circle class="chain-eye" cx="65" cy="45" r="3"/><path d="M34 70 43 64 51 73 59 64 68 70 M31 16 24 4 M42 13 40 1 M58 13 60 1 M69 16 76 4"/>';
  cutouts.append(smileyOverlay);
  const context = canvas.getContext("2d");
  if (!context) {
    canvas.remove();
    console.error("Smash Chain could not create its canvas context.");
    return;
  }

  const targets = Object.fromEntries(
    CONFIG.iconOrder.map((name) => [name, hero.querySelector(CONFIG.selectors[name])]),
  );
  const elements = CONFIG.iconOrder.map((name) => targets[name]).filter(Boolean);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileQuery = window.matchMedia(`(max-width: ${CONFIG.mobileWidth - 1}px)`);
  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const visual = { bolts: [], rings: [], trail: null, speedLines: null, flash: null, shocked: null };
  const chainMotion = new Map();
  let active = false;
  let heroVisible = false;
  let chainRunning = false;
  let chainTimeline = null;
  let chainTimer = 0;
  const ambientTimers = new Map();
  let hoverTimer = 0;
  let lastChainEnd = 0;
  const zapTweens = new Set();
  const activeWords = new Set();
  resizeCanvas();

  function isMobile() {
    return mobileQuery.matches;
  }

  function themeColors() {
    const styles = getComputedStyle(document.documentElement);
    const light = document.documentElement.dataset.theme === "light";
    const accent = styles.getPropertyValue(light ? CONFIG.colors.light : CONFIG.colors.dark).trim();
    const core = styles.getPropertyValue(CONFIG.colors.core).trim();
    return { accent, core, light };
  }

  function canvasBounds() {
    return canvas.getBoundingClientRect();
  }

  function resizeCanvas() {
    const bounds = canvasBounds();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(bounds.width * ratio));
    canvas.height = Math.max(1, Math.round(bounds.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (reducedMotion.matches && active) draw();
  }

  function centerOf(element) {
    if (!element) return null;
    const bounds = element.getBoundingClientRect();
    const canvasRect = canvasBounds();
    return {
      x: bounds.left + bounds.width / 2 - canvasRect.left,
      y: bounds.top + bounds.height / 2 - canvasRect.top,
      width: bounds.width,
      height: bounds.height,
    };
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function rgba(rgb, alpha) {
    return `rgba(${rgb}, ${alpha})`;
  }

  function makeBoltPath(start, end, displacement = 1) {
    const length = Math.hypot(end.x - start.x, end.y - start.y);
    const depth = Math.max(3, Math.min(6, Math.round(length / 45) + 2));
    const points = [start];
    const subdivide = (from, to, levels, offset) => {
      if (!levels) {
        points.push(to);
        return;
      }
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const distance = Math.hypot(dx, dy) || 1;
      const midpoint = {
        x: (from.x + to.x) / 2 - dy / distance * randomBetween(-offset, offset),
        y: (from.y + to.y) / 2 + dx / distance * randomBetween(-offset, offset),
      };
      subdivide(from, midpoint, levels - 1, offset * 0.55);
      subdivide(midpoint, to, levels - 1, offset * 0.55);
    };
    subdivide(start, end, depth, Math.min(18, length * 0.16) * displacement);
    return points;
  }

  function addBolt(start, end, strength = 1, lifetime = CONFIG.timing.bolt * 1000) {
    if (!start || !end) return;
    while (visual.bolts.length >= CONFIG.maxBolts) visual.bolts.shift();
    const paths = [makeBoltPath(start, end, strength)];
    if (Math.random() < (isMobile() ? 0.25 : 0.75)) {
      const parent = paths[0];
      const branchPoint = parent[Math.floor(randomBetween(2, parent.length - 2))];
      const direction = Math.random() < 0.5 ? -1 : 1;
      paths.push(makeBoltPath(
        branchPoint,
        { x: branchPoint.x + randomBetween(14, 34) * direction, y: branchPoint.y + randomBetween(-34, 34) },
        strength * 0.55,
      ));
    }
    visual.bolts.push({ paths, started: performance.now(), lifetime, strength });
  }

  function addLocalArc(element, strength = 0.75, lifetime = CONFIG.timing.bolt * 1000) {
    const center = centerOf(element);
    if (!center) return;
    const radius = Math.max(7, Math.min(center.width, center.height) * 0.44);
    const angle = randomBetween(0, Math.PI * 2);
    const point = (offset) => ({
      x: center.x + Math.cos(angle + offset) * radius,
      y: center.y + Math.sin(angle + offset) * radius,
    });
    addBolt(point(-0.3), point(0.3), strength, lifetime);
  }

  function path(points) {
    if (!points.length) return;
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let index = 1; index < points.length; index += 1) context.lineTo(points[index].x, points[index].y);
  }

  function drawBolt(bolt, now, colors) {
    const age = now - bolt.started;
    if (age >= bolt.lifetime) return false;
    const fade = 1 - age / bolt.lifetime;
    const flicker = 0.82 + Math.sin(age / 31) * 0.12;
    const width = CONFIG.boltThickness * (isMobile() ? 0.62 : 1) * bolt.strength;
    context.globalCompositeOperation = colors.light ? "source-over" : "screen";
    bolt.paths.forEach((points) => {
      path(points);
      context.strokeStyle = rgba(colors.accent, fade * flicker * 0.22);
      context.lineWidth = width * 4.2;
      context.shadowColor = rgba(colors.accent, fade * 0.85);
      context.shadowBlur = width * (colors.light ? 2 : 6);
      context.stroke();
      path(points);
      context.strokeStyle = rgba(colors.accent, fade * flicker * 0.85);
      context.lineWidth = width * 1.7;
      context.shadowBlur = width * 2;
      context.stroke();
      path(points);
      context.strokeStyle = rgba(colors.core, fade * 0.98);
      context.lineWidth = Math.max(0.8, width * 0.58);
      context.shadowBlur = width;
      context.stroke();
    });
    context.shadowBlur = 0;
    return true;
  }

  function drawRings(colors) {
    const now = performance.now();
    visual.rings = visual.rings.filter((ring) => now - ring.started < ring.duration);
    visual.rings.forEach((ring) => {
      if (now < ring.started) return;
      const center = centerOf(ring.element);
      if (!center) return;
      const progress = Math.min(1, (now - ring.started) / ring.duration);
      context.globalCompositeOperation = colors.light ? "source-over" : "screen";
      context.beginPath();
      context.arc(center.x, center.y, 8 + progress * Math.max(center.width, center.height) * 0.68, 0, Math.PI * 2);
      context.strokeStyle = rgba(colors.accent, (1 - progress) * 0.75);
      context.lineWidth = isMobile() ? 1 : 1.6;
      context.shadowColor = rgba(colors.accent, 0.75);
      context.shadowBlur = colors.light ? 5 : 12;
      context.stroke();
      context.shadowBlur = 0;
    });
  }

  function drawTrail(colors) {
    if (visual.trail?.points.length > 1) {
      const points = visual.trail.points;
      context.globalCompositeOperation = colors.light ? "source-over" : "screen";
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      points.slice(1).forEach((point) => context.lineTo(point.x, point.y));
      context.strokeStyle = rgba(colors.accent, 0.3);
      context.lineWidth = isMobile() ? 5 : 9;
      context.shadowColor = rgba(colors.accent, 0.8);
      context.shadowBlur = isMobile() ? 7 : 16;
      context.lineCap = "round";
      context.stroke();
      context.strokeStyle = rgba(colors.core, 0.75);
      context.lineWidth = isMobile() ? 1 : 1.6;
      context.shadowBlur = 0;
      context.stroke();
    }
    if (visual.speedLines) {
      const { center, progress } = visual.speedLines;
      context.globalCompositeOperation = colors.light ? "source-over" : "screen";
      for (let index = 0; index < 5; index += 1) {
        const y = center.y - 26 + index * 12;
        const length = (18 + index * 4) * (1 - progress);
        context.beginPath();
        context.moveTo(center.x - 18 - length, y);
        context.lineTo(center.x - 18, y);
        context.strokeStyle = rgba(colors.accent, (1 - progress) * 0.7);
        context.lineWidth = 1.5;
        context.stroke();
      }
    }
  }

  function drawFlash(colors) {
    if (!visual.flash) return;
    const center = centerOf(visual.flash.element);
    if (!center) return;
    const progress = visual.flash.progress;
    const radius = Math.max(center.width, center.height) * (0.25 + progress * 0.85);
    const gradient = context.createRadialGradient(center.x, center.y, 1, center.x, center.y, radius);
    gradient.addColorStop(0, rgba(colors.core, 0.72 * (1 - progress)));
    gradient.addColorStop(0.32, rgba(colors.accent, 0.32 * (1 - progress)));
    gradient.addColorStop(1, rgba(colors.accent, 0));
    context.globalCompositeOperation = colors.light ? "source-over" : "screen";
    context.fillStyle = gradient;
    context.fillRect(center.x - radius, center.y - radius, radius * 2, radius * 2);
  }

  function drawSmiley() {
    if (!visual.shocked) {
      smileyOverlay.style.opacity = "0";
      return;
    }
    const bounds = visual.shocked.element.getBoundingClientRect();
    const canvasRect = canvasBounds();
    smileyOverlay.style.left = `${bounds.left - canvasRect.left}px`;
    smileyOverlay.style.top = `${bounds.top - canvasRect.top}px`;
    smileyOverlay.style.width = `${bounds.width}px`;
    smileyOverlay.style.height = `${bounds.height}px`;
    const alpha = Math.min(1, visual.shocked.progress * 7, (1 - visual.shocked.progress) * 7);
    smileyOverlay.style.opacity = String(Math.max(0, alpha));
  }

  function drawStaticSpark(colors) {
    const center = centerOf(targets.racket);
    if (!center) return;
    const points = [
      { x: center.x + center.width * 0.29, y: center.y - center.height * 0.2 },
      { x: center.x + center.width * 0.35, y: center.y - center.height * 0.28 },
      { x: center.x + center.width * 0.32, y: center.y - center.height * 0.33 },
    ];
    context.globalCompositeOperation = colors.light ? "source-over" : "screen";
    path(points);
    context.strokeStyle = rgba(colors.accent, 0.9);
    context.lineWidth = 1.6;
    context.shadowColor = rgba(colors.accent, 0.8);
    context.shadowBlur = 6;
    context.stroke();
    context.shadowBlur = 0;
  }

  function draw() {
    const bounds = canvasBounds();
    context.clearRect(0, 0, bounds.width, bounds.height);
    const colors = themeColors();
    const now = performance.now();
    activeWords.forEach(({ element, anchor }) => {
      const center = centerOf(anchor);
      if (center) {
        element.style.left = `${center.x}px`;
        element.style.top = `${center.y}px`;
      }
    });
    visual.bolts = visual.bolts.filter((bolt) => drawBolt(bolt, now, colors));
    drawTrail(colors);
    drawRings(colors);
    drawFlash(colors);
    drawSmiley();
    if (reducedMotion.matches && active && visual.bolts.length === 0) drawStaticSpark(colors);
    context.globalCompositeOperation = "source-over";
  }

  function setChainMotion(element, values) {
    Object.entries(values).forEach(([key, value]) => {
      element.style.setProperty(`--chain-${key}`, `${value}${key === "rotation" ? "deg" : "px"}`);
    });
  }

  function addWord(text, anchor, variant = "") {
    const center = centerOf(anchor);
    if (!center) return null;
    const word = document.createElement("span");
    word.className = `hero-chain-word${variant ? ` hero-chain-word--${variant}` : ""}`;
    word.textContent = text;
    word.setAttribute("aria-hidden", "true");
    word.style.left = `${center.x}px`;
    word.style.top = `${center.y}px`;
    word.style.opacity = "0";
    cutouts.append(word);
    activeWords.add({ element: word, anchor });
    return word;
  }

  function animateWord(timeline, text, element, variant = "", position = 0) {
    const word = addWord(text, element, variant);
    if (!word) return;
    const scale = { value: 0.3 };
    word.style.scale = "0.3";
    word.style.rotate = "-12deg";
    timeline.to(word, { opacity: 1, duration: 0.07 }, position);
    timeline.to(scale, {
      value: 1,
      duration: 0.22,
      ease: "back.out(2.4)",
      onUpdate: () => { word.style.scale = String(scale.value); },
      onComplete: () => gsap.delayedCall(0.35, () => {
        gsap.to(word, {
          opacity: 0,
          duration: 0.12,
          onComplete: () => {
            activeWords.forEach((item) => { if (item.element === word) activeWords.delete(item); });
            word.remove();
          },
        });
      }),
    }, position);
  }

  function makeMotionProxy() {
    return { x: 0, y: 0, rotation: 0 };
  }

  function animateIcon(timeline, element, values, duration, position, ease = "power2.out") {
    if (!element) return;
    let proxy = chainMotion.get(element);
    if (!proxy) {
      proxy = makeMotionProxy();
      chainMotion.set(element, proxy);
    }
    timeline.to(proxy, {
      ...values,
      duration,
      ease,
      onUpdate: () => setChainMotion(element, proxy),
    }, position);
  }

  function animateZap(element) {
    if (reducedMotion.matches || !element) return;
    const proxy = { x: 0, rotation: 0 };
    const duration = CONFIG.intervals.ambientDuration;
    const tween = gsap.to(proxy, {
      x: randomBetween(-3, 3),
      rotation: randomBetween(-4, 4),
      duration: duration / 2,
      yoyo: true,
      repeat: 1,
      ease: "steps(2)",
      onUpdate: () => {
        element.style.setProperty("--chain-zap-x", `${proxy.x}px`);
        element.style.setProperty("--chain-zap-rotation", `${proxy.rotation}deg`);
        draw();
      },
      onComplete: () => {
        element.style.setProperty("--chain-zap-x", "0px");
        element.style.setProperty("--chain-zap-rotation", "0deg");
        zapTweens.delete(tween);
        draw();
      },
    });
    zapTweens.add(tween);
    const center = centerOf(element);
    if (center) {
      addBolt(
        { x: center.x - 7, y: center.y - 8 },
        { x: center.x + 9, y: center.y + 5 },
        0.55,
        duration * 1000,
      );
      draw();
    }
    return tween;
  }

  function chargeRacket(timeline, position) {
    const racket = targets.racket;
    if (!racket) return;
    const shake = { rotation: 0, x: 0, glow: 0 };
    chainMotion.set(racket, shake);
    timeline.to(shake, {
      rotation: 3,
      x: 1.5,
      glow: 18,
      duration: 0.12,
      repeat: 5,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: () => {
        setChainMotion(racket, { rotation: shake.rotation, x: shake.x });
        racket.style.setProperty("--chain-glow", `${shake.glow}px`);
      },
      onComplete: () => {
        setChainMotion(racket, { rotation: 0, x: 0 });
        racket.style.setProperty("--chain-glow", "0px");
      },
    }, position);
    [0.08, 0.31, 0.54].forEach((time, index) => {
      timeline.call(() => addLocalArc(racket, 0.65 + index * 0.2), [], position + time);
    });
    timeline.to({}, { duration: CONFIG.timing.charge, onUpdate: draw }, position);
  }

  function launchShuttle(timeline, snapshot, position) {
    const shuttle = targets.shuttle;
    const headphones = targets.headphones;
    if (!shuttle || !headphones) return;
    const origin = centerOf(shuttle) || snapshot.shuttle;
    const flight = { progress: 0 };
    const shuttleMotion = chainMotion.get(shuttle) || makeMotionProxy();
    chainMotion.set(shuttle, shuttleMotion);
    timeline.call(() => { visual.trail = { points: [{ x: origin.x, y: origin.y }] }; }, [], position);
    if (targets.racket) {
      animateIcon(timeline, targets.racket, { rotation: 17 }, 0.11, position, "power3.out");
      animateIcon(timeline, targets.racket, { rotation: 0 }, 0.2, position + 0.11, "power2.inOut");
    }
    timeline.to(flight, {
      progress: 1,
      duration: CONFIG.timing.shuttleFlight,
      ease: "power2.in",
      onUpdate: () => {
        const currentShuttle = centerOf(shuttle);
        const target = centerOf(headphones) || snapshot.headphones;
        if (!currentShuttle || !target) return;
        const baseX = currentShuttle.x - (chainMotion.get(shuttle)?.x || 0);
        const baseY = currentShuttle.y - (chainMotion.get(shuttle)?.y || 0);
        const lift = Math.sin(Math.PI * flight.progress) * Math.min(64, Math.max(26, origin.width * 0.8));
        const desiredX = origin.x + (target.x - origin.x) * flight.progress;
        const desiredY = origin.y + (target.y - origin.y) * flight.progress - lift;
        shuttleMotion.x = desiredX - baseX;
        shuttleMotion.y = desiredY - baseY;
        setChainMotion(shuttle, shuttleMotion);
        const trailPoint = { x: desiredX, y: desiredY };
        const points = visual.trail?.points;
        if (points && Math.hypot(trailPoint.x - points[points.length - 1].x, trailPoint.y - points[points.length - 1].y) > 2) {
          points.push(trailPoint);
          if (points.length > 18) points.shift();
        }
        draw();
      },
    }, position);
    timeline.call(() => {
      const trailOrigin = visual.trail?.points[0] || centerOf(shuttle);
      addBolt(trailOrigin, centerOf(headphones), 1.15);
      visual.rings = isMobile() ? [] : Array.from({ length: 3 }, (_, index) => ({
        element: headphones,
        started: performance.now() + index * 125,
        duration: 540,
      }));
      visual.trail = null;
      visual.speedLines = { center: centerOf(headphones), progress: 0 };
      draw();
    }, [], position + CONFIG.timing.shuttleFlight);
    animateWord(timeline, "WHAM!", headphones, "wham", position + CONFIG.timing.shuttleFlight);
  }

  function strike(from, to, snapshot) {
    const start = centerOf(targets[from]) || snapshot[from];
    const end = centerOf(targets[to]) || snapshot[to];
    if (start && end) {
      addBolt(start, end, 1);
      if (to === "headphones" && !isMobile()) {
        visual.rings = Array.from({ length: 3 }, (_, index) => ({
          element: targets.headphones,
          started: performance.now() + index * 125,
          duration: 540,
        }));
      }
    }
    draw();
  }

  function addHeadphonePulse(timeline, position) {
    const pulse = { progress: 0 };
    timeline.to(pulse, {
      progress: 1,
      duration: CONFIG.timing.headphones,
      ease: "none",
      onUpdate: () => {
        if (visual.speedLines) visual.speedLines.progress = pulse.progress;
        draw();
      },
    }, position);
    timeline.call(() => { visual.speedLines = null; }, [], position + CONFIG.timing.headphones);
  }

  function addCameraHit(timeline, position) {
    const camera = targets.camera;
    if (!camera) return;
    const flash = { progress: 0 };
    timeline.call(() => { visual.flash = { element: camera, progress: 0 }; }, [], position);
    timeline.to(flash, {
      progress: 1,
      duration: 0.24,
      ease: "power1.out",
      onUpdate: () => {
        if (visual.flash) visual.flash.progress = flash.progress;
        draw();
      },
      onComplete: () => { visual.flash = null; draw(); },
    }, position);
    animateWord(timeline, "CLICK!", camera, "click", position);
  }

  function addManhwaHit(timeline, position) {
    const manhwa = targets.manhwa;
    if (!manhwa) return;
    const proxy = { rotation: 0, x: 0, red: 0, blue: 0 };
    chainMotion.set(manhwa, proxy);
    timeline.to(proxy, {
      rotation: 4,
      x: 3,
      red: 2,
      blue: -2,
      duration: 0.12,
      repeat: 3,
      yoyo: true,
      ease: "steps(2)",
      onUpdate: () => {
        manhwa.style.setProperty("--chain-glitch-red", `${proxy.red}px`);
        manhwa.style.setProperty("--chain-glitch-blue", `${proxy.blue}px`);
        setChainMotion(manhwa, { x: proxy.x, rotation: proxy.rotation });
      },
      onComplete: () => {
        manhwa.style.setProperty("--chain-glitch-red", "0px");
        manhwa.style.setProperty("--chain-glitch-blue", "0px");
        setChainMotion(manhwa, { x: 0, rotation: 0 });
      },
    }, position);
  }

  function addSmileyHit(timeline, position) {
    const smiley = targets.smiley;
    if (!smiley) return;
    const shocked = { progress: 0 };
    const shake = { x: 0, rotation: 0 };
    chainMotion.set(smiley, shake);
    timeline.call(() => { visual.shocked = { element: smiley, progress: 0 }; }, [], position);
    timeline.to(shocked, {
      progress: 1,
      duration: CONFIG.timing.smiley,
      ease: "none",
      onUpdate: () => {
        if (visual.shocked) visual.shocked.progress = shocked.progress;
        draw();
      },
      onComplete: () => { visual.shocked = null; draw(); },
    }, position);
    timeline.to(shake, {
      x: 4,
      rotation: 5,
      duration: 0.075,
      repeat: 7,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: () => setChainMotion(smiley, { x: shake.x, rotation: shake.rotation }),
      onComplete: () => setChainMotion(smiley, { x: 0, rotation: 0 }),
    }, position);
  }

  function returnShuttle(timeline, position) {
    const shuttle = targets.shuttle;
    if (!shuttle) return;
    const proxy = chainMotion.get(shuttle);
    if (!proxy) return;
    timeline.to(proxy, {
      x: 0,
      y: 0,
      duration: CONFIG.timing.shuttleReturn,
      ease: "sine.inOut",
      onUpdate: () => setChainMotion(shuttle, proxy),
    }, position);
  }

  function clearEffects() {
    visual.bolts.length = 0;
    visual.rings.length = 0;
    visual.trail = null;
    visual.speedLines = null;
    visual.flash = null;
    visual.shocked = null;
    chainMotion.forEach((_, element) => setChainMotion(element, { x: 0, y: 0, rotation: 0 }));
    chainMotion.clear();
    elements.forEach((element) => {
      element.style.setProperty("--chain-zap-x", "0px");
      element.style.setProperty("--chain-zap-y", "0px");
      element.style.setProperty("--chain-zap-rotation", "0deg");
    });
    if (targets.manhwa) {
      targets.manhwa.style.setProperty("--chain-glitch-red", "0px");
      targets.manhwa.style.setProperty("--chain-glitch-blue", "0px");
    }
    if (targets.racket) targets.racket.style.setProperty("--chain-glow", "0px");
    if (targets.fwip) targets.fwip.style.scale = "";
    cutouts.querySelectorAll(".hero-chain-word").forEach((word) => word.remove());
    smileyOverlay.style.opacity = "0";
    activeWords.clear();
    zapTweens.forEach((tween) => tween.kill());
    zapTweens.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function stopChain() {
    if (chainTimeline) chainTimeline.kill();
    chainTimeline = null;
    chainRunning = false;
    clearEffects();
  }

  function sampleTargets() {
    return Object.fromEntries(CONFIG.iconOrder.map((name) => [name, centerOf(targets[name])]));
  }

  function scheduleChain() {
    window.clearTimeout(chainTimer);
    if (!active || reducedMotion.matches || chainRunning) return;
    const wait = randomBetween(CONFIG.intervals.chainMin, CONFIG.intervals.chainMax);
    chainTimer = window.setTimeout(() => startChain(0, true), wait);
  }

  function startChain(startIndex, automatic = false) {
    if (!active || reducedMotion.matches || chainRunning) return;
    if (!automatic && Date.now() - lastChainEnd < CONFIG.timing.cooldown * 1000) return;
    const positions = sampleTargets();
    if (!positions.racket || !positions.shuttle || !positions.headphones) return;
    window.clearTimeout(chainTimer);
    ambientTimers.forEach((timer) => window.clearTimeout(timer));
    ambientTimers.clear();
    chainRunning = true;
    chainTimeline = gsap.timeline({
      onUpdate: draw,
      onComplete: () => {
        chainRunning = false;
        chainTimeline = null;
        lastChainEnd = Date.now();
        clearEffects();
        if (active) {
          scheduleChain();
          scheduleAmbient();
        }
      },
    });

    let cursor = 0;
    if (startIndex <= 0) {
      chargeRacket(chainTimeline, cursor);
      cursor += CONFIG.timing.charge;
    }
    if (startIndex <= 1) {
      if (startIndex === 1) animateZap(targets.shuttle);
      launchShuttle(chainTimeline, positions, cursor);
      cursor += CONFIG.timing.shuttleFlight;
    }
    if (startIndex <= 2) {
      if (startIndex > 1) chainTimeline.call(() => strike("shuttle", "headphones", positions), [], cursor);
      addHeadphonePulse(chainTimeline, cursor);
      animateWord(chainTimeline, "WHAM!", targets.headphones, "wham", cursor);
      cursor += CONFIG.timing.headphones;
    }
    if (startIndex <= 3) {
      chainTimeline.call(() => strike("headphones", "camera", positions), [], cursor);
      addCameraHit(chainTimeline, cursor);
      cursor += CONFIG.timing.camera;
    }
    if (startIndex <= 4) {
      chainTimeline.call(() => strike("camera", "manhwa", positions), [], cursor);
      addManhwaHit(chainTimeline, cursor);
      cursor += CONFIG.timing.manhwa;
    }
    if (startIndex <= 5) {
      chainTimeline.call(() => strike("manhwa", "smiley", positions), [], cursor);
      addSmileyHit(chainTimeline, cursor);
      cursor += CONFIG.timing.smiley;
    }
    if (startIndex <= 6) {
      if (targets.fwip) {
        const fwipScale = { value: 1.3 };
        targets.fwip.style.scale = "1.3";
        chainTimeline.to(fwipScale, {
          value: 1,
          duration: CONFIG.timing.fwip,
          ease: "back.out(2.1)",
          onUpdate: () => { targets.fwip.style.scale = String(fwipScale.value); },
          onComplete: () => { targets.fwip.style.scale = ""; },
        }, cursor);
        cursor += CONFIG.timing.fwip;
      }
    }
    if (startIndex <= 1 && targets.shuttle) {
      chainTimeline.call(() => { visual.trail = null; }, [], cursor);
      returnShuttle(chainTimeline, cursor);
      cursor += CONFIG.timing.shuttleReturn;
    }
    chainTimeline.to({}, { duration: 0.08, onUpdate: draw }, cursor);
  }

  function scheduleAmbientIcon(element) {
    const intervalFactor = isMobile() ? CONFIG.intervals.mobileAmbientFactor : 1;
    const timer = window.setTimeout(() => {
      ambientTimers.delete(element);
      if (!active || chainRunning || reducedMotion.matches) return;
      addLocalArc(element, 0.42, CONFIG.intervals.ambientDuration * 1000);
      animateZap(element);
      draw();
      scheduleAmbientIcon(element);
    }, randomBetween(CONFIG.intervals.ambientMin, CONFIG.intervals.ambientMax) * intervalFactor);
    ambientTimers.set(element, timer);
  }

  function scheduleAmbient() {
    ambientTimers.forEach((timer) => window.clearTimeout(timer));
    ambientTimers.clear();
    if (!active || reducedMotion.matches || chainRunning) return;
    elements.filter((element) => element !== targets.fwip).forEach(scheduleAmbientIcon);
  }

  function pauseEffects() {
    active = false;
    window.clearTimeout(chainTimer);
    ambientTimers.forEach((timer) => window.clearTimeout(timer));
    ambientTimers.clear();
    window.clearTimeout(hoverTimer);
    stopChain();
    if (reducedMotion.matches) context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function resumeEffects() {
    active = heroVisible && document.visibilityState === "visible";
    if (!active) return;
    if (reducedMotion.matches) {
      draw();
      return;
    }
    scheduleChain();
    scheduleAmbient();
  }

  function onVisibilityChange() {
    if (document.visibilityState === "visible") resumeEffects();
    else pauseEffects();
  }

  CONFIG.iconOrder.forEach((name, index) => {
    const element = targets[name];
    if (!element) return;
    element.classList.add("hero-chain-target");
    element.addEventListener("click", () => {
      window.clearTimeout(hoverTimer);
      startChain(0);
    });
    element.addEventListener("pointerenter", (event) => {
      if (isMobile() || !finePointerQuery.matches || event.pointerType !== "mouse" || !active || reducedMotion.matches) return;
      addLocalArc(element, 0.62, 190);
      animateZap(element);
      draw();
      window.clearTimeout(hoverTimer);
      if (!chainRunning) hoverTimer = window.setTimeout(() => startChain(index), 140);
    });
    element.addEventListener("pointerleave", () => window.clearTimeout(hoverTimer));
  });

  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    heroVisible = entry.isIntersecting;
    if (heroVisible && document.visibilityState === "visible") resumeEffects();
    else {
      pauseEffects();
    }
  }, { threshold: 0.2 });
  observer.observe(hero);

  const resizeObserver = new ResizeObserver(() => {
    resizeCanvas();
    if (active) draw();
  });
  resizeObserver.observe(cutouts);
  window.addEventListener("resize", resizeCanvas, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      pauseEffects();
      active = heroVisible && document.visibilityState === "visible";
      if (active) draw();
    }
    else resumeEffects();
  });
})();
