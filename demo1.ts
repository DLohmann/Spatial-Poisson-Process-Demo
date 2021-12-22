//import * as Plotly from 'plotly.js';
//import * as Plotly from 'plotly-latest.min.js';

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var slider = document.getElementById("num_squares_slider");
var slider_value_label = document.getElementById("squares_slider_val_label");
//slider_value_label.innerHTML = slider.value;
//document.getElementById("slider_val_label").innerHTML = slider.value;
//updateSliderLabel(slider.value);

let num_points = 1000;	// parseInt(document.getElementById("num_points_slider")["value"]);
let num_squares = 200;	// parseInt(document.getElementById("num_squares_slider")["value"]);
// TODO: Refactor so square_side is absolute number of pixels, not percentage of side length.
let square_side = 0.05;	// percentage of canvas side length

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

class Point {
	x: any;
	y: any;
	constructor(x, y) {
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
		squares.forEach(function(square) {
			if (square.contains(x, y)) {
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
		if (square.contains(x, y) || square.contains(x + square_side*canvas.width, y) || square.contains(x, y + square_side*canvas.width) || square.contains(x + square_side*canvas.width, y + square_side*canvas.width)) {
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
	
	// Determine if each point is inside square.
	
	// Count points inside square, and record.
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
	
	// Update probability (of a single rectange getting hit or a single point hitting?)
	//let probability_hit
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

// TODO: Plot the Poisson prediction along with the results.
function getPoissonPrediction(num_bins : number) {
	
	let canvas_area: number = canvas.height * canvas.width;
	let square_area: number = (square_side * canvas.width)**2;
	let expected_lambda:number = num_points * (square_area / canvas_area);
	let expected_histogram: Map<number, number> = new Map<number, number>();
	
	console.log("Expected lambda: ", expected_lambda);
	
	for(var i: number = 0; i < num_bins; i++) {
		// P(k) = exp(-1 * lambda *t) * (((lambda * t)**k)/(k!)), t = time,(for spatial process, t is the size of the square, which here is constant, so 1), k = bin. 
		expected_histogram.set(i, Math.exp(-1 * expected_lambda) * (expected_lambda * i) / factorial(i));
	}
	return expected_histogram;
}

function updatePlot() {
	console.log("Update plot");
	// update the plot on webpage to show how Poisson distribution is approximated.
	// Plot next to actual Poisson plot.
	// Also log to console.
	
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
	
	// Plotly.newPlot( TESTER,
	// 	Plotly.BarData[] = [
	// 		{
	// 			x:x_plot_data, 
	// 			y:y_plot_data, 
	// 			type:'bar'
	// 		}
	// 	]
	// );
	
	var layout = {
		title: 'Spatial Poisson Process Distrubution',
		xaxis: {
			title: 'Points in square'
		},
		yaxis: {
			title: 'Number of squares'
		}
	};
	var plot_data = [{ // data
		x: x_plot_data,
		y: y_plot_data,
		type: 'bar'
	}];
	Plotly.newPlot( TESTER,
		// plot_data,
		// layout
		
		[
			{
				name: "Points per square",
				x: x_plot_data,
				y: y_plot_data,
				type: 'bar'
			},
			{
				name: "Poisson Expectation",
				x: x_plot_expectation,
				y: y_plot_expectation,
				type: 'bar'
			}
		], 
		layout
		// { margin: { t: 0 } }
	);
	
	
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

window.onload = /*window.onresize =*/ function() {
	runAndDisplayAll();
}

