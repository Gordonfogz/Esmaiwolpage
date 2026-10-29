/**
 * ESMAIWOL — Nightcore iPod widget
 * Include: <script src="nightcore-ipod.js" defer></script>
 * Optional: <div id="nightcore-ipod-mount"></div> where you want it;
 *           if missing, mounts at end of body (fixed bottom-right fallback is NOT used —
 *           for index, inject mount under Racial Thoughts).
 */
(function () {
  if (window.__nightcoreIpodLoaded) return;
  window.__nightcoreIpodLoaded = true;

  const STREAM = "https://stream.laut.fm/nightcoremusic";

  const css = `
#nightcore-ipod-mount { margin-bottom: 12px; }
.nc-ipod {
  width: 100%;
  max-width: 260px;
  margin: 0 auto;
  background: linear-gradient(160deg, #e8ecf0 0%, #c5ccd4 40%, #9aa3ad 100%);
  border-radius: 28px;
  padding: 14px 14px 18px;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.85),
    inset 0 -2px 4px rgba(0,0,0,0.12),
    0 10px 28px rgba(0,0,0,0.35);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #1a1a1a;
  user-select: none;
}
.nc-ipod-screen {
  background: #0a1628;
  border-radius: 8px;
  border: 2px solid #6a727a;
  box-shadow: inset 0 0 0 1px #2a3540, inset 0 2px 8px rgba(0,0,0,0.5);
  padding: 10px 12px 12px;
  min-height: 120px;
  color: #c8e8ff;
}
.nc-ipod-screen .nc-title {
  margin: 0 0 4px;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.04em;
  color: #fff;
  text-align: center;
}
.nc-ipod-screen .nc-sub {
  margin: 0 0 10px;
  font-size: 10px;
  color: #7ab0d0;
  text-align: center;
}
.nc-ipod-screen .nc-status {
  margin: 0;
  font-size: 11px;
  text-align: center;
  color: #9ad4ff;
  min-height: 1.2em;
}
.nc-ipod-screen .nc-eq {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  height: 28px;
  margin-top: 10px;
  opacity: 0.35;
}
.nc-ipod-screen .nc-eq span {
  width: 4px;
  background: #5ec8ff;
  border-radius: 1px;
  height: 30%;
}
.nc-ipod.is-playing .nc-eq { opacity: 1; }
.nc-ipod.is-playing .nc-eq span {
  animation: ncEq 0.45s ease-in-out infinite alternate;
}
.nc-ipod.is-playing .nc-eq span:nth-child(2) { animation-delay: 0.1s; }
.nc-ipod.is-playing .nc-eq span:nth-child(3) { animation-delay: 0.2s; }
.nc-ipod.is-playing .nc-eq span:nth-child(4) { animation-delay: 0.05s; }
.nc-ipod.is-playing .nc-eq span:nth-child(5) { animation-delay: 0.15s; }
@keyframes ncEq {
  from { height: 20%; }
  to { height: 90%; }
}
.nc-ipod-wheel {
  width: 150px;
  height: 150px;
  margin: 16px auto 0;
  border-radius: 50%;
  background: linear-gradient(160deg, #f4f6f8, #b0b8c0);
  box-shadow:
    inset 0 2px 4px rgba(255,255,255,0.9),
    inset 0 -3px 6px rgba(0,0,0,0.15),
    0 2px 6px rgba(0,0,0,0.2);
  position: relative;
}
.nc-ipod-wheel .nc-center {
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  width: 52px; height: 52px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  background: linear-gradient(160deg, #dfe4ea, #8e96a0);
  box-shadow: inset 0 1px 0 #fff, 0 1px 3px rgba(0,0,0,0.25);
  color: #333;
  font-size: 18px;
  line-height: 1;
}
.nc-ipod-wheel .nc-center:hover { filter: brightness(1.05); }
.nc-ipod-wheel .nc-label {
  position: absolute;
  font-size: 9px;
  font-weight: bold;
  letter-spacing: 0.08em;
  color: #4a5560;
}
.nc-ipod-wheel .nc-menu { top: 14px; left: 50%; transform: translateX(-50%); }
.nc-ipod-vol {
  display: block;
  width: 80%;
  max-width: 160px;
  margin: 12px auto 0;
  accent-color: #4a5560;
}
.nc-ipod-note {
  margin: 8px 0 0;
  text-align: center;
  font-size: 9px;
  color: #5a6570;
}
`;

  function injectStyle() {
    if (document.getElementById("nightcore-ipod-style")) return;
    const s = document.createElement("style");
    s.id = "nightcore-ipod-style";
    s.textContent = css;
    document.head.appendChild(s);
  }

  function build(mount) {
    mount.innerHTML = `
      <div class="nc-ipod" id="nc-ipod">
        <div class="nc-ipod-screen">
          <p class="nc-title">NIGHTCORE FM</p>
          <p class="nc-sub">24/7 · HearMe / laut.fm</p>
          <p class="nc-status" id="nc-status">Paused</p>
          <div class="nc-eq" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div class="nc-ipod-wheel">
          <span class="nc-label nc-menu">MENU</span>
          <button type="button" class="nc-center" id="nc-play" title="Play / Pause">▶</button>
        </div>
        <input type="range" class="nc-ipod-vol" id="nc-vol" min="0" max="1" step="0.01" value="0.55" aria-label="Volume">
        <p class="nc-ipod-note">Stream may need a click to start</p>
      </div>
    `;

    const audio = new Audio();
    audio.preload = "none";
    audio.crossOrigin = "anonymous";
    audio.src = STREAM;
    audio.volume = 0.55;

    const ipod = mount.querySelector("#nc-ipod");
    const btn = mount.querySelector("#nc-play");
    const status = mount.querySelector("#nc-status");
    const vol = mount.querySelector("#nc-vol");

    async function play() {
      try {
        status.textContent = "Connecting…";
        await audio.play();
        ipod.classList.add("is-playing");
        btn.textContent = "❚❚";
        status.textContent = "Now playing";
      } catch (e) {
        status.textContent = "Tap play again";
        ipod.classList.remove("is-playing");
        btn.textContent = "▶";
      }
    }
    function pause() {
      audio.pause();
      ipod.classList.remove("is-playing");
      btn.textContent = "▶";
      status.textContent = "Paused";
    }

    btn.addEventListener("click", () => {
      if (audio.paused) play();
      else pause();
    });
    vol.addEventListener("input", () => {
      audio.volume = parseFloat(vol.value);
    });
    audio.addEventListener("error", () => {
      status.textContent = "Stream error";
      ipod.classList.remove("is-playing");
      btn.textContent = "▶";
    });
  }

  function init() {
    injectStyle();
    let mount = document.getElementById("nightcore-ipod-mount");
    if (!mount) {
      // auto-place after racial-thoughts widget if present
      const racial = document.querySelector("section.racial-thoughts-widget");
      if (racial && racial.parentNode) {
        mount = document.createElement("div");
        mount.id = "nightcore-ipod-mount";
        racial.parentNode.insertBefore(mount, racial.nextSibling);
      }
    }
    if (!mount) return; // only mount when placeholder or racial widget exists
    build(mount);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
