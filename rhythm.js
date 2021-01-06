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

	update(cells, cycleStartTime) {
		this.updateRow(cells);
		this.updateCol(cells);
		this.play(cycleStartTime);
	}

	updateRow(cells) {
		// Remove highlighting from current cells
		if (this.left) {
			this.left.dehighlight();
		}
		if (this.right) {
			this.right.dehighlight();
		}
		// Update positions of left and right cells
		if (this.left && this.left === this.endLeft) {
			this.atEndRow++;
			this.left = null;
		} else if (this.left) {
			this.left = cells[this.left.rowIndex][this.left.colIndex-1];

		}
		if (this.right && this.right === this.endRight) {
			this.atEndRow++;
			this.right = null;
		} else if (this.right) {
			this.right = cells[this.right.rowIndex][this.right.colIndex+1];
		}
		if (this.atEndRow >= 2) {
			this.left = this.start;
			this.right = this.start;
			this.atEndRow = 0;
		}
		// Add highlighting to new current cells
		if (this.left) {
			this.left.highlight();
		}
		if (this.right) {
			this.right.highlight();
		}
	}

	updateCol(cells) {
		// Remove highlighting from current cells
		if (this.up) {
			this.up.dehighlight();
		}
		if (this.down) {
			this.down.dehighlight();
		}
		// Update positions of up and down cells
		if (this.up && this.up === this.endUp) {
			this.atEndCol++;
			this.up = null;
		} else if (this.up) {
			this.up = cells[this.up.rowIndex-1][this.up.colIndex];
		}
		if (this.down && this.down === this.endDown) {
			this.atEndCol++;
			this.down = null;
		} else if (this.down) {
			this.down = cells[this.down.rowIndex+1][this.down.colIndex];
		}
		if (this.atEndCol >= 2) {
			this.up = this.start;
			this.down = this.start;
			this.atEndCol = 0;
		}
		// Add highlighting to new current cells
		if (this.up) {
			this.up.highlight();
		}
		if (this.down) {
			this.down.highlight();
		}
	}

	play(cycleStartTime) {
		if (this.up && this.up.isIntersect && !(this.up.playing)) {
			this.up.play(cycleStartTime);
		}
		if (this.down && this.down.isIntersect && !(this.down.playing)) {
			this.down.play(cycleStartTime);
		}
		if (this.left && this.left.isIntersect && !(this.left.playing)) {
			this.left.play(cycleStartTime);
		}
		if (this.right && this.right.isIntersect && !(this.right.playing)) {
			this.right.play(cycleStartTime);
		}
	}

	cleanup() {
		if (this.up) {
			this.up.dehighlight();
		}
		if (this.down) {
			this.down.dehighlight();
		}
		if (this.left) {
			this.left.dehighlight();
		}
		if (this.right) {
			this.right.dehighlight();
		}
	}
}
