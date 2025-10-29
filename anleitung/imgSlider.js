/*------------------------------
Allgemein
------------------------------*/ 
//Array mit allen Elenemten der Klasse "slide" innerhalb von Elementen mit der ID "slider" erstellen
const slides = document.querySelectorAll("#slider .slide");
//Variable für aktuelle Bildposition
let current = 0;

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

  //debug
  console.log(currentHighlightList);

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
