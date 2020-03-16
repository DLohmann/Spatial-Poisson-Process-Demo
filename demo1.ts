//import * as Plotly from 'plotly.js';

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var slider = document.getElementById("num_squares_slider");
var slider_value_label = document.getElementById("squares_slider_val_label");
//slider_value_label.innerHTML = slider.value;
//document.getElementById("slider_val_label").innerHTML = slider.value;
//updateSliderLabel(slider.value);


// numSquares slider.
function updateSquaresSliderLabel(x: string) {
	document.getElementById("squares_slider_val_label").innerHTML = x;
	num_squares = parseInt(x);
	document.getElementById("run_button")["disabled"] = false;
}
function squaresSliderDecrement() {
	document.getElementById("num_squares_slider")["value"] = parseInt(document.getElementById("num_squares_slider")["value"]) - 1;
	updateSquaresSliderLabel(document.getElementById("num_squares_slider")["value"]);
}
function squaresSliderIncrement() {
	document.getElementById("num_squares_slider")["value"] = parseInt(document.getElementById("num_squares_slider")["value"]) + 1;
	updateSquaresSliderLabel(document.getElementById("num_squares_slider")["value"]);
}


// numPoints slider.
function updatePointsSliderLabel(x: string) {
	document.getElementById("points_slider_val_label").innerHTML = x;
	num_points = parseInt(x);
	document.getElementById("run_button")["disabled"] = false;
}
function pointsSliderDecrement() {
	document.getElementById("num_points_slider")["value"] = parseInt(document.getElementById("num_points_slider")["value"]) - 1;
	updatePointsSliderLabel(document.getElementById("num_points_slider")["value"]);
}
function pointsSliderIncrement() {
	document.getElementById("num_points_slider")["value"] = parseInt(document.getElementById("num_points_slider")["value"]) + 1;
	updatePointsSliderLabel(document.getElementById("num_points_slider")["value"]);
}

/*
function sliderIncrement() {
	document.getElementById("num_squares_slider")["value"] += 1;
	updateSliderLabel(document.getElementById("num_squares_slider")["value"]);
	console.log("slider increment called");
}
*/

let num_points = 50;
let num_squares = 10;
let square_side = 0.05;	// percenage of canvas side length


function greeter(person) {
	return "Hello " + person + "!";
}

class Point {
	x: any;
	y: any;
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	draw() {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, 1, 1);
	}
}
var points:Point[];

function createPoints () {
	// Choose the number of points well.
}

class Square {
	x: number;
	y: number;
	side: number;
	points_contained: number = 0;
	constructor(x: number, y: number, side: number) {
		this.x = x;
		this.y = y;
		this.side = side;
	}
	getArea() {
		return this.side * this.side;
	}
	contains(x: number, y: number): boolean {
		return (this.x <= x && x <= this.x + this.side) && (this.y <= y && y <= this.y + this.side);
	}
	containsPoint(point: Point): boolean {
		return this.contains(point.x, point.y);
	}
	draw() {
		// Choose random color. 3 rgb colors mean 3 hex values, meaning 3*8 bits.
		// So there are 16777216 possible colors from 0 to 16777215.
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.strokeStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);
		ctx.rect(this.x, this.y, this.side, this.side);
		ctx.stroke();
	}
}
var squares: Square[];
// TODO: Test this function. This test case failed:
/*
Generating squares (side = 29.450000000000003).
	Testing square (134.77924515136962, 501.4710737782528).
	generated square 0 at (134.77924515136962, 501.4710737782528)!
	Testing square (166.2862055874647, 339.1997454269453).
		Does not ovelap with square 0 at (134.77924515136962, 501.4710737782528).
	generated square 1 at (166.2862055874647, 339.1997454269453)!
	Testing square (43.390649059185094, 530.3626894170886).
		Does not ovelap with square 0 at (134.77924515136962, 501.4710737782528).
		Does not ovelap with square 1 at (166.2862055874647, 339.1997454269453).
	generated square 2 at (43.390649059185094, 530.3626894170886)!
	Testing square (478.69423019277565, 418.92379719295894).
		Does not ovelap with square 0 at (134.77924515136962, 501.4710737782528).
		Does not ovelap with square 1 at (166.2862055874647, 339.1997454269453).
		Does not ovelap with square 2 at (43.390649059185094, 530.3626894170886).
	generated square 3 at (478.69423019277565, 418.92379719295894)!
	Testing square (167.52953156146978, 320.05270148552967).							<- OVERLAP!
		Does not ovelap with square 0 at (134.77924515136962, 501.4710737782528).
		Does not ovelap with square 1 at (166.2862055874647, 339.1997454269453).						<- OVERLAP!
		Does not ovelap with square 2 at (43.390649059185094, 530.3626894170886).
		Does not ovelap with square 3 at (478.69423019277565, 418.92379719295894).
	generated square 4 at (167.52953156146978, 320.05270148552967)!
num squares = 5
*/
function squareOverlapsSquare(x:number, y:number) {
	var i = 0;
	var overlaps: boolean = false;
	console.log("\tTesting square (" + x + ", " + y + ").");
	squares.forEach(function(square){
		if (square.contains(x, y) || square.contains(x + square_side, y) || square.contains(x, y + square_side) || square.contains(x + square_side, y + square_side)) {
			console.log("\t\tOops! square (" + x + ", " + y + ") overlaps!");
			i = i + 1;
			overlaps = true;
			return;
		}
		console.log("\t\tDoes not ovelap with square " + i + " at (" + square.x + ", " + square.y + ").");
		i = i + 1;
	});
	return overlaps;
}

