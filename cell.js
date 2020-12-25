class Cell {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
	}

	display() {
		fill(255, 0, 0, 128);
		rect(this.x, this.y, this.size, this.size);
	}

	highlight() {
		fill(0, 255, 0, 128);
		rect(this.x, this.y, this.size, this.size);
	}

	within(mouseX, mouseY) {
		if (abs(mouseX - this.x) < (this.size / 2) && abs(mouseY - this.y) < (this.size / 2)) {
			this.highlight();
		} 
	}
}
