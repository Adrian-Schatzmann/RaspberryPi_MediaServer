/*------------------------------
Allgemein
------------------------------*/
//Array mit allen Elenemten der Klasse "slide" innerhalb von Elementen mit der ID "slider" erstellen
const slides = document.querySelectorAll("#slider .slide");
//Variable für aktuelle Bildposition
let current = 0;

//Inhaltsverzeichnis generieren
toc();

//Gruppe 0 hervorheben
highlightCurrentStep();

/*------------------------------
Bildwechsel
------------------------------*/
//Nächstes Bild anzeigen
function nextImage() {
  slides[current].style.display = "none"; // aktuelles Bild ausblenden
  current = (current + 1) % slides.length; // nächstes Bild, mit Rücksprung am Ende
  slides[current].style.display = "block"; // neues Bild einblenden
  highlightCurrentStep();
}

//Vorheriges Bild anzeigen
function previousImage() {
  slides[current].style.display = "none"; // aktuelles Bild ausblenden
  current = (current - 1 + slides.length) % slides.length; // vorheriges Bild, mit Rücksprung am Anfang
  slides[current].style.display = "block"; // neues Bild einblenden
  highlightCurrentStep();
}

/*------------------------------
Highlight-System
Das HTML-Attribut data-highlight-group="0,1,2" legt fest, bei welchen Bildern das Element hervorgehoben wird.
Jede Zahl entspricht dem Index eines Bildes(oder codes) im Slider (#slider .slide), beginnend bei 0.
------------------------------*/
function highlightCurrentStep() {
  //alle bisherigen highlights entfernen
  let allItems = document.querySelectorAll(`[data-highlight-group]`);
  allItems.forEach((element) => {
    element.classList.remove("highlight");
  });

  // aktuelle highlights suchen
  let currentHighlightList = Array.from(
    document.querySelectorAll(`[data-highlight-group]`)
  ).filter((el) => {
    const groups = el.dataset.highlightGroup.split(/[ ,]+/); //Trennt nach Leerzeichen oder Komma
    return groups.includes(current.toString());
  });

  //add new highlights
  currentHighlightList.forEach((element) => {
    element.classList.add("highlight");
  });
}

/*------------------------------
Buttons & Pfeiltasten
------------------------------*/
// Button-Events
document.getElementById("nextBtn").addEventListener("click", nextImage);
document.getElementById("lastBtn").addEventListener("click", previousImage);

// Event Listener für Tastendrücke
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      onLeftArrow();
      break;
    case "ArrowRight":
      onRightArrow();
      break;
  }

  // Funktionen, die bei Links-/Rechts-Pfeil ausgelöst werden
  function onLeftArrow() {
    console.log("← Pfeil nach links gedrückt");
    previousImage();
  }

  function onRightArrow() {
    console.log("→ Pfeil nach rechts gedrückt");
    nextImage();
  }
});

/*------------------------------
Inhaltsverzeichnis der Anleitung
------------------------------*/
function toc() {
  //Kapitel definieren
  const chapters = [
    { file: "a1.html", title: "1. Raspberry Pi Setup" },
    { file: "a2.html", title: "2. Blinka" },
    { file: "a3.html", title: "3. Plex" },
  ];

  //Inhaltsverzeichnis befüllen
  const toc = document.querySelector(".toc ul");
  chapters.forEach((chap) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = chap.title;
    a.href = chap.file;
    if (window.location.pathname.endsWith(chap.file)) {
      a.classList.add("active");
    }
    li.appendChild(a);
    toc.appendChild(li);
  });

  // Aktuelles Kapitel hervorheben
  let tocItems = document.querySelectorAll(".toc li");
  let titleName = document.querySelector(".tutorialText h2");

  tocItems.forEach((element) => {
    if (element.textContent === titleName.textContent) {
      element.classList.add("highlight");
    }
  });
}
