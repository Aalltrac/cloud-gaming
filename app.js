import Lenis from "lenis";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.classList.toggle("active", open);
  });
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

const lenis = new Lenis({ smoothWheel: true });
function raf(time) { lenis.raf(time); 
requestAnimationFrame(raf); }
requestAnimationFrame(raf);

const header = document.querySelector('.site-header');
const floatingCta = document.querySelector('.floating-cta');
function onScroll(){
  if(header) header.classList.toggle('scrolled', window.scrollY > 4);
  if(floatingCta) floatingCta.classList.toggle('visible', window.scrollY > 140);
}
window.addEventListener('scroll', onScroll); onScroll();

const revealables = document.querySelectorAll(".section .section-head, .card, .steps li, .accordion details");
revealables.forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.12 });
revealables.forEach(el => io.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",(e)=>{
    const id = a.getAttribute("href");
    const target = document.querySelector(id);
    if(target){ e.preventDefault(); lenis.scrollTo(target,{offset:-64}); }
  });
});

const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const sections = [...document.querySelectorAll('main section')];
window.addEventListener('scroll', () => {
  const y = window.scrollY + 80;
  const current = sections.findLast(s => s.offsetTop <= y);
  navLinks.forEach(l => l.classList.toggle('active', current && l.getAttribute('href') === `#${current.id}`));
});