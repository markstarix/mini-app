let lastSignalTime = null;

const loadingScreen = document.getElementById('loadingScreen');
const mainApp = document.getElementById('mainApp');
const logEl = document.getElementById('log');
const progressEl = document.getElementById('progress');
const statusText = document.getElementById('statusText');

const logs = [
  "CONNECTING TO 1WIN SERVERS...",
  "INITIALIZING NEURAL PATTERN ENGINE V4.2...",
  "CALIBRATING PATTERN ENGINE...",
  "SYNCING WITH MINES CORE...",
  "READY."
];

async function simulateLoading() {
  for (let i = 0; i < logs.length; i++) {
    logEl.innerHTML += `<div>> ${logs[i]}</div>`;
    logEl.scrollTop = logEl.scrollHeight;
    
    progressEl.style.width = `${(i + 1) * 20}%`;
    
    if (i < logs.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }

  // Завершаем загрузку
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      mainApp.classList.remove('hidden');
    }, 600);
  }, 600);
}

// Запуск загрузки при открытии
window.onload = () => {
  simulateLoading();
};

// Здесь можно добавить логику кнопки "GET FREE SIGNAL" позже