const IMAGES = {
  hero:       'img/SPIDERMAN.jpg',
  about:      'img/poster.jpg',
  aboutweb:   'img/img 19-no-bg-preview (carve.photos).png.png',
  castbg:     'img/img 14.webp',
  cast_destin:'img/destin.jpg',
  cast_zendaya:'img/zendaya.webp',
  cast_mark:  'img/mark.webp',
  cast_jacob: 'img/jacob.jpg',
  cast_tom:   'img/tom.webp',
  cast_sydney:'img/sydney.webp',
  histbg:     'img/img 12.jpg',
  t2023:      'img/img 8.webp',
  t2024:      'img/img 9.webp',
  t2025a:     'img/img 10.webp',
  t2025b:     'img/img 11.webp',
  t2026:      'img/img 1.jpg',
  galweb:     'img/img 19-no-bg-preview (carve.photos).png.png',
  still1:     'img/SPIDER.jpg',
  still2:     'img/img 13.webp',
  still3:     'img/SM.jpg',
  still4:     'img/img13.jpg',
  still5:     'img/PETER.jpg',
  still6:     'img/img 11.webp',
  still7:     'img/img 6.webp'
};
const BG_SLOTS = new Set(['hero', 'aboutweb', 'castbg', 'histbg', 'galweb']);
document.querySelectorAll('[data-slot]').forEach(el => {
  const src = IMAGES[el.dataset.slot];
  if (!src) return;
  if (BG_SLOTS.has(el.dataset.slot)) {
    el.style.backgroundImage = `url("${encodeURI(src)}")`;
  } else {
    const img = new Image();
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    if (el.dataset.slot === 'hero') img.fetchPriority = 'high';
    el.prepend(img);
  }
});

const LINKS = {
  trailer: 'https://www.youtube.com/results?search_query=Spider-Man%3A+Brand+New+Day+%7C+Official+Trailer',
  privacy: 'https://www.sonypictures.com/corp/privacy.html',
  terms:   'https://www.sonypictures.com/corp/tos.html',
  cookies: 'https://www.sonypictures.com/corp/privacy.html',
  wiki: {
    cast_destin: { en:'https://en.wikipedia.org/wiki/Destin_Daniel_Cretton', ru:'https://ru.wikipedia.org/wiki/Креттон,_Дестин_Дэниел' },
    cast_zendaya:{ en:'https://en.wikipedia.org/wiki/Zendaya',                ru:'https://ru.wikipedia.org/wiki/Зендея' },
    cast_mark:   { en:'https://en.wikipedia.org/wiki/Mark_Ruffalo',           ru:'https://ru.wikipedia.org/wiki/Руффало,_Марк' },
    cast_jacob:  { en:'https://en.wikipedia.org/wiki/Jacob_Batalon',          ru:'https://ru.wikipedia.org/wiki/Баталон,_Джейкоб' },
    cast_tom:    { en:'https://en.wikipedia.org/wiki/Tom_Holland',            ru:'https://ru.wikipedia.org/wiki/Холланд,_Том' },
    cast_sydney: { en:'https://en.wikipedia.org/wiki/Sydney_Sweeney',         ru:'https://ru.wikipedia.org/wiki/Суини,_Сидни' }
  }
};

const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('header--scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

const links = [...document.querySelectorAll('.nav a')];
const spy = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting)
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

const rev = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); rev.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => rev.observe(el));

const carousel = document.getElementById('carousel');
const track = document.getElementById('track');
const slides = [...track.children];
const dotsWrap = document.getElementById('dots');
let idx = 0;

slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot';
  d.addEventListener('click', () => { idx = i; update(); });
  dotsWrap.appendChild(d);
});
const dots = [...dotsWrap.children];

const step = () => slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 32);
const maxIdx = () => Math.max(0, slides.length - Math.max(1, Math.floor((carousel.clientWidth + 32) / step())));

