/**
 * @fileoverview Simulation of a spatial Poisson point process. This demonstration randomly generates squares on the HTML canvas, and randomly places points on the canvas. The script counts the number of points in each square, and plots the distribution of the points per square, to indicate the amount of squares with 0 points, 1 point, 2 points, etc.
 */


var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var slider = document.getElementById("num_squares_slider");
var slider_value_label = document.getElementById("squares_slider_val_label");

let num_points: number = 1000;
let num_squares: number = 200;
// TODO: Refactor so square_side is absolute number of pixels, not percentage of side length.
let square_side: number = 0.05;	// percentage of canvas side length

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

class Point {
	x: any;
	y: any;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	draw() {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, 3, 3);
	}
}
var points:Point[];

// TODO: Parallelize this function if there are many points.
function createPoints () {
	// console.log("Generating points.");
	for (var i: number = 0; i < num_points; i++) {
		// TODO: check that this won't take forever.
		var x:number = Math.random()*canvas.width *(1.0 - square_side);
		var y:number = Math.random()*canvas.height*(1.0 - square_side);
		// Determines if each point is inside a square.
		squares.forEach(function(square) {
			if (square.contains(x, y)) {
				// Count points inside square and records.
				// TODO: If the condition that squares do not overlap is set, then make sure to early break here if a point is in a square, for efficiency.
				square.points_contained += 1;
			}
		});
		
		points.push(new Point(x, y));
	}
	console.log("num points = " + points.length);
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
	getArea(): number {
		return this.side * this.side;
	}
	contains(x: number, y: number): boolean {
		return (this.x <= x && x <= this.x + this.side) && (this.y <= y && y <= this.y + this.side);
	}
	draw() {
		// Chooses random color. 3 rgb colors mean 3 hex values, meaning 3*8 bits.
		// So there are 16777216 possible colors from 0 to 16777215.
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.strokeStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);
		ctx.rect(this.x, this.y, this.side, this.side);
		ctx.stroke();
	}
}
var squares: Square[];

// function squareOverlapsSquare(x:number, y:number) {
// 	var i = 0;
// 	var overlaps: boolean = false;
// 	console.log("\tTesting square (" + x + ", " + y + ").");
// 	squares.forEach(function(square){
// 		if (square.contains(x, y) || square.contains(x + square_side*canvas.width, y) || square.contains(x, y + square_side*canvas.width) || square.contains(x + square_side*canvas.width, y + square_side*canvas.width)) {
// 			console.log("\t\tOops! square (" + x + ", " + y + ") overlaps!");
// 			i = i + 1;
// 			overlaps = true;
// 			return;
// 		}
// 		console.log("\t\tDoes not ovelap with square " + i + " at (" + square.x + ", " + square.y + ").");
// 		i = i + 1;
// 	});
// 	return overlaps;
// }

// TODO: Add a button that controls whether squares are allowed to overlap or not.

function createSquares () {
	// Ensure squares do not overlap.
	// console.log("Generating squares (side = " + square_side*canvas.width + ").");
	// Ensure square area and amount of squares is chosen well.
	for (var i = 0; i < num_squares; i++) {
		var x:number;
		var y:number;
		// TODO: check that this won't take forever.
		// do {
			// Ensure square is within canvas bounds.
			x = Math.random()*canvas.width *(1.0 - square_side);
			y = Math.random()*canvas.height*(1.0 - square_side);
			
			// Ensure square does not overlap existing squares.
		// } while (squareOverlapsSquare(x, y));
		// Ensure square does not overlap with existing squares.
		squares.push(new Square(x, y, square_side*canvas.width));
		// console.log("\tgenerated square " + i + " at (" + x + ", " + y + ")!");
	}
	console.log("num squares = " + squares.length);
}

function startSimulation() {
	// Clear existing squares and points.
	squares = Array();
	points = Array();

	// Create random squares, and ensure they do not overlap.
	createSquares();

	// Create random points.
	createPoints();
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

	// Draw all squares.
	squares.forEach(function(square){
		square.draw();
	});
	// Draw all points.
	points.forEach(function(point){
		point.draw();
	});
}

