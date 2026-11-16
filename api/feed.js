// /feed.xml (über vercel.json) – RSS für RSS by Zapier → Buffer → X.
// Zwei Ströme:
//  1. Nachruf des Tages: die Nachrufe werden ab START_DATE nach und nach freigegeben (1 alle INTERVAL_DAYS Tage),
//     Kategorien abwechselnd. Neue Nachrufe hängen sich hinten an.
//  2. An diesem Tag: Gedenktage (src/gedenken.js) erscheinen an ihrem Kalendertag – jedes Jahr neu.
import { posts, categories } from "../src/data.js";
import { gedenktage, artText } from "../src/gedenken.js";
import { lebensdaten } from "../src/lebensdaten.js";

// START_DATE = Tag, ab dem der Drip läuft. Muss am oder nach dem Tag liegen, an dem der Zap eingeschaltet wird –
// RSS by Zapier meldet nur Einträge, die nach dem Einschalten neu erscheinen.
export const START_DATE = "2026-11-17";
export const INTERVAL_DAYS = 1;
const SITE = "https://dernachruf.com";
const TAG_MS = 86400000;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Wien-Datum (ohne Uhrzeit) als UTC-Mitternacht
function wienHeute(jetzt = new Date()) {
  const t = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Vienna", year: "numeric", month: "2-digit", day: "2-digit" }).format(jetzt);
  return new Date(t + "T00:00:00Z");
}

export function dripReihenfolge() {
  const proKat = categories.map((c) => posts.filter((p) => p.category === c.id));
  const reihe = [];
  for (let i = 0; reihe.length < posts.length; i++) {
    for (const liste of proKat) if (liste[i]) reihe.push(liste[i]);
    if (i > posts.length) break;
  }
  // Nachrufe ohne bekannte Kategorie nicht verlieren
  for (const p of posts) if (!reihe.includes(p)) reihe.push(p);
  return reihe;
}

export function feedEintraege(jetzt = new Date()) {
  const heute = wienHeute(jetzt);
  const start = new Date(START_DATE + "T00:00:00Z");
  const eintraege = [];

  if (heute >= start) {
    const tage = Math.floor((heute - start) / TAG_MS);
    const anzahl = Math.min(posts.length, Math.floor(tage / INTERVAL_DAYS) + 1);
    const reihe = dripReihenfolge();
    for (let i = 0; i < anzahl; i++) {
      const p = reihe[i];
      const datum = new Date(start.getTime() + i * INTERVAL_DAYS * TAG_MS + 7 * 3600000); // 08:00 Wien (Winter)
      eintraege.push({
        titel: p.headline, link: `${SITE}/blog/${p.id}`, guid: `nachruf-${p.id}`, datum,
        text: p.subline, kategorie: p.categoryLabel,
      });
    }
  }

  // Gedenktage der letzten 14 Tage (ab START_DATE)
  for (let d = 0; d < 14; d++) {
    const tag = new Date(heute.getTime() - d * TAG_MS);
    if (tag < start) break;
    for (const g of gedenktage) {
      if (g.tag !== tag.getUTCDate() || g.monat !== tag.getUTCMonth() + 1) continue;
      const jahre = tag.getUTCFullYear() - g.jahr;
      const name = g.name || lebensdaten[g.id]?.name || g.id;
      const hatPost = posts.some((p) => p.id === g.id);
      eintraege.push({
        titel: `Heute vor ${jahre} Jahren: ${name} – ${g.text}`,
        link: hatPost ? `${SITE}/blog/${g.id}` : `${SITE}/#zeitstrahl&kalender`,
        guid: `gedenktag-${g.id}-${g.art}-${g.jahr}-${tag.getUTCFullYear()}`,
        datum: new Date(tag.getTime() + 6 * 3600000), // 07:00 Wien
        text: `${artText(g.art)} · ${g.tag}.${g.monat}.${g.jahr}`, kategorie: "An diesem Tag",
      });
    }
  }
  return eintraege.sort((a, b) => b.datum - a.datum);
}

export default function handler(req, res) {
  const items = feedEintraege().map((e) => `
    <item>
      <title>${esc(e.titel)}</title>
      <link>${esc(e.link)}</link>
      <guid isPermaLink="false">${esc(e.guid)}</guid>
      <pubDate>${e.datum.toUTCString()}</pubDate>
      <category>${esc(e.kategorie)}</category>
      <description>${esc(e.text)}</description>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DerNachruf – Ein Archiv der verschwundenen Dinge</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Nachrufe auf Dinge, die ohne Abschied gingen – und was an diesem Tag verschwand.</description>
    <language>de-AT</language>${items}
  </channel>
</rss>`;
  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=600");
  res.status(200).send(xml);
}
