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

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const submitLabel = submitButton.querySelector(".contact-submit-label");


        if (!name || !email || !subject || !message) {

            formNote.textContent =
                "Please complete all fields.";

            formNote.style.color = "#ff7b7b";

            return;
        }

        submitButton.disabled = true;
        submitLabel.textContent = "Sending...";
        formNote.textContent = "Sending your message...";
        formNote.style.color = "#00aeff";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ name, email, subject, message })
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Your message could not be sent. Please try again.");
            }

            formNote.textContent = result.message;
            formNote.style.color = "#00aeff";
            contactForm.reset();
        } catch (error) {
            formNote.textContent =
                error.message || "Unable to send your message. Please try again.";
            formNote.style.color = "#ff7b7b";
        } finally {
            submitButton.disabled = false;
            submitLabel.textContent = "Send Message";
        }

    });

}