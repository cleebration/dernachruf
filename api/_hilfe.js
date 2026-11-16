// Gemeinsame Helfer für Orakel und Kondolenzbuch (Vercel Blob).
export const hatSpeicher = () => !!process.env.BLOB_READ_WRITE_TOKEN;

export function json(res, status, daten, cache) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (cache) res.setHeader("Cache-Control", cache);
  res.status(status).send(JSON.stringify(daten));
}

export async function leseKoerper(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch { return {}; } }
  const teile = [];
  for await (const t of req) teile.push(t);
  try { return JSON.parse(Buffer.concat(teile).toString("utf8") || "{}"); } catch { return {}; }
}

export const sauber = (s, max) => String(s || "").replace(/[\u0000-\u001f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
export const zufall = () => Math.random().toString(36).slice(2, 8);
export const idOk = (id) => /^[a-z0-9äöüß-]{2,60}$/i.test(String(id || ""));
