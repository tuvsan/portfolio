document.documentElement.classList.add('js');

const revealEls = document.querySelectorAll('.reveal:not(.hero-stage)');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

const video = document.querySelector('.phone-video');
const toggle = document.querySelector('.phone-play-toggle');
const phoneFrame = document.querySelector('.phone-frame');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (video && toggle && phoneFrame) {
  let userPaused = false;

  const syncUi = () => {
    const isPaused = video.paused;
    toggle.textContent = isPaused ? '▶' : '❚❚';
    toggle.setAttribute('aria-label', isPaused ? 'Spela video' : 'Pausa video');
    phoneFrame.classList.toggle('is-paused', isPaused);
  };

  const play = () => video.play().catch(() => {});

  const userToggle = () => {
    if (video.paused) {
      userPaused = false;
      video.muted = false; // safe here: this only runs from a real click, so it isn't blocked by autoplay-with-sound policies
      play();
    } else {
      userPaused = true;
      video.pause();
    }
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    userToggle();
  });

  phoneFrame.addEventListener('click', userToggle);

  video.addEventListener('play', syncUi);
  video.addEventListener('pause', syncUi);
  syncUi();

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!userPaused) play();
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 });
    videoObserver.observe(video);
  }
}
