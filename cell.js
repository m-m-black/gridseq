class Cell {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.highlighted = false;
		this.active = false; // Cell has been clicked on
		this.canActivate = true; // Cell can be clicked on
		this.color = color(200, 0, 0);
	}

	display() {
		fill(this.color);
		rect(this.x, this.y, this.size, this.size);
	}

	highlight() {
		if (!this.active) {
			this.color = color(0, 200, 0);
		}
	}

	dehighlight() {
		if (!this.active) {
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
