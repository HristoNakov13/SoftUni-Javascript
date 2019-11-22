import { eventHandlers} from "./btn-events.js";

//Should ID be internally tracked and assigned to each new student starting from 1?
//Or should it be received as user input?
//Unclear task description.

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", eventHandlers.submit);

let loadStudentsBtn = document.getElementById("loadStudents");
loadStudentsBtn.addEventListener("click", eventHandlers.load);