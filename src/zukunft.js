// Zukunft: Palliativstation und Szenario-Regler.
// Stand: 2026-11-16. ALLES HIER IST SPEKULATION von DerNachruf – keine Vorhersage mit Gewähr.
//
// ausloeser: Ereignisse, deren Jahr der Besucher mit einem Regler setzt.
//   standard = Voreinstellung (Einschätzung DerNachruf), min/max = Reglerbereich, max = "kommt nie" (NIE)
//   stand    = was heute (Recherche) darüber bekannt ist, mit Quelle
// kranke: Dinge, die (noch) leben und sterben werden.
//   stufe   "sterbend" (liegt schon im Sterben) | "krank" | "vorahnung"
//   tod     feste Spanne [von, bis] ODER
//   regel   Liste von [ausloeserId oder krankeId, Verzögerung in Jahren] – es stirbt, sobald die ERSTE Regel greift
//   notiz   Text; notizWenn = Sonderfall abhängig von der Reihenfolge der Auslöser

export const NIE = 2100;

export const ausloeser = [
  {
    id: "robotaxi", name: "Robotaxis für alle", frage: "Ab wann fahren selbstfahrende Autos überall, ohne Fahrer?",
    standard: 2040, min: 2028, max: NIE,
    stand: "Waymo plant den ersten fahrerlosen Dienst in der EU für Ende 2027 in München – zunächst in einem kleinen Gebiet.",
    quelle: { titel: "electrive – Waymo plant Robotaxi-Start in München für 2027", url: "https://www.electrive.net/2026/08/26/waymo-plant-robotaxi-start-in-muenchen-fuer-2027/" },
  },
  {
    id: "verbrenner", name: "Letzter neuer Verbrenner", frage: "Ab wann werden keine neuen Benzin- und Dieselautos mehr verkauft?",
    standard: 2040, min: 2030, max: NIE,
    stand: "Das EU-Verbrenner-Aus für 2035 wurde aufgeweicht: Die EU-Kommission schlug im Dezember 2025 vor, statt 100 nur 90 Prozent CO2-Minderung zu verlangen.",
    quelle: { titel: "orf.at – Verbrenner-Aus abgesagt", url: "https://orf.at/stories/3414607/" },
  },
  {
    id: "bargeld", name: "Ende des Bargelds", frage: "Ab wann zahlt in Österreich praktisch niemand mehr bar?",
    standard: 2050, min: 2030, max: NIE,
    stand: "2025 wurden in Österreich noch 55 Prozent aller Zahlungen an der Kasse bar bezahlt (2022: 63 Prozent).",
    quelle: { titel: "OeNB – Zahlungsmittelstudie 2025", url: "https://www.oenb.at/dam/jcr:6258e7e4-c4ac-46f2-bc53-ef4b6a971471/report-2026-14-zahlungsmittelstudie-2025.pdf" },
  },
  {
    id: "uebersetzer", name: "Perfekte KI-Übersetzung", frage: "Ab wann übersetzt ein Gerät im Ohr jedes Gespräch fehlerfrei und sofort?",
    standard: 2033, min: 2027, max: NIE,
    stand: "Echtzeit-Übersetzung im Ohrhörer gibt es schon – fehlerfrei und für jede Lage ist sie noch nicht.",
  },
  {
    id: "brief", name: "Letzter Papierbrief", frage: "Ab wann kommt keine Post mehr auf Papier?",
    standard: 2040, min: 2028, max: NIE,
    stand: "Briefmengen sinken seit Jahren; Rechnungen und Behördenpost wandern ins Digitale.",
  },
];

