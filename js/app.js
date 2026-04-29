'use strict';

/* ═══════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════ */
const CONFIG = {
  refUrl:         'https://1wbsds.life/casino/list?open=register', // ← replace with real referral URL
  cooldownMs:     8 * 60 * 60 * 1000,               // 8 hours
  coinsPerRef:    100,
  bonusSigPerRef: 1,
  coinsPerSignal: 200,
  scanDurationMs: 3000,
};

/* ═══════════════════════════════════════════
   TRANSLATIONS
═══════════════════════════════════════════ */
const LANGS = {
  en: {
    appName:'MINES × AVIATOR', appTagline:'AI-POWERED PREDICTION ENGINE',
    badgeFree:'FREE', coins:'COINS',
    btnFreeSignal:'GET SIGNAL', btnGetAvSignal:'GET AVIATOR SIGNAL',
    scanHint:'TAP TO LAUNCH THE NEURAL SCANNER',
    howTitle:'HOW IT WORKS',
    s1h:'Pick your game',    s1t:'Choose Mines or Aviator mode',
    s2h:'Run AI scan',       s2t:'Neural pattern engine reads the board',
    s3h:'Follow the signal', s3t:'Play exactly as the AI indicates',
    aiTitle:'AI ASSISTANT',
    q1:'BEST STRATEGY?', q2:'HOW ACCURATE?', q3:'SAFEST MINES?', q4:'AVIATOR TIPS?',
    send:'SEND',
    premTitle:'UNLOCK PREMIUM',
    premDesc:'Get 95%+ accuracy signals, unlimited scans, and priority AI support.',
    btnGetAccess:'GET ACCESS',
    premNote:'REGISTER & DEPOSIT VIA OUR LINK — VIP AUTO-ACTIVATES WITHIN 60 SECONDS',
    vipOnly:'VIP MEMBERS ONLY',
    minesTitle:'MINES MOD AI', minesSub:'NEURAL PATTERN ANALYSIS',
    linkId:'LINK PROFILE ID',
    lEarned:'EARNED', lSignals:'SIGNALS', lStreak:'STREAK', lToday:'TODAY',
    mineCountLabel:'◇ MINE COUNT', mine:'MINE', mines:'MINES',
    btnGetSignal:'GET SIGNAL',
    cooldownNote:'Free signals refresh every 8 hours. Upgrade to VIP for unlimited.',
    unlimitedTitle:'UNLOCK UNLIMITED SIGNALS',
    unlimitedDesc:'VIP members see all safe tiles + exact confidence %. One deposit unlocks unlimited signals forever.',
    btnUnlimited:'UNLOCK UNLIMITED → USE OUR LINK',
    btnNewSignal:'GET NEW SIGNAL', unlockVip:'UNLOCK VIP',
    flyTitle:'AVIATOR AI', flySub:'MULTIPLIER PREDICTION ENGINE',
    referTitle:'REFER & EARN',
    referSub:'INVITE FRIENDS · STACK COINS · UNLOCK BONUS SIGNALS',
    walletBalance:'WALLET BALANCE', walletNote:'200 coins = 1 bonus signal',
    yourRefLink:'YOUR REFERRAL LINK',
    refDesc:'Share this link. When a friend uses their first signal, you earn +100 coins + 1 bonus signal.',
    copy:'COPY', shareOnTg:'SHARE ON TELEGRAM',
    yourStats:'YOUR STATS', friendsReferred:'FRIENDS REFERRED', bonusSigs:'BONUS SIGNALS',
    spendCoins:'SPEND COINS',
    spendDesc:'Convert coins into extra Mines signals. 200 coins = 1 signal. Bonus signals stack with your daily free limit.',
    btnSpend:'SPEND 200 COINS → 1 SIGNAL',
    settingsTitle:'SETTINGS', profileTitle:'YOUR PROFILE ID',
    profileDesc:'Link your account ID so the AI can tailor signals to your play history.',
    save:'SAVE', clear:'CLEAR',
    accountStatus:'ACCOUNT STATUS',
    accountStatusDesc:'VIP unlocks 95%+ accuracy, unlimited scans, and priority support.',
    freeTier:'FREE TIER', language:'LANGUAGE',
    navHome:'HOME', navMines:'MINES', navFly:'AVIATOR', navRefer:'REFER', navSettings:'SETTINGS',
    premModalSub:'Unlimited signals · 95%+ accuracy', step1:'STEP 1',
    premStep1Text:'Register or deposit using OUR link — this auto-activates VIP. Do not use your existing account directly.',
    btnRegDeposit:'REGISTER & DEPOSIT VIA OUR LINK →',
    toastCopied:'LINK COPIED!', toastSaved:'PROFILE SAVED!', toastCleared:'PROFILE CLEARED!',
    toastSpent:'1 BONUS SIGNAL ADDED!', toastNotEnough:'NOT ENOUGH COINS', toastCashout:'CASHED OUT (DEMO)',
    resetTitle:'RESET COOLDOWNS', resetDesc:'Clear signal cooldown timers to get a fresh signal immediately.',
    btnResetCooldown:'RESET COOLDOWNS', toastReset:'COOLDOWNS RESET!',
  },
  hi: {
    appName:'MINES × AVIATOR', appTagline:'AI-संचालित प्रेडिक्शन इंजन',
    badgeFree:'मुफ्त', coins:'सिक्के',
    btnFreeSignal:'सिग्नल लें', btnGetAvSignal:'AVIATOR सिग्नल लें',
    scanHint:'न्यूरल स्कैनर शुरू करने के लिए टैप करें',
    howTitle:'यह कैसे काम करता है',
    s1h:'अपना गेम चुनें',        s1t:'Mines या Aviator मोड चुनें',
    s2h:'AI स्कैन चलाएं',         s2t:'न्यूरल इंजन बोर्ड को पढ़ता है',
    s3h:'सिग्नल फॉलो करें',      s3t:'AI के निर्देश के अनुसार खेलें',
    aiTitle:'AI सहायक',
    q1:'सबसे अच्छी रणनीति?', q2:'यह कितना सटीक है?', q3:'सबसे सुरक्षित माइन्स?', q4:'AVIATOR टिप्स?',
    send:'भेजें',
    premTitle:'प्रीमियम अनलॉक करें',
    premDesc:'95%+ सटीक सिग्नल, असीमित स्कैन और प्राथमिकता AI सहायता पाएं।',
    btnGetAccess:'एक्सेस पाएं',
    premNote:'हमारे LINK से रजिस्टर और डिपॉज़िट करें — VIP 60 सेकंड में स्वतः सक्रिय होता है',
    vipOnly:'केवल VIP सदस्य',
    minesTitle:'MINES MOD AI', minesSub:'न्यूरल पैटर्न विश्लेषण',
    linkId:'प्रोफ़ाइल ID लिंक करें',
    lEarned:'कमाया', lSignals:'सिग्नल', lStreak:'स्ट्रीक', lToday:'आज',
    mineCountLabel:'◇ माइन्स की संख्या', mine:'माइन', mines:'माइन्स',
    btnGetSignal:'सिग्नल लें',
    cooldownNote:'मुफ्त सिग्नल हर 8 घंटे में रिफ्रेश होते हैं। असीमित के लिए VIP अपग्रेड करें।',
    unlimitedTitle:'असीमित सिग्नल अनलॉक करें',
    unlimitedDesc:'VIP सदस्य सभी सुरक्षित टाइल + सटीक % देखते हैं। एक डिपॉज़िट = हमेशा के लिए असीमित सिग्नल।',
    btnUnlimited:'असीमित अनलॉक करें → हमारा LINK उपयोग करें',
    btnNewSignal:'नया सिग्नल लें', unlockVip:'VIP अनलॉक करें',
    flyTitle:'AVIATOR AI', flySub:'मल्टीप्लायर प्रेडिक्शन इंजन',
    referTitle:'रेफर करें और कमाएं',
    referSub:'दोस्तों को आमंत्रित करें · सिक्के जमा करें · बोनस सिग्नल अनलॉक करें',
    walletBalance:'वॉलेट बैलेंस', walletNote:'200 सिक्के = 1 बोनस सिग्नल',
    yourRefLink:'आपका रेफरल LINK',
    refDesc:'यह link शेयर करें। जब दोस्त पहला सिग्नल इस्तेमाल करे, आपको +100 सिक्के + 1 बोनस सिग्नल मिलेगा।',
    copy:'कॉपी', shareOnTg:'Telegram पर शेयर करें',
    yourStats:'आपके आंकड़े', friendsReferred:'रेफर किए दोस्त', bonusSigs:'बोनस सिग्नल',
    spendCoins:'सिक्के खर्च करें',
    spendDesc:'सिक्कों को Mines सिग्नल में बदलें। 200 सिक्के = 1 सिग्नल।',
    btnSpend:'200 सिक्के → 1 सिग्नल',
    settingsTitle:'सेटिंग्स', profileTitle:'आपका प्रोफ़ाइल ID',
    profileDesc:'AI आपके इतिहास के अनुसार सिग्नल कस्टमाइज़ करेगा।',
    save:'सेव करें', clear:'मिटाएं',
    accountStatus:'खाता स्थिति',
    accountStatusDesc:'VIP से 95%+ सटीकता, असीमित स्कैन और प्राथमिकता सहायता।',
    freeTier:'मुफ्त स्तर', language:'भाषा',
    navHome:'होम', navMines:'माइन्स', navFly:'AVIATOR', navRefer:'रेफर', navSettings:'सेटिंग्स',
    premModalSub:'असीमित सिग्नल · 95%+ सटीकता', step1:'चरण 1',
    premStep1Text:'हमारे LINK से रजिस्टर या डिपॉज़िट करें — VIP स्वतः सक्रिय होगा।',
    btnRegDeposit:'हमारे LINK से रजिस्टर और डिपॉज़िट करें →',
    toastCopied:'LINK कॉपी हुआ!', toastSaved:'प्रोफ़ाइल सेव हुआ!', toastCleared:'प्रोफ़ाइल मिटाया!',
    toastSpent:'1 बोनस सिग्नल जोड़ा!', toastNotEnough:'पर्याप्त सिक्के नहीं', toastCashout:'कैश आउट (डेमो)',
    resetTitle:'कूलडाउन रीसेट करें', resetDesc:'सिग्नल कूलडाउन टाइमर हटाएं।',
    btnResetCooldown:'कूलडाउन रीसेट करें', toastReset:'कूलडाउन रीसेट हो गया!',
  },
  es: {
    appName:'MINES × AVIATOR', appTagline:'MOTOR DE PREDICCIÓN CON IA',
    badgeFree:'GRATIS', coins:'MONEDAS',
    btnFreeSignal:'OBTENER SEÑAL', btnGetAvSignal:'SEÑAL AVIATOR',
    scanHint:'TOCA PARA INICIAR EL ESCÁNER NEURONAL',
    howTitle:'CÓMO FUNCIONA',
    s1h:'Elige tu juego',          s1t:'Elige modo Mines o Aviator',
    s2h:'Ejecutar escaneo IA',     s2t:'El motor neuronal lee el tablero',
    s3h:'Sigue la señal',          s3t:'Juega exactamente como indica la IA',
    aiTitle:'ASISTENTE IA',
    q1:'¿MEJOR ESTRATEGIA?', q2:'¿QUÉ TAN PRECISO?', q3:'¿MINAS MÁS SEGURAS?', q4:'¿CONSEJOS AVIATOR?',
    send:'ENVIAR',
    premTitle:'DESBLOQUEAR PREMIUM',
    premDesc:'Obtén señales con 95%+ de precisión, escaneos ilimitados y soporte IA prioritario.',
    btnGetAccess:'OBTENER ACCESO',
    premNote:'REGÍSTRATE Y DEPOSITA CON NUESTRO LINK — VIP SE ACTIVA EN 60 SEGUNDOS',
    vipOnly:'SOLO MIEMBROS VIP',
    minesTitle:'MINES MOD AI', minesSub:'ANÁLISIS DE PATRONES NEURALES',
    linkId:'VINCULAR ID DE PERFIL',
    lEarned:'GANADO', lSignals:'SEÑALES', lStreak:'RACHA', lToday:'HOY',
    mineCountLabel:'◇ CANTIDAD DE MINAS', mine:'MINA', mines:'MINAS',
    btnGetSignal:'OBTENER SEÑAL',
    cooldownNote:'Las señales gratis se recargan cada 8 horas. Actualiza a VIP para ilimitadas.',
    unlimitedTitle:'DESBLOQUEAR SEÑALES ILIMITADAS',
    unlimitedDesc:'Los VIP ven todas las casillas seguras + % exacto. Un depósito desbloquea señales ilimitadas para siempre.',
    btnUnlimited:'ILIMITADO → USA NUESTRO LINK',
    btnNewSignal:'NUEVA SEÑAL', unlockVip:'DESBLOQUEAR VIP',
    flyTitle:'AVIATOR IA', flySub:'MOTOR DE PREDICCIÓN DE MULTIPLICADOR',
    referTitle:'REFERIR Y GANAR',
    referSub:'INVITA AMIGOS · ACUMULA MONEDAS · DESBLOQUEA SEÑALES BONUS',
    walletBalance:'SALDO DE BILLETERA', walletNote:'200 monedas = 1 señal bonus',
    yourRefLink:'TU LINK DE REFERIDO',
    refDesc:'Comparte este link. Cuando un amigo use su primera señal, ganas +100 monedas + 1 señal bonus.',
    copy:'COPIAR', shareOnTg:'COMPARTIR EN TELEGRAM',
    yourStats:'TUS ESTADÍSTICAS', friendsReferred:'AMIGOS REFERIDOS', bonusSigs:'SEÑALES BONUS',
    spendCoins:'GASTAR MONEDAS',
    spendDesc:'Convierte monedas en señales de Mines. 200 monedas = 1 señal.',
    btnSpend:'GASTAR 200 MONEDAS → 1 SEÑAL',
    settingsTitle:'CONFIGURACIÓN', profileTitle:'TU ID DE PERFIL',
    profileDesc:'Vincula tu ID para que la IA personalice las señales según tu historial.',
    save:'GUARDAR', clear:'LIMPIAR',
    accountStatus:'ESTADO DE CUENTA',
    accountStatusDesc:'VIP desbloquea 95%+ de precisión, escaneos ilimitados y soporte prioritario.',
    freeTier:'NIVEL GRATIS', language:'IDIOMA',
    navHome:'INICIO', navMines:'MINAS', navFly:'AVIATOR', navRefer:'REFERIR', navSettings:'AJUSTES',
    premModalSub:'Señales ilimitadas · 95%+ de precisión', step1:'PASO 1',
    premStep1Text:'Regístrate o deposita con NUESTRO link — esto activa el VIP automáticamente.',
    btnRegDeposit:'REGISTRARSE Y DEPOSITAR CON NUESTRO LINK →',
    toastCopied:'¡LINK COPIADO!', toastSaved:'¡PERFIL GUARDADO!', toastCleared:'¡PERFIL BORRADO!',
    toastSpent:'¡1 SEÑAL BONUS AÑADIDA!', toastNotEnough:'MONEDAS INSUFICIENTES', toastCashout:'RETIRADO (DEMO)',
    resetTitle:'REINICIAR COOLDOWNS', resetDesc:'Borra los temporizadores de señal para obtener una nueva señal.',
    btnResetCooldown:'REINICIAR COOLDOWNS', toastReset:'¡COOLDOWNS REINICIADOS!',
  },
  pt: {
    appName:'MINES × AVIATOR', appTagline:'MOTOR DE PREVISÃO COM IA',
    badgeFree:'GRÁTIS', coins:'MOEDAS',
    btnFreeSignal:'OBTER SINAL', btnGetAvSignal:'SINAL AVIATOR',
    scanHint:'TOQUE PARA INICIAR O SCANNER NEURAL',
    howTitle:'COMO FUNCIONA',
    s1h:'Escolha seu jogo',            s1t:'Escolha modo Mines ou Aviator',
    s2h:'Execute o scan de IA',        s2t:'O motor neural lê o tabuleiro',
    s3h:'Siga o sinal',                s3t:'Jogue exatamente como a IA indica',
    aiTitle:'ASSISTENTE IA',
    q1:'MELHOR ESTRATÉGIA?', q2:'QUÃO PRECISO?', q3:'MINAS MAIS SEGURAS?', q4:'DICAS AVIATOR?',
    send:'ENVIAR',
    premTitle:'DESBLOQUEAR PREMIUM',
    premDesc:'Obtenha sinais com 95%+ de precisão, scans ilimitados e suporte IA prioritário.',
    btnGetAccess:'OBTER ACESSO',
    premNote:'REGISTRE-SE E DEPOSITE VIA NOSSO LINK — VIP ATIVA EM 60 SEGUNDOS',
    vipOnly:'APENAS MEMBROS VIP',
    minesTitle:'MINES MOD AI', minesSub:'ANÁLISE DE PADRÕES NEURAIS',
    linkId:'VINCULAR ID DO PERFIL',
    lEarned:'GANHO', lSignals:'SINAIS', lStreak:'SEQUÊNCIA', lToday:'HOJE',
    mineCountLabel:'◇ QUANTIDADE DE MINAS', mine:'MINA', mines:'MINAS',
    btnGetSignal:'OBTER SINAL',
    cooldownNote:'Sinais grátis atualizam a cada 8 horas. Atualize para VIP para ilimitados.',
    unlimitedTitle:'DESBLOQUEAR SINAIS ILIMITADOS',
    unlimitedDesc:'Membros VIP veem todas as caselas seguras + % exato. Um depósito desbloqueia sinais ilimitados para sempre.',
    btnUnlimited:'ILIMITADO → USE NOSSO LINK',
    btnNewSignal:'NOVO SINAL', unlockVip:'DESBLOQUEAR VIP',
    flyTitle:'AVIATOR IA', flySub:'MOTOR DE PREVISÃO DE MULTIPLICADOR',
    referTitle:'INDICAR & GANHAR',
    referSub:'CONVIDE AMIGOS · ACUMULE MOEDAS · DESBLOQUEIE SINAIS BÔNUS',
    walletBalance:'SALDO DA CARTEIRA', walletNote:'200 moedas = 1 sinal bônus',
    yourRefLink:'SEU LINK DE INDICAÇÃO',
    refDesc:'Compartilhe este link. Quando um amigo usar o primeiro sinal, você ganha +100 moedas + 1 sinal bônus.',
    copy:'COPIAR', shareOnTg:'COMPARTILHAR NO TELEGRAM',
    yourStats:'SUAS ESTATÍSTICAS', friendsReferred:'AMIGOS INDICADOS', bonusSigs:'SINAIS BÔNUS',
    spendCoins:'GASTAR MOEDAS',
    spendDesc:'Converta moedas em sinais de Mines. 200 moedas = 1 sinal.',
    btnSpend:'GASTAR 200 MOEDAS → 1 SINAL',
    settingsTitle:'CONFIGURAÇÕES', profileTitle:'SEU ID DE PERFIL',
    profileDesc:'Vincule seu ID para que a IA personalize os sinais com base no seu histórico.',
    save:'SALVAR', clear:'LIMPAR',
    accountStatus:'STATUS DA CONTA',
    accountStatusDesc:'VIP desbloquea 95%+ de precisão, scans ilimitados e suporte prioritário.',
    freeTier:'NÍVEL GRATUITO', language:'IDIOMA',
    navHome:'INÍCIO', navMines:'MINAS', navFly:'AVIATOR', navRefer:'INDICAR', navSettings:'AJUSTES',
    premModalSub:'Sinais ilimitados · 95%+ de precisão', step1:'PASSO 1',
    premStep1Text:'Registre-se ou deposite usando NOSSO link — isso ativa o VIP automaticamente.',
    btnRegDeposit:'REGISTRAR & DEPOSITAR VIA NOSSO LINK →',
    toastCopied:'LINK COPIADO!', toastSaved:'PERFIL SALVO!', toastCleared:'PERFIL LIMPO!',
    toastSpent:'1 SINAL BÔNUS ADICIONADO!', toastNotEnough:'MOEDAS INSUFICIENTES', toastCashout:'RETIRADO (DEMO)',
    resetTitle:'REDEFINIR COOLDOWNS', resetDesc:'Limpar temporizadores de sinal para obter um novo sinal imediatamente.',
    btnResetCooldown:'REDEFINIR COOLDOWNS', toastReset:'COOLDOWNS REDEFINIDOS!',
  },
};

