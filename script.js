// ====================== НАСТРОЙКИ ======================
const REF_LINK = "https://1wbsds.life/casino/list?open=register"; // ← Замени обязательно!

let lastSignalTime = localStorage.getItem("lastSignal") ? new Date(localStorage.getItem("lastSignal")) : null;

// ====================== ЗАГРУЗКА ======================
async function simulateLoading() {
  const logEl = document.getElementById("log");
  const progressEl = document.getElementById("progress");

  const logs = [
    "CONNECTING TO 1WIN SERVERS...",
    "INITIALIZING NEURAL ENGINE V2.0...",
    "CALIBRATING MINES PATTERN...",
    "SYNCING WITH 1WIN CORE...",
    "READY."
  ];

  for (let i = 0; i < logs.length; i++) {
    logEl.innerHTML += `<div>> ${logs[i]}</div>`;
    logEl.scrollTop = logEl.scrollHeight;
    progressEl.style.width = `${(i + 1) * 20}%`;
    await new Promise(r => setTimeout(r, 650));
  }

  setTimeout(() => {
    document.getElementById("loadingScreen").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loadingScreen").style.display = "none";
      document.getElementById("mainApp").classList.remove("hidden");
      showTab("home");
    }, 600);
  }, 800);
}

// ====================== ВКЛАДКИ ======================
function showTab(tab) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  const content = document.getElementById("content");
  content.innerHTML = "";

  if (tab === "home") {
    content.innerHTML = `
      <div class="card">
        <h2>Welcome to Mines Mod 2.0</h2>
        <p style="color:#aaa">Professional AI Predictor</p>
      </div>
      <button onclick="showTab('mines')" class="btn-primary">GET FREE SIGNAL</button>
    `;
  } 
  else if (tab === "mines") {
    content.innerHTML = `
      <h2 style="text-align:center;margin-bottom:25px">Choose Mines Count</h2>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:30px">
        <div class="mine-count" data-count="1">1</div>
        <div class="mine-count active" data-count="3">3</div>
        <div class="mine-count" data-count="5">5</div>
        <div class="mine-count" data-count="7">7</div>
      </div>
      <button id="generateBtn" class="btn-primary">GENERATE SIGNAL</button>
      <div id="minesGrid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:30px"></div>
    `;

    document.querySelectorAll('.mine-count').forEach(el => {
      el.onclick = () => {
        document.querySelectorAll('.mine-count').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
      };
    });

    document.getElementById("generateBtn").onclick = generateSignal;
  }
}

// ====================== ГЕНЕРАЦИЯ СИГНАЛА ======================
function generateSignal() {
  const now = new Date();

  // Для тестирования — можно сбросить таймер (убери потом)
  // lastSignalTime = null;

  if (lastSignalTime && (now - lastSignalTime) < 12*60*60*1000) {
    const hoursLeft = Math.ceil((lastSignalTime.getTime() + 12*60*60*1000 - now) / (1000*60*60));
    showNotification(`⏳ Next free signal in ${hoursLeft} hours`, "warning");
    return;
  }

  lastSignalTime = now;
  localStorage.setItem("lastSignal", now.toISOString());

  const grid = document.getElementById("minesGrid");
  grid.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.style = "aspect-ratio:1; background:#1a1a2a; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:32px;";
    cell.textContent = "❓";
    grid.appendChild(cell);
  }

  setTimeout(() => {
    const cells = Array.from(grid.children);
    const safePositions = [0, 4, 6, 8, 12, 16, 18, 20, 24];
    safePositions.forEach(i => {
      cells[i].textContent = "✅";
      cells[i].style.background = "#00ffaa";
      cells[i].style.color = "#000";
    });
    showNotification("✅ Signal Generated! Open only green cells.", "success");
  }, 600);
}

function showNotification(text, type = "success") {
  const notif = document.createElement("div");
  notif.style = `
    position:fixed; top:20px; left:50%; transform:translateX(-50%);
    background:${type === "success" ? "#00ffaa" : "#ffaa00"};
    color:#000; padding:15px 25px; border-radius:12px;
    font-weight:700; z-index:10000; box-shadow:0 4px 20px rgba(0,0,0,0.5);
  `;
  notif.textContent = text;
  document.body.appendChild(notif);

  setTimeout(() => notif.remove(), 3500);
}

function copyRefLink() {
  navigator.clipboard.writeText(REF_LINK);
  showNotification("✅ Referral link copied!", "success");
}

// ====================== ЗАПУСК ======================
window.onload = simulateLoading;