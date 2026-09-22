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

if (video && toggle) {
  const setToggleLabel = () => {
    toggle.textContent = video.paused ? '▶' : '❚❚';
  };

  toggle.addEventListener('click', () => {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });

  video.addEventListener('play', setToggleLabel);
  video.addEventListener('pause', setToggleLabel);
  setToggleLabel();

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 });
    videoObserver.observe(video);
  }
}
