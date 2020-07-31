var submitButton = document.getElementById("submitButton");
var widthReader = document.getElementById("widthReader");
var grid = document.getElementById("gridContainer");
submitButton.onclick = function() {
	var n = widthReader.value;
	if (isNaN(n) || n < 1 || n > 8) {
		alert("N must be between 1 and 8");
		return;
	}
	grid.style.height = (48*n)+"px";
	grid.style.width = (60*n)+"px";
	grid.style.gridTemplateRows = "repeat("+n+", 1fr)";
	grid.style.gridTemplateColumns = "repeat("+n+", 1fr)";
	generateGrid(n);
}

function generateGrid(n) {
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
	for (var i = 0; i < n*n; i++) {
		var inputField = document.createElement("input");
		inputField.type="text";
		inputField.size=3;
		grid.appendChild(inputField);
	}
}