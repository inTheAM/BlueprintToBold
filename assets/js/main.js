/* Blueprint to B.O.L.D™ · faizamgua.com
   1. The lens: blueprint above the "Just shift the lens" quote, bold below it.
   2. The lens shift scene: an aperture that opens as the visitor scrolls.
   3. The story line that draws itself through the chapters.
   4. Mobile menu.
   5. "Your next move" blueprint card. Nothing typed here leaves the device. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMQ = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function easeInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function smoothstep(a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }

  function applyMotionPref() { root.classList.toggle('reduce-motion', !!reduceMQ.matches); }
  applyMotionPref();

  /* ---------------------------------------------------------------- Lens */
  var lensBtn = document.getElementById('lens-toggle');

  function setLens(mode) {
    root.setAttribute('data-lens', mode);
    var bold = mode === 'bold';
    if (lensBtn) lensBtn.setAttribute('aria-checked', String(bold));
    if (themeMeta) themeMeta.setAttribute('content', bold ? '#FAFBF9' : '#123F7A');
  }

  if (lensBtn) {
    lensBtn.addEventListener('click', function () {
      setLens(root.getAttribute('data-lens') === 'bold' ? 'blueprint' : 'bold');
    });
  }

  /* -------------------------------------------------------- Scroll scenes */
  var shift = document.getElementById('shift');
  var stage = document.getElementById('shift-stage');
  var chapters = document.getElementById('chapters');
  var shiftTop = 0, shiftRange = 1, threshold = 0, chTop = 0, chHeight = 1, vh = 0;
  var pointer = null, autoLens = null, ticking = false;

  function measure() {
    var y = window.scrollY || window.pageYOffset;
    vh = window.innerHeight;
    if (shift) {
      shiftTop = shift.getBoundingClientRect().top + y;
      shiftRange = Math.max(1, shift.offsetHeight - vh);
      // The lens flips once the aperture has filled the screen. With reduced
      // motion there is no aperture, so it flips as the quote reaches mid-screen.
      threshold = reduceMQ.matches ? shiftTop - vh * .5 : shiftTop + shiftRange * .8;
    }
    if (chapters) {
      chTop = chapters.getBoundingClientRect().top + y;
      chHeight = Math.max(1, chapters.offsetHeight);
    }
  }

  function update() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;

    // Lens follows the scroll position only when it crosses the threshold,
    // so a visitor's own choice on the switch holds until then.
    if (shift) {
      var wanted = y >= threshold ? 'bold' : 'blueprint';
      if (wanted !== autoLens) { autoLens = wanted; setLens(wanted); }
    }

    if (reduceMQ.matches) return;

    if (chapters) {
      var sp = clamp((y + vh * .62 - chTop) / chHeight, 0, 1);
      chapters.style.setProperty('--story-p', sp.toFixed(4));
    }

    if (stage) {
      var p = clamp((y - shiftTop) / shiftRange, 0, 1);
      var open = easeInOut(clamp(p / .78, 0, 1));
      var w = stage.clientWidth, h = stage.clientHeight;
      var cx = w / 2, cy = h / 2;
      if (pointer) {
        cx = pointer.x + (cx - pointer.x) * open;
        cy = pointer.y + (cy - pointer.y) * open;
      }
      var full = Math.sqrt(Math.pow(Math.max(cx, w - cx), 2) + Math.pow(Math.max(cy, h - cy), 2)) + 4;
      var r0 = Math.max(60, Math.min(w, h) * .14);
      var r = r0 + (full - r0) * open;
      stage.style.setProperty('--r', r.toFixed(1) + 'px');
      stage.style.setProperty('--cx', cx.toFixed(1) + 'px');
      stage.style.setProperty('--cy', cy.toFixed(1) + 'px');
      stage.style.setProperty('--ring-o', (1 - smoothstep(.5, .76, p)).toFixed(3));
      stage.style.setProperty('--cue-o', (1 - smoothstep(.04, .26, p)).toFixed(3));
    }
  }

  function requestUpdate() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }
  function remeasure() { measure(); requestUpdate(); }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', remeasure);
  window.addEventListener('load', remeasure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
  if (reduceMQ.addEventListener) {
    reduceMQ.addEventListener('change', function () {
      applyMotionPref();
      if (chapters) chapters.style.removeProperty('--story-p');
      remeasure();
    });
  }

  // On a desktop, the lens follows the pointer until it opens fully.
  if (stage && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    stage.addEventListener('pointermove', function (e) {
      var b = stage.getBoundingClientRect();
      pointer = { x: e.clientX - b.left, y: e.clientY - b.top };
      requestUpdate();
    });
    stage.addEventListener('pointerleave', function () { pointer = null; requestUpdate(); });
  }

  measure();
  update();

  /* ---------------------------------------------------------------- Menu */
  var header = document.getElementById('site-header');
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!header || !menuBtn) return;
    header.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Close' : 'Menu';
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
  }
  if (nav) {
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuBtn && menuBtn.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuBtn.focus();
    }
  });

  /* ------------------------------------------------------ Your next move */
  var form = document.getElementById('next-form');
  if (!form) return;

  var STORE = 'bold-next-move';
  var fields = {
    move: document.getElementById('nm-move'),
    skill: document.getElementById('nm-skill'),
    step: document.getElementById('nm-step')
  };
  var examples = {
    move: 'Moving from engineering into product strategy',
    skill: 'Explaining complex ideas simply',
    step: 'Ask two people in product for a 20-minute chat'
  };
  var card = document.getElementById('nm-card');
  var outs = card.querySelectorAll('[data-out]');
  var exampleTag = document.getElementById('nm-example');
  var status = document.getElementById('nm-status');
  var clearBtn = document.getElementById('nm-clear');
  var dateEl = document.getElementById('nm-date');

  if (dateEl) {
    try {
      dateEl.textContent = 'Drawn ' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (err) { /* leave the date off */ }
  }

  function clean(s) { return (s || '').trim().replace(/[\s.!?,;:]+$/, ''); }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  function values() {
    var v = { move: clean(fields.move.value), skill: clean(fields.skill.value), step: clean(fields.step.value) };
    v.example = !v.move && !v.skill && !v.step;
    if (v.example) { v.move = examples.move; v.skill = examples.skill; v.step = examples.step; }
    return v;
  }

  function render() {
    var v = values();
    if (exampleTag) exampleTag.hidden = !v.example;
    Array.prototype.forEach.call(outs, function (el) {
      var key = el.getAttribute('data-out');
      var text = v[key];
      if (el.hasAttribute('data-cap')) text = cap(text);
      el.textContent = text || '';
      el.classList.toggle('blank', !text);
    });
  }

  function save() {
    try {
      localStorage.setItem(STORE, JSON.stringify({
        move: fields.move.value, skill: fields.skill.value, step: fields.step.value
      }));
    } catch (err) { /* storage unavailable: the card still works */ }
  }

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (saved) {
        fields.move.value = saved.move || '';
        fields.skill.value = saved.skill || '';
        fields.step.value = saved.step || '';
      }
    } catch (err) { /* nothing saved */ }
  }

  function asText() {
    var v = values();
    var blank = '________';
    return [
      'My B.O.L.D blueprint',
      '',
      'B · Break the Frame: I’m letting go of who I thought I had to be. The move I’m making: ' + (v.move || blank) + '.',
      'O · Own Your Story: ' + (cap(v.skill) || blank) + ' isn’t a detour. It’s my leverage.',
      'L · Learn Out Loud: I’ll share what I learn along the way, in public, while I’m still a beginner.',
      'D · Design Your Next Move: In the next 7 days: ' + (v.step || blank) + '.',
      '',
      'You don’t need a perfect plan, just a bold one.',
      'Blueprint to B.O.L.D™ by Faiza Mgua · faizamgua.com'
    ].join('\n');
  }

  function say(msg) { if (status) status.textContent = msg; }

  function selectCard() {
    try {
      var range = document.createRange();
      range.selectNodeContents(card);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (err) { /* selection unsupported */ }
  }

  Object.keys(fields).forEach(function (k) {
    fields[k].addEventListener('input', function () { render(); save(); say(''); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = asText();
    var copied = function () { say('Copied. Paste it somewhere you’ll see it this week.'); };
    var fallback = function () {
      selectCard();
      say('Your blueprint is selected. Press Ctrl+C, or ⌘C on a Mac, to copy it.');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(copied, fallback);
    } else {
      fallback();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      fields.move.value = '';
      fields.skill.value = '';
      fields.step.value = '';
      try { localStorage.removeItem(STORE); } catch (err) { /* ignore */ }
      render();
      say('Cleared. The card is showing the example again.');
      fields.move.focus();
    });
  }

  load();
  render();
})();
