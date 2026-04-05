# Luo Design (루오디자인)
> 그저 넣기만 하면 되는 바닐라 CSS/JS 디자인 라이브러리 !

루오디자인은 글래스모피즘과 반응형 디자인 시스템으로, 순수 CSS와 JavaScript로 만들었어요. 웹, PWA, 모바일 앱에서 작동하는 현대적이고 애니메이션이 풍부한 UI를 만들어보세요. 다른 프레임워크나 라이브러리는 필요 없어요.

---

## 특징

* **모션:** 탄력 있는 애니메이션과 말랑말랑한 (squish) 인터랙션을 제공해요.
* **API:** data-attributes를 활용한 선언적 HTML 방식과 LuoDesign API를 활용한 프로그래밍 방식 모두 지원해요.
* **종속성:** JS 라이브러리요 ? 그게 머죠 ? 루오디자인은 가볍고 빠르며, 외부 JS 라이브러리가 필요 없어요.

## 설치

```bash
npm install luodesign
````

또는 CDN을 이용하세요.

```html
<link rel="stylesheet" href="[https://cdn.jsdelivr.net/npm/luodesign/luodesign.css](https://cdn.jsdelivr.net/npm/luodesign/luodesign.css)">
<script src="[https://cdn.jsdelivr.net/npm/luodesign/luodesign.js](https://cdn.jsdelivr.net/npm/luodesign/luodesign.js)"></script>
```

-----

## 빠른 시작

### 1\. 선언

프리텐다드와 Mingcute 아이콘 세트를 포함하세요.

```html
<link href="[https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap](https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap)" rel="stylesheet">
<link rel="stylesheet" href="[https://cdn.jsdelivr.net/npm/mingcute_icon@2.9.71/font/Mingcute.min.css](https://cdn.jsdelivr.net/npm/mingcute_icon@2.9.71/font/Mingcute.min.css)">
```

React를 사용하신다구요 ? CSS를 직접 가져올 수 있어요.

```jsx
import "luodesign/luodesign.css";
```

### 2\. 기본 컴포넌트

루오디자인은 직관적인 유틸리티 클래스를 사용해요.

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

### 3\. 상호 작용 컴포넌트 (JS)

**탭 컨트롤**과 **하단 시트**와 같은 컴포넌트는 `data-ld-*` 속성을 사용하여 자동으로 작동해요.

```html
<div class="ld-seg" data-ld-seg>
  <div class="ld-seg-indicator"></div>
  <div class="ld-seg-item active">Tab A</div>
  <div class="ld-seg-item">Tab B</div>
</div>

<script>
  LuoDesign.toast("루오디자인에 어서 와요 !");
</script>
```

-----

## 예시

### 하단 시트

```html
<button data-ld-trigger="mySheet">Open Sheet</button>

<div class="ld-sheet-backdrop" data-ld-backdrop="mySheet"></div>
<div class="ld-bottom-sheet" id="mySheet" data-ld-sheet>
  <div class="ld-sheet-handle"></div>
  <div class="ld-t3">Hello!</div>
  <p class="ld-body">This is a smooth bottom sheet.</p>
</div>
```

### AI 채팅 입력 창

```html
<div class="ld-chat-input-bar" data-ld-chat>
  <textarea class="ld-chat-textarea" placeholder="Ask anything..."></textarea>
  <button class="ld-chat-send" disabled>
    <span class="mgc_send_plane_fill"></span>
  </button>
</div>
```

-----

## 라이선스

**MIT 라이선스**로 배포돼요.

-----

## AI 에이전트를 사용하시나요 ?

AI 에이전트와 함께 빌드하고 계신가요 ? 최적화된 코드 생성과 라이브러리별 규칙에 대한 AGENTS.md 가이드를 활용하세요.
