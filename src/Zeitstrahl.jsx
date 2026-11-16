import { useMemo, useState } from "react";
import { categories, posts } from "./data.js";
import { lebensdaten, STATUS_TEXT, BELEG_TEXT } from "./lebensdaten.js";
import Erbfolge from "./Erbfolge.jsx";
import Zukunft from "./Zukunft.jsx";
import { kanten } from "./abhaengigkeiten.js";

const JETZT = new Date().getFullYear();
const ENDE = JETZT + 5;

const CSS = `
  .zs-intro { max-width: 680px; margin: 0 auto 26px; text-align: center; font-family: 'IM Fell English', serif; font-style: italic; color: #5a4a2a; font-size: 15px; line-height: 1.6; }
  .zs-leben { max-width: 760px; margin: 0 auto 28px; background: #2a1f14; border: 1px solid #c8a97e; padding: 20px 22px; color: #e8dcc8; font-family: 'IM Fell English', serif; }
  .zs-leben-kopf { font-family: 'UnifrakturMaguntia', serif; color: #c8a97e; font-size: 24px; margin-bottom: 10px; text-align: center; }
  .zs-leben-form { display: flex; gap: 10px; justify-content: center; align-items: center; flex-wrap: wrap; font-size: 15px; }
  .zs-leben-form input { width: 96px; padding: 6px 10px; font-size: 17px; font-family: 'IM Fell English', serif; background: #f0e8d8; color: #1a0f08; border: 1px solid #c8a97e; text-align: center; }
  .zs-leben-zahl { text-align: center; margin-top: 16px; font-size: 18px; line-height: 1.5; }
  .zs-leben-zahl b { font-family: 'Playfair Display', serif; color: #c8a97e; font-size: 30px; font-weight: 700; }
  .zs-leben-liste { margin-top: 10px; text-align: center; font-size: 14px; color: #c8b89a; font-style: italic; line-height: 1.6; }
  .zs-leben-teilen { display: block; margin: 14px auto 0; background: none; border: 1px solid #c8a97e; color: #c8a97e; padding: 6px 14px; font-family: 'IM Fell English', serif; font-size: 13px; letter-spacing: 1px; cursor: pointer; }
  .zs-leben-teilen:hover { background: #c8a97e; color: #2a1f14; }

  .zs-steuer { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 14px; }
  .zs-steuer-label { font-family: 'IM Fell English', serif; font-size: 12px; color: #7a6a4a; letter-spacing: 2px; text-transform: uppercase; align-self: center; margin-right: 4px; }

  .zs-legende { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; font-family: 'IM Fell English', serif; font-size: 12px; color: #5a4a2a; margin: 6px 0 18px; }
  .zs-legende span { display: inline-flex; align-items: center; gap: 6px; }
  .zs-mini { display: inline-block; width: 26px; height: 9px; border: 1px solid #3a2a18; }

  .zs-tafel { max-width: 1000px; margin: 0 auto; background: #f7f1e4; border: 1px solid #c8b89a; padding: 8px 14px 14px; }
  .zs-achse { position: sticky; top: 0; z-index: 3; background: #f7f1e4; display: grid; grid-template-columns: var(--zs-label) 1fr; border-bottom: 1px solid #c8b89a; padding: 6px 0 4px; }
  .zs-achse-spur { position: relative; height: 18px; }
  .zs-tick { position: absolute; top: 0; transform: translateX(-50%); font-family: 'IM Fell English', serif; font-size: 11px; color: #7a6a4a; }

  .zs-zeile { display: grid; grid-template-columns: var(--zs-label) 1fr; align-items: center; min-height: 26px; cursor: pointer; border-bottom: 1px dotted #e0d4bc; }
  .zs-zeile:hover { background: #efe5d2; }
  .zs-name { font-family: 'IM Fell English', serif; font-size: 13px; color: #2a1a10; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 8px; }
  .zs-name .zs-kreuz { color: #8a6a3a; margin-right: 4px; }
  .zs-spur { position: relative; height: 26px; }
  .zs-gitter { position: absolute; top: 0; bottom: 0; width: 1px; background: #ece2cf; }
  .zs-heute { position: absolute; top: 0; bottom: 0; width: 0; border-left: 1px dashed #8a2a1a; z-index: 1; }
  .zs-leben-band { position: absolute; top: 0; bottom: 0; background: rgba(200,169,126,0.22); border-left: 1px solid #c8a97e; z-index: 0; }
  .zs-seg { position: absolute; top: 9px; height: 9px; z-index: 2; }
  .zs-seg.geburt { opacity: 0.35; height: 3px; top: 12px; }
  .zs-seg.bluete { border: 1px solid #3a2a18; }
  .zs-seg.offen { border-right: none; }
  .zs-tod { position: absolute; top: 4px; transform: translateX(-50%); font-size: 13px; color: #2a1a10; z-index: 2; line-height: 1; }
  .zs-auf { position: absolute; top: 3px; transform: translateX(-50%); font-size: 12px; color: #3a6a2a; z-index: 2; }
  .zs-geschaetzt .zs-seg.bluete { border-style: dashed; }
  .zs-jahr { position: absolute; top: 4px; font-family: 'IM Fell English', serif; font-size: 11px; color: #5a4a2a; z-index: 2; white-space: nowrap; }

  .zs-schein { grid-column: 1 / -1; margin: 6px 0 12px; background: #2a1f14; color: #e8dcc8; padding: 16px 18px; font-family: 'IM Fell English', serif; border: 1px solid #c8a97e; cursor: default; }
  .zs-schein-titel { font-family: 'UnifrakturMaguntia', serif; color: #c8a97e; font-size: 20px; margin-bottom: 8px; }
  .zs-schein-daten { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 6px 16px; font-size: 14px; margin-bottom: 10px; }
  .zs-schein-daten div span { display: block; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #8a7a5a; }
  .zs-schein-notiz { font-style: italic; font-size: 15px; line-height: 1.5; margin-bottom: 10px; }
  .zs-schein-fuss { display: flex; flex-wrap: wrap; gap: 10px 18px; align-items: center; font-size: 12px; color: #a89878; }
  .zs-schein-fuss a { color: #c8a97e; }
  .zs-lesen { background: #c8a97e; color: #2a1f14; border: none; padding: 6px 14px; font-family: 'IM Fell English', serif; font-size: 14px; cursor: pointer; }
  .zs-hinweis { max-width: 760px; margin: 22px auto 0; font-family: 'IM Fell English', serif; font-size: 12px; color: #7a6a4a; line-height: 1.6; text-align: center; }

  .zs-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 0; margin: 0 auto 26px; }
  .zs-tabs button { font-family: 'IM Fell English', serif; font-size: 15px; letter-spacing: 1px; padding: 8px 18px; background: #e8dcc8; border: 1px solid #c8b89a; color: #3a2a18; cursor: pointer; }
  .zs-tabs button.aktiv { background: #2a1f14; color: #f0e8d8; border-color: #c8a97e; }
  .zs-wrap { --zs-label: 190px; }
  @media (max-width: 640px) {
    .zs-wrap { --zs-label: 0px; }
    .zs-tafel { padding: 6px 8px 10px; }
    .zs-zeile { grid-template-columns: 1fr; padding-top: 4px; }
    .zs-name { font-size: 12px; padding: 0; }
    .zs-achse { grid-template-columns: 1fr; }
    .zs-jahr { display: none; }
  }
`;

