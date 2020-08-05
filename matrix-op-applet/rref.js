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
	if (heightReader) {
		M = heightReader.value;
		if (isNaN(M) || M < 1 || M > 8 || M%1 != 0) {
			alert("M must be between 1 and 8");
			return;
		}
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
		alert("Make sure all entries are filled with integers");
		return;
	}
	while (outputGrid.firstChild) {
		outputGrid.removeChild(outputGrid.firstChild);
	}
	outputGrid.style.height = (36*M)+"px";
	outputGrid.style.width = (60*N)+"px";
	outputGrid.style.gridTemplateRows = "repeat("+M+",1fr)";
	outputGrid.style.gridTemplateColumns = "repeat("+N+",1fr)";
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			var entry = document.createElement("div");
			entry.id=i+""+j+"O";
			outputGrid.appendChild(entry);
		}
	}
	var ans = getRref();
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			document.getElementById(i+""+j+"O").innerHTML = ans[i][j].myToString();
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
			if (isNaN(x) || x=="" || x%1 != 0) return false;
		}
	}
	return true;
}

/* Return MxN Fraction matrix corresponding to rref of input. */
function getRref() {
	var ans = [];
	for (var i = 0; i < M; i++) {
		var row = [];
		for (var j = 0; j < N; j++) {
			row.push(new Fraction(parseInt(document.getElementById(i+""+j).value), 1));
		}
		ans.push(row);
	}
	rref(ans);
	return ans;
}

/* Given MxN array of Fractions, convert to rref form. */
function rref(mat) {
	var pivotCol = 0;
	var pivotRow = 0;
	while (pivotCol < N && pivotRow < M) {
		var count = moveZeroRowsToBottom(mat, pivotRow, pivotCol);
		if (count == 0) {
			pivotCol++;
			continue;
		}
		var c = mat[pivotRow][pivotCol].reciprocal();
		multRow(mat, pivotRow, c);
		for (var row = 0; row < M; row++) {
			if (row == pivotRow) ;
			else if (mat[row][pivotCol] != 0) {
				c = mat[row][pivotCol].multiply(new Fraction(-1,1));
				addRows(mat, c, pivotRow, row);
			}
		}
		if (pivotRow < M) pivotRow++;
		pivotCol++;
	}
}

/* Swap i and j rows of mat. */
function swapRows(mat, i, j) {
	var temp = mat[i];
	mat[i] = mat[j];
	mat[j] = temp;
}

/* Mutiply row i by Fraction c. */
function multRow(mat, i, c) {
	for (var j = 0; j < N; j++) {
		mat[i][j] = mat[i][j].multiply(c);
	}
}

/* Add c times row i to row j. */
function addRows(mat, c, i, j) {
	for (var col = 0; col < N; col++) {
		mat[j][col] = mat[j][col].add(mat[i][col].multiply(c));
	}
}

/* Move all rows below and including start with a zero in column j to the bottom of mat. Return 
#rows with non-zero entry at col j. */
function moveZeroRowsToBottom(mat, start, j) {
	var count = 0;
	var top = start;
	var bottom = M;
	while (top < bottom) {
		if (mat[top][j].numerator == 0) {
			swapRows(mat, top, bottom-1);
			bottom--;
		}
		else count++;
		top++;
	}
	return count;
}

/* Class definition for Fraction objects. */
class Fraction {
	constructor(numerator,denominator) {
		this.numerator = numerator;
		this.denominator = denominator;
	}
	myToString() {
		if (this.numerator % this.denominator == 0) return this.numerator/this.denominator;
		if (this.denominator < 0) {
			this.numerator *= -1;
			this.denominator *= -1;
		}
		return this.numerator + "/" + this.denominator;
	}
	simplify() {
		var g = gcd(Math.abs(this.numerator),Math.abs(this.denominator));
		this.numerator /= g;
		this.denominator /= g;
	}
	reciprocal() {
		return new Fraction(this.denominator,this.numerator);
	}
	multiply(f) {
		var ans = new Fraction(this.numerator*f.numerator, this.denominator*f.denominator)
		ans.simplify();
		return ans;
	}
	add(f) {
		var newNum = this.numerator*f.denominator + this.denominator*f.numerator;
		var newDen = this.denominator * f.denominator;
		var ans = new Fraction(newNum,newDen);
		ans.simplify();
		return ans;
	}
}

function gcd(a,b) {
	if (a == 0) return b;
	if (b == 0) return a;
	return gcd(b,a%b);
}