export const kranke = [
  // ── Robotaxi ──
  { id: "taxifahrer", name: "Taxifahrer", stufe: "vorahnung", regel: [["robotaxi", 3]], notiz: "Das Taxi bleibt – nur der Mensch vorne nicht." },
  { id: "fahrschule", name: "Fahrschule", stufe: "vorahnung", regel: [["robotaxi", 5]], notiz: "Wer nicht mehr selbst fährt, muss es nicht mehr lernen." },
  { id: "fuehrerschein", name: "Führerschein", stufe: "vorahnung", regel: [["fahrschule", 15]], notiz: "Der rosa Lappen war schon tot – jetzt geht die ganze Idee." },
  { id: "strafzettel", name: "Strafzettel", stufe: "vorahnung", regel: [["robotaxi", 10]], notiz: "Maschinen parken nicht falsch und fahren nicht zu schnell." },
  { id: "parkuhr", name: "Parkuhr", stufe: "krank", regel: [["bargeld", 0], ["robotaxi", 10]], notiz: "Stirbt an dem, was zuerst kommt: kein Kleingeld mehr – oder keine parkenden Autos.", notizWenn: { frueher: "bargeld", text: "Ohne Münzen verhungert sie, bevor die Robotaxis kommen." } },
  // ── Verbrenner ──
  { id: "tankstelle", name: "Tankstelle", stufe: "krank", regel: [["verbrenner", 20], ["robotaxi", 12]], notiz: "Die Zapfsäule wartet auf den letzten Verbrenner.", notizWenn: { frueher: "verbrenner", text: "Sie überlebt als Ladestation mit Würstelstand – nur das Benzin stirbt.", sonst: "Robotaxis tanken im Depot – die Tankstelle stirbt ganz." } },
  { id: "oelwechsel", name: "Ölwechsel", stufe: "vorahnung", regel: [["verbrenner", 15]], notiz: "Der Elektromotor braucht kein Öl, nur Strom." },
  { id: "auspuff", name: "Auspuff-Werkstatt", stufe: "vorahnung", regel: [["verbrenner", 15]], notiz: "Ohne Abgas kein Auspuff, ohne Auspuff kein Spezialist." },
  { id: "tankwart-rest", name: "Tankstellenkassa", stufe: "krank", regel: [["tankstelle", 0], ["bargeld", 5]], notiz: "Der letzte Rest des Tankwarts – Kassa, Zigaretten, Leberkässemmel." },
  // ── Bargeld ──
  { id: "bankomat", name: "Bankomat", stufe: "krank", regel: [["bargeld", 0]], notiz: "Wer nichts mehr abhebt, braucht keinen Automaten." },
  { id: "geldboerse", name: "Geldbörse", stufe: "krank", regel: [["bargeld", 5]], notiz: "Erst verlor sie das Kleingeld, dann die Karten ans Handy." },
  { id: "sparschwein", name: "Sparschwein", stufe: "vorahnung", regel: [["bargeld", 10]], notiz: "Man kann keine App schütteln." },
  { id: "kaugummiautomat", name: "Kaugummiautomat", stufe: "krank", regel: [["bargeld", -5]], notiz: "Er rostet schon jetzt an der Hausmauer vor sich hin." },
  { id: "trinkgeldglas", name: "Trinkgeld-Glas", stufe: "krank", regel: [["bargeld", 0]], notiz: "Das Kartengerät fragt jetzt nach Prozenten." },
  // ── Übersetzer ──
  { id: "dolmetscher", name: "Dolmetscher", stufe: "vorahnung", regel: [["uebersetzer", 7]], notiz: "Bei Verhandlungen und vor Gericht vielleicht am längsten." },
  { id: "woerterbuch", name: "Wörterbuch aus Papier", stufe: "sterbend", regel: [["uebersetzer", -3]], notiz: "Der Langenscheidt liegt schon im Altpapier." },
  { id: "sprachfuehrer", name: "Reise-Sprachführer", stufe: "sterbend", regel: [["uebersetzer", -2]], notiz: "Wo ist der Bahnhof? – fragt heute das Handy." },
  // ── Brief ──
  { id: "briefmarke", name: "Briefmarke", stufe: "krank", regel: [["brief", 0]], notiz: "Lebt bei Sammlern länger als auf Kuverts." },
  { id: "briefkasten", name: "Gelber Briefkasten", stufe: "krank", regel: [["brief", 3]], notiz: "Er wird geleert, aber immer seltener." },
  { id: "brieftraeger", name: "Briefträger", stufe: "krank", regel: [["brief", 5]], notiz: "Er bringt dann nur mehr Pakete – und heißt anders." },
  { id: "zahlschein", name: "Zahlschein", stufe: "sterbend", regel: [["brief", -4], ["bargeld", -10]], notiz: "Wer ihn noch ausfüllt, wird schon fotografiert." },
  // ── ohne Auslöser: schon auf der Station ──
  { id: "fax", name: "Faxgerät", stufe: "sterbend", tod: [2026, 2032], notiz: "Lebt nur noch in Arztpraxen und Ämtern." },
  { id: "festnetz", name: "Festnetztelefon", stufe: "sterbend", tod: [2028, 2038], notiz: "Klingelt fast nur noch, wenn jemand etwas verkaufen will." },
  { id: "dvd", name: "DVD", stufe: "sterbend", tod: [2026, 2032], notiz: "Die Videothek ist schon voraus gegangen." },
  { id: "tageszeitung", name: "Gedruckte Tageszeitung", stufe: "krank", tod: [2035, 2050], notiz: "Am längsten wohl am Kaffeehaustisch." },
  { id: "kassabon", name: "Kassabon aus Papier", stufe: "krank", tod: [2030, 2040], notiz: "Bon oder kein Bon? Bald fragt das keiner mehr." },
];

// Rechnet für ein Szenario (Jahre je Auslöser) das Todesjahr jedes Kranken aus.
export function rechne(jahre) {
  const tod = {};
  const welcher = {};
  const offen = new Set(kranke.map((k) => k.id));
  // mehrere Durchläufe, weil Kranke von Kranken abhängen
  for (let runde = 0; runde < 5; runde++) {
    for (const k of kranke) {
      if (!offen.has(k.id)) continue;
      if (k.tod) { tod[k.id] = k.tod[0]; offen.delete(k.id); continue; }
      const kandidaten = [];
      let fehlt = false;
      for (const [quelle, lag] of k.regel) {
        const basis = jahre[quelle] ?? tod[quelle];
        if (basis === undefined) { fehlt = true; continue; }
        if (basis >= NIE) continue;
        kandidaten.push({ jahr: basis + lag, quelle });
      }
      if (fehlt && runde < 4) continue;
      kandidaten.sort((a, b) => a.jahr - b.jahr);
      tod[k.id] = kandidaten.length ? kandidaten[0].jahr : NIE;
      welcher[k.id] = kandidaten.length ? kandidaten[0].quelle : null;
      offen.delete(k.id);
    }
  }
  return { tod, welcher };
}
