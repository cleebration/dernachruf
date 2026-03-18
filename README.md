# DerNachruf – Deployment Guide

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## GitHub + Vercel Deployment

### Schritt 1: Projekt auf GitHub pushen

```bash
cd dernachruf
git init
git add .
git commit -m "DerNachruf – initial commit"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/dernachruf.git
git push -u origin main
```

### Schritt 2: Vercel verbinden

1. Gehe auf vercel.com → Login
2. "Add New Project" → GitHub Repo auswählen
3. Framework Preset: **Vite** (wird automatisch erkannt)
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy!

### Schritt 3: Domain hinzufügen

1. In Vercel → Projekt → Settings → Domains
2. Deine Domain eingeben: `dernachruf.at` (oder .com/.de)
3. DNS-Einträge bei deinem Domain-Anbieter setzen:
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`
4. Warten (~5 Minuten) → fertig!

## Neuen Blogbeitrag hinzufügen

In `src/data.js` am Ende des `posts`-Arrays eintragen:

```js
{
  id: "eindeutiger-name",
  category: "kommunikation",   // eine der 8 Kategorien
  categoryLabel: "Kommunikation",
  headline: "Titel des Nachrufs",
  subline: "Untertitel – die zweite Zeile",
  archiveDesc: "Kurzbeschreibung für das Archiv",
  readTime: "3 Min.",
  body: `Erster Absatz des Textes.

Zweiter Absatz. Durch Leerzeile getrennt.

Dritter Absatz. So viele wie nötig.`,
},
```

Verfügbare Kategorien: `kommunikation`, `haushalt`, `medien`, `berufe`, `verkehr`, `handel`, `kindheit`, `technik`
