const REF_LINK = "https://1wbsds.life/v3/7001/promo-ipl-india"; // ← Замени на свою реф ссылку

async function simulateLoading() {
  const logEl = document.getElementById("log");
  const progressEl = document.getElementById("progress");

  const logs = ["CONNECTING TO 1WIN SERVERS...","INITIALIZING NEURAL ENGINE V2.0...","CALIBRATING MINES PATTERN...","SYNCING WITH 1WIN CORE...","READY."];

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
      <h2 style="text-align:center;margin-bottom:20px">Choose Mines Count</h2>
      <div class="mine-selector">
        <div class="mine-count" data-count="1">1</div>
        <div class="mine-count active" data-count="3">3</div>
        <div class="mine-count" data-count="5">5</div>
        <div class="mine-count" data-count="7">7</div>
      </div>
      <button id="generateBtn" class="btn-primary">GENERATE NEURAL SIGNAL</button>
      <div id="minesGrid" class="mines-grid"></div>
    `;

    document.querySelectorAll('.mine-count').forEach(el => {
      el.onclick = () => {
        document.querySelectorAll('.mine-count').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
      };
    });

    document.getElementById("generateBtn").onclick = generateSignal;
  }
  else if (tab === "fly") {
    content.innerHTML = `<div class="card"><h2 style="text-align:center">✈️ Aviator</h2><p style="text-align:center;color:#aaa;margin-top:30px">Coming soon</p></div>`;
  }
  else if (tab === "refer") {
    content.innerHTML = `
      <div class="card">
        <h3>Refer & Earn</h3>
        <p style="margin:15px 0">Share your link and get unlimited signals</p>
        <button onclick="copyRefLink()" class="btn-primary">COPY REFERRAL LINK</button>
      </div>
    `;
  }
}

function generateSignal() {
  const grid = document.getElementById("minesGrid");
  grid.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = "⬛";
    grid.appendChild(cell);
  }

  setTimeout(() => {
    const cells = Array.from(grid.children);
    let safeCount = Math.floor(Math.random() * 3) + 7;
    let safePositions = [];

    while (safePositions.length < safeCount) {
      let pos = Math.floor(Math.random() * 25);
      if (!safePositions.includes(pos)) safePositions.push(pos);
    }

    safePositions.forEach(i => {
      cells[i].innerHTML = "⭐";
      cells[i].classList.add("safe");
    });
  }, 450);
}

function copyRefLink() {
  navigator.clipboard.writeText(REF_LINK);
  alert("✅ Referral link copied!");
}

window.onload = simulateLoading;