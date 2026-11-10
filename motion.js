// HomeBook website — small motion helpers for the home page. No libraries.
// Without this file (or with motion turned off) the page is complete and still.
(function () {
  var root = document.documentElement;
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  window.hbMotion = true;

  // ---- reveal on scroll ----
  var targets = document.querySelectorAll('[data-reveal], .reveal-group > *, .receipt, .gauge-card, .lend-card, .stamp');
  targets.forEach(function (el) {
    if (el.parentElement && el.parentElement.classList.contains('reveal-group')) {
      el.classList.add('reveal');
      el.style.setProperty('--i', Array.prototype.indexOf.call(el.parentElement.children, el) % 6);
    } else if (el.hasAttribute('data-reveal')) {
      el.classList.add('reveal');
    }
  });
  function show(el) {
    el.classList.add('in');
    el.querySelectorAll('[data-count]').forEach(countUp);
    if (el.hasAttribute('data-count')) countUp(el);
  }
  if (still || !('IntersectionObserver' in window)) {
    targets.forEach(show);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  // ---- numbers count up: <b data-count="7100" data-prefix="₹"> ----
  function fmt(n) { return Math.round(n).toLocaleString('en-IN'); }
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    var to = parseFloat(el.dataset.count), pre = el.dataset.prefix || '';
    if (still) { el.textContent = pre + fmt(to); return; }
    var t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(to * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  document.querySelectorAll('.hero [data-count]').forEach(function (el) {
    setTimeout(function () { countUp(el); }, 900);
  });

  // ---- What's today: flip through example days ----
  var demo = document.querySelector('.today-demo');
  if (demo) {
    var cards = demo.querySelectorAll('.today-card');
    var dots = document.querySelectorAll('.today-dots button');
    var at = 0, timer = null;
    function go(n) {
      if (n === at) return;
      var from = cards[at], to = cards[n];
      if (still) {
        from.hidden = true; to.hidden = false;
      } else {
        to.hidden = false; to.classList.add('pre');
        void to.offsetWidth;
        from.classList.add('out'); to.classList.remove('pre');
        setTimeout(function () { from.hidden = true; from.classList.remove('out'); }, 700);
      }
      dots[at].setAttribute('aria-current', 'false');
      dots[n].setAttribute('aria-current', 'true');
      at = n;
    }
    cards.forEach(function (c, i) { c.hidden = i !== 0; });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { go(i); restart(); });
    });
    function restart() {
      if (still) return;
      clearInterval(timer);
      timer = setInterval(function () { go((at + 1) % cards.length); }, 3600);
    }
    // Pause while the card is off screen or the tab is hidden.
    if ('IntersectionObserver' in window && !still) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) restart(); else clearInterval(timer); });
      }).observe(demo);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(timer); else restart();
    });
  }
})();
