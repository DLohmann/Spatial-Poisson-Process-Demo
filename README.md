# Spatial-Poisson-Process-Demo

Spatial Poisson Process visual for this wikipedia article:
https://en.wikipedia.org/wiki/Poisson_point_process

## Demo 1:
Draw random unit squares (area = 1), in a region with area A. Then draw N random points all at once. Keep track if how many points land in the unit square. Do this many times. Then plot how many times 0 points landed in square, 1 point landed inside, 2 points, etc. Then plot against Poisson distribution. 

## Demo 2:
Same thing, but draw the points first, and then randomly place the square.

### TODO:
- Write a [tsconfig.json file](https://stackoverflow.com/questions/43472778/typescript-exports-is-not-defined), to ensure that it is set up correctly, and the javascript does not give an "exports is not defined" error at runtime. Learn to use browserify.
- Add plot for the number of squares hit by 1 point, 2 points, 3, etc.
- Add htmlsliders for number of points, number of squares, and the size of squares (as a percentage of size of canvas).
- Add text on simulation indicating probability that a single point will hit a square.
- Add a button to control when to start simulation.
- Add a license.
- Upload to github pages  or google sites.
- Unit test the demo. Replace "TestSpatialPoissonProcess" in the package.json file with whatever command should be used to run the tests when "npm test" is called.
- Upload a gif to wikipedia.
- Consider making a 1 dimensional version where raindrops vertically fall into buckets in a row, and the buckets fill up over time, and the histogram of the amount of drops collected is plotted.
- If the performance is not good, consider using webassembly or gpu to speed up the process of generating squares without collisions (which is an O(n^2) algorithm for n squares) and checking whether points are inside squares (also approximately O(n*m) for n squares and m points).
- Tell friends.

### Useful links:
- Typescript basics [tutorial](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).
- Monte Carlo animation [example](https://codereview.stackexchange.com/questions/216614/monte-carlo-pi-animation?rq=1).

