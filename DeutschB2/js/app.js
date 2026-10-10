/* =====================================================================
   Deutsch B2 — application d'apprentissage de l'allemand (0 → B2)
   100% hors-ligne · progression sauvegardée dans le navigateur
   ===================================================================== */
'use strict';

/* ---------------------------- Utilitaires ---------------------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const LEVELS = ['A1', 'A2', 'B1', 'B2'];
const PRON = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
const ART = { m: 'der', f: 'die', n: 'das', p: 'die' };

function today() { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function addDays(s, n) { const [y, m, d] = s.split('-').map(Number); const t = new Date(y, m - 1, d + n); return t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate()); }
function diffDays(a, b) { const p = s => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); }; return Math.round((p(b) - p(a)) / 864e5); }
function shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function sample(a, n) { return shuffle(a).slice(0, n); }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function seeded(str) { let h = 0; for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

function norm(s) {
  return String(s).toLowerCase().normalize('NFC')
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[.,!?;:"«»()–\-]/g, ' ').replace(/\s+/g, ' ').trim();
}
function lev(a, b) {
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
/* Vérifie une réponse : accepte ä=ae, majuscules, ponctuation ; tolère 1 faute de frappe sur les mots longs */
function check(input, answers) {
  const n = norm(input);
  if (!n) return { ok: false };
  for (const a of answers) if (norm(a) === n) return { ok: true };
  for (const a of answers) { const na = norm(a); if (na.length > 5 && lev(na, n) === 1) return { ok: true, typo: a }; }
  return { ok: false };
}
const sayText = s => String(s).replace(/\(.*?\)/g, '').replace(/\.\.\./g, ' ').replace(/___/g, ' ').replace(/\s+/g, ' ').trim();
const bare = de => de.replace(/^(der|die|das) /, '');

/* ---------------------------- Données ---------------------------- */
const WORDS = [], WBY = {}, THEME_BY = {};
function mkWord(id, e, de, pl, fr, xd, xf, lvl, theme) {
  let g = null;
  if (pl) { const m = de.match(/^(der|die|das) /); if (m) g = pl === 'PL' ? 'p' : { der: 'm', die: 'f', das: 'n' }[m[1]]; }
  return { id, e: e || '📝', de, pl: pl || '', fr, xd: xd || '', xf: xf || '', lvl, theme, g };
}
VOCAB_THEMES.forEach(t => {
  THEME_BY[t.id] = t; t.words = [];
  t.w.trim().split('\n').forEach((line, i) => {
    const [e, de, pl, fr, xd, xf] = line.split('|').map(s => (s || '').trim());
    if (!de) return;
    const w = mkWord(t.id + '-' + i, e, de, pl, fr, xd, xf, t.lvl, t.id);
    t.words.push(w); WORDS.push(w); WBY[w.id] = w;
  });
});
const CUSTOM_THEME = { id: 'custom', lvl: 'Moi', t: 'Mes mots', i: '⭐', words: [] };
THEME_BY.custom = CUSTOM_THEME;
const LESSON_BY = {}; GRAMMAR.forEach(l => LESSON_BY[l.id] = l);
const ALL_PHRASES = PHRASES.flatMap(c => c.p.map(p => ({ de: p[0], fr: p[1], lvl: c.lvl, c: c.c })));

/* ---------------------------- État (sauvegarde) ---------------------------- */
const KEY = 'deutschb2-v1';
function defaults() {
  return {
    start: today(), autoWeek: 0,
    settings: { rate: 0.9, newPerDay: 20, dir: 'fr-de', voice: '', src: 'week', dark: null, labels: false },
    srs: {}, active: {}, weekTasks: {}, lessons: {}, tests: {}, xp: 0, hist: {}, custom: [], journal: {}, photos: {}
  };
}
let S;
try { S = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); S.settings = Object.assign(defaults().settings, S.settings); }
catch (e) { S = defaults(); }
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { toast('⚠️ Espace de stockage plein : supprime quelques photos.'); }
}
function day(d = today()) { return S.hist[d] || (S.hist[d] = { rev: 0, q: 0, ok: 0, xp: 0, min: 0, newc: 0, tasks: {} }); }
function addXP(n) { S.xp += n; day().xp += n; updateHeader(); }
function stat(ok) { const d = day(); d.q++; if (ok) d.ok++; }

function rebuildCustom() {
  for (const w of CUSTOM_THEME.words) delete WBY[w.id];
  CUSTOM_THEME.words = S.custom.map(c => mkWord(c.id, c.e, c.de, c.pl, c.fr, c.xd, c.xf, 'Moi', 'custom'));
  for (const w of CUSTOM_THEME.words) WBY[w.id] = w;
}
rebuildCustom();
const allWords = () => WORDS.concat(CUSTOM_THEME.words);

function curWeek() { return Math.min(16, Math.max(1, Math.floor(diffDays(S.start, today()) / 7) + 1)); }
function curLevel() { return PLAN[curWeek() - 1].lvl; }
function autoActivate() {
  const cw = curWeek();
  if ((S.autoWeek || 0) < cw) {
    PLAN.filter(p => p.w > (S.autoWeek || 0) && p.w <= cw).forEach(p => p.th.forEach(t => S.active[t] = true));
    S.autoWeek = cw; save();
  }
}

/* ---------------------------- Audio (synthèse vocale) ---------------------------- */
let VOICES = [];
function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  VOICES = speechSynthesis.getVoices().filter(v => /^de/i.test(v.lang));
}
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function bestVoice() {
  if (S.settings.voice) { const v = VOICES.find(v => v.name === S.settings.voice); if (v) return v; }
  return VOICES.find(v => /natural|online|neural/i.test(v.name)) || VOICES.find(v => /google/i.test(v.name)) || VOICES.find(v => v.lang === 'de-DE') || VOICES[0];
}
let warnedVoice = false;
function speak(text, rate) {
  if (!('speechSynthesis' in window)) { toast("🔇 Audio indisponible dans ce navigateur. Utilise Chrome ou Edge."); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(sayText(text));
  u.lang = 'de-DE'; u.rate = rate || S.settings.rate;
  const v = bestVoice(); if (v) u.voice = v;
  else if (!warnedVoice) { warnedVoice = true; toast("ℹ️ Aucune voix allemande trouvée : voir Paramètres → Audio."); }
  speechSynthesis.speak(u);
}
const spk = (t, cls = '') => `<button class="spk ${cls}" data-say="${esc(t)}" title="Écouter">🔊</button>`;

/* ---------------------------- Répétition espacée (SRS) ---------------------------- */
function isLearned(id) { const c = S.srs[id]; return c && c.iv >= 1; }
function isMastered(id) { const c = S.srs[id]; return c && c.iv >= 21; }
function dueCards() {
  const t = today();
  return Object.keys(S.srs).filter(id => WBY[id] && S.srs[id].due <= t).sort((a, b) => S.srs[a].due.localeCompare(S.srs[b].due));
}
function activeWords() { return allWords().filter(w => w.theme === 'custom' || S.active[w.theme]); }
function newCards() {
  const left = Math.max(0, S.settings.newPerDay - day().newc);
  const order = [...LEVELS, 'Moi'];
  return activeWords().filter(w => !S.srs[w.id]).sort((a, b) => order.indexOf(a.lvl) - order.indexOf(b.lvl)).slice(0, left).map(w => w.id);
}
function nextIv(c, q) {
  if (!c) c = { iv: 0, ef: 2.5, reps: 0 };
  if (q === 0) return 0;
  if (c.reps === 0 || c.iv === 0) return [0, 1, 1, 3][q] + (c.reps > 0 && q === 3 ? 1 : 0);
  if (q === 1) return Math.max(1, Math.round(c.iv * 1.2));
  if (q === 2) return Math.max(c.iv + 1, Math.round(c.iv * c.ef));
  return Math.max(c.iv + 2, Math.round(c.iv * c.ef * 1.3));
}
function grade(id, q) {
  const isNew = !S.srs[id];
  const c = S.srs[id] || { iv: 0, ef: 2.5, reps: 0, lapses: 0 };
  const iv = nextIv(c, q);
  if (q === 0) { if (c.reps > 0 && c.iv > 0) c.lapses++; c.ef = Math.max(1.3, c.ef - 0.2); }
  if (q === 1) c.ef = Math.max(1.3, c.ef - 0.15);
  if (q === 3) c.ef = Math.min(3, c.ef + 0.15);
  c.iv = iv; c.reps++; c.due = addDays(today(), iv); c.last = today();
  S.srs[id] = c;
  const d = day(); d.rev++; if (isNew) d.newc++;
  stat(q >= 2); addXP(q >= 2 ? 2 : 1); save();
}
const ivLabel = n => n === 0 ? '< 10 min' : n === 1 ? '1 jour' : n < 30 ? n + ' jours' : Math.round(n / 30) + ' mois';

/* ---------------------------- Affichage des mots ---------------------------- */
function wImg(w, cls = '') {
  const p = S.photos[w.id];
  return p ? `<img class="wimg ${cls}" src="${p}" alt="">` : `<span class="wemo ${cls}">${w.e}</span>`;
}
function deHTML(w) {
  if (w.g) { const art = w.de.match(/^(der|die|das)/)[1]; return `<span class="${w.g}"><b>${art}</b> ${esc(bare(w.de))}</span>`; }
  return esc(w.de);
}
function plHTML(w) {
  if (!w.g) return '';
  if (w.pl === 'PL') return `<span class="pl">toujours au pluriel</span>`;
  if (w.pl === '-') return `<span class="pl">pas de pluriel</span>`;
  return `<span class="pl">pl. <span class="p">die ${esc(w.pl)}</span></span>`;
}
function statusBadge(id) {
  const c = S.srs[id];
  if (!c) return '<span class="badge b-new">nouveau</span>';
  if (c.iv >= 21) return '<span class="badge b-ok">maîtrisé</span>';
  return '<span class="badge b-mid">en cours</span>';
}

/* ---------------------------- Interface générale ---------------------------- */
const view = () => $('#view');
let keyHandler = null;
function toast(msg, ms = 2600) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  $('#toasts').appendChild(t); setTimeout(() => t.remove(), ms);
}
function streak() {
  let n = 0, d = today();
  if (!(S.hist[d] && (S.hist[d].rev || S.hist[d].q))) d = addDays(d, -1);
  while (S.hist[d] && (S.hist[d].rev || S.hist[d].q || S.hist[d].xp)) { n++; d = addDays(d, -1); }
  return n;
}
function updateHeader() {
  const el = $('#hdr-stats'); if (!el) return;
  el.innerHTML = `<span title="Jours d'affilée">🔥 ${streak()}</span><span title="Points d'expérience">⭐ ${S.xp} XP</span><span title="Cartes à réviser">🔁 ${dueCards().length}</span>`;
}
function umlautBar() { return `<div class="uml">${['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map(c => `<button type="button" data-uml="${c}">${c}</button>`).join('')}</div>`; }
let lastInput = null;
document.addEventListener('focusin', e => { if (e.target.matches('input[type=text], textarea')) lastInput = e.target; });

