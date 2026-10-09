// Future Innovation Hub interactions.
// IMPORTANT: Set CONTACT_EMAIL to an inbox you control before publishing.
const CONTACT_EMAIL = "Agentfrankavila@gmail.com";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));
}

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    
      
      
    }
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(String(data.get("subject") || "Website enquiry"));
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nReply email: ${data.get("email")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    contactStatus.textContent = "Your email app should open with the message prepared. Please review and send it there.";
  });
}

const newsletterForm = document.getElementById("newsletterForm");
const newsletterStatus = document.getElementById("newsletterStatus");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();
    const emailInput = document.getElementById("subscribeEmail");
    const email = emailInput.value.trim().toLowerCase();
    if (!email) return;
    try {
      const list = JSON.parse(localStorage.getItem("fih_demo_subscribers") || "[]");
      if (!list.includes(email)) list.push(email);
      localStorage.setItem("fih_demo_subscribers", JSON.stringify(list));
      newsletterStatus.textContent = "Saved in this browser only. This is a demo and does not subscribe you to email updates.";
      newsletterForm.reset();
    } catch {
      newsletterStatus.textContent = "Browser storage is unavailable. No subscription was sent.";
    }
  });
}
