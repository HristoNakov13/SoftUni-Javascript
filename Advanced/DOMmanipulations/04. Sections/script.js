function create(words) {
   let wordDivTemplate = document.createElement("div");
   let wordParagraph = document.createElement("p");
   wordDivTemplate.appendChild(wordParagraph);
   wordParagraph.style.display = "block";
   let contentElement = document.getElementById("content");

   for (const word of words) {
      let currentDiv = wordDivTemplate.cloneNode(true);
      let currentParagraph = currentDiv.querySelector("p");
      currentParagraph.textContent = word;
      currentParagraph.style.display = "none";

      currentDiv.addEventListener("click", function () {
         if (currentParagraph.style.display === "none") {
            currentParagraph.style.display = "block";
         } else {
            currentParagraph.style.display = "none";
         }
      });
      contentElement.appendChild(currentDiv);
   }
}
