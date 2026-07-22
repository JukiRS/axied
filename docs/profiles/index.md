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
      </div>
      <div class="ax-profile__right">
        <span class="ax-profile__section">Достижения</span>
        <div class="ax-profile__empty" id="ax-p-ach">Тут пока что пусто</div>
      </div>
    </div>
  </div>
</div>

<script>
var AX_NOSKIN = "../assets/images/profiles/_noskin.png";
// skin: true — есть лицензионный скин, false — показываем заглушку
var AX_LIST = [
  ["Ducki4",         "Присоединился 7 июля 2026",   true],
  ["pentysss",       "Присоединилась 7 июля 2026",  false],
  ["freiqks",        "Присоединился 7 июля 2026",   true],
  ["Fyrones",        "Присоединился 7 июля 2026",   true],
  ["litWIN228",      "Присоединилась 7 июля 2026",  false],
  ["Puddingdolli",   "Присоединилась 7 июля 2026",  false],
  ["Pr3list",        "Присоединился 7 июля 2026",   true],
  ["illkarse",       "Присоединилась 7 июля 2026",  false],
  ["sofflim",        "Присоединилась 7 июля 2026",  false],
  ["Fat0ne_",        "Присоединился 9 июля 2026",   false],
  ["Denya_Den",      "Присоединился 9 июля 2026",   true],
  ["picno",          "Присоединился 9 июля 2026",   true],
  ["voldrik",        "Присоединился 11 июля 2026",  true],
  ["korka_343",      "Присоединился 11 июля 2026",  true],
  ["sona_5",         "Присоединилась 12 июля 2026", true],
  ["Last_Seraphim_", "Присоединился 13 июля 2026",  false],
  ["xesfak1",        "Присоединился 15 июля 2026",  false],
  ["Eilis",          "Присоединилась 15 июля 2026", true],
  ["DReamkoru",      "Присоединился 15 июля 2026",  false],
  ["ItzFrames",      "Присоединился 15 июля 2026",  true],
  ["Fasochka666",    "Присоединилась 15 июля 2026", false]
];

// достижения по нику (в нижнем регистре)
var AX_PVP1 = { icon: "../assets/images/achievements/pvp-championship-1.png",
                name: "Участие в Axied PVP Championship #1" };
var AX_PVP1_WIN = { icon: "../assets/images/achievements/pvp-championship-1-winner.png",
                    name: "Чемпион Axied PVP Championship #1" };
var AX_ACHIEVEMENTS = {
  "ducki4":       [AX_PVP1],
  "fyrones":      [AX_PVP1],
  "freiqks":      [AX_PVP1],
  "puddingdolli": [AX_PVP1],
  "sofflim":      [AX_PVP1],
  "illkarse":     [AX_PVP1, AX_PVP1_WIN]
};

var AX_PROFILES = {};
AX_LIST.forEach(function (r) {
  var key = r[0].toLowerCase();
  AX_PROFILES[key] = {
    nick: r[0],
    joined: r[1],
    skin: r[2] ? ("../assets/images/profiles/" + r[0] + ".png") : AX_NOSKIN,
    achievements: AX_ACHIEVEMENTS[key] || []
  };
});

(function () {
  var modal = document.getElementById('ax-modal');
  if (!modal) return;
  var card = modal.querySelector('.ax-modal__card');
  var backdrop = modal.querySelector('.ax-modal__backdrop');
  var showFallback;

  function open(p) {
    document.getElementById('ax-p-nick').textContent = p.nick;
    document.getElementById('ax-p-joined').textContent = p.joined;
    var skin = document.getElementById('ax-p-skin');
    skin.src = p.skin; skin.alt = p.nick;
    skin.onerror = function () { this.onerror = null; this.src = AX_NOSKIN; };
    var ach = document.getElementById('ax-p-ach');
    ach.innerHTML = '';
    if (p.achievements && p.achievements.length) {
      ach.classList.remove('ax-profile__empty');
      ach.classList.add('ax-ach-grid');
      p.achievements.forEach(function (a) {
        var item = document.createElement('div');
        item.className = 'ax-ach';
        var img = document.createElement('img');
        img.src = a.icon; img.alt = a.name; img.loading = 'lazy';
        var name = document.createElement('span');
        name.className = 'ax-ach__name'; name.textContent = a.name;
        item.appendChild(img); item.appendChild(name);
        ach.appendChild(item);
      });
    } else {
      ach.classList.remove('ax-ach-grid');
      ach.classList.add('ax-profile__empty');
      ach.textContent = 'Тут пока что пусто';
    }
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
