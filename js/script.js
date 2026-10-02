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

/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();


        if (!name || !email || !subject || !message) {

            formNote.textContent =
                "Please complete all fields.";

            formNote.style.color = "#ff7b7b";

            return;
        }


        formNote.textContent =
            "Your message has been prepared. Email sending will be connected later.";

        formNote.style.color = "#00aeff";


        contactForm.reset();

    });

}