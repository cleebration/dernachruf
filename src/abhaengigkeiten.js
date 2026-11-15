// Abhängigkeiten zwischen den Verstorbenen – Grundlage für "Erbfolge" und Domino.
// Stand: 2026-11-15. Alle Jahreszahlen dieser Datei sind Näherungen (um …), nicht einzeln belegt.
//
// knoten: zusätzliche Dinge, die (noch) keinen eigenen Nachruf haben
//   typ "neu"  = Neuankömmling, der Altes verdrängte (lebt meist noch) – jahr = Durchbruch im Alltag
//   typ "alt"  = selbst verstorben, aber noch ohne Nachruf – gestorben = Todesjahr
// kanten: [von, zu, art]
//   art "verdraengt" = von (neu) hat zu verdrängt
//   art "rissmit"    = mit dem Tod von "von" starb auch "zu"

export const knoten = {
  // ── Neuankömmlinge ──
  auto: { typ: "neu", name: "Auto für alle", jahr: 1960 },
  kuehlschrank: { typ: "neu", name: "Kühlschrank", jahr: 1960 },
  waschmaschine: { typ: "neu", name: "Waschmaschine", jahr: 1965 },
  zentralheizung: { typ: "neu", name: "Zentralheizung & Fernwärme", jahr: 1970 },
  supermarkt: { typ: "neu", name: "Supermarkt", jahr: 1965 },
  selbstbedienung: { typ: "neu", name: "Selbstbedienung", jahr: 1975 },
  fernseher: { typ: "neu", name: "Fernseher", jahr: 1960 },
  farbfernsehen: { typ: "neu", name: "Farbfernsehen", jahr: 1969 },
  selbstwaehlamt: { typ: "neu", name: "Selbstwählamt", jahr: 1950 },
  automatenkasse: { typ: "neu", name: "Fahrscheinautomat & Entwerter", jahr: 1965 },
  automatiklift: { typ: "neu", name: "Selbstfahrender Aufzug", jahr: 1955 },
  automatiktuer: { typ: "neu", name: "Automatische Tür", jahr: 1965 },
  kugelschreiber: { typ: "neu", name: "Kugelschreiber", jahr: 1955 },
  schulheft: { typ: "neu", name: "Schulheft", jahr: 1955 },
  taschenrechner: { typ: "neu", name: "Taschenrechner", jahr: 1972 },
  kopierer: { typ: "neu", name: "Kopierer", jahr: 1970 },
  fax: { typ: "neu", name: "Fax", jahr: 1980 },
  pc: { typ: "neu", name: "Personal Computer", jahr: 1985 },
  getraenkekarton: { typ: "neu", name: "Getränkekarton", jahr: 1970 },
  wegwerfware: { typ: "neu", name: "Wegwerfware & Müllabfuhr", jahr: 1965 },
  kassette: { typ: "neu", name: "Kassettenrekorder", jahr: 1975 },
  cd: { typ: "neu", name: "CD", jahr: 1985 },
  handy: { typ: "neu", name: "Handy", jahr: 1997 },
  internet: { typ: "neu", name: "Internet", jahr: 1998 },
  smartphone: { typ: "neu", name: "Smartphone", jahr: 2010 },
  streaming: { typ: "neu", name: "Streaming", jahr: 2012 },
  onlinehandel: { typ: "neu", name: "Onlinehandel", jahr: 2010 },
  digitalprojektion: { typ: "neu", name: "Digitales Kino", jahr: 2010 },
  schengen: { typ: "neu", name: "Schengen", jahr: 1997 },
  bankomat: { typ: "neu", name: "Bankomatkarte", jahr: 1985 },
  spracherkennung: { typ: "neu", name: "Spracherkennung", jahr: 2015 },
  rucksack: { typ: "neu", name: "Schulrucksack", jahr: 1980 },
  schulkarte: { typ: "neu", name: "Chipkarte & App", jahr: 2010 },

  // ── Verstorbene ohne eigenen Nachruf (Kandidaten für neue Nachrufe) ──
  pferd: { typ: "alt", name: "Pferd als Zugtier", gestorben: 1960 },
  hufschmied: { typ: "alt", name: "Hufschmied", gestorben: 1970 },
  kutscher: { typ: "alt", name: "Kutscher", gestorben: 1940 },
  sattler: { typ: "alt", name: "Sattler für Geschirre", gestorben: 1970 },
  pferdeaepfel: { typ: "alt", name: "Pferdeäpfel-Sammler", gestorben: 1940 },
};

