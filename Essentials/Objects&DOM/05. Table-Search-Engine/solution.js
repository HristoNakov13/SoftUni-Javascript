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
            searchRow(row, searchTerm);
       }
       ELEMENTS.searchInput.value = "";
   };

   ELEMENTS.searchBtn.addEventListener("click", searchBtnClickEvent);

   function searchRow(row, searchTerm) {
       let cells = row.getElementsByTagName("td");

       for (const cell of cells) {
           if (cell.textContent.includes(searchTerm)) {
               markFoundRow(row);
               break;
           }
       }
   }

   function markFoundRow(row) {
       row.setAttribute("class", "select");
   }

   function clearPreviousSearches(tableContent) {
       for (const row of tableContent) {
           row.setAttribute("class", "");
       }
   }
}