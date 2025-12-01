// Mobile menu toggle
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => { menu.classList.toggle('hidden'); });

// Scroll animations
const faders = document.querySelectorAll('.fade-up, .service-card');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Background gradient change on scroll
const sections = document.querySelectorAll('section[data-bg]');
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + window.innerHeight / 3;
  sections.forEach(sec => {
    if(scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      document.body.style.background = sec.dataset.bg;
    }
  });
});

// Reviews Slider
const slider = document.getElementById('reviews-slider');
const prevBtn = document.getElementById('prev-review');
const nextBtn = document.getElementById('next-review');
let scrollAmount = 0;
const cardWidth = 306; // card width + gap (300px + 6px gap)

nextBtn.addEventListener('click', () => {
  if(scrollAmount < slider.scrollWidth - slider.clientWidth){
    scrollAmount += cardWidth;
    slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }
});

prevBtn.addEventListener('click', () => {
  if(scrollAmount > 0){
    scrollAmount -= cardWidth;
    slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }
});

// Optional: Auto-scroll slider every 5 seconds
setInterval(() => {
  if(scrollAmount >= slider.scrollWidth - slider.clientWidth){
    scrollAmount = 0;
  } else {
    scrollAmount += cardWidth;
  }
  slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}, 5000);
