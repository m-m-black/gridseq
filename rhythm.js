class Rhythm {
	constructor(cell, cells) {
		this.start = cell;
		this.up = cell;
		this.down = cell;
		this.left = cell;
		this.right = cell;
		this.endUp = cells[0][cell.colIndex]; // Start of column
		this.endDown = cells[9][cell.colIndex]; // End of column
		this.endLeft = cells[cell.rowIndex][0]; // Start of row
		this.endRight = cells[cell.rowIndex][9]; // End of row
		this.atEndRow = 0;
		this.atEndCol = 0;
	}

	update(cells) {
		this.updateRow(cells);
		this.updateCol(cells);
		this.play();
	}

	updateRow(cells) {
		// Remove highlighting from current cells
		if (this.left) {
			this.left.deTempHighlight();
		}
		if (this.right) {
			this.right.deTempHighlight();
		}
		// Check if currentLeft is at the end
		if (this.left && this.left === this.endLeft) {
			// If so, increment counter
			this.atEndRow++;
			this.left = null;
		} else if (this.left) {
			// Otherwise, move currentLeft to the left by 1
			this.left = cells[this.left.rowIndex][this.left.colIndex-1];

		}
		// Check if currentRight is at the end
		if (this.right && this.right === this.endRight) {
			// If so, increment counter
			this.atEndRow++;
			this.right = null;
		} else if (this.right) {
			// Otherwise, move currentRight to the right by 1
			this.right = cells[this.right.rowIndex][this.right.colIndex+1];
		}
		if (this.atEndRow >= 2) {
			// If counter is 2, reset currentLeft and currentRight to the start
			this.left = this.start;
			this.right = this.start;
			// Reset counter
			this.atEndRow = 0;
		}
		// Add highlighting to new current cells
		if (this.left) {
			this.left.tempHighlight();
		}
		if (this.right) {
			this.right.tempHighlight();
		}
	}

	updateCol(cells) {
		// Remove highlighting from current cells
		if (this.up) {
			this.up.deTempHighlight();
		}
		if (this.down) {
			this.down.deTempHighlight();
		}
		// Check if currentUp is at the end
		if (this.up && this.up === this.endUp) {
			// If so, increment counter
			this.atEndCol++;
			this.up = null;
		} else if (this.up) {
			// Otherwise, move currentUp up by 1
			this.up = cells[this.up.rowIndex-1][this.up.colIndex];
		}
		// Check if currentDown is at the end
		if (this.down && this.down === this.endDown) {
			// If so, increment counter
			this.atEndCol++;
			this.down = null;
		} else if (this.down) {
			// Otherwise, move currentDown down by 1
			this.down = cells[this.down.rowIndex+1][this.down.colIndex];
		}
		if (this.atEndCol >= 2) {
			// If counter is 2, reset currentUp and currentDown to the start
			this.up = this.start;
			this.down = this.start;
			// Reset counter
			this.atEndCol = 0;
		}
		// Add highlighting to new current cells
		if (this.up) {
			this.up.tempHighlight();
		}
		if (this.down) {
			this.down.tempHighlight();
		}
	}

	play() {
		if (this.up && this.up.isIntersect) {
			this.up.play();
		}
		if (this.down && this.down.isIntersect) {
			this.down.play();
		}
		if (this.left && this.left.isIntersect) {
			this.left.play();
		}
		if (this.right && this.right.isIntersect) {
			this.right.play();
		}
	}
}
