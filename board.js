class Board {
	ctx;
	ctxNext;
	grid;
	piece;
	pieceNext;

	constructor(ctx, ctxNext) {
		this.ctx = ctx;
		this.ctxNext = ctxNext;
		this.init();
	}

	init() {
		this.ctx.canvas.width = COLS * BLOCK_SIZE;
		this.ctx.canvas.height = ROWS * BLOCK_SIZE;

		this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
	}

	reset() {
		this.grid = this.getEmptyBoard();
		this.color = 'black';
	}

	getEmptyBoard() {
		return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
	}
	isValidMove(p) {
		return p.shape.every((row, dy) => {
			return row.every((block, dx) => {
				let x = p.x + dx;
				let y = p.y + dy;
				return block == 0 || (this.isInsideWalls(x) && this.isAboveFloor(y) && !this.isOccupied(x, y));
			});
		});
	}

	isInsideWalls(x) {
		return x >= 0 && x < COLS;
	}

	isAboveFloor(y) {
		return y < ROWS;
	}

	isOccupied(x, y) {
		return this.grid[y][x] != 0;
	}

	storePiece() {
		this.piece.shape.forEach((row, y) => {
			row.forEach((block, x) => {
				if(block != 0)
					this.grid[y + this.piece.y][x + this.piece.x] = 1;
			});
		});
		console.table(this.grid);
	}

	clearLine() {
		this.grid.forEach((row, y) => {
			if(row.every(block => block !=0)) {
				// Remove the row.
    			this.grid.splice(y, 1);
    
			    // Add zero filled row at the top. 
			    this.grid.unshift(Array(COLS).fill(0));
			}
		});
	}

	drawBoard() {
		this.grid.forEach((row, y) => {
			row.forEach((block, x) => {
				if(block != 0) {
					this.ctx.fillStyle = this.color;
					this.ctx.fillRect(x, y, 1, 1);
				}
			});
		}); 
	}

	draw() {
		this.drawBoard();
		this.piece.draw();
	}

	drop() {
		let p = moves[KEY.DOWN](this.piece);
		if(this.isValidMove(p)) {
			this.piece.move(p);
		}
		else {
			this.storePiece();
			this.clearLine();
			this.piece = new Piece(ctx);
		}
	}
}