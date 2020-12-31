class Cell {
	constructor(x, y, size, rowIndex, colIndex) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		this.highlighted = false;
		this.active = false; // Cell has been clicked on
		this.canActivate = true; // Cell can be clicked on
		this.isIntersect = false; // Cells is at an intersection point
		this.color = color(200, 0, 0);
	}

	display() {
		fill(this.color);
		rect(this.x, this.y, this.size, this.size);
		let string = this.rowIndex + ", " + this.colIndex;
		// Text for debugging
		fill(255);
		textAlign(CENTER, CENTER);
		text(string, this.x, this.y);
	}

	highlight() {
		// "active" and "isIntersect" are special statuses not to be highlighted
		if (!this.active && !this.isIntersect) {
			this.color = color(0, 200, 0);
		}
	}

	dehighlight() {
		// "active" and "isIntersect" are special statuses not to be highlighted
		if (!this.active && !this.isIntersect) {
			this.color = color(200, 0, 0);
		}
	}

	activate() {
		this.color = color(0, 0, 200);
		this.active = true;
	}

	deactivate() {
		this.color = color(200, 0, 0);
		this.active = false;
	}

	setIntersect() {
		this.color = color(0);
		this.isIntersect = true;
	}

	removeIntersect() {
		this.color = color(200, 0, 0);
		this.isIntersect = false;
	}

	block() {
		this.canActivate = false;
	}

	unblock() {
		this.canActivate = true;
	}

	within(mouseX, mouseY) {
		let within = false;
		if (abs(mouseX - this.x) < (this.size / 2) && abs(mouseY - this.y) < (this.size / 2)) {
			within = true;
		} else {
		
			within = false;
		}
		return within;
	}
}
