const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const prevBtn = document.querySelector('.lightbox-btn.prev');
const nextBtn = document.querySelector('.lightbox-btn.next');
const closeBtn = document.querySelector('.lightbox-close');

let galleryItems = [];
let currentIndex = 0;

function openLightbox(index, items) {
  galleryItems = items;
  currentIndex = index;
  lightboxImg.src = galleryItems[currentIndex].src;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

function showNext() {
  if (!galleryItems.length) return;
  currentIndex = (currentIndex + 1) % galleryItems.length;
  lightboxImg.src = galleryItems[currentIndex].src;
}

function showPrev() {
  if (!galleryItems.length) return;
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  lightboxImg.src = galleryItems[currentIndex].src;
}

document.querySelectorAll('.lightbox-item').forEach((img) => {
  img.addEventListener('click', () => {
    const card = img.closest('.project-card');
    const items = Array.from(card.querySelectorAll('.lightbox-item'));
    const index = items.indexOf(img);
    openLightbox(index, items);
  });
});

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);
closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});

const backTopBtn = document.getElementById('back-top-btn');

function updateBackTopVisibility() {
  if (!backTopBtn) return;
  if (window.scrollY > 240) {
    backTopBtn.classList.add('show');
  } else {
    backTopBtn.classList.remove('show');
  }
}

if (backTopBtn) {
  window.addEventListener('scroll', updateBackTopVisibility);
  updateBackTopVisibility();

  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}