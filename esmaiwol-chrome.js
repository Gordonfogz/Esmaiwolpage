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
#esmaiwol-chrome .ec-games {
  position: relative;
  display: inline-flex;
  align-items: center;
}
#esmaiwol-chrome .ec-games-toggle {
  appearance: none;
  border: 0;
  background: transparent;
  color: #c8e0ff;
  text-decoration: none;
  text-shadow: 0 1px 2px #000;
  padding: 2px 4px;
  border-radius: 2px;
  cursor: pointer;
  font: inherit;
  font-weight: bold;
}
#esmaiwol-chrome .ec-games-toggle:hover,
#esmaiwol-chrome .ec-games.open .ec-games-toggle {
  color: #00ff83;
  background: rgba(0,0,0,0.35);
}
#esmaiwol-chrome .ec-games-toggle::after { content: " ▾"; font-size: 10px; }
#esmaiwol-chrome .ec-games-menu {
  display: none;
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 190px;
  padding: 5px;
  background: #0c1524;
  border: 1px solid #3a5f8a;
  box-shadow: 0 6px 16px rgba(0,0,0,0.65);
  z-index: 100000;
}
#esmaiwol-chrome .ec-games.open .ec-games-menu { display: block; }
#esmaiwol-chrome .ec-games-menu a {
  display: block;
  padding: 9px 10px;
  color: #c8e0ff;
  white-space: nowrap;
  border-bottom: 1px solid #1a2a40;
}
#esmaiwol-chrome .ec-games-menu a:hover { color: #00ff83; background: #152038; }
#esmaiwol-chrome .ec-games-menu small {
  display: block;
  margin-top: 3px;
  color: #7a9ab8;
  font-size: 10px;
  font-weight: normal;
}

#esmaiwol-chrome .ec-search {
  position: relative;
  flex-shrink: 0;
  width: min(220px, 28vw);
}
#esmaiwol-chrome .ec-search input {
  width: 100%;
  height: 28px;
  border: 1px solid #4a5568;
  border-radius: 3px;
  background: rgba(8, 12, 20, 0.85);
  color: #e8f0ff;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  padding: 0 10px 0 28px;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
}
#esmaiwol-chrome .ec-search input::placeholder { color: #7a8aa0; }
#esmaiwol-chrome .ec-search input:focus {
  border-color: #6ba3e0;
  box-shadow: 0 0 0 1px #2b6cb0, inset 0 1px 3px rgba(0,0,0,0.5);
}
#esmaiwol-chrome .ec-search .ec-search-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #8ab4d8;
  pointer-events: none;
}
#esmaiwol-chrome .ec-search-results {
  display: none;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  min-width: 260px;
  max-height: 280px;
  overflow-y: auto;
  background: #0c1524;
  border: 1px solid #3a5f8a;
  box-shadow: 0 6px 16px rgba(0,0,0,0.55);
  z-index: 99999;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}
#esmaiwol-chrome .ec-search-results.open { display: block; }
#esmaiwol-chrome .ec-search-results a,
#esmaiwol-chrome .ec-search-results .ec-hit {
  display: block;
  padding: 8px 10px;
  color: #c8e0ff;
  text-decoration: none;
  border-bottom: 1px solid #1a2a40;
  cursor: pointer;
}
#esmaiwol-chrome .ec-search-results a:hover,
#esmaiwol-chrome .ec-search-results .ec-hit:hover {
  background: #152038;
  color: #00ff83;
}
#esmaiwol-chrome .ec-search-results .ec-hit-title {
  font-weight: bold;
  color: #fff;
}
#esmaiwol-chrome .ec-search-results .ec-hit-meta {
  font-size: 10px;
  color: #7a9ab8;
  margin-top: 2px;
}
#esmaiwol-chrome .ec-search-results .ec-empty {
  padding: 10px;
  color: #7a9ab8;
}
@media (max-width: 640px) {
  #esmaiwol-chrome .ec-search { width: min(110px, 29vw); }
  #esmaiwol-chrome .ec-device { width: min(210px, 56vw); }
  #esmaiwol-chrome .ec-bell { width:30px; height:30px; }
}