/* ═══════════════════════════════════════════
   STATE
═══════════════════════════════════════════ */
const S = {
  lang:            'en',
  coins:           0,
  bonusSigs:       0,
  lastSignal:      0,
  lastAvSignal:    0,
  profileId:       '',
  refCode:         '',
  friendsReferred: 0,
  streak:          0,
  todaySignals:    0,
  mineCount:       5,
  riskLevel:       'auto',
  avStreak:        0,
  avToday:         0,
  avPredHistory:   [],
};

/* ═══════════════════════════════════════════
   STORAGE
═══════════════════════════════════════════ */
const LS_KEY = 'mm_state_v3';

function saveState() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return false;
    Object.assign(S, JSON.parse(raw));
    // ensure new keys have defaults
    if (!S.avPredHistory) S.avPredHistory = [];
    if (!S.riskLevel)     S.riskLevel     = 'auto';
    if (!S.lastAvSignal)  S.lastAvSignal  = 0;
    if (!S.avStreak)      S.avStreak      = 0;
    if (!S.avToday)       S.avToday       = 0;
    return true;
  } catch(e) { return false; }
}

/* ═══════════════════════════════════════════
   TRANSLATION
═══════════════════════════════════════════ */
function t(key) {
  return (LANGS[S.lang] || LANGS.en)[key] || LANGS.en[key] || key;
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });

  const pillMap = { en:'GB', hi:'IN', es:'ES', pt:'PT' };
  const pill = document.getElementById('langPill');
  if (pill) pill.textContent = pillMap[S.lang] || 'GB';

  document.querySelectorAll('.lchip').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === S.lang);
  });

  const aiInput = document.getElementById('aiInput');
  if (aiInput) {
    const ph = { hi:'कुछ पूछें...', es:'Pregunta algo...', pt:'Pergunte algo...' };
    aiInput.placeholder = ph[S.lang] || 'Ask anything...';
  }
}