export const kanten = [
  // Pferd und seine Welt
  ["auto", "pferd", "verdraengt"],
  ["pferd", "hufschmied", "rissmit"],
  ["pferd", "kutscher", "rissmit"],
  ["pferd", "sattler", "rissmit"],
  ["pferd", "pferdeaepfel", "rissmit"],
  ["auto", "strassenspiele", "verdraengt"],
  ["auto", "fangenspiel", "verdraengt"],

  // Kälte und Wärme
  ["kuehlschrank", "eislieferant", "verdraengt"],
  ["kuehlschrank", "milchmann-haustuer", "verdraengt"],
  ["milchmann-haustuer", "milchmann-beruf", "rissmit"],
  ["zentralheizung", "kohleofen", "verdraengt"],
  ["kohleofen", "kohlelieferung", "rissmit"],
  ["kohleofen", "aschkasten", "rissmit"],
  ["kohleofen", "ofenrohr", "rissmit"],
  ["waschmaschine", "waeschemangel", "verdraengt"],

  // Einkaufen
  ["supermarkt", "tante-emma", "verdraengt"],
  ["supermarkt", "kolonialwaren", "verdraengt"],
  ["supermarkt", "fleischhauer", "verdraengt"],
  ["supermarkt", "marktschreier", "verdraengt"],
  ["supermarkt", "milchmann-haustuer", "verdraengt"],
  ["tante-emma", "anschreiben", "rissmit"],
  ["bankomat", "anschreiben", "verdraengt"],
  ["getraenkekarton", "milch-glasflasche", "verdraengt"],
  ["onlinehandel", "kaufhaus", "verdraengt"],
  ["selbstbedienung", "tankwart", "verdraengt"],
  ["wegwerfware", "scherenschleifer", "verdraengt"],
  ["wegwerfware", "lumpensammler", "verdraengt"],

  // Telefon und Post
  ["selbstwaehlamt", "telefonistin", "verdraengt"],
  ["handy", "telefonzelle", "verdraengt"],
  ["internet", "telefonbuch", "verdraengt"],
  ["internet", "auskunft-108", "verdraengt"],
  ["telefonbuch", "auskunft-108", "rissmit"],
  ["fax", "telex", "verdraengt"],
  ["telex", "telegramm", "rissmit"],
  ["handy", "telegramm", "verdraengt"],
  ["smartphone", "postkarte", "verdraengt"],

  // Medien
  ["fernseher", "radiozentrum", "verdraengt"],
  ["farbfernsehen", "schwarzweissfernsehen", "verdraengt"],
  ["kassette", "jukebox", "verdraengt"],
  ["cd", "schallplatten-knistern", "verdraengt"],
  ["streaming", "videothek", "verdraengt"],
  ["smartphone", "diaabende", "verdraengt"],
  ["internet", "teletext", "verdraengt"],
  ["digitalprojektion", "kinofilmriss", "verdraengt"],
  ["digitalprojektion", "filmvorfuehrer", "verdraengt"],
  ["kinofilmriss", "filmvorfuehrer", "rissmit"],

  // Verkehr und Reisen
  ["automatenkasse", "busschaffner", "verdraengt"],
  ["automatiklift", "liftboy", "verdraengt"],
  ["automatiktuer", "strassenbahn-tuer", "verdraengt"],
  ["internet", "kursbuch", "verdraengt"],
  ["internet", "reiseauskunft", "verdraengt"],
  ["internet", "reisebuero", "verdraengt"],
  ["schengen", "grenzbalken", "verdraengt"],
  ["grenzbalken", "grenzsoldat", "rissmit"],

  // Schule und Büro
  ["kugelschreiber", "tintenfass", "verdraengt"],
  ["schulheft", "schiefertafel", "verdraengt"],
  ["rucksack", "schulranzen", "verdraengt"],
  ["schulkarte", "schülerausweis", "verdraengt"],
  ["taschenrechner", "rechenschieber", "verdraengt"],
  ["pc", "schreibmaschine", "verdraengt"],
  ["pc", "lochkarten", "verdraengt"],
  ["kopierer", "kohlepapier", "verdraengt"],
  ["schreibmaschine", "kohlepapier", "rissmit"],
  ["spracherkennung", "diktiergeraet", "verdraengt"],
  ["schreibmaschine", "diktiergeraet", "rissmit"],
];
