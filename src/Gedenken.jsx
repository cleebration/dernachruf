import { useState } from "react";
import { posts } from "./data.js";
import { lebensdaten } from "./lebensdaten.js";
import { auferstandene, gedenktage, gedenkenAm, artText } from "./gedenken.js";
import { teileParte } from "./parte.js";

const postVon = Object.fromEntries(posts.map((p) => [p.id, p]));
const nameVon = (id) => lebensdaten[id]?.name || auferstandene.find((a) => a.id === id)?.name || id;
const MONATE = ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const ZEICHEN = { tod: "†", geburt: "*", siechtum: "~", auferstehung: "✚" };

const CSS = `
  .gd-intro { max-width: 680px; margin: 0 auto 24px; text-align: center; font-family: 'IM Fell English', serif; font-style: italic; color: #5a4a2a; font-size: 15px; line-height: 1.6; }
  .gd-karten { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; max-width: 980px; margin: 0 auto; }
  .gd-karte { background: #fffdf5; border: 1px solid #c8b89a; padding: 18px 20px; font-family: 'IM Fell English', serif; color: #2a1a10; }
  .gd-karte-kopf { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  .gd-karte-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; font-style: italic; }
  .gd-zustand { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; padding: 1px 6px; color: #fff; }
  .gd-daten { font-size: 15px; margin: 6px 0 8px; color: #5a4a2a; }
  .gd-daten b { color: #3a6a2a; font-weight: normal; }
  .gd-text { font-size: 15px; line-height: 1.55; }
  .gd-fuss { margin-top: 10px; font-size: 12px; color: #8a7a5a; display: flex; flex-wrap: wrap; gap: 6px 14px; }
  .gd-fuss a { color: #8a6a3a; cursor: pointer; }
  .gd-strich { position: relative; height: 10px; margin: 6px 0 4px; background: #efe5d2; }
  .gd-strich span { position: absolute; top: 0; height: 10px; }

  .gd-heute { max-width: 760px; margin: 0 auto 28px; background: #2a1f14; border: 1px solid #c8a97e; padding: 18px 22px; color: #e8dcc8; font-family: 'IM Fell English', serif; text-align: center; }
  .gd-heute-kopf { font-family: 'UnifrakturMaguntia', serif; color: #c8a97e; font-size: 24px; margin-bottom: 6px; }
  .gd-heute-text { font-size: 17px; line-height: 1.5; }
  .gd-heute-text a { color: #f0e8d8; cursor: pointer; text-decoration: underline; text-decoration-color: #8a6a3a; }
  .gd-heute-klein { font-size: 13px; color: #a89878; font-style: italic; margin-top: 6px; }

  .gd-monat { max-width: 760px; margin: 0 auto; font-family: 'IM Fell English', serif; }
  .gd-monat-name { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #7a6a4a; border-bottom: 1px solid #c8b89a; margin: 18px 0 6px; padding-bottom: 4px; }
  .gd-eintrag { display: grid; grid-template-columns: 74px 1fr; gap: 10px; padding: 7px 0; border-bottom: 1px dotted #e0d4bc; color: #2a1a10; }
  .gd-eintrag.heute { background: #efe5d2; }
  .gd-tag { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 16px; }
  .gd-tag small { display: block; font-family: 'IM Fell English', serif; font-weight: normal; font-size: 11px; color: #8a7a5a; }
  .gd-was { font-size: 15px; line-height: 1.5; }
  .gd-was b { font-weight: normal; color: #7a6a4a; font-style: italic; font-size: 12px; margin-right: 6px; }
  .gd-was a { color: #5a3a1a; cursor: pointer; }
  .gd-hinweis { max-width: 760px; margin: 20px auto 0; font-family: 'IM Fell English', serif; font-size: 12px; color: #7a6a4a; line-height: 1.6; text-align: center; }

  .gd-parte { background: #14100b; color: #f0e8d8; border: 1px solid #c8a97e; padding: 7px 14px; font-family: 'IM Fell English', serif; font-size: 14px; cursor: pointer; letter-spacing: .5px; }
  .gd-parte:hover { background: #2a1f14; }
  .gd-parte[disabled] { opacity: .6; cursor: wait; }
`;

function Name({ id, onOpen }) {
  const p = postVon[id];
  return p ? <a onClick={() => onOpen(p)}>{nameVon(id)}</a> : <>{nameVon(id)}</>;
}

export function ParteKnopf({ id, style }) {
  const [zustand, setZustand] = useState("");
  if (!lebensdaten[id]) return null;
  const los = async (e) => {
    e.stopPropagation();
    setZustand("…");
    try { const r = await teileParte(id); setZustand(r === "geladen" ? "✓ geladen" : r === "geteilt" ? "✓ geteilt" : ""); }
    catch { setZustand("Fehler"); }
    setTimeout(() => setZustand(""), 3000);
  };
  return (
    <>
      <style>{CSS}</style>
      <button className="gd-parte" style={style} disabled={zustand === "…"} onClick={los}>
        † Parte {zustand === "…" ? "wird gesetzt …" : zustand || "teilen"}
      </button>
    </>
  );
}

