# Luo Design
> Vanilla CSS/JS design library that just works as is.

Luo Design is a glassmorphic, responsive design system built with vanilla CSS and JavaScript. Create modern, animation-rich UI that works in Web, PWA, and Mobile apps. No other frameworks or libraries needed.

---

## Specifications

* **Motion:** Features "Squish" interactions and Spring-based animations.
* **API:** Use **Declarative HTML** (data-attributes) or **Programmatic JS** (LuoDesign API).
* **Zero Dependencies:** Lightweight and fast. No external JS libraries needed.

## Installation

```bash
npm install luodesign
````

Or via CDN:

```html
<link rel="stylesheet" href="[https://cdn.jsdelivr.net/npm/luodesign/luodesign.css](https://cdn.jsdelivr.net/npm/luodesign/luodesign.css)">
<script src="[https://cdn.jsdelivr.net/npm/luodesign/luodesign.js](https://cdn.jsdelivr.net/npm/luodesign/luodesign.js)"></script>
```

-----

## Quick Start

### 1\. Setup

Include the Pretendard font and Mingcute icon set for the best experience.

```html
<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mingcute_icon@2.9.71/font/Mingcute.min.css">
```

Using React? You may import the CSS directly:

```jsx
import "luodesign/luodesign.css";
```

### 2\. Basic Components

Luo Design uses intuitive utility classes.

```html
<button class="ld-btn ld-btn-primary ld-btn-lg">
  Get Started
</button>

<div class="ld-card-section">
  <div class="ld-list-row ld-squish">
    <div class="ld-lr-icon ld-lr-icon-violet">
      <span class="mgc_star_line"></span>
    </div>
    <div class="ld-lr-content">
      <div class="ld-lr-title">Premium Feature</div>
      <div class="ld-lr-sub">Unlock more possibilities</div>
    </div>
  </div>
</div>
```

### 3\. Interactive Components (JS)

Components like **Segmented Controls** and **Bottom Sheets** work automatically using `data-ld-*` attributes.

```html
<div class="ld-seg" data-ld-seg>
  <div class="ld-seg-indicator"></div>
  <div class="ld-seg-item active">Tab A</div>
  <div class="ld-seg-item">Tab B</div>
</div>

<script>
  LuoDesign.toast("Welcome to Luo Design!");
</script>
```

-----

## Demo

### Bottom Sheet Example

```html
<button data-ld-trigger="mySheet">Open Sheet</button>

<div class="ld-sheet-backdrop" data-ld-backdrop="mySheet"></div>
<div class="ld-bottom-sheet" id="mySheet" data-ld-sheet>
  <div class="ld-sheet-handle"></div>
  <div class="ld-t3">Hello!</div>
  <p class="ld-body">This is a smooth bottom sheet.</p>
</div>
```

### AI Chat Input

```html
<div class="ld-chat-input-bar" data-ld-chat>
  <textarea class="ld-chat-textarea" placeholder="Ask anything..."></textarea>
  <button class="ld-chat-send" disabled>
    <span class="mgc_send_plane_fill"></span>
  </button>
</div>
```

-----

## License

This project is licensed under the **MIT License**.

-----

## For AI Agents

Are you building with an AI agent? Use our AGENTS.md guide for optimized code generation and library-specific rules.
