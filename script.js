// ====================== НАСТРОЙКИ ======================
const REF_LINK = "https://твоя-реф-ссылка-1win-здесь"; // ← СЮДА ВСТАВЬ СВОЮ РЕФ ССЫЛКУ!

let lastSignalTime = localStorage.getItem("lastSignal") ? new Date(localStorage.getItem("lastSignal")) : null;

// ====================== ЗАГРУЗКА ======================
async function simulateLoading() {
  const logEl = document.getElementById("log");
  const progressEl = document.getElementById("progress");
  const statusText = document.getElementById("statusText");

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

  // Переход к главному экрану
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
        <h2 style="color:#00f0ff">Welcome to Mines Mod 2.0</h2>
        <p style="color:#aaa;margin-top:8px">Professional AI Predictor for 1Win Mines</p>
      </div>
      <button onclick="showTab('mines')" class="btn-primary">GET FREE SIGNAL</button>
    `;
  }

  else if (tab === "mines") {
    content.innerHTML = `
      <h2 style="text-align:center;margin-bottom:20px">Choose Mines Count</h2>
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
      el.addEventListener('click', () => {
        document.querySelectorAll('.mine-count').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
      });
    });

    document.getElementById("generateBtn").addEventListener('click', generateSignal);
  }

  else if (tab === "fly") content.innerHTML = `<div class="card"><h3 style="text-align:center">✈️ Aviator</h3><p style="text-align:center;color:#aaa">Coming soon</p></div>`;
  else if (tab === "refer") content.innerHTML = `<div class="card"><h3>Refer & Earn</h3><button onclick="copyRefLink()" class="btn-primary">COPY REF LINK</button></div>`;
  else if (tab === "settings") content.innerHTML = `<div class="card"><h3>Settings</h3><p>Language & Account</p></div>`;
}

function generateSignal() {
  const now = new Date();
  if (lastSignalTime && (now - lastSignalTime) < 12*60*60*1000) {
    const hoursLeft = Math.ceil((lastSignalTime.getTime() + 12*60*60*1000 - now) / (1000*60*60));
    alert(`⏳ Next free signal in ${hoursLeft} hours`);
    return;
  }

  lastSignalTime = now;
  localStorage.setItem("lastSignal", now.toISOString());

  const grid = document.getElementById("minesGrid");
  grid.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.style = "aspect-ratio:1;background:#1a1a2a;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:32px;";
    cell.textContent = "❓";
    grid.appendChild(cell);
  }

  setTimeout(() => {
    const cells = Array.from(grid.children);
    const safe = [0,4,6,8,12,16,18,20,24];
    safe.forEach(i => {
      cells[i].innerHTML = "✅";
      cells[i].style.background = "#00ffaa";
      cells[i].style.color = "#000";
    });
  }, 500);
}

function copyRefLink() {
  navigator.clipboard.writeText(REF_LINK);
  alert("✅ Referral link copied!");
}

// ====================== ЗАПУСК ======================
window.onload = simulateLoading;