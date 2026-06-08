import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");
const port = 3456;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

const targets = [
  {
    html: "/NguyenVanQuangHung_CV.html",
    pdf: path.join(publicDir, "Hung-Nguyen-CV-English.pdf"),
  },
  {
    html: "/NguyenVanQuangHung_CV_VI.html",
    pdf: path.join(publicDir, "Hung-Nguyen-CV-Tieng-Viet.pdf"),
  },
];

function createStaticServer() {
  return http.createServer((req, res) => {
    try {
      const url = new URL(req.url ?? "/", `http://localhost:${port}`);
      const safePath = decodeURIComponent(url.pathname).replace(/(\.\.[/\\])+/, "");
      const filePath = path.join(publicDir, safePath);

      if (!filePath.startsWith(publicDir)) {
        res.writeHead(403).end();
        return;
      }

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404).end();
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    } catch {
      res.writeHead(500).end();
    }
  });
}

async function generatePdf(browser, htmlPath, outputPath) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}${htmlPath}`, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  await page.emulateMediaType("print");
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await page.close();
}

const server = createStaticServer();

await new Promise((resolve, reject) => {
  server.listen(port, resolve);
  server.on("error", reject);
});

let browser;
try {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const target of targets) {
    await generatePdf(browser, target.html, target.pdf);
    console.log(`✓ ${path.basename(target.pdf)}`);
  }
} finally {
  if (browser) await browser.close();
  server.close();
}
