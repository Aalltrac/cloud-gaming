import Lenis from "lenis";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

const discordUrl = "https://discord.gg/nvzwpvXC6F";
["copyDiscord", "copyDiscordFooter"].forEach(id => {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(discordUrl);
      btn.textContent = "Lien copié ✓";
      setTimeout(() => (btn.textContent = "Copier l'invite Discord"), 1600);
    } catch {
      window.open(discordUrl, "_blank", "noopener");
    }
  });
});

const lenis = new Lenis({ smoothWheel: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

const header = document.querySelector('.site-header');
function onScroll(){ if(header) header.classList.toggle('scrolled', window.scrollY > 4); }
window.addEventListener('scroll', onScroll); onScroll();

const revealables = document.querySelectorAll(".section .section-head, .card, .steps li, .accordion details");
revealables.forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.12 });
revealables.forEach(el => io.observe(el));

const games = [
  "Grand Theft Auto V Legacy",
  "Forza Horizon 5",
  "Among Us",
  "Demon Slayer -Kimetsu no Yaiba- The Hinokami Chronicles",
  "PC Building Simulator",
  "Beat Saber",
  "Watch_Dogs 2",
  "Euro Truck Simulator 2",
  "NARUTO SHIPPUDEN: Ultimate Ninja STORM 4",
  "Need for Speed™ Heat",
  "Attack on Titan / A.O.T. Wings of Freedom",
  "Wallpaper Engine",
  "FIFA 22",
  "Cyberpunk 2077",
  "Marvel's Spider-Man: Miles Morales",
  "Phasmophobia",
  "Garry's Mod",
  "Kingdom Two Crowns",
  "Swing Dunk",
  "Assetto Corsa",
  "STAR WARS Jedi: Fallen Order™",
  "STAR WARS™: Squadrons",
  "Escape the Backrooms",
  "BLACK CLOVER: QUARTET KNIGHTS",
  "Zup! Zero",
  "Grand Theft Auto V Enhanced",
  "Last Room",
  "Star Merchant",
  "ARK: Survival Of The Fittest",
  "ARK: Survival Evolved",
  "RACE 07: Andy Priaulx Crowne Plaza Raceway"
];

const gameListEl = document.getElementById("gameList");
const showMoreBtn = document.getElementById("showMore");
const searchEl = document.getElementById("gameSearch");

let visibleCount = 12;
let currentQuery = "";

function renderGames() {
  if (!gameListEl) return;
  const filtered = games.filter(g => g.toLowerCase().includes(currentQuery));
  gameListEl.innerHTML = filtered.map(g => `<div class="game-card"><h4>${g}</h4></div>`).join("");
  if (showMoreBtn) showMoreBtn.style.display = "none";
}

if (gameListEl && showMoreBtn) {
  renderGames();
  showMoreBtn.addEventListener("click", () => {
    visibleCount += 12;
    renderGames();
  });
}
if (searchEl) {
  searchEl.addEventListener("input", (e) => {
    currentQuery = e.target.value.trim().toLowerCase();
    visibleCount = 12;
    renderGames();
  });
}