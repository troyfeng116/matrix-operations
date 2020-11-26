const inputContainer = document.getElementById("widthInputContainer");
const mReader = document.getElementById("mReader");
const nReader = document.getElementById("nReader");
const kReader = document.getElementById("kReader");
const submitButton = document.getElementById("submitButton");

const grid1 = document.getElementById("gridContainer1");
const grid2 = document.getElementById("gridContainer2");

const secondInputContainer = document.getElementById("secondInputContainer");
const fillZeroButton = document.getElementById("fillZeroButton");
const calculateButton = document.getElementById("calculateButton");

const outputContainer = document.getElementById("outputContainer");
const outputGrid = document.getElementById("outputGrid");

let M;
let N;
let K;

submitButton.onclick = function() {
	M = mReader.value;
	if (isNaN(M) || M < 1 || M > 6 || M%1 != 0) {
		mReader.className = "invalid";
	}
	else mReader.className = "";
	N = nReader.value;
	if (isNaN(N) || N < 1 || N > 6 || N%1 != 0) {
		nReader.className = "invalid";
	}
	else nReader.className = "";
	K = kReader.value;
	if (isNaN(K) || K < 1 || K > 6 || K%1 != 0) {
		kReader.className = "invalid";
	}
	else kReader.className = "";
	
	if (mReader.className == "invalid" || nReader.className == "invalid" || kReader.className == "invalid") {
		alert("M, N, and K must be between 1 and 6");
		return;
	}
	generateGrids();
	outputContainer.style.visibility = "hidden";
	secondInputContainer.style.visibility = "visible";
}

fillZeroButton.onclick = function() {
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			if (document.getElementById(`${i}${j}MN`).value == "") {
				document.getElementById(`${i}${j}MN`).value = "0";
			}
		}
	}
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < K; j++) {
			if (document.getElementById(`${i}${j}NK`).value == "") {
				document.getElementById(`${i}${j}NK`).value = "0";
			}
		}
	}
}

calculateButton.onclick = function() {
	if (!assertInputs()) {
		alert("Make sure all entries are filled with numbers");
		return;
	}
	while (outputGrid.firstChild) {
		outputGrid.removeChild(outputGrid.firstChild);
	}
	outputGrid.style.width = `${60 * K}px`;
	outputGrid.style.height = `${36 * M}px`;
	outputGrid.style.gridTemplateRows = `repeat(${M},1fr)`;
	outputGrid.style.gridTemplateColumns = `repeat(${K},1fr)`;
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < K; j++) {
			const entry = document.createElement("div");
			entry.id = `${i}${j}`;
			outputGrid.appendChild(entry);
		}
	}
	let ans = getProduct();
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < K; j++) {
			document.getElementById(`${i}${j}`).innerHTML = ans[i][j];
		}
	}
	outputContainer.style.visibility = "visible";
}

function generateGrids() {
	while (grid1.firstChild) {
		grid1.removeChild(grid1.firstChild);
	}
	while (grid2.firstChild) {
		grid2.removeChild(grid2.firstChild);
	}
	grid1.style.visibility = "visible";
	grid1.style.height = N <= 4 && M <= 4 ? `${48 * M}px` : `${36 * M}px`;
	grid1.style.width = N <= 4 && M <= 4 ? `${60 * N}px` : `${48 * N}px`;
	grid1.style.gridTemplateRows = `repeat(${M},1fr)`;
	grid1.style.gridTemplateColumns = `repeat(${N},1fr)`;
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			const inputBox = document.createElement("input");
			inputBox.type = "text";
			inputBox.size = "3";
			inputBox.id = `${i}${j}MN`;
			grid1.appendChild(inputBox);
		}
	}
	grid2.style.visibility = "visible";
	grid2.style.width = N <= 4 && K <= 4 ? `${60 * K}px` : `${48 * K}px`;
	grid2.style.height = N <= 4 && K <= 4 ? `${48 * N}px` : `${36 * N}px`;
	grid2.style.gridTemplateRows = `repeat(${N},1fr)`;
	grid2.style.gridTemplateColumns = `repeat(${K},1fr)`;
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < K; j++) {
			const inputBox = document.createElement("input");
			inputBox.type = "text";
			inputBox.size = "3";
			inputBox.id = `${i}${j}NK`;
			grid2.appendChild(inputBox);
		}
	}
}

function assertInputs() {
	let allGood = true;
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			const x = document.getElementById(`${i}${j}MN`).value;
			if (isNaN(x) || x == "") {
				allGood = false;
				document.getElementById(`${i}${j}MN`).className = "invalid";
			}
			else document.getElementById(`${i}${j}MN`).className = "";
		}
	}
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < K; j++) {
			const y = document.getElementById(`${i}${j}NK`).value;
			if (isNaN(y) || y == "") {
				allGood = false;
				document.getElementById(`${i}${j}NK`).className = "invalid";
			}
			else document.getElementById(`${i}${j}NK`).className = "";
		}
	}
	return allGood;
}

function getProduct() {
	let ans = [];
	for (let i = 0; i < M; i++) {
		let row = [];
		for (let j = 0; j < K; j++) {
			let sum = 0;
			for (let z = 0; z < N; z++) {
				let x = document.getElementById(`${i}${z}MN`).value;
				let y = document.getElementById(`${z}${j}NK`).value;
				sum += x*y;
			}
			row.push(sum);
		}
		ans.push(row);
	}
	return ans;
}

