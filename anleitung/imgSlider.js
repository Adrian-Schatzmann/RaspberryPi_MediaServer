//Array mit allen Elenemten der Klasse "slide" innerhalb von Elementen mit der ID "slider" erstellen
const slides = document.querySelectorAll("#slider .slide");
//Variable für aktuelle Bildposition
let current = 0;

//Next Image Button
document.getElementById("nextBtn").addEventListener("click", () => {
  slides[current].style.display = "none"; //aktuelles Bild ausblenden
  current = current + 1; //Nächstes Bild im Array
  if (current >= slides.length) { //Zurück auf den Anfang springen wenn das letzte Bild erreicht wurde
    current = 0;
  }
  slides[current].style.display = "block"; //Neues Bild einblenden
});

//Previous Image Button
document.getElementById("lastBtn").addEventListener("click", () => {
  slides[current].style.display = "none"; //aktuelles Bild ausblenden
  current = current - 1;
    if (current < 0) {
    current = slides.length - 1; //Zum letzen Bild springen beim zurückgehen vom ersten Bild
  }
  slides[current].style.display = "block"; //Neues Bild einblenden
});
