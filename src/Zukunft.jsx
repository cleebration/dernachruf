import { useMemo, useState } from "react";
import { ausloeser, kranke, rechne, NIE } from "./zukunft.js";

const JETZT = new Date().getFullYear();
const ACHSE_VON = JETZT;
const ACHSE_BIS = 2080;

const STUFE = {
  sterbend: { text: "liegt im Sterben", farbe: "#8a2a1a" },
  krank: { text: "krank", farbe: "#a8742a" },
  vorahnung: { text: "Vorahnung", farbe: "#5a6a7a" },
};

const CSS = `
  .zk-intro { max-width: 680px; margin: 0 auto 24px; text-align: center; font-family: 'IM Fell English', serif; font-style: italic; color: #5a4a2a; font-size: 15px; line-height: 1.6; }
  .zk-regler { max-width: 820px; margin: 0 auto 28px; background: #2a1f14; border: 1px solid #c8a97e; padding: 18px 22px 10px; color: #e8dcc8; font-family: 'IM Fell English', serif; }
  .zk-regler-kopf { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 10px; margin-bottom: 8px; }
  .zk-regler-titel { font-family: 'UnifrakturMaguntia', serif; color: #c8a97e; font-size: 24px; }
  .zk-knopf { background: none; border: 1px solid #c8a97e; color: #c8a97e; padding: 5px 12px; font-family: 'IM Fell English', serif; font-size: 13px; cursor: pointer; margin-left: 6px; }
  .zk-knopf:hover { background: #c8a97e; color: #2a1f14; }
  .zk-ein { padding: 12px 0; border-top: 1px dotted #5a4a2a; }
  .zk-ein:first-of-type { border-top: none; }
  .zk-ein-kopf { display: flex; justify-content: space-between; gap: 10px; align-items: baseline; }
  .zk-ein-name { font-size: 17px; }
  .zk-ein-jahr { font-family: 'Playfair Display', serif; color: #c8a97e; font-size: 20px; font-weight: 700; min-width: 64px; text-align: right; }
  .zk-ein-frage { font-size: 13px; color: #a89878; font-style: italic; margin: 2px 0 6px; }
  .zk-ein input[type=range] { width: 100%; accent-color: #c8a97e; }
  .zk-ein details { font-size: 12px; color: #a89878; margin-top: 2px; }
  .zk-ein summary { cursor: pointer; }
  .zk-ein details a { color: #c8a97e; }

  .zk-liste { max-width: 900px; margin: 0 auto; background: #f7f1e4; border: 1px solid #c8b89a; padding: 8px 16px 14px; }
  .zk-achse { display: grid; grid-template-columns: 64px 1fr; border-bottom: 1px solid #c8b89a; padding: 6px 0 4px; font-family: 'IM Fell English', serif; font-size: 11px; color: #7a6a4a; }
  .zk-achse-spur { position: relative; height: 16px; }
  .zk-tick { position: absolute; transform: translateX(-50%); }
  .zk-zeile { display: grid; grid-template-columns: 64px 1fr; gap: 0; padding: 8px 0; border-bottom: 1px dotted #e0d4bc; font-family: 'IM Fell English', serif; }
  .zk-jahr { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #2a1a10; padding-top: 1px; }
  .zk-jahr.nie { font-size: 12px; font-weight: normal; font-style: italic; color: #3a6a2a; }
  .zk-name { font-size: 16px; color: #1a0f08; }
  .zk-stufe { display: inline-block; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: #fff; padding: 1px 6px; margin-left: 8px; vertical-align: 2px; }
  .zk-notiz { font-size: 13px; color: #5a4a2a; font-style: italic; margin-top: 2px; line-height: 1.45; }
  .zk-an { font-size: 12px; color: #8a7a5a; margin-top: 2px; }
  .zk-spur { position: relative; height: 8px; margin-top: 6px; background: repeating-linear-gradient(90deg, #ece2cf 0 1px, transparent 1px 10%); }
  .zk-balken { position: absolute; top: 0; height: 8px; }
  .zk-kreuz { position: absolute; top: -5px; transform: translateX(-50%); font-size: 12px; color: #2a1a10; }
  .zk-hinweis { max-width: 760px; margin: 20px auto 0; font-family: 'IM Fell English', serif; font-size: 12px; color: #7a6a4a; line-height: 1.6; text-align: center; }
  @media (max-width: 640px) { .zk-regler { padding: 14px 14px 6px; } .zk-liste { padding: 6px 10px 10px; } .zk-achse, .zk-zeile { grid-template-columns: 52px 1fr; } }
`;

const standard = () => Object.fromEntries(ausloeser.map((a) => [a.id, a.standard]));

function leseSzenario() {
  const s = standard();
  try {
    const m = window.location.hash.match(/zukunft=([\w.\-]+)/);
    if (m) for (const teil of m[1].split("-")) {
      const [id, j] = teil.split(".");
      const a = ausloeser.find((x) => x.id === id);
      if (a && /^\d{4}$/.test(j)) s[id] = Math.min(a.max, Math.max(a.min, +j));
    }
  } catch { /* Standard nehmen */ }
  return s;
}

const kodiere = (jahre) => ausloeser.map((a) => `${a.id}.${jahre[a.id]}`).join("-");
const x = (j) => `${((Math.min(Math.max(j, ACHSE_VON), ACHSE_BIS) - ACHSE_VON) / (ACHSE_BIS - ACHSE_VON)) * 100}%`;

