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
	N = widthReader.value;
	if (isNaN(N) || N < 1 || N > 8 || N%1 != 0) {
		alert("N must be between 1 and 8");
		return;
	}
	if (heightReader) {
		M = heightReader.value;
		if (isNaN(M) || M < 1 || M > 8 || M%1 != 0) {
			alert("M must be between 1 and 8");
			return;
		}
	}
	else M = N;
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
	outputGrid.style.display = "grid";
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
	if (heightReader) {
		var ans = getRref();
		for (var i = 0; i < M; i++) {
			for (var j = 0; j < N; j++) {
				document.getElementById(i+""+j+"O").innerHTML = ans[i][j].myToString();
			}
		}
	}
	else {
		var ans = getInverse();
		if (ans == "NONE") {
			outputGrid.style.display = "none";
			outputContainer.innerHTML = "INVERSE: NONE";
			return;
		}
		else {
			for (var i = 0; i < N; i++) {
				for (var j = 0; j < N; j++) {
					document.getElementById(i+""+j+"O").innerHTML = ans[i][j].myToString();
				}
			}
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
	if (!heightReader) N *= 2;
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
	if (!heightReader) N /= 2;
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

/* Return NxN Fraction matrix corresponding to inverse of NxN input. */
function getInverse() {
	var mat = [];
	for (var i = 0; i < N; i++) {
		var row = [];
		for (var j = 0; j < N; j++) {
			row.push(parseInt(document.getElementById(i+""+j).value));
		}
		mat.push(row);
	}
	if (det(mat) == 0) return "NONE";
	for (var i = 0; i < N; i++) {
		for (var j = 0; j < N; j++) {
			mat[i][j] = new Fraction(mat[i][j], 1);
			if (i == j) mat[i].push(new Fraction(1,1));
			else mat[i].push(new Fraction(0,1));
		}
	}
	rref(mat);
	var ans = [];
	for (var i = 0; i < N; i++) {
		var row = [];
		for (var j = 0; j < N; j++) {
			row.push(mat[i][N+j]);
		}
		ans.push(row);
	}
	return ans;
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

