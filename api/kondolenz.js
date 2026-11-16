// Kondolenzbuch: GET /api/kondolenz?id=<nachruf>  ·  POST {id, name, text, website(honeypot), t(ms seit Formularstart)}
import { put, list } from "@vercel/blob";
import { posts } from "../src/data.js";
import { hatSpeicher, json, leseKoerper, sauber, zufall, idOk } from "./_hilfe.js";

const VERBOTEN = /(https?:|www\.|\.(com|net|org|at|de|ru|io)\b|<|>)/i;
const GROB = /\b(arschloch|wichser|fotze|hurensohn|nazi|scheiss ?(ausl|jud))/i;

export default async function handler(req, res) {
  if (!hatSpeicher()) return json(res, 503, { fehler: "Das Kondolenzbuch wird gerade eingerichtet." });
  if (req.method === "GET") {
    const id = String(req.query?.id || "");
    if (!idOk(id)) return json(res, 400, { fehler: "id fehlt" });
    const { blobs } = await list({ prefix: `kondolenz/${id}/`, limit: 1000 });
    const neueste = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname)).slice(0, 60);
    const eintraege = (await Promise.all(neueste.map(async (b) => {
      try { const r = await fetch(b.url); return r.ok ? await r.json() : null; } catch { return null; }
    }))).filter(Boolean);
    return json(res, 200, { eintraege, anzahl: blobs.length }, "s-maxage=30, stale-while-revalidate=60");
  }
  if (req.method === "POST") {
    const k = await leseKoerper(req);
    if (k.website) return json(res, 200, { ok: true }); // Honigtopf: still ignorieren
    if (!idOk(k.id) || !posts.some((p) => p.id === k.id)) return json(res, 400, { fehler: "Unbekannter Nachruf." });
    if (!(Number(k.t) > 3000)) return json(res, 400, { fehler: "Bitte etwas mehr Zeit lassen." });
    const name = sauber(k.name, 40) || "Ein Trauergast";
    const text = sauber(k.text, 600);
    if (text.length < 5) return json(res, 400, { fehler: "Bitte ein paar Worte mehr." });
    if (VERBOTEN.test(text) || VERBOTEN.test(name)) return json(res, 400, { fehler: "Bitte ohne Links." });
    if (GROB.test(text) || GROB.test(name)) return json(res, 400, { fehler: "Bitte im Ton einer Trauerfeier." });
    const eintrag = { name, text, datum: new Date().toISOString() };
    const stempel = new Date().toISOString().replace(/[:.]/g, "-");
    await put(`kondolenz/${k.id}/${stempel}-${zufall()}.json`, JSON.stringify(eintrag), {
      access: "public", contentType: "application/json", addRandomSuffix: false,
    });
    return json(res, 200, { ok: true, eintrag });
  }
  return json(res, 405, { fehler: "Nur GET oder POST." });
}
