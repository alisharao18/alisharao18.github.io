// Editable portfolio content. Project chapter numbers and the page count are derived from PROJECTS.
const PROJECT_COVER_ICONS = {
  analytics: `
    <g class="cover-drawing">
      <path class="cover-line" d="M95 235H305" />
      <rect class="cover-fill" x="112" y="174" width="38" height="61" rx="3" />
      <rect class="cover-fill" x="169" y="137" width="38" height="98" rx="3" />
      <rect class="cover-fill" x="226" y="100" width="38" height="135" rx="3" />
      <circle class="cover-lens" cx="250" cy="133" r="47" />
      <path class="cover-line" d="m283 168 43 43" />
      <circle class="cover-glint" cx="237" cy="120" r="7" />
    </g>`,
  markov: `
    <g class="cover-drawing cover-markov">
      <path class="cover-arrow" d="M154 93Q199 60 245 93" />
      <path class="cover-arrow" d="M282 129Q316 160 282 192" />
      <path class="cover-arrow" d="M246 225Q199 258 154 225" />
      <path class="cover-arrow" d="M118 191Q84 160 118 129" />
      <circle class="cover-node" cx="130" cy="105" r="34" />
      <circle class="cover-node" cx="270" cy="105" r="34" />
      <circle class="cover-node" cx="270" cy="215" r="34" />
      <circle class="cover-node" cx="130" cy="215" r="34" />
      <text class="cover-node-label" x="130" y="105">A</text>
      <text class="cover-node-label" x="270" y="105">B</text>
      <text class="cover-node-label" x="270" y="215">C</text>
      <text class="cover-node-label" x="130" y="215">D</text>
      <path class="cover-arrow-head" d="m238 83 13 10-16 5" />
      <path class="cover-arrow-head" d="m292 179-10 14-5-16" />
      <path class="cover-arrow-head" d="m162 237-13-10 16-5" />
      <path class="cover-arrow-head" d="m108 141 10-14 5 16" />
    </g>`,
  fintech: `
    <g class="cover-drawing">
      <path class="cover-slice" d="M196 158V69A89 89 0 0 1 273 113Z" />
      <path class="cover-line" d="M196 158V69A89 89 0 1 0 273 113Z" />
      <path class="cover-arrow" d="M113 111Q136 76 169 72" />
      <path class="cover-arrow" d="M279 205Q256 240 223 244" />
      <path class="cover-arrow-head" d="m158 63 16 6-12 12" />
      <path class="cover-arrow-head" d="m233 253-16-6 12-12" />
      <circle class="cover-center" cx="196" cy="158" r="8" />
    </g>`,
  statistics: `
    <g class="cover-drawing">
      <circle class="cover-coin" cx="140" cy="155" r="66" />
      <circle class="cover-coin-inner" cx="140" cy="155" r="54" />
      <text class="cover-question" x="140" y="177" text-anchor="middle">?</text>
      <path class="cover-axis" d="M226 222H337M242 222V92" />
      <path class="cover-curve" d="M246 219C270 218 273 202 284 171C295 139 304 110 315 111C326 112 329 179 338 219" />
    </g>`,
};

const PROJECTS = [
  {
    title: "SEBI Mutual Fund Complaint Analytics Dashboard",
    subtitle: "",
    chapterLabel: "CHAPTER",
    coverIcon: "analytics",
    coverAccent: "red",
    coverLabel: "ANALYTICS",
    coverDescription: "Bar chart with a magnifying glass inspecting a bar",
    hook: "What are investors complaining about, and which funds should worry us?",
    description: "Built an end-to-end analytics pipeline using Selenium, PostgreSQL and Power BI to analyze SEBI mutual fund complaint data. Developed interactive dashboards and DAX-based KPIs to identify complaint trends, risk indicators and fund performance insights.",
    techTags: ["Selenium", "PostgreSQL", "Power BI", "DAX"],
    resultStat: null,
    link: "https://github.com/alisharao18/sebi_dashboard",
    linkLabel: "View on GitHub",
    status: "",
  },
  {
    title: "Customer Behaviour Modelling via Markov Chains",
    subtitle: "",
    chapterLabel: "CHAPTER",
    coverIcon: "markov",
    coverAccent: "violet",
    coverLabel: "MODELLING",
    coverDescription: "Four connected circles representing looping Markov states",
    hook: "Predicting what a listener does next, and when they leave.",
    description: "Developed a 4-state Markov Chain model using Spotify listening data to analyze and predict user behavior transitions. Applied Monte Carlo simulation and sensitivity analysis to identify user engagement patterns and key drop-off states.",
    techTags: ["Python", "Markov Chains", "Monte Carlo", "Sensitivity Analysis"],
    resultStat: null,
    link: "",
    linkLabel: "Link coming soon",
    status: "",
  },
  {
    title: "Automated Portfolio Rebalancing & Tax Harvesting",
    subtitle: "",
    chapterLabel: "CHAPTER",
    coverIcon: "fintech",
    coverAccent: "yellow",
    coverLabel: "FINTECH",
    coverDescription: "Pie chart with arrows swapping an allocation slice",
    hook: "A rule-based robo-advisor that knows when to rebalance.",
    description: "Building a rule-based Streamlit app that recommends asset allocations by risk profile across Indian and US equity, debt, commodities and REITs/InvITs, with drawdown-aware rebalancing. Developed the data pipeline and backtesting module and built dashboard v1; volatility rules are under mentor review. Next phase: stock-level layer for Indian equity, fund selection, an ML-based risk-on score, a bonds sleeve and tax-loss harvesting.",
    techTags: ["Python", "Streamlit", "Backtesting", "Data Pipeline"],
    resultStat: null,
    link: "https://github.com/alisharao18/Portfolio-Rebalancing-and-Tax-Loss-Harvesting-Engine",
    linkLabel: "View on GitHub",
    status: "ONGOING",
  },
  {
    title: "Where'd All My Money Go?",
    subtitle: "Statistical Analysis of Survey Data (SSDI)",
    chapterLabel: "CHAPTER",
    coverIcon: "statistics",
    coverAccent: "cyan",
    coverLabel: "STATISTICS",
    coverDescription: "Question-mark coin beside a statistical bell curve",
    hook: "I surveyed people, ran the tests, and the numbers had opinions.",
    description: "Cleaned and augmented real survey data, then applied hypothesis testing, ANOVA, MANOVA and linear regression to draw inferences. Packaged the whole analysis as an interactive Streamlit application.",
    techTags: ["Python", "Pandas", "Statsmodels", "Streamlit"],
    resultStat: null,
    link: "https://ssdiproject-3usqzjl8573g96rlh6ye6r.streamlit.app/",
    linkLabel: "Open live app",
    status: "",
  },
];

