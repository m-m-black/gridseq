let axis;
let cellSize;
let cells;
let grid;
let activeCells;
let intersectCells;
let rhythms;
let sounds;
let sloop;
let sessionStarted;

const NUM_ROWS = 10;
const TEMPO = 125;

function preload() {
	sounds = [];
	for (let i = 0; i < 100; i++) {
		sounds[i] = loadSound("audio/" + i + ".wav");
	}
	sounds.forEach(sound => {
		sound.playMode('restart');
	})
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	axis = windowWidth < windowHeight ? windowWidth : windowHeight;
	cellSize = axis / NUM_ROWS;
	cells = initCells();
	grid = new Grid();
	grid.initGrid(cells);
	activeCells = [];
	intersectCells = [];
	rhythms = [];
	sessionStarted = false;
}

function draw() {
	background(0);
	rectMode(CENTER);

	if (sessionStarted) {
		noStroke();
		translate(width / 2, height / 2);
		fill(100);
		rect(0, 0, axis, axis);

		noFill();
		strokeWeight(1);
		stroke(255);

		cells.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				cell.display();
			})
		})
	} else {
		drawText();
	}
}

function drawText() {
	fill(200);
	textSize(width / 50);
	textAlign(CENTER, CENTER);
	textFont("Comfortaa");
	text("Click anywhere to start...", width / 2, height / 2);
}

function go(cycleStartTime) {
	rhythms.forEach(rhythm => {
		rhythm.update(cells, cycleStartTime);
	})
}

function mousePressed() {
	if (sessionStarted) {
		cells.forEach((row,rowIndex) => {
			row.forEach((cell, cellIndex) => {
				if (cell.within(mouseX - width / 2, mouseY - height / 2)) {
					if (cell.canActivate && !cell.active) {
						// Activate this cell
						cell.activate();
						// Add this cell to collection of active cells
						activeCells.push(cell);
						// Block cells in corresponding row and column
						blockCells(cell);
						// Determine intersection cells
						setIntersectCells();
						// Add new rhythm for this cell
						rhythms.push(new Rhythm(cell, cells));
					} else if (cell.canActivate && cell.active) {
						// Deactivate this cell
						cell.deactivate();
						// Remove this cell from collection of active cells
						removeCell(cell);
						// Remove the rhythm associated with this cell
						removeRhythm(cell);
						// Unblock all cells
						unblockCells();
						// Block cells for all active cells in collection
						activeCells.forEach(cell => {
							blockCells(cell);
						})
						// Determine intersection cells
						setIntersectCells();
					}
				}
			})
		})
	} else {
		sessionStarted = true;
		// Initialise SoundLoop after first mouse click
		sloop = new p5.SoundLoop(go, 0.125);
		sloop.start();
	}
	return false;
}

function unblockCells() {
	cells.forEach(row => {
		row.forEach(cell => {
			cell.unblock();
		})
	})
}

function blockCells(cell) {
	grid.rows[cell.rowIndex].forEach((c, i) => {
		if (i != cell.colIndex) {
			c.block();
		}
	})
	grid.columns[cell.colIndex].forEach((c, i) => {
		if (i != cell.rowIndex) {
			c.block();
		}
	})
}

function setIntersectCells() {
	// Remove intersect status from current intersect cells
	intersectCells.forEach(cell => {
		cell.removeIntersect();
	})
	// Clear intersect cells array
	intersectCells = [];
	// Calculate intersect cells
	activeCells.forEach((cell1, index1) => {
		let row = cell1.rowIndex;
		activeCells.forEach((cell2, index2) => {
			if (index2 != index1) {
				let col = cell2.colIndex;
				cells[row][col].setIntersect();
				intersectCells.push(cells[row][col]);
			}
		})
	})
}

function removeCell(cell) {
	let index = 0;
	activeCells.forEach((c, i) => {
		if (c === cell) {
			index = i;
		}
	})
	activeCells.splice(index, 1);
}

function removeRhythm(cell) {
	let index = 0;
	rhythms.forEach((r, i) => {
		if (r.start === cell) {
			r.cleanup();
			index = i;
		}
	})
	rhythms.splice(index, 1);
}

function initCells() {
	let cells = [];
	let rowIndex = 0;
	let colIndex = 0;
	for (let i = 0; i < axis; i += cellSize) {
		let row = [];
		colIndex = 0;
		for (let j = 0; j < axis; j += cellSize) {
			let x = j - (axis / 2) + (cellSize / 2);
			let y = i - (axis / 2) + (cellSize / 2);
			row.push(new Cell(x, y, cellSize, rowIndex, colIndex));
			colIndex++;
		}
		cells.push(row);
		rowIndex++;
	}
	return cells;
}
