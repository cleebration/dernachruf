// Nach "vite build": je Nachruf eine eigene Seite dist/blog/<id>/index.html mit OG-/Twitter-Karten
// (damit geteilte Links ein Vorschaubild und den richtigen Titel zeigen) + sitemap.xml.
import fs from "fs";
import path from "path";
import { posts } from "../src/data.js";

const SITE = "https://dernachruf.com";
const DIST = path.resolve("dist");
const vorlage = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function seite({ titel, beschreibung, url, bild, inhalt }) {
  const meta = `
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="DerNachruf" />
    <meta property="og:title" content="${esc(titel)}" />
    <meta property="og:description" content="${esc(beschreibung)}" />
    <meta property="og:url" content="${url}" />
    ${bild ? `<meta property="og:image" content="${bild}" />` : ""}
    <meta name="twitter:card" content="${bild ? "summary_large_image" : "summary"}" />
    <meta name="twitter:title" content="${esc(titel)}" />
    <meta name="twitter:description" content="${esc(beschreibung)}" />`;
  return vorlage
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(titel)} – DerNachruf</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(beschreibung)}" />${meta}`)
    .replace('<div id="root"></div>', `<div id="root"></div><noscript>${inhalt}</noscript>`);
}

const bildPfad = fs.existsSync(path.join(DIST, "og")) ? (id) => (fs.existsSync(path.join(DIST, "og", `${id}.png`)) ? `${SITE}/og/${id}.png` : null) : () => null;

for (const p of posts) {
  const ordner = path.join(DIST, "blog", p.id);
  fs.mkdirSync(ordner, { recursive: true });
  const inhalt = `<article><h1>${esc(p.headline)}</h1><p>${esc(p.subline)}</p>${p.body.split("\n\n").map((t) => `<p>${esc(t)}</p>`).join("")}</article>`;
  fs.writeFileSync(path.join(ordner, "index.html"), seite({
    titel: p.headline, beschreibung: p.subline, url: `${SITE}/blog/${p.id}`, bild: bildPfad(p.id), inhalt,
  }));
}

const heute = new Date().toISOString().slice(0, 10);
const urls = [`${SITE}/`, ...posts.map((p) => `${SITE}/blog/${p.id}`)];
fs.writeFileSync(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${heute}</lastmod></url>`).join("\n")}
</urlset>
`);
console.log(`prerender: ${posts.length} Nachrufe + sitemap.xml`);