/* ═══════════════════════════════════════════
   TOAST
═══════════════════════════════════════════ */
let _toastTimer = null;
function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
}

/* ═══════════════════════════════════════════
   HAPTICS
═══════════════════════════════════════════ */
function haptic(type) {
  try { window.Telegram.WebApp.HapticFeedback.impactOccurred(type || 'light'); } catch(e) {}
}
function hapticNotif(type) {
  try { window.Telegram.WebApp.HapticFeedback.notificationOccurred(type || 'success'); } catch(e) {}
}

/* ═══════════════════════════════════════════
   OPEN EXTERNAL LINK
═══════════════════════════════════════════ */
function openRefUrl() {
  try { window.Telegram.WebApp.openLink(CONFIG.refUrl); }
  catch(e) { window.open(CONFIG.refUrl, '_blank'); }
}

/* ═══════════════════════════════════════════
   SCREEN MANAGEMENT
═══════════════════════════════════════════ */
function showScreen(id) {
  ['sLoad','sLang','sMain'].forEach(s => {
    document.getElementById(s).classList.toggle('hidden', s !== id);
  });
}

/* ═══════════════════════════════════════════
   BOOT SEQUENCE
═══════════════════════════════════════════ */
function boot() {
  const bar   = document.getElementById('bootBar');
  const ready = document.getElementById('bootReady');
  const lines = [
    '> INITIALIZING...',
    '> LOADING NEURAL ENGINE...',
    '> CALIBRATING PATTERNS...',
    '> READY.',
  ];
  let pct = 0, lineIdx = 0;
  const iv = setInterval(() => {
    pct += Math.random() * 11 + 4;
    if (pct >= 100) {
      pct = 100;
      clearInterval(iv);
      bar.style.width = '100%';
      ready.textContent = '> READY.';
      setTimeout(afterBoot, 600);
    } else {
      bar.style.width = pct + '%';
      const idx = Math.min(Math.floor(pct / 34), lines.length - 1);
      if (idx !== lineIdx) { lineIdx = idx; ready.textContent = lines[lineIdx]; }
    }
  }, 75);
}

