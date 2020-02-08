
function greeter(person) {
	return "Hello " + person + "!";
}

function drawSquare() {
	
}

let user = "David";

//document.body.textContent = greeter(user);

const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");
ctx.fillStyle="black";
canvas.clientHeight = window.innerWidth*0.75;
canvas.clientWidth = window.innerHeight*0.75;

