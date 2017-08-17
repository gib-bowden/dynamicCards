function buildDom(arr) {
	var domString = ""
	if (arr !== []) {
		for (let [i, card] of arr.entries()) {
			domString +=	`<div class="card" id="card-${i}">
								<h3>${card}</h3>
								<img src="https://unsplash.it/300/200/?random">
								<button class="delete-btn" id="delete-btn-${i}">Delete</button>
							</div>`;
		} 
		document.getElementById("card-container").innerHTML = domString
		addDeleteEventListener(arr);
	}
}

function addDeleteEventListener(arr) {
	var deleteBtns = document.getElementsByClassName("delete-btn") 
	for (let button of deleteBtns) {
		button.addEventListener("click", (e) => {
			var id = Number(e.target.id.replace("delete-btn-",""))
			arr.splice(id, 1); 
			saveArryInSession(arr);
			buildDom(arr);
		})
	} 
}

function addInputToArr(arr) {
	var field = document.getElementById("input-field")
	if (field.value !== "") {
		arr.push(field.value)
	}  
	field.value = "";
}

function saveArryInSession(arr) {
	var arrString = arr.join(",");
	sessionStorage.arrString = arrString;
}

function retreiveSessionStorage() {
	if (sessionStorage.arrString !== undefined && sessionStorage.arrString !== "") {
		arr = sessionStorage.arrString.split(",");
	} else {
		arr = [] }
	return arr
}

function createCard(arr) {
	addInputToArr(arr)
 	buildDom(arr)
 	saveArryInSession(arr)
}

function loadPage(arr) {
	buildDom(retreiveSessionStorage()); //build dom, passing in a saved session
	document.getElementById("create-btn").addEventListener("click", () => {
		createCard(arr)
	}) //add event lister to the create button that calls the create card function
	document.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
				createCard(arr)
		}
	}) //add event listern to entire document that creates a card when enter is pressed
}

var cards = []
loadPage(cards)