document.addEventListener('click', e => {
  const s = e.target.closest('[data-say]'); if (s) { e.preventDefault(); speak(s.dataset.say); return; }
  const u = e.target.closest('[data-uml]');
  if (u && lastInput) {
    const i = lastInput, p = i.selectionStart ?? i.value.length;
    i.value = i.value.slice(0, p) + u.dataset.uml + i.value.slice(i.selectionEnd ?? p);
    i.focus(); i.setSelectionRange(p + 1, p + 1); i.dispatchEvent(new Event('input'));
  }
});
document.addEventListener('keydown', e => { if (keyHandler) keyHandler(e); });
let lastAct = Date.now();
['click', 'keydown', 'mousemove', 'touchstart'].forEach(ev => document.addEventListener(ev, () => lastAct = Date.now(), { passive: true }));
setInterval(() => { if (document.visibilityState === 'visible' && Date.now() - lastAct < 120000) { day().min++; save(); } }, 60000);

/* Fenêtre de confirmation intégrée (les popups du navigateur sont parfois bloquées) */
function ask(msg, okLabel = 'Confirmer') {
  return new Promise(res => {
    const d = document.createElement('div'); d.className = 'modal';
    d.innerHTML = `<div class="card mbox"><p>${esc(msg)}</p><div class="row gap center"><button class="btn" data-a="0">Annuler</button><button class="btn primary danger-fill" data-a="1">${esc(okLabel)}</button></div></div>`;
    d.onclick = e => { const b = e.target.closest('[data-a]'); if (b || e.target === d) { d.remove(); res(!!(b && b.dataset.a === '1')); } };
    document.body.appendChild(d); d.querySelector('[data-a="1"]').focus();
  });
}

/* ---------------------------- Routeur ---------------------------- */
const NAV = [
  ['dashboard', '🏠', 'Accueil'], ['plan', '🗓️', 'Programme 16 sem.'], ['review', '🔁', 'Révisions'],
  ['vocab', '🖼️', 'Vocabulaire'], ['visuel', '🏞️', 'Dictionnaire visuel'], ['grammar', '📘', 'Grammaire'],
  ['conj', '🔀', 'Conjugaison'], ['exercises', '🎮', 'Exercices & jeux'], ['phrases', '💬', 'Phrases utiles'],
  ['speak', '🎤', 'Prononciation'], ['journal', '✍️', 'Journal'], ['tests', '🏆', 'Tests de niveau'],
  ['stats', '📊', 'Statistiques'], ['settings', '⚙️', 'Paramètres']
];
function route() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  keyHandler = null;
  const [page, ...args] = (location.hash.replace(/^#\/?/, '') || 'dashboard').split('/');
  $$('#nav a').forEach(a => a.classList.toggle('on', a.dataset.p === page || (a.dataset.p === 'vocab' && page === 'theme') || (a.dataset.p === 'grammar' && page === 'lesson') || (a.dataset.p === 'exercises' && page === 'quiz')));
  const fn = PAGES[page] || PAGES.dashboard;
  view().scrollTop = 0; window.scrollTo(0, 0);
  fn(...args.map(decodeURIComponent));
  document.body.classList.remove('nav-open');
  updateHeader();
}
window.addEventListener('hashchange', route);

/* =====================================================================
   PAGES
   ===================================================================== */
const PAGES = {};

/* ---------------------------- Accueil ---------------------------- */
PAGES.dashboard = () => {
  autoActivate();
  const cw = curWeek(), wk = PLAN[cw - 1], dnum = Math.min(112, diffDays(S.start, today()) + 1);
  const due = dueCards().length, nw = newCards().length, d = day();
  const pool = activeWords().length ? activeWords() : WORDS;
  const wod = pool[seeded(today()) % pool.length];
  const tip = TIPS[seeded(today() + 't') % TIPS.length];
  if (due === 0 && d.rev > 0) d.tasks.srs = true;
  const learned = Object.keys(S.srs).filter(isLearned).length;
  const lvlBars = LEVELS.map(l => {
    const ws = WORDS.filter(w => w.lvl === l), ls = GRAMMAR.filter(g => g.lvl === l);
    const pw = Math.round(ws.filter(w => isLearned(w.id)).length / ws.length * 100);
    const pg = Math.round(ls.filter(g => S.lessons[g.id]).length / ls.length * 100);
    const p = Math.round(pw * 0.5 + pg * 0.3 + (S.tests[l]?.best >= 70 ? 20 : 0));
    return `<div class="lvlrow"><b class="lv lv-${l}">${l}</b><div class="bar"><i style="width:${p}%"></i></div><span>${p}%</span></div>`;
  }).join('');
  view().innerHTML = `
  <section class="hero">
    <div>
      <div class="kicker">Semaine ${cw} / 16 · Jour ${dnum} · Niveau visé : <b class="lv lv-${wk.lvl}">${wk.lvl}</b></div>
      <h1>Willkommen! 👋</h1>
      <p class="sub">${esc(wk.t)} — ${esc(wk.goal)}</p>
      <div class="bar big"><i style="width:${Math.round(dnum / 112 * 100)}%"></i></div>
      <div class="row gap">
        <a class="btn primary big" href="#/review">▶ Réviser maintenant <span class="pill">${due} à revoir · ${nw} nouveaux</span></a>
        <a class="btn" href="#/plan">Voir le programme</a>
      </div>
    </div>
    <div class="flag" aria-hidden="true"><i></i><i></i><i></i></div>
  </section>
  <div class="grid3">
    <div class="card stat"><div class="big">🔥 ${streak()}</div><div>jours d'affilée</div></div>
    <div class="card stat"><div class="big">🧠 ${learned}</div><div>mots appris</div></div>
    <div class="card stat"><div class="big">⏱️ ${d.min} min</div><div>étudiées aujourd'hui</div></div>
  </div>
  <div class="grid2">
    <div class="card">
      <h2>✅ Ma routine du jour <small>(~4 h)</small></h2>
      <ul class="checks" id="routine">${ROUTINE.map(r => `<li><label><input type="checkbox" data-r="${r.id}" ${d.tasks[r.id] ? 'checked' : ''}> ${r.i} <a href="${r.link}">${esc(r.t)}</a> <small>${r.d}</small></label></li>`).join('')}</ul>
      <p class="muted small">Pour passer de 0 à B2 en 4 mois, il faut environ 450–600 heures : vise <b>4 h par jour, 6 jours sur 7</b>.</p>
    </div>
    <div class="card wod">
      <h2>🌟 Mot du jour</h2>
      <div class="wodbox">${wImg(wod, 'xl')}<div><div class="wde">${deHTML(wod)} ${spk(wod.de)}</div><div class="wfr">${esc(wod.fr)}</div>${plHTML(wod)}
      ${wod.xd ? `<p class="ex"><i>${esc(wod.xd)}</i> ${spk(wod.xd, 'sm')}<br><small>${esc(wod.xf)}</small></p>` : ''}</div></div>
      <div class="tip">💡 <b>Astuce du jour :</b> ${esc(tip)}</div>
    </div>
  </div>
  <div class="grid2">
    <div class="card">
      <h2>📘 Grammaire de la semaine</h2>
      <ul class="links">${wk.g.map(id => { const l = LESSON_BY[id]; return `<li><a href="#/lesson/${id}">${l.i} ${esc(l.t)}</a> ${S.lessons[id] ? '<span class="badge b-ok">✓ ' + S.lessons[id].score + '%</span>' : ''}</li>`; }).join('')}</ul>
      <h2>🖼️ Vocabulaire de la semaine</h2>
      <div class="chips">${wk.th.map(id => `<a class="chip" href="#/theme/${id}">${THEME_BY[id].i} ${esc(THEME_BY[id].t)}</a>`).join('')}</div>
    </div>
    <div class="card"><h2>📈 Ma progression par niveau</h2>${lvlBars}
      <p class="muted small">Calcul : 50% vocabulaire appris + 30% leçons réussies + 20% test de niveau.</p>
      <a class="btn" href="#/stats">Statistiques détaillées</a></div>
  </div>`;
  $$('#routine input').forEach(c => c.onchange = () => { day().tasks[c.dataset.r] = c.checked; if (c.checked) { addXP(5); toast('Super ! +5 XP'); } save(); });
};

/* ---------------------------- Programme ---------------------------- */
PAGES.plan = () => {
  const cw = curWeek();
  view().innerHTML = `<h1>🗓️ Programme intensif : 0 → B2 en 16 semaines</h1>
  <p class="sub">Semaines 1–4 : <b class="lv lv-A1">A1</b> · 5–8 : <b class="lv lv-A2">A2</b> · 9–12 : <b class="lv lv-B1">B1</b> · 13–16 : <b class="lv lv-B2">B2</b>. Les thèmes de vocabulaire de chaque semaine sont ajoutés automatiquement à tes révisions.
  Date de début : <b>${S.start}</b> (modifiable dans les Paramètres).</p>
  ${PLAN.map(p => {
    const done = p.tasks.filter((_, i) => S.weekTasks[p.w + '-' + i]).length;
    return `<details class="card week ${p.w === cw ? 'current' : ''} ${p.w < cw ? 'past' : ''}" ${p.w === cw ? 'open' : ''}>
    <summary><b class="lv lv-${p.lvl}">${p.lvl}</b> <span class="wk">Semaine ${p.w}</span> ${esc(p.t)} <span class="muted">${done}/${p.tasks.length}</span> ${p.w === cw ? '<span class="badge b-mid">en cours</span>' : ''}</summary>
    <p><b>🎯 Objectif :</b> ${esc(p.goal)}</p>
    <div class="grid2">
      <div><h3>📘 Grammaire</h3><ul class="links">${p.g.map(id => `<li><a href="#/lesson/${id}">${LESSON_BY[id].i} ${esc(LESSON_BY[id].t)}</a> ${S.lessons[id] ? '✅' : ''}</li>`).join('')}</ul>
      <h3>🖼️ Vocabulaire</h3><div class="chips">${p.th.map(id => `<a class="chip" href="#/theme/${id}">${THEME_BY[id].i} ${esc(THEME_BY[id].t)} <small>(${THEME_BY[id].words.length})</small></a>`).join('')}</div>
      <button class="btn sm" data-act="${p.w}">➕ Ajouter ces thèmes à mes révisions</button></div>
      <div><h3>✅ Tâches de la semaine</h3><ul class="checks">${p.tasks.map((t, i) => `<li><label><input type="checkbox" data-wt="${p.w}-${i}" ${S.weekTasks[p.w + '-' + i] ? 'checked' : ''}> ${esc(t)}</label></li>`).join('')}</ul>
      <h3>🔗 Ressources gratuites</h3><ul class="links">${p.res.map(r => RES[r].u ? `<li><a href="${RES[r].u}" target="_blank" rel="noopener">${esc(RES[r].n)} ↗</a></li>` : `<li>${esc(RES[r].n)}</li>`).join('')}</ul></div>
    </div></details>`;
  }).join('')}`;
  $$('[data-wt]').forEach(c => c.onchange = () => { S.weekTasks[c.dataset.wt] = c.checked; if (c.checked) addXP(10); save(); });
  $$('[data-act]').forEach(b => b.onclick = () => { PLAN[b.dataset.act - 1].th.forEach(t => S.active[t] = true); save(); toast('Thèmes ajoutés aux révisions ✔'); });
};

/* ---------------------------- Révisions (cartes) ---------------------------- */
PAGES.review = () => {
  autoActivate();
  let queue = [...dueCards(), ...newCards()];
  const total = queue.length; let done = 0, good = 0;
  if (!total) {
    view().innerHTML = `<div class="card center"><div class="huge">🎉</div><h1>Rien à réviser pour le moment !</h1>
    <p>Tu as fini tes cartes du jour${day().newc ? ` (${day().newc} nouveaux mots appris aujourd'hui)` : ''}.</p>
    <div class="row gap center"><a class="btn primary" href="#/exercises">🎮 Faire des exercices</a><a class="btn" href="#/vocab">➕ Activer d'autres thèmes</a><button class="btn" id="more">+10 nouveaux mots</button></div></div>`;
    $('#more').onclick = () => { S.settings.newPerDay += 10; save(); toast('Limite du jour augmentée'); route(); };
    return;
  }
  const dir = S.settings.dir;
  function show() {
    if (!queue.length) {
      view().innerHTML = `<div class="card center"><div class="huge">🏁</div><h1>Session terminée !</h1>
      <p>${done} cartes révisées · ${Math.round(good / Math.max(1, done) * 100)}% de bonnes réponses</p>
      <div class="row gap center"><a class="btn primary" href="#/exercises">🎮 Continuer avec un jeu</a><a class="btn" href="#/">Accueil</a></div></div>`;
      day().tasks.srs = true; save(); keyHandler = null; return;
    }
    const id = queue[0], w = WBY[id], isNew = !S.srs[id];
    const front = dir === 'fr-de' ? `<div class="cfr">${esc(w.fr)}</div><p class="muted">Comment dit-on en allemand ?${w.g ? ' (avec l\'article !)' : ''}</p>`
      : `<div class="cde">${deHTML(w)}</div>`;
    view().innerHTML = `
    <div class="revtop"><span>${isNew ? '<span class="badge b-new">nouveau mot</span>' : '<span class="badge b-mid">révision</span>'} · ${THEME_BY[w.theme].i} ${esc(THEME_BY[w.theme].t)}</span><span>${done} / ${total}</span></div>
    <div class="bar"><i style="width:${done / total * 100}%"></i></div>
    <div class="card flash">
      <div class="fimg">${wImg(w, 'xxl')}</div>
      ${front}
      <div id="ansbox">${dir === 'fr-de' ? `<input type="text" id="typ" placeholder="Écris ta réponse (facultatif) puis Entrée" autocomplete="off">${umlautBar()}` : ''}
      <button class="btn primary big" id="reveal">Afficher la réponse <kbd>Espace</kbd></button></div>
      <div id="back" hidden></div>
    </div>`;
    if (dir === 'de-fr') speak(w.de);
    const typ = $('#typ'); if (typ) typ.focus();
    let revealed = false;
    function reveal() {
      if (revealed) return; revealed = true;
      let verdict = '';
      if (typ && typ.value.trim()) {
        const r = check(typ.value, [w.de, sayText(w.de)]);
        const r2 = !r.ok && w.g ? check(typ.value, [bare(w.de)]) : null;
        verdict = r.ok ? `<div class="ok">✅ Correct !${r.typo ? ' (petite faute)' : ''}</div>` : r2 && r2.ok ? `<div class="warn">⚠️ Presque : n'oublie pas l'article <b>${ART[w.g]}</b> !</div>` : `<div class="ko">❌ Ta réponse : ${esc(typ.value)}</div>`;
      }
      const c = S.srs[id];
      $('#ansbox').hidden = true;
      $('#back').hidden = false;
      $('#back').innerHTML = `${verdict}
        <div class="cde">${deHTML(w)} ${spk(w.de)}</div>${plHTML(w)}
        <div class="cfr2">${esc(w.fr)}</div>
        ${w.xd ? `<p class="ex"><i>${esc(w.xd)}</i> ${spk(w.xd, 'sm')}<br><small>${esc(w.xf)}</small></p>` : ''}
        <div class="grades">
          <button class="g0" data-q="0">😵 Encore<small>${ivLabel(nextIv(c, 0))}</small><kbd>1</kbd></button>
          <button class="g1" data-q="1">😓 Difficile<small>${ivLabel(nextIv(c, 1))}</small><kbd>2</kbd></button>
          <button class="g2" data-q="2">🙂 Bien<small>${ivLabel(nextIv(c, 2))}</small><kbd>3</kbd></button>
          <button class="g3" data-q="3">😎 Facile<small>${ivLabel(nextIv(c, 3))}</small><kbd>4</kbd></button>
        </div>`;
      if (dir === 'fr-de') speak(w.de);
      $$('.grades button').forEach(b => b.onclick = () => rate(+b.dataset.q));
    }
    function rate(q) {
      grade(id, q); done++; if (q >= 2) good++;
      queue.shift();
      if (q === 0) queue.splice(Math.min(3, queue.length), 0, id);
      show();
    }
    $('#reveal').onclick = reveal;
    keyHandler = e => {
      if (!revealed) {
        if (e.key === 'Enter' || (e.key === ' ' && e.target.tagName !== 'INPUT')) { e.preventDefault(); reveal(); }
      } else if (['1', '2', '3', '4'].includes(e.key)) rate(+e.key - 1);
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); rate(2); }
    };
  }
  show();
};

