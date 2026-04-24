/* ═══════════════════════════════════════════════════════════
   MINES DEMO — Telegram Mini App
   app.js  —  Game logic + UI updates
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── Telegram WebApp init ─────────────────────────────── */
const tg = window.Telegram?.WebApp ?? null;
if (tg) {
  tg.ready();
  tg.expand();
  // Apply Telegram color scheme class
  if (tg.colorScheme === 'dark') document.body.classList.add('tg-dark');
}

/* ─── Constants ────────────────────────────────────────── */
const GRID_SIZE   = 25;   // 5×5
const MAX_HINTS   = 3;
const HOUSE_EDGE  = 0.97; // 3% house edge for realistic multipliers
const START_BAL   = 10_000;
const REFILL_THR  = 50;   // auto-refill balance if below this

/* ─── State ────────────────────────────────────────────── */
const state = {
  balance:      START_BAL,
  betAmount:    100,
  mineCount:    1,
  grid:         [],   // length 25: { hasMine, revealed, hinted }
  gameStatus:   'idle', // 'idle' | 'playing' | 'ended'
  revealedCount: 0,
  hintsUsed:    0,
  multiplier:   1.00,
  stats: { wins: 0, losses: 0, profit: 0 },
};

/* ─── DOM refs ─────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const el = {
  balance:    $('balance'),
  grid:       $('grid'),
  multiplier: $('multiplier'),
  potential:  $('potential'),
  hintsLeft:  $('hintsLeft'),
  startBtn:   $('startBtn'),
  hintBtn:    $('hintBtn'),
  cashBtn:    $('cashBtn'),
  statWins:   $('statWins'),
  statLosses: $('statLosses'),
  statProfit: $('statProfit'),
  toast:      $('toast'),
  confetti:   $('confetti'),
};

/* ═══════════════════════════════════════════════════════════
   MULTIPLIER  —  exact combinatorial formula
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
   GRID
═══════════════════════════════════════════════════════════ */
function buildGrid() {
  state.grid = Array.from({ length: GRID_SIZE }, () => ({
    hasMine: false,
    revealed: false,
    hinted: false,
  }));

  // Place mines via Fisher-Yates shuffle on indices
  const indices = Array.from({ length: GRID_SIZE }, (_, i) => i);
  for (let i = GRID_SIZE - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  indices.slice(0, state.mineCount).forEach(idx => {
    state.grid[idx].hasMine = true;
  });
}

function renderGrid() {
  el.grid.innerHTML = '';
  const isPlaying = state.gameStatus === 'playing';

  state.grid.forEach((cell, i) => {
    const btn = document.createElement('button');
    btn.className = 'tile';
    btn.dataset.i = i;

    if (cell.revealed) {
      if (cell.hasMine) {
        btn.classList.add('mine');
        btn.textContent = '💣';
      } else {
        btn.classList.add('gem');
        btn.textContent = '💎';
      }
      btn.disabled = true;
    } else if (isPlaying) {
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

/* get live tile element */
function tileEl(i) {
  return el.grid.querySelector(`[data-i="${i}"]`);
}

/* ═══════════════════════════════════════════════════════════
   GAME FLOW
═══════════════════════════════════════════════════════════ */
function startGame() {
  // If already playing — reset immediately (new game)
  if (state.gameStatus === 'playing') {
    // Refund partial bet on manual reset
    state.balance += state.betAmount;
  }

  // Auto-refill for demo
  if (state.balance < state.betAmount) {
    state.balance = START_BAL;
    showToast('🎁 Баланс пополнен до 10 000!', 'info');
  }

  state.balance -= state.betAmount;
  state.gameStatus  = 'playing';
  state.revealedCount = 0;
  state.hintsUsed   = 0;
  state.multiplier  = 1.00;

  buildGrid();
  renderGrid();
  lockSettings(true);

  el.startBtn.textContent = '🔄 Новая игра';
  el.hintBtn.disabled  = false;
  el.cashBtn.disabled  = true;
  el.cashBtn.classList.remove('pulse-green');

  updateBalanceUI();
  updateMultUI();
  updateHintsUI();

  haptic('light');
  showToast('🎮 Игра началась — выбирай клетки!');
}

function onTileClick(index) {
  if (state.gameStatus !== 'playing') return;
  const cell = state.grid[index];
  if (cell.revealed) return;

  cell.revealed = true;
  cell.hinted   = false;

  const tile = tileEl(index);

  if (cell.hasMine) {
    // ── BOOM ─────────────────────────────────────────────
    tile.className = 'tile mine boom';
    tile.textContent = '💣';
    tile.disabled = true;
    haptic('heavy');
    setTimeout(() => revealAllMines(index), 250);
    endGame(false);
  } else {
    // ── SAFE ─────────────────────────────────────────────
    state.revealedCount++;
    tile.className = 'tile gem';
    tile.textContent = '💎';
    tile.disabled = true;

    state.multiplier = calcMultiplier(state.mineCount, state.revealedCount);
    updateMultUI();
    haptic('light');

    el.cashBtn.disabled = false;
    el.cashBtn.classList.add('pulse-green');

    // All safe cells revealed → auto-win
    const totalSafe = GRID_SIZE - state.mineCount;
    if (state.revealedCount >= totalSafe) {
      endGame(true);
    }
  }
}

function cashOut() {
  if (state.gameStatus !== 'playing' || state.revealedCount === 0) return;

  const won = Math.floor(state.betAmount * state.multiplier);
  const profit = won - state.betAmount;

  state.balance += won;
  state.stats.wins++;
  state.stats.profit += profit;
  state.gameStatus = 'ended';

  haptic('heavy');
  showToast(`💰 Забрал ${formatNum(won)} 🪙  (+${formatNum(profit)})`, 'win');
  launchConfetti();

  updateBalanceUI();
  updateStatsUI();
  revealAllMines(-1); // show where mines were
  resetButtons();
}

function endGame(won) {
  state.gameStatus = 'ended';

  if (won) {
    // Auto-win — all safe cells opened
    const winAmt = Math.floor(state.betAmount * state.multiplier);
    const profit  = winAmt - state.betAmount;
    state.balance += winAmt;
    state.stats.wins++;
    state.stats.profit += profit;
    updateBalanceUI();
    showToast(`🏆 Все клетки открыты! +${formatNum(winAmt)} 🪙`, 'win');
    launchConfetti();
  } else {
    state.stats.losses++;
    state.stats.profit -= state.betAmount;
    showToast(`💥 Мина! Потеряно ${formatNum(state.betAmount)} 🪙`, 'loss');
  }

  updateStatsUI();
  resetButtons();
}

function revealAllMines(exceptIdx) {
  state.grid.forEach((cell, i) => {
    if (!cell.hasMine || i === exceptIdx) return;
    if (cell.revealed) return;
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
    el.startBtn.textContent = '🚀 Старт';
    el.hintBtn.disabled  = true;
    el.cashBtn.disabled  = true;
    el.cashBtn.classList.remove('pulse-green');
    lockSettings(false);
    renderGrid(); // render idle grid
  }, 1200);
}

/* ═══════════════════════════════════════════════════════════
   HINTS  —  Random, for entertainment only
═══════════════════════════════════════════════════════════ */
function getHint() {
  if (state.gameStatus !== 'playing') return;
  if (state.hintsUsed >= MAX_HINTS) return;

  // Clear previous hints from state
  state.grid.forEach(c => { c.hinted = false; });

  // Collect unrevealed cells
  const unrevealed = state.grid.reduce((acc, c, i) => {
    if (!c.revealed) acc.push(i);
    return acc;
  }, []);

  if (!unrevealed.length) return;

  // Pick 1 or 2 random cells — truly random (may be mine or safe)
  const count = Math.min(unrevealed.length >= 3 ? 2 : 1, unrevealed.length);
  const shuffled = [...unrevealed].sort(() => Math.random() - 0.5);
  shuffled.slice(0, count).forEach(idx => { state.grid[idx].hinted = true; });

  state.hintsUsed++;
  haptic('medium');
  renderGrid(); // re-render with hinted tiles
  updateHintsUI();
  showToast('🔮 Случайная подсказка сгенерирована', 'info');
}

/* ═══════════════════════════════════════════════════════════
   UI HELPERS
═══════════════════════════════════════════════════════════ */
function formatNum(n) {
  return Number(n).toLocaleString('ru-RU');
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
  el.hintsLeft.className = 'hint-badge' + (rem === 0 ? ' zero' : '');
  if (rem === 0) el.hintBtn.disabled = true;
}

function updateStatsUI() {
  el.statWins.textContent   = state.stats.wins;
  el.statLosses.textContent = state.stats.losses;
  const p = state.stats.profit;
  el.statProfit.textContent = (p >= 0 ? '+' : '') + formatNum(p);
  el.statProfit.className = 'stat-val ' + (p > 0 ? 'plus' : p < 0 ? 'minus' : 'neutral');
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
  el.toast.className = 'toast show ' + type;
  _toastTimer = setTimeout(() => {
    el.toast.classList.remove('show');
  }, 2800);
}

/* ── Haptic ────────────────────────────────────────────── */
function haptic(style) {
  try { tg?.HapticFeedback?.impactOccurred(style); } catch (_) {}
}

/* ═══════════════════════════════════════════════════════════
   CONFETTI  —  lightweight canvas confetti on win
═══════════════════════════════════════════════════════════ */
function launchConfetti() {
  const canvas  = el.confetti;
  const ctx     = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#f0b429','#00c9a7','#8b5cf6','#f85149','#3fb950','#fff'];
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
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;
      if (p.y > canvas.height * 0.7) p.alpha -= 0.025;
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
   EVENT LISTENERS
═══════════════════════════════════════════════════════════ */

// Start / New Game
el.startBtn.addEventListener('click', startGame);

// Hint
el.hintBtn.addEventListener('click', getHint);

// Cash Out
el.cashBtn.addEventListener('click', cashOut);

// Mine count selector
document.getElementById('mineGroup').addEventListener('click', e => {
  const btn = e.target.closest('.seg');
  if (!btn || btn.classList.contains('locked')) return;
  document.querySelectorAll('#mineGroup .seg').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.mineCount = parseInt(btn.dataset.val, 10);
});

// Bet selector
document.getElementById('betGroup').addEventListener('click', e => {
  const btn = e.target.closest('.seg');
  if (!btn || btn.classList.contains('locked')) return;
  document.querySelectorAll('#betGroup .seg').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.betAmount = parseInt(btn.dataset.val, 10);
  updateMultUI(); // refresh potential
});

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
(function init() {
  renderGrid();
  updateBalanceUI();
  updateMultUI();
  updateHintsUI();
  updateStatsUI();
})();