function afterBoot() {
  const existed = loadState();
  if (!existed) {
    showScreen('sLang');
  } else {
    applyLang();
    showScreen('sMain');
    initMain();
  }
}

/* ═══════════════════════════════════════════
   LANGUAGE SELECT SCREEN
═══════════════════════════════════════════ */
function initLangScreen() {
  document.querySelectorAll('.lang-row').forEach(btn => {
    btn.addEventListener('click', () => {
      haptic('medium');
      S.lang    = btn.dataset.lang;
      S.refCode = generateRefCode();
      saveState();
      applyLang();
      showScreen('sMain');
      initMain();
    });
  });
}

function generateRefCode() {
  const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({length:8}, () => c[Math.floor(Math.random()*c.length)]).join('');
}

/* ═══════════════════════════════════════════
   MAIN APP INIT
═══════════════════════════════════════════ */
function initMain() {
  if (!S.refCode) { S.refCode = generateRefCode(); saveState(); }
  updateCoinsDisplay();
  initTabs();
  initHomeTab();
  initMinesTab();
  initFlyTab();
  initReferTab();
  initSettingsTab();
  initScanModal();
  initPremModal();
  checkCooldown();
  checkAvCooldown();
  renderAvPredHistory();
  startOnlineTicker();
}

/* ═══════════════════════════════════════════
   ONLINE TICKER (cosmetic)
═══════════════════════════════════════════ */
function startOnlineTicker() {
  const el = document.getElementById('onlineCount');
  if (!el) return;
  let base = 4500 + Math.floor(Math.random() * 800);
  setInterval(() => {
    base += Math.floor(Math.random() * 30) - 14;
    if (base < 3000) base = 3000;
    if (base > 7000) base = 7000;
    el.textContent = base.toLocaleString();
  }, 4000);
}

/* ═══════════════════════════════════════════
   TAB NAVIGATION
═══════════════════════════════════════════ */
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      haptic('light');
      switchToTab(btn.dataset.tab);
    });
  });
}

function switchToTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === tabId));
  if (tabId === 'pMines')   checkCooldown();
  if (tabId === 'pFly')     checkAvCooldown();
  if (tabId === 'pRefer')   updateReferTab();
}

/* ═══════════════════════════════════════════
   COINS DISPLAY
═══════════════════════════════════════════ */
function updateCoinsDisplay() {
  const hc = document.getElementById('homeCoins');
  const rc = document.getElementById('referCoins');
  if (hc) hc.textContent = S.coins;
  if (rc) rc.textContent = S.coins;
}

/* ═══════════════════════════════════════════
   HOME TAB
═══════════════════════════════════════════ */
const AI_RESP = {
  en: {
    best:    "The best strategy is to start with 3 mines and open tiles systematically from corners. The AI identifies the safest diagonal clusters — follow the stars in order and avoid reshuffling until the signal expires.",
    accurate:"Our neural engine achieves ~89% accuracy on 3-mine boards and ~72% on 7-mine boards. Accuracy is based on statistical pattern recognition across millions of simulated games.",
    safest:  "1 mine is statistically the safest (24/25 safe tiles). For a balance of safety and payout, 3 mines is recommended. 5+ mines increases risk but the signal accounts for that.",
    aviator: "For Aviator: always cashout before 2× on LOW risk mode. On AUTO mode the AI targets the sweet spot between safety and reward. Never chase high multipliers — the AI will flag when conditions are right for 5×+.",
    custom:  q => `Analyzing: "${q}"\n\nBased on pattern analysis — the neural engine suggests focusing on corner tiles first, then center clusters. Your query matches high-confidence play zones. Proceed with the indicated signal.`,
  },
  hi: {
    best:    "सबसे अच्छी रणनीति है 3 माइन्स के साथ शुरू करें और कोनों से व्यवस्थित रूप से टाइल खोलें। AI सबसे सुरक्षित तिरछे क्लस्टर पहचानता है।",
    accurate:"हमारा न्यूरल इंजन 3-माइन बोर्ड पर ~89% और 7-माइन बोर्ड पर ~72% सटीकता हासिल करता है।",
    safest:  "1 माइन सांख्यिकीय रूप से सबसे सुरक्षित है। सुरक्षा और पेआउट के संतुलन के लिए 3 माइन्स अनुशंसित है।",
    aviator: "Aviator के लिए: LOW रिस्क मोड पर हमेशा 2× से पहले कैशआउट करें। AUTO मोड में AI सबसे अच्छा पल पहचानता है।",
    custom:  q => `विश्लेषण: "${q}"\n\nपैटर्न विश्लेषण के आधार पर — पहले कोने की टाइल पर ध्यान दें। चिह्नित सिग्नल के साथ आगे बढ़ें।`,
  },
  es: {
    best:    "La mejor estrategia es comenzar con 3 minas y abrir casillas sistemáticamente desde las esquinas. La IA identifica los clústeres diagonales más seguros.",
    accurate:"Nuestro motor neural logra ~89% de precisión en tableros de 3 minas y ~72% en tableros de 7 minas.",
    safest:  "1 mina es estadísticamente la más segura. Para equilibrio entre seguridad y pago, se recomiendan 3 minas.",
    aviator: "Para Aviator: siempre retira antes de 2× en modo LOW. En modo AUTO la IA identifica el mejor momento.",
    custom:  q => `Analizando: "${q}"\n\nBasado en análisis de patrones — el motor sugiere esquinas primero, luego centro. Procede con la señal indicada.`,
  },
  pt: {
    best:    "A melhor estratégia é começar com 3 minas e abrir caselas sistematicamente pelos cantos. A IA identifica os clusters diagonais mais seguros.",
    accurate:"Nosso motor neural atinge ~89% de precisão em tabuleiros de 3 minas e ~72% em tabuleiros de 7 minas.",
    safest:  "1 mina é estatisticamente a mais segura. Para equilíbrio entre segurança e pagamento, recomenda-se 3 minas.",
    aviator: "Para Aviator: sempre retire antes de 2× no modo LOW. No modo AUTO a IA identifica o melhor momento.",
    custom:  q => `Analisando: "${q}"\n\nCom base na análise de padrões — o motor sugere focar nos cantos primeiro. Prossiga com o sinal indicado.`,
  },
};

