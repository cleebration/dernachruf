// Auferstandene und Gedenktage. Stand der Recherche: 2026-11-16.
// beleg: "belegt" (Quelle geöffnet/zitiert) | "bekannt" (Standardwissen) – Geschätztes kommt hier nicht hinein.

export const auferstandene = [
  {
    id: "schallplatten-knistern", name: "Schallplatte", post: "schallplatten-knistern", gestorben: 2006, auferstanden: 2007,
    text: "Die CD hatte sie fast vom Markt gefegt. Dann kamen die Jungen und wollten wieder etwas in der Hand halten. In Deutschland hat sich der Vinyl-Umsatz seit 2015 vervierfacht.",
    zustand: "kräftig", quelle: { titel: "bonedo – Vinyl, Kassetten, CDs wieder auf dem Vormarsch", url: "https://www.bonedo.de/artikel/vinyl-kassetten-cds-wieder-auf-dem-vormarsch-ueber-die-sehnsucht-musik-selbst-zu-entdecken/" },
  },
  {
    id: "sofortbild", name: "Sofortbild", gestorben: 2008, auferstanden: 2010,
    text: "Anfang 2008 stellte Polaroid die Filme ein. Ein Wiener Fotograf, Florian Kaps, kaufte mit Mitstreitern die letzte Fabrik in Enschede – und im März 2010 gab es wieder Sofortbildfilm.",
    zustand: "kräftig", quelle: { titel: "Der Standard – The Impossible Project gelingt Polaroid-Revival", url: "https://www.derstandard.at/story/1269045707243/the-impossible-project-gelingt-polaroid-revival" },
  },
  {
    id: "milch-glasflasche", name: "Milchflasche aus Glas", post: "milch-glasflasche", gestorben: 2000, auferstanden: 2020,
    text: "Nach rund zwanzig Jahren Karton steht sie seit 2020 wieder im Kühlregal – als Mehrwegflasche.",
    zustand: "kräftig", quelle: { titel: "Ja! Natürlich – Presseinfo Mehrweg-Glasflasche 2020", url: "https://www.janatuerlich.at/wp-content/uploads/2025/03/Ja-Naturlich_PI-Mehrwegflasche_17-02-2020.pdf" },
  },
  {
    id: "kassette", name: "Musikkassette", gestorben: 2010, auferstanden: 2016,
    text: "In den USA stiegen die Verkäufe 2016 um 74 Prozent. Ein großes Comeback ist es nicht – eher ein Scheintoter, der ab und zu den Finger hebt.",
    zustand: "schwach", quelle: { titel: "bonedo – Absatzzahlen steigen: Die Musikkassette boomt wieder", url: "https://www.bonedo.de/artikel/absatzzahlen-steigen-die-musikkassette-boomt-wieder/" },
  },
  {
    id: "tante-emma", name: "Greißler im Container", post: "tante-emma", gestorben: 1990, auferstanden: 2020,
    text: "Der Greißler kam als Selbstbedienungs-Kastl zurück: ein Container mit regionalen Produkten, ohne Personal. Die Kette KastlGreissler ging später pleite – die Standorte blieben offen.",
    zustand: "schwach", quelle: { titel: "Trending Topics – KastlGreissler ist pleite, Standorte bleiben offen", url: "https://www.trendingtopics.eu/nicht-wirtschaftlich-kastlgreissler-ist-pleite-standorte-bleiben-offen/" },
  },
  {
    id: "grenzbalken", name: "Grenzkontrolle", post: "grenzbalken", gestorben: 1998, auferstanden: 2015,
    text: "Seit 16. September 2015 wird an Österreichs Grenzen wieder kontrolliert – zuerst für zehn Tage verordnet, seither immer wieder verlängert.",
    zustand: "kräftig", quelle: { titel: "RIS – BGBl. II Nr. 260/2015, Wiedereinführung von Grenzkontrollen", url: "https://www.ris.bka.gv.at/Dokumente/BgblAuth/BGBLA_2015_II_260/BGBLA_2015_II_260.html" },
  },
];