/* ---------------------------- Vocabulaire ---------------------------- */
PAGES.vocab = () => {
  const card = t => {
    const n = t.words.length, l = t.words.filter(w => isLearned(w.id)).length;
    return `<a class="tcard ${S.active[t.id] || t.id === 'custom' ? 'act' : ''}" href="#/theme/${t.id}"><span class="ti">${t.i}</span><b>${esc(t.t)}</b><small>${l} / ${n} appris</small><div class="bar"><i style="width:${n ? l / n * 100 : 0}%"></i></div>${S.active[t.id] ? '<span class="dot" title="Dans mes révisions">●</span>' : ''}</a>`;
  };
  view().innerHTML = `<h1>🖼️ Vocabulaire illustré <small class="muted">${WORDS.length} mots</small></h1>
  <input type="text" id="search" class="search" placeholder="🔍 Rechercher un mot (allemand ou français)...">
  <div id="sres"></div>
  <p class="muted">● = thème ajouté à tes révisions quotidiennes. <span class="m">Bleu = der</span> · <span class="f">Rouge = die</span> · <span class="n">Vert = das</span> · <span class="p">Violet = pluriel</span></p>
  <h2>⭐ Mes mots</h2><div class="tgrid">${card(CUSTOM_THEME)}</div>
  ${LEVELS.map(l => `<h2><b class="lv lv-${l}">${l}</b></h2><div class="tgrid">${VOCAB_THEMES.filter(t => t.lvl === l).map(card).join('')}</div>`).join('')}`;
  $('#search').oninput = e => {
    const q = norm(e.target.value);
    if (q.length < 2) { $('#sres').innerHTML = ''; return; }
    const r = allWords().filter(w => norm(w.de).includes(q) || norm(w.fr).includes(q)).slice(0, 30);
    $('#sres').innerHTML = `<div class="wgrid">${r.map(wordCard).join('') || '<p class="muted">Aucun résultat.</p>'}</div>`;
  };
};
function wordCard(w) {
  return `<div class="wcard" data-id="${w.id}">
    <div class="wpic">${wImg(w, 'lg')}<button class="photo" data-photo="${w.id}" title="Ajouter ma propre photo">📷</button></div>
    <div class="wde">${deHTML(w)} ${spk(w.de, 'sm')}</div>${plHTML(w)}
    <div class="wfr">${esc(w.fr)}</div>
    ${w.xd ? `<div class="ex small"><i>${esc(w.xd)}</i> ${spk(w.xd, 'sm')}<br><span class="muted">${esc(w.xf)}</span></div>` : ''}
    ${statusBadge(w.id)}
  </div>`;
}
/* Photos personnelles (redimensionnées pour ne pas remplir la mémoire) */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-photo]'); if (!b) return;
  const id = b.dataset.photo;
  if (S.photos[id]) { ask('Supprimer ta photo pour ce mot ?', 'Supprimer').then(ok => { if (ok) { delete S.photos[id]; save(); route(); } }); return; }
  const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
  inp.onchange = () => {
    const f = inp.files[0]; if (!f) return;
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, 240 / Math.max(img.width, img.height));
        const c = document.createElement('canvas'); c.width = img.width * k; c.height = img.height * k;
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        S.photos[id] = c.toDataURL('image/jpeg', 0.8); save(); toast('📷 Photo ajoutée !'); route();
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  };
  inp.click();
});

