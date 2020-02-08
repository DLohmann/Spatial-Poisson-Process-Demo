let probability_hit = 0.20;

function greeter(person) {
	return "Hello " + person + "!";
}

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	draw() {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, 3, 3);
	}
}

function createPoints () {
	// Choose the number of points well.
}

function createSquares () {
	// Ensure squares do not overlap.
	// Ensure square area and amount of squares is chosen well.
}
// 
class Square {
	constructor(number: x, number: y, number: side) {
		this.x = x;
		this.y = y;
		this.side = side;
	}
	getArea() {
		return side * side;
	}
	containsPoint(point: Point): boolean;
	containsPoint(point: {x: number; y: number;}): boolean;
	containsPoint(point) any {
		if (point instanceof Point) {
			return containsPoint(point.x, point.y);
		}
		if (typeof point == "object") {
			return (this.x < point.x && point.x < this.x + this.side) && (this.y < point.y && point.y < this.y + this.side);
		}
	}
}


function startSimulation() {
	// Create random points.
	let num_points = 
	// Create random squares, and ensure they do not overlap.
	
	// Determine if each point is inside square.
	
	// Count points inside square, and record.
}

function getCanvasArea(canvas : HTMLCanvasElement) {
	return canvas.height * canvas.width;
}

let user = "David";
let num_points = 0;
//document.body.textContent = greeter(user);
function setUpCanvas() {
	const canvas = document.getElementById("disp") as HTMLCanvasElement;
	canvas.height = 0.75 * Math.min(window.innerHeight, window.innerWidth);
	canvas.width = canvas.height;
	var ctx = canvas.getContext("2d");
	//ctx.fillStyle="blue";
	//ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#EFEFEF";
	
}

function drawAll() {
	// Clear current drawing
	ctx.clearRect(0, 0, width, height);
	// Draw all points.
	// Draw all squares.
	// Update point hit count.
}

function updatePlot() {
	// update the plot on webpage to show how Poisson distribution is approximated.
	// Plot next to actual Poisson plot.
	// Also log to console.
}

window.onload = window.onresize = function() {
	setUpCanvas();
	startSimulation();
	drawAll();
	updatePlot();
}

