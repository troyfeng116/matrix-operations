var submitButton = document.getElementById("submitButton");
var widthReader = document.getElementById("widthReader");
var grid = document.getElementById("gridContainer");
var inputContainer = document.getElementById("widthInputContainer");
var secondInputContainer = document.getElementById("secondInputContainer");
var calculateButton = document.getElementById("calculateButton");
var outputContainer = document.getElementById("outputContainer");

var n;

submitButton.onclick = function() {
	n = widthReader.value;
	if (isNaN(n) || n < 1 || n > 8 || n%1 != 0) {
		alert("N must be between 1 and 8");
		return;
	}
	inputContainer.style.left = "75%";
	inputContainer.style.top = "40%"
	inputContainer.style.transform = "translate(0,-50%)";
	generateGrid();
	secondInputContainer.style.visibility = "visible";
	outputContainer.style.visibility = "hidden";
}

/* When Calculate! button pressed, process inputs and output. */
calculateButton.onclick = function() {
	if (!assertMatInput()) {
		alert("Make sure all entries are filled with integers");
		return;
	}
	outputContainer.innerHTML = "DETERMINANT: <br>" + calculateDeterminant();
	outputContainer.style.visibility = "visible";
}

/* Generate an NxN grid of text fields in grid container. Set id of (i,j)'th element to "ij". */
function generateGrid() {
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
	grid.style.height = (48*n)+"px";
	grid.style.width = (60*n)+"px";
	grid.style.gridTemplateRows = "repeat("+n+", 1fr)";
	grid.style.gridTemplateColumns = "repeat("+n+", 1fr)";
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			var inputField = document.createElement("input");
			inputField.type="text";
			inputField.size=3;
			inputField.id=i+""+j;
			grid.appendChild(inputField);
		}
	}
	grid.style.visibility = "visible";
}

/* Assert that all NxN text fields are populated with integers. */
function assertMatInput() {
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			if (isNaN(document.getElementById(i+""+j).value) || document.getElementById(i+""+j).value == "") {
				return false;
			}
		}
	}
	return true;
}

/* Given that text fields in grid are all integers, retrieve inputs and place into NxN array, call det(). */
function calculateDeterminant() {
	var arr = [];
	for (var i = 0; i < n; i++) {
		var row = [];
		for (var j = 0; j < n; j++) {
			row.push(document.getElementById(i+""+j).value);
		}
		arr.push(row);
	}
	return det(arr);
}

/* Recursive determinant calculation function. */
function det(arr) {
	var n = arr.length;
	if (n == 1) return arr[0][0];
	var ans = 0;
	for (var j = 0; j < n; j++) {
		if (j%2 == 0) ans += arr[0][j] * det(subArr(arr,j));
		else ans -= arr[0][j] * det(subArr(arr,j));
	}
	return ans;
}

/* Given NxN array, return (N-1)x(N-1) array corresponding to removing 0th row and j'th column. */
function subArr(arr,j) {
	var n = arr.length;
	var ans = [];
	for (var r = 1; r < n; r++) {
		var row = [];
		for (var c = 0; c < n; c++) {
			if (c == j) continue;
			row.push(arr[r][c]);
		}
		ans.push(row);
	}
	return ans;
}

