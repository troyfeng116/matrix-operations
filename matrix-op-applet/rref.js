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
	widthInputContainer.style.left = "10px";
	widthInputContainer.style.top = "30%"
	widthInputContainer.style.transform = "translate(0,-50%)";
}