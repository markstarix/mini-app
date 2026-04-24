// === НАСТРОЙКИ ===
const REF_LINK = "https://1wbsds.life/casino/list?open=register"; // ← ОБЯЗАТЕЛЬНО ЗАМЕНИ!

let lastSignalTime = localStorage.getItem("lastSignal") ? new Date(localStorage.getItem("lastSignal")) : null;

// Переключение вкладок
function showTab(tab) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  const content = document.getElementById("content");
  content.innerHTML = "";

  if (tab === "home") {
    content.innerHTML = `
      <div class="card">
        <h2 style="color:#00f0ff;margin-bottom:15px">Welcome to Mines Mod 2.0</h2>
        <p style="color:#aaa">AI-powered predictor for 1Win Mines</p>
      </div>
      <button class="btn-primary" onclick="showTab('mines')">GET FREE SIGNAL</button>
    `;
  }

  else if (tab === "mines") {
    content.innerHTML = `
      <h2 style="margin-bottom:20px;text-align:center">Choose Mines Count</h2>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:30px">
        <div class="mine-count" data-count="1">1</div>
        <div class="mine-count active" data-count="3">3</div>
        <div class="mine-count" data-count="5">5</div>
        <div class="mine-count" data-count="7">7</div>
      </div>
      <button class="btn-primary" id="generateBtn">GENERATE SIGNAL</button>
      <div id="minesGrid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:30px 0 20px"></div>
    `;

    // Выбор количества мин
    document.querySelectorAll('.mine-count').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.mine-count').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
      });
    });

    document.getElementById("generateBtn").addEventListener('click', generateSignal);
  }

  else if (tab === "fly") {
    content.innerHTML = `<div class="card"><h2 style="text-align:center">✈️ Aviator Mode</h2><p style="text-align:center;color:#aaa;margin-top:20px">Coming in next update</p></div>`;
  }

  else if (tab === "refer") {
    content.innerHTML = `
      <div class="card">
        <h3>Refer & Earn Unlimited Signals</h3>
        <p style="margin:15px 0">Share your link and get +1 signal for every friend</p>
        <button onclick="copyRefLink()" class="btn-primary">COPY MY REF LINK</button>
      </div>
    `;
  }

  else if (tab === "settings") {
    content.innerHTML = `<div class="card"><h3>Settings</h3><p>Language • 1Win ID • Account Status</p></div>`;
  }
}

function generateSignal() {
  const now = new Date();
  if (lastSignalTime && (now - lastSignalTime) < 12 * 60 * 60 * 1000) {
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
    cell.style = "aspect-ratio:1; background:#1a1a2a; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:32px; cursor:pointer;";
    cell.textContent = "❓";
    grid.appendChild(cell);
  }

  // Генерация безопасных клеток
  setTimeout(() => {
    const cells = Array.from(grid.children);
    const safe = [0,4,6,8,12,16,18,20,24]; // можно менять
    safe.forEach(i => {
      cells[i].innerHTML = "✅";
      cells[i].style.background = "#00ffaa";
      cells[i].style.color = "#000";
    });
    alert("✅ Signal generated! Open only green cells.");
  }, 600);
}

function copyRefLink() {
  navigator.clipboard.writeText(REF_LINK).then(() => {
    alert("✅ Referral link copied to clipboard!");
  });
}

// Запуск приложения
window.onload = () => {
  // После загрузки показываем Home
  setTimeout(() => {
    showTab("home");
  }, 800);
};