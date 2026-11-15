import { useMemo, useState } from "react";
import { posts } from "./data.js";
import { lebensdaten } from "./lebensdaten.js";
import { knoten, kanten } from "./abhaengigkeiten.js";

const CSS = `
  .ef-intro { max-width: 680px; margin: 0 auto 22px; text-align: center; font-family: 'IM Fell English', serif; font-style: italic; color: #5a4a2a; font-size: 15px; line-height: 1.6; }
  .ef-start { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-width: 900px; margin: 0 auto 22px; }
  .ef-start button { font-family: 'IM Fell English', serif; font-size: 14px; padding: 7px 12px; background: #e8dcc8; border: 1px solid #c8b89a; color: #3a2a18; cursor: pointer; }
  .ef-start button:hover, .ef-start button.aktiv { background: #2a1f14; color: #f0e8d8; border-color: #c8a97e; }
  .ef-start button small { color: #8a7a5a; margin-left: 6px; }
  .ef-start button.aktiv small { color: #c8a97e; }

  .ef-buehne { max-width: 760px; margin: 0 auto; background: #2a1f14; border: 1px solid #c8a97e; padding: 20px 22px 24px; color: #e8dcc8; font-family: 'IM Fell English', serif; }
  .ef-kopf { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 10px; margin-bottom: 14px; }
  .ef-titel { font-family: 'UnifrakturMaguntia', serif; color: #c8a97e; font-size: 24px; }
  .ef-anstoss { background: #c8a97e; color: #2a1f14; border: none; padding: 8px 16px; font-family: 'IM Fell English', serif; font-size: 15px; cursor: pointer; }
  .ef-summe { font-size: 14px; color: #c8b89a; font-style: italic; margin-bottom: 12px; }

  .ef-reihe { display: flex; align-items: center; gap: 10px; min-height: 34px; }
  .ef-stein { width: 12px; height: 26px; background: #f0e8d8; border: 1px solid #c8a97e; border-radius: 2px; flex: none; transform-origin: 100% 100%; margin-right: 18px; }
  .ef-reihe.faellt .ef-stein { animation: ef-kippen .5s ease-in forwards; animation-delay: var(--d); }
  .ef-text { opacity: .45; transition: opacity .3s; }
  .ef-reihe.faellt .ef-text { animation: ef-auf .4s forwards; animation-delay: var(--d); }
  .ef-reihe.neu .ef-stein { background: #c8a97e; }
  .ef-name { font-size: 16px; }
  .ef-name a { color: #f0e8d8; text-decoration: underline; text-decoration-color: #8a6a3a; cursor: pointer; }
  .ef-art { font-size: 12px; color: #a89878; margin-left: 6px; font-style: italic; }
  .ef-jahr { font-family: 'Playfair Display', serif; color: #c8a97e; font-size: 13px; margin-left: 6px; }
  .ef-ohne { font-size: 11px; color: #8a7a5a; margin-left: 6px; letter-spacing: 1px; }
  @keyframes ef-kippen { to { transform: rotate(78deg); background: #5a4a2a; } }
  @keyframes ef-auf { to { opacity: 1; } }

  .ef-hinweis { max-width: 760px; margin: 18px auto 0; font-family: 'IM Fell English', serif; font-size: 12px; color: #7a6a4a; line-height: 1.6; text-align: center; }

  .ef-block { margin-top: 28px; border-top: 1px solid #c8b89a; padding-top: 16px; font-family: 'IM Fell English', serif; color: #3a2a18; }
  .ef-block-titel { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #7a6a4a; margin-bottom: 10px; }
  .ef-block-zeile { font-size: 15px; line-height: 1.7; }
  .ef-block-zeile b { font-weight: normal; color: #7a6a4a; font-style: italic; margin-right: 6px; }
  .ef-block-zeile a { color: #5a3a1a; cursor: pointer; text-decoration: underline; text-decoration-color: #c8a97e; }
  .ef-block-mehr { margin-top: 8px; font-size: 13px; }
  .ef-block-mehr a { color: #8a6a3a; cursor: pointer; }
`;

const postVon = Object.fromEntries(posts.map((p) => [p.id, p]));

export function info(id) {
  if (lebensdaten[id]) {
    const d = lebensdaten[id];
    return { id, name: d.name, typ: "alt", gestorben: d.gestorben, status: d.status, post: postVon[id] };
  }
  const k = knoten[id];
  return k ? { id, ...k } : { id, name: id, typ: "alt" };
}

const kinder = (id) => kanten.filter(([v]) => v === id).map(([, z, art]) => ({ id: z, art }));
const eltern = (id) => kanten.filter(([, z]) => z === id).map(([v, , art]) => ({ id: v, art }));

function kette(start) {
  // Tiefensuche, jeder Knoten nur einmal
  const gesehen = new Set([start]);
  const liste = [{ id: start, tiefe: 0, art: null }];
  const lauf = (id, tiefe) => {
    for (const k of kinder(id)) {
      if (gesehen.has(k.id)) continue;
      gesehen.add(k.id);
      liste.push({ id: k.id, tiefe, art: k.art });
      lauf(k.id, tiefe + 1);
    }
  };
  lauf(start, 1);
  return liste;
}

