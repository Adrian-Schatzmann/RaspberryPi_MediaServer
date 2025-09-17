const slides = document.querySelectorAll("#slider .slide");
let current = 0;

document.getElementById("nextBtn").addEventListener("click", () => {
  slides[current].style.display = "none";
  current = (current + 1) % slides.length;
  slides[current].style.display = "block";
});