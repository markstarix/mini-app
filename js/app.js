/* ═══════════════════════════════════════════════════════════
   MINES MOD 2.0 — Telegram Mini App
   app.js  —  Game logic + i18n + language selector
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── Telegram WebApp init ─────────────────────────────── */
const tg = window.Telegram?.WebApp ?? null;
if (tg) {
  tg.ready();
  tg.expand();
  if (tg.colorScheme === 'dark') document.body.classList.add('tg-dark');
}

/* ═══════════════════════════════════════════════════════════
   i18n — Translations
═══════════════════════════════════════════════════════════ */
const LANGS = {
  en: {
    code: 'GB',
    multiplierLabel: 'Multiplier',
    potentialLabel:  'Potential',
    minesLabel:      '💣 Number of Mines',
    betLabel:        '🪙 Bet (demo coins)',
    hintBoxTitle:    '🔮 Hint',
    startBtn:        '🚀 Start',
    newGameBtn:      '🔄 New Game',
    hintBtn:         '🔮 Hint',
    cashBtn:         '💰 Cash Out',
    winsLabel:       'Wins',
    lossesLabel:     'Losses',
    profitLabel:     'Profit',
    langTitle:       'Language',
    toastStart:      '🎮 Game on — pick your tiles!',
    toastMine:       '💥 Mine! Lost {n} 🪙',
    toastAllClear:   '🏆 All tiles cleared! +{n} 🪙',
    toastCashOut:    '💰 Cashed out {n} 🪙 (+{p})',
    toastHint:       '🔮 Hint generated',
    toastRefill:     '🎁 Balance refilled to 10,000!',
  },
  hi: {
    code: 'IN',
    multiplierLabel: 'गुणक',
    potentialLabel:  'संभावित',
    minesLabel:      '💣 खदानों की संख्या',
    betLabel:        '🪙 दांव (डेमो सिक्के)',
    hintBoxTitle:    '🔮 संकेत',
    startBtn:        '🚀 शुरू करें',
    newGameBtn:      '🔄 नया खेल',
    hintBtn:         '🔮 संकेत',
    cashBtn:         '💰 निकालें',
    winsLabel:       'जीत',
    lossesLabel:     'हार',
    profitLabel:     'लाभ',
    langTitle:       'भाषा',
    toastStart:      '🎮 खेल शुरू — टाइल चुनें!',
    toastMine:       '💥 खदान! {n} 🪙 खो गए',
    toastAllClear:   '🏆 सभी टाइलें खुलीं! +{n} 🪙',
    toastCashOut:    '💰 {n} 🪙 निकाले (+{p})',
    toastHint:       '🔮 संकेत मिला',
    toastRefill:     '🎁 बैलेंस 10,000 हो गया!',
  },
  es: {
    code: 'ES',
    multiplierLabel: 'Multiplicador',
    potentialLabel:  'Potencial',
    minesLabel:      '💣 Número de minas',
    betLabel:        '🪙 Apuesta (monedas demo)',
    hintBoxTitle:    '🔮 Pista',
    startBtn:        '🚀 Iniciar',
    newGameBtn:      '🔄 Nuevo juego',
    hintBtn:         '🔮 Pista',
    cashBtn:         '💰 Cobrar',
    winsLabel:       'Victorias',
    lossesLabel:     'Derrotas',
    profitLabel:     'Ganancia',
    langTitle:       'Idioma',
    toastStart:      '🎮 ¡Juego iniciado — elige tus casillas!',
    toastMine:       '💥 ¡Mina! Perdiste {n} 🪙',
    toastAllClear:   '🏆 ¡Todas las casillas abiertas! +{n} 🪙',
    toastCashOut:    '💰 Cobrado {n} 🪙 (+{p})',
    toastHint:       '🔮 Pista generada',
    toastRefill:     '🎁 ¡Saldo recargado a 10,000!',
  },
  pt: {
    code: 'PT',
    multiplierLabel: 'Multiplicador',
    potentialLabel:  'Potencial',
    minesLabel:      '💣 Número de minas',
    betLabel:        '🪙 Aposta (moedas demo)',
    hintBoxTitle:    '🔮 Dica',
    startBtn:        '🚀 Iniciar',
    newGameBtn:      '🔄 Novo jogo',
    hintBtn:         '🔮 Dica',
    cashBtn:         '💰 Sacar',
    winsLabel:       'Vitórias',
    lossesLabel:     'Derrotas',
    profitLabel:     'Lucro',
    langTitle:       'Idioma',
    toastStart:      '🎮 Jogo iniciado — escolha suas casas!',
    toastMine:       '💥 Mina! Perdeu {n} 🪙',
    toastAllClear:   '🏆 Todas as casas abertas! +{n} 🪙',
    toastCashOut:    '💰 Sacado {n} 🪙 (+{p})',
    toastHint:       '🔮 Dica gerada',
    toastRefill:     '🎁 Saldo recarregado para 10,000!',
  },
};