function showAIResponse(type, customQ) {
  const R = AI_RESP[S.lang] || AI_RESP.en;
  let text = type === 'custom'
    ? (typeof R.custom === 'function' ? R.custom(customQ) : AI_RESP.en.custom(customQ))
    : (R[type] || AI_RESP.en[type] || '');
  const resp = document.getElementById('aiResponse');
  resp.textContent = text;
  resp.classList.remove('hidden');
}

function initHomeTab() {
  document.getElementById('btnHomeMines').addEventListener('click', () => {
    haptic('medium');
    switchToTab('pMines');
    setTimeout(() => { if (canGetSignal()) openScanModal('mines'); }, 100);
  });

  document.getElementById('btnHomeAv').addEventListener('click', () => {
    haptic('medium');
    switchToTab('pFly');
    setTimeout(() => { if (canGetAvSignal()) openScanModal('aviator'); }, 100);
  });

  document.getElementById('btnGetAccess').addEventListener('click', () => {
    haptic('medium');
    openPremModal();
  });

  document.getElementById('langPill').addEventListener('click', () => {
    haptic('light');
    switchToTab('pSettings');
  });

  document.querySelectorAll('.ai-tag').forEach(btn => {
    btn.addEventListener('click', () => {
      haptic('light');
      showAIResponse(btn.dataset.q);
    });
  });

  document.getElementById('aiSend').addEventListener('click', () => {
    haptic('light');
    const input = document.getElementById('aiInput');
    const q = input.value.trim();
    if (q) { showAIResponse('custom', q); input.value = ''; }
  });

  document.getElementById('aiInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('aiSend').click();
  });
}

/* ═══════════════════════════════════════════
   MINES TAB
═══════════════════════════════════════════ */
let _cdInterval = null;

function initMinesTab() {
  document.querySelectorAll('.mine-opt').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.m) === S.mineCount);
    btn.addEventListener('click', () => {
      haptic('light');
      document.querySelectorAll('.mine-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      S.mineCount = parseInt(btn.dataset.m);
      saveState();
    });
  });

  document.getElementById('btnGetSignal').addEventListener('click', () => {
    haptic('medium');
    openScanModal('mines');
  });

  document.getElementById('btnNewSignal').addEventListener('click', () => {
    haptic('medium');
    showMinesState('idle');
    checkCooldown();
  });

  document.getElementById('btnVipMines').addEventListener('click', () => {
    haptic('medium');
    openPremModal();
  });

  document.getElementById('btnUnlimitedLink').addEventListener('click', () => {
    haptic('medium');
    openRefUrl();
  });

  document.getElementById('btnLinkId').addEventListener('click', () => {
    haptic('light');
    switchToTab('pSettings');
  });
}

function canGetSignal() {
  if (S.bonusSigs > 0) return true;
  return (Date.now() - S.lastSignal) >= CONFIG.cooldownMs;
}

function checkCooldown() {
  clearInterval(_cdInterval);
  // Don't override result if it's already showing
  if (!document.getElementById('mineResult').classList.contains('hidden')) return;
  if (canGetSignal()) {
    showMinesState('idle');
  } else {
    showMinesState('cooldown');
    startCooldownTimer();
  }
}

