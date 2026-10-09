// Future Innovation Hub interactions
// Contact form opens the visitor's email app; it does not send automatically.
const CONTACT_EMAIL = "Agentfrankavila@gmail.com";

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// Contact form
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const replyEmail = String(data.get("email") || "").trim();
    const subjectText = String(data.get("subject") || "Website enquiry").trim();
    const messageText = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(
      `Name: ${name}\nReply email: ${replyEmail}\n\nMessage:\n${messageText}`
    );

    if (contactStatus) {
      contactStatus.textContent =
        "Opening your email app. Review the message and press Send to email us.";
    }

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
}

// Newsletter demo: saves the address in this browser only.
// It does not send email or create a real mailing list.
const newsletterForm = document.getElementById("newsletterForm");
const newsletterStatus = document.getElementById("newsletterStatus");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("subscribeEmail");
    if (!emailInput) return;

    const email = emailInput.value.trim().toLowerCase();
    if (!emailInput.reportValidity() || !email) return;

    try {
      const key = "fih_demo_subscribers";
      const list = JSON.parse(localStorage.getItem(key) || "[]");

      if (!list.includes(email)) list.push(email);
      localStorage.setItem(key, JSON.stringify(list));

      if (newsletterStatus) {
        newsletterStatus.textContent =
          "Saved in this browser only. This demo does not subscribe you to email updates.";
      }
      newsletterForm.reset();
    } catch (error) {
      if (newsletterStatus) {
        newsletterStatus.textContent =
          "Browser storage is unavailable. No subscription was sent.";
      }
    }
  });
}


