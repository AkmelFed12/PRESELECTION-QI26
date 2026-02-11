const contactForm = document.getElementById('contactForm');
const contactMsg = document.getElementById('contactMsg');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!contactMsg) return;
  contactMsg.textContent = '';

  const payload = Object.fromEntries(new FormData(contactForm).entries());
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    contactMsg.textContent = data.message || 'Message envoyé.';
    if (res.ok) {
      contactForm.reset();
    }
  } catch (err) {
    contactMsg.textContent = 'Erreur réseau. Réessayez.';
  }
});