function startCooldownTimer() {
  function update() {
    const rem = CONFIG.cooldownMs - (Date.now() - S.lastSignal);
    if (rem <= 0) { clearInterval(_cdInterval); showMinesState('idle'); return; }
    const h = Math.floor(rem / 3600000);
    const m = Math.floor((rem % 3600000) / 60000);
    const s = Math.floor((rem % 60000) / 1000);
    const pad = n => String(n).padStart(2,'0');
    document.getElementById('countdownBox').textContent = `NEXT IN ${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  update();
  _cdInterval = setInterval(update, 1000);
}

function showMinesState(state) {
  document.getElementById('mineIdle').classList.toggle('hidden',     state !== 'idle');
  document.getElementById('mineCooldown').classList.toggle('hidden', state !== 'cooldown');
  document.getElementById('mineResult').classList.toggle('hidden',   state !== 'result');
}

function showSignalResult(cells) {
  document.getElementById('sigId').textContent = String(Math.floor(Math.random()*900)+100);

  const grid = document.getElementById('signalGrid');
  grid.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'sg-cell' + (cells.includes(i) ? ' star' : '');
    cell.textContent = cells.includes(i) ? '⭐' : '';
    grid.appendChild(cell);
  }

  const starRows = [...new Set(cells.map(c => Math.floor(c/5)))];
  const labels   = document.getElementById('rowHotLabels');
  labels.innerHTML = '';
  starRows.forEach(r => {
    const lbl = document.createElement('span');
    lbl.className   = 'row-hot-lbl';
    lbl.textContent = `ROW ${r+1} HOT`;
    labels.appendChild(lbl);
  });

  showMinesState('result');
  S.todaySignals++;
  S.streak++;
  document.getElementById('sStreak').textContent = S.streak;
  document.getElementById('sToday').textContent  = S.todaySignals;
  saveState();
}

function useSignal() {
  if (S.bonusSigs > 0) { S.bonusSigs--; }
  else                  { S.lastSignal = Date.now(); }
  saveState();
}

/* ═══════════════════════════════════════════
   AVIATOR TAB
═══════════════════════════════════════════ */
let _avCdInterval = null;

function initFlyTab() {
  // Risk level selector — restore saved selection
  document.querySelectorAll('.risk-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.r === S.riskLevel);
    btn.addEventListener('click', () => {
      haptic('light');
      document.querySelectorAll('.risk-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      S.riskLevel = btn.dataset.r;
      saveState();
    });
  });

  document.getElementById('btnGetAvSignal').addEventListener('click', () => {
    haptic('medium');
    openScanModal('aviator');
  });

  document.getElementById('btnNewAvSignal').addEventListener('click', () => {
    haptic('medium');
    showAvState('idle');
    checkAvCooldown();
  });

  document.getElementById('btnVipAv').addEventListener('click', () => {
    haptic('medium');
    openPremModal();
  });

  document.getElementById('btnUnlimitedAvLink').addEventListener('click', () => {
    haptic('medium');
    openRefUrl();
  });
}

function canGetAvSignal() {
  if (S.bonusSigs > 0) return true;
  return (Date.now() - S.lastAvSignal) >= CONFIG.cooldownMs;
}

function checkAvCooldown() {
  clearInterval(_avCdInterval);
  // Don't override result if it's already showing
  if (!document.getElementById('avResult').classList.contains('hidden')) return;
  if (canGetAvSignal()) {
    showAvState('idle');
  } else {
    showAvState('cooldown');
    startAvCooldownTimer();
  }
}

function startAvCooldownTimer() {
  function update() {
    const rem = CONFIG.cooldownMs - (Date.now() - S.lastAvSignal);
    if (rem <= 0) { clearInterval(_avCdInterval); showAvState('idle'); return; }
    const h = Math.floor(rem / 3600000);
    const m = Math.floor((rem % 3600000) / 60000);
    const s = Math.floor((rem % 60000) / 1000);
    const pad = n => String(n).padStart(2,'0');
    document.getElementById('avCountdownBox').textContent = `NEXT IN ${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  update();
  _avCdInterval = setInterval(update, 1000);
}

function showAvState(state) {
  document.getElementById('avIdle').classList.toggle('hidden',     state !== 'idle');
  document.getElementById('avCooldown').classList.toggle('hidden', state !== 'cooldown');
  document.getElementById('avResult').classList.toggle('hidden',   state !== 'result');
}

function generateAviatorPrediction() {
  const riskRanges = {
    low:  { min: 1.3, max: 2.5, confBase: 88 },
    med:  { min: 2.0, max: 5.0, confBase: 82 },
    high: { min: 4.0, max: 12.0, confBase: 74 },
    auto: { min: 1.5, max: 4.5, confBase: 85 },
  };
  const range    = riskRanges[S.riskLevel] || riskRanges.auto;
  const crashAt  = range.min + Math.random() * (range.max - range.min);
  const safeExit = Math.max(1.05, crashAt * (0.62 + Math.random() * 0.2));
  const confidence = range.confBase + Math.floor(Math.random() * 10) - 5;
  return {
    safeExit:   Math.min(safeExit, crashAt - 0.05).toFixed(2),
    crashAt:    crashAt.toFixed(2),
    confidence: Math.max(70, Math.min(96, confidence)),
    risk:       S.riskLevel.toUpperCase(),
  };
}

function showAvSignalResult(pred) {
  document.getElementById('avSigId').textContent   = String(Math.floor(Math.random()*900)+100);
  document.getElementById('avPredMult').textContent = pred.safeExit + '×';
  document.getElementById('avConfVal').textContent  = pred.confidence + '%';
  document.getElementById('avRiskVal').textContent  = pred.risk;

  // Multiplier bar — scale to 10× max
  const safeWidth = Math.min((parseFloat(pred.safeExit) / 10) * 100, 85);
  const safeBar   = document.getElementById('avSafeBar');
  const dangerBar = document.getElementById('avDangerBar');
  const safeLabel = document.getElementById('avSafeBarLabel');
  if (safeBar)   safeBar.style.width   = safeWidth + '%';
  if (dangerBar) dangerBar.style.width = (100 - safeWidth) + '%';
  if (safeLabel) safeLabel.textContent = pred.safeExit + '×';

  // Add to history and render
  S.avPredHistory.unshift({ v: pred.safeExit, conf: pred.confidence });
  if (S.avPredHistory.length > 10) S.avPredHistory.pop();
  renderAvPredHistory();

  showAvState('result');
  S.avStreak = (S.avStreak || 0) + 1;
  S.avToday  = (S.avToday  || 0) + 1;
  const streakEl = document.getElementById('avStreakStat');
  const todayEl  = document.getElementById('avTodayStat');
  if (streakEl) streakEl.textContent = S.avStreak;
  if (todayEl)  todayEl.textContent  = S.avToday;
  saveState();
}

function renderAvPredHistory() {
  const container = document.getElementById('avPredHistory');
  if (!container || !S.avPredHistory || !S.avPredHistory.length) return;
  container.innerHTML = '';
  S.avPredHistory.forEach(item => {
    const v    = parseFloat(item.v);
    const pill = document.createElement('span');
    pill.className   = 'av-pill ' + (v < 2 ? 'low' : v < 5 ? 'mid' : 'high');
    pill.textContent = item.v + '×';
    container.appendChild(pill);
  });
}

function useAvSignal() {
  if (S.bonusSigs > 0) { S.bonusSigs--; }
  else                  { S.lastAvSignal = Date.now(); }
  saveState();
}

/* ═══════════════════════════════════════════
   SCAN MODAL
═══════════════════════════════════════════ */
let _scanRaf   = null;
let _scanBlink = null;
let _scanMode  = 'mines'; // 'mines' | 'aviator'

function initScanModal() {
  buildScanMatrix();
  buildScanGrid();
}

function buildScanMatrix() {
  const mat  = document.getElementById('scanMatrix');
  mat.innerHTML = '';
  const W    = window.innerWidth || 400;
  const cols = Math.ceil(W / 14);
  const chars = '01アイウエオABCDEF0123456789█▓▒░◆○●';
  for (let i = 0; i < cols; i++) {
    const col = document.createElement('div');
    col.className = 'scan-col';
    col.style.left = (i * 14) + 'px';
    col.style.animationDuration = (1.5 + Math.random() * 3) + 's';
    col.style.animationDelay   = (-Math.random() * 3) + 's';
    let txt = '';
    for (let j = 0; j < 30; j++) txt += chars[Math.floor(Math.random()*chars.length)] + '\n';
    col.textContent = txt;
    mat.appendChild(col);
  }
}

function buildScanGrid() {
  const grid = document.getElementById('scanGrid');
  grid.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const c = document.createElement('div');
    c.className   = 'sc-cell';
    c.dataset.idx = i;
    c.textContent = '·';
    grid.appendChild(c);
  }
}

function openScanModal(mode) {
  _scanMode = mode || 'mines';

  const modal   = document.getElementById('modalScan');
  const modeTag = document.getElementById('scanModeTag');
  const isAv    = _scanMode === 'aviator';

  modal.classList.toggle('av-mode', isAv);
  modeTag.textContent = isAv ? '✈️ AVIATOR SCAN' : '💣 MINES SCAN';

  // Show the right scan UI
  document.getElementById('scanGridContainer').classList.toggle('hidden', isAv);
  document.getElementById('avScanUi').classList.toggle('hidden', !isAv);

  // Reset status text color via scan-status-text class (CSS handles color via .av-mode)
  document.getElementById('scanStatusText').textContent = 'NEURAL SCAN IN PROGRESS';

  modal.classList.remove('hidden');
  document.getElementById('scanBar').style.width = '0%';
  document.getElementById('scanSubText').textContent = isAv
    ? 'INITIALIZING AVIATOR ENGINE'
    : 'ANALYZING MINE PATTERNS';

  if (!isAv) {
    // Reset mines grid cells
    document.querySelectorAll('.sc-cell').forEach(c => { c.className = 'sc-cell'; c.textContent = '·'; });
  } else {
    // Reset aviator stats
    ['avSSAvg','avSSTrend','avSSConf','avSSRounds'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '--';
    });
    document.getElementById('avScanRoundsRow').innerHTML = '';
  }

  runScanAnimation();
}

function closeScanModal() {
  document.getElementById('modalScan').classList.add('hidden');
  clearInterval(_scanBlink);
  cancelAnimationFrame(_scanRaf);
}

function runScanAnimation() {
  if (_scanMode === 'aviator') { runAvScanAnimation(); return; }

  // ── MINES scan ──────────────────────────────────────────
  const cells    = document.querySelectorAll('.sc-cell');
  const bar      = document.getElementById('scanBar');
  const xy       = document.getElementById('scanXY');
  const secEl    = document.getElementById('scanSec');
  const chEl     = document.getElementById('scanCh');
  const subText  = document.getElementById('scanSubText');

  const resultIdx = generateSignalCells();
  const start     = Date.now();
  const dur       = CONFIG.scanDurationMs;

  const phases = [
    { t:0,    text:'ANALYZING MINE PATTERNS' },
    { t:0.33, text:'MAPPING SAFE ZONES' },
    { t:0.62, text:'LOCKING COORDINATES' },
    { t:0.85, text:'SIGNAL CONFIRMED' },
  ];

  _scanBlink = setInterval(() => {
    const idx  = Math.floor(Math.random()*25);
    const cell = cells[idx];
    if (!cell.classList.contains('scan-lock')) {
      cell.classList.add('scan-blink');
      cell.textContent = Math.random() > .5 ? '█' : '▒';
      setTimeout(() => {
        if (!cell.classList.contains('scan-lock')) {
          cell.classList.remove('scan-blink');
          cell.textContent = '·';
        }
      }, 180);
    }
  }, 70);

  function frame() {
    const pct = Math.min((Date.now() - start) / dur, 1);
    bar.style.width   = (pct * 100) + '%';
    xy.textContent    = `X:${Math.floor(Math.random()*99)} Y:${Math.floor(Math.random()*99)}`;
    secEl.textContent = `SEC ${Math.floor(Math.random()*99)}`;
    chEl.textContent  = `CH ${String(Math.floor(pct*99)).padStart(2,'0')} ${Math.floor(pct*100)}%`;

    for (const ph of phases) { if (pct >= ph.t) subText.textContent = ph.text; }

    if (pct >= 0.85) {
      const lockCount = Math.floor((pct - 0.85) / 0.15 * resultIdx.length);
      resultIdx.slice(0, lockCount).forEach(i => {
        cells[i].classList.remove('scan-blink');
        cells[i].classList.add('scan-lock');
        cells[i].textContent = '★';
      });
    }

    if (pct < 1) {
      _scanRaf = requestAnimationFrame(frame);
    } else {
      clearInterval(_scanBlink);
      resultIdx.forEach(i => { cells[i].classList.add('scan-lock'); cells[i].textContent = '★'; });
      hapticNotif('success');
      setTimeout(() => {
        closeScanModal();
        useSignal();
        updateCoinsDisplay();
        showSignalResult(resultIdx);
        switchToTab('pMines');
      }, 500);
    }
  }

  _scanRaf = requestAnimationFrame(frame);
}

