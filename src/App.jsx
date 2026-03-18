import { useState, useEffect } from "react";
import { categories, posts } from "./data.js";

const STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #f0e8d8; }

  .masthead {
    background: #2a1f14;
    border-bottom: 3px double #c8a97e;
    padding: 28px 40px 22px;
    text-align: center;
    position: relative;
  }
  .masthead::after {
    content: '';
    position: absolute;
    bottom: -8px; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #8a6a3a, transparent);
  }

  .site-title {
    font-family: 'UnifrakturMaguntia', serif;
    font-size: clamp(52px, 9vw, 100px);
    color: #f0e8d8;
    letter-spacing: 2px;
    text-shadow: 2px 2px 0 #000, 4px 4px 12px rgba(0,0,0,0.6);
    line-height: 1;
  }
  .site-motto {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    color: #c8a97e;
    font-size: 18px;
    margin-top: 12px;
    letter-spacing: 3px;
  }
  .ornament { color: #8a6a3a; margin: 0 10px; }
  .edition-line {
    font-family: 'IM Fell English', serif;
    font-size: 13px;
    color: #7a6a4a;
    margin-top: 8px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .nav-bar {
    background: #3a2a18;
    border-bottom: 2px solid #c8a97e;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .nav-btn {
    background: none;
    border: none;
    color: #c8a97e;
    font-family: 'IM Fell English', serif;
    font-size: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 15px 32px;
    cursor: pointer;
    transition: all 0.2s;
    border-right: 1px solid #5a4a2a;
    white-space: nowrap;
  }
  .nav-btn:hover { background: #2a1f14; color: #f0e8d8; }
  .nav-btn.active { background: #2a1f14; color: #f0e8d8; border-top: 2px solid #c8a97e; }

  .content { max-width: 940px; margin: 0 auto; padding: 40px 20px 80px; }

  /* HERO */
  .hero-date {
    font-family: 'IM Fell English', serif;
    font-size: 17px;
    color: #8a7a5a;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 6px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 5vw, 46px);
    font-weight: 900;
    font-style: italic;
    color: #2a1f14;
    margin-bottom: 6px;
    line-height: 1.2;
  }
  .section-sub {
    font-family: 'IM Fell English', serif;
    font-size: 17px;
    color: #8a7a5a;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }
  .divider {
    text-align: center;
    color: #c8a97e;
    font-size: 18px;
    margin: 36px 0;
    letter-spacing: 6px;
  }

  /* FILTER BAR */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 28px;
  }
  .filter-btn {
    background: #e8dcc8;
    border: 1px solid #c8a97e;
    color: #5a4a2a;
    font-family: 'IM Fell English', serif;
    font-size: 15px;
    letter-spacing: 1px;
    padding: 9px 18px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .filter-btn:hover { background: #3a2a18; border-color: #c8a97e; color: #f0e8d8; }
  .filter-btn.active { background: #3a2a18; border-color: #c8a97e; color: #f0e8d8; }

  /* POST GRID */
  .post-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 20px;
  }
  .post-card {
    background: #faf4e8;
    border: 1px solid #c8a97e;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
  }
  .post-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #8a6a3a, transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .post-card:hover { border-color: #8a6a3a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
  .post-card:hover::before { opacity: 1; }

  .post-category-tag {
    font-family: 'IM Fell English', serif;
    font-size: 13px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #8a7a5a;
    padding: 16px 20px 0;
  }
  .post-headline {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.3;
    color: #2a1f14;
    padding: 8px 20px;
  }
  .post-subline {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 16px;
    color: #6a5a3a;
    padding: 0 20px 12px;
    border-bottom: 1px solid #e0d0b0;
  }
  .post-teaser {
    font-size: 16px;
    line-height: 1.85;
    color: #4a3a22;
    padding: 12px 20px;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 18px 14px;
    font-size: 14px;
    color: #8a7a5a;
    letter-spacing: 1px;
    font-family: 'IM Fell English', serif;
  }
  .read-more {
    color: #8a6a3a;
    cursor: pointer;
    font-style: italic;
    transition: color 0.2s;
    font-weight: bold;
  }
  .read-more:hover { color: #2a1f14; }

  /* FULL POST */
  .post-full-wrap {
    max-width: 680px;
    margin: 0 auto;
  }
  .back-btn {
    background: none;
    border: none;
    color: #6a5a3a;
    font-family: 'IM Fell English', serif;
    font-size: 15px;
    letter-spacing: 2px;
    cursor: pointer;
    margin-bottom: 28px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.2s;
  }
  .back-btn:hover { color: #2a1f14; }
  .post-full {
    background: #faf4e8;
    border: 1px solid #c8a97e;
    padding: 40px;
    position: relative;
    box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
  }
  .post-full::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent, #8a6a3a, transparent);
  }
  .post-body-para {
    font-family: 'IM Fell English', serif;
    font-size: 20px;
    line-height: 2.1;
    color: #2a1f14;
    margin-bottom: 20px;
  }
  .post-body-para:first-child::first-letter {
    font-family: 'Playfair Display', serif;
    font-size: 72px;
    font-weight: 900;
    float: left;
    line-height: 0.8;
    margin: 6px 8px 0 0;
    color: #8a6a3a;
  }
  .post-closing {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 17px;
    color: #8a7a5a;
    text-align: center;
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid #e0d0b0;
    letter-spacing: 1px;
  }

  /* ARCHIVE */
  .cat-section {
    margin-bottom: 12px;
    border: 1px solid #c8a97e;
    overflow: hidden;
    box-shadow: 1px 1px 4px rgba(0,0,0,0.08);
  }
  .cat-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    background: #e8dcc8;
    cursor: pointer;
    transition: background 0.2s;
    user-select: none;
  }
  .cat-header:hover { background: #3a2a18; }
  .cat-header:hover .cat-title { color: #f0e8d8 !important; }
  .cat-header:hover .cat-count { color: #c8a97e; }
  .cat-header:hover .cat-chevron { color: #c8a97e; }
  .cat-icon { font-size: 20px; }
  .cat-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    flex: 1;
  }
  .cat-count {
    font-family: 'IM Fell English', serif;
    font-size: 15px;
    color: #8a7a5a;
    letter-spacing: 1px;
  }
  .cat-chevron {
    color: #8a7a5a;
    font-size: 14px;
    transition: transform 0.2s;
    display: inline-block;
  }
  .cat-chevron.open { transform: rotate(180deg); }
  .cat-items {
    background: #f5edd8;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  .cat-item {
    padding: 11px 18px;
    border-bottom: 1px solid #e0d0b0;
    border-right: 1px solid #e0d0b0;
    cursor: pointer;
    transition: background 0.15s;
  }
  .cat-item:hover { background: #e8dcc8; }
  .item-name {
    font-family: 'IM Fell English', serif;
    font-size: 17px;
    margin-bottom: 5px;
  }
  .item-desc {
    font-size: 14px;
    color: #6a5a3a;
    line-height: 1.5;
    font-style: italic;
  }

  /* SEARCH */
  .search-wrap {
    margin-bottom: 28px;
    position: relative;
  }
  .search-input {
    width: 100%;
    background: #faf4e8;
    border: 1px solid #c8a97e;
    color: #2a1f14;
    font-family: 'IM Fell English', serif;
    font-size: 17px;
    font-style: italic;
    padding: 14px 20px;
    outline: none;
    transition: border-color 0.2s;
  }
  .search-input::placeholder { color: #a89878; }
  .search-input:focus { border-color: #8a6a3a; }

  /* ABOUT */
  .about-block {
    background: #faf4e8;
    border: 1px solid #c8a97e;
    padding: 36px;
    max-width: 680px;
    margin: 0 auto;
    font-family: 'IM Fell English', serif;
    font-size: 20px;
    line-height: 2;
    color: #2a1f14;
    position: relative;
  }
  .about-block::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, #c8a97e, transparent);
  }

  @media (max-width: 600px) {
    .post-grid { grid-template-columns: 1fr; }
    .masthead { padding: 20px 16px 16px; }
    .content { padding: 24px 12px 60px; }
    .post-full { padding: 22px; }
    .about-block { padding: 22px; }
    .nav-btn { font-size: 14px; padding: 11px 16px; }
  }
`;

export default function App() {
  const [view, setView] = useState("posts");
  const [activePost, setActivePost] = useState(null);
  const [expandedCat, setExpandedCat] = useState(null);
  const [filterCat, setFilterCat] = useState("alle");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePost, view]);

  const filteredPosts = posts.filter((p) => {
    const matchesCat = filterCat === "alle" || p.category === filterCat;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      p.headline.toLowerCase().includes(q) ||
      p.subline.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const openPost = (post) => {
    setActivePost(post);
    setView("posts");
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#f0e8d8", minHeight: "100vh", color: "#c8b89a" }}>
      <style>{STYLES}</style>

      {/* MASTHEAD */}
      <div className="masthead">
        <div className="site-title">Der Nachruf</div>
        <div className="site-motto">
          <span className="ornament">✦</span>
          Ein Archiv der verschwundenen Dinge
          <span className="ornament">✦</span>
        </div>
        <div className="edition-line">Gegründet in Erinnerung · Erscheint unregelmäßig · Immer rückwärts gerichtet</div>
      </div>

      {/* NAV */}
      <nav className="nav-bar">
        {[
          { key: "posts", label: "Nachrufe" },
          { key: "archive", label: "Das Archiv" },
          { key: "about", label: "Über uns" },
        ].map((n) => (
          <button
            key={n.key}
            className={`nav-btn ${view === n.key && !activePost ? "active" : view === n.key && activePost && n.key === "posts" ? "active" : ""}`}
            onClick={() => { setView(n.key); setActivePost(null); }}
          >
            {n.label}
          </button>
        ))}
      </nav>

      <div className="content">

        {/* ── NACHRUFE / FULL POST ────────────────────────────── */}
        {view === "posts" && !activePost && (
          <>
            <div className="hero-date">† Archiv der Stille</div>
            <div className="section-title">Zuletzt verstorben</div>
            <div className="section-sub">Nachrufe auf Dinge, die ohne Abschied gingen</div>

            {/* Filter */}
            <div className="filter-bar">
              <button className={`filter-btn ${filterCat === "alle" ? "active" : ""}`} onClick={() => setFilterCat("alle")}>
                Alle ({posts.length})
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={`filter-btn ${filterCat === c.id ? "active" : ""}`}
                  onClick={() => setFilterCat(c.id)}
                  style={{ borderLeftColor: filterCat === c.id ? c.color : undefined }}
                >
                  {c.icon} {c.title.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="search-wrap">
              <input
                className="search-input"
                placeholder="Suche im Archiv der Verschwundenen Dinge"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {filteredPosts.length === 0 && (
              <div style={{ textAlign: "center", fontFamily: "'IM Fell English', serif", fontStyle: "italic", color: "#8a7a5a", padding: "60px 0" }}>
                Für diesen Begriff wurde noch kein Nachruf geschrieben.
              </div>
            )}

            <div className="post-grid">
              {filteredPosts.map((post) => {
                const cat = categories.find((c) => c.id === post.category);
                return (
                  <div key={post.id} className="post-card" onClick={() => openPost(post)}>
                    <div className="post-category-tag" style={{ color: cat?.color ? cat.color + "88" : undefined }}>
                      † {post.categoryLabel}
                    </div>
                    <div className="post-headline">{post.headline}</div>
                    <div className="post-subline">{post.subline}</div>
                    <div className="post-teaser">{post.body}</div>
                    <div className="post-footer">
                      <span>{post.readTime} Lesezeit</span>
                      <span className="read-more">Nachruf lesen →</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="divider">· · · ✦ · · ·</div>
            <div style={{ textAlign: "center", fontFamily: "'IM Fell English', serif", fontStyle: "italic", color: "#8a7a5a", fontSize: "13px" }}>
              {posts.length} Nachrufe · Das Archiv wird laufend erweitert
            </div>
          </>
        )}

        {/* FULL POST */}
        {view === "posts" && activePost && (() => {
          const cat = categories.find((c) => c.id === activePost.category);
          return (
            <div className="post-full-wrap">
              <button className="back-btn" onClick={() => setActivePost(null)}>← Zurück</button>
              <div className="post-full">
                <div className="post-category-tag" style={{ padding: "0 0 10px", color: cat?.color ? cat.color + "99" : undefined }}>
                  † {activePost.categoryLabel}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,4vw,30px)", fontWeight: 900, fontStyle: "italic", color: "#d4c9b0", lineHeight: 1.25, marginBottom: 10 }}>
                  {activePost.headline}
                </div>
                <div style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "15px", color: "#6a5a3a", marginBottom: 24, lineHeight: 1.5 }}>
                  {activePost.subline}
                </div>
                <div style={{ borderTop: "1px solid #2a2015", paddingTop: 24 }}>
                  {activePost.body.split("\n\n").map((para, i) => (
                    <p key={i} className="post-body-para">{para}</p>
                  ))}
                </div>
                <div className="post-closing">
                  Wir erinnern. Wir trauern. Wir vergessen nicht.<br />
                  <span style={{ fontSize: "12px", letterSpacing: "2px" }}>— DerNachruf</span>
                </div>
              </div>

              {/* Related */}
              <div style={{ marginTop: 36 }}>
                <div style={{ fontFamily: "'IM Fell English', serif", fontSize: "11px", letterSpacing: "3px", color: "#8a7a5a", textTransform: "uppercase", marginBottom: 14 }}>
                  Weitere Verstorbene aus dieser Kategorie
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                  {posts.filter(p => p.category === activePost.category && p.id !== activePost.id).slice(0, 4).map(p => (
                    <div key={p.id} className="post-card" onClick={() => setActivePost(p)} style={{ cursor: "pointer" }}>
                      <div className="post-category-tag" style={{ fontSize: 9 }}>†</div>
                      <div className="post-headline" style={{ fontSize: 15 }}>{p.headline}</div>
                      <div className="post-footer" style={{ paddingTop: 8 }}>
                        <span className="read-more">Lesen →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── ARCHIV ─────────────────────────────────────────── */}
        {view === "archive" && (
          <>
            <div className="section-title">Das Archiv der Verschwundenen Dinge</div>
            <div className="section-sub">{posts.length} Einträge · Geordnet nach Lebensbereich · ~65 Jahre Rückblick</div>

            {categories.map((cat, i) => {
              const catPosts = posts.filter((p) => p.category === cat.id);
              return (
                <div key={cat.id} className="cat-section">
                  <div className="cat-header" onClick={() => setExpandedCat(expandedCat === i ? null : i)}>
                    <span className="cat-icon">{cat.icon}</span>
                    <span className="cat-title" style={{ color: cat.color }}>{cat.title}</span>
                    <span className="cat-count">{catPosts.length} Einträge</span>
                    <span className={`cat-chevron ${expandedCat === i ? "open" : ""}`}>▼</span>
                  </div>
                  {expandedCat === i && (
                    <div className="cat-items">
                      {catPosts.map((p) => (
                        <div key={p.id} className="cat-item" onClick={() => openPost(p)}>
                          <div className="item-name" style={{ color: cat.color }}>† {p.headline.split(":")[0].split("–")[0].trim()}</div>
                          <div className="item-desc">{p.archiveDesc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="divider">· · · ✦ · · ·</div>
            <div style={{ textAlign: "center", fontFamily: "'IM Fell English', serif", fontStyle: "italic", color: "#8a7a5a", fontSize: "13px" }}>
              Alle Einträge verlinken auf den vollständigen Nachruf
            </div>
          </>
        )}

        {/* ── ABOUT ──────────────────────────────────────────── */}
        {view === "about" && (
          <div style={{ maxWidth: 680, margin: "0 auto" }}>

            {/* LOGO */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <a href="https://www.cleebration.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="/cleebration_logo.jpg"
                  alt="Cleebration"
                  style={{ maxWidth: 220, height: "auto", opacity: 0.85, transition: "opacity 0.2s" }}
                  onMouseOver={e => e.target.style.opacity = 1}
                  onMouseOut={e => e.target.style.opacity = 0.85}
                />
              </a>
            </div>

            <div className="section-title">Über Der Nachruf</div>
            <div className="section-sub">Was hier geschieht und warum</div>
            <div className="about-block">
              <p style={{ marginBottom: 18 }}>
                Der Nachruf ist ein Archiv der verschwundenen Dinge. Kein Museum – dafür sind wir zu subjektiv. Kein Geschichtsbuch – dafür sind wir zu nostalgisch. Eher eine Sammlung kleiner Trauerfeiern für Objekte, Berufe, Gewohnheiten und Gesten, die einmal selbstverständlich waren und heute nicht mehr existieren.
              </p>
              <p style={{ marginBottom: 18 }}>
                Wir gehen etwa 65 Jahre zurück – in jene Jahrzehnte, in denen das Alltagsleben noch ganz anders roch, klang und sich anfühlte. Die Telefonzelle. Der Scherenschleifer. Die Schiefertafel. Der Busschaffner. Sie alle sind gegangen, ohne dass jemand einen Nachruf geschrieben hätte.
              </p>
              <p style={{ marginBottom: 18 }}>
                Wir schreiben ihn jetzt. Nicht aus Sentimentalität – obwohl es davon auch etwas gibt. Sondern weil das Verschwinden von Dingen immer auch das Verschwinden von Welt bedeutet. Und weil es gut ist, das zu benennen.
              </p>
              <p>
                Das Archiv wächst. Wenn Sie etwas vermissen – das Vermisste selbst, oder einen Nachruf darauf –{" "}
                <a href="mailto:media@cleebration.com" style={{ color: "#c8a97e", textDecoration: "none", borderBottom: "1px solid #4a3a22" }}>
                  schreiben Sie uns
                </a>.
              </p>
            </div>

            <div className="divider">· · · ✦ · · ·</div>

            <div style={{ background: "#faf4e8", border: "1px solid #1a1410", padding: "24px", fontFamily: "'IM Fell English', serif", marginBottom: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#8a7a5a", textTransform: "uppercase", marginBottom: 16 }}>Kontakt</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "#8a6a3a", fontSize: 20 }}>✉</span>
                <a href="mailto:media@cleebration.com" style={{ color: "#8a7a5a", fontStyle: "italic", fontSize: 16, textDecoration: "none" }}>
                  media@cleebration.com
                </a>
              </div>
            </div>

            <div style={{ background: "#faf4e8", border: "1px solid #1a1410", padding: "24px", fontFamily: "'IM Fell English', serif" }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#8a7a5a", textTransform: "uppercase", marginBottom: 12 }}>Das Archiv in Zahlen</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
                {[
                  { n: posts.length, label: "Nachrufe" },
                  { n: categories.length, label: "Kategorien" },
                  { n: "~65", label: "Jahre Rückblick" },
                  { n: "∞", label: "Erinnerungen" },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: "#8a6a3a" }}>{s.n}</div>
                    <div style={{ fontSize: 11, color: "#6a5a3a", letterSpacing: 2, textTransform: "uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer style={{
        background: "#2a1f14",
        borderTop: "2px double #c8a97e",
        padding: "28px 20px",
        textAlign: "center",
        fontFamily: "'IM Fell English', serif",
      }}>
        <div style={{ marginBottom: 14 }}>
          <a href="https://www.cleebration.com" target="_blank" rel="noopener noreferrer">
            <img src="/cleebration_logo.jpg" alt="Cleebration" style={{ maxWidth: 140, height: "auto", opacity: 0.5 }} />
          </a>
        </div>
        <div style={{ fontFamily: "'UnifrakturMaguntia', serif", fontSize: 18, color: "#3a2a18", marginBottom: 6 }}>
          DerNachruf
        </div>
        <div style={{ fontSize: 12, color: "#2a1a10", letterSpacing: 1, marginBottom: 14 }}>
          Ein Archiv der verschwundenen Dinge
        </div>
        <div style={{ marginBottom: 16 }}>
          <a href="mailto:media@cleebration.com" style={{ color: "#c8a97e", fontSize: 13, textDecoration: "none", letterSpacing: 1, fontStyle: "italic" }}>
            ✉ media@cleebration.com
          </a>
        </div>
        <div style={{ fontSize: 10, color: "#7a6a4a", letterSpacing: 2, textTransform: "uppercase" }}>
          © {new Date().getFullYear()} DerNachruf · Alle Rechte vorbehalten
        </div>
      </footer>

    </div>
  );
}
