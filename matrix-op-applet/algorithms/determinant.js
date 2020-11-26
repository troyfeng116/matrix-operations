const inputContainer = document.getElementById("widthInputContainer");
const submitButton = document.getElementById("submitButton");
const widthReader = document.getElementById("widthReader");

const grid = document.getElementById("gridContainer");

const secondInputContainer = document.getElementById("secondInputContainer");
const fillZeroButton = document.getElementById("fillZeroButton");
const calculateButton = document.getElementById("calculateButton");

const outputContainer = document.getElementById("outputContainer");

let n;

submitButton.onclick = function() {
	n = widthReader.value;
	if (isNaN(n) || n < 1 || n > 8 || n%1 != 0) {
		widthReader.className = "invalid";
		alert("N must be between 1 and 8");
		return;
	}
	widthReader.className = "";
	generateGrid();
	secondInputContainer.style.visibility = "visible";
	outputContainer.style.visibility = "hidden";
}

fillZeroButton.onclick = function() {
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			if (document.getElementById(`${i}${j}`).value === "") {
				document.getElementById(`${i}${j}`).value = "0";
			}
		}
	}
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
	grid.style.height = n <= 4 ? `${48 * n}px` : `${36 * n}px`;
	grid.style.width = n <= 4 ? `${60 * n}px` : `${48 * n}px`;
	grid.style.gridTemplateRows = `repeat(${n}, 1fr)`;
	grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			const inputField = document.createElement("input");
			inputField.type = "text";
			inputField.size = 3;
			inputField.id = `${i}${j}`;
			grid.appendChild(inputField);
		}
	}
	grid.style.visibility = "visible";
}

/* Assert that all NxN text fields are populated with integers. */
function assertMatInput() {
	let allGood = true;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			if (isNaN(document.getElementById(`${i}${j}`).value) || document.getElementById(`${i}${j}`).value === "") {
				allGood = false;
				document.getElementById(`${i}${j}`).className = "invalid";
			}
			else document.getElementById(`${i}${j}`).className = "";
		}
	}
	return allGood;
}

/* Given that text fields in grid are all integers, retrieve inputs and place into NxN array, call det(). */
function calculateDeterminant() {
	let arr = [];
	for (let i = 0; i < n; i++) {
		let row = [];
		for (let j = 0; j < n; j++) {
			row.push(document.getElementById(`${i}${j}`).value);
		}
		arr.push(row);
	}
	return det(arr);
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

