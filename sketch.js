let axis;
let cellSize;
let cells;
let grid;

const NUM_ROWS = 10;

function setup() {
	createCanvas(windowWidth, windowHeight);
	axis = windowWidth < windowHeight ? windowWidth : windowHeight;
	cellSize = axis / NUM_ROWS;
	cells = initCells();
	grid = new Grid();
	grid.initGrid(cells);
}

function draw() {
	background(0);
	rectMode(CENTER);

	translate(width / 2, height / 2);
	fill(100);
	rect(0, 0, axis, axis);

	cells.forEach(row => {
		row.forEach(cell => {
			cell.display();
			cell.within(mouseX - width / 2, mouseY - height / 2);
		})
	})
}

function initCells() {
	let cells = [];
	for (let i = 0; i < axis; i += cellSize) {
		let row = [];
		for (let j = 0; j < axis; j += cellSize) {
			let x = j - (axis / 2) + (cellSize / 2);
			let y = i - (axis / 2) + (cellSize / 2);
			row.push(new Cell(x, y, cellSize));
		}
		cells.push(row);
	}
	return cells;
}