PAGES.theme = id => {
  const t = THEME_BY[id]; if (!t) return PAGES.vocab();
  const isCustom = id === 'custom';
  view().innerHTML = `<a href="#/vocab" class="back">← Tous les thèmes</a>
  <h1>${t.i} ${esc(t.t)} <b class="lv lv-${t.lvl}">${t.lvl}</b></h1>
  <div class="row gap">
    ${isCustom ? '' : `<button class="btn ${S.active[id] ? '' : 'primary'}" id="act">${S.active[id] ? '✔ Dans mes révisions (retirer)' : '➕ Ajouter à mes révisions'}</button>`}
    <a class="btn" href="#/quiz/mc/theme:${id}">🎯 Quiz</a>
    <a class="btn" href="#/quiz/type/theme:${id}">⌨️ Écrire</a>
    ${t.words.some(w => w.g && w.g !== 'p') ? `<a class="btn" href="#/quiz/article/theme:${id}">🎨 Der/Die/Das</a>` : ''}
    <a class="btn" href="#/quiz/memory/theme:${id}">🧩 Paires</a>
    <button class="btn" id="all">🔊 Tout écouter</button>
  </div>
  ${isCustom ? `<div class="card"><h3>➕ Ajouter un mot</h3><p class="muted small">Pour un nom, écris l'article (ex. « der Stift ») et le pluriel. Tu peux ensuite ajouter une photo avec 📷.</p>
  <div class="form"><input type="text" id="c-e" placeholder="Emoji (facultatif)" maxlength="4" style="width:6em"><input type="text" id="c-de" placeholder="Allemand"><input type="text" id="c-pl" placeholder="Pluriel (noms)"><input type="text" id="c-fr" placeholder="Français"><input type="text" id="c-xd" placeholder="Exemple en allemand (facultatif)"><button class="btn primary" id="c-add">Ajouter</button></div>${umlautBar()}</div>` : ''}
  <div class="wgrid">${t.words.map(w => wordCard(w) + (isCustom ? `<button class="btn sm danger delw" data-del="${w.id}">🗑️</button>` : '')).join('') || '<p class="muted">Aucun mot pour l\'instant.</p>'}</div>`;
  if (!isCustom) $('#act').onclick = () => { S.active[id] = !S.active[id]; save(); route(); };
  $('#all').onclick = async () => {
    for (const w of t.words) { speak(w.de); await new Promise(r => setTimeout(r, 1700)); if (!location.hash.includes('/theme/' + id)) break; }
  };
  if (isCustom) {
    $('#c-add').onclick = () => {
      const de = $('#c-de').value.trim(), fr = $('#c-fr').value.trim();
      if (!de || !fr) return toast('Remplis au moins allemand + français');
      let pl = $('#c-pl').value.trim(); if (/^(der|die|das) /.test(de) && !pl) pl = '-';
      S.custom.push({ id: 'c-' + Date.now(), e: $('#c-e').value.trim() || '⭐', de, pl, fr, xd: $('#c-xd').value.trim(), xf: '' });
      rebuildCustom(); save(); toast('Mot ajouté ✔ (il apparaîtra dans tes révisions)'); route();
    };
    $$('[data-del]').forEach(b => b.onclick = async () => { if (!(await ask('Supprimer ce mot ?', 'Supprimer'))) return; S.custom = S.custom.filter(c => c.id !== b.dataset.del); delete S.srs[b.dataset.del]; rebuildCustom(); save(); route(); });
  }
};

/* ---------------------------- Dictionnaire visuel ---------------------------- */
PAGES.visuel = (sid = SCENES[0].id) => {
  const sc = SCENES.find(s => s.id === sid) || SCENES[0];
  view().innerHTML = `<h1>🏞️ Dictionnaire visuel</h1>
  <p class="sub">Clique sur un objet pour entendre son nom. Puis teste-toi avec le mode jeu !</p>
  <div class="chips">${SCENES.map(s => `<a class="chip ${s.id === sc.id ? 'on' : ''}" href="#/visuel/${s.id}">${esc(s.t)} <small>${esc(s.fr)}</small></a>`).join('')}</div>
  <div class="row gap"><label class="tog"><input type="checkbox" id="lbl" ${S.settings.labels ? 'checked' : ''}> Afficher les étiquettes</label>
  <button class="btn primary" id="game">🎮 Mode jeu : trouve l'objet</button></div>
  <div class="scene ${S.settings.labels ? 'labels' : ''}" id="scene" style="background:${sc.bg}">
    ${sc.items.map((it, i) => `<button class="sitem" data-i="${i}" style="left:${it[3]}%;top:${it[4]}%;--s:${it[5]}"><span class="se">${it[0]}</span><span class="sl">${esc(it[1])}</span></button>`).join('')}
    <div class="scap" id="scap">👆 Clique sur un objet</div>
  </div>`;
  let target = null, score = 0, tries = 0;
  const gName = de => { const m = de.match(/^(der|die|das) /); return m ? { der: 'm', die: 'f', das: 'n' }[m[1]] : ''; };
  $('#lbl').onchange = e => { S.settings.labels = e.target.checked; save(); $('#scene').classList.toggle('labels', e.target.checked); };
  $$('.sitem').forEach(b => b.onclick = () => {
    const it = sc.items[b.dataset.i];
    if (target) {
      tries++;
      if (it === target) { score++; b.classList.add('flashok'); stat(true); addXP(2); $('#scap').innerHTML = `✅ Richtig! <b class="${gName(it[1])}">${esc(it[1])}</b> = ${esc(it[2])} · Score ${score}/${tries}`; setTimeout(nextT, 1300); }
      else { b.classList.add('flashko'); stat(false); $('#scap').innerHTML = `❌ Ça c'est <b class="${gName(it[1])}">${esc(it[1])}</b>. Cherche encore : <b>${esc(target[1])}</b> ${spk(target[1], 'sm')}`; }
      setTimeout(() => b.classList.remove('flashok', 'flashko'), 900);
      save(); return;
    }
    speak(it[1]);
    $('#scap').innerHTML = `${it[0]} <b class="${gName(it[1])}">${esc(it[1])}</b> — ${esc(it[2])} ${spk(it[1], 'sm')}`;
  });
  function nextT() { target = pick(sc.items); $('#scap').innerHTML = `🔎 Où est : <b>${esc(target[1])}</b> ? ${spk(target[1], 'sm')}`; speak(target[1]); }
  $('#game').onclick = () => { score = 0; tries = 0; $('#scene').classList.remove('labels'); nextT(); };
};

/* ---------------------------- Grammaire ---------------------------- */
PAGES.grammar = () => {
  view().innerHTML = `<h1>📘 Grammaire <small class="muted">${GRAMMAR.length} leçons, expliquées en français</small></h1>
  <p class="sub">Une leçon est validée quand tu obtiens au moins 70% aux exercices.</p>
  ${LEVELS.map(l => `<h2><b class="lv lv-${l}">${l}</b></h2><div class="lgrid">${GRAMMAR.filter(g => g.lvl === l).map(g => `<a class="lcard ${S.lessons[g.id] ? 'done' : ''}" href="#/lesson/${g.id}"><span class="ti">${g.i}</span><span>${esc(g.t)}</span>${S.lessons[g.id] ? `<span class="badge b-ok">✓ ${S.lessons[g.id].score}%</span>` : ''}</a>`).join('')}</div>`).join('')}`;
};
PAGES.lesson = id => {
  const L = LESSON_BY[id]; if (!L) return PAGES.grammar();
  const idx = GRAMMAR.indexOf(L), prev = GRAMMAR[idx - 1], next = GRAMMAR[idx + 1];
  view().innerHTML = `<a href="#/grammar" class="back">← Toutes les leçons</a>
  <h1>${L.i} ${esc(L.t)} <b class="lv lv-${L.lvl}">${L.lvl}</b></h1>
  <article class="card lesson">${L.html}</article>
  <div class="card"><h2>✏️ Exercices</h2><p class="muted small">Complète les trous. Les accents peuvent s'écrire ae / oe / ue / ss.</p>
  ${umlautBar()}
  <ol class="exlist">${L.ex.map((x, i) => `<li><span class="q">${esc(x[0]).replace(/___/g, `<input type="text" class="gin" data-i="${i}" autocomplete="off">`)}</span><span class="res" id="r${i}"></span></li>`).join('')}</ol>
  <div class="row gap"><button class="btn primary" id="chk">Vérifier</button><button class="btn" id="sol">Voir les solutions</button></div><div id="score"></div></div>
  <div class="row spread">${prev ? `<a class="btn" href="#/lesson/${prev.id}">← ${esc(prev.t)}</a>` : '<span></span>'}${next ? `<a class="btn" href="#/lesson/${next.id}">${esc(next.t)} →</a>` : ''}</div>`;
  $$('.lesson .de').forEach(p => p.insertAdjacentHTML('beforeend', ' ' + spk(p.textContent, 'sm')));
  $$('.lesson .de-i').forEach(p => p.insertAdjacentHTML('beforeend', ' ' + spk(p.textContent, 'sm')));
  // Une question avec plusieurs trous → on concatène les champs
  const answersFor = i => L.ex[i][1].split('/');
  function collect(i) { return $$(`.gin[data-i="${i}"]`).map(x => x.value.trim()).filter(Boolean).join(' '); }
  $('#chk').onclick = () => {
    let ok = 0;
    L.ex.forEach((x, i) => {
      const r = check(collect(i), answersFor(i));
      if (r.ok) ok++;
      stat(r.ok);
      $$(`.gin[data-i="${i}"]`).forEach(inp => inp.className = 'gin ' + (r.ok ? 'good' : 'bad'));
      $('#r' + i).innerHTML = r.ok ? '✅' + (r.typo ? ` <small>(${esc(r.typo)})</small>` : '') : '❌';
    });
    const pct = Math.round(ok / L.ex.length * 100);
    const was = S.lessons[id];
    if (pct >= 70) {
      if (!was) { addXP(20); toast('🎉 Leçon validée ! +20 XP'); }
      S.lessons[id] = { score: Math.max(pct, was?.score || 0), date: today() };
      day().tasks.gram = true;
    }
    save();
    $('#score').innerHTML = `<div class="${pct >= 70 ? 'ok' : 'warn'}">Score : ${ok}/${L.ex.length} (${pct}%) ${pct >= 70 ? '— leçon validée ✔' : '— relis la leçon et réessaie (70% minimum)'}</div>`;
  };
  $('#sol').onclick = () => L.ex.forEach((x, i) => $('#r' + i).innerHTML = `→ <b>${esc(answersFor(i)[0])}</b> ${spk(x[0].replace('___', answersFor(i)[0]).replace(/\(.*?\)|→.*$/g, ''), 'sm')}`);
  $$('.gin').forEach(inp => inp.addEventListener('keydown', e => { if (e.key === 'Enter') $('#chk').click(); }));
};

