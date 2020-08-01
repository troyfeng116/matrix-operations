var submitButton = document.getElementById("submitButton");
var widthReader = document.getElementById("widthReader");
var grid = document.getElementById("gridContainer");
var widthInputContainer = document.getElementById("widthInputContainer");
var secondInputContainer = document.getElementById("secondInputContainer");
var calculateButton = document.getElementById("calculateButton");
var outputContainer = document.getElementById("outputContainer");

submitButton.onclick = function() {
	var n = widthReader.value;
	if (isNaN(n) || n < 1 || n > 8) {
		alert("N must be between 1 and 8");
		return;
	}
	widthInputContainer.style.left = "10px";
	widthInputContainer.style.top = "30%"
	widthInputContainer.style.transform = "translate(0,-50%)";
	grid.style.visibility = "visible";
	grid.style.height = (48*n)+"px";
	grid.style.width = (60*n)+"px";
	grid.style.gridTemplateRows = "repeat("+n+", 1fr)";
	grid.style.gridTemplateColumns = "repeat("+n+", 1fr)";
	generateGrid(n);
	secondInputContainer.style.visibility = "visible";
	outputContainer.style.visibility = "hidden";
}

calculateButton.onclick = function() {
	if (!assertMatInput()) {
		alert("Make sure all entries are filled with integers");
		return;
	}
	outputContainer.style.visibility = "visible";
}

function generateGrid(n) {
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			var inputField = document.createElement("input");
			inputField.type="text";
			inputField.size=3;
			grid.appendChild(inputField);
		}
	}
}

function assertMatInput() {
	return false;
}