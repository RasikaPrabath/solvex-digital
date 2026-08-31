/**
 * Suppress and clean up browser extension artifacts (e.g. Bitdefender TrafficLight injecting bis_skin_checked)
 * to prevent React hydration mismatch overlays in development mode.
 */
(function () {
  if (typeof window === "undefined") return;

  // 1. Intercept console.error to filter out extension-induced hydration warnings
  var origConsoleError = console.error;
  console.error = function () {
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      var str = typeof arg === "string" ? arg : (arg && arg.message) || "";
      if (
        str.indexOf("bis_skin_checked") !== -1 ||
        (str.indexOf("hydrated but some attributes") !== -1 && str.indexOf("bis_skin_checked") !== -1)
      ) {
        return;
      }
    }
    origConsoleError.apply(console, arguments);
  };

  // 2. Clean up any existing bis_skin_checked attributes from DOM
  function cleanExtensionAttrs() {
    try {
      var elements = document.querySelectorAll("[bis_skin_checked]");
      for (var i = 0; i < elements.length; i++) {
        elements[i].removeAttribute("bis_skin_checked");
      }
    } catch (e) {}
  }

  cleanExtensionAttrs();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanExtensionAttrs);
  }
})();
