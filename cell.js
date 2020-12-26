class Cell {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.highlighted = false;
	}

	display() {
		if (this.highlighted) {
			fill(0, 200, 0);
		} else {
			fill(200, 0, 0);
		}
		rect(this.x, this.y, this.size, this.size);
	}

	highlight() {
		this.highlighted = true;
	}

	dehighlight() {
		this.highlighted = false;
	}

	within(mouseX, mouseY) {
		let within = false;
		if (abs(mouseX - this.x) < (this.size / 2) && abs(mouseY - this.y) < (this.size / 2)) {
			this.highlight();
			within = true;
		} else {
			this.dehighlight();
			within = false;
		}
		return within;
	}
}
