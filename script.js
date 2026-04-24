// === НАСТРОЙКИ ===
const REF_LINK = "https://1wbsds.life/casino/list?open=register"; // ← Замени на свою!

let currentTab = "home";
let lastSignalTime = localStorage.getItem("lastSignal") ? new Date(localStorage.getItem("lastSignal")) : null;

// Loading screen
async function simulateLoading() {
  const logs = [
    "CONNECTING TO 1WIN SERVERS...",
    "INITIALIZING NEURAL ENGINE V2.0...",
    "CALIBRATING MINES PATTERN...",
    "SYNCING WITH 1WIN CORE...",
    "READY."
  ];
  const logEl = document.getElementById("log");
  const progressEl = document.getElementById("progress");

  for (let i = 0; i < logs.length; i++) {
    logEl.innerHTML += `<div>> ${logs[i]}</div>`;
    logEl.scrollTop = logEl.scrollHeight;
    progressEl.style.width = `${(i+1)*20}%`;
    await new Promise(r => setTimeout(r, 650));
  }

  setTimeout(() => {
    document.getElementById("loadingScreen").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loadingScreen").style.display = "none";
      showTab("home");
    }, 600);
  }, 700);
}

// Переключение вкладок
function showTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  const content = document.getElementById("content");
  content.innerHTML = "";

  if (tab === "home") {
    content.innerHTML = `
      <div class="card"><h2 style="color:#00f0ff">Welcome to Mines Mod 2.0</h2></div>
      <div class="card">
        <button class="btn-primary" id="freeSignalHome">GET FREE SIGNAL</button>
      </div>
    `;
    document.getElementById("freeSignalHome").onclick = () => showTab("mines");
  }

  else if (tab === "mines") {
    content.innerHTML = `
      <h2 style="margin-bottom:20px">Choose Mines Count</h2>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:30px">
        <div class="mine-count" data-count="1">1</div>
        <div class="mine-count active" data-count="3">3</div>
        <div class="mine-count" data-count="5">5</div>
        <div class="mine-count" data-count="7">7</div>
      </div>
      <button class="btn-primary" id="getSignalBtn">GENERATE SIGNAL</button>
      <div id="minesGrid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:25px 0"></div>
    `;

    // Логика генерации сигнала
    document.getElementById("getSignalBtn").onclick = generateMinesSignal;
  }

  // Остальные вкладки можно доработать позже
  else if (tab === "fly") content.innerHTML = `<div class="card"><h3>✈️ Aviator coming soon</h3></div>`;
  else if (tab === "refer") content.innerHTML = `<div class="card"><h3>👥 Refer & Earn</h3><p>Share your link and get unlimited signals</p><button onclick="copyRef()" class="btn-primary">COPY REFERRAL LINK</button></div>`;
  else if (tab === "settings") content.innerHTML = `<div class="card"><h3>Settings</h3><p>Language and 1Win ID</p></div>`;
}

// Генерация сигнала на Mines
function generateMinesSignal() {
  const now = new Date();
  if (lastSignalTime && (now - lastSignalTime) < 12*60*60*1000) {
    const left = Math.ceil((lastSignalTime.getTime() + 12*60*60*1000 - now) / (1000*60*60));
    alert(`⏳ Next free signal in ${left} hours`);
    return;
  }

  lastSignalTime = now;
  localStorage.setItem("lastSignal", now.toISOString());

  const grid = document.getElementById("minesGrid");
  grid.innerHTML = "";
  const safeCount = 8; // пример

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.style = "aspect-ratio:1; background:#1a1a2a; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:28px;";
    cell.textContent = "❓";
    grid.appendChild(cell);
  }

  // Подсвечиваем безопасные клетки
  setTimeout(() => {
    const cells = grid.children;
    const safe = [0,4,6,8,12,16,18,20,24]; // пример
    safe.forEach(i => {
      cells[i].textContent = "✅";
      cells[i].style.background = "#00ffaa";
      cells[i].style.color = "#000";
    });
  }, 400);
}

function copyRef() {
  navigator.clipboard.writeText(REF_LINK);
  alert("✅ Referral link copied!");
}

// Языковой селектор
document.getElementById("langBtn").onclick = () => {
  document.getElementById("langSelector").classList.toggle("hidden");
};

document.querySelectorAll(".lang-option").forEach(el => {
  el.onclick = () => {
    document.getElementById("langBtn").textContent = el.textContent.split(" ")[0];
    document.getElementById("langSelector").classList.add("hidden");
    // Здесь можно добавить переводы позже
  };
});

// Запуск
window.onload = simulateLoading;