// NOTE: The comment sections inside the index.html file is an example of how suppose to be structured the current elements.
//       - You can use them as an example when you create those elements, to check how they will be displayed, just uncomment them.
//       - Also keep in mind that, the actual skeleton in judge does not have this comment sections. So do not be dependent on them!
//       - Тhey are present in the skeleton just to help you!


// This function will be invoked when the html is loaded. Check the console in the browser or index.html file.
function mySolution(){
	const DEFAULT_AVATAR_VALUES = {
		src: "./images/user.png",
		width: "32",
		height: "32",
	};

	const INPUT_QUESTION_ELEMENTS = {
		question: document.querySelector("#inputSection").querySelector("textarea"),
		username: document.querySelector("#inputSection").querySelector("input"),
		sendBtn: document.querySelector("#inputSection").querySelector("button"),
	};

	const CREATE_QUESTION = {
		parent: createWrapperElement,
		btn: createBtn,
		username: createUsernameElement,
		question: createQuestionElement,
		actions: createWrapperElement,
		avatar: createAvatar,
		inputField: createInputField,
		replies: createRepliesList,
	};

	const BTN_EVENT_HANDLERS = {
		sendQuestion: sendQuestionEventHandler,
		archive: archiveEventHandler,
		open: openEventHandler,
		reply: replyQuestionEventHandler,
		sendReply: sendReplyEventHandler,
	};

	const DEFAULT_USERNAME = "Anonymous";

	let openQuestions = document.querySelector("#openQuestions");
	let pendingQuestions = document.querySelector("#pendingQuestions");

	INPUT_QUESTION_ELEMENTS.sendBtn.addEventListener("click", BTN_EVENT_HANDLERS.sendQuestion);

	function sendQuestionEventHandler() {
		let questionContent = INPUT_QUESTION_ELEMENTS.question.value;
		console.log(questionContent);
		let username = INPUT_QUESTION_ELEMENTS.username.value;

		if (questionContent === "") {
			console.log("inside");
			return;
		}

		if(username.length === 0) {
			username = DEFAULT_USERNAME;
		}

		let parentElement = CREATE_QUESTION.parent("div", "pendingQuestion");

		let avatarElement = CREATE_QUESTION.avatar(DEFAULT_AVATAR_VALUES.src, DEFAULT_AVATAR_VALUES.height, DEFAULT_AVATAR_VALUES.width);
		let usernameElement = CREATE_QUESTION.username("span", username);
		let questionElement = CREATE_QUESTION.question("p", questionContent);
		let actionsElement = CREATE_QUESTION.actions("div", "actions");
		let archiveBtn = CREATE_QUESTION.btn("archive", "Archive");
		let openBtn = CREATE_QUESTION.btn("open", "Open");

		parentElement.appendChild(avatarElement);
		parentElement.appendChild(usernameElement);
		parentElement.appendChild(questionElement);
		parentElement.appendChild(actionsElement);

		actionsElement.appendChild(archiveBtn);
		actionsElement.appendChild(openBtn);

		archiveBtn.addEventListener("click", BTN_EVENT_HANDLERS.archive);
		openBtn.addEventListener("click", BTN_EVENT_HANDLERS.open);

		pendingQuestions.appendChild(parentElement);
		console.log(pendingQuestions);
	}

	function createWrapperElement(tagName, className) {
		let parent = document.createElement(tagName);
		parent.setAttribute("class", className);

		return parent;
	}


	function archiveEventHandler(event) {
		let question = event.target.parentNode.parentNode;
		pendingQuestions.removeChild(question);
	}

	function openEventHandler(event) {
		let actionsWrapper = event.target.parentNode;
		let question = actionsWrapper.parentNode;
		question.setAttribute("class", "openQuestion");

		Array.from(actionsWrapper.childNodes).forEach(child => actionsWrapper.removeChild(child));

		let replyBtn = CREATE_QUESTION.btn("reply", "Reply");
		replyBtn.addEventListener("click", BTN_EVENT_HANDLERS.reply);
		actionsWrapper.appendChild(replyBtn);

		let replySection = CREATE_QUESTION.parent("div", "replySection");
		let input = CREATE_QUESTION.inputField("replyInput", "text", "Reply to this question here...");
		let replies = CREATE_QUESTION.replies("reply", "1");
		let sendBtn = CREATE_QUESTION.btn("replyButton", "Send");
		sendBtn.addEventListener("click", BTN_EVENT_HANDLERS.sendReply);

		replySection.appendChild(input);
		replySection.appendChild(sendBtn);
		replySection.appendChild(replies);
		replySection.style.display = "none";

		question.appendChild(replySection);
		openQuestions.appendChild(question);
	}

	function replyQuestionEventHandler(event) {
		let replySection = event.target.parentNode.parentNode.querySelector(".replySection");
		let clickedBtn = event.target;

		if (clickedBtn.textContent === "Back") {
			clickedBtn.textContent = "Reply";
			replySection.style.display = "none";
			return;
		}

		clickedBtn.textContent = "Back";
		replySection.style.display = "block";
	}

	function sendReplyEventHandler(event) {
		let replySection = event.target.parentNode.parentNode.querySelector(".replySection");
		let input = replySection.querySelector(".replyInput");
		let replyContent = input.value;

		if (replyContent === "") {
			return;
		}

		let replies = replySection.querySelector(".reply");
		let reply = document.createElement("li");
		reply.textContent = replyContent;
		replies.appendChild(reply);
		input.value = "";
	}

	function createInputField(className, type, placeholder) {
		let inputElement = document.createElement("input");
		inputElement.setAttribute("class", className);
		inputElement.setAttribute("type", type);
		inputElement.setAttribute("placeholder", placeholder);

		return inputElement;
	}

	function createBtn(className, textContent) {
		let btn = document.createElement("button");
		btn.setAttribute("class", className);
		btn.textContent = textContent;

		return btn;
	}

	function createRepliesList(className, type) {
		let list = document.createElement("ol");
		list.setAttribute("class", className);
		list.setAttribute("type", type);

		return list;
	}
	
	function createUsernameElement(tagName, username) {
		let element = document.createElement(tagName);
		element.textContent = username;

		return element;
	}

	function createQuestionElement(tagName, questionContent) {
		let element = document.createElement(tagName);
		element.textContent = questionContent;

		return element;
	}

	function createAvatar(src, height, width) {
		let img = document.createElement("img");
		img.setAttribute("src", src);
		img.setAttribute("width", width);
		img.setAttribute("height", height);

		return img;
	}
}
// To check out your solution, just submit mySolution() function in judge system.