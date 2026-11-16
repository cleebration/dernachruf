// Parte (österreichische Todesanzeige) als Bild – 1080 x 1350, zum Teilen und Herunterladen.
import { lebensdaten } from "./lebensdaten.js";
import { kanten, knoten } from "./abhaengigkeiten.js";

const B = 1080, H = 1350;

const nameVon = (id) => lebensdaten[id]?.name || knoten[id]?.name || id;

function umbrechen(ctx, text, breite) {
  const woerter = text.split(" ");
  const zeilen = [];
  let z = "";
  for (const w of woerter) {
    const probe = z ? z + " " + w : w;
    if (ctx.measureText(probe).width > breite && z) { zeilen.push(z); z = w; } else z = probe;
  }
  if (z) zeilen.push(z);
  return zeilen;
}

export async function zeichneParte(id) {
  const d = lebensdaten[id];
  if (!d) throw new Error("Keine Lebensdaten für " + id);
  try {
    await Promise.all([
      document.fonts.load("72px 'UnifrakturMaguntia'"),
      document.fonts.load("italic 36px 'IM Fell English'"),
      document.fonts.load("36px 'IM Fell English'"),
    ]);
  } catch { /* Ersatzschrift */ }

  const c = document.createElement("canvas");
  c.width = B; c.height = H;
  const ctx = c.getContext("2d");
  const fraktur = "'UnifrakturMaguntia', 'Old English Text MT', serif";
  const fell = "'IM Fell English', Georgia, serif";

  // Papier und Trauerrand
  ctx.fillStyle = "#fbf7ee"; ctx.fillRect(0, 0, B, H);
  ctx.fillStyle = "#14100b";
  ctx.fillRect(40, 40, B - 80, 26); ctx.fillRect(40, H - 66, B - 80, 26);
  ctx.fillRect(40, 40, 26, H - 80); ctx.fillRect(B - 66, 40, 26, H - 80);
  ctx.strokeStyle = "#14100b"; ctx.lineWidth = 2; ctx.strokeRect(84, 84, B - 168, H - 168);

  ctx.textAlign = "center"; ctx.fillStyle = "#14100b";
  let y = 200;
  ctx.font = `110px ${fell}`; ctx.fillText("†", B / 2, y); y += 90;

  const auf = d.status === "auferstanden";
  const lebt = !d.gestorben;
  ctx.font = `italic 38px ${fell}`;
  ctx.fillText(auf ? "Totgesagte leben länger." : lebt ? "In banger Sorge geben wir bekannt," : "In stiller Trauer geben wir bekannt,", B / 2, y); y += 50;
  ctx.fillText(auf ? "Wir geben freudig bekannt, dass" : lebt ? "dass unser liebes, altes" : "dass uns unser liebes, altes", B / 2, y); y += 120;

  // Name in Fraktur, ggf. verkleinern
  let gr = 100;
  ctx.font = `${gr}px ${fraktur}`;
  while (ctx.measureText(d.name).width > B - 240 && gr > 48) { gr -= 4; ctx.font = `${gr}px ${fraktur}`; }
  ctx.fillText(d.name, B / 2, y); y += 80;

  ctx.font = `40px ${fell}`;
  const lebenszeit = `* um ${d.geboren}   ·   ${d.gestorben ? "† " + d.gestorben : "† ?"}`;
  ctx.fillText(lebenszeit, B / 2, y); y += 70;

  ctx.font = `italic 36px ${fell}`;
  const jahre = (d.gestorben || new Date().getFullYear()) - (d.siechtumAb || d.bluete[1]);
  const satz = auf
    ? `nach ${d.auferstanden - d.gestorben === 1 ? "einem Jahr" : (d.auferstanden - d.gestorben) + " Jahren"} im Grab im Jahr ${d.auferstanden} wieder auferstanden ist.`
    : lebt
      ? `seit ${new Date().getFullYear() - (d.siechtumAb || d.bluete[1])} Jahren schwer krank darniederliegt.`
      : `nach ${jahre > 15 ? "langem, mit Geduld ertragenem Siechtum" : "kurzer, schwerer Krankheit"} für immer von uns gegangen ist.`;
  for (const z of umbrechen(ctx, satz, B - 260)) { ctx.fillText(z, B / 2, y); y += 48; }
  y += 30;

  // Notiz
  ctx.font = `34px ${fell}`; ctx.fillStyle = "#3a2a18";
  for (const z of umbrechen(ctx, d.notiz, B - 300)) { ctx.fillText(z, B / 2, y); y += 46; }
  y += 40;

  // Hinterbliebene / Erben
  const verdraenger = kanten.filter(([, z, a]) => z === id && a === "verdraengt").map(([v]) => nameVon(v));
  const hinterbliebene = kanten.filter(([v]) => v === id).map(([, z]) => nameVon(z));
  ctx.fillStyle = "#14100b";
  ctx.strokeStyle = "#8a6a3a"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(B / 2 - 160, y - 20); ctx.lineTo(B / 2 + 160, y - 20); ctx.stroke();
  y += 30;
  if (hinterbliebene.length) {
    ctx.font = `italic 30px ${fell}`; ctx.fillText("In tiefer Trauer folgen ihm nach:", B / 2, y); y += 44;
    ctx.font = `34px ${fell}`;
    for (const z of umbrechen(ctx, hinterbliebene.join(" · "), B - 300)) { ctx.fillText(z, B / 2, y); y += 44; }
    y += 14;
  }
  if (verdraenger.length) {
    ctx.font = `italic 30px ${fell}`; ctx.fillText(auf ? "Damals beerbt von:" : "Es erbt:", B / 2, y); y += 44;
    ctx.font = `34px ${fell}`;
    for (const z of umbrechen(ctx, verdraenger.join(" · "), B - 300)) { ctx.fillText(z, B / 2, y); y += 44; }
  }

  // Fuß
  ctx.font = `64px ${fraktur}`; ctx.fillStyle = "#14100b";
  ctx.fillText("DerNachruf", B / 2, H - 150);
  ctx.font = `italic 28px ${fell}`; ctx.fillStyle = "#5a4a2a";
  ctx.fillText("dernachruf.com · Ein Archiv der verschwundenen Dinge", B / 2, H - 108);
  return c;
}

export async function teileParte(id) {
  const c = await zeichneParte(id);
  const blob = await new Promise((r) => c.toBlob(r, "image/png"));
  const datei = `Parte-${id}.png`;
  try {
    const file = new File([blob], datei, { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: `Parte: ${nameVon(id)}`, text: "DerNachruf – dernachruf.com" });
      return "geteilt";
    }
  } catch (e) { if (e && e.name === "AbortError") return "abgebrochen"; }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = datei; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  return "geladen";
}