/* ---------------------------- Conjugaison ---------------------------- */
function presentForms(v) {
  let f;
  if (v.pr) f = v.pr.split(',');
  else {
    const base = v.b || v.inf, st = base.replace(/e?n$/, ''), sib = /[sßzx]$/.test(st);
    f = [st + 'e', st + (sib ? 't' : 'st'), st + 't', base, st + 't', base];
  }
  return v.sep ? f.map(x => x + ' ' + v.sep) : f;
}
function pretForms(v) {
  const x = v.pt; let f;
  if (/e$/.test(x)) f = [x, x + 'st', x, x + 'n', x + 't', x + 'n'];
  else { const td = /[td]$/.test(x), s = /[sßz]$/.test(x); f = [x, x + (td || s ? 'est' : 'st'), x, x + 'en', x + (td ? 'et' : 't'), x + 'en']; }
  return v.sep ? f.map(y => y + ' ' + v.sep) : f;
}
function perfForms(v) {
  const aux = v.aux === 'sein' ? ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'] : ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'];
  return aux.map(a => a + ' ' + v.pp);
}
const TENSES = { pres: ['Présent (Präsens)', presentForms], pret: ['Prétérit (Präteritum)', pretForms], perf: ['Passé composé (Perfekt)', perfForms] };
PAGES.conj = (inf) => {
  const v = VERBS.find(x => x.inf === inf) || VERBS[0];
  view().innerHTML = `<h1>🔀 Conjugaison <small class="muted">${VERBS.length} verbes essentiels</small></h1>
  <div class="row gap"><select id="vsel">${LEVELS.map(l => `<optgroup label="${l}">${VERBS.filter(x => x.lvl === l).map(x => `<option ${x === v ? 'selected' : ''}>${x.inf}</option>`).join('')}</optgroup>`).join('')}</select>
  <a class="btn primary" href="#/quiz/conj">🎯 S'entraîner (toutes les formes)</a><a class="btn" href="#/quiz/conj/pret">Prétérit</a><a class="btn" href="#/quiz/conj/perf">Perfekt</a></div>
  <div class="card"><h2>${esc(v.inf)} ${spk(v.inf)} <small class="muted">— ${esc(v.fr)} · auxiliaire : <b>${v.aux}</b> · ${v.pr || v.sep ? 'irrégulier / particulier' : 'régulier au présent'}</small></h2>
  <div class="grid3">${Object.entries(TENSES).map(([k, [name, fn]]) => { const f = fn(v); return `<div><h3>${name}</h3><table class="tbl conj">${f.map((x, i) => `<tr><td class="muted">${PRON[i]}</td><td><b>${esc(x)}</b> ${spk(PRON[i].split('/')[0] + ' ' + x, 'sm')}</td></tr>`).join('')}</table></div>`; }).join('')}</div>
  <p class="muted small">Futur : ich werde ${esc(v.inf)} · Subjonctif II : ich würde ${esc(v.inf)}</p></div>
  <div class="card"><h2>📋 Liste des formes principales</h2><table class="tbl"><tr><th>Infinitif</th><th>Français</th><th>3e pers. présent</th><th>Prétérit</th><th>Parfait</th></tr>
  ${VERBS.map(x => `<tr><td><a href="#/conj/${x.inf}">${x.inf}</a></td><td>${esc(x.fr)}</td><td>${esc(presentForms(x)[2])}</td><td>${esc(pretForms(x)[0])}</td><td>${x.aux === 'sein' ? 'ist' : 'hat'} ${esc(x.pp)}</td></tr>`).join('')}</table></div>`;
  $('#vsel').onchange = e => location.hash = '#/conj/' + e.target.value;
};

/* ---------------------------- Phrases ---------------------------- */
PAGES.phrases = () => {
  view().innerHTML = `<h1>💬 Phrases utiles</h1><p class="sub">Apprends-les par cœur : ce sont des « blocs » prêts à l'emploi pour parler vite et bien. Écoute, répète à voix haute, puis entraîne-toi avec la dictée et l'ordre des mots.</p>
  <div class="row gap"><a class="btn primary" href="#/quiz/order">🧩 Ordre des mots</a><a class="btn" href="#/quiz/dictation/phrases">🎧 Dictée de phrases</a><a class="btn" href="#/speak">🎤 Prononciation</a></div>
  ${PHRASES.map(c => `<div class="card"><h2>${c.i} ${esc(c.c)} <b class="lv lv-${c.lvl}">${c.lvl}</b></h2><ul class="phr">${c.p.map(p => `<li>${spk(p[0], 'sm')} <b>${esc(p[0])}</b><br><span class="muted">${esc(p[1])}</span></li>`).join('')}</ul></div>`).join('')}`;
};

/* ---------------------------- Prononciation ---------------------------- */
PAGES.speak = () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let src = 'phr', items = [], cur = 0;
  function load() {
    const lvl = curLevel();
    if (src === 'phr') items = shuffle(ALL_PHRASES.filter(p => LEVELS.indexOf(p.lvl) <= LEVELS.indexOf(lvl)));
    else items = shuffle(activeWords().length ? activeWords() : WORDS.filter(w => w.lvl === 'A1')).map(w => ({ de: w.de, fr: w.fr, e: w.e }));
    cur = 0;
  }
  load();
  function draw() {
    const it = items[cur];
    view().innerHTML = `<h1>🎤 Prononciation & shadowing</h1>
    <p class="sub">1) Écoute 🔊 · 2) Répète à voix haute (3 fois) · 3) Clique sur 🎤 et parle : l'ordinateur te dit s'il t'a compris.</p>
    <div class="row gap"><label class="tog"><input type="radio" name="src" value="phr" ${src === 'phr' ? 'checked' : ''}> Phrases</label><label class="tog"><input type="radio" name="src" value="words" ${src === 'words' ? 'checked' : ''}> Mots de mes révisions</label></div>
    <div class="card center flash">
      ${it.e ? `<div class="huge">${it.e}</div>` : ''}
      <div class="cde">${esc(it.de)}</div><div class="muted">${esc(it.fr)}</div>
      <div class="row gap center">
        <button class="btn" id="slow">🐢 Lentement</button><button class="btn primary" id="norm">🔊 Écouter</button>
        <button class="btn mic" id="mic" ${SR ? '' : 'disabled'}>🎤 Parler</button>
      </div>
      <div id="sres"></div>
      ${SR ? '' : `<p class="warn small">La reconnaissance vocale n'est pas disponible ici. Utilise <b>Google Chrome</b> ou <b>Microsoft Edge</b> (avec Internet) pour l'activer. Tu peux quand même t'entraîner : écoute, répète et auto-évalue-toi.</p>`}
      <div class="row gap center"><button class="btn" id="self-ko">😕 À retravailler</button><button class="btn" id="self-ok">👍 Bien prononcé</button><button class="btn" id="nxt">Suivant →</button></div>
    </div>`;
    $$('[name=src]').forEach(r => r.onchange = () => { src = r.value; load(); draw(); });
    $('#slow').onclick = () => speak(it.de, 0.6);
    $('#norm').onclick = () => speak(it.de);
    $('#nxt').onclick = () => { cur = (cur + 1) % items.length; draw(); };
    $('#self-ok').onclick = () => { addXP(2); stat(true); day().tasks.oral = true; save(); $('#nxt').click(); };
    $('#self-ko').onclick = () => { stat(false); save(); $('#nxt').click(); };
    if (SR) $('#mic').onclick = () => {
      const r = new SR(); r.lang = 'de-DE'; r.interimResults = false; r.maxAlternatives = 3;
      $('#mic').classList.add('rec'); $('#sres').innerHTML = '<p>🎙️ Je t\'écoute...</p>';
      r.onresult = e => {
        const alts = [...e.results[0]].map(a => a.transcript);
        const target = norm(sayText(it.de));
        const best = Math.max(...alts.map(a => { const n = norm(a); return 1 - lev(n, target) / Math.max(n.length, target.length); }));
        const pct = Math.round(best * 100);
        stat(pct >= 80); if (pct >= 80) { addXP(3); day().tasks.oral = true; } save();
        $('#sres').innerHTML = `<p>J'ai entendu : « <b>${esc(alts[0])}</b> »</p><div class="${pct >= 80 ? 'ok' : pct >= 55 ? 'warn' : 'ko'}">${pct >= 80 ? '🎉 Ausgezeichnet!' : pct >= 55 ? '🙂 Pas mal, encore un effort !' : '🔁 Réessaie en écoutant bien le modèle.'} (${pct}%)</div>`;
      };
      r.onerror = e => { $('#sres').innerHTML = `<p class="warn">Micro indisponible (${esc(e.error)}). Vérifie l'autorisation du micro et la connexion Internet.</p>`; };
      r.onend = () => $('#mic')?.classList.remove('rec');
      r.start();
    };
    speak(it.de);
  }
  draw();
};

/* ---------------------------- Journal ---------------------------- */
PAGES.journal = () => {
  const t = today(), lvl = curLevel();
  const prompt = PROMPTS[lvl][seeded(t) % PROMPTS[lvl].length];
  const entries = Object.keys(S.journal).sort().reverse();
  view().innerHTML = `<h1>✍️ Mon journal en allemand</h1>
  <p class="sub">Écrire chaque jour fixe la grammaire et le vocabulaire. Vise 5 phrases (A1) → 150-250 mots (B2).</p>
  <div class="card"><h2>📅 ${t}</h2>
  <p>💡 Sujet du jour (${lvl}) : <b>${esc(prompt)}</b> <button class="btn sm" id="other">Autre sujet</button></p>
  ${umlautBar()}
  <textarea id="jt" rows="10" placeholder="Schreib hier...">${esc(S.journal[t]?.text || '')}</textarea>
  <div class="row spread"><span class="muted" id="wc"></span><span class="row gap"><button class="btn" id="jsay">🔊 Écouter mon texte</button><button class="btn primary" id="jsave">💾 Enregistrer</button></span></div>
  <p class="muted small">🔎 Pour corriger tes fautes gratuitement : copie ton texte sur <a href="https://languagetool.org/fr" target="_blank" rel="noopener">LanguageTool ↗</a> (choisis « Allemand »), puis note tes erreurs fréquentes.</p></div>
  <h2>📚 Mes textes précédents (${entries.length})</h2>
  ${entries.filter(d => d !== t).map(d => `<details class="card"><summary><b>${d}</b> · ${S.journal[d].words} mots · <i>${esc(S.journal[d].prompt || '')}</i></summary><p class="jtxt">${esc(S.journal[d].text)}</p>${spk(S.journal[d].text, 'sm')}</details>`).join('') || '<p class="muted">Pas encore de texte.</p>'}`;
  let pr = prompt;
  const wc = () => { const n = ($('#jt').value.match(/\S+/g) || []).length; $('#wc').textContent = n + ' mots'; return n; };
  wc(); $('#jt').oninput = wc;
  $('#other').onclick = () => { pr = pick(PROMPTS[lvl]); $('#other').previousElementSibling.textContent = pr; };
  $('#jsay').onclick = () => speak($('#jt').value);
  $('#jsave').onclick = () => {
    const txt = $('#jt').value.trim(); if (!txt) return;
    const first = !S.journal[t];
    S.journal[t] = { text: txt, words: wc(), prompt: pr };
    day().tasks.ecrit = true;
    if (first) addXP(15);
    save(); toast(first ? '💾 Enregistré ! +15 XP' : '💾 Enregistré');
  };
};

