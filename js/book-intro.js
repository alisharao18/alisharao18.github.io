(() => {
  "use strict";

  const CONFIG = {
    timing: {
      cameraPush: 1.2,
      coverOpen: 1,
      coverStarts: 1.2,
      pagesStart: 2.2,
      pageFlip: 0.34,
      pageStagger: 0.18,
      fallStarts: 3.4,
      fallIntoStory: 1.1,
      skipFade: 0.3,
      reducedFade: 0.3,
      safety: 8,
    },
    text: {
      title: "THE CHRONICLES OF ALISHA",
      subtitle: "A DATA SCIENCE STORY",
      whoosh: "WHOOSH!",
      chapter: "CHAPTER 1",
      screenReader: "Opening Alisha Rao's portfolio",
      skip: "SKIP INTRO",
    },
    colors: {
      background: "#070609",
      red: "#a63258",
      violet: "#8f75c7",
      paper: "#f4eedf",
      title: "#fbf4ff",
    },
    particles: {
      desktop: 32,
      mobile: 0,
      maximum: 40,
    },
    pageCount: 5,
    mobileWidth: 600,
    finalScale: 7,
  };

  const overlay = document.querySelector(".book-intro-overlay");
  if (!overlay) {
    console.error("Book intro overlay is missing.");
    return;
  }

  const gsap = window.gsap;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia(`(max-width: ${CONFIG.mobileWidth - 1}px)`).matches;
  const previousOverflow = document.body.style.overflow;
  const previousTabIndex = document.body.getAttribute("tabindex");
  const startScroll = window.scrollY;
  const particles = [];
  const particleTweens = [];
  let timeline = null;
  let active = true;
  let entranceStarted = false;
  let safetyTimer = 0;

  function addElement(parent, className, tag = "div") {
    const element = document.createElement(tag);
    element.className = className;
    parent.append(element);
    return element;
  }

  function addSvgSpeedLines(parent) {
    const namespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(namespace, "svg");
    svg.classList.add("book-intro-speedlines");
    svg.setAttribute("viewBox", "0 0 800 800");
    svg.setAttribute("aria-hidden", "true");
    for (let index = 0; index < 20; index += 1) {
      const angle = index * Math.PI / 10;
      const inner = index % 2 ? 222 : 178;
      const outer = 370;
      const line = document.createElementNS(namespace, "line");
      line.setAttribute("x1", String(400 + Math.cos(angle) * inner));
      line.setAttribute("y1", String(400 + Math.sin(angle) * inner));
      line.setAttribute("x2", String(400 + Math.cos(angle) * outer));
      line.setAttribute("y2", String(400 + Math.sin(angle) * outer));
      svg.append(line);
    }
    parent.append(svg);
    return svg;
  }

  function buildIntro() {
    overlay.replaceChildren();
    overlay.style.setProperty("--intro-background", CONFIG.colors.background);
    overlay.style.setProperty("--intro-red", CONFIG.colors.red);
    overlay.style.setProperty("--intro-violet", CONFIG.colors.violet);
    overlay.style.setProperty("--intro-paper", CONFIG.colors.paper);
    overlay.style.setProperty("--intro-title", CONFIG.colors.title);
    const spotlight = addElement(overlay, "book-intro-spotlight");
    const scene = addElement(overlay, "book-intro-scene");
    const stage = addElement(scene, "book-intro-stage");
    const book = addElement(stage, "book-intro-book");
    addElement(book, "book-intro-back");
    const pages = addElement(book, "book-intro-pages");
    const pageShadow = addElement(pages, "book-intro-shadow");

    for (let index = 0; index < CONFIG.pageCount; index += 1) {
      const page = addElement(pages, "book-intro-page");
      page.style.zIndex = String(CONFIG.pageCount - index);
      addElement(page, "book-intro-page-back");
      if (index === 2) {
        const chapter = addElement(page, "book-intro-page-content book-intro-page-content--chapter");
        chapter.textContent = CONFIG.text.chapter;
      } else {
        addElement(page, "book-intro-page-content").textContent = index % 2 ? "THE STORY CONTINUES" : "DATA · DISCOVERY · DESIGN";
      }
    }
    addElement(book, "book-intro-spine");
    const cover = addElement(book, "book-intro-front");
    addElement(cover, "book-intro-cover-title").textContent = CONFIG.text.title;
    addElement(cover, "book-intro-ornament");
    addElement(cover, "book-intro-cover-subtitle").textContent = CONFIG.text.subtitle;
    const flare = addElement(stage, "book-intro-flare");
    const speedLines = addSvgSpeedLines(stage);
    const whoosh = addElement(stage, "book-intro-whoosh");
    whoosh.textContent = CONFIG.text.whoosh;
    const particleCount = Math.min(CONFIG.particles.maximum, mobile ? CONFIG.particles.mobile : CONFIG.particles.desktop);
    for (let index = 0; index < particleCount; index += 1) {
      const particle = addElement(overlay, "book-intro-particle");
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.scale = String(0.7 + Math.random() * 1.5);
      particles.push(particle);
    }
    const skip = addElement(document.body, "book-intro-skip", "button");
    skip.type = "button";
    skip.textContent = CONFIG.text.skip;
    const screenReaderText = addElement(document.body, "book-intro-sr", "span");
    screenReaderText.setAttribute("role", "status");
    screenReaderText.textContent = CONFIG.text.screenReader;
    return { book, cover, flare, pages, pageShadow, spotlight, speedLines, whoosh, skip };
  }

  function beginHeroEntrance() {
    if (entranceStarted) return;
    entranceStarted = true;
    if (typeof window.startPortfolioHeroEntrance === "function") {
      window.startPortfolioHeroEntrance();
    } else {
      console.error("The portfolio hero entrance hook is unavailable.");
    }
  }

  function cleanAndClose() {
    if (!active) return;
    active = false;
    window.clearTimeout(safetyTimer);
    if (timeline) timeline.kill();
    timeline = null;
    particleTweens.forEach((tween) => tween.kill());
    particleTweens.length = 0;
    overlay.remove();
    document.querySelector(".book-intro-skip")?.remove();
    document.querySelector(".book-intro-sr")?.remove();
    document.body.classList.remove("book-intro-lock");
    document.body.style.overflow = previousOverflow;
    window.scrollTo(0, startScroll);
    const brand = document.querySelector(".site-header .brand");
    if (brand instanceof HTMLElement) brand.focus({ preventScroll: true });
    if (previousTabIndex === null) document.body.removeAttribute("tabindex");
    else document.body.setAttribute("tabindex", previousTabIndex);
  }

  function skipIntro() {
    if (!active || overlay.classList.contains("is-finishing")) return;
    overlay.classList.add("is-finishing");
    beginHeroEntrance();
    if (timeline) timeline.kill();
    timeline = null;
    if (gsap) {
      gsap.to(overlay, {
        opacity: 0,
        duration: CONFIG.timing.skipFade,
        ease: "power1.out",
        onComplete: cleanAndClose,
      });
    } else {
      cleanAndClose();
    }
  }

  function addParticleDrift() {
    particles.forEach((particle, index) => {
      particleTweens.push(gsap.fromTo(
        particle,
        { opacity: 0, x: 0, y: 0 },
        {
          opacity: 0.45 + Math.random() * 0.4,
          x: gsap.utils.random(-35, 35),
          y: gsap.utils.random(-70, -20),
          duration: gsap.utils.random(1.8, 3.8),
          delay: index * 0.035,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
      ));
    });
  }

  function playReducedIntro(elements) {
    elements.book.style.opacity = "1";
    if (!gsap) {
      beginHeroEntrance();
      cleanAndClose();
      return;
    }
    timeline = gsap.timeline({
      onComplete: cleanAndClose,
    });
    timeline.to(overlay, {
      opacity: 0,
      duration: CONFIG.timing.reducedFade,
      delay: 0.12,
      ease: "power1.out",
      onStart: beginHeroEntrance,
    });
  }

  function playIntro(elements) {
    if (!gsap) {
      console.error("Book intro requires GSAP; skipping the intro.");
      skipIntro();
      return;
    }
    addParticleDrift();
    gsap.set(elements.book, { transformPerspective: 1600, rotationX: 5, rotationY: -5, scale: 0.87 });
    timeline = gsap.timeline({ onComplete: cleanAndClose });
    timeline
      .to(elements.book, { scale: 1, rotationX: 2, rotationY: 0, duration: CONFIG.timing.cameraPush, ease: "power2.out" }, 0)
      .to(elements.spotlight, { opacity: 0.94, duration: CONFIG.timing.cameraPush, ease: "sine.out" }, 0)
      .to(elements.book, { x: "8vw", duration: CONFIG.timing.coverOpen, ease: "power2.inOut" }, CONFIG.timing.coverStarts)
      .to(elements.cover, { rotationY: -165, duration: CONFIG.timing.coverOpen, ease: "power3.inOut" }, CONFIG.timing.coverStarts)
      .fromTo(elements.pageShadow, { xPercent: -100, opacity: 0 }, { xPercent: 230, opacity: 0.7, duration: 0.64, ease: "power2.inOut" }, CONFIG.timing.coverStarts + 0.72)
      .to(elements.flare, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }, CONFIG.timing.coverStarts + 0.72)
      .to(elements.flare, { opacity: 0, scale: 1.18, duration: 0.35, ease: "power1.out" }, CONFIG.timing.coverStarts + 0.9)
      .to(elements.speedLines, { opacity: 0.9, scale: 1, duration: 0.22, ease: "power2.out" }, CONFIG.timing.coverStarts + 0.76)
      .to(elements.speedLines, { opacity: 0, scale: 1.14, duration: 0.36, ease: "power1.out" }, CONFIG.timing.coverStarts + 0.94)
      .to(elements.whoosh, { opacity: 1, scale: 1, duration: 0.32, ease: "back.out(2.1)" }, CONFIG.timing.coverStarts + 0.74)
      .to(elements.whoosh, { opacity: 0, duration: 0.16, ease: "power1.in" }, CONFIG.timing.coverStarts + 1.12);

    Array.from(elements.pages.children).forEach((page, index) => {
      const start = CONFIG.timing.pagesStart + index * CONFIG.timing.pageStagger;
      timeline.to(page, {
        rotationY: -180,
        skewY: index % 2 ? -2 : 2,
        opacity: 0.82,
        filter: !mobile && index === 0 ? "blur(1px)" : "none",
        duration: CONFIG.timing.pageFlip,
        ease: "power2.inOut",
      }, start);
      timeline.to(page, {
        skewY: 0,
        opacity: 1,
        filter: !mobile && index === 0 ? "blur(0px)" : "none",
        duration: 0.12,
      }, start + CONFIG.timing.pageFlip - 0.12);
    });

    timeline.call(beginHeroEntrance, [], CONFIG.timing.fallStarts);
    timeline.to(elements.book, {
      scale: CONFIG.finalScale,
      rotationX: 0,
      rotationY: 0,
      x: "8vw",
      duration: CONFIG.timing.fallIntoStory,
      ease: "power2.in",
    }, CONFIG.timing.fallStarts);
    timeline.to(overlay, {
      opacity: 0,
      duration: CONFIG.timing.fallIntoStory,
      ease: "power1.in",
    }, CONFIG.timing.fallStarts);
  }

  document.body.classList.add("book-intro-lock");
  document.body.setAttribute("tabindex", "-1");
  safetyTimer = window.setTimeout(skipIntro, CONFIG.timing.safety * 1000);

  let elements;
  try {
    elements = buildIntro();
  } catch (error) {
    console.error("Could not build the book intro.", error);
    skipIntro();
    return;
  }

  elements.skip.addEventListener("click", skipIntro);
  overlay.addEventListener("click", skipIntro);
  document.addEventListener("keydown", (event) => {
    if (!active || !["Escape", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    skipIntro();
  });
  elements.skip.focus({ preventScroll: true });

  function startIntroWhenReady() {
    if (!active) return;
    if (reducedMotion) playReducedIntro(elements);
    else playIntro(elements);
  }

  if (document.readyState === "complete") startIntroWhenReady();
  else window.addEventListener("load", startIntroWhenReady, { once: true });
})();
