//Array mit allen Elenemten der Klasse "slide" innerhalb von Elementen mit der ID "slider" erstellen
const slides = document.querySelectorAll("#slider .slide");
//Variable für aktuelle Bildposition
let current = 0;

// Funktion: nächstes Bild anzeigen
function nextImage() {
  slides[current].style.display = "none"; // aktuelles Bild ausblenden
  current = (current + 1) % slides.length; // nächstes Bild, mit Rücksprung am Ende
  slides[current].style.display = "block"; // neues Bild einblenden
}

// Funktion: vorheriges Bild anzeigen
function previousImage() {
  slides[current].style.display = "none"; // aktuelles Bild ausblenden
  current = (current - 1 + slides.length) % slides.length; // vorheriges Bild, mit Rücksprung am Anfang
  slides[current].style.display = "block"; // neues Bild einblenden
}

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