/* Translation helper — supports {placeholder} substitution */
function t(key, vars = {}) {
  const lang = LANGS[state.lang] ?? LANGS.en;
  let str = lang[key] ?? LANGS.en[key] ?? key;
  Object.entries(vars).forEach(([k, v]) => {
    str = str.replace(`{${k}}`, v);
  });
  return str;
}

/* Apply current language to all DOM elements with data-i18n */
function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });

  // Dynamic button labels
  if (state.gameStatus !== 'playing') {
    el.startBtn.textContent = t('startBtn');
  } else {
    el.startBtn.textContent = t('newGameBtn');
  }
  el.hintBtn.textContent = t('hintBtn');
  el.cashBtn.textContent = t('cashBtn');

  // Header lang code badge
  document.getElementById('currentLangCode').textContent = LANGS[state.lang].code;

  // Sync active state in lang picker
  document.querySelectorAll('.lang-item').forEach(item => {
    item.classList.toggle('active', item.dataset.lang === state.lang);
  });
}

/* ═══════════════════════════════════════════════════════════
   Constants
═══════════════════════════════════════════════════════════ */
const GRID_SIZE  = 25;
const MAX_HINTS  = 3;
const HOUSE_EDGE = 0.97;
const START_BAL  = 10_000;

/* ═══════════════════════════════════════════════════════════
   State
═══════════════════════════════════════════════════════════ */
const state = {
  lang:          'en',
  balance:       START_BAL,
  betAmount:     100,
  mineCount:     1,
  grid:          [],
  gameStatus:    'idle',   // 'idle' | 'playing' | 'ended'
  revealedCount: 0,
  hintsUsed:     0,
  multiplier:    1.00,
  stats: { wins: 0, losses: 0, profit: 0 },
};

/* ═══════════════════════════════════════════════════════════
   DOM refs
═══════════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const el = {
  balance:     $('balance'),
  grid:        $('grid'),
  multiplier:  $('multiplier'),
  potential:   $('potential'),
  hintsLeft:   $('hintsLeft'),
  startBtn:    $('startBtn'),
  hintBtn:     $('hintBtn'),
  cashBtn:     $('cashBtn'),
  statWins:    $('statWins'),
  statLosses:  $('statLosses'),
  statProfit:  $('statProfit'),
  toast:       $('toast'),
  confetti:    $('confetti'),
  langBtn:     $('langBtn'),
  langOverlay: $('langOverlay'),
  langClose:   $('langClose'),
};

/* ═══════════════════════════════════════════════════════════
   Multiplier — exact combinatorial formula
   P(survive k reveals, m mines, 25 tiles)
     = C(25-m, k) / C(25, k)
   mult = 1/P * HOUSE_EDGE
═══════════════════════════════════════════════════════════ */
function calcMultiplier(mines, revealed) {
  if (revealed <= 0) return 1.00;
  let mult = 1.0;
  for (let i = 0; i < revealed; i++) {
    mult *= (GRID_SIZE - i) / (GRID_SIZE - mines - i);
  }
  return mult * HOUSE_EDGE;
}