export default function Zukunft() {
  const [jahre, setJahre] = useState(leseSzenario);
  const [kopiert, setKopiert] = useState(false);
  const { tod, welcher } = useMemo(() => rechne(jahre), [jahre]);

  const liste = useMemo(() => [...kranke].sort((a, b) => tod[a.id] - tod[b.id] || a.name.localeCompare(b.name)), [tod]);
  const nameVon = (id) => ausloeser.find((a) => a.id === id)?.name || kranke.find((k) => k.id === id)?.name || id;

  const setze = (id, wert) => {
    const neu = { ...jahre, [id]: wert };
    setJahre(neu);
    try { window.history.replaceState(null, "", `#zeitstrahl&zukunft=${kodiere(neu)}`); } catch { /* egal */ }
  };
  const zuruecksetzen = () => {
    setJahre(standard());
    try { window.history.replaceState(null, "", "#zeitstrahl&zukunft"); } catch { /* egal */ }
  };
  const teilen = () => {
    try {
      navigator.clipboard.writeText(`${window.location.origin}/#zeitstrahl&zukunft=${kodiere(jahre)}`)
        .then(() => { setKopiert(true); setTimeout(() => setKopiert(false), 2500); });
    } catch { /* ohne Zwischenablage nichts tun */ }
  };

  const ticks = [];
  for (let j = Math.ceil(ACHSE_VON / 10) * 10; j <= ACHSE_BIS; j += 10) ticks.push(j);
  const ueberleben = liste.filter((k) => tod[k.id] >= NIE).length;

  return (
    <div>
      <style>{CSS}</style>
      <div className="zk-intro">
        Auf der Palliativstation liegen die Dinge, die noch leben – aber nicht mehr lange. Wann sie gehen,
        hängt davon ab, was zuerst kommt. Stell die Regler, und sieh zu, wie sich die Sterbeliste neu ordnet.
      </div>

      <div className="zk-regler">
        <div className="zk-regler-kopf">
          <div className="zk-regler-titel">Was kommt wann?</div>
          <div>
            <button className="zk-knopf" onClick={zuruecksetzen}>Zurücksetzen</button>
            <button className="zk-knopf" onClick={teilen}>{kopiert ? "Link kopiert ✓" : "Mein Szenario teilen"}</button>
          </div>
        </div>
        {ausloeser.map((a) => (
          <div key={a.id} className="zk-ein">
            <div className="zk-ein-kopf">
              <span className="zk-ein-name">{a.name}</span>
              <span className="zk-ein-jahr">{jahre[a.id] >= NIE ? "nie" : jahre[a.id]}</span>
            </div>
            <div className="zk-ein-frage">{a.frage}</div>
            <input type="range" min={a.min} max={a.max} step={1} value={jahre[a.id]}
              aria-label={a.name} onChange={(e) => setze(a.id, +e.target.value)} />
            <details>
              <summary>Was man heute weiß</summary>
              {a.stand}{a.quelle && <> – <a href={a.quelle.url} target="_blank" rel="noopener noreferrer">{a.quelle.titel}</a></>}
            </details>
          </div>
        ))}
      </div>

      <div className="section-title" style={{ fontSize: "clamp(22px,4vw,30px)" }}>Die Sterbeliste</div>
      <div className="section-sub">
        In diesem Szenario {ueberleben === 0 ? "überlebt keiner." : `überleben ${ueberleben} bis 2100.`}
      </div>

      <div className="zk-liste">
        <div className="zk-achse">
          <div />
          <div className="zk-achse-spur">{ticks.map((t) => <span key={t} className="zk-tick" style={{ left: x(t) }}>{t}</span>)}</div>
        </div>
        {liste.map((k) => {
          const j = tod[k.id];
          const nie = j >= NIE;
          const st = STUFE[k.stufe];
          const w = welcher[k.id];
          let notiz = k.notiz;
          if (k.notizWenn) notiz = w === k.notizWenn.frueher ? k.notizWenn.text : (k.notizWenn.sonst || k.notiz);
          const bisJahr = k.tod ? k.tod[1] : j;
          return (
            <div key={k.id} className="zk-zeile">
              <div className={`zk-jahr ${nie ? "nie" : ""}`}>{nie ? "überlebt" : j <= JETZT ? "bald" : `† ${j}`}</div>
              <div>
                <span className="zk-name">{k.name}</span>
                <span className="zk-stufe" style={{ background: st.farbe }}>{st.text}</span>
                <div className="zk-notiz">{notiz}</div>
                {w && <div className="zk-an">stirbt an: {nameVon(w)}</div>}
                {k.tod && <div className="zk-an">geschätzt {k.tod[0]}–{k.tod[1]}</div>}
                <div className="zk-spur">
                  <span className="zk-balken" style={{ left: 0, width: x(nie ? ACHSE_BIS : j), background: `linear-gradient(90deg, ${st.farbe}cc, ${st.farbe}22)` }} />
                  {k.tod && <span className="zk-balken" style={{ left: x(k.tod[0]), width: `calc(${x(bisJahr)} - ${x(k.tod[0])})`, background: `${st.farbe}55`, borderLeft: `1px dashed ${st.farbe}` }} />}
                  {!nie && <span className="zk-kreuz" style={{ left: x(j) }}>†</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="zk-hinweis">
        Alles auf dieser Seite ist Spekulation von DerNachruf – keine Vorhersage mit Gewähr. Die Voreinstellungen sind unsere Einschätzung,
        die Angaben unter „Was man heute weiß" haben wir am 16.11.2026 recherchiert. Andere Meinung?{" "}
        <a href="mailto:media@cleebration.com" style={{ color: "#8a6a3a" }}>media@cleebration.com</a>
      </div>
    </div>
  );
}
