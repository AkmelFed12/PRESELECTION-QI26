const galleryStatus = document.getElementById('galleryStatus');
const slideImage = document.getElementById('slideImage');
const slideVideo = document.getElementById('slideVideo');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
const toggleAutoBtn = document.getElementById('toggleAuto');
const slideCounter = document.getElementById('slideCounter');

const IMAGE_DURATION_MS = 5000;
let mediaItems = [];
let currentIndex = 0;
let autoTimer = null;
let autoEnabled = true;

function stopAutoPlay() {
  if (autoTimer) {
    clearTimeout(autoTimer);
    autoTimer = null;
  }
}

function scheduleNext() {
  stopAutoPlay();
  if (!autoEnabled || mediaItems.length <= 1) return;
  autoTimer = setTimeout(() => {
    nextSlide();
  }, IMAGE_DURATION_MS);
}

function updateCounter() {
  slideCounter.textContent = `${mediaItems.length ? currentIndex + 1 : 0} / ${mediaItems.length}`;
}

function renderSlide() {
  if (!mediaItems.length) {
    galleryStatus.textContent = 'Aucun média disponible pour le moment.';
    slideImage.classList.add('hidden');
    slideVideo.classList.add('hidden');
    updateCounter();
    stopAutoPlay();
    return;
  }

  const item = mediaItems[currentIndex];
  galleryStatus.textContent = item.name || 'Média';

  if (item.type === 'video') {
    slideImage.classList.add('hidden');
    slideImage.removeAttribute('src');
    slideVideo.classList.remove('hidden');
    slideVideo.src = item.url;
    slideVideo.load();
    const playPromise = slideVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
    stopAutoPlay();
  } else {
    slideVideo.pause();
    slideVideo.classList.add('hidden');
    slideVideo.removeAttribute('src');
    slideImage.classList.remove('hidden');
    slideImage.src = item.url;
    scheduleNext();
  }

  updateCounter();
}

function previousSlide() {
  if (!mediaItems.length) return;
  currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
  renderSlide();
}

function nextSlide() {
  if (!mediaItems.length) return;
  currentIndex = (currentIndex + 1) % mediaItems.length;
  renderSlide();
}

function toggleAutoPlay() {
  autoEnabled = !autoEnabled;
  toggleAutoBtn.textContent = autoEnabled ? 'Pause' : 'Lecture auto';
  if (autoEnabled) {
    renderSlide();
  } else {
    stopAutoPlay();
  }
}

async function loadMedia() {
  try {
    const response = await fetch('/api/public-media');
    if (!response.ok) throw new Error('Erreur de chargement');
    const data = await response.json();
    mediaItems = Array.isArray(data.items) ? data.items : [];
    currentIndex = 0;
    renderSlide();
  } catch (error) {
    galleryStatus.textContent = 'Impossible de charger la galerie.';
    showToast('Erreur de chargement de la galerie', 'error');
  }
}

slideVideo?.addEventListener('ended', () => {
  if (!autoEnabled) return;
  nextSlide();
});

prevSlideBtn?.addEventListener('click', previousSlide);
nextSlideBtn?.addEventListener('click', nextSlide);
toggleAutoBtn?.addEventListener('click', toggleAutoPlay);

loadMedia();
