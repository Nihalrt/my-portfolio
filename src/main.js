import "./style.css";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
document.documentElement.classList.add("js");
$("#year").textContent = new Date().getFullYear();

const reveals = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        reveals.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);
$$(".reveal").forEach((element) => reveals.observe(element));

const menu = $(".menu-button");
const nav = $(".header nav");
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  nav.classList.toggle("open", open);
});
$$("a", nav).forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation");
  }),
);
addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation");
  }
});
addEventListener(
  "scroll",
  () => {
    const range = document.documentElement.scrollHeight - innerHeight;
    $(".page-progress").style.width =
      `${range > 0 ? (scrollY / range) * 100 : 0}%`;
  },
  { passive: true },
);

$$(".filter").forEach((button) =>
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    $$(".filter").forEach((b) => {
      const active = b === button;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    let visible = 0;
    $$(".project").forEach((project) => {
      const show =
        filter === "all" ||
        project.dataset.category.split(" ").includes(filter);
      project.hidden = !show;
      if (show) {
        visible++;
        project.classList.add("is-visible");
      }
    });
    $(".project-count").textContent =
      `${String(visible).padStart(2, "0")} PROJECT${visible === 1 ? "" : "S"}`;
    $(".filter-empty").hidden = visible !== 0;
  }),
);

// Fixed buckets make the interaction stable as the rollout increases/decreases.
// This is a small illustrative simulation, not a live connection to Switchboard.
const deviceGrid = $("#device-grid");
const deviceOrder = Array.from(
  { length: 100 },
  (_, i) => ((i * 37 + 17) % 100) + 1,
);
deviceOrder.forEach((bucket) => {
  const device = document.createElement("span");
  device.className = "device";
  device.dataset.bucket = bucket;
  deviceGrid.append(device);
});
function updateRollout() {
  const value = Number($("#rollout").value);
  $("#rollout-value").textContent = `${value}%`;
  $$(".device", deviceGrid).forEach((device) => {
    const enabled = Number(device.dataset.bucket) <= value;
    device.classList.toggle(
      "newly-enabled",
      enabled && !device.classList.contains("enabled"),
    );
    device.classList.toggle("enabled", enabled);
  });
}
$("#rollout").addEventListener("input", updateRollout);
updateRollout();

const cases = {
  fraud: {
    title: "Real-Time Fraud Detection",
    intro:
      "A project exploring how data pipelines and machine learning can help identify suspicious transactions.",
    build: [
      "Built a streaming pipeline to process transactions and generate fraud alerts.",
      "Added persistent alert storage and a dashboard to make results easier to review.",
      "Brought together data engineering, machine learning, and application development.",
    ],
    tools: ["Python", "Kafka", "PySpark", "PostgreSQL", "Streamlit"],
    links: [
      [
        "View source code",
        "https://github.com/Nihalrt/Realtime-Fraud-Detection-With-MLOps",
      ],
    ],
  },
  lucent: {
    title: "Lucent",
    intro:
      "An AI-powered workspace for capturing ideas and turning them into useful, organized notes.",
    build: [
      "Built a shared web and mobile interface for typed and handwritten notes.",
      "Added AI summaries, action items, topic tags, and related-note search.",
      "Connected the app to a Python backend and PostgreSQL storage.",
    ],
    tools: ["React Native", "Expo", "FastAPI", "Gemini", "PostgreSQL"],
    note: "The live app is a public demo. Please use sample notes.",
    links: [
      ["Open the app", "https://nihalrt.github.io/agent-notes/"],
      ["View source code", "https://github.com/Nihalrt/agent-notes"],
    ],
  },
  switchboard: {
    title: "Switchboard",
    intro:
      "A prototype exploring how automated analysis can support more informed feature-release decisions.",
    build: [
      "Built a routing service to introduce new features to selected groups of devices.",
      "Added agents that review failures and recommend a rollback or further investigation.",
      "Used simulated events to explore how different features might affect one another.",
    ],
    tools: ["Go", "Python", "FastAPI", "Redis", "PostgreSQL"],
    links: [["View source code", "https://github.com/Nihalrt/switchboard"]],
  },
};
const dialog = $("#case-dialog");
let lastTrigger;
function closeCase() {
  dialog.close();
  document.body.style.overflow = "";
  lastTrigger?.focus();
}
$$("[data-case]").forEach((button) =>
  button.addEventListener("click", () => {
    const data = cases[button.dataset.case];
    lastTrigger = button;
    $("#case-content").innerHTML =
      `<h2 id="case-title">${data.title}</h2><p class="case-intro">${data.intro}</p><h3>MY CONTRIBUTION</h3><ul>${data.build.map((item) => `<li>${item}</li>`).join("")}</ul><h3>BUILT WITH</h3><div class="tags">${data.tools.map((tool) => `<span>${tool}</span>`).join("")}</div>${data.note ? `<p class="case-note">${data.note}</p>` : ""}<div class="case-links">${data.links.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener">${label} ↗</a>`).join("")}</div>`;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = "hidden";
    $("#close-case").focus();
  }),
);
$("#close-case").addEventListener("click", closeCase);
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeCase();
});
dialog.addEventListener("click", (event) => {
  const r = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom)
  )
    closeCase();
});

$("#copy-email").addEventListener("click", async () => {
  const status = $("#copy-status");
  try {
    await navigator.clipboard.writeText("sainihaldiddi2002@gmail.com");
    status.textContent = "Email address copied.";
  } catch {
    status.textContent = "sainihaldiddi2002@gmail.com — select to copy";
  }
  setTimeout(() => {
    status.textContent = "";
  }, 5000);
});

// GitHub's public endpoint requires no secret. All content remains available if it fails.
async function loadGithub() {
  const key = "nihal-github-v1";
  try {
    let cached;
    try {
      cached = JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      /* Storage is optional. */
    }
    let data =
      cached && Date.now() - cached.time < 3600000 ? cached.data : null;
    if (!data) {
      const response = await fetch("https://api.github.com/users/Nihalrt", {
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) return;
      data = await response.json();
      try {
        localStorage.setItem(key, JSON.stringify({ time: Date.now(), data }));
      } catch {
        /* Private browsing may disallow storage. */
      }
    }
    if (Number.isInteger(data.public_repos))
      $("#github-status").textContent =
        `${data.public_repos} PUBLIC REPOSITORIES · EXPLORE ON GITHUB`;
  } catch {
    /* Graceful static profile link fallback. */
  }
}
loadGithub();

// Defer WebGL so the content and all navigation work independently of the 3D scene.
const sceneElement = $("#scene");
let motionPaused = reducedMotion.matches;
function setMotionButton() {
  $("#motion-toggle").setAttribute("aria-pressed", String(motionPaused));
  $("#motion-toggle").setAttribute(
    "aria-label",
    motionPaused ? "Resume 3D animation" : "Pause 3D animation",
  );
  $("#motion-toggle").innerHTML =
    `${motionPaused ? "Resume motion" : "Pause motion"} <span>${motionPaused ? "▷" : "Ⅱ"}</span>`;
}
setMotionButton();
import("./scene.js")
  .then(({ createScene }) => {
    const scene = createScene(sceneElement, { paused: motionPaused });
    $("#motion-toggle").addEventListener("click", () => {
      motionPaused = !motionPaused;
      scene.setPaused(motionPaused);
      setMotionButton();
    });
    reducedMotion.addEventListener("change", (event) => {
      motionPaused = event.matches;
      scene.setPaused(motionPaused);
      setMotionButton();
    });
  })
  .catch(() => {
    $("#motion-toggle").hidden = true;
  });