const SKILL_GROUPS = [
  { category: "Programming", skills: ["Python", "SQL", "Java", "PostgreSQL"] },
  { category: "Libraries & Frameworks", skills: ["Pandas", "NumPy", "Scikit-learn", "Statsmodels"] },
  {
    category: "Machine Learning & Statistics",
    skills: [
      "Linear Regression",
      "Logistic Regression",
      "Ridge & Lasso Regression",
      "K-Means Clustering",
      "K-Nearest Neighbors (KNN)",
      "Principal Component Analysis",
      "Linear Discriminant Analysis",
      "Hypothesis Testing",
      "ANOVA",
      "MANOVA",
      "Markov Chains",
    ],
  },
  { category: "Data Analytics", skills: ["Data Cleaning", "Exploratory Data Analysis (EDA)", "Feature Engineering", "Statistical Modeling"] },
  { category: "Visualization & BI", skills: ["Power BI", "Tableau", "Streamlit", "DAX"] },
];

// Editable words for the two looping manga banners.
const MARQUEE_ROWS = [
  {
    direction: "left",
    words: ["PYTHON", "SQL", "MACHINE LEARNING", "STATISTICS", "POWER BI", "STREAMLIT", "DATA ANALYTICS", "PLOT TWISTS"],
  },
  {
    direction: "right",
    words: ["DATA SCIENCE", "CHAPTER ???", "SPEED LINES", "MANHWA", "BADMINTON", "CASE CLOSED"],
  },
];

const PAGE_COUNT = PROJECTS.length + 7;

const BONUS_CHAPTER = Object.freeze({
  word: "PLOTTWIST",
  scrambled: ["T", "L", "W", "O", "S", "T", "P", "I", "T"],
  clue: "Every story has one. Mine is hiding in my tagline.",
  hintDelay: 20000,
});

const MANGA_TEXT = Object.freeze({
  kicker: "BONUS CHAPTER · SEALED",
  title: "BONUS CHAPTER: THE RANDOM SEED",
  theoryLabel: "IN THEORY",
  realityLabel: "IN REALITY",
  p1Student: "Sir, the model finally works!",
  p1Professor: "Great job!",
  p2Professor: "Now let's figure out why it works.",
  p3Student: "SIR, IT FINALLY WORKED! 94% ACCURACY!",
  p3Professor: "IT'S A MIRACLE!",
  p4Professor: "Now don't touch it. Don't retrain it. Don't even change the random seed.",
  endingCaption: "Next morning...",
  endingStudent: "Who changed random_state to 43?",
  endingFooter: "To be continued... in the next project.",
  endingSfx: "DUN DUN DUN",
  openingSfx: "WHAM!",
  replay: "Replay",
  accuracyInitial: "94%",
  accuracyFinal: "Accuracy: 61%",
  panelDescriptions: [
    "In theory, panel one: A student tells a professor the model works. The professor congratulates them. A laptop sits nearby.",
    "In theory, panel two: The professor raises one finger and says, “Now let's figure out why it works.”",
    "In reality, panel three: The excited student shouts that the model worked with 94% accuracy. The professor clasps their hands and calls it a miracle.",
    "In reality, panel four: The professor whispers not to touch, retrain, or change the random seed. The tired student stares at the laptop with a sweat drop.",
    "Mystery ending: The next morning, a laptop shows Accuracy: 61%. A shadow with glowing eyes watches from a window, as the student asks who changed random_state to 43.",
  ],
  panelRegionLabels: [
    "In theory, panel one",
    "In theory, panel two",
    "In reality, panel three",
    "In reality, panel four",
    "Mystery ending",
  ],
  artDescriptions: [
    "Student and professor beside a laptop",
    "Professor raises one finger while the student listens",
    "Exhausted student celebrates wildly beside a laptop",
    "Professor whispers as the student stares at the laptop with a sweat drop",
    "A laptop shows a lower accuracy as a shadowy figure with glowing eyes appears in the window",
  ],
  bubbles: {
    p1Student: { speaker: "Student", tail: "bottom-left", offset: 57, left: 3, width: 36 },
    p1Professor: { speaker: "Professor", tail: "bottom-center", offset: 64, left: 55, width: 34 },
    p2Professor: { speaker: "Professor", tail: "bottom-right", offset: 85, left: 41, width: 40 },
    p3Student: { speaker: "Student", tail: "bottom-left", offset: 42, left: 3, width: 48, style: "shout" },
    p3Professor: { speaker: "Professor", tail: "bottom-left", offset: 63, left: 58, width: 31, style: "shout" },
    p4Professor: { speaker: "Professor", tail: "bottom-left", offset: 39, left: 3, width: 50, style: "whisper" },
    endingStudent: { speaker: "Student", tail: "bottom-left", offset: 72, phoneOffset: 32, left: 3, width: 28, phoneWidth: 48 },
  },
});

