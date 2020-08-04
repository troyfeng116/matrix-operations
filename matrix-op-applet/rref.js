var widthInputContainer = document.getElementById("widthInputContainer");
var widthReader = document.getElementById("widthReader");
var submitButton = document.getElementById("submitButton");

var N;

submitButton.onclick = function() {
	N = widthReader.value;
	if (isNaN(N) || N < 1 || N > 8 || N%1 != 0) {
		alert("N must be between 1 and 8");
		return;
	}
	M = heightReader.value;
	if (isNaN(M) || M < 1 || M > 8 || M%1 != 0) {
		alert("M must be between 1 and 8");
		return;
	}
	inputContainer.style.top = "40%";
	inputContainer.style.left = "10px";
	inputContainer.style.transform = "translate(0,-50%)";
	generateGrids();
	outputContainer.style.visibility = "hidden";
	secondInputContainer.style.visibility = "visible";
}

/* Generate an NxN grid of text fields in grid container. Set id of (i,j)'th element to "ij". */
function generateGrid(n) {
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			var inputField = document.createElement("input");
			inputField.type="text";
			inputField.size=3;
			inputField.id=i+""+j;
			grid.appendChild(inputField);
		}
	}
}