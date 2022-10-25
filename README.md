# Spatial-Poisson-Process-Demo

Spatial Poisson Process visual for this wikipedia article:
https://en.wikipedia.org/wiki/Poisson_point_process

## Overview
Draws random unit squares (area = 1), in a region with area A. Then draws N random points all at once. Records how many points land in each unit square. Does this many times. Then plots how many times 0 points landed in square (how many squares are empty), how many squares contain exactly 1 point, 2 points, etc. Then plots this against the Poisson expected distribution. 

### TODO:
- Fix the [exports not defined error](https://stackoverflow.com/questions/43472778/typescript-exports-is-not-defined), to ensure that the project is set up correctly, and the javascript does not give an "exports is not defined" error at runtime. Learn to use browserify.
- Add plot for the number of squares hit by 1 point, 2 points, 3, etc. Figure out how to use plotly in typescript to do ths.
- Add [html sliders](https://www.w3schools.com/howto/howto_js_rangeslider.asp) for number of points, number of squares, and the size of squares (as a percentage of size of canvas).
- Add text on simulation indicating probability that a single point will hit a square.
- Add this page to personal website.
- Upload a gif to wikipedia.
- Add a screenshot of the page to the "overview" section of the README, to appear on github.
- Tell friends.
- Add the equation used to calculate the expectation in the plot.
- Add explanation of the Wikipedia page and edit. Link to the Wikipedia page and the source code in GitHub.

### Potential future related projects:
- Make a demo that does the same thing, but draw the points first, and then randomly place the squares.
- Unit test the demo. Replace "TestSpatialPoissonProcess" in the package.json file with whatever command should be used to run the tests when "npm test" is called. Figure out if [gts](https://github.com/google/gts) has a recommended style of testing.
- Consider making a 1 dimensional version where raindrops vertically fall into buckets in a row, and the buckets fill up over time, and the histogram of the amount of drops collected is plotted.
- If the performance is not good, consider using webassembly or gpu to speed up the process of generating squares without collisions (which is an O(n^2) algorithm for n squares) and checking whether points are inside squares (also approximately O(n*m) for n squares and m points).

### Useful links:
- Typescript basics [tutorial](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).
- Monte Carlo animation [example](https://codereview.stackexchange.com/questions/216614/monte-carlo-pi-animation?rq=1).
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
- https://www.w3schools.com/howto/howto_js_rangeslider.asp
- https://www.bauer.uh.edu/parks/slider.htm
- Good example of slider usage: https://playground.tensorflow.org