(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 600px), (pointer: coarse)").matches;
  const loader = document.querySelector(".loader");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const progress = document.querySelector(".progress-line i");
  const topProgress = document.querySelector(".top-progress-fill");
  const chapterRail = document.querySelector(".chapter-rail");
  const pageNumber = document.querySelector(".page-counter b");
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  const soundEffect = document.querySelector(".sound-effect");
  const themeToggle = document.querySelector(".theme-toggle");
  const secretDialog = document.querySelector(".easter-egg");
  const secretClose = document.querySelector(".easter-close");
  const bonusChapter = document.querySelector(".bonus-chapter");
  const bonusTileRack = document.querySelector(".bonus-tile-rack");
  const bonusSlots = document.querySelector(".bonus-slots");
  const bonusStatus = document.querySelector(".bonus-status");
  const bonusHint = document.querySelector(".bonus-hint");
  const bonusLock = document.querySelector(".bonus-lock");
  let mangaTimeline = null;

  document.querySelectorAll("#year").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
  renderPortfolioData();

  function createTextElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function createProjectCover(project, chapterNumber) {
    const cover = document.createElement("div");
    cover.className = "project-art project-cover";
    cover.dataset.coverAccent = project.coverAccent;

    if (project.image) {
      const image = document.createElement("img");
      image.className = "project-cover-image";
      image.src = project.image;
      image.alt = `${project.title} project cover`;
      image.loading = "lazy";
      cover.append(image);
    } else {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.classList.add("project-cover-icon");
      svg.setAttribute("viewBox", "0 0 400 320");
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", project.coverDescription);
      svg.setAttribute("focusable", "false");
      svg.innerHTML = PROJECT_COVER_ICONS[project.coverIcon];
      cover.append(svg);
    }

    cover.append(createTextElement("span", "project-cover-number", chapterNumber));
    const labels = document.createElement("div");
    labels.className = "project-cover-labels";
    labels.append(createTextElement("span", "project-cover-label", project.coverLabel));
    if (project.status) labels.append(createTextElement("span", "project-cover-status", project.status));
    cover.append(labels);
    return cover;
  }

  function createProjectPanel(project, index) {
    const chapterNumber = String(index + 3).padStart(2, "0");
    const palette = ["project-red", "project-violet", "project-yellow", "project-blue", "project-pink"];
    const panel = document.createElement("article");
    panel.className = `project-panel comic-panel ${palette[index % palette.length]}`;
    panel.dataset.project = String(index + 1);

    const title = createTextElement("h3", "", project.title);
    title.id = `project-title-${index + 1}`;
    panel.setAttribute("aria-labelledby", title.id);

    const art = createProjectCover(project, chapterNumber);

    const content = document.createElement("div");
    content.className = "project-content";
    const kicker = createTextElement("p", "project-kicker", `${project.chapterLabel} ${chapterNumber}`);
    content.append(kicker, title);

    if (project.subtitle) content.append(createTextElement("p", "project-subtitle", project.subtitle));
    if (project.status) content.append(createTextElement("span", "project-status", project.status));
    content.append(
      createTextElement("p", "project-hook", project.hook),
      createTextElement("p", "project-description", project.description),
    );

    const tags = document.createElement("div");
    tags.className = "project-tags";
    project.techTags.forEach((tag) => tags.append(createTextElement("span", "", tag)));
    content.append(tags);

    if (project.resultStat && Number.isFinite(Number(project.resultStat.value))) {
      const result = document.createElement("div");
      result.className = "project-result";
      const value = createTextElement("strong", "", "00");
      value.dataset.counter = "";
      value.dataset.target = String(project.resultStat.value);
      value.dataset.decimals = String(project.resultStat.decimals || 0);
      result.append(value, createTextElement("span", "", project.resultStat.label));
      content.append(result);
    }

    if (project.link) {
      const link = createTextElement("a", "comic-button project-button", project.linkLabel);
      link.href = project.link;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.append(createTextElement("span", "", "↗"));
      link.lastElementChild.setAttribute("aria-hidden", "true");
      content.append(link);
    } else {
      content.append(createTextElement("span", "project-link-placeholder", project.linkLabel));
    }

    panel.append(art, content);
    return panel;
  }

  function renderPortfolioData() {
    const totalSkills = SKILL_GROUPS.reduce((total, group) => total + group.skills.length, 0);
    const skillGroups = document.querySelector(".skill-groups");
    const projectStack = document.querySelector(".project-stack");
    if (!skillGroups || !projectStack) return;

    skillGroups.replaceChildren(...SKILL_GROUPS.map((group) => {
      const section = document.createElement("section");
      section.className = "skill-group";
      section.append(createTextElement("h3", "skill-category", group.category));
      const badges = document.createElement("div");
      badges.className = "badge-list";
      group.skills.forEach((skill) => badges.append(createTextElement("span", "powerup-badge", skill)));
      section.append(badges);
      return section;
    }));
    projectStack.replaceChildren(...PROJECTS.map(createProjectPanel));

    document.querySelector("[data-skill-count]").textContent = String(totalSkills);
    document.querySelector(".page-counter-total").textContent = String(PAGE_COUNT).padStart(2, "0");
    document.querySelector(".hero-page-total").textContent = String(PAGE_COUNT).padStart(2, "0");

    const firstChapter = PROJECTS.length ? 3 : 0;
    const lastChapter = PROJECTS.length + 2;
    const chapterRange = PROJECTS.length === 0
      ? "PROJECTS"
      : PROJECTS.length === 1
        ? `CHAPTER ${String(firstChapter).padStart(2, "0")}`
        : `CHAPTERS ${String(firstChapter).padStart(2, "0")}—${String(lastChapter).padStart(2, "0")}`;
    document.querySelector("[data-project-chapter-range]").textContent = chapterRange;
    document.querySelector("[data-project-chapter-summary]").textContent =
      `${PROJECTS.length} PROJECT${PROJECTS.length === 1 ? "" : "S"}, ZERO SKIPPED CUTSCENES`;
  }

  function initMarquee() {
    const marquee = document.querySelector("[data-skills-marquee]");
    if (!marquee) return;

    const accessibleWords = MARQUEE_ROWS.map((row) => row.words.join(", ")).join(". ");
    marquee.append(createTextElement("p", "visually-hidden", accessibleWords));
    MARQUEE_ROWS.forEach((row, rowIndex) => {
      const marqueeRow = createTextElement("div", `marquee-row marquee-row-${rowIndex + 1}`);
      marqueeRow.setAttribute("aria-hidden", "true");
      const track = createTextElement("div", `marquee-track marquee-track-${row.direction}`);

      for (let copyIndex = 0; copyIndex < 2; copyIndex += 1) {
        const group = createTextElement("div", "marquee-group");
        row.words.forEach((word, wordIndex) => {
          group.append(createTextElement("span", "marquee-word", word));
          if (wordIndex < row.words.length - 1) group.append(createTextElement("span", "marquee-symbol", "✦"));
        });
        track.append(group);
      }
      marqueeRow.append(track);
      marquee.append(marqueeRow);
    });
  }

  function initChapterRail() {
    if (!chapterRail) return [];

    const knownChapters = {
      home: { name: "Hero", chapter: "Chapter 1: Hero" },
      about: { name: "About", chapter: "Chapter 2: About" },
      projects: { name: "Projects", chapter: "Chapter 3: Projects" },
      interests: { name: "Interests", chapter: "Side Stories: Interests" },
      contact: { name: "Contact", chapter: "Final Chapter: Contact" },
    };
    const chapters = [...document.querySelectorAll("main > .chapter")].map((element, index) => {
      const known = knownChapters[element.id];
      const title = element.querySelector("h1, h2")?.textContent.trim() || element.id;
      return {
        element,
        name: known?.name || title,
        chapter: known?.chapter || `Chapter ${index + 1}: ${title}`,
      };
    });
    const bonusElement = document.querySelector("#bonus-chapter");
    if (bonusElement) {
      chapters.push({ element: bonusElement, name: "Bonus Chapter", chapter: "Bonus Chapter", locked: true });
    }

    chapterRail.replaceChildren();
    chapters.forEach((chapter, index) => {
      const button = document.createElement("button");
      button.className = "chapter-rail-button";
      if (chapter.locked) button.classList.add("is-locked");
      button.type = "button";
      button.setAttribute("aria-label", `Go to ${chapter.name}`);

      const dot = document.createElement("span");
      dot.className = "chapter-rail-dot";
      if (chapter.locked) {
        dot.innerHTML = '<svg viewBox="0 0 16 18" aria-hidden="true"><path d="M4 8V5a4 4 0 0 1 8 0v3M2 8h12v9H2z" /></svg>';
      }

      const label = createTextElement("span", "chapter-rail-label", chapter.chapter);
      button.append(dot, label);
      button.addEventListener("click", () => {
        const top = chapter.element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      });
      chapterRail.append(button);
      chapter.button = button;
    });

    const track = document.createElement("span");
    track.className = "chapter-rail-track";
    const fill = document.createElement("span");
    fill.className = "chapter-rail-fill";
    track.append(fill);
    chapterRail.prepend(track);
    chapterRail.chapters = chapters;
    chapterRail.fill = fill;
    setActiveChapter(0, chapters);
    return chapters;
  }

  function initNavigation() {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  function hideLoader() {
    if (!loader || loader.classList.contains("is-hidden")) return;
    loader.classList.add("is-hidden");
    window.setTimeout(() => loader.remove(), 650);
  }

  function updateProgress(ratio) {
    const boundedRatio = Math.max(0, Math.min(1, ratio));
    topProgress.style.transform = `scaleX(${boundedRatio})`;
    progress.style.width = `${boundedRatio * 100}%`;
    pageNumber.textContent = String(Math.min(PAGE_COUNT, Math.floor(boundedRatio * (PAGE_COUNT - 1)) + 1)).padStart(2, "0");
  }

  function initProgress() {
    const update = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = range > 0 ? Math.min(1, window.scrollY / range) : 0;
      updateProgress(ratio);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initScrollProgressTrigger(chapters) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(topProgress, { scaleX: self.progress });
        updateProgress(self.progress);
        if (chapterRail.fill) gsap.set(chapterRail.fill, { scaleY: self.progress });
      },
      onRefresh: (self) => {
        gsap.set(topProgress, { scaleX: self.progress });
        updateProgress(self.progress);
        if (chapterRail.fill) gsap.set(chapterRail.fill, { scaleY: self.progress });
      },
    });

    chapters.forEach((chapter, index) => {
      ScrollTrigger.create({
        trigger: chapter.element,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveChapter(index, chapters),
        onEnterBack: () => setActiveChapter(index, chapters),
      });
    });
    ScrollTrigger.refresh();
  }

  function setActiveChapter(activeIndex, chapters) {
    chapters.forEach((chapter, index) => {
      chapter.button.classList.toggle("is-active", index === activeIndex);
      chapter.button.setAttribute("aria-current", index === activeIndex ? "location" : "false");
    });
  }

  function initNativeChapterRail(chapters) {
    const update = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = range > 0 ? Math.min(1, window.scrollY / range) : 0;
      if (chapterRail.fill) chapterRail.fill.style.transform = `scaleY(${ratio})`;

      let activeIndex = 0;
      chapters.forEach((chapter, index) => {
        if (chapter.element.getBoundingClientRect().top <= window.innerHeight / 2) activeIndex = index;
      });
      setActiveChapter(activeIndex, chapters);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function splitHeading(heading) {
    const text = heading.textContent.trim();
    heading.setAttribute("aria-label", text);
    heading.setAttribute("aria-hidden", "false");
    heading.textContent = "";
    [...text].forEach((character) => {
      const span = document.createElement("span");
      span.className = "char";
      span.setAttribute("aria-hidden", "true");
      span.innerHTML = character === " " ? "&nbsp;" : character;
      heading.append(span);
    });
    return heading.querySelectorAll(".char");
  }

  function animateCounters() {
    document.querySelectorAll("[data-counter]").forEach((counter) => {
      const target = Number(counter.dataset.target);
      const decimals = Number(counter.dataset.decimals || 0);
      if (!Number.isFinite(target)) return;

      const drawValue = { value: 0 };
      gsap.to(drawValue, {
        value: target,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: counter, start: "top 88%", once: true },
        onUpdate: () => {
          counter.textContent = drawValue.value.toFixed(decimals).padStart(decimals ? decimals + 2 : 2, "0");
        },
      });
    });
  }

  function setFinalCounters() {
    document.querySelectorAll("[data-counter]").forEach((counter) => {
      const target = Number(counter.dataset.target);
      const decimals = Number(counter.dataset.decimals || 0);
      if (!Number.isFinite(target)) return;
      counter.textContent = target.toFixed(decimals).padStart(decimals ? decimals + 2 : 2, "0");
    });
  }

  function showStaticStamps() {
    document.querySelectorAll(".stamp:not(.stamp-pending)").forEach((stamp) => {
      stamp.style.opacity = "1";
      stamp.style.visibility = "visible";
      stamp.style.transform = "none";
    });
  }

  function animatePanels() {
    gsap.utils.toArray(".project-panel").forEach((panel, index) => {
      gsap.fromTo(
        panel,
        { autoAlpha: 0, x: index % 2 === 0 ? -70 : 70, y: 22, rotation: index % 2 === 0 ? -2 : 2, scale: 0.97 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: panel, start: "top 82%", once: true },
        },
      );
    });

    gsap.utils.toArray(".powerup-badge").forEach((badge, index) => {
      gsap.fromTo(
        badge,
        { autoAlpha: 0, y: 14, scale: 0.82 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          delay: index * 0.045,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".powerups", start: "top 84%", once: true },
        },
      );
    });
  }

  function animateStamps() {
    gsap.utils.toArray(".stamp").forEach((stamp, index) => {
      gsap.fromTo(
        stamp,
        { autoAlpha: 0, scale: 1.5, rotation: index % 2 ? 10 : -10 },
        {
          autoAlpha: 1,
          scale: 1,
          rotation: index % 2 ? 3 : -4,
          duration: 0.55,
          delay: index * 0.08,
          ease: "back.out(2.4)",
          scrollTrigger: { trigger: stamp, start: "top 88%", once: true },
        },
      );
    });
  }

  function animateSections() {
    gsap.utils.toArray(".reveal-section").forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 90%", once: true } },
      );
    });
  }

  function animateHero() {
    const letters = splitHeading(document.querySelector("[data-split]"));
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .to(".loader-card", { autoAlpha: 0, y: -30, duration: 0.35, delay: 0.5 })
      .set(loader, { display: "none" })
      .fromTo(".hero .chapter-kicker", { autoAlpha: 0, x: -22 }, { autoAlpha: 1, x: 0, duration: 0.5 })
      .fromTo(
        letters,
        {
          autoAlpha: 0,
          x: () => gsap.utils.random(-window.innerWidth * 0.42, window.innerWidth * 0.42),
          y: () => gsap.utils.random(-window.innerHeight * 0.5, window.innerHeight * 0.5),
          rotation: () => gsap.utils.random(-100, 100),
          scale: () => gsap.utils.random(0.3, 1.8),
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.075,
          ease: "elastic.out(1, 0.62)",
          onComplete: finishHeroImpact,
        },
        "-=0.2",
      )
      .fromTo([".hero-tagline", ".hero-description", ".hero .comic-button"], { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.15")
      .fromTo(".hero .cutout", { autoAlpha: 0, scale: 0.7, rotation: -10 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.07 }, "-=0.35");

    gsap.utils.toArray(".cutout").forEach((cutout, index) => {
      const phoneLayout = window.matchMedia("(max-width: 600px)").matches;
      const floatRange = phoneLayout ? 3 : 11;
      const rotationRange = phoneLayout ? 1.5 : 5;
      gsap.to(cutout, {
        y: index % 2 ? -floatRange : floatRange,
        rotation: index % 2 ? rotationRange : -rotationRange,
        duration: 2 + (index % 3) * 0.55,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1,
      });
    });
  }

  function finishHeroImpact() {
    const impact = gsap.timeline();
    impact
      .to("main", { x: -7, y: 2, duration: 0.045, repeat: 5, yoyo: true, ease: "none" })
      .set("main", { clearProps: "transform" });

    gsap.fromTo(
      ".hero-wham",
      { autoAlpha: 0, scale: 0.3, rotation: -19 },
      { autoAlpha: 1, scale: 1, rotation: -10, duration: 0.18, ease: "back.out(2)", yoyo: true, repeat: 1, repeatDelay: 0.25, onComplete: () => gsap.set(".hero-wham", { autoAlpha: 0 }) },
    );
  }

  function initClickEffects() {
    if (reduceMotion || isMobile || !window.gsap) return;

    const words = ["POW!", "BAM!", "ZAP!", "WHAM!", "BOOM!"];
    const starPoints = "50,2 61,34 95,20 75,48 99,67 67,68 64,98 47,74 20,91 31,62 3,49 34,40 25,10";
    const splatPath = "M50 2 61 17 79 8 77 28 98 32 82 47 96 64 74 67 73 91 55 79 40 98 31 77 9 82 20 61 2 48 22 39 13 19 35 24Z";

    document.addEventListener("click", (event) => {
      const active = document.querySelectorAll(".click-burst");
      if (active.length >= 6) {
        gsap.killTweensOf(active[0]);
        active[0].remove();
      }

      const isSplat = Math.random() < 0.25;
      const burst = document.createElement("span");
      burst.className = `click-burst${isSplat ? " is-splat" : ""}`;
      burst.setAttribute("aria-hidden", "true");
      if (isSplat) {
        burst.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true"><path class="splat-shape" d="${splatPath}"/><circle class="splat-hole" cx="32" cy="41" r="5"/><circle class="splat-hole" cx="66" cy="31" r="3"/><circle class="splat-hole" cx="66" cy="69" r="5"/></svg>`;
      } else {
        const word = words[Math.floor(Math.random() * words.length)];
        burst.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true"><polygon class="burst-shape" points="${starPoints}"/></svg><span class="burst-word">${word}</span>`;
      }

      const bounds = event.target instanceof Element ? event.target.getBoundingClientRect() : null;
      const x = event.detail > 0 ? event.clientX : (bounds ? bounds.left + bounds.width / 2 : window.innerWidth / 2);
      const y = event.detail > 0 ? event.clientY : (bounds ? bounds.top + bounds.height / 2 : window.innerHeight / 2);
      const size = isSplat ? 72 : 96;
      burst.style.left = `${x - size / 2}px`;
      burst.style.top = `${y - size / 2}px`;
      document.body.append(burst);

      gsap.fromTo(
        burst,
        { autoAlpha: 0, scale: 0.1, rotation: gsap.utils.random(-24, 24) },
        {
          autoAlpha: 1,
          scale: gsap.utils.random(0.78, 1.12),
          duration: 0.24,
          ease: "back.out(2.2)",
          onComplete: () => gsap.to(burst, { autoAlpha: 0, scale: 0.82, duration: 0.25, delay: 0.5, onComplete: () => burst.remove() }),
        },
      );
    });
  }

  function initSecretChapter() {
    const secret = BONUS_CHAPTER.word.toLowerCase();
    let keyBuffer = "";
    let lastFocus = null;
    let confetti = [];
    initMangaPage();

    function closeSecret() {
      if (secretDialog.hidden) return;
      if (window.gsap) {
        gsap.killTweensOf(".easter-panel");
        gsap.killTweensOf(confetti);
        gsap.killTweensOf(".manga-panel, .manga-row-label, .manga-bubble, .manga-sfx, .manga-sweat, .manga-shadow-figure, .manga-ending-art, .manga-glitch, .student-excited");
      }
      if (mangaTimeline) {
        mangaTimeline.kill();
        mangaTimeline = null;
      }
      secretDialog.hidden = true;
      secretDialog.setAttribute("aria-hidden", "true");
      document.querySelector("main").inert = false;
      document.querySelector(".site-header").inert = false;
      themeToggle.inert = false;
      confetti.forEach((piece) => piece.remove());
      confetti = [];
      if (lastFocus instanceof HTMLElement) lastFocus.focus();
    }

    function openSecret() {
      if (!secretDialog.hidden) return;
      lastFocus = document.activeElement;
      secretDialog.hidden = false;
      secretDialog.setAttribute("aria-hidden", "false");
      document.querySelector("main").inert = true;
      document.querySelector(".site-header").inert = true;
      themeToggle.inert = true;
      secretDialog.querySelector(".easter-panel").scrollTop = 0;
      secretClose.focus();
      keyBuffer = "";
      animateMangaPage();

      const confettiContainer = secretDialog.querySelector(".easter-confetti");
      confettiContainer.replaceChildren();
      confetti = Array.from({ length: 18 }, () => {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        confettiContainer.append(piece);
        return piece;
      });

      if (!reduceMotion && window.gsap) {
        gsap.fromTo(".easter-panel", { autoAlpha: 0, scale: 0.42, rotation: -7 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.45)" });
        gsap.fromTo(confetti, { x: 0, y: 0, autoAlpha: 0, scale: 0.4 }, {
          x: () => gsap.utils.random(-260, 260),
          y: () => gsap.utils.random(-240, 240),
          rotation: () => gsap.utils.random(-270, 270),
          autoAlpha: () => gsap.utils.random(0.45, 1),
          scale: () => gsap.utils.random(0.6, 1.3),
          duration: 1.15,
          stagger: 0.012,
          ease: "power2.out",
        });
      }
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeSecret();
        return;
      }

      if (!secretDialog.hidden) {
        if (event.key === "Tab") {
          const focusable = [...secretDialog.querySelectorAll("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])")]
            .filter((element) => !element.hidden && element.getClientRects().length > 0);
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          event.preventDefault();
          if (event.shiftKey && document.activeElement === first) last.focus();
          else if (!event.shiftKey && document.activeElement === last) first.focus();
          else if (!secretDialog.contains(document.activeElement)) first.focus();
        }
        return;
      }

      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable='true']")) return;
      if (event.key.length !== 1 || !/[a-z]/i.test(event.key)) return;

      keyBuffer = (keyBuffer + event.key.toLowerCase()).slice(-secret.length);
      if (keyBuffer === secret) openSecret();
    });

    secretClose.addEventListener("click", closeSecret);
    secretDialog.addEventListener("click", (event) => {
      if (event.target === secretDialog) closeSecret();
    });

    secretDialog.querySelector(".manga-replay").addEventListener("click", () => {
      secretDialog.querySelector(".easter-panel").scrollTop = 0;
      animateMangaPage();
    });
    initBonusPuzzle(openSecret);
  }

  function initMangaPage() {
    document.querySelectorAll("[data-manga-text]").forEach((element) => {
      const key = element.dataset.mangaText;
      if (Object.hasOwn(MANGA_TEXT, key)) element.textContent = MANGA_TEXT[key];
      const bubble = MANGA_TEXT.bubbles[key];
      if (bubble) {
        element.dataset.speaker = bubble.speaker;
        element.dataset.desktopTail = bubble.tail;
        if (bubble.phoneTail) element.dataset.phoneTail = bubble.phoneTail;
        if (bubble.phoneOffset !== undefined) element.dataset.phoneOffset = String(bubble.phoneOffset);
        element.dataset.tailOffset = String(bubble.offset);
        if (bubble.style) element.classList.add(`manga-bubble-${bubble.style}`);
        element.style.setProperty("--bubble-offset", `${bubble.offset}%`);
        element.style.setProperty("--bubble-left", `${bubble.left}%`);
        element.style.setProperty("--bubble-width", `${bubble.width}%`);
        if (bubble.phoneWidth) element.style.setProperty("--bubble-phone-width", `${bubble.phoneWidth}%`);
      }
    });

    const updateBubbleTails = () => {
      const phoneWidth = window.matchMedia("(max-width: 600px)").matches;
      document.querySelectorAll(".manga-bubble").forEach((element) => {
        const tail = phoneWidth && element.dataset.phoneTail
          ? element.dataset.phoneTail
          : element.dataset.desktopTail;
        const offset = phoneWidth && element.dataset.phoneOffset
          ? Number(element.dataset.phoneOffset)
          : Number(element.dataset.tailOffset);
        element.style.setProperty("--bubble-offset", `${offset}%`);
        element.dataset.tail = tail;
        element.dataset.tailOrigin = `${offset}% ${tail.startsWith("top-") ? "-25%" : "125%"}`;
      });
    };

    updateBubbleTails();
    window.addEventListener("resize", updateBubbleTails);

    document.querySelectorAll(".manga-art[role='img']").forEach((art, index) => {
      art.setAttribute("aria-label", MANGA_TEXT.artDescriptions[index]);
    });
    document.querySelectorAll("[data-manga-panel]").forEach((panel, index) => {
      panel.setAttribute("aria-label", MANGA_TEXT.panelRegionLabels[index]);
    });

    const transcript = document.querySelector(".manga-transcript");
    transcript.textContent = [
      MANGA_TEXT.title,
      `${MANGA_TEXT.theoryLabel}. ${MANGA_TEXT.panelDescriptions[0]} ${MANGA_TEXT.p1Student} ${MANGA_TEXT.p1Professor}`,
      `${MANGA_TEXT.theoryLabel}. ${MANGA_TEXT.panelDescriptions[1]} ${MANGA_TEXT.p2Professor}`,
      `${MANGA_TEXT.realityLabel}. ${MANGA_TEXT.panelDescriptions[2]} ${MANGA_TEXT.p3Student} ${MANGA_TEXT.p3Professor}`,
      `${MANGA_TEXT.realityLabel}. ${MANGA_TEXT.panelDescriptions[3]} ${MANGA_TEXT.p4Professor}`,
      `${MANGA_TEXT.endingCaption} ${MANGA_TEXT.panelDescriptions[4]} ${MANGA_TEXT.endingStudent} ${MANGA_TEXT.endingFooter}`,
    ].join(" ");
  }

  function animateMangaPage() {
    const panels = [...document.querySelectorAll("[data-manga-panel]")];
    const labels = [...document.querySelectorAll(".manga-row-label")];
    const bubbles = [...document.querySelectorAll(".manga-bubble")];
    const sfx = document.querySelector(".manga-sfx");
    const openingSfx = document.querySelector(".manga-panel-sfx");
    const screenCopy = document.querySelector(".manga-glitch");
    const shadowFigure = document.querySelector(".manga-shadow-figure");
    const panelThreeStudent = document.querySelector(".student-excited");
    const sweat = document.querySelector(".manga-sweat");
    const endingArt = document.querySelector(".manga-ending-art");

    if (reduceMotion || !window.gsap) {
      screenCopy.textContent = MANGA_TEXT.accuracyFinal;
      shadowFigure.style.opacity = "1";
      panelThreeStudent.style.transform = "";
      sweat.style.transform = "translateY(18px)";
      endingArt.style.opacity = "1";
      sfx.style.opacity = "1";
      openingSfx.style.opacity = "0";
      return;
    }

    if (mangaTimeline) mangaTimeline.kill();
    gsap.killTweensOf([...panels, ...labels, ...bubbles, sfx, openingSfx, screenCopy, shadowFigure, panelThreeStudent, sweat, endingArt]);
    screenCopy.textContent = MANGA_TEXT.accuracyInitial;
    gsap.set(panels, { autoAlpha: 0, scale: 0.82, rotation: -1.5 });
    gsap.set(labels, { autoAlpha: 0, x: (index) => index === 0 ? -45 : 45 });
    gsap.set(bubbles, {
      autoAlpha: 0,
      scale: 0.75,
      transformOrigin: (index, bubble) => bubble.dataset.tailOrigin,
    });
    gsap.set(sfx, { autoAlpha: 0, scale: 0.35, rotation: -13 });
    gsap.set(openingSfx, { autoAlpha: 0, scale: 0.35, rotation: -13 });
    gsap.set(shadowFigure, { autoAlpha: 0 });
    gsap.set(endingArt, { opacity: 0.55 });
    gsap.set(panelThreeStudent, { x: 0 });
    gsap.set(sweat, { y: 0 });

    mangaTimeline = gsap.timeline();
    mangaTimeline
      .to(labels[0], { autoAlpha: 1, x: 0, duration: 0.32, ease: "power2.out" })
      .to(panels[0], { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.3, ease: "back.out(1.6)" })
      .to(bubbles.slice(0, 2), { autoAlpha: 1, scale: 1, duration: 0.2, stagger: 0.1, ease: "back.out(2)" }, "-=0.05")
      .to(openingSfx, { autoAlpha: 1, scale: 1, rotation: -8, duration: 0.2, ease: "back.out(2)" }, "<")
      .to(openingSfx, { autoAlpha: 0, scale: 0.7, duration: 0.2, delay: 0.35 })
      .to(panels[1], { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.3, ease: "back.out(1.6)" }, ">")
      .to(bubbles[2], { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, "-=0.05")
      .to(labels[1], { autoAlpha: 1, x: 0, duration: 0.32, ease: "power2.out" }, ">")
      .to(panels[2], { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.3, ease: "back.out(1.6)" }, ">")
      .to(bubbles.slice(3, 5), { autoAlpha: 1, scale: 1, duration: 0.2, stagger: 0.1, ease: "back.out(2)" }, "-=0.05")
      .to(panelThreeStudent, { keyframes: [{ x: -3 }, { x: 3 }, { x: -2 }, { x: 0 }], duration: 0.28, ease: "none" }, "<")
      .to(panels[3], { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.3, ease: "back.out(1.6)" }, ">")
      .to(bubbles[5], { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, "-=0.05")
      .to(sweat, { y: 18, duration: 0.75, ease: "power1.in" }, "<")
      .to(panels[4], { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.3, ease: "back.out(1.5)" }, ">")
      .to(bubbles[6], { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, "<")
      .to(endingArt, { opacity: 0.45, duration: 0.12 }, "<")
      .to(endingArt, { opacity: 1, duration: 0.16 })
      .to(screenCopy, { duration: 0.08, onStart: () => { screenCopy.textContent = MANGA_TEXT.accuracyFinal; }, repeat: 3, yoyo: true, keyframes: [{ opacity: 0.25, x: -2 }, { opacity: 1, x: 2 }] }, "<")
      .to(shadowFigure, { autoAlpha: 1, duration: 0.45, ease: "power1.in" }, ">")
      .to(sfx, { autoAlpha: 1, scale: 1, rotation: 5, duration: 0.24, ease: "back.out(2)" }, "<");
  }

  function initBonusPuzzle(unlockBonus) {
    const placedTiles = Array(BONUS_CHAPTER.word.length).fill(null);
    const tileButtons = [];
    const slotButtons = [];
    let solved = false;
    let isResetting = false;
    let pointerDrag = null;
    let suppressTileClick = null;

    bonusChapter.querySelector(".bonus-clue").textContent = BONUS_CHAPTER.clue;

    BONUS_CHAPTER.scrambled.forEach((letter, index) => {
      const tile = document.createElement("button");
      tile.className = "bonus-tile";
      tile.type = "button";
      tile.draggable = false;
      tile.textContent = letter;
      tile.setAttribute("aria-label", `Letter ${letter}, tile ${index + 1}`);
      tile.dataset.tileIndex = String(index);
      bonusTileRack.append(tile);
      tileButtons.push(tile);
    });

    BONUS_CHAPTER.word.split("").forEach((_, index) => {
      const slot = document.createElement("button");
      slot.className = "bonus-slot";
      slot.type = "button";
      slot.setAttribute("aria-label", `Slot ${index + 1}, empty`);
      slot.dataset.slotIndex = String(index);
      bonusSlots.append(slot);
      slotButtons.push(slot);
    });

    function announce(message) {
      bonusStatus.textContent = message;
    }

    function renderPuzzle() {
      placedTiles.forEach((tileIndex, slotIndex) => {
        const slot = slotButtons[slotIndex];
        const tile = tileIndex === null ? null : tileButtons[tileIndex];
        slot.textContent = tile ? tile.textContent : "";
        slot.classList.toggle("is-filled", Boolean(tile));
        slot.setAttribute("aria-label", tile
          ? `Slot ${slotIndex + 1}, letter ${tile.textContent}. Activate to return it`
          : `Slot ${slotIndex + 1}, empty`);
      });

      tileButtons.forEach((tile, index) => {
        const slotIndex = placedTiles.indexOf(index);
        const isPlaced = slotIndex !== -1;
        tile.classList.toggle("is-placed", isPlaced);
        tile.setAttribute("aria-pressed", String(isPlaced));
        tile.setAttribute("aria-label", isPlaced
          ? `Letter ${tile.textContent}, placed in slot ${slotIndex + 1}`
          : `Letter ${tile.textContent}, tile ${index + 1}`);
      });
    }

    function currentWord() {
      return placedTiles.map((tileIndex) => tileIndex === null ? "" : tileButtons[tileIndex].textContent).join("");
    }

    function clearPuzzle() {
      placedTiles.fill(null);
      renderPuzzle();
    }

    function checkPuzzle() {
      if (placedTiles.some((tileIndex) => tileIndex === null)) return;
      if (currentWord() === BONUS_CHAPTER.word) {
        solved = true;
        renderPuzzle();
        announce("Case solved. The bonus chapter is opening.");
        if (!reduceMotion && window.gsap) {
          gsap.to(tileButtons, {
            y: -8,
            rotation: (index) => index % 2 ? 7 : -7,
            scale: 1.08,
            duration: 0.2,
            stagger: 0.035,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              bonusLock.classList.add("is-unlocked");
              bonusLock.setAttribute("aria-label", "Unlocked padlock");
              window.setTimeout(unlockBonus, 250);
            },
          });
        } else {
          bonusLock.classList.add("is-unlocked");
          bonusLock.setAttribute("aria-label", "Unlocked padlock");
          unlockBonus();
        }
        return;
      }

      announce("Not quite. The letters are being reset.");
      const reset = () => {
        clearPuzzle();
        isResetting = false;
        announce("Letters cleared. Try another arrangement.");
      };
      if (!reduceMotion && window.gsap) {
        isResetting = true;
        gsap.to(bonusSlots, {
          keyframes: [{ x: -8 }, { x: 8 }, { x: -5 }, { x: 0 }],
          duration: 0.28,
          onComplete: reset,
        });
      } else {
        reset();
      }
    }

    function placeTile(tileIndex, preferredSlot = null) {
      if (solved || isResetting || placedTiles.includes(tileIndex)) return;
      const slotIndex = preferredSlot !== null && placedTiles[preferredSlot] === null
        ? preferredSlot
        : placedTiles.indexOf(null);
      if (slotIndex === -1) return;
      placedTiles[slotIndex] = tileIndex;
      renderPuzzle();
      announce(`Placed ${tileButtons[tileIndex].textContent} in slot ${slotIndex + 1}. ${placedTiles.filter((tile) => tile !== null).length} of ${placedTiles.length} letters placed.`);
      checkPuzzle();
    }

    tileButtons.forEach((tile, index) => {
      tile.addEventListener("click", () => {
        if (suppressTileClick === index) {
          suppressTileClick = null;
          return;
        }
        const existingSlot = placedTiles.indexOf(index);
        if (existingSlot !== -1) {
          placedTiles[existingSlot] = null;
          renderPuzzle();
          announce(`Returned ${tile.textContent} to the letter tiles.`);
          return;
        }
        placeTile(index);
      });
      tile.addEventListener("pointerdown", (event) => {
        if (isMobile || event.pointerType !== "mouse" || event.button !== 0 || solved || isResetting) return;
        pointerDrag = { tileIndex: index, startX: event.clientX, startY: event.clientY, active: false };
      });
    });

    document.addEventListener("pointermove", (event) => {
      if (!pointerDrag) return;
      if (!pointerDrag.active && Math.hypot(event.clientX - pointerDrag.startX, event.clientY - pointerDrag.startY) > 8) {
        pointerDrag.active = true;
        tileButtons[pointerDrag.tileIndex].classList.add("is-dragging");
      }
      if (pointerDrag.active) event.preventDefault();
    }, { passive: false });

    document.addEventListener("pointerup", (event) => {
      if (!pointerDrag) return;
      const drag = pointerDrag;
      pointerDrag = null;
      tileButtons[drag.tileIndex].classList.remove("is-dragging");
      if (!drag.active) return;
      suppressTileClick = drag.tileIndex;
      window.setTimeout(() => {
        suppressTileClick = null;
      }, 0);
      const target = event.target instanceof Element ? event.target.closest(".bonus-slot") : null;
      if (target && bonusSlots.contains(target)) placeTile(drag.tileIndex, Number(target.dataset.slotIndex));
    });

    document.addEventListener("pointercancel", () => {
      if (!pointerDrag) return;
      tileButtons[pointerDrag.tileIndex].classList.remove("is-dragging");
      pointerDrag = null;
    });

    slotButtons.forEach((slot, index) => {
      slot.addEventListener("click", () => {
        const tileIndex = placedTiles[index];
        if (tileIndex === null) return;
        placedTiles[index] = null;
        renderPuzzle();
        announce(`Returned ${tileButtons[tileIndex].textContent} from slot ${index + 1}.`);
        tileButtons[tileIndex].focus();
      });
    });

    bonusHint.addEventListener("click", () => {
      if (solved) return;
      const targetIndex = placedTiles.findIndex((tileIndex, index) => (
        tileIndex === null || tileButtons[tileIndex].textContent !== BONUS_CHAPTER.word[index]
      ));
      if (targetIndex === -1) return;
      const correctTile = tileButtons.findIndex((tile, index) => (
        tile.textContent === BONUS_CHAPTER.word[targetIndex]
      ));
      const sourceIndex = placedTiles.indexOf(correctTile);
      if (sourceIndex !== -1) placedTiles[sourceIndex] = placedTiles[targetIndex];
      placedTiles[targetIndex] = correctTile;
      renderPuzzle();
      announce(`Hint: ${BONUS_CHAPTER.word[targetIndex]} belongs in slot ${targetIndex + 1}.`);
      checkPuzzle();
    });

    const revealHint = () => {
      if (!bonusHint.hidden || solved) return;
      bonusHint.hidden = false;
      announce("A hint is available.");
    };
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        window.setTimeout(revealHint, BONUS_CHAPTER.hintDelay);
      }, { threshold: 0.25 });
      observer.observe(bonusChapter);
    } else {
      window.setTimeout(revealHint, BONUS_CHAPTER.hintDelay);
    }
    renderPuzzle();
  }

  function initThemeToggle() {
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)");
    const setTheme = (theme) => {
      document.documentElement.dataset.theme = theme;
      themeToggle.setAttribute("aria-pressed", String(theme === "light"));
      themeToggle.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} theme`);
      document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    };

    setTheme(systemTheme.matches ? "light" : "dark");
    themeToggle.addEventListener("click", (event) => {
      const currentTheme = document.documentElement.dataset.theme || "dark";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      if (reduceMotion || !window.gsap) {
        setTheme(nextTheme);
        return;
      }

      const wipe = document.createElement("div");
      wipe.className = "theme-wipe";
      wipe.style.background = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
      document.body.append(wipe);
      setTheme(nextTheme);
      const x = event.clientX || window.innerWidth - 38;
      const y = event.clientY || 100;
      const radius = Math.hypot(window.innerWidth, window.innerHeight);
      gsap.fromTo(wipe, { clipPath: `circle(0px at ${x}px ${y}px)` }, {
        clipPath: `circle(${radius}px at ${x}px ${y}px)`,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => wipe.remove(),
      });
    });
  }

  function initParallax() {
    if (isMobile) return;
    const cutouts = document.querySelectorAll(".cutout");
    window.addEventListener("mousemove", (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      cutouts.forEach((image, index) => {
        const depth = (index + 1) * 5;
        gsap.to(image, { x: x * depth, y: y * depth, duration: 0.6, overwrite: "auto", ease: "power2.out" });
      });
    }, { passive: true });
  }

  function initCursor() {
    if (isMobile) return;
    let pointerX = -100;
    let pointerY = -100;
    let ringX = pointerX;
    let ringY = pointerY;

    document.addEventListener("mousemove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
      gsap.set(cursorDot, { x: pointerX - 2.5, y: pointerY - 2.5 });
    });

    gsap.ticker.add(() => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      gsap.set(cursorRing, { x: ringX - 13, y: ringY - 13 });
    });

    document.querySelectorAll("a, button, .interest-card, .skill-pin").forEach((element) => {
      element.addEventListener("mouseenter", () => cursorRing.classList.add("is-hover"));
      element.addEventListener("mouseleave", () => cursorRing.classList.remove("is-hover"));
    });
  }

  function initCursorGlow() {
    if (reduceMotion || !window.gsap) return;

    const desktopPointer = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)");
    let glowLayer = null;
    let glow = null;
    let moveHandler = null;
    let moveX = null;
    let moveY = null;

    const disable = () => {
      if (!glowLayer) return;
      window.removeEventListener("mousemove", moveHandler);
      moveX.tween.kill();
      moveY.tween.kill();
      glowLayer.remove();
      glowLayer = null;
      glow = null;
      moveHandler = null;
      moveX = null;
      moveY = null;
    };

    const enable = () => {
      if (glowLayer) return;

      glowLayer = document.createElement("div");
      glowLayer.className = "cursor-glow-layer";
      glowLayer.setAttribute("aria-hidden", "true");
      glow = document.createElement("span");
      glow.className = "cursor-glow";
      glowLayer.append(glow);
      document.body.append(glowLayer);

      gsap.set(glow, { xPercent: -50, yPercent: -50, x: -1000, y: -1000 });
      moveX = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
      moveY = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });
      moveHandler = (event) => {
        moveX(event.clientX);
        moveY(event.clientY);
      };
      window.addEventListener("mousemove", moveHandler, { passive: true });
    };

    const syncPointerMode = () => {
      if (desktopPointer.matches) enable();
      else disable();
    };

    syncPointerMode();
    desktopPointer.addEventListener("change", syncPointerMode);
  }

  function initSoundEffects() {
    gsap.utils.toArray(".chapter:not(.hero)").forEach((chapter, index) => {
      ScrollTrigger.create({
        trigger: chapter,
        start: "top 52%",
        once: true,
        onEnter: () => {
          soundEffect.textContent = index % 2 === 0 ? "WHOOSH" : "POW!";
          gsap.fromTo(soundEffect, { autoAlpha: 0, scale: 0.35, rotation: -16 }, {
            autoAlpha: 1,
            scale: 1,
            rotation: -8,
            duration: 0.22,
            yoyo: true,
            repeat: 1,
            repeatDelay: 0.28,
            onComplete: () => gsap.set(soundEffect, { autoAlpha: 0 }),
          });
        },
      });
    });
  }

  function initScrollAnimations() {
    if (!window.gsap || !window.ScrollTrigger) {
      hideLoader();
      setFinalCounters();
      showStaticStamps();
      initNativeChapterRail(chapterRail.chapters || []);
      document.querySelectorAll(".reveal-section").forEach((section) => section.classList.add("fallback-visible"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    initScrollProgressTrigger(chapterRail.chapters || []);
    if (reduceMotion) {
      hideLoader();
      setFinalCounters();
      showStaticStamps();
      gsap.set([".reveal-section", ".cutout"], { clearProps: "all" });
      return;
    }

    animateHero();
    animateCounters();
    animatePanels();
    animateStamps();
    animateSections();
    initParallax();
    initCursor();
    initCursorGlow();
    initSoundEffects();
  }

  initNavigation();
  initMarquee();
  initChapterRail();
  initProgress();
  initThemeToggle();
  initSecretChapter();
  initClickEffects();
  window.addEventListener("load", () => {
    initScrollAnimations();
  }, { once: true });
  window.setTimeout(hideLoader, 2300);
})();
