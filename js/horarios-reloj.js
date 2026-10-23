/* ═══════════════════════════════════════════════════════
   HORARIOS · reloj en vivo (hora de Chile)
   Sólo gestiona la sección #horarios. No depende de main.js.
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root = document.getElementById('hx');
  if (!root || !window.Intl || !Intl.DateTimeFormat) return;

  var TZ = 'America/Santiago';
  var OPEN = 19 * 60;                     // 19:00
  var DAYMAP = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  function $(id) { return document.getElementById(id); }
  var el = {
    hour: $('hx-hour'), min: $('hx-min'), sec: $('hx-sec'),
    win: $('hx-win'), elapsed: $('hx-elapsed'), glow: $('hx-elapsed-glow'),
    pill: $('hx-pill'), clock: $('hx-clock'),
    hh: $('hx-hh'), mm: $('hx-mm'), ss: $('hx-ss'), date: $('hx-date'),
    state: $('hx-state'), detail: $('hx-detail'),
    ring: $('hx-ring'), ringVal: $('hx-ring-val'), ringSub: $('hx-ring-sub')
  };
  var days = root.querySelectorAll('.hx-day');

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var fmtNum, fmtDate, fmtShort;
  try {
    fmtNum = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
    fmtDate = new Intl.DateTimeFormat('es-CL', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' });
    fmtShort = new Intl.DateTimeFormat('es-CL', { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short' });
  } catch (e) { return; }

  function chile(ms) {
    var p = {};
    fmtNum.formatToParts(new Date(ms)).forEach(function (i) { p[i.type] = i.value; });
    var h = parseInt(p.hour, 10);
    if (h === 24) h = 0;
    return { d: DAYMAP[p.weekday], h: h, m: parseInt(p.minute, 10), s: parseInt(p.second, 10) };
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* Estado de servicio. Dom-Jue 19:00-00:00 · Vie-Sáb 19:00-01:00 (la madrugada pertenece a la noche anterior). */
  function service(c) {
    var mins = c.h * 60 + c.m;
    var prev = (c.d + 6) % 7;
    var closeToday = (c.d === 5 || c.d === 6) ? 25 * 60 : 24 * 60;
    var r = { open: false, left: 0, elapsed: 0, total: 0, closeLabel: '00:00', group: (c.d === 5 || c.d === 6) ? 'fri-sat' : 'sun-thu', spill: false, arcEnd: 360 };
    if (mins >= OPEN && mins < closeToday) {
      r.open = true;
      r.left = closeToday - mins;
      r.elapsed = mins - OPEN;
      r.total = closeToday - OPEN;
      r.closeLabel = closeToday > 24 * 60 ? '01:00' : '00:00';
    } else if ((prev === 5 || prev === 6) && mins < 60) {
      r.open = true;
      r.spill = true;
      r.left = 60 - mins;
      r.elapsed = mins + 24 * 60 - OPEN;
      r.total = 25 * 60 - OPEN;
      r.closeLabel = '01:00';
      r.group = 'fri-sat';
    } else {
      r.left = mins < OPEN ? OPEN - mins : 24 * 60 - mins + OPEN;
      r.closeLabel = closeToday > 24 * 60 ? '01:00' : '00:00';
    }
    r.arcEnd = (r.closeLabel === '01:00') ? 390 : 360;
    return r;
  }

  function durShort(min) {
    if (min < 1) return '<1m';
    if (min < 60) return min + 'm';
    var h = Math.floor(min / 60), m = min % 60;
    return h + 'h' + (m ? ' ' + pad(m) + 'm' : '');
  }

  var RING_LEN = 276.46;

  function dur(min) {
    if (min < 1) return 'menos de 1 min';
    if (min < 60) return min + ' min';
    var h = Math.floor(min / 60), m = min % 60;
    return h + ' h' + (m ? ' ' + pad(m) + ' min' : '');
  }

  /* Geometría del arco de servicio sobre el bisel (radio 178). Ángulos en grados desde las 12, sentido horario. */
  function arc(a0, a1) {
    var r = 162, rad = Math.PI / 180;
    var x0 = r * Math.sin(a0 * rad), y0 = -r * Math.cos(a0 * rad);
    var x1 = r * Math.sin(a1 * rad), y1 = -r * Math.cos(a1 * rad);
    var large = (a1 - a0) > 180 ? 1 : 0;
    return 'M' + x0.toFixed(2) + ' ' + y0.toFixed(2) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(2) + ' ' + y1.toFixed(2);
  }

  var cur = null, lastSec = -1, lastMinKey = '', visible = true, raf = 0, timer = 0;

  function setStatus(sv) {
    root.classList.toggle('hx--open', sv.open);
    root.classList.toggle('hx--closed', !sv.open);
    var state = sv.open ? 'Abierto ahora' : 'Cerrado';
    var detail = sv.open
      ? 'Cerramos a las ' + sv.closeLabel + ' · quedan ' + dur(sv.left)
      : 'Abrimos a las 19:00 · faltan ' + dur(sv.left);
    if (el.state.textContent !== state) el.state.textContent = state;
    if (el.detail.textContent !== detail) el.detail.textContent = detail;
    var pct = sv.open ? Math.min(1, Math.max(0, sv.elapsed / sv.total)) : 0;
    el.ring.setAttribute('stroke-dasharray', (pct * RING_LEN).toFixed(1) + ' ' + RING_LEN);
    el.ringVal.textContent = durShort(sv.left);
    el.ringSub.textContent = sv.open ? 'para cerrar' : 'para abrir';
    for (var i = 0; i < days.length; i++) {
      var on = days[i].getAttribute('data-group') === sv.group;
      days[i].classList.toggle('is-today', on);
      days[i].classList.toggle('is-open', on && sv.open);
      var tag = days[i].querySelector('.hx-day__tag');
      if (tag) tag.textContent = on ? (sv.open ? 'En servicio' : 'Hoy') : '';
    }
    /* Arco del bisel: ventana completa y tramo transcurrido */
    var a0 = 210;
    el.win.setAttribute('d', arc(a0, sv.arcEnd));
    if (sv.open) {
      var nowAng = a0 + sv.elapsed / 2;       // 1 min = .5° en un dial de 12 h
      var d = arc(a0, Math.max(a0 + 0.4, nowAng));
      el.elapsed.setAttribute('d', d);
      el.glow.setAttribute('d', d);
      el.elapsed.style.display = el.glow.style.display = '';
    } else {
      el.elapsed.style.display = el.glow.style.display = 'none';
    }
  }

  function minuteUpdate(c, t) {
    var key = c.d + ':' + c.h + ':' + c.m;
    if (key === lastMinKey) return;
    lastMinKey = key;
    var dt = fmtDate.format(new Date(t));
    var cap = dt.charAt(0).toUpperCase() + dt.slice(1);
    el.date.textContent = cap;
    var sp = {};
    fmtShort.formatToParts(new Date(t)).forEach(function (i) { sp[i.type] = i.value; });
    var wd = (sp.weekday || '').replace('.', '').slice(0, 3);
    var mo = (sp.month || '').replace('.', '').slice(0, 3);
    el.pill.textContent = (wd + ' ' + sp.day + ' ' + mo).toUpperCase();
    setStatus(service(c));
    el.clock.setAttribute('aria-label', 'Hora actual en Chile: ' + pad(c.h) + ':' + pad(c.m) + '. ' + cap);
  }

  function secondUpdate(c, t) {
    el.hh.textContent = pad(c.h);
    el.mm.textContent = pad(c.m);
    el.ss.textContent = pad(c.s);
    minuteUpdate(c, t);
  }

  function hands(c, frac) {
    var s = c.s + frac;
    el.sec.setAttribute('transform', 'rotate(' + (s * 6).toFixed(2) + ')');
    el.min.setAttribute('transform', 'rotate(' + ((c.m + s / 60) * 6).toFixed(3) + ')');
    el.hour.setAttribute('transform', 'rotate(' + (((c.h % 12) + (c.m + s / 60) / 60) * 30).toFixed(3) + ')');
  }

  function tick() {
    var t = Date.now();
    var sec = Math.floor(t / 1000);
    if (sec !== lastSec) { lastSec = sec; cur = chile(t); secondUpdate(cur, t); }
    hands(cur, reduced ? 0 : (t % 1000) / 1000);
  }

  function frame() { tick(); raf = window.requestAnimationFrame(frame); }

  function start() {
    stop();
    lastSec = -1;
    tick();
    if (reduced) timer = window.setInterval(tick, 1000);
    else raf = window.requestAnimationFrame(frame);
  }
  function stop() {
    if (raf) { window.cancelAnimationFrame(raf); raf = 0; }
    if (timer) { window.clearInterval(timer); timer = 0; }
  }
  function sync() {
    if (visible && !document.hidden) start(); else stop();
  }

  root.classList.add('hx--live');
  start();

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      sync();
    }, { rootMargin: '120px' }).observe(root);
  }
  document.addEventListener('visibilitychange', sync);
})();