/* ═══════════════════════════════════════════════════════════
   Grid
═══════════════════════════════════════════════════════════ */
function buildGrid() {
  state.grid = Array.from({ length: GRID_SIZE }, () => ({
    hasMine: false, revealed: false, hinted: false,
  }));
  // Fisher-Yates shuffle for mine placement
  const idx = Array.from({ length: GRID_SIZE }, (_, i) => i);
  for (let i = GRID_SIZE - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  idx.slice(0, state.mineCount).forEach(i => { state.grid[i].hasMine = true; });
}

function renderGrid() {
  el.grid.innerHTML = '';
  const playing = state.gameStatus === 'playing';

  state.grid.forEach((cell, i) => {
    const btn = document.createElement('button');
    btn.className = 'tile';
    btn.dataset.i = i;

    if (cell.revealed) {
      btn.classList.add(cell.hasMine ? 'mine' : 'gem');
      btn.textContent = cell.hasMine ? '💣' : '💎';
      btn.disabled = true;
    } else if (playing) {
      if (cell.hinted) {
        btn.classList.add('hinted');
        btn.textContent = '✨';
      } else {
        btn.classList.add('clickable');
      }
      btn.addEventListener('click', () => onTileClick(i));
    } else {
      btn.classList.add('idle');
      btn.disabled = true;
    }

    el.grid.appendChild(btn);
  });
}

function tileEl(i) {
  return el.grid.querySelector(`[data-i="${i}"]`);
}

/* ═══════════════════════════════════════════════════════════
   Game flow
═══════════════════════════════════════════════════════════ */
function startGame() {
  if (state.gameStatus === 'playing') {
    // Mid-game reset: refund the bet
    state.balance += state.betAmount;
  }

  // Auto-refill when balance is low
  if (state.balance < state.betAmount) {
    state.balance = START_BAL;
    showToast(t('toastRefill'), 'info');
  }

  state.balance      -= state.betAmount;
  state.gameStatus    = 'playing';
  state.revealedCount = 0;
  state.hintsUsed     = 0;
  state.multiplier    = 1.00;

  buildGrid();
  renderGrid();
  lockSettings(true);

  el.startBtn.textContent = t('newGameBtn');
  el.hintBtn.disabled     = false;
  el.cashBtn.disabled     = true;
  el.cashBtn.classList.remove('pulse-green');

  updateBalanceUI();
  updateMultUI();
  updateHintsUI();
  haptic('light');
  showToast(t('toastStart'));
}

function onTileClick(index) {
  if (state.gameStatus !== 'playing') return;
  const cell = state.grid[index];
  if (cell.revealed) return;

  cell.revealed = true;
  cell.hinted   = false;
  const tile = tileEl(index);

  if (cell.hasMine) {
    tile.className = 'tile mine boom';
    tile.textContent = '💣';
    tile.disabled = true;
    haptic('heavy');
    setTimeout(() => revealAllMines(index), 250);
    endGame(false);
  } else {
    state.revealedCount++;
    tile.className = 'tile gem';
    tile.textContent = '💎';
    tile.disabled = true;
    state.multiplier = calcMultiplier(state.mineCount, state.revealedCount);
    updateMultUI();
    haptic('light');
    el.cashBtn.disabled = false;
    el.cashBtn.classList.add('pulse-green');

    const totalSafe = GRID_SIZE - state.mineCount;
    if (state.revealedCount >= totalSafe) endGame(true);
  }
}

function cashOut() {
  if (state.gameStatus !== 'playing' || state.revealedCount === 0) return;

  const won    = Math.floor(state.betAmount * state.multiplier);
  const profit = won - state.betAmount;

  state.balance += won;
  state.stats.wins++;
  state.stats.profit += profit;
  state.gameStatus = 'ended';

  haptic('heavy');
  showToast(t('toastCashOut', { n: formatNum(won), p: formatNum(profit) }), 'win');
  launchConfetti();

  updateBalanceUI();
  updateStatsUI();
  revealAllMines(-1);
  resetButtons();
}

function endGame(won) {
  state.gameStatus = 'ended';

  if (won) {
    const winAmt = Math.floor(state.betAmount * state.multiplier);
    const profit = winAmt - state.betAmount;
    state.balance += winAmt;
    state.stats.wins++;
    state.stats.profit += profit;
    updateBalanceUI();
    showToast(t('toastAllClear', { n: formatNum(winAmt) }), 'win');
    launchConfetti();
  } else {
    state.stats.losses++;
    state.stats.profit -= state.betAmount;
    showToast(t('toastMine', { n: formatNum(state.betAmount) }), 'loss');
  }

  updateStatsUI();
  resetButtons();
}

function revealAllMines(exceptIdx) {
  state.grid.forEach((cell, i) => {
    if (!cell.hasMine || i === exceptIdx || cell.revealed) return;
    cell.revealed = true;
    const tile = tileEl(i);
    if (!tile) return;
    tile.className = 'tile mine revealed-end';
    tile.textContent = '💣';
    tile.disabled = true;
  });
}

function resetButtons() {
  setTimeout(() => {
    el.startBtn.textContent = t('startBtn');
    el.hintBtn.disabled     = true;
    el.cashBtn.disabled     = true;
    el.cashBtn.classList.remove('pulse-green');
    lockSettings(false);
    renderGrid();
  }, 1200);
}

/* ═══════════════════════════════════════════════════════════
   Hints
═══════════════════════════════════════════════════════════ */
function getHint() {
  if (state.gameStatus !== 'playing') return;
  if (state.hintsUsed >= MAX_HINTS) return;

  state.grid.forEach(c => { c.hinted = false; });

  const unrevealed = state.grid.reduce((acc, c, i) => {
    if (!c.revealed) acc.push(i);
    return acc;
  }, []);
  if (!unrevealed.length) return;

  const count    = Math.min(unrevealed.length >= 3 ? 2 : 1, unrevealed.length);
  const shuffled = [...unrevealed].sort(() => Math.random() - 0.5);
  shuffled.slice(0, count).forEach(i => { state.grid[i].hinted = true; });

  state.hintsUsed++;
  haptic('medium');
  renderGrid();
  updateHintsUI();
  showToast(t('toastHint'), 'info');
}

/* ═══════════════════════════════════════════════════════════
   Language selector
═══════════════════════════════════════════════════════════ */
function openLang() {
  el.langOverlay.classList.remove('hidden');
  haptic('light');
}

function closeLang() {
  el.langOverlay.classList.add('hidden');
}

function setLang(lang) {
  if (!LANGS[lang]) return;
  state.lang = lang;
  applyLang();
  closeLang();
  haptic('light');
}

// Close overlay on backdrop click
el.langOverlay.addEventListener('click', e => {
  if (e.target === el.langOverlay) closeLang();
});

// Language items
document.querySelectorAll('.lang-item').forEach(item => {
  item.addEventListener('click', () => setLang(item.dataset.lang));
});

el.langBtn.addEventListener('click', openLang);
el.langClose.addEventListener('click', closeLang);

/* ═══════════════════════════════════════════════════════════
   UI helpers
═══════════════════════════════════════════════════════════ */
function formatNum(n) {
  return Number(n).toLocaleString('en-US');
}

function updateBalanceUI() {
  el.balance.textContent = formatNum(state.balance);
  el.balance.classList.remove('bump');
  void el.balance.offsetWidth;
  el.balance.classList.add('bump');
}

function updateMultUI() {
  el.multiplier.textContent = state.multiplier.toFixed(2) + '×';
  el.multiplier.classList.remove('updated');
  void el.multiplier.offsetWidth;
  el.multiplier.classList.add('updated');

  const pot = state.gameStatus === 'playing'
    ? formatNum(Math.floor(state.betAmount * state.multiplier)) + ' 🪙'
    : '— 🪙';
  el.potential.textContent = pot;
}

function updateHintsUI() {
  const rem = MAX_HINTS - state.hintsUsed;
  el.hintsLeft.textContent = `${rem} / ${MAX_HINTS}`;
  el.hintsLeft.className   = 'hint-badge' + (rem === 0 ? ' zero' : '');
  if (rem === 0) el.hintBtn.disabled = true;
}

function updateStatsUI() {
  el.statWins.textContent   = state.stats.wins;
  el.statLosses.textContent = state.stats.losses;
  const p = state.stats.profit;
  el.statProfit.textContent = (p >= 0 ? '+' : '') + formatNum(p);
  el.statProfit.className   = 'stat-val ' + (p > 0 ? 'plus' : p < 0 ? 'minus' : 'neutral');
}

function lockSettings(locked) {
  document.querySelectorAll('.seg').forEach(s =>
    s.classList.toggle('locked', locked));
}

/* ── Toast ─────────────────────────────────────────────── */
let _toastTimer = null;
function showToast(msg, type = '') {
  clearTimeout(_toastTimer);
  el.toast.textContent = msg;
  el.toast.className   = 'toast show ' + type;
  _toastTimer = setTimeout(() => {
    el.toast.classList.remove('show');
  }, 2800);
}

/* ── Haptic ────────────────────────────────────────────── */
function haptic(style) {
  try { tg?.HapticFeedback?.impactOccurred(style); } catch (_) {}
}

/* ═══════════════════════════════════════════════════════════
   Confetti — lightweight canvas win effect
═══════════════════════════════════════════════════════════ */
function launchConfetti() {
  const canvas  = el.confetti;
  const ctx     = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#f0b429','#00c9a7','#8b5cf6','#f85149','#3fb950','#ffffff'];
  const pieces = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height * 0.5,
    r: 4 + Math.random() * 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 4,
    vy: 3 + Math.random() * 5,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.2,
    alpha: 1,
  }));

  let frame;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.angle += p.spin;
      if (p.y > canvas.height * 0.75) p.alpha -= 0.025;
      if (p.alpha <= 0) return;
      alive++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.55);
      ctx.restore();
    });
    if (alive > 0) frame = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  cancelAnimationFrame(frame);
  draw();
}

/* ═══════════════════════════════════════════════════════════
   Event listeners
═══════════════════════════════════════════════════════════ */
el.startBtn.addEventListener('click', startGame);
el.hintBtn.addEventListener('click', getHint);
el.cashBtn.addEventListener('click', cashOut);

document.getElementById('mineGroup').addEventListener('click', e => {
  const btn = e.target.closest('.seg');
  if (!btn || btn.classList.contains('locked')) return;
  document.querySelectorAll('#mineGroup .seg').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.mineCount = parseInt(btn.dataset.val, 10);
});

document.getElementById('betGroup').addEventListener('click', e => {
  const btn = e.target.closest('.seg');
  if (!btn || btn.classList.contains('locked')) return;
  document.querySelectorAll('#betGroup .seg').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.betAmount = parseInt(btn.dataset.val, 10);
  updateMultUI();
});

/* ═══════════════════════════════════════════════════════════
   Init
═══════════════════════════════════════════════════════════ */
(function init() {
  renderGrid();
  updateBalanceUI();
  updateMultUI();
  updateHintsUI();
  updateStatsUI();
  applyLang(); // apply default EN translations
})();