const jahrText = (i) => {
  if (i.typ === "neu") return `ab ${i.jahr}`;
  if (i.status === "auferstanden") return `† ${i.gestorben} · auferstanden`;
  if (i.gestorben) return `† ${i.gestorben}`;
  if (i.status === "lebt") return "lebt noch";
  return "im Sterben";
};

function Name({ i, onOpen }) {
  if (i.post) return <a onClick={(e) => { e.stopPropagation(); onOpen(i.post); }}>{i.name}</a>;
  return <>{i.name}</>;
}

export function ErbfolgeBlock({ postId, onOpen, onErbfolge }) {
  const ursachen = eltern(postId);
  const folgen = kinder(postId);
  if (!ursachen.length && !folgen.length) return null;
  const liste = (arr) => arr.map((x, n) => <span key={x.id}>{n > 0 && " · "}<Name i={info(x.id)} onOpen={onOpen} /></span>);
  const verdraengt = ursachen.filter((u) => u.art === "verdraengt");
  const starbMit = ursachen.filter((u) => u.art === "rissmit");
  const wurzel = (() => {
    let id = postId; const seen = new Set();
    while (eltern(id).length && !seen.has(id)) { seen.add(id); id = eltern(id)[0].id; }
    return id;
  })();
  return (
    <div className="ef-block">
      <style>{CSS}</style>
      <div className="ef-block-titel">Todesursache · Hinterbliebene</div>
      {verdraengt.length > 0 && <div className="ef-block-zeile"><b>Verdrängt von</b>{liste(verdraengt)}</div>}
      {starbMit.length > 0 && <div className="ef-block-zeile"><b>Starb mit</b>{liste(starbMit)}</div>}
      {folgen.length > 0 && <div className="ef-block-zeile"><b>Riss mit ins Grab</b>{liste(folgen)}</div>}
      {onErbfolge && <div className="ef-block-mehr"><a onClick={() => onErbfolge(wurzel)}>Die ganze Kette als Domino ansehen →</a></div>}
    </div>
  );
}

export default function Erbfolge({ onOpen, start: startProp }) {
  const auswahl = useMemo(() => {
    const ziele = new Set(kanten.map(([, z]) => z));
    return [...new Set(kanten.map(([v]) => v))]
      .filter((v) => !ziele.has(v))
      .map((v) => ({ id: v, n: kette(v).length - 1 }))
      .sort((a, b) => b.n - a.n);
  }, []);

  const [start, setStart] = useState(startProp && kanten.some(([v, z]) => v === startProp || z === startProp) ? startProp : "auto");
  const [lauf, setLauf] = useState(1);
  const [alle, setAlle] = useState(false);
  const reihe = useMemo(() => kette(start), [start]);
  const tote = reihe.slice(1).filter((r) => info(r.id).typ === "alt");
  const ohneNachruf = tote.filter((r) => !info(r.id).post);

  const waehle = (id) => { setStart(id); setLauf((l) => l + 1); };

  return (
    <div>
      <style>{CSS}</style>
      <div className="ef-intro">
        Nichts stirbt allein. Wenn das Pferd geht, geht der Hufschmied mit. Wähle, was zuerst kam – und sieh zu, wer danach fällt.
      </div>
      <div className="ef-start">
        {(alle ? auswahl : auswahl.filter((a, n) => n < 8 || a.id === start)).map((a) => (
          <button key={a.id} className={start === a.id ? "aktiv" : ""} onClick={() => waehle(a.id)}>
            {info(a.id).name}<small>{a.n}</small>
          </button>
        ))}
        {!alle && auswahl.length > 8 && <button onClick={() => setAlle(true)}>alle {auswahl.length} zeigen …</button>}
      </div>

      <div className="ef-buehne">
        <div className="ef-kopf">
          <div className="ef-titel">{info(start).name}</div>
          <button className="ef-anstoss" onClick={() => setLauf((l) => l + 1)}>Anstoßen ▸</button>
        </div>
        <div className="ef-summe">
          {info(start).typ === "neu" ? `Kam um ${info(start).jahr}` : `Ging um ${info(start).gestorben}`} – und riss {tote.length} {tote.length === 1 ? "Ding" : "Dinge"} mit.
        </div>
        {reihe.map((r, n) => {
          const i = info(r.id);
          return (
            <div key={`${lauf}-${r.id}`} className={`ef-reihe ${lauf > 0 ? "faellt" : ""} ${i.typ === "neu" ? "neu" : ""}`}
              style={{ paddingLeft: r.tiefe * 22, "--d": `${n * 0.35}s` }}>
              <span className="ef-stein" />
              <span className="ef-text">
                <span className="ef-name"><Name i={i} onOpen={onOpen} /></span>
                {r.art && <span className="ef-art">{r.art === "verdraengt" ? "verdrängt" : "starb mit"}</span>}
                <span className="ef-jahr">{jahrText(i)}</span>
                {i.typ === "alt" && !i.post && <span className="ef-ohne">noch ohne Nachruf</span>}
              </span>
            </div>
          );
        })}
      </div>

      <div className="ef-hinweis">
        Die Verbindungen sind eine Einschätzung von DerNachruf, die Jahre Näherungen (Stand 15.11.2026).
        {ohneNachruf.length > 0 && " Wer hier noch ohne Nachruf steht, bekommt bald einen."}
        {" "}Fehlt eine Verbindung? <a href="mailto:media@cleebration.com" style={{ color: "#8a6a3a" }}>media@cleebration.com</a>
      </div>
    </div>
  );
}