/* ---------------------------- Exercices ---------------------------- */
const EXOS = [
  ['mc', '🎯', 'QCM : allemand → français', 'Reconnaître le sens des mots'],
  ['mcr', '🔄', 'QCM : français → allemand', 'Retrouver le mot allemand'],
  ['type', '⌨️', 'Écrire le mot', 'Mémoire active + orthographe'],
  ['article', '🎨', 'Der / Die / Das', 'Le jeu des genres en couleurs'],
  ['listen', '👂', 'Compréhension orale', 'Écoute et choisis le sens'],
  ['dictation', '🎧', 'Dictée', 'Écoute et écris le mot'],
  ['memory', '🧩', 'Jeu des paires', 'Associe images et traductions'],
  ['conj', '🔀', 'Conjugaison', 'Présent, prétérit, Perfekt'],
  ['order', '🧱', 'Ordre des mots', 'Construis la phrase'],
  ['grammar', '📘', 'Grammaire mélangée', 'Exercices de tes leçons']
];
function srcLabel(src) {
  if (src === 'learned') return 'Mes mots en cours';
  if (src === 'week') return 'Thèmes de la semaine';
  if (LEVELS.includes(src)) return 'Tout le niveau ' + src;
  if (src.startsWith('theme:')) return THEME_BY[src.slice(6)]?.t || src;
  return src;
}
function getPool(src) {
  let p = [];
  if (src === 'learned') p = allWords().filter(w => S.srs[w.id]);
  else if (src === 'week') p = PLAN[curWeek() - 1].th.flatMap(t => THEME_BY[t].words);
  else if (LEVELS.includes(src)) p = WORDS.filter(w => w.lvl === src);
  else if (src && src.startsWith('theme:')) p = THEME_BY[src.slice(6)]?.words || [];
  if (p.length < 6) p = p.concat(PLAN[curWeek() - 1].th.flatMap(t => THEME_BY[t].words));
  return [...new Set(p)];
}
PAGES.exercises = () => {
  const src = S.settings.src;
  view().innerHTML = `<h1>🎮 Exercices & jeux</h1>
  <div class="card row gap"><b>Mots utilisés :</b>
    <select id="src">
      <option value="week">Thèmes de la semaine</option><option value="learned">Mes mots en cours (révisions)</option>
      ${LEVELS.map(l => `<option value="${l}">Tout le niveau ${l}</option>`).join('')}
      <optgroup label="Un thème">${VOCAB_THEMES.map(t => `<option value="theme:${t.id}">${t.lvl} · ${esc(t.t)}</option>`).join('')}${CUSTOM_THEME.words.length ? '<option value="theme:custom">⭐ Mes mots</option>' : ''}</optgroup>
    </select></div>
  <div class="egrid">${EXOS.map(([k, i, t, d]) => `<a class="ecard" href="#/quiz/${k}"><span class="ti">${i}</span><b>${t}</b><small>${d}</small></a>`).join('')}
  <a class="ecard" href="#/visuel"><span class="ti">🏞️</span><b>Trouve l'objet</b><small>Dictionnaire visuel</small></a>
  <a class="ecard" href="#/speak"><span class="ti">🎤</span><b>Prononciation</b><small>Parle, l'ordinateur t'écoute</small></a></div>`;
  $('#src').value = src;
  $('#src').onchange = e => { S.settings.src = e.target.value; save(); };
};

/* Générateurs de questions */
function distract(pool, w, key, n = 3) {
  const others = shuffle(pool.filter(x => x.id !== w.id && x[key] !== w[key]));
  const res = []; const seen = new Set([w[key]]);
  for (const o of others.concat(shuffle(WORDS))) { if (!seen.has(o[key])) { seen.add(o[key]); res.push(o[key]); } if (res.length >= n) break; }
  return res;
}
const GEN = {
  mc: pool => sample(pool, 10).map(w => ({ kind: 'mc', w, say: w.de, html: `${wImg(w, 'xl')}<div class="cde">${deHTML(w)}</div><p class="muted">Que signifie ce mot ?</p>`, options: shuffle([w.fr, ...distract(pool, w, 'fr')]), answer: w.fr })),
  mcr: pool => sample(pool, 10).map(w => ({ kind: 'mc', w, html: `${wImg(w, 'xl')}<div class="cfr">${esc(w.fr)}</div><p class="muted">Choisis le mot allemand</p>`, options: shuffle([w.de, ...distract(pool, w, 'de')]), answer: w.de, sayAfter: w.de })),
  type: pool => sample(pool, 10).map(w => ({ kind: 'input', w, html: `${wImg(w, 'xl')}<div class="cfr">${esc(w.fr)}</div><p class="muted">Écris en allemand${w.g ? ' <b>avec l\'article</b>' : ''}</p>`, answers: [w.de, sayText(w.de)], show: w.de, sayAfter: w.de, nearly: w.g ? [bare(w.de)] : null, nearlyMsg: w.g ? `N'oublie pas l'article : ${ART[w.g]}` : '' })),
  article: pool => { let p = pool.filter(w => w.g && w.g !== 'p'); if (p.length < 5) p = WORDS.filter(w => w.g && w.g !== 'p' && w.lvl === 'A1'); return sample(p, 15).map(w => ({ kind: 'article', w, html: `${wImg(w, 'xl')}<div class="cde">___ ${esc(bare(w.de))}</div><div class="muted">${esc(w.fr)}</div>`, options: ['der', 'die', 'das'], answer: ART[w.g], sayAfter: w.de, extra: plHTML(w) })); },
  listen: pool => sample(pool, 10).map(w => ({ kind: 'mc', w, say: w.de, html: `<button class="btn big" data-say="${esc(w.de)}">🔊 Réécouter</button><p class="muted">Qu'as-tu entendu ? Choisis le sens.</p>`, options: shuffle([w.fr, ...distract(pool, w, 'fr')]), answer: w.fr, reveal: w.de })),
  dictation: (pool, arg) => {
    const items = arg === 'phrases' ? sample(ALL_PHRASES.filter(p => LEVELS.indexOf(p.lvl) <= LEVELS.indexOf(curLevel())), 8).map(p => ({ de: p.de, fr: p.fr })) : sample(pool, 10).map(w => ({ de: w.de, fr: w.fr, w }));
    return items.map(it => ({ kind: 'input', w: it.w, say: it.de, html: `<button class="btn big" data-say="${esc(it.de)}">🔊 Réécouter</button> <button class="btn" data-slow="${esc(it.de)}">🐢 Lentement</button><p class="muted">Écris ce que tu entends</p>`, answers: [it.de, sayText(it.de)], show: it.de + ' — ' + it.fr }));
  },
  conj: (pool, arg) => {
    const lv = LEVELS.indexOf(curLevel());
    const vs = VERBS.filter(v => LEVELS.indexOf(v.lvl) <= Math.max(lv, 1));
    return Array.from({ length: 12 }, () => {
      const v = pick(vs), tk = arg && TENSES[arg] ? arg : pick(lv >= 1 ? ['pres', 'pret', 'perf'] : ['pres', 'pres', 'perf']), i = Math.floor(Math.random() * 6);
      const form = TENSES[tk][1](v)[i];
      return { kind: 'input', html: `<div class="cde">${PRON[i]} … <span class="muted">(${esc(v.inf)})</span></div><p>${TENSES[tk][0]} — <i>${esc(v.fr)}</i></p>`, answers: [form], show: PRON[i] + ' ' + form, sayAfter: PRON[i].split('/')[0] + ' ' + form };
    });
  },
  order: () => {
    const ph = ALL_PHRASES.filter(p => LEVELS.indexOf(p.lvl) <= LEVELS.indexOf(curLevel()) + 1 && p.de.split(' ').length >= 4 && p.de.split(' ').length <= 14);
    return sample(ph, 8).map(p => ({ kind: 'order', html: `<div class="cfr">${esc(p.fr)}</div><p class="muted">Remets les mots dans l'ordre</p>`, tokens: p.de.split(' '), answer: p.de, sayAfter: p.de }));
  },
  grammar: () => {
    const lv = LEVELS.indexOf(curLevel());
    let ls = GRAMMAR.filter(g => S.lessons[g.id]);
    if (ls.length < 2) ls = GRAMMAR.filter(g => LEVELS.indexOf(g.lvl) <= lv);
    const items = ls.flatMap(l => l.ex.map(x => ({ l, x })));
    return sample(items, 12).map(({ l, x }) => ({ kind: 'input', html: `<p class="muted">${l.i} ${esc(l.t)}</p><div class="cq">${esc(x[0])}</div>`, answers: x[1].split('/'), show: x[1].split('/')[0] }));
  }
};

PAGES.quiz = (type, arg) => {
  if (type === 'memory') return memoryGame(arg);
  const src = arg && arg.startsWith('theme:') ? arg : (LEVELS.includes(arg) ? arg : S.settings.src);
  const pool = getPool(src);
  const qs = GEN[type] ? GEN[type](pool, arg) : null;
  if (!qs || !qs.length) { view().innerHTML = '<p>Exercice introuvable.</p>'; return; }
  const ex = EXOS.find(e => e[0] === type);
  runQuiz(`${ex ? ex[1] + ' ' + ex[2] : 'Exercice'}`, ['conj', 'order', 'grammar'].includes(type) || arg === 'phrases' ? '' : srcLabel(src), qs, { again: '#/quiz/' + type + (arg ? '/' + arg : '') });
};

