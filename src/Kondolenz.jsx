import { useEffect, useRef, useState } from "react";

const CSS = `
  .kb { margin-top: 30px; border-top: 1px solid #c8b89a; padding-top: 18px; font-family: 'IM Fell English', serif; color: #2a1a10; }
  .kb-titel { font-family: 'UnifrakturMaguntia', serif; font-size: 24px; color: #3a2a18; text-align: center; margin-bottom: 4px; }
  .kb-sub { text-align: center; font-style: italic; font-size: 13px; color: #7a6a4a; margin-bottom: 14px; }
  .kb-eintrag { border-left: 2px solid #c8a97e; padding: 4px 0 4px 12px; margin: 10px 0; }
  .kb-text { font-size: 15px; line-height: 1.55; font-style: italic; }
  .kb-wer { font-size: 12px; color: #8a7a5a; margin-top: 2px; }
  .kb-form { display: grid; gap: 8px; margin-top: 14px; }
  .kb-form input, .kb-form textarea { font-family: 'IM Fell English', serif; font-size: 15px; padding: 8px 10px; border: 1px solid #c8b89a; background: #fffdf5; color: #1a0f08; }
  .kb-form textarea { min-height: 80px; resize: vertical; }
  .kb-form button { justify-self: start; background: #2a1f14; color: #f0e8d8; border: 1px solid #c8a97e; padding: 7px 16px; font-family: 'IM Fell English', serif; font-size: 14px; cursor: pointer; }
  .kb-hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
  .kb-meldung { font-size: 13px; font-style: italic; color: #7a4a2a; }
  .kb-leer { text-align: center; font-style: italic; font-size: 14px; color: #8a7a5a; }
`;

export default function Kondolenzbuch({ postId }) {
  const [eintraege, setEintraege] = useState(null);
  const [zu, setZu] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [hp, setHp] = useState("");
  const [meldung, setMeldung] = useState("");
  const start = useRef(Date.now());

  useEffect(() => {
    let aus = false;
    setEintraege(null); start.current = Date.now();
    fetch(`/api/kondolenz?id=${encodeURIComponent(postId)}`)
      .then((r) => (r.status === 503 ? (setZu(true), { eintraege: [] }) : r.json()))
      .then((d) => { if (!aus) setEintraege(d.eintraege || []); })
      .catch(() => { if (!aus) { setZu(true); setEintraege([]); } });
    return () => { aus = true; };
  }, [postId]);

  const senden = async (e) => {
    e.preventDefault();
    setMeldung("…");
    try {
      const r = await fetch("/api/kondolenz", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId, name, text, website: hp, t: Date.now() - start.current }),
      });
      const d = await r.json();
      if (!r.ok) { setMeldung(d.fehler || "Das hat nicht geklappt."); return; }
      if (d.eintrag) setEintraege((alt) => [d.eintrag, ...(alt || [])]);
      setText(""); setMeldung("Danke. Ihr Eintrag steht im Kondolenzbuch.");
    } catch { setMeldung("Das hat nicht geklappt. Bitte später noch einmal."); }
  };

  return (
    <div className="kb">
      <style>{CSS}</style>
      <div className="kb-titel">Kondolenzbuch</div>
      <div className="kb-sub">Woran erinnern Sie sich? Ein paar Zeilen genügen.</div>
      {eintraege === null && <div className="kb-leer">Das Buch wird aufgeschlagen …</div>}
      {zu && <div className="kb-leer">Das Kondolenzbuch liegt bald auf.</div>}
      {eintraege && !zu && eintraege.length === 0 && <div className="kb-leer">Noch hat sich niemand eingetragen. Schreiben Sie die ersten Zeilen.</div>}
      {eintraege && eintraege.map((e, n) => (
        <div key={n} className="kb-eintrag">
          <div className="kb-text">{e.text}</div>
          <div className="kb-wer">— {e.name}, {new Date(e.datum).toLocaleDateString("de-AT")}</div>
        </div>
      ))}
      {!zu && (
        <form className="kb-form" onSubmit={senden}>
          <input placeholder="Ihr Name (oder ein Kürzel)" maxLength={40} value={name} onChange={(e) => setName(e.target.value)} />
          <textarea placeholder="Ihre Erinnerung …" maxLength={600} required value={text} onChange={(e) => setText(e.target.value)} />
          <div className="kb-hp" aria-hidden="true"><input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} placeholder="Website" /></div>
          <button type="submit">Eintragen</button>
          {meldung && <div className="kb-meldung">{meldung}</div>}
          <div className="kb-wer">Einträge erscheinen sofort und öffentlich. Bitte ohne Links und im Ton einer Trauerfeier.</div>
        </form>
      )}
    </div>
  );
}
