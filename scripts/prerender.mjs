// ponytail: single-route SPA (no react-router), so this snapshots "/" once and
// overwrites dist/index.html with fully-rendered markup for non-JS crawlers.
// Upgrade to per-route snapshots if the app grows real client-side routing.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const dist = path.resolve("dist");
const port = 4173;

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".webm": "audio/webm",
  ".m4a": "audio/mp4",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  try {
    const urlPath = req.url === "/" ? "/index.html" : req.url;
    const filePath = path.join(dist, decodeURIComponent(urlPath.split("?")[0]));
    const body = await readFile(filePath);
    res.setHeader("Content-Type", mimeTypes[path.extname(filePath)] || "application/octet-stream");
    res.end(body);
  } catch {
    res.statusCode = 404;
    res.end();
  }
});

await new Promise((resolve) => server.listen(port, resolve));

const browser = await puppeteer.launch({ headless: "new" });
try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle0", timeout: 30000 });
  const html = await page.content();
  const { writeFile } = await import("node:fs/promises");
  await writeFile(path.join(dist, "index.html"), html);
  console.log("Prerendered dist/index.html");
} finally {
  await browser.close();
  server.close();
}
