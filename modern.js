// HomeBook website — the modern layer's small helpers. No libraries.
// Without this file the pages are complete; these only add polish.
(function () {
  var root = document.documentElement;
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The nav gains a shadow once the page has scrolled.
  var bar = document.querySelector('.topbar');
  if (bar) {
    var onScroll = function () { bar.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Opening transition: a click or key skips it.
  var intro = document.querySelector('.intro');
  if (intro) {
    var skip = function () {
      intro.classList.add('skip');
      root.classList.remove('intro-on');
      window.removeEventListener('keydown', skip);
    };
    intro.addEventListener('click', skip);
    window.addEventListener('keydown', skip);
    intro.addEventListener('animationend', function (e) {
      if (e.target === intro) { intro.style.display = 'none'; window.removeEventListener('keydown', skip); }
    });
  }

  // A soft light that follows the pointer over the hero and the cards.
  if (still || !window.matchMedia('(hover: hover)').matches) return;
  var lit = document.querySelectorAll('.hero, .mod-card, .news-list li');
  lit.forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();
