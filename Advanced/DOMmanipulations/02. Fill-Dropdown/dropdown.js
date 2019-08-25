function addItem() {
    let newItemTextElement = document.getElementById("newItemText");
    let newItemValueElement = document.getElementById("newItemValue");

    let textInput = newItemTextElement.value;
    let valueInput = newItemValueElement.value;

    let newOptionForMenu = document.createElement("option");
    newOptionForMenu.textContent = textInput;
    newOptionForMenu.value = valueInput;

    let dropDownMenuElement = document.getElementById("menu");
    dropDownMenuElement.appendChild(newOptionForMenu);

    newItemTextElement.value = "";
    newItemValueElement.value = "";
}