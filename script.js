/* ===== IMAGES: все пути к картинкам меняются здесь ===== */
const IMAGES = {
  hero:       'img/bg.jpg',          // фон главного экрана
  about:      'img/PETER.jpg',       // фото в секции About
  cast_destin:'img/img 5.jpg',       // портреты (проверь и поменяй при необходимости)
  cast_zendaya:'img/img 12.jpg',
  cast_mark:  'img/img 15.jpg',
  cast_jacob: 'img/img 16.jpg',
  cast_tom:   'img/img 17.jpg',
  cast_sydney:'img/img 7.jpg',
  t2023:      'img/SPIDER.jpg',
  t2024:      'img/SPIDY.jpg',
  t2025a:     'img/SPIDERMAN.jpg',
  t2025b:     'img/SM.jpg',
  t2026:      'img/poster.jpg',
  still1:     'img/img 1.jpg',
  still2:     'img/img 2.webp',
  still3:     'img/img 3.webp',
  still4:     'img/img 4.webp',
  still5:     'img/img 6.webp',
  still6:     'img/img 8.webp',
  still7:     'img/img 9.webp',
  still8:     'img/img 10.webp'
};
document.querySelectorAll('[data-slot]').forEach(el => {
  const src = IMAGES[el.dataset.slot];
  if (src) el.style.backgroundImage = `url("${encodeURI(src)}")`;
});

/* ===== Header ===== */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('header--scrolled', scrollY > 40);
addEventListener('scroll', onScroll); onScroll();

/* ===== Scrollspy ===== */
const links = [...document.querySelectorAll('.nav a')];
const spy = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting)
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

/* ===== Reveal on scroll ===== */
const rev = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); rev.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => rev.observe(el));

/* ===== Carousel ===== */
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

const step = () => slides[0].getBoundingClientRect().width + 24;
const maxIdx = () => Math.max(0, slides.length - Math.floor((carousel.clientWidth + 24) / step()));

function update() {
  idx = Math.max(0, Math.min(idx, maxIdx()));
  track.style.transform = `translateX(-${idx * step()}px)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}
document.getElementById('prevBtn').addEventListener('click', () => { idx--; update(); });
document.getElementById('nextBtn').addEventListener('click', () => { idx++; update(); });
addEventListener('resize', update);
update();

/* ===== i18n (RU / EN) ===== */
const I18N = {
  en: {
    nav_home:'Home', nav_about:'About', nav_cast:'Cast', nav_history:'History', nav_gallery:'Gallery',
    hero_title:'SPIDER-MAN', hero_sub:'Brand New Day',
    hero_text:'Peter Parker faces a new threat that challenges everything he believed in. A new chapter in the legend begins.',
    hero_read:'Read more', hero_trailer:'Watch Trailer',
    about_title:'About the Film',
    about_text:'After the events of the multiverse, Peter Parker tries to return to normal life. But when a mysterious villain appears in New York with technology capable of rewriting reality, Spider-Man will be forced to make a choice that will change everything. Old allies, new enemies, and a mystery rooted in the past—all this awaits the hero in the new chapter of his story.',
    about_more:'More',
    cast_label:'Creators', cast_title:'The faces of a new era',
    cast_sub:'A groundbreaking team brings a fresh vision to the iconic hero.',
    role_director:'Director', role_actor:'Actor', role_actor_prod:'Actor & Producer', role_actress_prod:'Actress & Producer',
    desc_destin:'Visionary filmmaker with a gift for intimate, character-driven stories.',
    desc_zendaya:'Award-winning powerhouse known for her fierce elegance and genre-spanning roles.',
    desc_mark:'Versatile veteran who brings raw intensity and quiet humanity to every character.',
    desc_jacob:'Beloved scene-stealer who balances humor and loyalty as Peter best friend.',
    desc_tom:'Charismatic star who brought Spider-Man to life with youthful energy and heart.',
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
    foot_priv:'Privacy policy', foot_terms:'Terms of service', foot_cookies:'Cookies settings'
  },
  ru: {
    nav_home:'Главная', nav_about:'О фильме', nav_cast:'Команда', nav_history:'История', nav_gallery:'Кадры',
    hero_title:'ЧЕЛОВЕК-ПАУК', hero_sub:'Новый день',
    hero_text:'Питер Паркер сталкивается с новой угрозой, которая ставит под сомнение всё, во что он верил. Начинается новая глава легенды.',
    hero_read:'Подробнее', hero_trailer:'Смотреть трейлер',
    about_title:'О фильме',
    about_text:'После событий мультивселенной Питер Паркер пытается вернуться к обычной жизни. Но когда в Нью-Йорке появляется таинственный злодей с технологией, способной переписывать реальность, Человеку-пауку придётся сделать выбор, который изменит всё. Старые союзники, новые враги и тайна, уходящая корнями в прошлое, — всё это ждёт героя в новой главе его истории.',
    about_more:'Далее',
    cast_label:'Создатели', cast_title:'Лица новой эры',
    cast_sub:'Команда, которая по-новому взглянула на культового героя.',
    role_director:'Режиссёр', role_actor:'Актёр', role_actor_prod:'Актёр и продюсер', role_actress_prod:'Актриса и продюсер',
    desc_destin:'Визионер с даром к камерным, характерным историям.',
    desc_zendaya:'Талантливая актриса, известная элегантностью и разнообразием ролей.',
    desc_mark:'Мастер, привносящий в каждого героя искренность и глубину.',
    desc_jacob:'Любимец публики, сочетающий юмор и преданность в роли лучшего друга Питера.',
    desc_tom:'Харизматичный актёр, воплотивший Человека-паука с юношеской энергией и сердцем.',
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
    foot_priv:'Политика конфиденциальности', foot_terms:'Условия использования', foot_cookies:'Настройки cookies'
  }
};

let lang = 'en';
const langBtn = document.getElementById('langBtn');
langBtn.addEventListener('click', () => {
  lang = lang === 'en' ? 'ru' : 'en';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const t = I18N[lang][el.dataset.i18n];
    if (t) el.textContent = t;
  });
  langBtn.textContent = lang === 'en' ? 'RU' : 'EN';
});