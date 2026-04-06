# Luo Design LLM Agent Guide
Vanilla CSS/JS UI Library for Mobile/Web

This document provides strict rules and class references for AI agents to generate high-quality UIs using **Luo Design**.

---

## 1. Setup & Integration

```html
<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mingcute_icon@2.9.71/font/Mingcute.min.css">
<link rel="stylesheet" href="luodesign.css">
<script src="luodesign.js"></script>
```

`luodesign.js` automatically scans `data-ld-*` attributes after `DOMContentLoaded` to initialize components. It supports both **Declarative (HTML attributes)** and **Programmatic (JS calls)** methods.

---

## 2. Core Rules & Design System

### Color Policy
- **Primary Action:** Use **Violet** (`--ld-violet-*`) exclusively.
- **Surface & Text:** Use **Grey** (`--ld-grey-*`) for headers and navigation. Never use Violet for header backgrounds.
- **Glassmorphism:** Reserved **ONLY** for Floating Action Buttons (FAB) and Floating Headers. Do not apply to cards or standard buttons.
- **Language:** To be user-friendly, use the Korean **"해요체"** (polite informal style, e.g., ~해요, ~예요) instead of formal styles like "습니다" or "하십시오" if the UI target is Korean.

### Buttons & Interactions
- **Shape:** All buttons must be **Pill-shaped** (`border-radius: 9999px`).
- **Squish Effect:** Add `.ld-squish` to interactive elements (Cards, List Rows).
  - **Note:** `.ld-btn` has squish built-in. Do not duplicate.
  - **Note:** `.ld-chip` ignores squish (display-only).

### Icons
- **Strict Rule:** Use **Mingcute Icon Set** only. **Never use Emojis.**
- **Format:** `mgc_{name}_line` (Outline) or `mgc_{name}_fill` (Filled).

---

## 3. CSS Variables Reference

| Category | Variable | Value | Usage |
| :--- | :--- | :--- | :--- |
| **Action** | `--ld-violet-500` | `#7c3aed` | Main actions, glow source |
| | `--ld-violet-100` | `#ede9fe` | Chip/Badge backgrounds |
| **Typography** | `--ld-grey-900` | `#191f28` | Titles |
| | `--ld-grey-800` | `#333d4b` | Body text |
| | `--ld-grey-600` | `#6b7684` | Icons |
| **Surface** | `--ld-grey-200` | `#e5e8eb` | Borders |
| | `--ld-grey-100` | `#f2f4f6` | Page background |
| **Status** | `--ld-red` / `--ld-green` | Red / Green | Error / Success |
| **Radius** | `--r-md` / `--r-pill` | 16px / 9999px | Standard / Button |
| **Motion** | `--spring` | — | Standard spring (no overshoot) |
| | `--spring-bounce` | — | Overshoot (Dock/Indicators only) |

---

## 4. Component Reference

### Typography
- `.ld-display` (40px, 900)
- `.ld-t1` to `.ld-t4` (32px to 18px, 700)
- `.ld-body-lg` / `.ld-body` / `.ld-body-sm` (17px / 15px / 13px)
- `.ld-label-lg` / `.ld-label` / `.ld-label-sm` (Semibold labels)

### Buttons & Chips

```html
<button class="ld-btn ld-btn-primary ld-btn-lg">Action</button>

<button class="ld-btn ld-btn-primary ld-btn-xl ld-btn-full">
  <span class="mgc_send_plane_line"></span> Send
</button>

<span class="ld-chip ld-chip-md ld-chip-violet">Chip</span>
<span class="ld-badge ld-badge-green ld-badge-dot">Active</span>
```

### Cards & List Rows

**Rule:** No `box-shadow` on cards. Use contrast between White cards and `Grey-100` background for depth.

```html
<div class="ld-card-section">
  <div class="ld-list-row ld-squish">
    <div class="ld-lr-icon ld-lr-icon-violet">
      <span class="mgc_star_line"></span>
    </div>
    <div class="ld-lr-content">
      <div class="ld-lr-title">Title</div>
      <div class="ld-lr-sub">Subtitle</div>
    </div>
    <div class="ld-lr-right">
      <span class="ld-lr-value ld-lr-value-pos">+10%</span>
      <span class="ld-lr-chevron"><span class="mgc_right_line"></span></span>
    </div>
  </div>
</div>
```

---

## 5. Advanced Interactive Components

All components allow you to choose between the **Declarative (HTML attribute)** method and the **Programmatic (JS call)** method.

---

### Segmented Control

Does not work with CSS alone. JS is required for indicator movement.

```html
<div class="ld-seg" data-ld-seg>
  <div class="ld-seg-indicator"></div>
  <div class="ld-seg-item active">All</div>
  <div class="ld-seg-item">Deposit</div>
  <div class="ld-seg-item">Withdraw</div>
</div>
```

```js
// Programmatic
const seg = LuoDesign.seg('#mySeg', {
  onChange: (index) => console.log('Selected Tab:', index)
});
seg.select(1); // Select second tab
```

---

### Dock Navigation

```html
<nav class="ld-dock" data-ld-dock>
  <div class="ld-dock-indicator"></div>
  <div class="ld-dock-item active">
    <span class="ld-dock-icon"><span class="mgc_home_3_fill"></span></span>
    <span class="ld-dock-label">Home</span>
  </div>
  <div class="ld-dock-item">
    <div class="ld-dock-badge">3</div>
    <span class="ld-dock-icon"><span class="mgc_wallet_2_line"></span></span>
    <span class="ld-dock-label">Assets</span>
  </div>
</nav>
```

