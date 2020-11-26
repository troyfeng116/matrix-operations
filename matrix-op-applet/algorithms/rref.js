const inputContainer = document.getElementById("widthInputContainer");
const widthReader = document.getElementById("widthReader");

/* If heightReader exists, then we are in rref mode. Else, we are in inverse mode. */
const heightReader = document.getElementById("heightReader");
const submitButton = document.getElementById("submitButton");

const grid = document.getElementById("gridContainer");

const secondInputContainer = document.getElementById("secondInputContainer");
const fillZeroButton = document.getElementById("fillZeroButton");
const calculateButton = document.getElementById("calculateButton");

const outputContainer = document.getElementById("outputContainer");
const outputGrid = document.getElementById("outputGrid");

let M;
let N;

submitButton.onclick = function() {
	N = widthReader.value;
	if (isNaN(N) || N < 1 || N > 8 || N%1 != 0) {
		widthReader.className = "invalid";
		alert("N must be between 1 and 8");
		return;
	}
	else widthReader.className = "";
	if (heightReader) {
		M = heightReader.value;
		if (isNaN(M) || M < 1 || M > 8 || M%1 != 0) {
			heightReader.className = "invalid";
			alert("M must be between 1 and 8");
			return;
		}
		else heightReader.className = "";
	}
	else M = N;
	generateGrid();
	outputContainer.style.visibility = "hidden";
	secondInputContainer.style.visibility = "visible";
}

fillZeroButton.onclick = function() {
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			if (document.getElementById(`${i}${j}`).value == "") {
				document.getElementById(`${i}${j}`).value = "0";
			}
		}
	}
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
	outputGrid.style.height = `${36 * M}px`;
	outputGrid.style.width = `${48 * N}px`;
	outputGrid.style.gridTemplateRows = `repeat(${M},1fr)`;
	outputGrid.style.gridTemplateColumns = `repeat(${N},1fr)`;
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			var entry = document.createElement("div");
			entry.id = `${i}${j}O`;
			outputGrid.appendChild(entry);
		}
	}
	let ans = heightReader? getRref() : getInverse();
	if (ans === "NONE") {
		while (outputGrid.firstChild) {
			outputGrid.removeChild(outputGrid.firstChild);
		}
		outputGrid.style.display = "inline-block";
		outputGrid.style.height = (36)+"px";
		outputGrid.style.width = (60)+"px";
		const noInverse = document.createElement("div");
		noInverse.innerHTML = "NONE";
		outputGrid.appendChild(noInverse);
	}
	else {
		for (let i = 0; i < M; i++) {
			for (let j = 0; j < N; j++) {
				document.getElementById(`${i}${j}O`).innerHTML = ans[i][j].myToString();
			}
		}
	}
	outputContainer.style.visibility = "visible";
}

/* Generate an MxN grid of text fields in grid container. Set id of (i,j)'th element to "ij". */
function generateGrid() {
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
	grid.style.height = N <= 4 && M <= 4 ? `${48 * M}px` : `${36 * M}px`;
	grid.style.width = N <= 4 && M <= 4 ? `${60 * N}px` : `${48 * N}px`;
	grid.style.gridTemplateRows = `repeat(${M},1fr)`;
	grid.style.gridTemplateColumns = `repeat(${N},1fr)`;
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			const inputField = document.createElement("input");
			inputField.type="text";
			inputField.size = 3;
			inputField.id = `${i}${j}`;
			grid.appendChild(inputField);
		}
	}
	grid.style.visibility = "visible";
}

/* Check if all inputs are filled, numerical, and integer. */
function assertInputs() {
	let allGood = true;
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			const x = document.getElementById(`${i}${j}`).value;
			if (isNaN(x) || x=="" || x%1 != 0) {
				allGood = false;
				document.getElementById(`${i}${j}`).className = "invalid";
			}
			else document.getElementById(`${i}${j}`).className = "";
		}
	}
	return allGood;
}

/* Return MxN Fraction matrix corresponding to rref of input. */
function getRref() {
	let ans = [];
	for (let i = 0; i < M; i++) {
		let row = [];
		for (let j = 0; j < N; j++) {
			row.push(new Fraction(parseInt(document.getElementById(`${i}${j}`).value), 1));
		}
		ans.push(row);
	}
	rref(ans);
	return ans;
}

