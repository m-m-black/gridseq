class Grid {
	constructor() {
		this.rows = [];
		this.columns = [];
	}

	// Create rows and columns containing cells
	initGrid(cells) {
		for (let i = 0; i < cells.length; i++) {
			this.rows[i] = [];
			this.columns[i] = [];
			for (let j = 0; j < cells[i].length; j++) {
				this.rows[i][j] = cells[i][j];
				this.columns[i][j] = cells[j][i];
			}
		}
	}
}