export function HeuteBox({ onOpen }) {
  const { heute, naechster, naechsterDatum, jahrHeute } = gedenkenAm();
  return (
    <div className="gd-heute">
      <style>{CSS}</style>
      <div className="gd-heute-kopf">{heute.length ? "Heute vor … Jahren" : "Der nächste Gedenktag"}</div>
      {heute.length ? heute.map((g) => (
        <div key={g.id + g.jahr} className="gd-heute-text">
          {ZEICHEN[g.art]} Heute vor {jahrHeute - g.jahr} Jahren: <Name id={g.id} onOpen={onOpen} /> – {g.text}
        </div>
      )) : naechster && (
        <div className="gd-heute-text">
          {ZEICHEN[naechster.art]} Am {naechsterDatum.getDate()}. {MONATE[naechsterDatum.getMonth()]}: {artText(naechster.art)} von <Name id={naechster.id} onOpen={onOpen} /> – vor {naechsterDatum.getFullYear() - naechster.jahr} Jahren. {naechster.text}
        </div>
      )}
    </div>
  );
}

export function Kalender({ onOpen }) {
  const jetzt = new Date();
  const t = jetzt.getDate(), m = jetzt.getMonth() + 1;
  const sortiert = [...gedenktage].sort((a, b) => a.monat - b.monat || a.tag - b.tag);
  const monate = [...new Set(sortiert.map((g) => g.monat))];
  return (
    <div>
      <style>{CSS}</style>
      <div className="gd-intro">Jedes Ding hat einen Todestag – manche kennen wir auf den Tag genau. Hier stehen die, die wir belegen können.</div>
      <HeuteBox onOpen={onOpen} />
      <div className="gd-monat">
        {monate.map((mo) => (
          <div key={mo}>
            <div className="gd-monat-name">{MONATE[mo - 1]}</div>
            {sortiert.filter((g) => g.monat === mo).map((g) => (
              <div key={g.id + g.jahr + g.art} className={`gd-eintrag ${g.tag === t && g.monat === m ? "heute" : ""}`}>
                <div className="gd-tag">{g.tag}. {MONATE[g.monat - 1].slice(0, 3)}.<small>{g.jahr}</small></div>
                <div className="gd-was"><b>{ZEICHEN[g.art]} {artText(g.art)}</b><Name id={g.id} onOpen={onOpen} /> – {g.text}{" "}
                  {g.quelle && <a href={g.quelle} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#8a7a5a" }}>Quelle</a>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="gd-hinweis">Stand der Recherche: 16.11.2026. Nur Tage, die wir belegen konnten. Sie kennen einen weiteren Todestag? <a href="mailto:media@cleebration.com" style={{ color: "#8a6a3a" }}>media@cleebration.com</a></div>
    </div>
  );
}

export function Auferstandene({ onOpen }) {
  const von = 1990, bis = new Date().getFullYear();
  const x = (j) => `${((Math.min(Math.max(j, von), bis) - von) / (bis - von)) * 100}%`;
  return (
    <div>
      <style>{CSS}</style>
      <div className="gd-intro">Nicht jeder Nachruf bleibt der letzte. Manche Dinge wurden begraben – und standen wieder auf. Ob sie bleiben, weiß niemand.</div>
      <div className="gd-karten">
        {auferstandene.map((a) => (
          <div key={a.id} className="gd-karte">
            <div className="gd-karte-kopf">
              <span className="gd-karte-name">✚ {a.name}</span>
              <span className="gd-zustand" style={{ background: a.zustand === "kräftig" ? "#3a6a2a" : "#a8742a" }}>{a.zustand === "kräftig" ? "putzmunter" : "scheintot"}</span>
            </div>
            <div className="gd-daten">† um {a.gestorben} · <b>✚ {a.auferstanden}</b></div>
            <div className="gd-strich">
              <span style={{ left: 0, width: x(a.gestorben), background: "#c8a97e" }} />
              <span style={{ left: x(a.auferstanden), width: `calc(100% - ${x(a.auferstanden)})`, background: a.zustand === "kräftig" ? "#3a6a2a" : "#a8742a88" }} />
            </div>
            <div className="gd-text">{a.text}</div>
            <div className="gd-fuss">
              {a.post && postVon[a.post] && <a onClick={() => onOpen(postVon[a.post])}>Der alte Nachruf →</a>}
              {a.quelle && <a href={a.quelle.url} target="_blank" rel="noopener noreferrer">Quelle: {a.quelle.titel}</a>}
            </div>
          </div>
        ))}
      </div>
      <div className="gd-hinweis">Stand der Recherche: 16.11.2026. Die Jahre der Wiederkehr sind belegt, die Todesjahre teils geschätzt. Balken: 1990 bis heute.</div>
    </div>
  );
}