#esmaiwol-chrome .ec-notifications { position:relative; flex-shrink:0; }
#esmaiwol-chrome .ec-bell { position:relative; display:flex; align-items:center; justify-content:center; width:34px; height:34px; padding:0; border:1px solid rgba(190,195,202,.28); border-radius:4px; background:rgba(8,10,14,.58); color:#c5c8ce; cursor:pointer; line-height:1; box-shadow:none; }
#esmaiwol-chrome .ec-bell svg { display:block; width:19px; height:19px; fill:none; stroke:currentColor; stroke-width:1.7; stroke-linecap:round; stroke-linejoin:round; }
#esmaiwol-chrome .ec-bell:hover, #esmaiwol-chrome .ec-notifications.open .ec-bell { color:#fff; border-color:rgba(220,224,230,.58); background:rgba(35,38,44,.78); box-shadow:none; }
#esmaiwol-chrome .ec-notif-count { position:absolute; top:-7px; right:-7px; min-width:17px; height:17px; padding:0 4px; border-radius:10px; background:#d83b52; color:white; font:bold 10px/17px Tahoma,sans-serif; text-align:center; border:1px solid #101722; }
#esmaiwol-chrome .ec-notif-count:empty { display:none; }
#esmaiwol-chrome .ec-notif-menu { display:none; position:absolute; top:calc(100% + 9px); right:0; width:min(350px,88vw); max-height:390px; overflow:auto; padding:7px; background:#0b1422; border:1px solid #42658b; box-shadow:0 8px 22px rgba(0,0,0,.72); z-index:100002; color:#dcecff; font:12px Tahoma,sans-serif; }
#esmaiwol-chrome .ec-notifications.open .ec-notif-menu { display:block; }
#esmaiwol-chrome .ec-notif-head { display:flex; justify-content:space-between; align-items:center; padding:5px 4px 9px; border-bottom:1px solid #263c55; color:#fff; font-weight:bold; }
#esmaiwol-chrome .ec-notif-head button { border:0; background:none; color:#83c8ff; cursor:pointer; font:11px Tahoma,sans-serif; }
#esmaiwol-chrome .ec-notif-item { display:block; padding:9px 7px; color:#dcecff; text-decoration:none; border-bottom:1px solid #1a2a40; line-height:1.4; }
#esmaiwol-chrome .ec-notif-item:hover { background:#15263b; color:#00ff9a; }
#esmaiwol-chrome .ec-notif-item.unread { background:rgba(32,92,130,.22); border-left:2px solid #39a9ff; }
#esmaiwol-chrome .ec-notif-time { display:block; margin-top:3px; color:#7896b4; font-size:10px; }
#esmaiwol-chrome .ec-notif-item.admin { border-left:2px solid #00d98b; background:rgba(0,115,76,.16); }
#esmaiwol-chrome .ec-notif-admin-tag { display:inline-block; margin-right:6px; padding:1px 4px; border:1px solid #00a86b; color:#67ffc0; font:bold 9px Tahoma,sans-serif; letter-spacing:.5px; }
#esmaiwol-chrome .ec-notif-empty { padding:18px 8px; text-align:center; color:#8298ad; }

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
#esmaiwol-chrome button.ec-device-ui {
  appearance: none;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-align: left;
}
#esmaiwol-chrome button.ec-device-ui:hover { filter: brightness(1.06); }
#esmaiwol-chrome .ec-account-menu {
  display: none;
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  width: 190px;
  padding: 5px;
  background: #0b1422;
  border: 1px solid #42658b;
  box-shadow: 0 8px 22px rgba(0,0,0,.72);
  z-index: 100003;
  font: 12px "Courier New", Courier, monospace;
}
#esmaiwol-chrome .ec-device.account-open .ec-account-menu { display: block; }
#esmaiwol-chrome .ec-account-menu a,
#esmaiwol-chrome .ec-account-menu button {
  display: block;
  width: 100%;
  padding: 9px 10px;
  border: 0;
  border-bottom: 1px solid #1a2a40;
  border-radius: 0;
  background: transparent;
  color: #c8e0ff;
  text-align: left;
  text-decoration: none;
  font: inherit;
  cursor: pointer;
}
#esmaiwol-chrome .ec-account-menu a:hover,
#esmaiwol-chrome .ec-account-menu button:hover {
  color: #00ff83;
  background: #15263b;
}
#esmaiwol-chrome .ec-account-menu [hidden] { display: none !important; }
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
      ["index.html", "HOME"],
      ["forum.html", "FORUM"],
      ["chat.html", "CHAT"],
      ["profile.html", "PROFILE"],
      ["login.html", "LOGIN"],
      ["chan.html", "CHAN"],
    ].forEach(([href, label]) => {
      nav.appendChild(el("a", { href, text: label }));
    });

    // Games dropdown sits immediately beside CHAN.
    const games = el("div", { className: "ec-games" });
    const gamesToggle = el("button", {
      className: "ec-games-toggle",
      type: "button",
      text: "GAMES",
      "aria-expanded": "false",
      "aria-haspopup": "true"
    });
    const gamesMenu = el("div", {
      className: "ec-games-menu",
      role: "menu",
      "aria-label": "Juegos disponibles"
    });
    const raymanLink = el("a", { href: "games.html", role: "menuitem" });
    raymanLink.appendChild(document.createTextNode("🎮 Rayman (PS1)"));
    raymanLink.appendChild(el("small", { text: "Jugar desde ESMAIWOL.ZN" }));
    gamesMenu.appendChild(raymanLink);

    gamesToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = games.classList.toggle("open");
      gamesToggle.setAttribute("aria-expanded", String(isOpen));
    });
    gamesMenu.addEventListener("click", (event) => event.stopPropagation());
    document.addEventListener("click", () => {
      games.classList.remove("open");
      gamesToggle.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        games.classList.remove("open");
        gamesToggle.setAttribute("aria-expanded", "false");
      }
    });

    games.appendChild(gamesToggle);
    games.appendChild(gamesMenu);
    nav.appendChild(games);
    inner.appendChild(nav);

    const searchWrap = el("div", { className: "ec-search" });
    searchWrap.appendChild(el("span", { className: "ec-search-icon", text: "⌕" }));
    const searchInput = el("input", {
      type: "search",
      id: "ec-search-input",
      placeholder: "Buscar…",
      autocomplete: "off",
      "aria-label": "Buscar en el sitio"
    });
    const searchResults = el("div", {
      className: "ec-search-results",
      id: "ec-search-results",
      role: "listbox"
    });
    searchWrap.appendChild(searchInput);
    searchWrap.appendChild(searchResults);
    inner.appendChild(searchWrap);

    const notifications = el("div", { className: "ec-notifications", id: "ec-notifications" });
    const bell = el("button", { className: "ec-bell", id: "ec-bell", type: "button", title: "Notifications", "aria-label": "Notifications", "aria-expanded": "false" });
    bell.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M10 21h4"></path></svg>';
    const count = el("span", { className: "ec-notif-count", id: "ec-notif-count", text: "" });
    bell.appendChild(count);
    const menu = el("div", { className: "ec-notif-menu", id: "ec-notif-menu" });
    menu.appendChild(el("div", { className: "ec-notif-head" }, [el("span", { text: "NOTIFICATIONS", id: "ec-notif-title" }), el("button", { type: "button", id: "ec-notif-readall", text: "Mark all read" })]));
    menu.appendChild(el("div", { id: "ec-notif-list", className: "ec-notif-empty", text: "Log in to see your notifications." }));
    notifications.appendChild(bell);
    notifications.appendChild(menu);
    inner.appendChild(notifications);

    const device = el("div", { className: "ec-device", id: "ec-account" });
    const ui = el("button", {
      className: "ec-device-ui",
      type: "button",
      id: "ec-device-link",
      title: "Account options",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    });
    ui.appendChild(el("div", { className: "ec-pfp ph", id: "ec-pfp", text: "?" }));
    const meta = el("div", { className: "ec-meta" });
    meta.appendChild(el("span", { className: "ec-nick", id: "ec-nick", text: "Guest" }));
    meta.appendChild(el("span", { className: "ec-clock", id: "ec-clock", text: "--:--:--" }));
    ui.appendChild(meta);
    device.appendChild(ui);

    const accountMenu = el("div", {
      className: "ec-account-menu",
      id: "ec-account-menu",
      role: "menu",
      "aria-label": "Account options"
    });
    accountMenu.appendChild(el("a", { href: "login.html", id: "ec-account-login", role: "menuitem", text: "Log in" }));
    accountMenu.appendChild(el("a", { href: "forum.html", id: "ec-account-post", role: "menuitem", text: "Post" }));
    accountMenu.appendChild(el("a", { href: "profile.html", id: "ec-account-profile", role: "menuitem", text: "View profile" }));
    accountMenu.appendChild(el("button", { type: "button", id: "ec-account-logout", role: "menuitem", text: "Log out" }));
    device.appendChild(accountMenu);

    ui.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = device.classList.toggle("account-open");
      ui.setAttribute("aria-expanded", String(isOpen));
    });
    accountMenu.addEventListener("click", event => event.stopPropagation());
    document.addEventListener("click", () => {
      device.classList.remove("account-open");
      ui.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        device.classList.remove("account-open");
        ui.setAttribute("aria-expanded", "false");
      }
    });
    accountMenu.querySelector("#ec-account-logout").addEventListener("click", async () => {
      if (!chromeSupabaseClient) return;
      const { error } = await chromeSupabaseClient.auth.signOut();
      if (error) {
        alert("Could not log out: " + error.message);
        return;
      }
      device.classList.remove("account-open");
      ui.setAttribute("aria-expanded", "false");
      setGuest();
      initNotifications(null);
    });

    inner.appendChild(device);

    root.appendChild(inner);
    document.body.insertBefore(root, document.body.firstChild);
    document.body.classList.add("esmaiwol-chrome-on");
    updateAccountMenu(false);
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

  let chromeSupabaseClient = null;

  function updateAccountMenu(loggedIn) {
    const login = document.getElementById("ec-account-login");
    const post = document.getElementById("ec-account-post");
    const profile = document.getElementById("ec-account-profile");
    const logout = document.getElementById("ec-account-logout");
    if (login) login.hidden = !!loggedIn;
    if (post) post.hidden = !loggedIn;
    if (profile) profile.hidden = !loggedIn;
    if (logout) logout.hidden = !loggedIn;
  }

  function setGuest() {
    const link = document.getElementById("ec-device-link");
    const nick = document.getElementById("ec-nick");
    const pfp = document.getElementById("ec-pfp");
    if (link) link.title = "Account options";
    if (nick) nick.textContent = "Guest";
    updateAccountMenu(false);
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
    if (link) link.title = "Account options";
    if (nick) nick.textContent = username || "user";
    updateAccountMenu(true);
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

  let _notifSession = null;
  let _notifTimer = null;
  let _notifBusy = false;
  function notifEscape(value) { return String(value == null ? "" : value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function notifText(n) {
    const actor = n.actor_name || "Someone";
    if (n.type === "user_registered") return "NEW USER REGISTERED — " + actor + " joined ESMAIWOL.ZN.";
    if (n.type === "reply") return actor + " replied to your thread.";
    if (n.type === "quote") return actor + " quoted your post.";
    if (n.type === "reaction") return actor + " reacted " + (n.emoji || "") + " to your post.";
    return actor + " interacted with your post.";
  }
  function notifHref(n) {
    if (n.type === "user_registered") {
      const username = n.actor && n.actor.username;
      return username ? "profile.html?u=" + encodeURIComponent(username) : "profile.html";
    }
    const id = n.thread_id || (n.post_id || "");
    return "forum.html?thread=" + encodeURIComponent(String(id));
  }
  async function loadNotifications() {
    if (!_notifSession || _notifBusy) return;
    _notifBusy = true;
    try {
      const sb = await getSearchClient();
      const { data, error } = await sb.from("site_notifications")
        .select("id, recipient_id, actor_id, type, thread_id, post_id, emoji, created_at, registered_at, read_at, actor:profiles!site_notifications_actor_id_fkey(username, display_name)")
        .eq("recipient_id", _notifSession.user.id)
        .order("created_at", { ascending: false }).limit(30);
      if (error) throw error;
      const rows = data || [];
      const unread = rows.filter(n => !n.read_at).length;
      const badge = document.getElementById("ec-notif-count");
      const list = document.getElementById("ec-notif-list");
      if (badge) badge.textContent = unread > 99 ? "99+" : (unread ? String(unread) : "");
      if (!list) return;
      if (!rows.length) { list.className = "ec-notif-empty"; list.textContent = "No notifications yet."; return; }
      list.className = "";
      list.innerHTML = rows.map(n => {
        const actor = n.actor || {};
        const item = { ...n, actor_name: actor.display_name || actor.username || "Someone" };
        const isAdminNotice = n.type === "user_registered";
        const timestamp = isAdminNotice ? n.registered_at : n.created_at;
        const when = timestamp ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "medium" }).format(new Date(timestamp)) : "";
        const tag = isAdminNotice ? '<span class="ec-notif-admin-tag">ADMIN · NEW USER</span>' : '';
        return '<a class="ec-notif-item ' + (!n.read_at ? 'unread ' : '') + (isAdminNotice ? 'admin' : '') + '" href="' + notifEscape(notifHref(item)) + '" data-notif-id="' + notifEscape(n.id) + '">' + tag + notifEscape(notifText(item)) + '<span class="ec-notif-time">' + (isAdminNotice ? 'Registered: ' : '') + notifEscape(when) + '</span></a>';
      }).join("");
    } catch (e) { console.warn("ESMAIWOL notifications", e); }
    finally { _notifBusy = false; }
  }
  async function markNotificationRead(id) {
    if (!_notifSession) return;
    try { const sb = await getSearchClient(); await sb.from("site_notifications").update({ read_at: new Date().toISOString() }).eq("id", id).eq("recipient_id", _notifSession.user.id); } catch(e) { console.warn(e); }
  }
  function initNotifications(session) {
    _notifSession = session || null;
    const root = document.getElementById("ec-notifications");
    const bell = document.getElementById("ec-bell");
    const list = document.getElementById("ec-notif-list");
    const readAll = document.getElementById("ec-notif-readall");
    if (!root || !bell) return;
    if (_notifTimer) { clearInterval(_notifTimer); _notifTimer = null; }
    bell.disabled = !_notifSession;
    if (!_notifSession) {
      document.getElementById("ec-notif-count").textContent = "";
      if (list) { list.className = "ec-notif-empty"; list.textContent = "Log in to see your notifications."; }
      root.classList.remove("open"); bell.setAttribute("aria-expanded", "false"); return;
    }
    (async () => {
      try {
        const sb = await getSearchClient();
        const { data } = await sb.from("site_admins").select("user_id").eq("user_id", session.user.id).maybeSingle();
        const title = document.getElementById("ec-notif-title");
        if (title) title.textContent = data ? "ADMIN NOTIFICATIONS" : "NOTIFICATIONS";
        root.classList.toggle("is-admin", !!data);
      } catch (err) { console.warn("ESMAIWOL admin check", err); }
    })();
    loadNotifications();
    _notifTimer = setInterval(loadNotifications, 25000);
    bell.onclick = (event) => { event.stopPropagation(); const open = root.classList.toggle("open"); bell.setAttribute("aria-expanded", String(open)); if (open) loadNotifications(); };
    root.querySelector(".ec-notif-menu").onclick = (event) => event.stopPropagation();
    if (!root.dataset.outsideBound) {
      document.addEventListener("click", () => { root.classList.remove("open"); bell.setAttribute("aria-expanded", "false"); });
      document.addEventListener("keydown", e => { if (e.key === "Escape") { root.classList.remove("open"); bell.setAttribute("aria-expanded", "false"); } });
      root.dataset.outsideBound = "1";
    }
    if (list && !list.dataset.bound) {
      list.addEventListener("click", async e => { const a = e.target.closest("a[data-notif-id]"); if (a) { e.preventDefault(); await markNotificationRead(a.dataset.notifId); location.href = a.href; } });
      list.dataset.bound = "1";
    }
    if (readAll && !readAll.dataset.bound) {
      readAll.addEventListener("click", async e => { e.stopPropagation(); try { const sb = await getSearchClient(); await sb.from("site_notifications").update({read_at:new Date().toISOString()}).eq("recipient_id", _notifSession.user.id).is("read_at", null); await loadNotifications(); } catch(err) { console.warn(err); } });
      readAll.dataset.bound = "1";
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
      chromeSupabaseClient = sb;
      const { data } = await sb.auth.getSession();
      const session = data.session;
      if (!session) {
        setGuest();
        initNotifications(null);
        return;
      }
      initNotifications(session);
      const { data: p } = await sb.from("profiles")
        .select("username, display_name, avatar_url")
        .eq("id", session.user.id)
        .maybeSingle();
      const name = (p && (p.display_name || p.username)) ||
        session.user.email?.split("@")[0] || "user";
      setUser(name, p && p.avatar_url);
      sb.auth.onAuthStateChange(async () => {
        const { data: d2 } = await sb.auth.getSession();
        if (!d2.session) { setGuest(); initNotifications(null); }
        else {
          initNotifications(d2.session);
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
      initNotifications(null);
    }
  }

  // ---- Content search (forum threads / posts / chat) via Supabase ----
  let _sbSearch = null;
  async function getSearchClient() {
    if (_sbSearch) return _sbSearch;
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
    _sbSearch = createClient(SUPABASE_URL, SUPABASE_KEY);
    return _sbSearch;
  }

  function escapeReg(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function snippet(text, query, maxLen) {
    const raw = (text || "").replace(/\s+/g, " ").trim();
    if (!raw) return "";
    const q = (query || "").trim();
    const lower = raw.toLowerCase();
    const qi = q ? lower.indexOf(q.toLowerCase()) : -1;
    let start = 0;
    if (qi >= 0) start = Math.max(0, qi - 40);
    let cut = raw.slice(start, start + (maxLen || 110));
    if (start > 0) cut = "…" + cut;
    if (start + (maxLen || 110) < raw.length) cut += "…";
    return cut;
  }

  async function searchContent(query) {
    const q = (query || "").trim();
    if (q.length < 2) return [];
    const hits = [];
    const pattern = "%" + q.replace(/%/g, "").replace(/_/g, "") + "%";
    try {
      const sb = await getSearchClient();

      // Threads
      const th = await sb.from("forum_threads")
        .select("id, board_id, title, body, created_at, profiles(username)")
        .or("title.ilike." + pattern + ",body.ilike." + pattern)
        .order("created_at", { ascending: false })
        .limit(8);
      if (!th.error && th.data) {
        th.data.forEach(t => {
          const who = (t.profiles && t.profiles.username) || "user";
          hits.push({
            kind: "thread",
            title: t.title || "(sin título)",
            meta: "Hilo · /" + (t.board_id || "?") + "/ · " + who,
            snippet: snippet(t.body, q),
            url: "forum.html?thread=" + encodeURIComponent(t.id),
            score: (t.title || "").toLowerCase().includes(q.toLowerCase()) ? 5 : 3
          });
        });
      }

      // Posts (replies)
      const po = await sb.from("forum_posts")
        .select("id, thread_id, body, created_at, profiles(username)")
        .ilike("body", pattern)
        .order("created_at", { ascending: false })
        .limit(8);
      if (!po.error && po.data) {
        po.data.forEach(p => {
          const who = (p.profiles && p.profiles.username) || "user";
          hits.push({
            kind: "post",
            title: "Respuesta de " + who,
            meta: "Post en foro",
            snippet: snippet(p.body, q),
            url: "forum.html?thread=" + encodeURIComponent(p.thread_id),
            score: 2
          });
        });
      }

      // Chat messages (optional)
      const ch = await sb.from("chat_messages")
        .select("id, room_id, username, body, created_at")
        .ilike("body", pattern)
        .order("created_at", { ascending: false })
        .limit(5);
      if (!ch.error && ch.data) {
        ch.data.forEach(m => {
          hits.push({
            kind: "chat",
            title: (m.username || "user") + " en #" + (m.room_id || "chat"),
            meta: "Chat",
            snippet: snippet(m.body, q),
            url: "chat.html",
            score: 1
          });
        });
      }
    } catch (e) {
      console.warn("searchContent", e);
      return [{ kind: "error", title: "Error de búsqueda", meta: String(e.message || e), snippet: "", url: "#", score: 0 }];
    }

    hits.sort((a, b) => b.score - a.score);
    return hits.slice(0, 15);
  }

  function renderSearchResults(hits) {
    const box = document.getElementById("ec-search-results");
    if (!box) return;
    if (!hits.length) {
      box.innerHTML = '<div class="ec-empty">Nada en hilos, posts o chat</div>';
      box.classList.add("open");
      return;
    }
    box.innerHTML = "";
    hits.forEach(h => {
      if (h.kind === "error") {
        const d = document.createElement("div");
        d.className = "ec-empty";
        d.textContent = h.title + ": " + h.meta;
        box.appendChild(d);
        return;
      }
      const a = document.createElement("a");
      a.href = h.url;
      const t = document.createElement("div");
      t.className = "ec-hit-title";
      t.textContent = h.title;
      const m = document.createElement("div");
      m.className = "ec-hit-meta";
      m.textContent = h.meta + (h.snippet ? " — " + h.snippet : "");
      a.appendChild(t);
      a.appendChild(m);
      box.appendChild(a);
    });
    box.classList.add("open");
  }

  function wireSearch() {
    const input = document.getElementById("ec-search-input");
    const box = document.getElementById("ec-search-results");
    if (!input || !box) return;
    let timer = null;
    let seq = 0;
    input.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        const q = input.value.trim();
        if (q.length < 2) {
          box.classList.remove("open");
          box.innerHTML = "";
          return;
        }
        const my = ++seq;
        box.innerHTML = '<div class="ec-empty">Buscando…</div>';
        box.classList.add("open");
        const hits = await searchContent(q);
        if (my !== seq) return;
        renderSearchResults(hits);
      }, 220);
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        box.classList.remove("open");
        input.blur();
      } else if (e.key === "Enter") {
        const first = box.querySelector("a");
        if (first) {
          e.preventDefault();
          location.href = first.getAttribute("href");
        }
      }
    });
    document.addEventListener("click", (e) => {
      if (!box.contains(e.target) && e.target !== input) {
        box.classList.remove("open");
      }
    });
  }

    function init() {
    injectStyle();
    buildChrome();
    wireSearch();
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
