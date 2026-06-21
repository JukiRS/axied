// Клик по названию сайта в шапке ведёт на главную страницу
(function () {
  function wire() {
    var title = document.querySelector('.md-header__title');
    var logo = document.querySelector('.md-header a.md-logo');
    if (!title || !logo) return;
    title.style.cursor = 'pointer';
    if (title.dataset.homeWired) return;
    title.dataset.homeWired = '1';
    title.addEventListener('click', function () {
      window.location.href = logo.getAttribute('href');
    });
  }
  document.addEventListener('DOMContentLoaded', wire);
  wire();
})();

// Плавное появление элементов главной страницы (reveal on scroll)
(function () {
  function reveal() {
    // только на главной (есть hero-блок)
    if (!document.querySelector('.bh-hero')) return;

    var groups = [
      ['.bh-hero-logo, .bh-badge, .bh-hero h1, .bh-sub, .bh-hero .md-button', 90],
      ['.md-content h2', 0],
      ['.bh-staff', 80],
      ['.bh-steps li', 90]
    ];

    var targets = [];
    groups.forEach(function (g) {
      var list = document.querySelectorAll(g[0]);
      list.forEach(function (el, i) {
        if (el.dataset.bhReveal) return;
        el.dataset.bhReveal = '1';
        el.classList.add('bh-reveal');
        el.style.transitionDelay = (i * g[1]) + 'ms';
        targets.push(el);
      });
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('bh-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('bh-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { io.observe(el); });

    // страховка: показать всё, если что-то пойдёт не так
    setTimeout(function () {
      targets.forEach(function (el) { el.classList.add('bh-in'); });
    }, 2500);
  }

  // Material instant-navigation: переинициализация на каждой загрузке
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(reveal);
  } else {
    document.addEventListener('DOMContentLoaded', reveal);
    reveal();
  }
})();
