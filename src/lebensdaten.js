// Lebensdaten der Verstorbenen – Grundlage fuer den Zeitstrahl ("Lebensbalken").
// Stand der Recherche: 2026-11-15. Schwerpunkt Oesterreich, sonst DACH (siehe "region").
//
// Felder:
//   name         kurzer Name fuer Zeitstrahl und Totenschein
//   geboren      erstes Auftreten im Alltag (Jahr)
//   bluete       [von, bis] – Zeit der groessten Verbreitung
//   siechtumAb   ab wann es merklich verschwand
//   gestorben    Todesjahr; null = lebt noch (Status beachten)
//   status       "tot" | "sterbend" | "lebt" (totgesagt, lebt noch) | "auferstanden"
//   auferstanden Jahr der Wiederkehr (nur bei status "auferstanden")
//   beleg        "belegt"  = Kernjahr aus geoeffneter/zitierter Quelle
//                "bekannt" = gesichertes Standardwissen, ohne Einzelquelle hier
//                "geschaetzt" = Schaetzung DerNachruf, NICHT bestaetigt
//   quelle       { titel, url } fuer belegte Kernjahre
//   notiz        kurzer Satz fuer den Totenschein

const Q = {
  orfTelefonzelle: { titel: "wien.ORF.at – Noch 1.600 Telefonzellen in Wien", url: "https://wien.orf.at/stories/3296501/" },
  standardTelefonzelle: { titel: "Der Standard – Wer nutzt heute noch Telefonzellen?", url: "https://www.derstandard.at/story/3000000273679/wer-nutzt-heute-noch-telefonzellen" },
  telegramm: { titel: "futurezone – Deutsche Post stellt Telegramm ein (Österreich: 31.12.2005)", url: "https://futurezone.at/digital-life/deutsche-post-aus-fuer-telegramm-1257-euro-fuer-160-zeichen/402275474" },
  auskunft: { titel: "Telekom – Das Ende einer Ära: Auskunftsdienst eingestellt", url: "https://www.telekom.com/de/newsroom/aktuelles/news/2024/05/das-ende-einer-aera-telekom-stellt-auskunftsdienst-ein" },
  telex: { titel: "Computerwoche – Vor 80 Jahren wurde das Fernschreiben populär", url: "https://www.computerwoche.de/article/2872112/vor-80-jahren-wurde-das-fernschreiben-populaer-2.html" },
  teletext: { titel: "orf.at – 40 Jahre ORF Teletext", url: "https://orf.at/stories/3150915/" },
  videothek: { titel: "wien.ORF.at – Letzte Videotheken kämpfen ums Überleben", url: "https://wien.orf.at/stories/3182692/" },
  farbe: { titel: "Zeitleiste Farbfernsehen: ORF ab 1.1.1969, voll in Farbe ab 15.1.1975", url: "https://en.wikipedia.org/wiki/Timeline_of_the_introduction_of_color_television_in_countries" },
  vinyl: { titel: "BVMI – Vinyl-Studie 2021 (Tiefpunkt bis 2006, Wachstum seit 2007)", url: "https://www.Musikindustrie.de/fileadmin/bvmi/upload/06_Publikationen/Vinyl-Studie/Vinyl_Studie_2021.pdf" },
  telefonistin: { titel: "ganz-wien.at – Vom Telefon zur Telekommunikation (14.12.1972)", url: "https://www.ganz-wien.at/freizeit/digitale-welt/vom-telefon-zur-telekommunikation.html" },
  schengen: { titel: "Salzburg24 – Chronologie Österreich und Schengen", url: "https://www.salzburg24.at/news/salzburg/flachgau/chronologie-oesterreich-und-schengen-60212581" },
  schlagbaum: { titel: "vienna.at – 20 Jahre Österreich im Schengenraum", url: "https://www.vienna.at/20-jahre-oesterreich-im-schengenraum/5567175" },
  schaffner: { titel: "vienna.at – Geschichte der Straßenbahn in Wien (31.10.1979)", url: "https://www.vienna.at/geschichte-der-oeffis-strassenbahn-in-wien-von-pferdetramway-bis-ulf/4123690" },
  kursbuch: { titel: "Uni Basel – Begleitdokumentation Kursbuch und Fahrpläne", url: "https://ub-sachdokpdf.ub.unibas.ch/sachdok/2013/BAU_1_6169416.pdf" },
  greissler: { titel: "Der Standard – Sterben die Nahversorger in Österreich aus?", url: "https://www.derstandard.at/story/3000000240225/sterben-die-nahversorger-in-oesterreich-aus" },
  milchflasche: { titel: "Ja! Natürlich – Presseinfo Mehrweg-Glasflasche, 27.2.2020", url: "https://www.janatuerlich.at/wp-content/uploads/2025/03/Ja-Naturlich_PI-Mehrwegflasche_17-02-2020.pdf" },
  rechenschieber: { titel: "Following the Rules – Slide Rules 1970–1979 (Produktionsende)", url: "https://www.followingtherules.info/years-1970-1979.html" },
  rohrpost: { titel: "wien.ORF.at – KFJ-Spital setzt auf historische Rohrpost (1875–1956)", url: "https://wien.orf.at/news/stories/2789315/" },
};