```js
// Programmatic
const dock = LuoDesign.dock('#myDock', {
  onChange: (index) => navigate(index)
});
dock.select(2);
```

---

### Floating App Header (Dynamic Glass)

JS updates `background` and `backdrop-filter` in real-time based on scroll position.

```html
<header class="ld-app-header" data-ld-app-header>
  <button class="ld-icon-btn ld-fab ld-squish" style="width:36px;height:36px">
    <span class="mgc_left_line" style="font-size:16px;color:var(--ld-grey-700)"></span>
  </button>
  <span class="ld-label-lg">Title</span>
</header>

<header class="ld-app-header" data-ld-app-header data-scroll-el="#scrollContainer">
  ...
</header>
```

```js
// Programmatic
LuoDesign.appHeader('#appHeader');
LuoDesign.appHeader('#appHeader', '#scrollContainer'); // Specify container
```

---

### Bottom Sheet

Direct children animate sequentially on open. Use inline `animation-delay` if children > 7.

```html
<button data-ld-trigger="mySheet">Open</button>

<div class="ld-sheet-backdrop" data-ld-backdrop="mySheet"></div>
<div class="ld-bottom-sheet" id="mySheet" data-ld-sheet>
  <div class="ld-sheet-handle"></div>
  <div class="ld-t3" style="margin-bottom:6px">Title</div>
  <p class="ld-body-sm" style="color:var(--ld-grey-600);margin-bottom:20px">Description text.</p>
  <button class="ld-btn ld-btn-primary ld-btn-xl ld-btn-full">Confirm</button>
</div>
```

```js
// Programmatic
const s = LuoDesign.sheet('#mySheet', '#myBackdrop');
s.open();
s.close();
s.toggle();
```

---

### Toast

```js
// Basic
LuoDesign.toast('Saved successfully');

// Options
LuoDesign.toast('An error occurred', { duration: 4000 });
LuoDesign.toast('Manual close', { duration: 0 }); // No auto-dismiss

// Manual Dismissal
const t = LuoDesign.toast('Processing...');
t.dismiss();
```

Toasts can also be dismissed by swiping left or right. If an `.ld-toast-host` element does not exist, it is automatically added to the `<body>`.

---

### AI Chat Input

```html
<div class="ld-chat-input-bar" data-ld-chat>
  <textarea class="ld-chat-textarea" placeholder="Enter message..."></textarea>
  <button class="ld-chat-send" disabled>
    <span class="mgc_send_plane_fill"></span>
  </button>
</div>
```

```js
// Programmatic — onSend callback + Enter key support
const chat = LuoDesign.chatInput('#chatBar', {
  onSend: (value, clear) => {
    sendMessage(value);
    clear(); // Reset input field
  }
});
```

Textareas automatically expand in height based on content (max 120px). The send button is automatically disabled when the input is empty.

---

### Stepper

```html
<div class="ld-stepper" data-ld-stepper data-min="0" data-max="10" data-value="1">
  <button class="ld-stepper-btn">−</button>
  <div class="ld-stepper-val">1</div>
  <button class="ld-stepper-btn">+</button>
</div>
```

```js
// Programmatic
const qty = LuoDesign.stepper('#myStepper', {
  value: 1, min: 0, max: 10,
  onChange: (v) => console.log('Quantity:', v)
});
qty.getValue(); // Returns current value
qty.setValue(5); // Set value directly
```

---

### Input Clear Button

```html
<div class="ld-input-wrap" data-ld-input-clear>
  <input class="ld-input" type="text" placeholder="Name">
  <button class="ld-input-clear">✕</button>
</div>

<div class="ld-search-wrap" data-ld-input-clear>
  <span class="ld-search-icon"><span class="mgc_search_line"></span></span>
  <input class="ld-input ld-input-search" type="search" placeholder="Search...">
  <button class="ld-input-clear">✕</button>
</div>
```

```js
// Programmatic
LuoDesign.inputClear('#nameWrap');
```

---

### Back to Top Button

```html
<button class="ld-top-btn" data-ld-back-to-top data-threshold="300">
  <span class="mgc_arrow_up_line"></span>
</button>
```

```js
// Programmatic
LuoDesign.backToTop('#topBtn', { threshold: 300 });
```

---

### Scroll Spy

Automatically updates the `active` class of navigation links based on scroll position. There is no declarative method for this — only JS calls are supported.

```js
LuoDesign.scrollSpy('.nav-link', 'section[id]');

// Cleanup
const spy = LuoDesign.scrollSpy('.nav-link', 'section[id]');
spy.destroy();
```

---

## 6. Common Mistakes to Avoid (Agent Checklist)

| Mistake | Correct Practice |
| :--- | :--- |
| Using Emojis | Use `mgc_*` icon classes. |
| Shadow on Cards | Use background contrast (White on Grey-100). |
| Glassmorphism on Cards | Use only on FAB or Floating Headers. |
| Double Squish on `.ld-btn` | `.ld-btn` has squish built-in. Do not add `.ld-squish`. |
| Violet Header Text | Use `--ld-grey-900` for header titles. |
| Static Segment Control | JS is **required** to move the indicator. Use `data-ld-seg` or `LuoDesign.seg()`. |
| Missing `.ld-toast-host` | `LuoDesign.toast()` creates one automatically if absent. |
| Chat send button always enabled | Use `LuoDesign.chatInput()` or `data-ld-chat` — it handles disabled state automatically. |
| Calling `LuoDesign.init()` manually | It runs automatically on `DOMContentLoaded`. Call only when dynamically adding components. |