function update() {
  idx = Math.max(0, Math.min(idx, maxIdx()));
  track.style.transform = `translateX(-${idx * step()}px)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}
document.getElementById('prevBtn').addEventListener('click', () => { idx--; update(); });
document.getElementById('nextBtn').addEventListener('click', () => { idx++; update(); });
addEventListener('resize', update);
update();

const I18N = {
  en: {
    nav_home:'Home', nav_about:'About', nav_cast:'Cast', nav_history:'History', nav_gallery:'Gallery',
    hero_title:'SPIDER-MAN', hero_sub:'Brand New Day',
    hero_text:'Peter Parker faces a new threat that challenges everything he believed in. A new chapter in the legend begins.',
    hero_read:'Read more', hero_trailer:'Watch Trailer',
    about_title:'About the Film',
    about_text:'After the events of the multiverse, Peter Parker tries to return to normal life. But when a mysterious villain appears in New York with technology capable of rewriting reality, Spider-Man will be forced to make a choice that will change everything. Old allies, new enemies, and a mystery rooted in the past\u2014all this awaits the hero in the new chapter of his story.',
    about_more:'More',
    cast_label:'Creators', cast_title:'The faces of a new era',
    cast_sub:'A groundbreaking team brings a fresh vision to the iconic hero.',
    role_director:'Director', role_actor:'Actor', role_actor_prod:'Actor & Producer', role_actress_prod:'Actress & Producer',
    desc_destin:'Visionary filmmaker with a gift for intimate, character-driven stories. He blends emotional depth with visual poetry, from indie gems to Marvel blockbusters.',
    desc_zendaya:'Award-winning powerhouse known for her fierce elegance and genre-spanning roles. A style icon and advocate for self-confidence, she captivates both on screen and off.',
    desc_mark:'Versatile veteran who brings raw intensity and quiet humanity to every character. A passionate activist off-screen, he\u2019s as compelling in drama as he is in superhero epics.',
    desc_jacob:'Beloved scene-stealer who balances humor and loyalty as Peter Parker\u2019s best friend. A comic-book enthusiast turned fan-favorite, he radiates warmth in every role.',
    desc_tom:'Charismatic star who brought Spider-Man to life with youthful energy and heart. A trained dancer and avid golfer who never outgrows his love for storytelling.',
    desc_sydney:'Rising star with striking presence and fearless versatility in both drama.',
    bio:'Bio',
    hist_label:'Timeline', hist_title:'The long road back to the mask',
    hist_sub:'From a secret script to the final day of shooting. The story of how a new vision was forged.',
    hist_prod:'Production', hist_gallery:'Gallery',
    ev_2023:'Sony and Marvel announce the project with a cryptic teaser of a shattered mask.',
    ev_2024:'Chloe Zhao signs on to direct, promising a neorealist take on the hero.',
    ev_2025a:'Principal photography begins on location in a snow-covered New York City.',
    ev_2025b:'The cast is revealed, confirming the debut of the Chameleon as the main villain.',
    ev_2026:'Filming wraps. The director calls it a brutal and honest love letter to Queens.',
    gal_title:'Film Stills', gal_sub:'A city of shadows, a spark of red and blue',
    foot_priv:'Privacy policy', foot_terms:'Terms of service', foot_cookies:'Cookies settings',
    modal_bio_title:'Bio \u2014 {name}',
    modal_bio_more:'Full biography and filmography \u2014 on Wikipedia.',
    modal_btn_wiki:'Wikipedia',
    modal_trailer_title:'Watch Trailer',
    modal_trailer_text:'The official trailer of \u00ABSpider-Man: Brand New Day\u00BB \u2014 on the Sony Pictures Entertainment YouTube channel.',
    modal_btn_yt:'Watch on YouTube',
    modal_priv_title:'Privacy policy',
    modal_priv_text:'Sony Pictures Entertainment collects only the data required for the site to operate: cookies, language settings and anonymous visit statistics. Your data is not shared with third parties.',
    modal_terms_title:'Terms of service',
    modal_terms_text:'All materials on this site \u2014 images, texts and videos \u2014 belong to Sony Pictures and Marvel Studios. Use of the materials is permitted for personal, non-commercial purposes only.',
    modal_cookies_title:'Cookies settings',
    modal_cookies_text:'The site uses cookies to operate correctly and to remember your language choice. You can manage or disable cookies in your browser settings at any time.',
    modal_btn_sony:'Sony Pictures'
  },
  ru: {
    nav_home:'Главная', nav_about:'О фильме', nav_cast:'Команда', nav_history:'История', nav_gallery:'Кадры',
    hero_title:'ЧЕЛОВЕК-ПАУК', hero_sub:'Новый день',
    hero_text:'Питер Паркер сталкивается с новой угрозой, которая ставит под сомнение всё, во что он верил. Начинается новая глава легенды.',
    hero_read:'Подробнее', hero_trailer:'Смотреть трейлер',
    about_title:'О фильме',
    about_text:'После событий мультивселенной Питер Паркер пытается вернуться к обычной жизни. Но когда в Нью-Йорке появляется таинственный злодей с технологией, способной переписывать реальность, Человеку-пауку придётся сделать выбор, который изменит всё. Старые союзники, новые враги и тайна, уходящая корнями в прошлое, \u2014 всё это ждёт героя в новой главе его истории.',
    about_more:'Далее',
    cast_label:'Создатели', cast_title:'Лица новой эры',
    cast_sub:'Команда, которая по-новому взглянула на культового героя.',
    role_director:'Режиссёр', role_actor:'Актёр', role_actor_prod:'Актёр и продюсер', role_actress_prod:'Актриса и продюсер',
    desc_destin:'Визионер с даром к камерным, характерным историям. Он сочетает эмоциональную глубину с визуальной поэзией \u2014 от независимого кино до блокбастеров Marvel.',
    desc_zendaya:'Талантливая актриса, известная элегантностью и разнообразием ролей. Икона стиля и сторонница уверенности в себе \u2014 она завораживает на экране и за его пределами.',
    desc_mark:'Мастер, привносящий в каждого героя искренность и глубину. Страстный активист вне экрана, он одинаково убедителен и в драме, и в супергеройском эпике.',
    desc_jacob:'Любимец публики, сочетающий юмор и преданность в роли лучшего друга Питера Паркера. Фанат комиксов, ставший любимцем поклонников, он излучает тепло в каждой роли.',
    desc_tom:'Харизматичный актёр, воплотивший Человека-паука с юношеской энергией и сердцем. Профессиональный танцор и заядлый гольфист, он не теряет любви к искусству повествования.',
    desc_sydney:'Восходящая звезда с яркой харизмой и бесстрашной универсальностью в драме.',
    bio:'Биография',
    hist_label:'Хронология', hist_title:'Долгий путь обратно к маске',
    hist_sub:'От секретного сценария до последнего съёмочного дня. История о том, как рождалось новое видение.',
    hist_prod:'Продакшн', hist_gallery:'Галерея',
    ev_2023:'Sony и Marvel анонсируют проект загадочным тизером разбитой маски.',
    ev_2024:'К проекту присоединяется Хлоя Чжао, обещая неореалистичный взгляд на героя.',
    ev_2025a:'Основные съёмки начинаются в заснеженном Нью-Йорке.',
    ev_2025b:'Объявлен актёрский состав: главным злодеем станет Хамелеон.',
    ev_2026:'Съёмки завершены. Режиссёр называет фильм жестоким и честным признанием в любви Квинсу.',
    gal_title:'Кадры из фильма', gal_sub:'Город теней, вспышки красного и синего',
    foot_priv:'Политика конфиденциальности', foot_terms:'Условия использования', foot_cookies:'Настройки cookies',
    modal_bio_title:'Биография \u2014 {name}',
    modal_bio_more:'Полная биография и фильмография \u2014 в Википедии.',
    modal_btn_wiki:'Википедия',
    modal_trailer_title:'Смотреть трейлер',
    modal_trailer_text:'Официальный трейлер \u00ABЧеловек-паук: Новый день\u00BB \u2014 на YouTube-канале Sony Pictures Entertainment.',
    modal_btn_yt:'Смотреть на YouTube',
    modal_priv_title:'Политика конфиденциальности',
    modal_priv_text:'Sony Pictures Entertainment собирает только данные, необходимые для работы сайта: cookies, языковые настройки и обезличенную статистику посещений. Ваши данные не передаются третьим лицам.',
    modal_terms_title:'Условия использования',
    modal_terms_text:'Все материалы сайта \u2014 изображения, тексты и видео \u2014 принадлежат Sony Pictures и Marvel Studios. Использование материалов разрешено только в личных, некоммерческих целях.',
    modal_cookies_title:'Настройки cookies',
    modal_cookies_text:'Сайт использует cookies для корректной работы и запоминания выбранного языка. Управлять cookies или отключить их можно в настройках браузера в любой момент.',
    modal_btn_sony:'Sony Pictures'
  }
};

let lang = 'en';
try { lang = localStorage.getItem('smnd-lang') || 'en'; } catch (e) {}
const langBtn = document.getElementById('langBtn');

function applyI18n() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const t = I18N[lang][el.dataset.i18n];
    if (t) el.textContent = t;
  });
  langBtn.textContent = lang === 'en' ? 'RU' : 'EN';
}
applyI18n();

langBtn.addEventListener('click', () => {
  lang = lang === 'en' ? 'ru' : 'en';
  try { localStorage.setItem('smnd-lang', lang); } catch (e) {}
  applyI18n();
});

const modal = document.getElementById('modal');
const mTitle = document.getElementById('modalTitle');
const mText = document.getElementById('modalText');
const mBtn = document.getElementById('modalBtn');
const mBtnText = document.getElementById('modalBtnText');
let lastFocus = null;

function openModal(type, trigger) {
  const t = I18N[lang];
  let title = '', text = '', href = '#', btn = '';
  if (type === 'bio') {
    const card = trigger && trigger.closest('.card');
    const slot = card ? card.dataset.slot : '';
    const name = card ? card.querySelector('h3').textContent.trim() : '';
    title = t.modal_bio_title.replace('{name}', name);
    text = (t['desc_' + slot.replace('cast_', '')] || '') + ' ' + t.modal_bio_more;
    href = (LINKS.wiki[slot] || {})[lang] || ((LINKS.wiki[slot] || {}).en) || '#';
    btn = t.modal_btn_wiki;
  } else if (type === 'trailer') {
    title = t.modal_trailer_title; text = t.modal_trailer_text;
    href = LINKS.trailer; btn = t.modal_btn_yt;
  } else {
    title = t['modal_' + type + '_title'] || '';
    text = t['modal_' + type + '_text'] || '';
    href = LINKS[type] || '#'; btn = t.modal_btn_sony;
  }
  if (!title && trigger) title = trigger.textContent.trim();
  if (!text) text = title;
  mTitle.textContent = title;
  mText.textContent = text;
  mBtnText.textContent = btn;
  mBtn.href = href;
  lastFocus = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal__close').focus();
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}
document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-modal]');
  if (trigger) { e.preventDefault(); openModal(trigger.dataset.modal, trigger); return; }
  if (e.target.closest('[data-close]')) { closeModal(); }
});
addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

const burger = document.getElementById('burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
  document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  });
});