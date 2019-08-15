function solve() {
   let sendButton = document.getElementById("send");
   let inputArea = document.getElementById("chat_input");
   let chatHistory = document.getElementById("chat_messages");

   sendButton.addEventListener("click", function () {

       let input = inputArea.value;
       if (input !== "") {
           let message = document.createElement("div");
           message.textContent = input;
           message.className = "message my-message";
           chatHistory.appendChild(message);
           inputArea.value = "";
       }
   })
}


