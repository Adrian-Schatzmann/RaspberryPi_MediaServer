/*------------------------------
Allgemein
------------------------------*/
//Array mit allen Elenemten der Klasse "slide" innerhalb von Elementen mit der ID "slider" erstellen
const slides = document.querySelectorAll("#slider .slide");
//Aktuelle Bildposition
let current = 0;
//Aktuelle Seitenzahl für die Anleitung speichern
const currentSite = parseInt(
  new URL(window.location.href).pathname
    .split("/") //hintersten Teil isolieren
    .pop()
    .replace(".html", "") //Endung entfernen
    .replace(/\D/g, ""), // entfernt alles, was keine Zahl ist
  10 //Dezimalsystem
);

//Kapitel definieren
const chapters = [
  { file: "a1.html", title: "1. 3D Druck" },
  { file: "a2.html", title: "2. Raspberry Pi Setup" },
  { file: "a3.html", title: "3. Dependencies" },
  { file: "a4.html", title: "4. Verkabelung" },
  { file: "a5.html", title: "5. Case" },
  { file: "a6.html", title: "6. Display & Button" },
  { file: "a7.html", title: "7. SSD" },
  { file: "a8.html", title: "8. Plex" },
];

//Inhaltsverzeichnis generieren
toc();

//Gruppe 0 hervorheben
highlightCurrentStep();

/*------------------------------
Bildwechsel
------------------------------*/
//Nächstes Bild anzeigen
function nextImage() {
  if (current == slides.length - 1 && currentSite < chapters.length) {
    window.location.href = "a" + (currentSite + 1) + ".html";
    return;
  }

  slides[current].style.display = "none"; // aktuelles Bild ausblenden
  current = (current + 1) % slides.length; // nächstes Bild, mit Rücksprung am Ende
  slides[current].style.display = "block"; // neues Bild einblenden
  highlightCurrentStep();
}

//Vorheriges Bild anzeigen
function previousImage() {
  if (current == 0 && currentSite != 1) {
    window.location.href = "a" + (currentSite - 1) + ".html";
    return;
  }
  slides[current].style.display = "none"; // aktuelles Bild ausblenden
  current = (current - 1 + slides.length) % slides.length; // vorheriges Bild, mit Rücksprung am Anfang
  slides[current].style.display = "block"; // neues Bild einblenden
  highlightCurrentStep();
}

/**
 * Springt direkt zu einem bestimmten Slide, basierend auf dem Klick-Event.
 * Liest data-highlight-group aus und springt zum ERSTEN Bild in dieser Gruppe.
 * @param {Event} event - Das Klick-Ereignis des Elements.
 */
function jumpToSlide(event) {
  //Das angeklickte Element (z.B. das <li>)
  const clickedElement = event.currentTarget;

  //Lese das Attribut, z.B. "0" or "1, 2"
  const groupData = clickedElement.dataset.highlightGroup;

  //Nimm die *erste* Zahl aus dem Attribut
  const targetIndexStr = groupData.split(/[ ,]+/)[0];
  const targetIndex = parseInt(targetIndexStr, 10);

  //Prüfen, ob die Umwandlung gültig war und ob es die Folie gibt
  if (isNaN(targetIndex) || targetIndex < 0 || targetIndex >= slides.length) {
    console.error("Ungültige data-highlight-group für Sprung:", groupData);
    return;
  }

  //Wenn wir schon auf dem richtigen Slide sind, nichts tun
  if (targetIndex === current) {
    return;
  }

  //Alten Slide ausblenden
  slides[current].style.display = "none";
  //Neuen Index setzen
  current = targetIndex;
  //Neuen Slide einblenden
  slides[current].style.display = "block";

  //Highlights aktualisieren
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
//Button-Events
document.getElementById("nextBtn").addEventListener("click", nextImage);
document.getElementById("lastBtn").addEventListener("click", previousImage);

//Event-Listener für alle Text-Elemente, die Highlights haben
const highlightableElements = document.querySelectorAll(
  "[data-highlight-group]"
);
highlightableElements.forEach((element) => {
  element.addEventListener("click", jumpToSlide);
  //Zeigt dem Benutzer, dass der Text klickbar ist
  element.style.cursor = "pointer";
});

//Event Listener für Tastendrücke
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      onLeftArrow();
      break;
    case "ArrowRight":
      onRightArrow();
      break;
  }

  //Funktionen, die bei Links-/Rechts-Pfeil ausgelöst werden
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

  //Aktuelles Kapitel hervorheben
  let tocItems = document.querySelectorAll(".toc li");
  let titleName = document.querySelector(".tutorialText h2");

  tocItems.forEach((element) => {
    if (element.textContent === titleName.textContent) {
      element.classList.add("highlight");
    }
  });
}

/*------------------------------
Python Skript kopieren-Button
------------------------------*/
//Button finden
const button = document.getElementById("copyButton");

//Prüfen, ob der Button auf dieser Seite überhaupt existiert
if (button) {
  button.addEventListener("click", () => {
    console.log("Button wurde geklickt!");
    //Text von externer Datei laden
    fetch("script.txt")
      .then((response) => {
        //Bessere Fehlerprüfung für 404
        if (!response.ok) {
          throw new Error(
            "Datei script.txt nicht gefunden oder konnte nicht geladen werden."
          );
        }
        return response.text();
      })
      .then((text) => {
        return navigator.clipboard.writeText(text);
      })
      .then(() => {
        button.innerText = "Kopiert!";
        setTimeout(() => {
          button.innerText = "Python-Skript kopieren";
        }, 2000);
      })
      .catch((err) => {
        console.error("Fehler: ", err);
        button.innerText = "Fehler beim Kopieren";
        setTimeout(() => {
          button.innerText = "Python-Skript kopieren";
        }, 3000);
      });
  });
}