const nameVon = (p) => lebensdaten[p.id]?.name || p.headline.split(":")[0].trim();

function leseGeburtsjahr() {
  try {
    const m = window.location.hash.match(/geboren=(\d{4})/);
    return m ? m[1] : "";
  } catch { return ""; }
}

function leseDomino() {
  try {
    const m = window.location.hash.match(/domino=([\w-]+)/);
    return m ? m[1] : null;
  } catch { return null; }
}

export default function Zeitstrahl({ onOpen, dominoStart }) {
  const startDomino = dominoStart || leseDomino();
  const [ansicht, setAnsicht] = useState(() => {
    if (startDomino) return "erbfolge";
    try { if (window.location.hash.includes("zukunft")) return "zukunft"; } catch { /* egal */ }
    return "balken";
  });
  const [domino, setDomino] = useState(startDomino);
  const [von, setVon] = useState(1900);
  const [sortierung, setSortierung] = useState("tod");
  const [kat, setKat] = useState("alle");
  const [offen, setOffen] = useState(null);
  const [geburt, setGeburt] = useState(leseGeburtsjahr);
  const [kopiert, setKopiert] = useState(false);

  const gJahr = /^\d{4}$/.test(geburt) && +geburt >= 1900 && +geburt <= JETZT ? +geburt : null;

  const eintraege = useMemo(() => posts
    .map((p) => ({ post: p, d: lebensdaten[p.id], cat: categories.find((c) => c.id === p.category) }))
    .filter((e) => e.d), []);

  const sichtbar = useMemo(() => {
    const liste = eintraege.filter((e) => kat === "alle" || e.post.category === kat);
    const todJahr = (e) => e.d.gestorben ?? 9999;
    const s = {
      tod: (a, b) => todJahr(a) - todJahr(b) || a.d.bluete[1] - b.d.bluete[1],
      geburt: (a, b) => a.d.geboren - b.d.geboren,
      bluete: (a, b) => a.d.bluete[0] - b.d.bluete[0],
    }[sortierung];
    return [...liste].sort(s);
  }, [eintraege, kat, sortierung]);

  const lebenInfo = useMemo(() => {
    if (!gJahr) return null;
    const miterlebt = eintraege.filter((e) => e.d.gestorben && e.d.gestorben >= gJahr && e.d.gestorben <= JETZT);
    const nochDa = eintraege
      .filter((e) => e.d.geboren <= gJahr && (e.d.gestorben ?? 9999) > gJahr && e.d.bluete[1] >= gJahr)
      .sort((a, b) => (a.d.gestorben ?? 9999) - (b.d.gestorben ?? 9999));
    const vorher = eintraege.filter((e) => e.d.gestorben && e.d.gestorben < gJahr);
    return { miterlebt, nochDa, vorher };
  }, [gJahr, eintraege]);

  const x = (jahr) => `${((Math.max(jahr, von) - von) / (ENDE - von)) * 100}%`;
  const breite = (a, b) => `${Math.max(0, ((Math.min(b, ENDE) - Math.max(a, von)) / (ENDE - von)) * 100)}%`;
  const ticks = [];
  for (let j = Math.ceil(von / 25) * 25; j <= ENDE; j += 25) ticks.push(j);

  const wechsle = (a) => {
    setAnsicht(a);
    try { window.history.replaceState(null, "", a === "erbfolge" ? "#zeitstrahl&domino=" + (domino || "auto") : a === "zukunft" ? "#zeitstrahl&zukunft" : "#zeitstrahl"); } catch { /* egal */ }
  };
  const zeigeDomino = (id) => {
    let w = id; const seen = new Set();
    while (!seen.has(w)) { seen.add(w); const e = kanten.find(([, z]) => z === w); if (!e) break; w = e[0]; }
    setDomino(w); setAnsicht("erbfolge"); window.scrollTo(0, 0);
    try { window.history.replaceState(null, "", "#zeitstrahl&domino=" + w); } catch { /* egal */ }
  };

  const teilen = () => {
    try {
      const url = `${window.location.origin}/#zeitstrahl&geboren=${gJahr}`;
      navigator.clipboard.writeText(url).then(() => { setKopiert(true); setTimeout(() => setKopiert(false), 2500); });
    } catch { /* ohne Zwischenablage nichts tun */ }
  };

  const setzeGeburt = (v) => {
    setGeburt(v);
    try {
      const ok = /^\d{4}$/.test(v);
      window.history.replaceState(null, "", ok ? `#zeitstrahl&geboren=${v}` : "#zeitstrahl");
    } catch { /* egal */ }
  };

  return (
    <div className="zs-wrap">
      <style>{CSS}</style>
      <div className="zs-tabs">
        <button className={ansicht === "balken" ? "aktiv" : ""} onClick={() => wechsle("balken")}>Lebensbalken</button>
        <button className={ansicht === "erbfolge" ? "aktiv" : ""} onClick={() => wechsle("erbfolge")}>Erbfolge & Domino</button>
        <button className={ansicht === "zukunft" ? "aktiv" : ""} onClick={() => wechsle("zukunft")}>Zukunft</button>
      </div>
      {ansicht === "zukunft" ? (
        <>
          <div className="section-title">Die Palliativstation</div>
          <div className="section-sub">Wer als Nächstes geht – und warum</div>
          <Zukunft />
        </>
      ) : ansicht === "erbfolge" ? (
        <>
          <div className="section-title">Die Erbfolge</div>
          <div className="section-sub">Wer wen verdrängte – und wer mit ins Grab ging</div>
          <Erbfolge key={domino || "e"} onOpen={onOpen} start={domino} />
        </>
      ) : (<>
      <div className="section-title">Der Lebensbalken</div>
      <div className="section-sub">Wann sie kamen, wann sie blühten, wann sie gingen</div>
      <div className="zs-intro">
        Manche Dinge sterben über Nacht, andere über Jahrzehnte. Jeder Balken zeigt ein Leben:
        die zarte Linie der Geburt, die kräftige Blütezeit, das langsame Verblassen – und das Kreuz.
      </div>

      {/* DEIN LEBEN */}
      <div className="zs-leben">
        <div className="zs-leben-kopf">Dein Leben</div>
        <div className="zs-leben-form">
          <label htmlFor="zs-geb">In welchem Jahr bist du geboren?</label>
          <input id="zs-geb" inputMode="numeric" maxLength={4} placeholder="1965" value={geburt}
            onChange={(e) => setzeGeburt(e.target.value.replace(/\D/g, ""))} />
        </div>
        {lebenInfo && (
          <>
            <div className="zs-leben-zahl">
              Du hast <b>{lebenInfo.miterlebt.length}</b> {lebenInfo.miterlebt.length === 1 ? "Tod" : "Tode"} miterlebt.
            </div>
            {lebenInfo.nochDa.length > 0 && (
              <div className="zs-leben-liste">
                Als du {gJahr} zur Welt kamst, gab es noch: {lebenInfo.nochDa.slice(0, 8).map((e) => nameVon(e.post)).join(" · ")}
                {lebenInfo.nochDa.length > 8 ? ` · und ${lebenInfo.nochDa.length - 8} weitere` : ""}.
              </div>
            )}
            {lebenInfo.vorher.length > 0 && (
              <div className="zs-leben-liste">{lebenInfo.vorher.length === 1 ? "Eines war" : `${lebenInfo.vorher.length} waren`} schon vor dir gegangen.</div>
            )}
            <button className="zs-leben-teilen" onClick={teilen}>{kopiert ? "Link kopiert ✓" : "Mein Lebensband teilen"}</button>
          </>
        )}
      </div>

      {/* STEUERUNG */}
      <div className="zs-steuer">
        <span className="zs-steuer-label">Zeitraum</span>
        {[1850, 1900, 1950].map((j) => (
          <button key={j} className={`filter-btn ${von === j ? "active" : ""}`} onClick={() => setVon(j)}>ab {j}</button>
        ))}
        <span className="zs-steuer-label" style={{ marginLeft: 12 }}>Ordnen</span>
        {[["tod", "nach Tod"], ["bluete", "nach Blüte"], ["geburt", "nach Geburt"]].map(([k, l]) => (
          <button key={k} className={`filter-btn ${sortierung === k ? "active" : ""}`} onClick={() => setSortierung(k)}>{l}</button>
        ))}
      </div>
      <div className="zs-steuer">
        <button className={`filter-btn ${kat === "alle" ? "active" : ""}`} onClick={() => setKat("alle")}>Alle</button>
        {categories.map((c) => (
          <button key={c.id} className={`filter-btn ${kat === c.id ? "active" : ""}`} onClick={() => setKat(c.id)}>{c.icon} {c.title.split(" &")[0]}</button>
        ))}
      </div>

      <div className="zs-legende">
        <span><i className="zs-mini" style={{ background: "#c8a97e" }} /> Blütezeit</span>
        <span><i className="zs-mini" style={{ background: "linear-gradient(90deg,#c8a97e,transparent)", borderRight: "none" }} /> Siechtum</span>
        <span>† gestorben</span>
        <span style={{ color: "#3a6a2a" }}>✚ auferstanden</span>
        <span><i className="zs-mini" style={{ borderStyle: "dashed" }} /> Jahre geschätzt</span>
        <span style={{ color: "#8a2a1a" }}>┆ heute</span>
      </div>

      {/* TAFEL */}
      <div className="zs-tafel">
        <div className="zs-achse">
          <div />
          <div className="zs-achse-spur">
            {ticks.map((t) => <span key={t} className="zs-tick" style={{ left: x(t) }}>{t}</span>)}
          </div>
        </div>

        {sichtbar.map(({ post, d, cat }) => {
          const farbe = cat?.color || "#c8a97e";
          const endeSiechtum = d.gestorben ?? JETZT;
          const offenesEnde = !d.gestorben;
          const istOffen = offen === post.id;
          return (
            <div key={post.id} className={`zs-zeile ${d.beleg === "geschaetzt" ? "zs-geschaetzt" : ""}`}
              onClick={() => setOffen(istOffen ? null : post.id)}>
              <div className="zs-name" title={nameVon(post)}>
                <span className="zs-kreuz">{d.status === "auferstanden" ? "✚" : d.status === "tot" ? "†" : "~"}</span>{nameVon(post)}
              </div>
              <div className="zs-spur">
                {ticks.map((t) => <span key={t} className="zs-gitter" style={{ left: x(t) }} />)}
                {gJahr && <span className="zs-leben-band" style={{ left: x(gJahr), width: breite(gJahr, JETZT) }} />}
                <span className="zs-heute" style={{ left: x(JETZT) }} />
                {d.geboren < d.bluete[0] && <span className="zs-seg geburt" style={{ left: x(d.geboren), width: breite(d.geboren, d.bluete[0]), background: farbe }} />}
                <span className="zs-seg bluete" style={{ left: x(d.bluete[0]), width: breite(d.bluete[0], d.bluete[1]), background: farbe }} />
                <span className={`zs-seg ${offenesEnde ? "offen" : ""}`}
                  style={{ left: x(d.bluete[1]), width: breite(d.bluete[1], endeSiechtum), background: `linear-gradient(90deg, ${farbe}, ${offenesEnde ? farbe + "55" : "transparent"})` }} />
                {d.gestorben && d.gestorben >= von && <span className="zs-tod" style={{ left: x(d.gestorben) }}>†</span>}
                {d.status === "auferstanden" && (
                  <>
                    <span className="zs-auf" style={{ left: x(d.auferstanden) }}>✚</span>
                    <span className="zs-seg offen" style={{ left: x(d.auferstanden), width: breite(d.auferstanden, JETZT), background: `linear-gradient(90deg, ${farbe}88, ${farbe})` }} />
                  </>
                )}
                {d.gestorben && <span className="zs-jahr" style={{ left: `calc(${x(d.gestorben)} + 8px)` }}>{d.gestorben}</span>}
              </div>

              {istOffen && (
                <div className="zs-schein" onClick={(e) => e.stopPropagation()}>
                  <div className="zs-schein-titel">† {nameVon(post)}</div>
                  <div className="zs-schein-daten">
                    <div><span>Geboren</span>um {d.geboren}</div>
                    <div><span>Blütezeit</span>{d.bluete[0]}–{d.bluete[1]}</div>
                    <div><span>Siechtum ab</span>{d.siechtumAb}</div>
                    <div><span>Gestorben</span>{d.gestorben ?? "–"}</div>
                    <div><span>Status</span>{STATUS_TEXT[d.status]}{d.auferstanden ? ` (${d.auferstanden})` : ""}</div>
                    <div><span>Gilt für</span>{d.region === "AT" ? "Österreich" : d.region === "DE" ? "Deutschland" : "D-A-CH"}</div>
                  </div>
                  <div className="zs-schein-notiz">{d.notiz}</div>
                  <div className="zs-schein-fuss">
                    <button className="zs-lesen" onClick={() => onOpen(post)}>Nachruf lesen →</button>
                    {kanten.some(([v, z]) => v === post.id || z === post.id) && <button className="zs-lesen" style={{ background: "none", color: "#c8a97e", border: "1px solid #c8a97e" }} onClick={() => zeigeDomino(post.id)}>Erbfolge als Domino →</button>}
                    <span>Jahre: {BELEG_TEXT[d.beleg]}</span>
                    {d.quelle && <a href={d.quelle.url} target="_blank" rel="noopener noreferrer">Quelle: {d.quelle.titel}</a>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="zs-hinweis">
        Stand der Recherche: 15.11.2026. Schwerpunkt Österreich. Gestrichelte Balken sind Schätzungen von DerNachruf und nicht bestätigt –
        wer ein Todesjahr genauer kennt: <a href="mailto:media@cleebration.com" style={{ color: "#8a6a3a" }}>media@cleebration.com</a>.
      </div>
      </>)}
    </div>
  );
}
