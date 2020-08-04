var inputContainer = document.getElementById("widthInputContainer");
var widthReader = document.getElementById("widthReader");
var heightReader = document.getElementById("heightReader");
var submitButton = document.getElementById("submitButton");

var grid = document.getElementById("gridContainer");

var secondInputContainer = document.getElementById("secondInputContainer");
var calculateButton = document.getElementById("calculateButton");

var outputContainer = document.getElementById("outputContainer");
var outputGrid = document.getElementById("outputGrid");

var M;
var N;

submitButton.onclick = function() {
	M = heightReader.value;
	if (isNaN(M) || M < 1 || M > 8 || M%1 != 0) {
		alert("M must be between 1 and 8");
		return;
	}
	N = widthReader.value;
	if (isNaN(N) || N < 1 || N > 8 || N%1 != 0) {
		alert("N must be between 1 and 8");
		return;
	}
	inputContainer.style.top = "40%";
	inputContainer.style.left = "10px";
	inputContainer.style.transform = "translate(0,-50%)";
	generateGrid();
	outputContainer.style.visibility = "hidden";
	secondInputContainer.style.visibility = "visible";
}

calculateButton.onclick = function() {
	if (!assertInputs()) {
		alert("Make sure all entries are filled with numbers");
		return;
	}
	while (outputGrid.firstChild) {
		outputGrid.removeChild(outputGrid.firstChild);
	}
	outputGrid.style.width = (60*M)+"px";
	outputGrid.style.height = (36*M)+"px";
	outputGrid.style.gridTemplateRows = "repeat("+M+",1fr)";
	outputGrid.style.gridTemplateColumns = "repeat("+N+",1fr)";
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < M; j++) {
			var entry = document.createElement("div");
			entry.id=i+""+j+"O";
			outputGrid.appendChild(entry);
		}
	}
	var ans = getRref();
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			document.getElementById(i+""+j+"O").innerHTML = ans[i][j];
		}
	}
	outputContainer.style.visibility = "visible";
}

/* Generate an NxN grid of text fields in grid container. Set id of (i,j)'th element to "ij". */
function generateGrid() {
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
	grid.style.height=(36*M)+"px";
	grid.style.width=(48*N)+"px";
	grid.style.gridTemplateRows = "repeat("+M+",1fr)";
	grid.style.gridTemplateColumns = "repeat("+N+",1fr)";
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			var inputField = document.createElement("input");
			inputField.type="text";
			inputField.size=3;
			inputField.id=i+""+j;
			grid.appendChild(inputField);
		}
	}
	grid.style.visibility = "visible";
}

/* Check if all inputs are filled and numerical. */
function assertInputs() {
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			var x = document.getElementById(i+""+j).value;
			if (isNaN(x) || x=="") return false;
		}
	}
	return true;
}

/* Return MxN matrix corresponding to rref of input. */
function getRref() {
	var ans = [];
	for (var i = 0; i < M; i++) {
		var row = [];
		for (var j = 0; j < N; j++) {
			row.push(document.getElementById(i+""+j).value);
		}
		ans.push(row);
	}
	return ans;
}


