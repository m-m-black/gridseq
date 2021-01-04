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
		this.currentColor = color(200, 0, 0);
		// Audio components
		this.synth = new Synth();
		this.playing = false; // Is the synth currently playing a note?
		this.sound = sounds[int(random(sounds.length))];
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
		// Play the sound associated with this cell
		this.sound.play(cycleStartTime);
		this.playing = false;
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
			//this.color = color(200, 0, 0);
			this.color = this.currentColor;
		}
	}

	tempHighlight() {
		this.highlighted = true;
		if (!this.active && !this.isIntersect) {
			this.currentColor = color(200, 200, 0);
		}
	}

	deTempHighlight() {
		this.highlighted = false;
		if (!this.active && !this.isIntersect) {
			this.currentColor = color(200, 0, 0);
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