/* Moteur de quiz générique */
function runQuiz(title, sub, qs, opt = {}) {
  let i = 0, score = 0; const wrong = [];
  function q() {
    if (i >= qs.length) return end();
    const Q = qs[i]; let answered = false;
    view().innerHTML = `<div class="revtop"><span><b>${title}</b> ${sub ? '· ' + esc(sub) : ''}</span><span>${i + 1} / ${qs.length} · ✅ ${score}</span></div>
    <div class="bar"><i style="width:${i / qs.length * 100}%"></i></div>
    <div class="card flash center">${Q.html}<div id="area"></div><div id="fb"></div><div id="nx"></div></div>`;
    const area = $('#area');
    if (Q.kind === 'mc' || Q.kind === 'article') {
      area.innerHTML = `<div class="opts ${Q.kind === 'article' ? 'arts' : ''}">${Q.options.map((o, k) => `<button class="opt ${Q.kind === 'article' ? { der: 'am', die: 'af', das: 'an' }[o] : ''}" data-o="${esc(o)}"><kbd>${k + 1}</kbd> ${esc(o)}</button>`).join('')}</div>`;
      $$('.opt').forEach(b => b.onclick = () => { if (answered) return; done(b.dataset.o === Q.answer, b); });
    } else if (Q.kind === 'input') {
      area.innerHTML = `<input type="text" id="inp" autocomplete="off" placeholder="Ta réponse..."> ${umlautBar()}<button class="btn primary" id="ok">Valider <kbd>Entrée</kbd></button> <button class="btn" id="skip">Je ne sais pas</button>`;
      $('#inp').focus();
      $('#ok').onclick = () => { if (answered) return; const v = $('#inp').value; const r = check(v, Q.answers); if (!r.ok && Q.nearly && check(v, Q.nearly).ok) return done(false, null, Q.nearlyMsg); done(r.ok, null, r.typo ? 'Petite faute : ' + r.typo : ''); };
      $('#skip').onclick = () => { if (!answered) done(false); };
    } else if (Q.kind === 'order') {
      const toks = shuffle(Q.tokens.map((t, k) => ({ t, k }))); const built = [];
      area.innerHTML = `<div class="built" id="built"></div><div class="toks" id="toks">${toks.map(o => `<button class="tok" data-k="${o.k}">${esc(o.t)}</button>`).join('')}</div><button class="btn" id="undo">↩ Effacer</button> <button class="btn primary" id="ok">Valider</button>`;
      const redraw = () => { $('#built').innerHTML = built.map(o => `<span class="tok in">${esc(o.t)}</span>`).join(' ') || '<span class="muted">Clique sur les mots ci-dessous</span>'; $$('#toks .tok').forEach(b => b.disabled = built.some(o => o.k == b.dataset.k)); };
      $$('#toks .tok').forEach(b => b.onclick = () => { if (answered) return; built.push(toks.find(o => o.k == b.dataset.k)); redraw(); });
      $('#undo').onclick = () => { if (!answered) { built.pop(); redraw(); } };
      $('#ok').onclick = () => { if (answered) return; done(norm(built.map(o => o.t).join(' ')) === norm(Q.answer)); };
      redraw();
    }
    $$('[data-slow]').forEach(b => b.onclick = () => speak(b.dataset.slow, 0.6));
    if (Q.say) setTimeout(() => speak(Q.say), 250);
    function done(ok, btn, note = '') {
      answered = true; stat(ok);
      if (ok) { score++; addXP(2); } else wrong.push(Q);
      if (Q.kind === 'mc' || Q.kind === 'article') $$('.opt').forEach(b => { if (b.dataset.o === Q.answer) b.classList.add('right'); else if (b === btn) b.classList.add('wrong'); b.disabled = true; });
      const sol = Q.show || Q.answer;
      $('#fb').innerHTML = `${ok ? `<div class="ok">✅ Richtig!${note ? ' <small>' + esc(note) + '</small>' : ''}</div>` : `<div class="ko">❌ ${note ? esc(note) + ' — ' : ''}Réponse : <b>${esc(sol)}</b></div>`}
        ${Q.w ? `<div class="mini">${deHTML(Q.w)} — ${esc(Q.w.fr)} ${spk(Q.w.de, 'sm')} ${Q.extra || ''}</div>` : ''}${Q.reveal && !Q.w ? `<div>${esc(Q.reveal)}</div>` : ''}`;
      if (Q.sayAfter) speak(Q.sayAfter);
      $('#nx').innerHTML = `<button class="btn primary" id="next">Suivant → <kbd>Entrée</kbd></button>`;
      $('#next').onclick = () => { i++; q(); };
      save();
    }
    keyHandler = e => {
      if (answered) { if (e.key === 'Enter') { e.preventDefault(); $('#next')?.click(); } return; }
      if ((Q.kind === 'mc' || Q.kind === 'article') && /^[1-4]$/.test(e.key)) { const b = $$('.opt')[+e.key - 1]; if (b) b.click(); }
      if (Q.kind === 'input' && e.key === 'Enter') { e.preventDefault(); $('#ok').click(); }
    };
  }
  function end() {
    keyHandler = null;
    const pct = Math.round(score / qs.length * 100);
    day().tasks.jeux = true; save();
    if (opt.onEnd) opt.onEnd(pct);
    view().innerHTML = `<div class="card center"><div class="huge">${pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '💪' : '📚'}</div>
    <h1>${score} / ${qs.length} (${pct}%)</h1><p>${pct >= 90 ? 'Hervorragend ! Excellent !' : pct >= 70 ? 'Sehr gut ! Continue comme ça.' : pct >= 50 ? 'Pas mal — refais-le pour fixer les mots.' : 'Revois le vocabulaire / la leçon puis réessaie.'}</p>
    ${opt.extraEnd ? opt.extraEnd(pct) : ''}
    ${wrong.length ? `<div class="card left"><h3>À revoir</h3><ul>${wrong.map(Q => `<li>${Q.w ? deHTML(Q.w) + ' — ' + esc(Q.w.fr) : esc(Q.show || Q.answer)}</li>`).join('')}</ul></div>` : ''}
    <div class="row gap center"><a class="btn primary" href="${opt.again || '#/exercises'}" id="again">🔁 Recommencer</a><a class="btn" href="#/exercises">Autres exercices</a></div></div>`;
    $('#again').onclick = e => { e.preventDefault(); route(); };
  }
  q();
}

/* Jeu des paires */
function memoryGame(arg) {
  const src = arg && arg.startsWith('theme:') ? arg : S.settings.src;
  const ws = sample(getPool(src), 6);
  const cards = shuffle(ws.flatMap(w => [{ w, side: 'de' }, { w, side: 'fr' }]));
  let open = [], found = 0, moves = 0, lock = false;
  view().innerHTML = `<h1>🧩 Jeu des paires <small class="muted">${esc(srcLabel(src))}</small></h1>
  <p class="sub">Retourne deux cartes : trouve chaque mot allemand et sa traduction.</p><p id="mstat">Coups : 0</p>
  <div class="mgrid">${cards.map((c, i) => `<button class="mcard" data-i="${i}"><span class="mback">❓</span><span class="mface">${c.side === 'de' ? `${wImg(c.w)}<b>${deHTML(c.w)}</b>` : `<span>${esc(c.w.fr)}</span>`}</span></button>`).join('')}</div>
  <div class="row gap"><button class="btn" id="mre">🔁 Nouvelle partie</button></div>`;
  $('#mre').onclick = () => route();
  $$('.mcard').forEach(b => b.onclick = () => {
    if (lock || b.classList.contains('up')) return;
    const c = cards[b.dataset.i]; b.classList.add('up');
    if (c.side === 'de') speak(c.w.de);
    open.push([b, c]);
    if (open.length === 2) {
      moves++; $('#mstat').textContent = 'Coups : ' + moves;
      const [[b1, c1], [b2, c2]] = open; open = [];
      if (c1.w.id === c2.w.id) { b1.classList.add('found'); b2.classList.add('found'); found++; stat(true); addXP(2);
        if (found === ws.length) { day().tasks.jeux = true; toast(`🎉 Bravo ! Terminé en ${moves} coups`); save(); } }
      else { lock = true; stat(false); setTimeout(() => { b1.classList.remove('up'); b2.classList.remove('up'); lock = false; }, 1000); }
      save();
    }
  });
}

/* ---------------------------- Tests de niveau ---------------------------- */
PAGES.tests = (lvl) => {
  if (lvl && LEVELS.includes(lvl)) {
    const ws = WORDS.filter(w => w.lvl === lvl);
    const nouns = ws.filter(w => w.g && w.g !== 'p');
    const gq = sample(GRAMMAR.filter(g => g.lvl === lvl).flatMap(l => l.ex.map(x => ({ l, x }))), 8)
      .map(({ l, x }) => ({ kind: 'input', html: `<p class="muted">${l.i} ${esc(l.t)}</p><div class="cq">${esc(x[0])}</div>`, answers: x[1].split('/'), show: x[1].split('/')[0] }));
    const qs = shuffle([...GEN.mc(ws).slice(0, 4), ...GEN.mcr(ws).slice(0, 4), ...GEN.article(nouns).slice(0, 4), ...gq]);
    return runQuiz(`🏆 Test de niveau ${lvl}`, '20 questions — 70% pour valider', qs, {
      again: '#/tests/' + lvl,
      onEnd: pct => { const was = S.tests[lvl]; S.tests[lvl] = { best: Math.max(pct, was?.best || 0), date: today() }; if (pct >= 70 && !(was?.best >= 70)) addXP(50); save(); },
      extraEnd: pct => pct >= 70 ? `<div class="ok">🏅 Niveau ${lvl} validé ! ${lvl !== 'B2' ? 'Passe au niveau suivant.' : 'Tu es prêt(e) pour un examen blanc officiel !'}</div>` : `<div class="warn">Il faut 70% pour valider. Révise les leçons ${lvl} et réessaie.</div>`
    });
  }
  view().innerHTML = `<h1>🏆 Tests de niveau</h1><p class="sub">À faire à la fin de chaque bloc de 4 semaines. 20 questions : vocabulaire, genres et grammaire. Score ≥ 70% = niveau validé.</p>
  <div class="egrid">${LEVELS.map((l, k) => `<a class="ecard ${S.tests[l]?.best >= 70 ? 'done' : ''}" href="#/tests/${l}"><span class="ti">${['🥉', '🥈', '🥇', '🏆'][k]}</span><b class="lv lv-${l}">${l}</b><small>Semaine ${(k + 1) * 4}</small>${S.tests[l] ? `<span class="badge ${S.tests[l].best >= 70 ? 'b-ok' : 'b-mid'}">Meilleur : ${S.tests[l].best}%</span>` : ''}</a>`).join('')}</div>
  <div class="card"><h2>🎓 Les examens officiels</h2><p>Pour obtenir un diplôme reconnu, passe le <b>Goethe-Zertifikat</b> ou le <b>telc</b> (A1 : « Start Deutsch 1 », A2, B1, B2). Le site du Goethe-Institut propose des <b>examens blancs gratuits</b> (« Übungsmaterialien ») avec les fichiers audio : fais-les en conditions réelles avec un chronomètre.</p>
  <p>Le B2 comporte 4 épreuves : <b>Lesen</b> (lecture, 65 min), <b>Hören</b> (écoute, 40 min), <b>Schreiben</b> (écriture, 75 min), <b>Sprechen</b> (oral, 15 min).</p>
  <a class="btn" href="https://www.goethe.de" target="_blank" rel="noopener">Goethe-Institut ↗</a></div>`;
};

