// One page, three languages: the visitor's choice (remembered), else the browser's language when it is French or
// Vietnamese, else English (the games' own rule).
(function () {
  var langs = ['en', 'fr', 'vi'];
  function pick() {
    try { var s = localStorage.getItem('hc_lang'); if (langs.indexOf(s) >= 0) return s; } catch (e) {}
    var n = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return langs.indexOf(n) >= 0 ? n : 'en';
  }
  function set(l) {
    document.documentElement.lang = l;
    var bs = document.querySelectorAll('.langs button');
    for (var i = 0; i < bs.length; i++) bs[i].setAttribute('aria-pressed', bs[i].getAttribute('data-set') === l ? 'true' : 'false');
    var t = document.querySelector('meta[name="title-' + l + '"]');
    if (t) document.title = t.getAttribute('content');
    var imgs = document.querySelectorAll('img[data-src-' + l + ']');
    for (var j = 0; j < imgs.length; j++) imgs[j].src = imgs[j].getAttribute('data-src-' + l);
  }
  document.addEventListener('DOMContentLoaded', function () {
    set(pick());
    var bs = document.querySelectorAll('.langs button');
    for (var i = 0; i < bs.length; i++) bs[i].addEventListener('click', function () {
      var l = this.getAttribute('data-set');
      try { localStorage.setItem('hc_lang', l); } catch (e) {}
      set(l);
    });
  });
})();