/* Given MxN array of Fractions, convert to rref form. */
function rref(mat) {
	/* If in inverse mode, dimensions will be N by 2N for augmented NxN */
	if (!heightReader) N *= 2;
	let pivotCol = 0;
	let pivotRow = 0;
	while (pivotCol < N && pivotRow < M) {
		let count = moveZeroRowsToBottom(mat, pivotRow, pivotCol);
		if (count == 0) {
			pivotCol++;
			continue;
		}
		let c = mat[pivotRow][pivotCol].reciprocal();
		multRow(mat, pivotRow, c);
		for (let row = 0; row < M; row++) {
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
	let temp = mat[i];
	mat[i] = mat[j];
	mat[j] = temp;
}

/* Mutiply row i by Fraction c. */
function multRow(mat, i, c) {
	for (let j = 0; j < N; j++) {
		mat[i][j] = mat[i][j].multiply(c);
	}
}

/* Add c times row i to row j. */
function addRows(mat, c, i, j) {
	for (let col = 0; col < N; col++) {
		mat[j][col] = mat[j][col].add(mat[i][col].multiply(c));
	}
}

/* Move all rows below and including start with a zero in column j to the bottom of mat. Return 
count of rows with non-zero entry at col j. */
function moveZeroRowsToBottom(mat, start, j) {
	let count = 0;
	let bottom = M;
	let i = start;
	while (i < bottom) {
		if (mat[i][j].numerator == 0) {
			swapRows(mat, i, bottom-1);
			bottom--;
		}
		else {
			count++;
			i++;
		}
	}
	return count;
}

/* Return NxN Fraction matrix corresponding to inverse of NxN input, or string "NONE" if inverse
doesn't exist. */
function getInverse() {
	let mat = [];
	for (let i = 0; i < N; i++) {
		let row = [];
		for (let j = 0; j < N; j++) {
			row.push(parseInt(document.getElementById(`${i}${j}`).value));
		}
		mat.push(row);
	}
	/* Inverse exists iff det != 0 */
	if (det(mat) == 0) return "NONE";
	/* Augment matrix with I_n */
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			mat[i][j] = new Fraction(mat[i][j], 1);
			if (i == j) mat[i].push(new Fraction(1,1));
			else mat[i].push(new Fraction(0,1));
		}
	}
	/* Rref augmented matrix and retrieve solution */
	rref(mat);
	let ans = [];
	for (let i = 0; i < N; i++) {
		let row = [];
		for (let j = 0; j < N; j++) {
			row.push(mat[i][N+j]);
		}
		ans.push(row);
	}
	return ans;
}

/* Recursive determinant calculation function. */
function det(arr) {
	const n = arr.length;
	if (n == 1) return arr[0][0];
	let ans = 0;
	for (let j = 0; j < n; j++) {
		if (j%2 == 0) ans += arr[0][j] * det(subArr(arr,j));
		else ans -= arr[0][j] * det(subArr(arr,j));
	}
	return ans;
}

/* Given NxN array, return (N-1)x(N-1) array corresponding to removing 0th row and j'th column. */
function subArr(arr,j) {
	const n = arr.length;
	let ans = [];
	for (let r = 1; r < n; r++) {
		let row = [];
		for (let c = 0; c < n; c++) {
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
		if (this.numerator % this.denominator == 0) return (this.numerator/this.denominator).toString();
		if (this.denominator < 0) {
			this.numerator *= -1;
			this.denominator *= -1;
		}
		return this.numerator + "/" + this.denominator;
	}
	simplify() {
		const g = gcd(Math.abs(this.numerator),Math.abs(this.denominator));
		this.numerator /= g;
		this.denominator /= g;
	}
	reciprocal() {
		return new Fraction(this.denominator,this.numerator);
	}
	multiply(f) {
		let ans = new Fraction(this.numerator*f.numerator, this.denominator*f.denominator)
		ans.simplify();
		return ans;
	}
	add(f) {
		let newNum = this.numerator*f.denominator + this.denominator*f.numerator;
		let newDen = this.denominator * f.denominator;
		let ans = new Fraction(newNum,newDen);
		ans.simplify();
		return ans;
	}
}

function gcd(a,b) {
	if (a == 0) return b;
	if (b == 0) return a;
	return gcd(b,a%b);
}
