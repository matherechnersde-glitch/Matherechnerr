export interface FaqItem {
  q: string;
  a: string;
}

export interface HighlightItem {
  h3: string;
  p: string;
}

export const content = {
  site: {
    name: 'Matherechner',
    url: 'https://matherechnerr.de',
    title: 'Matherechner Kostenloser wissenschaftlicher Taschenrechner',
    description:
      'Probieren Sie Matherechner aus – ein kostenloses Online-Tool, mit dem Sie komplexe Aufgaben mühelos lösen können.',
    ogImage: '/og-image.webp',
    locale: 'de_DE',
    themeColor: '#146EB4',
  },

  header: {
    navLinks: [
      { label: 'Matherechner', href: '/' },
      { label: 'Über uns', href: '/ueber-uns/' },
      { label: 'Kontakt', href: '/kontakt/' },
    ],
  },

  hero: {
    h1: 'Matherechner – kostenlos online',
    intro: [
      'Stellen Sie sich vor, Sie lösen gerade eine komplexe Mathe-Hausaufgabe, aber der Taschenrechner Ihres Smartphones beherrscht nur die Grundrechenarten Addition, Subtraktion, Multiplikation und Division – mehr nicht. Matherechner wurde genau für dieses Problem entwickelt und bietet nicht nur Standardfunktionen, sondern auch erweiterte Funktionen wie trigonometrische Funktionen, Potenzen und Prozentrechnungen.',
      'Matherechner ist ein kostenloser Online-wissenschaftlicher Taschenrechner, der fast alles bewältigt, was ein normaler Taschenrechner nicht kann. Er funktioniert direkt in Ihrem Browser auf jedem Smartphone, Tablet oder Laptop – ganz ohne Download, Registrierung und kostenlos. Sie müssen keinen Taschenrechner oder eine App für alltägliche Rechenaufgaben kaufen, denn diese Seite ist kostenlos, läuft in Ihrem Browser und erfordert keinerlei Installation.',
      'Lassen Sie mich Ihnen daher kurz erläutern, was er alles kann und warum er still und leise das ersetzen könnte, was Sie derzeit nutzen, und zu Ihrer ersten Wahl für Berechnungen werden könnte.',
    ],
  },

  sectionCompare: {
    soft: false,
    h2: 'Was unterscheidet einen wissenschaftlichen Taschenrechner von einem einfachen Taschenrechner?',
    intro:
      'Ein normaler Taschenrechner – der, der bereits auf deinem Smartphone installiert ist oder in einer Schreibtischschublade liegt – bietet nur sehr grundlegende Funktionen und vielleicht eine Prozent-Taste, die in verschiedenen Situationen kaum jemand richtig versteht. Das reicht für einfache Rechenaufgaben wie das Aufteilen einer Restaurantrechnung. Sobald jedoch ein komplexes oder fortgeschrittenes Problem gelöst werden muss, versagt er.',
    comparison: [
      {
        h3: 'Einfacher Taschenrechner',
        p: 'Addition, Subtraktion, Multiplikation, Division. Vielleicht eine Speichertaste.',
      },
      {
        h3: 'Wissenschaftlicher Taschenrechner',
        p: 'Er beherrscht viele Funktionen, dazu noch Wurzeln, Potenzen, Brüche, trigonometrische Funktionen, Logarithmen, Pi, Klammern für die korrekte Reihenfolge der Rechenoperationen und eine Prozentlogik, die sich tatsächlich vorhersehbar verhält.',
      },
    ] satisfies HighlightItem[],
    conclusion:
      'Allein die Unterstützung von Klammern ist die sinnvollste Ergänzung. Wenn wir 3 + 4 × 2 in einen billigen einfachen Taschenrechner eingeben, geben einige Modelle fröhlich 14 statt 11 aus, weil sie die Reihenfolge der Rechenoperationen ignorieren. Ein richtiger wissenschaftlicher Taschenrechner macht diesen Fehler niemals.',
  },

  sectionFunctions: {
    soft: true,
    h2: 'Taschenrechner mit Wurzel, Pi und Klammern: Die Funktionen, auf die es ankommt',
    intro:
      'Dies sind die Funktionen, bei denen die meisten einfachen Taschenrechner versagen, und hier sticht diese Spezialversion hervor.',
    subsections: [
      {
        h3: 'Quadratwurzeln und Potenzen',
        p: 'Das Berechnen von Quadratwurzeln erfolgt hier mit einem einzigen Tastendruck; √144 liefert sofort 12, und verschachtelte Ausdrücke wie √(25 + 144) funktionieren dank der Klammerunterstützung einwandfrei. Das Berechnen von Potenzen wie x², x³ oder beliebigen Exponenten ist problemlos möglich.',
      },
      {
        h3: 'Pi für die Geometrie',
        p: 'Kreisprobleme kommen in der Schulmathematik sehr häufig vor, und das manuelle Eintippen von 3,14159 ist sowohl langsam als auch leicht fehleranfällig. Der Wert von Pi ist bereits als Konstante gespeichert, sodass die Berechnung der Kreisfläche oder eines Kreissektors ganz einfach ist.',
      },
      {
        h3: 'Brüche',
        p: 'Brüche sind knifflig – in diesem Bereich verlieren Schüler die meisten Punkte. Mit dieser Funktion kannst du beispielsweise ¾ + ⅖ direkt eingeben und erhältst ein sauberes Ergebnis in Bruchform, ohne alles erst in Dezimalzahlen umrechnen zu müssen und dabei an Genauigkeit zu verlieren.',
      },
      {
        h3: 'Trigonometrie – Sinus, Kosinus, Tangens',
        p: 'Die App deckt Sinus, Kosinus und Tangens sowie deren Umkehrfunktionen ab – das sind die Kernbegriffe der Trigonometrie. Bitte überprüfe vor jeder trigonometrischen Berechnung immer, ob du dich im Grad- oder Radiantenmodus befindest.',
      },
      {
        h3: 'Prozentrechnungen',
        p: 'Die %-Funktion deckt die klassischen Fälle ab: Wie viel sind 19 % von 250, wie viel Prozent sind 45 von 180, sowie das Hinzufügen oder Abziehen eines Prozentsatzes von einem Basiswert.',
      },
    ] satisfies HighlightItem[],
  },

  sectionWho: {
    soft: false,
    h2: 'Wer profitiert eigentlich von einem solchen Online-Rechner?',
    highlights: [
      {
        h3: 'Schüler',
        p: 'Ob Wurzel-Aufgaben in der 9. Klasse oder Trigonometrie in der Oberstufe – wenn man einen kostenlosen Schul-Taschenrechner in einem Browser-Tab geöffnet hat, hören die Hausaufgaben nicht einfach auf, nur weil der physische Taschenrechner im Schulspind liegt.',
      },
      {
        h3: 'Lehrer',
        p: 'Berechnungen an die Tafel projizieren. Ein Online-Rechner auf einem Smartboard ist für die Klasse viel leichter zu verfolgen, als das Beschreiben von Tastendrücken auf einem Handgerät, das niemand sehen kann.',
      },
      {
        h3: 'Berufstätige & Alltagsnutzer',
        p: 'Steuerzeit, Gehaltsverhandlungen, Vergleich von Kreditzinsen, Berechnung eines Rabatts – für all das braucht man keinen wissenschaftlichen Taschenrechner, aber alles geht schneller mit einem zuverlässigen Tool, das den gesamten Ausdruck anzeigt, bevor man ihn bestätigt.',
      },
    ] satisfies HighlightItem[],
  },

  sectionWhy: {
    soft: true,
    h2: 'Warum ein kostenloser Online-Taschenrechner den Kauf eines physischen Geräts übertrifft',
    paragraphs: [
      'Ein normaler wissenschaftlicher Taschenrechner kostet 20–40 €, und Modelle mit Grafikfunktion können bis zu 100 € kosten. Das machte 1998 noch Sinn. Dieses Tool bietet dir dieselben Kernfunktionen mit besseren Features. Es ist immer dabei, das Display ist größer und besser lesbar, und Updates erfolgen automatisch. Ein wichtiger Punkt, den du beachten solltest: Viele Schulen verlangen für Prüfungen nach wie vor ein zugelassenes physisches Gerät. Überprüfe also die Regeln deiner Schule, bevor du den Casio komplett abschreibst.',
    ],
  },

  sectionHow: {
    soft: false,
    h2: 'So verwenden Sie den Taschenrechner',
    steps: [
      'Geben Sie Ihren Ausdruck ein – Klammern, Funktionen, Konstanten, einfach alles – und sehen Sie sich den vollständigen Ausdruck auf dem Bildschirm an, bevor Sie die Berechnung starten.',
      'Wechseln Sie mithilfe der Modusumschaltung zwischen Grad- und Radiant-Modus für die Trigonometrie.',
      'Drücken Sie die Gleichheits-Taste. Das Ergebnis wird angezeigt, und Ihre vorherigen Berechnungen bleiben sichtbar, sodass Sie Ihren Rechenweg überprüfen können. Auf Mobilgeräten funktioniert alles genauso – das Layout passt sich lediglich an Ihren Bildschirm an.',
      'Das ist wirklich alles. Kein Konto, keine Werbung, die die Tastatur verdeckt, keine „Premium-Funktionen", die hinter einer Bezahlschranke versteckt sind.',
    ],
  },

  faq: {
    h2: 'FAQ',
    items: [
      {
        q: 'Ist dieser Taschenrechner online kostenlos, oder gibt es versteckte Kosten?',
        a: 'Er ist komplett kostenlos – keine Registrierung, keine Testphase, kein Premium-Zugang. Jede Funktion, die du siehst, ist sofort nutzbar, auf jedem Gerät mit einem Browser.',
      },
      {
        q: 'Kann ich den Taschenrechner als Schul-Taschenrechner für Hausaufgaben nutzen?',
        a: 'Auf jeden Fall, und genau dafür nutzen ihn die meisten Leute. Er deckt alles ab, was ein handelsüblicher wissenschaftlicher Schul-Taschenrechner kann. Beachte jedoch, dass viele Schulen für offizielle Prüfungen ein zugelassenes physisches Gerät vorschreiben – informiere dich über die Richtlinien deiner Schule.',
      },
      {
        q: 'Kann der Rechner auch gemischte Brüche berechnen?',
        a: 'Ja. Du kannst gemischte Zahlen wie 2½ eingeben, indem du sie als Ausdruck (2 + 1/2) in Klammern schreibst, und der Rechner berechnet sie exakt. Die Ergebnisse bleiben präzise und werden nicht auf unschöne Dezimalzahlen gerundet.',
      },
      {
        q: 'Wie berechne ich Prozentsätze mit dem %-Rechner?',
        a: 'Gib den Basiswert, die Rechenoperation und den Prozentsatz ein – zum Beispiel ergibt 250 × 19 % direkt 47,50.',
      },
      {
        q: 'Funktioniert er in Grad und Radianten?',
        a: 'Ja, beides. Es gibt einen Modus-Schalter, um zwischen DEG und RAD umzuschalten – achte nur darauf, dass er mit den Vorgaben deiner Hausaufgaben oder deines Lehrbuchs übereinstimmt, da sin(30°) und sin(30 rad) sehr unterschiedliche Ergebnisse liefern.',
      },
    ] satisfies FaqItem[],
  },

  conclusion: {
    soft: true,
    h2: 'Jetzt ausprobieren',
    body: 'Probier es einfach mit jeder Aufgabe aus, die du lösen möchtest: eine Wurzel, einen Bruch oder einen Prozentsatz. Der Rechner befindet sich ganz oben auf dieser Seite und steht dir jederzeit zur Verfügung.',
  },

  footer: {
    tagline: 'Kostenloser wissenschaftlicher Online-Taschenrechner für Mathe, Gleichungen, Prozent, Brüche und mehr.',
    pagesNav: {
      h3: 'Seiten',
      links: [
        { label: 'Startseite', href: '/' },
        { label: 'Taschenrechner', href: '/#matherechner-tool' },
        { label: 'Über uns', href: '/ueber-uns/' },
        { label: 'Kontakt', href: '/kontakt/' },
      ],
    },
    legalNav: {
      h3: 'Rechtliches',
      links: [
        { label: 'Impressum', href: '/impressum/' },
        { label: 'Datenschutzerklärung', href: '/datenschutz/' },
        { label: 'AGB', href: '/agb/' },
        { label: 'FAQ', href: '/#faq' },
      ],
    },
    bottomLinks: [
      { label: 'AGB', href: '/agb/' },
      { label: 'Datenschutzerklärung', href: '/datenschutz/' },
    ],
    copyright: '©2026 Matherechner. Alle Rechte vorbehalten.',
  },

  pages: {
    impressum: {
      title: 'Impressum',
      h1: 'Impressum',
    },
    datenschutz: {
      title: 'Datenschutzerklärung',
      h1: 'Datenschutzerklärung',
    },
    agb: {
      title: 'AGB – Allgemeine Geschäftsbedingungen',
      h1: 'Allgemeine Geschäftsbedingungen',
    },
    ueber: {
      title: 'Über uns – Matherechner',
      h1: 'Über uns',
    },
    kontakt: {
      title: 'Kontakt – Matherechner',
      h1: 'Kontakt',
    },
    notFound: {
      title: '404 – Seite nicht gefunden',
      h1: '404',
      body: 'Die angeforderte Seite wurde nicht gefunden.',
      backLabel: 'Zurück zur Startseite',
    },
  },
};

export type Content = typeof content;
