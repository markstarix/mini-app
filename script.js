const REF_LINK = "https://1wbsds.life/v3/7001/promo-ipl-india"; // ← твоя реф ссылка

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

function showTab(tab) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  const content = document.getElementById("content");
  content.innerHTML = "";

  if (tab === "home") {
    content.innerHTML = `
      <div class="card">
        <h2>Welcome to Mines Mod 2.0</h2>
        <p style="color:#aaa">Professional AI Predictor for 1Win Mines</p>
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

function generateSignal() {
  const grid = document.getElementById("minesGrid");
  grid.innerHTML = "";

  // Профессиональный дизайн клеток
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = "⬛";
    grid.appendChild(cell);
  }

  setTimeout(() => {
    const cells = grid.children;
    const safePositions = [0, 4, 6, 8, 12, 16, 18, 20, 24];

    safePositions.forEach(i => {
      cells[i].innerHTML = "💎";
      cells[i].style.background = "linear-gradient(145deg, #00ffcc, #00ccaa)";
      cells[i].style.boxShadow = "0 0 15px #00ffcc";
      cells[i].style.color = "#000";
      cells[i].style.fontSize = "28px";
    });

    alert("✅ NEURAL SCAN COMPLETE\n\nОткрывай только клетки с 💎");
  }, 600);
}

// Запуск
window.onload = simulateLoading;