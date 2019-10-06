function solve() {
    let ELEMENTS = {
        searchInput: document.getElementById("searchField"),
        tableContent: document.getElementsByTagName("tbody")[0]
            .getElementsByTagName("tr"),
        searchBtn: document.getElementById("searchBtn"),
    };

   let searchBtnClickEvent = function () {
       clearPreviousSearches(ELEMENTS.tableContent);
       let searchTerm = ELEMENTS.searchInput.value;

       for (const row of ELEMENTS.tableContent) {
           if (containsSearchTerm(row, searchTerm)) {
               row.setAttribute("class", "select");
           }
       }
       ELEMENTS.searchInput.value = "";
   };

   ELEMENTS.searchBtn.addEventListener("click", searchBtnClickEvent);

   function containsSearchTerm(row, searchTerm) {
       let cells = row.getElementsByTagName("td");

       for (const cell of cells) {
           if (cell.textContent.includes(searchTerm)) {
               return true;
           }
       }
       return false;
   }

   function clearPreviousSearches(tableContent) {
       for (const row of tableContent) {
           row.setAttribute("class", "");
       }
   }
}