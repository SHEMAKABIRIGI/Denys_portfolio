// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMobileMenu() {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
}

// Open / close mobile menu

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuToggle.innerHTML = `<i class="fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}" aria-hidden="true"></i>`;
});

navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.querySelector("a.active")?.classList.remove("active");
        link.classList.add("active");
        closeMobileMenu();

    });

});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("active")) {
        closeMobileMenu();
        menuToggle.focus();
    }
});

// Scroll progress and back-to-top button

const pageProgress = document.querySelector(".page-progress");
const backToTop = document.getElementById("backToTop");
const navigationLinks = [...document.querySelectorAll(".nav-links a[href^=\"#\"]")];
const pageSections = [...document.querySelectorAll("main section[id]")];
const revealTargets = document.querySelectorAll(
    ".section-header, .about-content, .highlight-card, .skills-category, .skills-note, " +
    ".project-card, .service-card, .process-step, .education-item, .learning-journey, .contact-content"
);
let scrollUpdatePending = false;

function updateScrollUI() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

    pageProgress?.style.setProperty("--scroll-progress", String(Math.min(progress, 1)));
    backToTop?.classList.toggle("show", window.scrollY > 500);

    const activeLine = window.innerHeight * 0.42;
    let activeSection = pageSections[0];

    pageSections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activeLine) {
            activeSection = section;
        }
    });

    navigationLinks.forEach((link) => {
        const isCurrent = link.hash === `#${activeSection?.id}`;
        link.classList.toggle("active", isCurrent);
        if (isCurrent) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    revealTargets.forEach((element) => {
        if (!element.classList.contains("scroll-reveal") || element.classList.contains("is-visible")) {
            return;
        }

        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            element.classList.add("is-visible");
        }
    });

    scrollUpdatePending = false;
}

function requestScrollUIUpdate() {
    if (!scrollUpdatePending) {
        scrollUpdatePending = true;
        window.setTimeout(updateScrollUI, 50);
    }
}

window.addEventListener("scroll", requestScrollUIUpdate, { passive: true });
window.addEventListener("resize", requestScrollUIUpdate);

// Reveal content as it enters the viewport; leave it visible for reduced motion.

if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    const revealDelays = new Map();
    revealTargets.forEach((element) => {
        const parent = element.parentElement;
        const index = revealDelays.get(parent) || 0;
        element.classList.add("scroll-reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 75}ms`);
        revealDelays.set(parent, index + 1);
        revealObserver.observe(element);
    });
}

updateScrollUI();

const currentYear = document.getElementById("currentYear");
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}
// =========================================
// HERO TYPING ANIMATION
// =========================================

const typingText = document.querySelector(".typing-text");

const roles = [
    "Full-Stack Developer",
    "Web Developer",
    "Software Developer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeRole() {

    if (reduceMotion) {
        typingText.textContent = roles[0];
        return;
    }

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeRole, 1800);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex === roles.length) {
                roleIndex = 0;
            }

        }
    }

    const speed = deleting ? 50 : 90;

    setTimeout(typeRole, speed);
}


typeRole();