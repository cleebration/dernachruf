// Orakel: Besucher schätzen, wann es so weit ist. GET → Schwarm-Ergebnis je Frage · POST {jahre: {id: jahr}}
// Jede Stimme ist ein eigener Blob, das Jahr steckt im Dateinamen – Auszählen braucht nur list().
import { put, list } from "@vercel/blob";
import { ausloeser, NIE } from "../src/zukunft.js";
import { hatSpeicher, json, leseKoerper, zufall } from "./_hilfe.js";

export default async function handler(req, res) {
  if (!hatSpeicher()) return json(res, 503, { fehler: "Das Orakel wird gerade eingerichtet." });
  if (req.method === "GET") {
    const ergebnis = {};
    for (const a of ausloeser) {
      const jahre = [];
      let cursor;
      do {
        const r = await list({ prefix: `orakel/${a.id}/`, limit: 1000, cursor });
        for (const b of r.blobs) { const m = b.pathname.match(/\/(\d{4})-/); if (m) jahre.push(+m[1]); }
        cursor = r.hasMore ? r.cursor : undefined;
      } while (cursor);
      jahre.sort((x, y) => x - y);
      const nie = jahre.filter((j) => j >= NIE).length;
      const median = jahre.length ? jahre[Math.floor(jahre.length / 2)] : null;
      ergebnis[a.id] = { stimmen: jahre.length, median, nie };
    }
    return json(res, 200, ergebnis, "s-maxage=60, stale-while-revalidate=120");
  }
  if (req.method === "POST") {
    const k = await leseKoerper(req);
    if (k.website) return json(res, 200, { ok: true });
    const jahre = k.jahre || {};
    const stempel = Date.now();
    let n = 0;
    for (const a of ausloeser) {
      const j = Math.round(Number(jahre[a.id]));
      if (!Number.isFinite(j) || j < a.min || j > a.max) continue;
      await put(`orakel/${a.id}/${j}-${stempel}-${zufall()}.json`, "1", { access: "public", contentType: "application/json", addRandomSuffix: false });
      n++;
    }
    return json(res, 200, { ok: true, gezaehlt: n });
  }
  return json(res, 405, { fehler: "Nur GET oder POST." });
}
