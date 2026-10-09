const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('subscribeForm').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('subscribeEmail').value.trim();
  const message = document.getElementById('subscribeMessage');
  if (!email) return;
  const entries = JSON.parse(localStorage.getItem('futureInnovationDemoSubscribers') || '[]');
  if (!entries.includes(email)) entries.push(email);
  localStorage.setItem('futureInnovationDemoSubscribers', JSON.stringify(entries));
  message.textContent = 'Thanks! This demo saved your address in this browser only.';
  event.target.reset();
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const body = `From: ${name} (${email})%0D%0A%0D%0A${encodeURIComponent(message)}`;
  document.getElementById('contactStatus').textContent = 'Opening your email app to send the message…';
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
});


// This is only a front-end sign-in preview. Never store real passwords in browser storage.
const accountForm = document.getElementById('accountForm');
if (accountForm) {
  accountForm.addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('accountStatus').textContent =
      'Preview only: connect a secure authentication provider before enabling real accounts. No password was saved.';
    accountForm.reset();
  });
}
