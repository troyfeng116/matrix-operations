var inputContainer = document.getElementById("widthInputContainer");
var submitButton = document.getElementById("submitButton");
var inputReader = document.getElementById("inputReader");

var secondInputContainer = document.getElementById("secondInputContainer");
var calculateButton = document.getElementById("calculateButton");

var grid = document.getElementById("gridContainer");

var outputContainer = document.getElementById("outputContainer");
var outputGrid = document.getElementById("outputGrid");

var N;

submitButton.onclick = function() {
	n = widthReader.value;
	if (isNaN(n) || n < 1 || n > 8 || n%1 != 0) {
		alert("N must be between 1 and 8");
		return;
	}
	widthInputContainer.style.left = "10px";
	widthInputContainer.style.top = "30%"
	widthInputContainer.style.transform = "translate(0,-50%)";
	generateGrid();
	secondInputContainer.style.visibility = "visible";
	outputContainer.style.visibility = "hidden";
}