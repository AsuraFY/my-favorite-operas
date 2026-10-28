// This is the only HTML entry point. A failed module import or startup now shows
// a visible recovery message instead of leaving #app empty.
import("./main.js?v=opera-catalog-art-20261027").catch(error => {
  console.error("The opera website could not start:", error);
  const app = document.querySelector("#app");
  if (!app) return;
  app.innerHTML = '<main id="main" class="not-found section-wrap"><h1>The website could not load.</h1><p>Please reload the page. If this continues, try again later.</p><button class="button button--dark" type="button" data-retry-load>Reload page</button></main>';
  app.querySelector("[data-retry-load]").addEventListener("click", () => window.location.reload());
});

