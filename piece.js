class Piece {
	constructor(ctx) {
		this.ctx = ctx;
		this.color = 'grey';
		this.shape = this.randomShape();

		this.x = 3;
		this.y = 0;
	}

	draw() {
		this.ctx.fillStyle = this.color;
		this.shape.forEach((row, y) => {
			row.forEach((block, x) => {
				if(block == 1) 
					this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
			});
		});
	}

	move(p) {
		this.x = p.x;
		this.y = p.y;
		this.shape = p.shape;
	}

	rotate(){
		let clone = JSON.parse(JSON.stringify(this));
		for(let j = 0; j < clone.shape.length; j++) {
			for(let i = 0; i < j; i++) {
				let currBlock = clone.shape[i][j];
				clone.shape[i][j] = clone.shape[j][i];
				clone.shape[j][i] = currBlock;
			}
		}
		clone.shape.forEach(row => row.reverse());
		return clone;
	}

	randomShape(){
		let shape = Tetrominos[Math.floor(Math.random() * 7)];
		return shape;
	}
}