/* ── AVIATOR scan (flight chart) ───────────────────────── */
function runAvScanAnimation() {
  const bar     = document.getElementById('scanBar');
  const xy      = document.getElementById('scanXY');
  const secEl   = document.getElementById('scanSec');
  const chEl    = document.getElementById('scanCh');
  const subText = document.getElementById('scanSubText');

  const phases = [
    { t: 0,    text: 'LOADING ROUND HISTORY' },
    { t: 0.18, text: 'ANALYZING CRASH PATTERNS' },
    { t: 0.42, text: 'COMPUTING MULTIPLIER TRAJECTORY' },
    { t: 0.70, text: 'LOCKING SAFE EXIT POINT' },
    { t: 0.92, text: 'PREDICTION CONFIRMED ✓' },
  ];

  // Generate fake past rounds
  const rounds = [];
  for (let i = 0; i < 10; i++) {
    const r = Math.random();
    let v;
    if      (r < 0.28) v = +(1 + Math.random() * 0.75).toFixed(2);
    else if (r < 0.58) v = +(1.8 + Math.random() * 1.4).toFixed(2);
    else if (r < 0.82) v = +(3.2 + Math.random() * 2.8).toFixed(2);
    else               v = +(6.5 + Math.random() * 9.5).toFixed(2);
    rounds.push(v);
  }
  const avg = (rounds.reduce((a,b) => a+b, 0) / rounds.length).toFixed(2);

  // Build round pills (initially hidden)
  const roundsRow = document.getElementById('avScanRoundsRow');
  roundsRow.innerHTML = '';
  rounds.forEach(v => {
    const pill = document.createElement('span');
    const cls  = v < 1.8 ? 'crash' : v < 3.2 ? 'low' : v < 6 ? 'mid' : 'high';
    pill.className   = 'av-scan-pill ' + cls;
    pill.textContent = v + '×';
    roundsRow.appendChild(pill);
  });

  // Canvas setup
  const canvas = document.getElementById('avScanChart');
  const DPR    = window.devicePixelRatio || 1;
  const W      = canvas.offsetWidth  || 280;
  const H      = 130;
  canvas.width  = W * DPR;
  canvas.height = H * DPR;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(DPR, DPR);

  const start = Date.now();
  const dur   = CONFIG.scanDurationMs;
  let pillsRevealed = false;

  function drawChart(pct) {
    ctx.clearRect(0, 0, W, H);

    // ── Background grid ──────────────────────────────────
    ctx.strokeStyle = 'rgba(168,85,247,0.07)';
    ctx.lineWidth   = 1;
    for (let gx = 0; gx <= W; gx += W / 5) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
    }
    for (let gy = 0; gy <= H; gy += H / 4) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }

    // Y-axis multiplier labels
    ctx.fillStyle = 'rgba(168,85,247,0.45)';
    ctx.font      = '8px monospace';
    ctx.textAlign = 'left';
    ['15×','8×','3×','1×'].forEach((lbl, i) => {
      ctx.fillText(lbl, 3, 10 + (H - 14) * (i / 3));
    });

    if (pct < 0.15) return;

    // ── Previous round bars (left 32% of canvas) ─────────
    const barsProgress = Math.min((pct - 0.15) / 0.22, 1);
    const barAreaW = W * 0.30;
    const barW     = barAreaW / rounds.length;
    rounds.forEach((v, i) => {
      const maxH  = H - 16;
      const barH  = Math.min((Math.log(Math.max(v, 1.01)) / Math.log(20)) * maxH, maxH) * barsProgress;
      const bx    = 2 + i * barW;
      const by    = H - barH - 2;
      const alpha = 0.65;
      ctx.fillStyle = v < 1.8
        ? `rgba(239,68,68,${alpha})`
        : v < 3.2
          ? `rgba(251,191,36,${alpha})`
          : `rgba(0,212,170,${alpha})`;
      ctx.beginPath();
      ctx.roundRect(bx, by, barW - 2, barH, 2);
      ctx.fill();
    });

    if (pct < 0.42) return;

    // ── Predicted trajectory curve (right 63% of canvas) ─
    const curveStartX = W * 0.34;
    const curveW      = W * 0.63;
    const curveProg   = Math.min((pct - 0.42) / 0.48, 1); // 0→1 from pct=0.42 to 0.90

    // Gradient along the curve
    const grad = ctx.createLinearGradient(curveStartX, H, curveStartX + curveW, 0);
    grad.addColorStop(0,   'rgba(168,85,247,1)');
    grad.addColorStop(0.5, 'rgba(99,102,241,1)');
    grad.addColorStop(1,   'rgba(239,68,68,0.9)');

    ctx.beginPath();
    ctx.strokeStyle = grad;
    ctx.lineWidth   = 2.5;
    ctx.shadowBlur  = 10;
    ctx.shadowColor = 'rgba(168,85,247,0.7)';

    const STEPS = 90;
    const drawn = Math.floor(curveProg * STEPS);
    for (let s = 0; s <= drawn; s++) {
      const t  = s / STEPS;
      const cx = curveStartX + t * curveW;
      const cy = H - 6 - Math.pow(t, 1.5) * (H - 18);
      if (s === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Plane at the curve tip
    if (drawn > 0) {
      const t   = drawn / STEPS;
      const tx  = curveStartX + t * curveW;
      const ty  = H - 6 - Math.pow(t, 1.5) * (H - 18);
      ctx.font      = '13px serif';
      ctx.textAlign = 'center';
      ctx.fillText('✈', tx, ty + 4);
    }

    // ── Safe exit zone (appears at pct ≥ 0.70) ───────────
    if (pct >= 0.70) {
      const safeProgress = Math.min((pct - 0.70) / 0.15, 1);
      // Safe exit is ~40% up the curve (multiplier ~2–3×)
      const safeTCurve  = 0.48;
      const safeX = curveStartX + safeTCurve * curveW;
      const safeY = H - 6 - Math.pow(safeTCurve, 1.5) * (H - 18);

      // Dashed horizontal line
      ctx.strokeStyle = `rgba(34,197,94,${0.8 * safeProgress})`;
      ctx.lineWidth   = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(curveStartX, safeY);
      ctx.lineTo(safeX, safeY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Green dot on curve
      ctx.beginPath();
      ctx.arc(safeX, safeY, 5, 0, Math.PI * 2);
      ctx.fillStyle   = `rgba(34,197,94,${safeProgress})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(34,197,94,${safeProgress})`;
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      // "CASHOUT HERE" label
      ctx.fillStyle = `rgba(34,197,94,${safeProgress})`;
      ctx.font      = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CASHOUT', safeX, safeY - 10);
      ctx.fillText('HERE ▼', safeX, safeY - 2);
    }

    // ── Crash zone (pct ≥ 0.88) ──────────────────────────
    if (pct >= 0.88) {
      const crashAlpha = Math.min((pct - 0.88) / 0.10, 1);
      ctx.fillStyle   = `rgba(239,68,68,${crashAlpha * 0.85})`;
      ctx.font        = '8px monospace';
      ctx.textAlign   = 'right';
      ctx.fillText('⚠ CRASH ZONE', W - 4, 16);

      ctx.strokeStyle = `rgba(239,68,68,${crashAlpha * 0.4})`;
      ctx.lineWidth   = 1;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(curveStartX + curveW * 0.75, 0);
      ctx.lineTo(curveStartX + curveW * 0.75, H);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  function frame() {
    const pct = Math.min((Date.now() - start) / dur, 1);
    bar.style.width   = (pct * 100) + '%';
    xy.textContent    = `ROUND ${Math.floor(Math.random()*9000)+1000}`;
    secEl.textContent = `HIST ${Math.floor(pct * 50)}`;
    chEl.textContent  = `CH ${String(Math.floor(pct*99)).padStart(2,'0')} ${Math.floor(pct*100)}%`;

    for (const ph of phases) { if (pct >= ph.t) subText.textContent = ph.text; }

    // Stagger-reveal round pills
    if (pct >= 0.08 && !pillsRevealed) {
      pillsRevealed = true;
      roundsRow.querySelectorAll('.av-scan-pill').forEach((p, i) => {
        setTimeout(() => p.classList.add('visible'), i * 80);
      });
    }

    // Update stats progressively
    if (pct >= 0.25) {
      const el = document.getElementById('avSSAvg');
      if (el && el.textContent === '--') el.textContent = avg + '×';
    }
    if (pct >= 0.45) {
      const el = document.getElementById('avSSRounds');
      if (el && el.textContent === '--') el.textContent = rounds.length;
    }
    if (pct >= 0.60) {
      const el = document.getElementById('avSSTrend');
      if (el && el.textContent === '--') {
        const last3avg = (rounds.slice(-3).reduce((a,b)=>a+b,0)/3);
        el.textContent = last3avg > parseFloat(avg) ? '↗ UP' : '↘ DOWN';
        el.style.color = last3avg > parseFloat(avg) ? '#22c55e' : '#ef4444';
      }
    }
    if (pct >= 0.78) {
      const el = document.getElementById('avSSConf');
      if (el && el.textContent === '--') el.textContent = Math.floor(78 + Math.random() * 14) + '%';
    }

    drawChart(pct);

    if (pct < 1) {
      _scanRaf = requestAnimationFrame(frame);
    } else {
      hapticNotif('success');
      setTimeout(() => {
        closeScanModal();
        useAvSignal();
        updateCoinsDisplay();
        const pred = generateAviatorPrediction();
        showAvSignalResult(pred);
        switchToTab('pFly');
      }, 500);
    }
  }

  _scanRaf = requestAnimationFrame(frame);
}

function generateSignalCells() {
  const cells = [];
  while (cells.length < 3) {
    const n = Math.floor(Math.random()*25);
    if (!cells.includes(n)) cells.push(n);
  }
  return cells;
}

/* ═══════════════════════════════════════════
   PREMIUM MODAL
═══════════════════════════════════════════ */
function initPremModal() {
  document.getElementById('btnClosePrem').addEventListener('click', () => {
    haptic('light');
    closePremModal();
  });
  document.getElementById('btnRegDeposit').addEventListener('click', () => {
    haptic('medium');
    openRefUrl();
  });
  document.getElementById('modalPrem').addEventListener('click', e => {
    if (e.target.id === 'modalPrem') closePremModal();
  });
}
function openPremModal()  { document.getElementById('modalPrem').classList.remove('hidden'); }
function closePremModal() { document.getElementById('modalPrem').classList.add('hidden'); }

/* ═══════════════════════════════════════════
   REFER TAB
═══════════════════════════════════════════ */
function buildRefLink() {
  if (!S.refCode) { S.refCode = generateRefCode(); saveState(); }
  try {
    const bot = window.Telegram?.WebApp?.initDataUnsafe?.bot_username || 'MinesModBot';
    return `https://t.me/${bot}?start=${S.refCode}`;
  } catch(e) {
    return `https://t.me/MinesModBot?start=${S.refCode}`;
  }
}

function updateReferTab() {
  const linkEl = document.getElementById('refLinkText');
  if (linkEl) linkEl.textContent = buildRefLink();
  const fr = document.getElementById('refFriends');
  const bs = document.getElementById('refBonusSigs');
  if (fr) fr.textContent = S.friendsReferred;
  if (bs) bs.textContent = S.bonusSigs;
  updateCoinsDisplay();
}

function initReferTab() {
  document.getElementById('btnCopyRef').addEventListener('click', () => {
    haptic('medium');
    const link = buildRefLink();
    try { navigator.clipboard.writeText(link); } catch(e) {}
    toast(t('toastCopied'));
  });

  document.getElementById('btnShareRef').addEventListener('click', () => {
    haptic('medium');
    const link = buildRefLink();
    const text = encodeURIComponent('Join MINES × AVIATOR MOD — AI-powered prediction! ' + link);
    const url  = 'https://t.me/share/url?url=' + encodeURIComponent(link) + '&text=' + text;
    try { window.Telegram.WebApp.openLink(url); }
    catch(e) { window.open(url, '_blank'); }
  });

  document.getElementById('btnSpend').addEventListener('click', () => {
    haptic('medium');
    if (S.coins >= CONFIG.coinsPerSignal) {
      S.coins    -= CONFIG.coinsPerSignal;
      S.bonusSigs++;
      updateCoinsDisplay();
      updateReferTab();
      saveState();
      toast(t('toastSpent'));
      hapticNotif('success');
    } else {
      toast(t('toastNotEnough'));
      hapticNotif('warning');
    }
  });

  updateReferTab();
}

/* ═══════════════════════════════════════════
   SETTINGS TAB
═══════════════════════════════════════════ */
function initSettingsTab() {
  const input = document.getElementById('profileInput');
  if (S.profileId) input.value = S.profileId;

  document.getElementById('btnSaveProfile').addEventListener('click', () => {
    haptic('medium');
    const val = input.value.trim();
    if (val) {
      S.profileId = val;
      saveState();
      toast(t('toastSaved'));
      hapticNotif('success');
    }
  });

  document.getElementById('btnClearProfile').addEventListener('click', () => {
    haptic('light');
    S.profileId  = '';
    input.value  = '';
    saveState();
    toast(t('toastCleared'));
  });

  document.querySelectorAll('.lchip').forEach(btn => {
    btn.addEventListener('click', () => {
      haptic('light');
      S.lang = btn.dataset.lang;
      saveState();
      applyLang();
    });
  });

  document.getElementById('btnResetCooldown').addEventListener('click', () => {
    haptic('medium');
    S.lastSignal   = 0;
    S.lastAvSignal = 0;
    saveState();
    checkCooldown();
    checkAvCooldown();
    toast(t('toastReset'));
    hapticNotif('success');
  });
}

/* ═══════════════════════════════════════════
   ENTRY POINT
═══════════════════════════════════════════ */
try { window.Telegram.WebApp.expand(); } catch(e) {}

document.addEventListener('DOMContentLoaded', () => {
  initLangScreen();
  boot();
});