// Gedenktage mit genauem Datum. art: "tod" | "geburt" | "siechtum" | "auferstehung"
export const gedenktage = [
  { tag: 1, monat: 10, jahr: 1869, art: "geburt", id: "postkarte", text: "Österreich-Ungarn bringt die Correspondenz-Karte heraus – die erste Postkarte der Welt.", beleg: "bekannt" },
  { tag: 1, monat: 1, jahr: 1969, art: "siechtum", id: "schwarzweissfernsehen", text: "Der ORF sendet erstmals in Farbe. Für das Schwarzweiß-Fernsehen beginnt das Siechtum.", beleg: "belegt", quelle: "https://en.wikipedia.org/wiki/Timeline_of_the_introduction_of_color_television_in_countries" },
  { tag: 14, monat: 12, jahr: 1972, art: "tod", id: "telefonistin", text: "Karlstein an der Thaya kommt als letzter Ort zum Selbstwählverkehr. Die Telefonistin hat ausgestöpselt.", beleg: "belegt", quelle: "https://www.ganz-wien.at/freizeit/digitale-welt/vom-telefon-zur-telekommunikation.html" },
  { tag: 15, monat: 1, jahr: 1975, art: "tod", id: "schwarzweissfernsehen", text: "Der ORF sendet durchgehend in Farbe. Das Schwarzweiß-Fernsehen ist gestorben.", beleg: "belegt", quelle: "https://en.wikipedia.org/wiki/Timeline_of_the_introduction_of_color_television_in_countries" },
  { tag: 31, monat: 10, jahr: 1979, art: "tod", id: "busschaffner", text: "Der letzte Beiwagen-Schaffner der Wiener Straßenbahn hat Dienstschluss.", beleg: "belegt", quelle: "https://www.vienna.at/geschichte-der-oeffis-strassenbahn-in-wien-von-pferdetramway-bis-ulf/4123690" },
  { tag: 21, monat: 1, jahr: 1980, art: "geburt", id: "teletext", text: "Der ORF startet den Teletext. Er wird oft totgesagt – und lebt bis heute.", beleg: "belegt", quelle: "https://orf.at/stories/3150915/" },
  { tag: 1, monat: 4, jahr: 1998, art: "tod", id: "grenzsoldat", text: "An den Landgrenzen zu Deutschland und Italien fallen die Kontrollen. Der Grenzbeamte geht.", beleg: "belegt", quelle: "https://www.salzburg24.at/news/salzburg/flachgau/chronologie-oesterreich-und-schengen-60212581" },
  { tag: 31, monat: 12, jahr: 2005, art: "tod", id: "telegramm", text: "Das letzte Telegramm in Österreich. Ab morgen gibt es keines mehr.", beleg: "belegt", quelle: "https://futurezone.at/digital-life/deutsche-post-aus-fuer-telegramm-1257-euro-fuer-160-zeichen/402275474" },
  { tag: 8, monat: 2, jahr: 2008, art: "tod", id: "sofortbild", text: "Polaroid kündigt das Ende der Sofortbildfilme an.", beleg: "belegt", quelle: "https://cafebabel.com/en/article/the-impossible-project-to-get-polaroids-back-by-2010-5ae00565f723b35a145de403" },
  { tag: 22, monat: 3, jahr: 2010, art: "auferstehung", id: "sofortbild", text: "The Impossible Project meldet: Es gibt wieder Sofortbildfilm für alte Polaroid-Kameras.", beleg: "belegt", quelle: "https://cutoutandkeep.net/snippets/issue28/the-impossible-project" },
  { tag: 16, monat: 9, jahr: 2015, art: "auferstehung", id: "grenzbalken", text: "Österreich führt wieder Grenzkontrollen ein – der Schlagbaum steht wieder auf.", beleg: "belegt", quelle: "https://www.ris.bka.gv.at/Dokumente/BgblAuth/BGBLA_2015_II_260/BGBLA_2015_II_260.html" },
  { tag: 1, monat: 12, jahr: 2024, art: "tod", id: "auskunft-108", text: "Die Telekom stellt in Deutschland die Telefonauskunft ein.", beleg: "belegt", quelle: "https://www.telekom.com/de/newsroom/aktuelles/news/2024/05/das-ende-einer-aera-telekom-stellt-auskunftsdienst-ein" },
];

const ART = { tod: "Todestag", geburt: "Geburtstag", siechtum: "Beginn des Siechtums", auferstehung: "Auferstehung" };
export const artText = (a) => ART[a];

// Gedenktage für ein Datum (heute) und den nächsten danach
export function gedenkenAm(datum = new Date()) {
  const t = datum.getDate(), m = datum.getMonth() + 1, y = datum.getFullYear();
  const heute = gedenktage.filter((g) => g.tag === t && g.monat === m);
  const schluessel = (g) => {
    const d = new Date(y, g.monat - 1, g.tag);
    if (d < new Date(y, m - 1, t)) d.setFullYear(y + 1);
    return d;
  };
  const naechste = [...gedenktage].filter((g) => !(g.tag === t && g.monat === m)).sort((a, b) => schluessel(a) - schluessel(b));
  return { heute, naechster: naechste[0], naechsterDatum: naechste[0] ? schluessel(naechste[0]) : null, jahrHeute: y };
}
