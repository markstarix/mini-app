# SESSION SAVE — MINES MOD 2.0
Date: 2026-04-25

## Project location
C:\Users\Mark\Desktop\mines-app\

## File status
| File | Status | Notes |
|---|---|---|
| index.html | COMPLETE | 5-tab SPA, all screens, modals |
| css/style.css | COMPLETE | Dark teal/gold theme, all components |
| js/app.js | COMPLETE | Full app logic |
| README.md | COMPLETE | Deploy instructions |

## Before deploy — required change
In `js/app.js` line 8:
```
refUrl: 'https://t.me/your_ref_link_here',
```
Replace with real referral URL.

## App structure
- **Boot screen** → animated progress bar
- **Lang screen** → EN / HI / ES / PT (first run only)
- **5 tabs:** HOME · MINES · FLY · REFER · SETTINGS
- **Scan modal** — 3-second neural scan animation
- **Premium modal** — bottom-sheet with referral CTA

## Key logic
- Cooldown: 8 hours between free signals (localStorage timestamp)
- Signal: 3 random ⭐ on 5×5 grid
- Coins: 200 = 1 bonus signal; referral = +100 coins +1 signal
- Aviator: canvas game loop, weighted crash distribution
- All text translatable via LANGS object + data-i18n attributes

## localStorage key
`mm_state_v2` — stores lang, coins, bonusSigs, lastSignal, profileId,
refCode, friendsReferred, streak, todaySignals, mineCount, avHistory

## CONFIG (js/app.js top)
```js
const CONFIG = {
  refUrl:         'https://1wbsds.life/casino/list?open=register', // ← CHANGE THIS
  cooldownMs:     8 * 60 * 60 * 1000,
  coinsPerRef:    100,
  bonusSigPerRef: 1,
  coinsPerSignal: 200,
  scanDurationMs: 3000,
};
```

## Possible next steps (not done yet)
- [ ] Replace CONFIG.refUrl with real link
- [ ] Test on real Telegram Mini App (BotFather → Web App)
- [ ] Adjust bot username in buildRefLink() if needed
- [ ] Add real referral tracking (requires backend)
- [ ] Customize stat card numbers (sEarned: $413,203 etc.)