// TODO: Allow these to be bucketed using some sort of parameter for the width of buckets / number of buckets
function getHitCounts() {
	let count_histogram: Map<number, number> = new Map<number, number>();
	squares.forEach(function(square){
		let hits: number = square.points_contained;
		if (count_histogram.has(hits)) {
			count_histogram.set(hits, count_histogram.get(hits) + 1);
		} else {
			count_histogram.set(hits, 1);
		}
		// console.log("\t\tCounted " + hits + " points for a square.");
	});
	console.log("Recorded " + count_histogram.size + " unique counts for all " + squares.length + " squares.");
	return count_histogram;
}

function factorial(x: number): number {
	var fact: number = x > 0? x : 1;
	var i = x - 1;
	while (i > 1) {
		fact = fact * i
		i--;
	}
	return fact;
}

function getPoissonPrediction(num_bins : number): Map<number, number> {
	// Calculates lambda, the expected number of hits per square.
	let canvas_area: number = canvas.height * canvas.width;
	let square_area: number = (square_side * canvas.width)**2;
	let expected_lambda:number = num_points * (square_area / canvas_area);
	let expected_histogram: Map<number, number> = new Map<number, number>();
	
	console.log("canvas_area: ", canvas_area);
	console.log("square_area: ", square_area);
	console.log("expected_lambda: ", expected_lambda);
	
	for(var i: number = 0; i < num_bins; i++) {
		// P(k) = exp(-1 * lambda *t) * (((lambda * t)**k)/(k!)), t = time,(for spatial process, t is the size of the square, which here is constant, so 1), k = bin. 
		expected_histogram.set(i, num_squares * Math.exp(-1 * expected_lambda) * Math.pow(expected_lambda, i) / factorial(i));
	}
	return expected_histogram;
}

// Updates the plot on the webpage to show how the Poisson distribution is approximated.
function updatePlot() {
	// TODO: write function to print histogram to command line
	let count_histogram: Map<number, number> = getHitCounts();
	console.log("Printing all " + count_histogram.size + " counts:")
	// let max_bin: number = Math.max(Array.from(count_histogram.keys()));
	let max_bin: number =
	 	Array.from(count_histogram.keys())
			.reduce(function(previous, current, index, arr){return Math.max(previous, current)});
	console.log("Max bin: " + max_bin);
	
	let x_plot_data:Array<number> = Array.from(count_histogram.keys());
	let y_plot_data:Array<number> = Array.from(count_histogram.values());
	let bins: Array<number> = Array.from(count_histogram.keys());
	
	bins.forEach(function(count){
		console.log("\t" + count + ": " + count_histogram.get(count));
	});
	
	let expected_histogram: Map<number, number> = getPoissonPrediction(/*num_bins = */ max_bin + 1);
	let x_plot_expectation:Array<number> = Array.from(expected_histogram.keys());
	let y_plot_expectation:Array<number> = Array.from(expected_histogram.values()); 
	
	var TESTER = document.getElementById('tester');
	
	var layout = {
		title: 'Spatial Poisson Process Distrubution',
		xaxis: {
			title: 'Points in square'
		},
		yaxis: {
			title: 'Number of squares'
		},
		legend: {
			side: 'top'
		}
	};
	Plotly.newPlot( TESTER,
		[
			{
				name: "Points per square",
				x: x_plot_data,
				y: y_plot_data,
				type: 'bar'
			},
			{
				name: "Poisson expected points per square",
				x: x_plot_expectation,
				y: y_plot_expectation,
				type: 'bar'
			}
		], 
		layout
		// { margin: { t: 0 } }
	);
}

function runAndDisplayAll() {
	setUpCanvas();
	startSimulation();
	drawAll();
	updatePlot();
	document.getElementById("run_button")["disabled"] = true;
}

window.onload = function() {
	runAndDisplayAll();
}