export const lebensdaten = {
  // ─── KOMMUNIKATION ───────────────────────────────────────────
  "telefonzelle": { name: "Telefonzelle", geboren: 1903, bluete: [1957, 1995], siechtumAb: 1995, gestorben: null, status: "sterbend", region: "AT", beleg: "belegt", quelle: Q.orfTelefonzelle, notiz: "1903 erster Münzfernsprecher in Wien. Seit dem Telekomgesetz 2021 keine Pflicht mehr – A1 baut ab." },
  "telegramm": { name: "Telegramm", geboren: 1850, bluete: [1900, 1970], siechtumAb: 1975, gestorben: 2005, status: "tot", region: "AT", beleg: "belegt", quelle: Q.telegramm, notiz: "In Österreich am 31.12.2005 eingestellt, in Deutschland erst Ende 2022." },
  "telefonbuch": { name: "Telefonbuch", geboren: 1881, bluete: [1950, 1995], siechtumAb: 1998, gestorben: null, status: "sterbend", region: "AT", beleg: "geschaetzt", notiz: "Lebt online weiter; die gedruckte Ausgabe wurde immer dünner." },
  "auskunft-108": { name: "Telefonauskunft", geboren: 1955, bluete: [1965, 1995], siechtumAb: 1996, gestorben: 2024, status: "tot", region: "DE", beleg: "belegt", quelle: Q.auskunft, notiz: "1995 noch 550 Millionen Anfragen; die Telekom stellte die Auskunft am 1.12.2024 ein." },
  "telex": { name: "Telex", geboren: 1933, bluete: [1950, 1980], siechtumAb: 1985, gestorben: 2005, status: "tot", region: "DACH", beleg: "geschaetzt", quelle: Q.telex, notiz: "Oeffentlicher Fernschreibdienst ab 1933; das Fax verdrängte ihn ab Ende der 1970er." },
  "brieftraeger-zweimal": { name: "Zweimal-Briefträger", geboren: 1900, bluete: [1900, 1960], siechtumAb: 1960, gestorben: 1975, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Zweimal täglich wurde zur Ausnahme – dann zur Erinnerung." },
  "postkarte": { name: "Urlaubspostkarte", geboren: 1869, bluete: [1950, 1995], siechtumAb: 2000, gestorben: null, status: "sterbend", region: "AT", beleg: "bekannt", notiz: "Die Correspondenz-Karte kam 1869 aus Österreich-Ungarn in die Welt." },

  // ─── HAUSHALT ────────────────────────────────────────────────
  "tapete": { name: "Mustertapete", geboren: 1800, bluete: [1955, 1985], siechtumAb: 1990, gestorben: null, status: "sterbend", region: "DACH", beleg: "geschaetzt", notiz: "Die gemusterte Tapete wich der weißen Wand." },
  "kohleofen": { name: "Kohleofen", geboren: 1850, bluete: [1900, 1965], siechtumAb: 1965, gestorben: null, status: "sterbend", region: "AT", beleg: "geschaetzt", notiz: "Zentralheizung und Fernwärme löschten ihn Wohnung um Wohnung." },
  "waeschemangel": { name: "Wäschemangel", geboren: 1880, bluete: [1920, 1965], siechtumAb: 1965, gestorben: 1985, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Mit Waschmaschine und Bügeleisen wurde der Waschkeller still." },
  "milchmann-haustuer": { name: "Milch an der Haustür", geboren: 1900, bluete: [1920, 1960], siechtumAb: 1960, gestorben: 1975, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Kühlschrank und Supermarkt machten den Weg zur Haustür überflüssig." },
  "eislieferant": { name: "Eislieferant", geboren: 1870, bluete: [1880, 1950], siechtumAb: 1955, gestorben: 1965, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Der elektrische Kühlschrank schmolz sein Geschäft." },
  "kohlelieferung": { name: "Kohlenlieferung", geboren: 1870, bluete: [1900, 1965], siechtumAb: 1965, gestorben: 1995, status: "tot", region: "AT", beleg: "geschaetzt", notiz: "Starb mit dem Kohleofen." },
  "aschkasten": { name: "Aschkasten", geboren: 1870, bluete: [1900, 1965], siechtumAb: 1965, gestorben: 1995, status: "tot", region: "AT", beleg: "geschaetzt", notiz: "Ohne Ofen keine Asche." },
  "ofenrohr": { name: "Ofenrohr", geboren: 1870, bluete: [1900, 1965], siechtumAb: 1965, gestorben: 1995, status: "tot", region: "AT", beleg: "geschaetzt", notiz: "Das Provisorium, das Jahrzehnte hielt." },

  // ─── MEDIEN ──────────────────────────────────────────────────
  "videothek": { name: "Videothek", geboren: 1975, bluete: [1985, 2005], siechtumAb: 2008, gestorben: null, status: "sterbend", region: "AT", beleg: "belegt", quelle: Q.videothek, notiz: "In den 1990ern rund 1.000 Videotheken in Wien – heute nur mehr eine Handvoll." },
  "diaabende": { name: "Diaabend", geboren: 1936, bluete: [1955, 1985], siechtumAb: 1990, gestorben: 2010, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Erst kam das Video, dann das Handy-Album." },
  "teletext": { name: "Teletext", geboren: 1980, bluete: [1990, 2010], siechtumAb: 2010, gestorben: null, status: "lebt", region: "AT", beleg: "belegt", quelle: Q.teletext, notiz: "Seit 21.1.1980. Totgesagt – und noch immer rund eine Million Leser pro Woche." },
  "jukebox": { name: "Jukebox", geboren: 1930, bluete: [1950, 1975], siechtumAb: 1980, gestorben: 2000, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Das Wirtshaus bekam Radio, dann Playlists." },
  "schwarzweissfernsehen": { name: "Schwarzweiß-Fernsehen", geboren: 1955, bluete: [1957, 1972], siechtumAb: 1969, gestorben: 1975, status: "tot", region: "AT", beleg: "belegt", quelle: Q.farbe, notiz: "Der ORF sendete ab 1.1.1969 in Farbe, ab 15.1.1975 durchgehend." },
  "radiozentrum": { name: "Radio als Mittelpunkt", geboren: 1924, bluete: [1930, 1960], siechtumAb: 1960, gestorben: 1975, status: "tot", region: "AT", beleg: "geschaetzt", notiz: "Der Fernseher nahm ihm den Platz in der Stube." },
  "kinofilmriss": { name: "Filmriss im Kino", geboren: 1895, bluete: [1920, 1985], siechtumAb: 2005, gestorben: 2013, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Die Digitalprojektion kennt keinen Riss." },
  "schallplatten-knistern": { name: "Schallplatte", geboren: 1948, bluete: [1955, 1985], siechtumAb: 1988, gestorben: 2006, status: "auferstanden", auferstanden: 2007, region: "DE", beleg: "belegt", quelle: Q.vinyl, notiz: "Bis 2006 fast vom Markt verschwunden – seit 2007 wächst Vinyl wieder." },

  // ─── BERUFE ──────────────────────────────────────────────────
  "scherenschleifer": { name: "Scherenschleifer", geboren: 1800, bluete: [1850, 1955], siechtumAb: 1960, gestorben: 1985, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Billige Klingen ersetzten das Nachschärfen." },
  "lumpensammler": { name: "Lumpensammler", geboren: 1800, bluete: [1870, 1950], siechtumAb: 1955, gestorben: 1975, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Altstoffsammlung und Müllabfuhr übernahmen." },
  "liftboy": { name: "Liftboy", geboren: 1890, bluete: [1910, 1955], siechtumAb: 1955, gestorben: 1980, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Der Aufzug lernte, selbst zu fahren." },
  "telefonistin": { name: "Telefonistin", geboren: 1881, bluete: [1900, 1950], siechtumAb: 1950, gestorben: 1972, status: "tot", region: "AT", beleg: "belegt", quelle: Q.telefonistin, notiz: "Am 14.12.1972 kam Karlstein/Thaya als letzter Ort zum Selbstwählverkehr." },
  "filmvorfuehrer": { name: "Filmvorführer", geboren: 1900, bluete: [1920, 1985], siechtumAb: 2005, gestorben: 2013, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Starb mit der Filmrolle." },
  "milchmann-beruf": { name: "Milchmann", geboren: 1900, bluete: [1920, 1960], siechtumAb: 1960, gestorben: 1975, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Vor dem Morgengrauen unterwegs – bis der Kühlschrank kam." },
  "grenzsoldat": { name: "Grenzbeamter", geboren: 1919, bluete: [1920, 1990], siechtumAb: 1995, gestorben: 1998, status: "tot", region: "AT", beleg: "belegt", quelle: Q.schengen, notiz: "Am 1.4.1998 fielen die Kontrollen an den Landgrenzen zu Deutschland und Italien." },
  "schornsteinfeger": { name: "Rauchfangkehrer", geboren: 1800, bluete: [1900, 1970], siechtumAb: 1970, gestorben: null, status: "lebt", region: "AT", beleg: "bekannt", notiz: "Totgesagt, aber quicklebendig: Der Rauchfangkehrer kehrt weiter." },

  // ─── VERKEHR ─────────────────────────────────────────────────
  "busschaffner": { name: "Schaffner", geboren: 1900, bluete: [1920, 1960], siechtumAb: 1960, gestorben: 1979, status: "tot", region: "AT", beleg: "belegt", quelle: Q.schaffner, notiz: "Am 31.10.1979 hatte der letzte Beiwagen-Schaffner in Wien Dienstschluss." },
  "tankwart": { name: "Tankwart", geboren: 1925, bluete: [1950, 1975], siechtumAb: 1975, gestorben: null, status: "sterbend", region: "DACH", beleg: "geschaetzt", notiz: "Selbstbedienung machte ihn zum Kassier." },
  "kursbuch": { name: "Kursbuch", geboren: 1850, bluete: [1900, 1990], siechtumAb: 1995, gestorben: 2011, status: "tot", region: "AT", beleg: "belegt", quelle: Q.kursbuch, notiz: "Die DB druckte es letztmals 2008/09, in Österreich scheiterte das gedruckte Kursbuch um 2011." },
  "reiseauskunft": { name: "Reiseauskunft am Schalter", geboren: 1900, bluete: [1920, 1990], siechtumAb: 1995, gestorben: null, status: "sterbend", region: "AT", beleg: "geschaetzt", notiz: "Die App weiß es schneller – aber sie lächelt nicht." },
  "grenzbalken": { name: "Schlagbaum", geboren: 1919, bluete: [1920, 1990], siechtumAb: 1995, gestorben: 1997, status: "tot", region: "AT", beleg: "belegt", quelle: Q.schlagbaum, notiz: "Im Dezember 1997 sägte der Innenminister symbolisch einen rot-weiß-roten Grenzbalken durch." },
  "strassenbahn-tuer": { name: "Straßenbahntür zum Aufreißen", geboren: 1900, bluete: [1920, 1960], siechtumAb: 1960, gestorben: 1985, status: "tot", region: "AT", beleg: "geschaetzt", notiz: "Automatische Türen nahmen ihr die Geste." },
  "reisebuero": { name: "Reisebüro", geboren: 1900, bluete: [1965, 2000], siechtumAb: 2005, gestorben: null, status: "sterbend", region: "DACH", beleg: "geschaetzt", notiz: "Buchungsportale ersetzten den Katalog auf dem Tresen." },

  // ─── HANDEL ──────────────────────────────────────────────────
  "tante-emma": { name: "Greißler", geboren: 1880, bluete: [1950, 1970], siechtumAb: 1970, gestorben: null, status: "sterbend", region: "AT", beleg: "belegt", quelle: Q.greissler, notiz: "2022 hatten 382 österreichische Gemeinden keinen Lebensmittelhändler mehr." },
  "kolonialwaren": { name: "Kolonialwarenladen", geboren: 1850, bluete: [1880, 1930], siechtumAb: 1950, gestorben: 1970, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Das Wort starb vor dem Laden." },
  "milch-glasflasche": { name: "Milchflasche aus Glas", geboren: 1900, bluete: [1950, 1975], siechtumAb: 1975, gestorben: 2000, status: "auferstanden", auferstanden: 2020, region: "AT", beleg: "belegt", quelle: Q.milchflasche, notiz: "Seit März 2020 gibt es in Österreich wieder Milch in der Mehrweg-Glasflasche." },
  "fleischhauer": { name: "Fleischhauer ums Eck", geboren: 1800, bluete: [1900, 1980], siechtumAb: 1985, gestorben: null, status: "sterbend", region: "AT", beleg: "geschaetzt", notiz: "Die Feinkosttheke im Supermarkt übernahm." },
  "marktschreier": { name: "Marktschreier", geboren: 1800, bluete: [1900, 1960], siechtumAb: 1970, gestorben: null, status: "sterbend", region: "AT", beleg: "geschaetzt", notiz: "Auf manchen Märkten ruft noch einer." },
  "kaufhaus": { name: "Kaufhaus", geboren: 1880, bluete: [1950, 1990], siechtumAb: 2000, gestorben: null, status: "sterbend", region: "DACH", beleg: "geschaetzt", notiz: "Einkaufszentrum und Onlinehandel zerlegten die Welt unter einem Dach." },
  "anschreiben": { name: "Anschreiben lassen", geboren: 1850, bluete: [1900, 1965], siechtumAb: 1970, gestorben: 1990, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Die Bankomatkarte kennt kein Vertrauen auf Pump." },

  // ─── KINDHEIT ────────────────────────────────────────────────
  "tintenfass": { name: "Tintenfass", geboren: 1850, bluete: [1900, 1955], siechtumAb: 1955, gestorben: 1970, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Füllfeder und Kugelschreiber trockneten es aus." },
  "schiefertafel": { name: "Schiefertafel", geboren: 1850, bluete: [1880, 1955], siechtumAb: 1960, gestorben: 1975, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Das Heft gewann gegen den Schwamm." },
  "strassenspiele": { name: "Spielen auf der Straße", geboren: 1900, bluete: [1950, 1970], siechtumAb: 1965, gestorben: null, status: "sterbend", region: "DACH", beleg: "geschaetzt", notiz: "Die Straße gehörte bald den Autos." },
  "fangenspiel": { name: "Fangen auf der Fahrbahn", geboren: 1900, bluete: [1950, 1970], siechtumAb: 1965, gestorben: null, status: "sterbend", region: "DACH", beleg: "geschaetzt", notiz: "Gespielt wird noch – nur nicht mehr auf der Fahrbahn." },
  "schulranzen": { name: "Lederschulranzen", geboren: 1900, bluete: [1950, 1975], siechtumAb: 1975, gestorben: 1990, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Der leichte Kunststoffrucksack löste das Leder ab." },
  "strafarbeit": { name: "Strafarbeit", geboren: 1850, bluete: [1900, 1965], siechtumAb: 1970, gestorben: 1990, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Hundertmal geschrieben – und irgendwann nicht mehr verlangt." },
  "schülerausweis": { name: "Schülerausweis aus Pappe", geboren: 1950, bluete: [1960, 2000], siechtumAb: 2005, gestorben: 2015, status: "tot", region: "AT", beleg: "geschaetzt", notiz: "Pappe und Stempel wichen der Karte und der App." },

  // ─── TECHNIK ─────────────────────────────────────────────────
  "schreibmaschine": { name: "Schreibmaschine", geboren: 1874, bluete: [1920, 1985], siechtumAb: 1985, gestorben: 2011, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Der PC übernahm Büro um Büro." },
  "rechenschieber": { name: "Rechenschieber", geboren: 1622, bluete: [1900, 1972], siechtumAb: 1972, gestorben: 1978, status: "tot", region: "DE", beleg: "belegt", quelle: Q.rechenschieber, notiz: "Faber-Castell stellte die Produktion bis 1977 ein, Aristo und Nestler 1978." },
  "kohlepapier": { name: "Kohlepapier", geboren: 1870, bluete: [1900, 1975], siechtumAb: 1975, gestorben: 2000, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Kopierer und Drucker machten die Durchschrift überflüssig." },
  "lochkarten": { name: "Lochkarte", geboren: 1890, bluete: [1930, 1975], siechtumAb: 1975, gestorben: 1990, status: "tot", region: "DACH", beleg: "bekannt", notiz: "1890 zählte Hollerith damit eine Volkszählung aus." },
  "rohrpost": { name: "Rohrpost", geboren: 1875, bluete: [1900, 1940], siechtumAb: 1945, gestorben: 1956, status: "tot", region: "AT", beleg: "belegt", quelle: Q.rohrpost, notiz: "Wiens Rohrpostnetz lief von 1875 bis 1956 – in Spitälern lebt sie weiter." },
  "waehlscheibe": { name: "Wählscheibe", geboren: 1910, bluete: [1930, 1980], siechtumAb: 1980, gestorben: 2000, status: "tot", region: "DACH", beleg: "geschaetzt", notiz: "Das Tastentelefon war schneller als die Geduld." },
  "diktiergeraet": { name: "Diktiergerät", geboren: 1950, bluete: [1955, 1990], siechtumAb: 1995, gestorben: null, status: "sterbend", region: "DACH", beleg: "geschaetzt", notiz: "Spracherkennung tippt heute selbst." },
};

export const STATUS_TEXT = {
  tot: "verstorben",
  sterbend: "im Sterben",
  lebt: "totgesagt, lebt noch",
  auferstanden: "auferstanden",
};

export const BELEG_TEXT = {
  belegt: "belegt",
  bekannt: "bekannt",
  geschaetzt: "geschätzt – nicht bestätigt",
};
