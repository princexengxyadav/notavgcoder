// This file is loaded in the <head> so the theme is set BEFORE the page is drawn.
// That prevents a white flash when someone has chosen dark mode.

(function () {
  var saved = null;

  // localStorage can be blocked in some browsers, so we wrap it in try/catch.
  try {
    saved = localStorage.getItem("sd-theme");
  } catch (error) {
    saved = null;
  }

  // If the visitor never chose a theme, follow their device setting.
  var prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  var theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();
