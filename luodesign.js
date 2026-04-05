(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
      ? define(factory)
      : (global.LuoDesign = factory());
})(
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
      ? window
      : this,
  function () {
    "use strict";

    function $(sel, ctx) {
      return (ctx || document).querySelector(sel);
    }
    function $$(sel, ctx) {
      return Array.from((ctx || document).querySelectorAll(sel));
    }

    function on(el, type, fn, opts) {
      type.split(" ").forEach((t) => el.addEventListener(t, fn, opts));
    }

    function pointerX(e) {
      return e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    }

    function toast(message, opts) {
      opts = Object.assign({ duration: 2600, host: ".ld-toast-host" }, opts);

      let host = typeof opts.host === "string" ? $(opts.host) : opts.host;
      if (!host) {
        host = document.createElement("div");
        host.className = "ld-toast-host";
        document.body.appendChild(host);
      }

      const el = document.createElement("div");
      el.className = "ld-toast";
      el.textContent = message;
      host.appendChild(el);

      let startX = 0,
        currentX = 0,
        dragging = false;
      let timer = null;

      function onDown(e) {
        startX = pointerX(e);
        dragging = true;
        el.style.transition = "none";
        el.style.cursor = "grabbing";
      }
      function onMove(e) {
        if (!dragging) return;
        currentX = pointerX(e) - startX;
        el.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`;
        el.style.opacity = String(Math.max(0, 1 - Math.abs(currentX) / 120));
      }
      function onUp() {
        if (!dragging) return;
        dragging = false;
        el.style.cursor = "";
        Math.abs(currentX) > 80
          ? dismiss(currentX > 0 ? 180 : -180)
          : ((el.style.transition =
              "transform .3s var(--spring-bounce), opacity .3s"),
            (el.style.transform = ""),
            (el.style.opacity = "1"));
      }

      on(el, "mousedown", onDown);
      on(el, "touchstart", onDown, { passive: true });
      on(window, "mousemove", onMove);
      on(window, "touchmove", onMove, { passive: true });
      on(window, "mouseup touchend", onUp);

      function dismiss(dx) {
        clearTimeout(timer);
        el.style.transition = "transform .28s var(--spring), opacity .25s";
        if (dx) {
          el.style.transform = `translateX(${dx}px) rotate(${dx * 0.04}deg)`;
        } else {
          el.style.animation = "ld-toast-out .28s var(--spring) forwards";
        }
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 300);
      }

      if (opts.duration > 0)
        timer = setTimeout(() => dismiss(0), opts.duration);

      return { dismiss: () => dismiss(0) };
    }

    function sheet(sheetEl, backdropEl, opts) {
      opts = Object.assign({ closeOnBackdrop: true }, opts);

      const s = typeof sheetEl === "string" ? $(sheetEl) : sheetEl;
      const b = typeof backdropEl === "string" ? $(backdropEl) : backdropEl;

      if (!s) throw new Error("[LuoDesign] sheet: 시트 요소를 찾을 수 없어요.");

      function open() {
        s.classList.add("open");
        if (b) b.classList.add("open");
        document.body.style.overflow = "hidden";
      }
      function close() {
        s.classList.remove("open");
        if (b) b.classList.remove("open");
        document.body.style.overflow = "";
      }
      function toggle() {
        s.classList.contains("open") ? close() : open();
      }

      if (b && opts.closeOnBackdrop) on(b, "click", close);

      return { open, close, toggle };
    }

    function seg(el, opts) {
      opts = Object.assign({}, opts);

      const root = typeof el === "string" ? $(el) : el;
      if (!root) throw new Error("[LuoDesign] seg: 요소를 찾을 수 없어요.");

      const items = $$(".ld-seg-item", root);
      let ind = $(".ld-seg-indicator", root);

      if (!ind) {
        ind = document.createElement("div");
        ind.className = "ld-seg-indicator";
        root.prepend(ind);
      }

      const w = 100 / items.length;
      ind.style.width = `calc(${w}% - 6px)`;

      function select(i) {
        items.forEach((x) => x.classList.remove("active"));
        items[i].classList.add("active");
        ind.style.left = `calc(${i * w}% + 3px)`;
        opts.onChange?.(i, items[i]);
      }

      items.forEach((item, i) => on(item, "click", () => select(i)));

      const initial = items.findIndex((x) => x.classList.contains("active"));

      requestAnimationFrame(() => {
        ind.style.transition = "none";
        select(initial >= 0 ? initial : 0);
        requestAnimationFrame(() => {
          ind.style.transition = "";
        });
      });

      return { select };
    }

    function dock(el, opts) {
      opts = Object.assign({}, opts);

      const root = typeof el === "string" ? $(el) : el;
      if (!root) throw new Error("[LuoDesign] dock: 요소를 찾을 수 없어요.");

      const items = $$(".ld-dock-item", root);
      let ind = $(".ld-dock-indicator", root);

      if (!ind) {
        ind = document.createElement("div");
        ind.className = "ld-dock-indicator";
        root.prepend(ind);
      }

      function move(itemEl) {
        const dr = root.getBoundingClientRect();
        const ir = itemEl.getBoundingClientRect();
        ind.style.left = ir.left - dr.left + "px";
        ind.style.width = ir.width + "px";
      }

      function select(i) {
        items.forEach((x) => x.classList.remove("active"));
        items[i].classList.add("active");
        move(items[i]);
        opts.onChange?.(i, items[i]);
      }

      items.forEach((item, i) => on(item, "click", () => select(i)));

      const initial = items.findIndex((x) => x.classList.contains("active"));
      requestAnimationFrame(() => {
        ind.style.transition = "none";
        move(items[initial >= 0 ? initial : 0]);
        requestAnimationFrame(() => {
          ind.style.transition = "";
        });
      });

      return { select };
    }

    function appHeader(headerEl, scrollEl, opts) {
      if (
        scrollEl &&
        typeof scrollEl === "object" &&
        !scrollEl.addEventListener
      ) {
        opts = scrollEl;
        scrollEl = null;
      }
      opts = Object.assign({ threshold: 48 }, opts);

      const h = typeof headerEl === "string" ? $(headerEl) : headerEl;
      const sc = scrollEl
        ? typeof scrollEl === "string"
          ? $(scrollEl)
          : scrollEl
        : window;
      if (!h) throw new Error("[LuoDesign] appHeader: 헤더 요소를 찾을 수 없어요.");

      function onScroll() {
        const t = sc === window ? sc.scrollY : sc.scrollTop;
        const prog = Math.min(t / opts.threshold, 1);
        h.style.background = `rgba(255,255,255,${prog * 0.82})`;
        h.style.backdropFilter = `blur(${16 * prog}px) saturate(${100 + 80 * prog}%)`;
        h.style.borderBottom =
          t > 4
            ? `1px solid rgba(0,0,0,${0.06 * prog})`
            : "1px solid transparent";
        h.style.boxShadow =
          t > 4 ? `0 1px 16px rgba(0,0,0,${0.07 * prog})` : "";
      }

      on(sc, "scroll", onScroll, { passive: true });
      onScroll();

      return { destroy: () => sc.removeEventListener("scroll", onScroll) };
    }

    function backToTop(btnEl, opts) {
      opts = Object.assign({ threshold: 300 }, opts);

      const btn = typeof btnEl === "string" ? $(btnEl) : btnEl;
      const sc = opts.scrollEl
        ? typeof opts.scrollEl === "string"
          ? $(opts.scrollEl)
          : opts.scrollEl
        : window;
      if (!btn)
        throw new Error("[LuoDesign] backToTop: 버튼 요소를 찾을 수 없어요.");

      function onScroll() {
        const y = sc === window ? sc.scrollY : sc.scrollTop;
        btn.classList.toggle("visible", y > opts.threshold);
      }

      on(btn, "click", () => {
        if (sc === window) window.scrollTo({ top: 0, behavior: "smooth" });
        else sc.scrollTo({ top: 0, behavior: "smooth" });
      });

      on(sc, "scroll", onScroll, { passive: true });
      onScroll();

      return { destroy: () => sc.removeEventListener("scroll", onScroll) };
    }

    function chatInput(barEl, opts) {
      opts = Object.assign({ maxHeight: 120 }, opts);

      const bar = typeof barEl === "string" ? $(barEl) : barEl;
      if (!bar)
        throw new Error("[LuoDesign] chatInput: 입력창 요소를 찾을 수 없어요.");

      const ta = $(".ld-chat-textarea", bar);
      const send = $(".ld-chat-send", bar);
      if (!ta)
        throw new Error(
          "[LuoDesign] chatInput: .ld-chat-textarea 를 찾을 수 없어요.",
        );

      function grow() {
        const prev = ta.offsetHeight;
        ta.style.transition = "none";
        ta.style.height = "1px";
        const target = Math.min(ta.scrollHeight, opts.maxHeight);
        ta.style.height = prev + "px";
        void ta.offsetHeight;
        ta.style.transition = "height .2s var(--spring)";
        ta.style.height = target + "px";
        bar.style.alignItems = target > 36 ? "flex-end" : "center";
        if (send) send.disabled = ta.value.trim() === "";
      }

      function clear() {
        ta.value = "";
        ta.style.height = "";
        bar.style.alignItems = "center";
        if (send) send.disabled = true;
      }

      on(ta, "input", grow);

      if (send && opts.onSend) {
        on(send, "click", () => opts.onSend(ta.value, clear));
      }

      on(ta, "keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && opts.onSend) {
          e.preventDefault();
          opts.onSend(ta.value, clear);
        }
      });

      return { clear };
    }

    function stepper(el, opts) {
      opts = Object.assign({ value: 1, min: 0, max: Infinity, step: 1 }, opts);

      const root = typeof el === "string" ? $(el) : el;
      if (!root) throw new Error("[LuoDesign] stepper: 요소를 찾을 수 없어요.");

      const valEl = $(".ld-stepper-val", root);
      const btns = $$(".ld-stepper-btn", root);
      let current = opts.value;

      function setValue(v) {
        current = Math.min(opts.max, Math.max(opts.min, v));
        if (valEl) valEl.textContent = current;
        opts.onChange?.(current);
      }

      btns.forEach((btn) => {
        on(btn, "click", () => {
          const delta = btn.dataset.step
            ? Number(btn.dataset.step)
            : btn.textContent.trim() === "+"
              ? opts.step
              : -opts.step;
          setValue(current + delta);
        });
      });

      setValue(current);
      return {
        getValue: () => current,
        setValue,
      };
    }

    function inputClear(wrapEl) {
      const wrap = typeof wrapEl === "string" ? $(wrapEl) : wrapEl;
      if (!wrap) return;

      const input = $("input, textarea", wrap);
      const btn = $(".ld-input-clear", wrap);
      if (!input || !btn) return;

      on(btn, "mousedown", (e) => {
        e.preventDefault();
        input.value = "";
        input.focus();
        input.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }

    function scrollSpy(navSel, sectionSel, opts) {
      opts = Object.assign({ threshold: 0.3 }, opts);

      const links = $$(navSel);
      const sections = $$(sectionSel);

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            links.forEach((l) =>
              l.classList.toggle(
                "active",
                l.getAttribute("href") === "#" + e.target.id,
              ),
            );
          });
        },
        { threshold: opts.threshold },
      );

      sections.forEach((s) => io.observe(s));
      return { destroy: () => io.disconnect() };
    }

    function init() {

      $$("[data-ld-seg]").forEach((el) => {
        try {
          seg(el);
        } catch (e) {
          console.warn(e.message);
        }
      });

      $$("[data-ld-dock]").forEach((el) => {
        try {
          dock(el);
        } catch (e) {
          console.warn(e.message);
        }
      });

      const sheets = {};
      $$("[data-ld-sheet]").forEach((el) => {
        const id = el.id;
        const bEl = $(`[data-ld-backdrop="${id}"]`);
        try {
          sheets[id] = sheet(el, bEl);
        } catch (e) {
          console.warn(e.message);
        }
      });

      $$("[data-ld-trigger]").forEach((btn) => {
        const id = btn.dataset.ldTrigger;
        on(btn, "click", () => sheets[id]?.toggle());
      });

      $$("[data-ld-app-header]").forEach((el) => {
        const scrollSel = el.dataset.scrollEl || null;
        try {
          appHeader(el, scrollSel || undefined);
        } catch (e) {
          console.warn(e.message);
        }
      });

      $$("[data-ld-chat]").forEach((el) => {
        try {
          chatInput(el);
        } catch (e) {
          console.warn(e.message);
        }
      });

      $$("[data-ld-stepper]").forEach((el) => {
        const o = {
          min: el.dataset.min !== undefined ? Number(el.dataset.min) : 0,
          max: el.dataset.max !== undefined ? Number(el.dataset.max) : Infinity,
          value: el.dataset.value !== undefined ? Number(el.dataset.value) : 1,
        };
        try {
          stepper(el, o);
        } catch (e) {
          console.warn(e.message);
        }
      });

      $$("[data-ld-input-clear]").forEach((el) => inputClear(el));

      $$("[data-ld-back-to-top]").forEach((el) => {
        const threshold = el.dataset.threshold
          ? Number(el.dataset.threshold)
          : 300;
        try {
          backToTop(el, { threshold });
        } catch (e) {
          console.warn(e.message);
        }
      });
    }

    if (typeof document !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
      } else {
        init();
      }
    }

    return {
      toast,
      sheet,
      seg,
      dock,
      appHeader,
      backToTop,
      chatInput,
      stepper,
      inputClear,
      scrollSpy,
      init,
      version: "1.0.0",
    };
  },
);
