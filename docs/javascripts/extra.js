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

// Плавное появление элементов главной страницы (reveal)
(function () {
  function reveal() {
    var hero = document.querySelector('.bh-hero');
    if (!hero) return; // только на главной
    document.body.classList.add('bh-home');

    // Почти вся страница: hero, заголовки, текст, кнопки, карточки, шаги
    var selectors = [
      '.bh-hero-logo',
      '.bh-badge',
      '.bh-hero h1',
      '.bh-sub',
      '.bh-hero .md-button',
      '.md-content h2',
      '.bh-staff',
      '.bh-steps li'
    ];

    var targets = [];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (el.dataset.bhReveal) return;
        el.dataset.bhReveal = '1';
        el.classList.add('bh-reveal');
        targets.push(el);
      });
    });
    if (!targets.length) return;

    // Стаггер: задержка по порядку появления
    targets.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i * 60, 600) + 'ms';
    });

    // Принудительный reflow, чтобы стартовое состояние (opacity:0) отрисовалось
    void document.body.offsetHeight;

    // показать элемент и затем убрать классы анимации,
    // чтобы они не мешали hover-эффектам (например, у карточек админов)
    function show(el) {
      if (el.dataset.bhShown) return;
      el.dataset.bhShown = '1';
      el.classList.add('bh-in');
      setTimeout(function () {
        el.classList.remove('bh-reveal', 'bh-in');
        el.style.transitionDelay = '';
      }, 1500);
    }

    if (!('IntersectionObserver' in window)) {
      requestAnimationFrame(function () { targets.forEach(show); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          show(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    // Наблюдаем на следующем кадре — гарантия проигрывания перехода
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        targets.forEach(function (el) { io.observe(el); });
      });
    });

    // Страховка: показать всё максимум через 3 секунды
    setTimeout(function () { targets.forEach(show); }, 3000);
  }

  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(reveal);
  } else {
    document.addEventListener('DOMContentLoaded', reveal);
    reveal();
  }
})();
