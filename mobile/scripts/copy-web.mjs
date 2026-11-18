// Copies the web app from the repo root into mobile/www, minus web-only files.
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url)), root = join(here, "..", ".."), www = join(here, "..", "www");
rmSync(www, { recursive: true, force: true }); mkdirSync(www, { recursive: true });
for (const f of ["index.html", "favicon.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png"]) cpSync(join(root, f), join(www, f));
// Inside the native app: no service worker or web manifest, and absolute asset paths become relative.
let html = readFileSync(join(www, "index.html"), "utf8")
  .replace(/<link rel="manifest"[^>]*>\n?/, "")
  .replace(/href="\/(favicon|apple-touch-icon)\.png"/g, 'href="$1.png"')
  .replace(/<script>\s*if \("serviceWorker" in navigator[\s\S]*?<\/script>/, `<script>
window.TALLY_NATIVE = true;
// Native glue: Android back button walks back through the app instead of closing it.
document.addEventListener("DOMContentLoaded", () => {
  const C = window.Capacitor; if (!C || !C.Plugins) return;
  const { App, StatusBar, SplashScreen } = C.Plugins;
  try { StatusBar && StatusBar.setStyle({ style: "DARK" }); } catch (e) {}
  try { SplashScreen && SplashScreen.hide(); } catch (e) {}
  App && App.addListener("backButton", () => {
    const panel = document.querySelector(".npanel"); if (panel) { document.querySelector("[data-a=bell]")?.click(); return; }
    const back = document.querySelector("main button[data-a=nav][data-v]"); if (back) { back.click(); return; }
    const tabs = document.querySelectorAll(".mnav [data-v]"), cur = document.querySelector(".mnav [aria-current=page]");
    if (tabs.length && cur && cur !== tabs[0]) { tabs[0].click(); return; }
    App.exitApp();
  });
});
</script>`);
writeFileSync(join(www, "index.html"), html);
console.log("Copied web app into mobile/www");
