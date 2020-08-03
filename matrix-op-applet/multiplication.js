var widthReader = document.getElementById("widthReader");
var widthSubmitButton = document.getElementById("submitButton");
var widthInputContainer = document.getElementById("widthInputContainer");
var heightReader = document.getElementById("heightReader");
var heightSubmitButton = document.getElementById("submitHeight");
var heightInputContainer = document.getElementById("heightInputContainer");
var secondInputContainer = document.getElementById("secondInputContainer");
var calculateButton = document.getElementById("calculateButton");
var outputContainer = document.getElementById("outputContainer");
var grid1 = document.getElementById("gridContainer1");
var grid2 = document.getElementById("gridContainer2");

var N;
var M;

widthSubmitButton.onclick = function() {
	N = widthReader.value;
	if (isNaN(N) || N < 1 || N > 8 || N%1 != 0) {
		alert("N must be between 1 and 8");
		return;
	}
	if (!isNaN(M) && M != undefined) {
		generateGrids();
		outputContainer.style.visibility = "hidden";
		secondInputContainer.style.visibility = "visible";
	}
}

heightSubmitButton.onclick = function() {
	M = heightReader.value;
	if (isNaN(M) || M < 1 || M > 8 || M%1 != 0) {
		alert("M must be between 1 and 8");
		return;
	}
	if (!isNaN(N) && N != undefined) {
		generateGrids();
		outputContainer.style.visibility = "hidden";
		secondInputContainer.style.visibility = "visible";
	}
}

calculateButton.onclick = function() {
	if (!assertInputs()) {
		alert("Make sure all entries are filled with numbers");
		return;
	}
	outputContainer.style.visibility = "visible";
	var ans = getProduct();
	for (var i = 0; i < M; i++) {
		for (var i = 0; i < M; i++) {
			outputContainer.innerHTML += ans[i][i];
		}
	}
}

function generateGrids() {
	while (grid1.firstChild) {
		grid1.removeChild(grid1.firstChild);
	}
	while (grid2.firstChild) {
		grid2.removeChild(grid2.firstChild);
	}
	grid1.style.visibility = "visible";
	grid1.style.width = 48*N+"px";
	grid1.style.height = 36*M+"px";
	grid1.style.gridTemplateRows = "repeat("+M+",1fr)";
	grid1.style.gridTemplateColumns = "repeat("+N+",1fr)";
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			var inputBox = document.createElement("input");
			inputBox.type = "text";
			inputBox.size = 2;
			inputBox.id=i+""+j+"MN";
			grid1.appendChild(inputBox);
		}
	}
	grid2.style.visibility = "visible";
	grid2.style.width = 48*M+"px";
	grid2.style.height = 36*N+"px";
	grid2.style.gridTemplateRows = "repeat("+N+",1fr)";
	grid2.style.gridTemplateColumns = "repeat("+M+",1fr)";
	for (var i = 0; i < N; i++) {
		for (var j = 0; j < M; j++) {
			var inputBox = document.createElement("input");
			inputBox.type = "text";
			inputBox.size = 2;
			inputBox.id=i+""+j+"NM";
			grid2.appendChild(inputBox);
		}
	}
}

function assertInputs() {
	for (var i = 0; i < N; i++) {
		for (var j = 0; j < M; j++) {
			var x = document.getElementById(i+""+j+"MN").value;
			if (isNaN(x) || x == "") {
				return false;
			}
			var y = document.getElementById(j+""+i+"NM").value;
			if (isNaN(y) || y == "") {
				return false;
			}
		}
	}
	return true;
}

function getProduct() {
	var ans = [];
	for (var i = 0; i < M; i++) {
		var row = [];
		for (var j = 0; j < M; j++) {
			var sum = 0;
			for (var z = 0; z < N; z++) {
				var x = document.getElementById(i+""+z+"MN").value;
				var y = document.getElementById(z+""+j+"NM").value;
				ans += x*y;
			}
			row.push(sum);
		}
		ans.push(row);
	}
	return ans;
}

