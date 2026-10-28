/**
 * ESMAIWOL.ZN — universal top chrome
 * Include: <script src="esmaiwol-chrome.js" defer></script>
 * Root assets: bar-disk.png, esmaiwol-tabuser.png
 */
(function () {
  if (window.__esmaiwolChromeLoaded) return;
  window.__esmaiwolChromeLoaded = true;

  const SUPABASE_URL = "https://oxgymzpvbpapsgmilenw.supabase.co";
  const SUPABASE_KEY = "sb_publishable_UzgjZ0LkU_qUtjZaRZPbcw_W5_r2p56";

  const css = `
#esmaiwol-chrome {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 99990;
  height: 84px;
  pointer-events: none;
}
#esmaiwol-chrome * { box-sizing: border-box; }
#esmaiwol-chrome .ec-bar {
  position: absolute;
  inset: 0;
  background-color: #1a1a1e;
  background-image: url('bar-disk.png');
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-bottom: 1px solid #3a3a42;
  box-shadow: 0 2px 8px rgba(0,0,0,0.55);
  pointer-events: none;
}
#esmaiwol-chrome .ec-inner {
  position: relative;
  z-index: 1;
  height: 84px;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 10px 0 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: auto;
}
#esmaiwol-chrome .ec-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 12px;
  min-width: 0;
  flex: 1;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  font-weight: bold;
}
#esmaiwol-chrome .ec-nav a {
  color: #c8e0ff;
  text-decoration: none;
  text-shadow: 0 1px 2px #000;
  padding: 2px 4px;
  border-radius: 2px;
}
#esmaiwol-chrome .ec-nav a:hover {
  color: #00ff83;
  background: rgba(0,0,0,0.35);
}
#esmaiwol-chrome .ec-device {
  position: relative;
  flex-shrink: 0;
  width: 300px;
  height: 78px;
  margin-left: auto;
  background: url('esmaiwol-tabuser.png') center center / 100% 100% no-repeat;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.55));
}
#esmaiwol-chrome a.ec-device-ui {
  position: absolute;
  inset: 0;
  display: block;
  text-decoration: none;
  color: #e8f4ff;
}
#esmaiwol-chrome a.ec-device-ui:hover { filter: brightness(1.06); }
#esmaiwol-chrome .ec-pfp,
#esmaiwol-chrome .ec-pfp.ph {
  position: absolute;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  border: 0;
  background: #0a1520;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.4);
  z-index: 2;
}
#esmaiwol-chrome .ec-pfp.ph {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: #9ec8e8;
  font-family: Tahoma, "Segoe UI", sans-serif;
}
#esmaiwol-chrome .ec-meta {
  position: absolute;
  left: 78px;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  min-width: 0;
  overflow: hidden;
  font-family: Tahoma, "Segoe UI", sans-serif;
  line-height: 1.2;
  text-align: left;
  pointer-events: none;
}
#esmaiwol-chrome .ec-nick {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  font-size: 14px;
  color: #f4faff;
  text-shadow: 0 0 8px #2a8ad4, 0 1px 2px #000;
  max-width: 100%;
}
#esmaiwol-chrome .ec-clock {
  display: block;
  font-size: 12px;
  color: #b8e4ff;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.7px;
  text-shadow: 0 0 5px #1a6aaa;
  margin-top: 2px;
}
body.esmaiwol-chrome-on { padding-top: 84px !important; }
@media (max-width: 640px) {
  #esmaiwol-chrome { height: 70px; }
  #esmaiwol-chrome .ec-inner { height: 70px; }
  body.esmaiwol-chrome-on { padding-top: 70px !important; }
  #esmaiwol-chrome .ec-nav { display: none; }
  #esmaiwol-chrome .ec-device {
    width: min(260px, 94vw);
    height: 64px;
    margin-left: auto;
    margin-right: auto;
  }
  #esmaiwol-chrome .ec-pfp,
  #esmaiwol-chrome .ec-pfp.ph {
    width: 38px;
    height: 38px;
    left: 18px;
  }
  #esmaiwol-chrome .ec-meta {
    left: 58px;
    right: 16px;
  }
  #esmaiwol-chrome .ec-nick { font-size: 12px; }
  #esmaiwol-chrome .ec-clock { font-size: 11px; }
}
`;

  function injectStyle() {
    const s = document.createElement("style");
    s.id = "esmaiwol-chrome-style";
    s.textContent = css;
    document.head.appendChild(s);
  }

  function el(tag, attrs, children) {
    const n = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
      if (k === "className") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2).toLowerCase(), v);
      else n.setAttribute(k, v);
    });
    (children || []).forEach(c => {
      if (c == null) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }

  function buildChrome() {
    const root = el("div", { id: "esmaiwol-chrome", "aria-label": "ESMAIWOL universal bar" });
    root.appendChild(el("div", { className: "ec-bar" }));

    const inner = el("div", { className: "ec-inner" });
    const nav = el("nav", { className: "ec-nav", "aria-label": "Site" });
    [
      ["index.html", "Inicio"],
      ["forum.html", "FORUM"],
      ["chat.html", "CHAT"],
      ["profile.html", "PROFILE"],
      ["login.html", "LOGIN"],
      ["chan.html", "CHAN"],
    ].forEach(([href, label]) => {
      nav.appendChild(el("a", { href, text: label }));
    });
    inner.appendChild(nav);

    const device = el("div", { className: "ec-device" });
    const ui = el("a", {
      className: "ec-device-ui",
      href: "login.html",
      id: "ec-device-link",
      title: "Profile / Login"
    });
    ui.appendChild(el("div", { className: "ec-pfp ph", id: "ec-pfp", text: "?" }));
    const meta = el("div", { className: "ec-meta" });
    meta.appendChild(el("span", { className: "ec-nick", id: "ec-nick", text: "Guest" }));
    meta.appendChild(el("span", { className: "ec-clock", id: "ec-clock", text: "--:--:--" }));
    ui.appendChild(meta);
    device.appendChild(ui);
    inner.appendChild(device);

    root.appendChild(inner);
    document.body.insertBefore(root, document.body.firstChild);
    document.body.classList.add("esmaiwol-chrome-on");
    return root;
  }

  function tickClock() {
    const elClock = document.getElementById("ec-clock");
    if (!elClock) return;
    const n = new Date();
    elClock.textContent =
      String(n.getHours()).padStart(2, "0") + ":" +
      String(n.getMinutes()).padStart(2, "0") + ":" +
      String(n.getSeconds()).padStart(2, "0");
  }

  function setGuest() {
    const link = document.getElementById("ec-device-link");
    const nick = document.getElementById("ec-nick");
    const pfp = document.getElementById("ec-pfp");
    if (link) link.href = "login.html";
    if (nick) nick.textContent = "Guest";
    if (pfp) {
      if (pfp.tagName === "IMG") {
        const ph = el("div", { className: "ec-pfp ph", id: "ec-pfp", text: "?" });
        pfp.replaceWith(ph);
      } else {
        pfp.className = "ec-pfp ph";
        pfp.textContent = "?";
      }
    }
  }

  function setUser(username, avatarUrl) {
    const link = document.getElementById("ec-device-link");
    const nick = document.getElementById("ec-nick");
    let pfp = document.getElementById("ec-pfp");
    if (link) link.href = "profile.html";
    if (nick) nick.textContent = username || "user";
    if (!pfp) return;
    if (avatarUrl) {
      if (pfp.tagName !== "IMG") {
        const img = el("img", {
          className: "ec-pfp",
          id: "ec-pfp",
          src: avatarUrl,
          alt: ""
        });
        pfp.replaceWith(img);
      } else {
        pfp.src = avatarUrl;
        pfp.className = "ec-pfp";
      }
    } else {
      const letter = (username || "?").charAt(0).toUpperCase();
      if (pfp.tagName === "IMG") {
        const ph = el("div", { className: "ec-pfp ph", id: "ec-pfp", text: letter });
        pfp.replaceWith(ph);
      } else {
        pfp.className = "ec-pfp ph";
        pfp.textContent = letter;
      }
    }
  }

  async function loadUser() {
    try {
      let createClient = window.supabase && window.supabase.createClient;
      if (!createClient) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
        createClient = window.supabase.createClient;
      }
      const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
      const { data } = await sb.auth.getSession();
      const session = data.session;
      if (!session) {
        setGuest();
        return;
      }
      const { data: p } = await sb.from("profiles")
        .select("username, display_name, avatar_url")
        .eq("id", session.user.id)
        .maybeSingle();
      const name = (p && (p.display_name || p.username)) ||
        session.user.email?.split("@")[0] || "user";
      setUser(name, p && p.avatar_url);
      sb.auth.onAuthStateChange(async () => {
        const { data: d2 } = await sb.auth.getSession();
        if (!d2.session) setGuest();
        else {
          const { data: p2 } = await sb.from("profiles")
            .select("username, display_name, avatar_url")
            .eq("id", d2.session.user.id)
            .maybeSingle();
          const n2 = (p2 && (p2.display_name || p2.username)) ||
            d2.session.user.email?.split("@")[0] || "user";
          setUser(n2, p2 && p2.avatar_url);
        }
      });
    } catch (e) {
      console.warn("esmaiwol-chrome auth", e);
      setGuest();
    }
  }

  function init() {
    injectStyle();
    buildChrome();
    tickClock();
    setInterval(tickClock, 1000);
    loadUser();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
