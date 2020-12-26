class Cell {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.highlighted = false;
		this.active = false;
		this.color = color(200, 0, 0);
	}

	display() {
		fill(this.color);
		rect(this.x, this.y, this.size, this.size);
	}

	highlight() {
		this.color = color(0, 200, 0);
	}

	dehighlight() {
		this.color = color(200, 0, 0);
	}

	activate() {
		this.active = true;
	}

	deactivate() {
		this.active = false;
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