/* ---------------------------- Statistiques ---------------------------- */
PAGES.stats = () => {
  const days = Array.from({ length: 14 }, (_, k) => addDays(today(), k - 13));
  const maxR = Math.max(10, ...days.map(d => (S.hist[d]?.rev || 0) + (S.hist[d]?.q || 0)));
  const maxM = Math.max(30, ...days.map(d => S.hist[d]?.min || 0));
  const H = Object.values(S.hist);
  const tq = H.reduce((a, d) => a + d.q, 0), tok = H.reduce((a, d) => a + d.ok, 0), tmin = H.reduce((a, d) => a + d.min, 0);
  const learned = Object.keys(S.srs).filter(isLearned).length, mastered = Object.keys(S.srs).filter(isMastered).length;
  let est = 'Débutant'; for (const l of LEVELS) if (S.tests[l]?.best >= 70) est = l;
  const bars = (val, max, cls) => days.map(d => { const v = val(d); return `<div class="col" title="${d} : ${v}"><i class="${cls}" style="height:${v / max * 100}%"></i><small>${d.slice(8)}</small></div>`; }).join('');
  view().innerHTML = `<h1>📊 Statistiques</h1>
  <div class="grid4">
    <div class="card stat"><div class="big">🎓 ${est}</div><div>niveau validé</div></div>
    <div class="card stat"><div class="big">🧠 ${learned}</div><div>mots appris (${mastered} maîtrisés)</div></div>
    <div class="card stat"><div class="big">🎯 ${tq ? Math.round(tok / tq * 100) : 0}%</div><div>de bonnes réponses (${tq})</div></div>
    <div class="card stat"><div class="big">⏱️ ${Math.floor(tmin / 60)} h ${tmin % 60}</div><div>de travail au total</div></div>
    <div class="card stat"><div class="big">🔥 ${streak()}</div><div>jours d'affilée</div></div>
    <div class="card stat"><div class="big">📘 ${Object.keys(S.lessons).length}/${GRAMMAR.length}</div><div>leçons validées</div></div>
    <div class="card stat"><div class="big">⭐ ${S.xp}</div><div>XP</div></div>
    <div class="card stat"><div class="big">✍️ ${Object.keys(S.journal).length}</div><div>textes écrits</div></div>
  </div>
  <div class="card"><h2>Activité (cartes + exercices) — 14 derniers jours</h2><div class="chart">${bars(d => (S.hist[d]?.rev || 0) + (S.hist[d]?.q || 0), maxR, 'c1')}</div></div>
  <div class="card"><h2>Minutes d'étude — 14 derniers jours <small class="muted">(objectif : 240 min/jour)</small></h2><div class="chart">${bars(d => S.hist[d]?.min || 0, maxM, 'c2')}</div></div>
  <div class="card"><h2>Vocabulaire par niveau</h2>${LEVELS.map(l => { const ws = WORDS.filter(w => w.lvl === l), n = ws.filter(w => isLearned(w.id)).length; return `<div class="lvlrow"><b class="lv lv-${l}">${l}</b><div class="bar"><i style="width:${n / ws.length * 100}%"></i></div><span>${n}/${ws.length}</span></div>`; }).join('')}</div>`;
};

/* ---------------------------- Paramètres ---------------------------- */
PAGES.settings = () => {
  view().innerHTML = `<h1>⚙️ Paramètres</h1>
  <div class="card form-v">
    <label>📅 Date de début du programme <input type="date" id="s-start" value="${S.start}"></label>
    <label>🆕 Nouveaux mots par jour <input type="number" id="s-new" min="5" max="80" value="${S.settings.newPerDay}"> <small class="muted">(20 = rythme 4 mois · 30 = très intensif)</small></label>
    <label>🔁 Sens des cartes <select id="s-dir"><option value="fr-de">Français → Allemand (plus efficace)</option><option value="de-fr">Allemand → Français (plus facile)</option></select></label>
    <label>🌙 Thème <select id="s-dark"><option value="">Comme l'appareil</option><option value="light">Clair</option><option value="dark">Sombre</option></select></label>
  </div>
  <div class="card form-v"><h2>🔊 Audio</h2>
    <label>Voix allemande <select id="s-voice"><option value="">Automatique</option>${VOICES.map(v => `<option ${v.name === S.settings.voice ? 'selected' : ''}>${esc(v.name)}</option>`).join('')}</select></label>
    <label>Vitesse <input type="range" id="s-rate" min="0.5" max="1.3" step="0.05" value="${S.settings.rate}"> <span id="rv">${S.settings.rate}</span></label>
    <button class="btn" id="s-test">▶ Tester : « Guten Tag! Ich lerne Deutsch. »</button>
    <p class="muted small">${VOICES.length ? VOICES.length + ' voix allemande(s) trouvée(s).' : '⚠️ Aucune voix allemande trouvée.'} Sous Windows : <b>Paramètres → Heure et langue → Voix (Speech) → Ajouter des voix → Deutsch</b>. Avec <b>Microsoft Edge</b>, des voix naturelles allemandes sont disponibles directement (Internet requis).</p>
  </div>
  <div class="card"><h2>💾 Sauvegarde de ma progression</h2>
    <p class="muted">Ta progression est enregistrée automatiquement dans ce navigateur. Fais une sauvegarde de temps en temps (ou pour changer d'ordinateur).</p>
    <div class="row gap"><button class="btn primary" id="s-exp">⬇️ Exporter (fichier)</button><label class="btn">⬆️ Importer (fichier) <input type="file" id="s-imp" accept=".json,application/json" hidden></label><button class="btn danger" id="s-reset">🗑️ Tout réinitialiser</button></div>
    <p class="muted small">Si le téléchargement ne démarre pas (téléphone, lien en ligne) : copie le code ci-dessous et garde-le dans tes notes. Pour le restaurer, colle-le dans la même case puis clique sur « Restaurer ».</p>
    <textarea id="s-code" rows="3" placeholder="Code de sauvegarde..."></textarea>
    <div class="row gap"><button class="btn" id="s-copy">📋 Afficher et copier mon code</button><button class="btn" id="s-paste">♻️ Restaurer depuis le code collé</button></div>
  </div>`;
  $('#s-dir').value = S.settings.dir;
  $('#s-start').onchange = e => { if (e.target.value) { S.start = e.target.value; S.autoWeek = 0; save(); toast('Date mise à jour'); } };
  $('#s-new').onchange = e => { S.settings.newPerDay = Math.max(5, Math.min(80, +e.target.value || 20)); save(); };
  $('#s-dir').onchange = e => { S.settings.dir = e.target.value; save(); };
  $('#s-dark').value = S.settings.dark === true ? 'dark' : S.settings.dark === false ? 'light' : '';
  $('#s-dark').onchange = e => { S.settings.dark = e.target.value === 'dark' ? true : e.target.value === 'light' ? false : null; applyTheme(); save(); };
  $('#s-voice').onchange = e => { S.settings.voice = e.target.value; save(); };
  $('#s-rate').oninput = e => { S.settings.rate = +e.target.value; $('#rv').textContent = e.target.value; save(); };
  $('#s-test').onclick = () => speak('Guten Tag! Ich lerne Deutsch.');
  $('#s-exp').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: 'application/json' }));
    a.download = 'deutsch-b2-sauvegarde-' + today() + '.json'; a.click();
  };
  const restore = t => { try { const d = JSON.parse(t); if (!d.srs) throw 0; S = Object.assign(defaults(), d); S.settings = Object.assign(defaults().settings, S.settings); rebuildCustom(); save(); applyTheme(); toast('✅ Progression restaurée'); route(); } catch (_) { toast('❌ Code ou fichier invalide'); } };
  $('#s-copy').onclick = () => {
    const ta = $('#s-code'); ta.value = JSON.stringify(S);
    navigator.clipboard?.writeText(ta.value).then(() => toast('📋 Code copié !'), () => { ta.select(); toast('Sélectionne le texte et copie-le (Ctrl+C)'); }) ?? ta.select();
  };
  $('#s-paste').onclick = () => restore($('#s-code').value.trim());
  $('#s-imp').onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    f.text().then(restore);
  };
  $('#s-reset').onclick = async () => { if (await ask("Effacer TOUTE ta progression ? Fais d'abord une sauvegarde !", 'Tout effacer')) { S = defaults(); save(); applyTheme(); location.hash = '#/'; route(); } };
};

/* ---------------------------- Pomodoro ---------------------------- */
let pomo = null;
function pomodoro() {
  const b = $('#pomo');
  if (pomo) { clearInterval(pomo.t); pomo = null; b.textContent = '⏱️ 25:00'; b.classList.remove('run'); return; }
  pomo = { end: Date.now() + 25 * 60000 };
  b.classList.add('run');
  pomo.t = setInterval(() => {
    const s = Math.max(0, Math.round((pomo.end - Date.now()) / 1000));
    b.textContent = '⏱️ ' + pad(Math.floor(s / 60)) + ':' + pad(s % 60);
    if (!s) {
      clearInterval(pomo.t); pomo = null; b.classList.remove('run'); b.textContent = '⏱️ 25:00';
      try { const ctx = new AudioContext(), o = ctx.createOscillator(); o.connect(ctx.destination); o.frequency.value = 660; o.start(); o.stop(ctx.currentTime + 0.6); } catch (_) { }
      addXP(10); toast('🍅 25 minutes terminées ! Fais une pause de 5 minutes. +10 XP', 6000);
    }
  }, 1000);
}

/* ---------------------------- Démarrage ---------------------------- */
const sysDark = () => window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
function applyTheme() {
  const r = document.documentElement;
  if (S.settings.dark === true) r.dataset.theme = 'dark'; else if (S.settings.dark === false) r.dataset.theme = 'light'; else delete r.dataset.theme;
}
function init() {
  applyTheme();
  $('#nav').innerHTML = NAV.map(([p, i, t]) => `<a href="#/${p}" data-p="${p}"><span>${i}</span> ${t}</a>`).join('');
  $('#pomo').onclick = pomodoro;
  $('#burger').onclick = () => document.body.classList.toggle('nav-open');
  $('#darkbtn').onclick = () => { const isDark = S.settings.dark === true || (S.settings.dark == null && sysDark()); S.settings.dark = !isDark; applyTheme(); save(); };
  autoActivate();
  route();
}
init();
