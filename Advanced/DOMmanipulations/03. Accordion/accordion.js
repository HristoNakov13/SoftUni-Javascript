function toggle() {
   let textDivElement = document.getElementById("extra");
   let button = document
       .getElementById("accordion")
       .getElementsByClassName("button")[0];

   if (textDivElement.style.display === "none") {
       button.textContent = "Less";
       textDivElement.style.display = "block";
   } else {
       button.textContent = "More";
       textDivElement.style.display = "none";
   }
}