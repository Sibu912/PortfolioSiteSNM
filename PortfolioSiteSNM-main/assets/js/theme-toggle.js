/**
 * Sci‑Fi Theme Toggle (global)
 * - toggles body.scifi-mode
 * - persists in localStorage key: snmTheme
 * - syncs across pages/iframes via storage event
 */
(function () {
  const THEME_KEY = "snmTheme";
  const btn = document.getElementById("modeToggle");

  const applyTheme = (theme) => {
    const isSciFi = theme === "scifi";
    // body is guaranteed when this runs after DOM is ready, but keep safe
    if (!document.body) return;
    document.body.classList.toggle("scifi-mode", isSciFi);
    if (btn) btn.classList.toggle("is-on", isSciFi);
  };

  const getSavedTheme = () => {
    try {
      return localStorage.getItem(THEME_KEY) || "default";
    } catch (e) {
      return "default";
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  };

  // Apply saved theme when DOM is ready
  const init = () => applyTheme(getSavedTheme());
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Toggle button (only exists on main pages)
  if (btn) {
    btn.addEventListener("click", () => {
      const next = (document.body && document.body.classList.contains("scifi-mode")) ? "default" : "scifi";
      applyTheme(next);
      saveTheme(next);
    });
  }

  // Sync theme changes across iframes / other pages in same browser session
  window.addEventListener("storage", (e) => {
    if (e && e.key === THEME_KEY) {
      applyTheme(e.newValue || "default");
    }
  });
})();
