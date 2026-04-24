let lastSignalTime = null;

const btn = document.getElementById('getSignalBtn');
const timerEl = document.getElementById('timer');
const gridEl = document.getElementById('minesGrid');
const statusEl = document.getElementById('status');

// Создаём поле 5x5
function createGrid() {
  gridEl.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = '❓';
    gridEl.appendChild(cell);
  }
}

// Генерация сигнала
function generateSignal() {
  const safeCells = [0, 4, 6, 8, 12, 16, 18, 20, 24]; // углы + центр + края
  
  document.querySelectorAll('.cell').forEach((cell, index) => {
    if (safeCells.includes(index)) {
      cell.textContent = '✅';
      cell.style.background = '#00cc66';
    } else {
      cell.textContent = '💣';
      cell.style.background = '#cc3333';
    }
  });
  
  statusEl.textContent = "Сигнал получен! Открывай зелёные клетки";
}

// Таймер
function startTimer() {
  const now = Date.now();
  const nextSignal = lastSignalTime ? lastSignalTime + 12*60*60*1000 : now;
  
  function updateTimer() {
    const remaining = Math.max(0, nextSignal - Date.now());
    if (remaining === 0) {
      timerEl.textContent = "Сигнал готов!";
      btn.disabled = false;
      return;
    }
    
    const hours = Math.floor(remaining / (1000*60*60));
    const minutes = Math.floor((remaining % (1000*60*60)) / (1000*60));
    timerEl.textContent = `Следующий сигнал через ${hours}ч ${minutes}м`;
    setTimeout(updateTimer, 30000);
  }
  updateTimer();
}

btn.addEventListener('click', () => {
  lastSignalTime = Date.now();
  generateSignal();
  startTimer();
  btn.disabled = true;
});

// Инициализация
createGrid();
startTimer();
