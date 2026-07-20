---
hide:
  - toc
---

# Вход в профиль

<div class="ax-login" markdown>

<p class="ax-login__hint">Введите свой ник, чтобы открыть профиль. Регистрацию проводит администрация.</p>

<input id="ax-login-nick" class="ax-login__input" type="text" placeholder="Ваш ник" autocomplete="off" spellcheck="false">

<button class="md-button md-button--primary" id="ax-login-btn">Войти</button>

<p id="ax-login-err" class="ax-login__err"></p>

</div>

<div class="ax-modal" id="ax-modal" hidden>
  <div class="ax-modal__backdrop" data-ax-close></div>
  <div class="ax-modal__card" role="dialog" aria-modal="true" aria-label="Профиль игрока">
    <button class="ax-modal__close" type="button" aria-label="Закрыть" data-ax-close>&times;</button>
    <div class="ax-profile">
      <div class="ax-profile__left">
        <span class="ax-profile__label">Профиль игрока</span>
        <span class="ax-profile__nick" id="ax-p-nick"></span>
        <span class="ax-profile__joined" id="ax-p-joined"></span>
        <img class="ax-profile__skin" id="ax-p-skin" src="" alt="">
        <span class="ax-profile__birth" id="ax-p-birth"></span>
      </div>
      <div class="ax-profile__right">
        <span class="ax-profile__section">Достижения</span>
        <div class="ax-profile__empty" id="ax-p-ach">Тут пока что пусто</div>
      </div>
    </div>
  </div>
</div>

<script>
var AX_PROFILES = {
  "ducki4": {
    nick: "Ducki4",
    joined: "Присоединился 7 июля 2026",
    birth: "13 февраля 2011",
    skin: "../assets/images/profiles/Ducki4.png",
    achievements: []
  }
};

(function () {
  var modal = document.getElementById('ax-modal');
  if (!modal) return;
  var card = modal.querySelector('.ax-modal__card');
  var backdrop = modal.querySelector('.ax-modal__backdrop');
  var showFallback;

  function open(p) {
    document.getElementById('ax-p-nick').textContent = p.nick;
    document.getElementById('ax-p-joined').textContent = p.joined;
    document.getElementById('ax-p-birth').textContent = '🎂 ' + p.birth;
    var skin = document.getElementById('ax-p-skin');
    skin.src = p.skin; skin.alt = p.nick;
    var ach = document.getElementById('ax-p-ach');
    ach.textContent = (p.achievements && p.achievements.length) ? '' : 'Тут пока что пусто';
    modal.hidden = false;
    void modal.offsetHeight; // форс reflow: стартовое состояние отрисовано
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    // страховка: если переход не проиграется (фоновая вкладка, троттлинг) —
    // показать карточку принудительно
    clearTimeout(showFallback);
    showFallback = setTimeout(function () {
      card.style.opacity = '1';
      card.style.transform = 'none';
      backdrop.style.opacity = '1';
    }, 400);
  }

  function close() {
    clearTimeout(showFallback);
    card.style.opacity = '';
    card.style.transform = '';
    backdrop.style.opacity = '';
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { modal.hidden = true; }, 250);
  }

  function login() {
    var input = document.getElementById('ax-login-nick');
    var err = document.getElementById('ax-login-err');
    var v = (input.value || '').trim().toLowerCase();
    if (!v) { err.textContent = 'Введите ник.'; return; }
    var p = AX_PROFILES[v];
    if (p) { err.textContent = ''; open(p); }
    else { err.textContent = 'Профиль не найден. Регистрацию проводит администрация.'; }
  }

  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'ax-login-btn') login();
    if (e.target && e.target.hasAttribute && e.target.hasAttribute('data-ax-close')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.activeElement && document.activeElement.id === 'ax-login-nick') login();
    if (e.key === 'Escape' && !modal.hidden) close();
  });
})();
</script>
