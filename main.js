
function buildDom(arr) {
	var domString = ""
	if (arr !== []) {
		for (let [i, card] of arr.entries()) {
			domString +=	`<div class="card" id="card-${i}">
								<h3>${card}</h3>
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



//TODO: Create function for all initial actions and event listerners below
var cards = []


buildDom(retreiveSessionStorage())

document.getElementById("create-btn").addEventListener("click", () => {
	createCard(cards)
})

document.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		createCard(cards)
	}
})