function createSquares () {
	// Ensure squares do not overlap.
	console.log("Generating squares (side = " + square_side*canvas.width + ").");
	// Ensure square area and amount of squares is chosen well.
	for (var i = 0; i < num_squares; i++) {
		var x:number;
		var y:number;
		// TODO: check that this won't look forever.
		do {
			// Ensure square is within canvas bounds.
			x = Math.random()*canvas.width *(1.0 - square_side);
			y = Math.random()*canvas.height*(1.0 - square_side);
			
			// Ensure square does not overlap existing squares.
		} while (squareOverlapsSquare(x, y));
		// Enure square does not overlap with existing squares.
		squares.push(new Square(x, y, square_side*canvas.width));
		console.log("\tgenerated square " + i + " at (" + x + ", " + y + ")!");
	}
	console.log("num squares = " + squares.length);
}

function startSimulation() {
	// Clear existing squares and points.
	squares = Array();
	points = Array();

	// Create random points.
	
	// Create random squares, and ensure they do not overlap.
	createSquares();

	// Determine if each point is inside square.
	
	// Count points inside square, and record.
}

function getCanvasArea() {
	return canvas.height * canvas.width;
}

//document.body.textContent = greeter(user);

function setUpCanvas() {
	canvas = document.getElementById("disp") as HTMLCanvasElement;
	canvas.height = 0.60 * Math.min(window.innerHeight, window.innerWidth);
	canvas.width = canvas.height;
	ctx = canvas.getContext("2d");
	//ctx.fillStyle="blue";
	//ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#EFEFEF";
	
}

function drawAll() {
	// Clear current drawing
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw all points.
	// Draw all squares.
	squares.forEach(function(square){
		square.draw();
	});
	// Update point hit count.
	// Update probability (of a single rectange getting hit or a single point hitting?)
	//let probability_hit
}

function updatePlot() {
	console.log("Update plot");
	// update the plot on webpage to show how Poisson distribution is approximated.
	// Plot next to actual Poisson plot.
	// Also log to console.
	/*
	const data: Plotly.BarData[] = [
		{
		  x: ['giraffes', 'orangutans', 'monkeys'],
		  y: [20, 14, 23],
		  type: 'bar'
		}
	  ];
	  
	  Plotly.newPlot('histogram_plot', data);
	  */
}

function runAndDisplayAll() {
	setUpCanvas();
	startSimulation();
	drawAll();
	updatePlot();
	document.getElementById("run_button")["disabled"] = true;
}

window.onload = window.onresize = function() {
	runAndDisplayAll();
}

