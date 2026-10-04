// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


// Open / close mobile menu

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.querySelector("a.active")?.classList.remove("active");
        link.classList.add("active");
        navLinks.classList.remove("active");

    });

});
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


function typeRole() {

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