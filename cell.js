class Cell {
	constructor(x, y, size, rowIndex, colIndex, sound) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		this.highlighted = false;
		this.active = false; // Cell has been clicked on
		this.canActivate = true; // Cell can be clicked on
		this.isIntersect = false; // Cell is at an intersection point
		// Audio components
		this.playing = false; // Is the synth currently playing a note?
		this.sound = sound;
	}

	display() {
		strokeWeight(3);
		if (this.active) {
			// White circle
			fill(255, 200);
			stroke(255);
			ellipse(this.x, this.y, this.size * 0.75, this.size * 0.75);
		} else if (this.isIntersect) {
			// Blue circle
			fill(0, 0, 128, 128);
			stroke(255);
			ellipse(this.x, this.y, this.size * 0.75, this.size * 0.75);
		} else {
			// Unfilled circle
			noFill();
			stroke(255);
			ellipse(this.x, this.y, this.size * 0.75, this.size * 0.75);
		}
		if (this.highlighted && this.isIntersect) {
			// Black circle
			fill(0);
			ellipse(this.x, this.y, this.size * 0.75, this.size * 0.75);
		} else if (this.highlighted && !this.active) {
			// Light grey circle
			fill(128);
			ellipse(this.x, this.y, this.size * 0.75, this.size * 0.75);
		}
	}

	play(cycleStartTime) {
		this.playing = true;
		this.sound.play(cycleStartTime);
		this.playing = false;
	}

	highlight() {
		this.highlighted = true;
	}

	dehighlight() {
		this.highlighted = false;
	}

	activate() {
		this.active = true;
	}

	deactivate() {
		this.active = false;
	}

	setIntersect() {
		this.isIntersect = true;
	}

	removeIntersect() {
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
